"""Grand Marquee — a glass-styled scrolling message ticker for Home Assistant."""

from __future__ import annotations

from datetime import timedelta
import logging
from pathlib import Path
from typing import Any
import uuid

import voluptuous as vol

from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant, ServiceCall, SupportsResponse, callback
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.event import async_track_time_interval
from homeassistant.helpers.storage import Store
from homeassistant.helpers.typing import ConfigType
from homeassistant.util import dt as dt_util

from .news import DEFAULT_PER_FEED, DEFAULT_REFRESH_MINUTES, DEFAULT_TOPICS, NewsCoordinator
from .sports import SportsCoordinator
from .weather_summary import WeatherSummaryCoordinator
from .resources import async_ensure_resource, resource_url
from .const import (
    ATTR_COLOR,
    ATTR_DURATION,
    ATTR_ICON,
    ATTR_ID,
    ATTR_MESSAGES,
    ATTR_TEXT,
    CARD_FILENAME,
    CARD_URL,
    ATTR_URGENT,
    CONF_CUSTOM_FEEDS,
    CONF_KEYWORDS,
    CONF_NEWS_TOPICS,
    CONF_SPORTS_LEAGUES,
    CONF_SPORTS_TEAMS,
    CONF_WEATHER_ENTITY,
    CONF_PER_FEED,
    CONF_REFRESH_MINUTES,
    DOMAIN,
    SERVICE_ADD,
    SERVICE_CLEAR,
    SERVICE_REMOVE,
    SERVICE_SET,
    SIGNAL_UPDATED,
    STORAGE_KEY,
    STORAGE_VERSION,
)

_LOGGER = logging.getLogger(__name__)

PLATFORMS: list[Platform] = [Platform.SENSOR]
CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)

MESSAGE_SCHEMA = vol.Schema(
    {
        vol.Required(ATTR_TEXT): cv.string,
        vol.Optional(ATTR_ICON): cv.icon,
        vol.Optional(ATTR_COLOR): cv.string,
        vol.Optional(ATTR_DURATION): cv.positive_time_period,
        vol.Optional(ATTR_ID): cv.string,
        vol.Optional(ATTR_URGENT): cv.boolean,
    }
)
ADD_SCHEMA = MESSAGE_SCHEMA
REMOVE_SCHEMA = vol.Schema({vol.Required(ATTR_ID): cv.string})
SET_SCHEMA = vol.Schema(
    {vol.Required(ATTR_MESSAGES): vol.All(cv.ensure_list, [vol.Any(cv.string, MESSAGE_SCHEMA)])}
)


class MessageStore:
    """Holds marquee messages and persists them across restarts."""

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self.messages: list[dict[str, Any]] = []

    async def async_load(self) -> None:
        data = await self._store.async_load() or {}
        self.messages = data.get("messages", [])
        self.purge_expired(save=False)

    @callback
    def _changed(self) -> None:
        self._store.async_delay_save(lambda: {"messages": self.messages}, 1)
        async_dispatcher_send(self.hass, SIGNAL_UPDATED)

    @staticmethod
    def _build(data: dict[str, Any] | str) -> dict[str, Any]:
        if isinstance(data, str):
            data = {ATTR_TEXT: data}
        msg: dict[str, Any] = {
            "id": data.get(ATTR_ID) or uuid.uuid4().hex[:8],
            "text": data[ATTR_TEXT],
            "created": dt_util.utcnow().isoformat(),
        }
        if data.get(ATTR_ICON):
            msg["icon"] = data[ATTR_ICON]
        if data.get(ATTR_COLOR):
            msg["color"] = data[ATTR_COLOR]
        if data.get(ATTR_URGENT):
            msg["urgent"] = True
        if duration := data.get(ATTR_DURATION):
            if not isinstance(duration, timedelta):
                duration = cv.positive_time_period(duration)
            msg["expires"] = (dt_util.utcnow() + duration).isoformat()
        return msg

    @callback
    def add(self, data: dict[str, Any]) -> dict[str, Any]:
        msg = self._build(data)
        # Re-using an id replaces that message (handy for "live" status lines).
        self.messages = [m for m in self.messages if m["id"] != msg["id"]]
        self.messages.append(msg)
        self._changed()
        return msg

    @callback
    def remove(self, msg_id: str) -> None:
        self.messages = [m for m in self.messages if m["id"] != msg_id]
        self._changed()

    @callback
    def clear(self) -> None:
        self.messages = []
        self._changed()

    @callback
    def set_all(self, items: list[dict[str, Any] | str]) -> None:
        self.messages = [self._build(i) for i in items]
        self._changed()

    @callback
    def purge_expired(self, *_: Any, save: bool = True) -> None:
        now = dt_util.utcnow()
        kept = [
            m
            for m in self.messages
            if not m.get("expires") or dt_util.parse_datetime(m["expires"]) > now
        ]
        if len(kept) != len(self.messages):
            self.messages = kept
            if save:
                self._changed()


async def _register_card(hass: HomeAssistant) -> None:
    """Serve the marquee and make sure dashboards load the current version of it.

    The card is added to Settings > Dashboards > Resources (and kept on the
    current version after updates). If that isn't possible, for example with
    dashboards in YAML mode, it is injected into every page instead.
    """
    if hass.data.get(f"{DOMAIN}_card_registered"):
        return
    path = Path(__file__).parent / "frontend" / CARD_FILENAME
    await hass.http.async_register_static_paths([StaticPathConfig(CARD_URL, str(path), False)])
    if not await async_ensure_resource(hass):
        add_extra_js_url(hass, resource_url())
    hass.data[f"{DOMAIN}_card_registered"] = True


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    await _register_card(hass)

    store = MessageStore(hass)
    await store.async_load()
    hass.data[DOMAIN] = store

    entry.async_on_unload(
        async_track_time_interval(hass, store.purge_expired, timedelta(seconds=30))
    )

    async def add_message(call: ServiceCall) -> dict[str, Any]:
        return {"message": store.add(dict(call.data))}

    async def remove_message(call: ServiceCall) -> None:
        store.remove(call.data[ATTR_ID])

    async def clear_messages(call: ServiceCall) -> None:
        store.clear()

    async def set_messages(call: ServiceCall) -> None:
        store.set_all(call.data[ATTR_MESSAGES])

    hass.services.async_register(
        DOMAIN, SERVICE_ADD, add_message, ADD_SCHEMA, supports_response=SupportsResponse.OPTIONAL
    )
    hass.services.async_register(DOMAIN, SERVICE_REMOVE, remove_message, REMOVE_SCHEMA)
    hass.services.async_register(DOMAIN, SERVICE_CLEAR, clear_messages)
    hass.services.async_register(DOMAIN, SERVICE_SET, set_messages, SET_SCHEMA)

    # Headlines for the card's News source. Fetched in the background so a slow
    # feed never holds up Home Assistant's startup.
    opts = entry.options
    news = NewsCoordinator(
        hass,
        topics=opts.get(CONF_NEWS_TOPICS, DEFAULT_TOPICS),
        custom_feeds=opts.get(CONF_CUSTOM_FEEDS, []),
        refresh_minutes=opts.get(CONF_REFRESH_MINUTES, DEFAULT_REFRESH_MINUTES),
        per_feed=opts.get(CONF_PER_FEED, DEFAULT_PER_FEED),
        keywords=opts.get(CONF_KEYWORDS, []),
    )
    hass.data[f"{DOMAIN}_news"] = news
    entry.async_create_background_task(hass, news.async_refresh(), f"{DOMAIN} first news refresh")

    # Scores for the Sports source, and today's weather as one sentence.
    sports = SportsCoordinator(hass, opts.get(CONF_SPORTS_LEAGUES, []), opts.get(CONF_SPORTS_TEAMS, []))
    hass.data[f"{DOMAIN}_sports"] = sports
    if sports.leagues:
        entry.async_create_background_task(hass, sports.async_refresh(), f"{DOMAIN} first sports refresh")
    weather = WeatherSummaryCoordinator(hass, opts.get(CONF_WEATHER_ENTITY))
    hass.data[f"{DOMAIN}_weather"] = weather
    weather.start()
    entry.async_on_unload(weather.stop)
    entry.async_create_background_task(hass, weather.async_refresh(), f"{DOMAIN} first weather summary")
    entry.async_on_unload(entry.add_update_listener(_async_options_updated))

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def _async_options_updated(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """New news topics or feeds: reload so they're fetched straight away."""
    await hass.config_entries.async_reload(entry.entry_id)


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    unloaded = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unloaded:
        for svc in (SERVICE_ADD, SERVICE_REMOVE, SERVICE_CLEAR, SERVICE_SET):
            hass.services.async_remove(DOMAIN, svc)
        hass.data.pop(DOMAIN, None)
        for key in ("news", "sports", "weather"):
            hass.data.pop(f"{DOMAIN}_{key}", None)
    return unloaded
