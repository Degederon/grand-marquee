"""Headline fetching for the marquee's News source.

Topics come from Google News, localized to Home Assistant's country and
language. Any RSS or Atom feed can be added as well. Fetching happens here,
on the server, so every display gets the same headlines without browser
restrictions.
"""

from __future__ import annotations

import asyncio
from datetime import timedelta
from email.utils import parsedate_to_datetime
import html
import logging
import re
from typing import Any
from urllib.parse import quote_plus
import xml.etree.ElementTree as ET

import aiohttp

from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator
from homeassistant.util import dt as dt_util

_LOGGER = logging.getLogger(__name__)

# Topic key -> (label shown on the marquee, Google News section or None for top stories)
TOPICS: dict[str, tuple[str, str | None]] = {
    "top": ("Top stories", None),
    "world": ("World", "WORLD"),
    "nation": ("National", "NATION"),
    "business": ("Business", "BUSINESS"),
    "technology": ("Tech", "TECHNOLOGY"),
    "entertainment": ("Entertainment", "ENTERTAINMENT"),
    "sports": ("Sports", "SPORTS"),
    "science": ("Science", "SCIENCE"),
    "health": ("Health", "HEALTH"),
}
DEFAULT_TOPICS = ["top"]
DEFAULT_REFRESH_MINUTES = 30
DEFAULT_PER_FEED = 10
MAX_HEADLINES = 80          # keeps the sensor's attribute small
FETCH_TIMEOUT = 20

_TAG = re.compile(r"<[^>]+>")


def topic_url(topic: str, language: str, country: str) -> str:
    """Google News RSS address for a topic, in the given language and country."""
    lang = (language or "en").split("-")[0].lower()
    ctry = (country or "US").upper()
    query = f"hl={lang}-{ctry}&gl={ctry}&ceid={ctry}:{lang}"
    section = TOPICS[topic][1]
    if section is None:
        return f"https://news.google.com/rss?{query}"
    return f"https://news.google.com/rss/headlines/section/topic/{section}?{query}"


def keyword_url(keyword: str, language: str, country: str) -> str:
    """Google News search feed for a keyword, such as a team, a town or a hobby."""
    lang = (language or "en").split("-")[0].lower()
    ctry = (country or "US").upper()
    return f"https://news.google.com/rss/search?q={quote_plus(keyword)}&hl={lang}-{ctry}&gl={ctry}&ceid={ctry}:{lang}"


def keyword_key(keyword: str) -> str:
    """Stable category key for a keyword topic, e.g. 'kw:tampa-bay-lightning'."""
    slug = re.sub(r"[^a-z0-9]+", "-", keyword.casefold()).strip("-")
    return f"kw:{slug or 'search'}"


def _local(tag: str) -> str:
    """Tag name without its XML namespace."""
    return tag.rsplit("}", 1)[-1]


def _child(el: ET.Element, name: str) -> ET.Element | None:
    for c in el:
        if _local(c.tag) == name:
            return c
    return None


def _text(el: ET.Element | None) -> str:
    if el is None:
        return ""
    raw = "".join(el.itertext())
    return " ".join(html.unescape(_TAG.sub(" ", raw)).split())


def _published(value: str) -> str | None:
    if not value:
        return None
    try:
        return parsedate_to_datetime(value).isoformat()
    except (TypeError, ValueError):
        pass
    try:
        parsed = dt_util.parse_datetime(value)
    except (TypeError, ValueError):
        return None
    return parsed.isoformat() if parsed else None


def parse_feed(body: str, category: str, label: str, limit: int) -> tuple[str, list[dict[str, Any]]]:
    """Parse RSS 2.0 or Atom into headlines. Returns (feed title, headlines)."""
    root = ET.fromstring(body)
    is_atom = _local(root.tag) == "feed"
    channel = root
    if not is_atom:
        found = _child(root, "channel")
        if found is not None:
            channel = found
    feed_title = _text(_child(channel, "title"))
    entries = [e for e in channel if _local(e.tag) == ("entry" if is_atom else "item")]

    out: list[dict[str, Any]] = []
    for entry in entries[:limit]:
        title = _text(_child(entry, "title"))
        if not title:
            continue
        source = _text(_child(entry, "source"))
        # Google News titles end with " - Source Name"; keep the source separately.
        if source and title.endswith(f" - {source}"):
            title = title[: -len(source) - 3].rstrip()
        elif not source and " - " in title and (category in TOPICS or category.startswith("kw:")):
            head, tail = title.rsplit(" - ", 1)
            if len(tail) <= 40:
                title, source = head, tail
        link_el = _child(entry, "link")
        link = (link_el.get("href") if is_atom and link_el is not None else _text(link_el)) or ""
        date = _text(_child(entry, "updated" if is_atom else "pubDate")) or _text(_child(entry, "published"))
        out.append(
            {
                "title": title,
                "source": source or feed_title,
                "category": category,
                "label": label or feed_title or "News",
                "link": link,
                "published": _published(date),
            }
        )
    return feed_title, out


class NewsCoordinator(DataUpdateCoordinator[list[dict[str, Any]]]):
    """Fetches the selected topics and custom feeds on a schedule."""

    def __init__(
        self,
        hass: HomeAssistant,
        topics: list[str],
        custom_feeds: list[str],
        refresh_minutes: int,
        per_feed: int,
        keywords: list[str] | None = None,
    ) -> None:
        super().__init__(
            hass,
            _LOGGER,
            name="Grand Marquee news",
            update_interval=timedelta(minutes=max(5, int(refresh_minutes))),
        )
        self.topics = [t for t in topics if t in TOPICS]
        self.custom_feeds = [u.strip() for u in custom_feeds if u.strip()]
        self.per_feed = max(1, int(per_feed))
        self.keywords = [k.strip() for k in (keywords or []) if k.strip()]

    def categories(self) -> dict[str, str]:
        """Every category this coordinator fetches: key -> label."""
        cats = {t: TOPICS[t][0] for t in self.topics}
        cats.update({keyword_key(k): k for k in self.keywords})
        if self.custom_feeds:
            cats["custom"] = "Your own feeds"
        return cats

    def for_category(self, key: str) -> list[dict[str, Any]]:
        return [h for h in (self.data or []) if h["category"] == key]

    def _feeds(self) -> list[tuple[str, str, str]]:
        """(url, category, label) for everything selected."""
        lang = self.hass.config.language or "en"
        country = self.hass.config.country or "US"
        feeds = [(topic_url(t, lang, country), t, TOPICS[t][0]) for t in self.topics]
        feeds += [(keyword_url(k, lang, country), keyword_key(k), k) for k in self.keywords]
        feeds += [(url, "custom", "") for url in self.custom_feeds]
        return feeds

    async def _fetch(self, session: aiohttp.ClientSession, url: str, category: str, label: str) -> list[dict[str, Any]]:
        try:
            async with asyncio.timeout(FETCH_TIMEOUT):
                resp = await session.get(url, headers={"User-Agent": "HomeAssistant-GrandMarquee"})
                resp.raise_for_status()
                body = await resp.text()
            _, items = await self.hass.async_add_executor_job(parse_feed, body, category, label, self.per_feed)
            return items
        except (aiohttp.ClientError, TimeoutError, ET.ParseError, ValueError) as err:
            _LOGGER.warning("Could not read news feed %s: %s", url, err)
            return []

    async def _async_update_data(self) -> list[dict[str, Any]]:
        feeds = self._feeds()
        if not feeds:
            return []
        session = async_get_clientsession(self.hass)
        results = await asyncio.gather(*(self._fetch(session, *f) for f in feeds))
        # Interleave feeds so one topic doesn't fill the whole marquee, and drop duplicates.
        seen: set[str] = set()
        merged: list[dict[str, Any]] = []
        for i in range(max((len(r) for r in results), default=0)):
            for items in results:
                if i < len(items):
                    key = items[i]["title"].casefold()
                    if key not in seen:
                        seen.add(key)
                        merged.append(items[i])
        return merged[:MAX_HEADLINES]
