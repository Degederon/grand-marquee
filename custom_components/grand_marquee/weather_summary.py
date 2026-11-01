"""Today's weather as one sentence, for sensor.grand_marquee_weather_summary.

Example: "Partly cloudy, 72°F now, high 78°, low 61°, 20% chance of rain".
Handy in automations, morning announcements and phone notifications.
"""

from __future__ import annotations

from datetime import timedelta
import logging
from typing import Any

from homeassistant.core import Event, HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.event import async_track_state_change_event
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator
from homeassistant.util import dt as dt_util

_LOGGER = logging.getLogger(__name__)

CONDITIONS = {
    "en": {"clear-night": "Clear", "cloudy": "Cloudy", "exceptional": "Unusual weather", "fog": "Fog", "hail": "Hail",
           "lightning": "Thunderstorms", "lightning-rainy": "Thunderstorms and rain", "partlycloudy": "Partly cloudy",
           "pouring": "Heavy rain", "rainy": "Rain", "snowy": "Snow", "snowy-rainy": "Sleet", "sunny": "Sunny",
           "windy": "Windy", "windy-variant": "Windy and cloudy"},
    "es": {"clear-night": "Despejado", "cloudy": "Nublado", "exceptional": "Tiempo inusual", "fog": "Niebla", "hail": "Granizo",
           "lightning": "Tormentas", "lightning-rainy": "Tormentas y lluvia", "partlycloudy": "Parcialmente nublado",
           "pouring": "Lluvia intensa", "rainy": "Lluvia", "snowy": "Nieve", "snowy-rainy": "Aguanieve", "sunny": "Soleado",
           "windy": "Ventoso", "windy-variant": "Ventoso y nublado"},
    "fr": {"clear-night": "Dégagé", "cloudy": "Nuageux", "exceptional": "Temps inhabituel", "fog": "Brouillard", "hail": "Grêle",
           "lightning": "Orages", "lightning-rainy": "Orages et pluie", "partlycloudy": "Partiellement nuageux",
           "pouring": "Fortes pluies", "rainy": "Pluie", "snowy": "Neige", "snowy-rainy": "Neige fondue", "sunny": "Ensoleillé",
           "windy": "Venteux", "windy-variant": "Venteux et nuageux"},
    "de": {"clear-night": "Klar", "cloudy": "Bewölkt", "exceptional": "Ungewöhnliches Wetter", "fog": "Nebel", "hail": "Hagel",
           "lightning": "Gewitter", "lightning-rainy": "Gewitter und Regen", "partlycloudy": "Teilweise bewölkt",
           "pouring": "Starkregen", "rainy": "Regen", "snowy": "Schnee", "snowy-rainy": "Schneeregen", "sunny": "Sonnig",
           "windy": "Windig", "windy-variant": "Windig und bewölkt"},
}
WORDS = {
    "en": {"now": "now", "high": "high", "low": "low", "rain": "chance of rain"},
    "es": {"now": "ahora", "high": "máx.", "low": "mín.", "rain": "probabilidad de lluvia"},
    "fr": {"now": "maintenant", "high": "max.", "low": "min.", "rain": "de risque de pluie"},
    "de": {"now": "jetzt", "high": "Höchstwert", "low": "Tiefstwert", "rain": "Regenwahrscheinlichkeit"},
}


def _day(entries: list[dict[str, Any]], day) -> dict[str, Any] | None:
    """High, low, rain chance and condition for one local date from any forecast type."""
    picked = []
    for e in entries:
        when = dt_util.parse_datetime(str(e.get("datetime", "")))
        if when and dt_util.as_local(when).date() == day:
            picked.append((dt_util.as_local(when), e))
    if not picked:
        return None
    temps = [e["temperature"] for _, e in picked if isinstance(e.get("temperature"), (int, float))]
    lows = [e.get("templow", e.get("temperature")) for _, e in picked]
    lows = [v for v in lows if isinstance(v, (int, float))]
    rain = [e["precipitation_probability"] for _, e in picked if isinstance(e.get("precipitation_probability"), (int, float))]
    midday = next((e for t, e in picked if 11 <= t.hour <= 15), picked[0][1])
    return {
        "condition": midday.get("condition"),
        "high": max(temps) if temps else None,
        "low": min(lows) if lows else None,
        "rain": max(rain) if rain else None,
    }


def summarize(language: str, condition: str | None, temperature: float | None, unit: str, day: dict[str, Any] | None) -> str:
    lang = (language or "en").split("-")[0]
    cond = CONDITIONS.get(lang, CONDITIONS["en"])
    words = WORDS.get(lang, WORDS["en"])
    parts = [cond.get(condition or "", condition or "")]
    if isinstance(temperature, (int, float)):
        parts.append(f"{round(temperature)}{unit} {words['now']}")
    if day:
        if day["high"] is not None:
            parts.append(f"{words['high']} {round(day['high'])}°")
        if day["low"] is not None and day["low"] != day["high"]:
            parts.append(f"{words['low']} {round(day['low'])}°")
        if day["rain"]:
            parts.append(f"{round(day['rain'])}% {words['rain']}")
    text = ", ".join(p for p in parts if p)
    return text[:1].upper() + text[1:]


class WeatherSummaryCoordinator(DataUpdateCoordinator[dict[str, Any]]):
    """Rebuilds the summary every 30 minutes and whenever the weather entity changes."""

    def __init__(self, hass: HomeAssistant, entity_id: str | None) -> None:
        super().__init__(hass, _LOGGER, name="Grand Marquee weather summary", update_interval=timedelta(minutes=30))
        self.entity_id = entity_id
        self._unsub = None
        self._tracking: str | None = None

    def start(self) -> None:
        self._track(self.entity_id)

    def _track(self, entity_id: str | None) -> None:
        """Refresh whenever the weather entity in use changes."""
        if entity_id == self._tracking:
            return
        self.stop()
        self._tracking = entity_id
        if not entity_id:
            return

        @callback
        def changed(_: Event) -> None:
            self.hass.async_create_task(self.async_request_refresh())

        self._unsub = async_track_state_change_event(self.hass, [entity_id], changed)

    def stop(self) -> None:
        if self._unsub:
            self._unsub()
            self._unsub = None
        self._tracking = None

    def _weather_id(self) -> str | None:
        if self.entity_id:
            return self.entity_id
        ids = self.hass.states.async_entity_ids("weather")
        return ids[0] if ids else None

    async def _forecast(self, entity_id: str, features: int) -> list[dict[str, Any]]:
        for flag, kind in ((1, "daily"), (4, "twice_daily"), (2, "hourly")):
            if not features & flag:
                continue
            try:
                resp = await self.hass.services.async_call(
                    "weather", "get_forecasts", {"type": kind}, target={"entity_id": entity_id},
                    blocking=True, return_response=True,
                )
                return ((resp or {}).get(entity_id) or {}).get("forecast") or []
            except HomeAssistantError as err:
                _LOGGER.debug("No %s forecast from %s: %s", kind, entity_id, err)
        return []

    async def _async_update_data(self) -> dict[str, Any]:
        entity_id = self._weather_id()
        self._track(entity_id)  # follows the first weather entity when none was chosen
        state = self.hass.states.get(entity_id) if entity_id else None
        if state is None or state.state in ("unknown", "unavailable"):
            return {"summary": None}
        attrs = state.attributes
        forecast = await self._forecast(entity_id, int(attrs.get("supported_features") or 0))
        today = dt_util.now().date()
        t, tm = _day(forecast, today), _day(forecast, today + timedelta(days=1))
        lang = self.hass.config.language
        unit = attrs.get("temperature_unit") or "°"
        summary = summarize(lang, state.state, attrs.get("temperature"), unit, t)
        tomorrow = summarize(lang, tm["condition"], None, unit, tm) if tm else None
        return {"summary": summary, "tomorrow": tomorrow, "today": t, "entity_id": entity_id}
