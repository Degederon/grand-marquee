"""Scores and schedules for the marquee's Sports source.

Uses ESPN's public scoreboard data (no account or key needed). It is not an
official API, so it can change without notice; failures are logged and the
marquee simply shows no games until it works again.
"""

from __future__ import annotations

import asyncio
from datetime import timedelta
import logging
from typing import Any

import aiohttp

from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator

_LOGGER = logging.getLogger(__name__)

# key -> (label, ESPN sport path)
LEAGUES: dict[str, tuple[str, str]] = {
    "nfl": ("NFL", "football/nfl"),
    "ncaaf": ("College football", "football/college-football"),
    "nba": ("NBA", "basketball/nba"),
    "wnba": ("WNBA", "basketball/wnba"),
    "ncaab": ("College basketball", "basketball/mens-college-basketball"),
    "mlb": ("MLB", "baseball/mlb"),
    "nhl": ("NHL", "hockey/nhl"),
    "mls": ("MLS", "soccer/usa.1"),
    "epl": ("Premier League", "soccer/eng.1"),
    "laliga": ("LaLiga", "soccer/esp.1"),
    "ucl": ("Champions League", "soccer/uefa.champions"),
}
SCOREBOARD = "https://site.api.espn.com/apis/site/v2/sports/{path}/scoreboard"
LIVE_INTERVAL = timedelta(minutes=2)
IDLE_INTERVAL = timedelta(minutes=15)
MAX_GAMES_PER_LEAGUE = 12
FETCH_TIMEOUT = 20


def _team(c: dict[str, Any]) -> dict[str, Any]:
    t = c.get("team") or {}
    return {
        "abbr": t.get("abbreviation") or "",
        "name": t.get("shortDisplayName") or t.get("displayName") or t.get("name") or "",
        "full": t.get("displayName") or "",
        "location": t.get("location") or "",
        "score": c.get("score"),
        "winner": bool(c.get("winner")),
    }


def _matches(team: dict[str, Any], wanted: list[str]) -> bool:
    names = {team["abbr"], team["name"], team["full"], team["location"]}
    names = {n.casefold() for n in names if n}
    return any(w in names or any(w in n for n in names if len(w) > 3) for w in wanted)


def parse_scoreboard(data: dict[str, Any], league: str, teams: list[str]) -> list[dict[str, Any]]:
    """Games from one ESPN scoreboard, filtered to the chosen teams (all if none chosen)."""
    wanted = [t.casefold().strip() for t in teams if t.strip()]
    games: list[dict[str, Any]] = []
    for event in data.get("events") or []:
        comp = (event.get("competitions") or [{}])[0]
        competitors = comp.get("competitors") or []
        home = next((c for c in competitors if c.get("homeAway") == "home"), None)
        away = next((c for c in competitors if c.get("homeAway") == "away"), None)
        if not home or not away:
            continue
        h, a = _team(home), _team(away)
        if wanted and not (_matches(h, wanted) or _matches(a, wanted)):
            continue
        status = (event.get("status") or comp.get("status") or {}).get("type") or {}
        games.append(
            {
                "league": league,
                "label": LEAGUES[league][0],
                "state": status.get("state") or "pre",          # pre | in | post
                "detail": status.get("shortDetail") or status.get("detail") or "",
                "start": event.get("date"),
                "home": h,
                "away": a,
            }
        )
    order = {"in": 0, "pre": 1, "post": 2}
    games.sort(key=lambda g: (order.get(g["state"], 3), g["start"] or ""))
    return games[:MAX_GAMES_PER_LEAGUE]


class SportsCoordinator(DataUpdateCoordinator[list[dict[str, Any]]]):
    """Checks every 2 minutes while a game is on, every 15 minutes otherwise."""

    def __init__(self, hass: HomeAssistant, leagues: list[str], teams: list[str]) -> None:
        super().__init__(hass, _LOGGER, name="Grand Marquee sports", update_interval=IDLE_INTERVAL)
        self.leagues = [l for l in leagues if l in LEAGUES]
        self.teams = [t.strip() for t in teams if t.strip()]

    async def _fetch(self, session: aiohttp.ClientSession, league: str) -> list[dict[str, Any]]:
        url = SCOREBOARD.format(path=LEAGUES[league][1])
        try:
            async with asyncio.timeout(FETCH_TIMEOUT):
                resp = await session.get(url)
                resp.raise_for_status()
                data = await resp.json(content_type=None)
            return parse_scoreboard(data, league, self.teams)
        except (aiohttp.ClientError, TimeoutError, ValueError, KeyError, TypeError) as err:
            _LOGGER.warning("Could not read %s scores: %s", LEAGUES[league][0], err)
            return []

    async def _async_update_data(self) -> list[dict[str, Any]]:
        if not self.leagues:
            return []
        session = async_get_clientsession(self.hass)
        results = await asyncio.gather(*(self._fetch(session, l) for l in self.leagues))
        games = [g for r in results for g in r]
        self.update_interval = LIVE_INTERVAL if any(g["state"] == "in" for g in games) else IDLE_INTERVAL
        return games
