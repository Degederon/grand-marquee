"""Sensors that feed the marquee card, and that automations can use too.

- Messages: the marquee's own messages.
- News: every headline; plus one sensor per news topic and keyword.
- Sports: games for the leagues and teams you follow.
- Weather summary: today's forecast as one sentence.
"""

from __future__ import annotations

import re
from typing import Any

from homeassistant.components.sensor import SensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN, MANUFACTURER, SIGNAL_UPDATED, VERSION


def _device(entry: ConfigEntry) -> dict[str, Any]:
    return {
        "identifiers": {(DOMAIN, entry.entry_id)},
        "name": "Grand Marquee",
        "manufacturer": MANUFACTURER,
        "model": "Scrolling marquee",
        "sw_version": VERSION,
        "entry_type": "service",
    }


async def async_setup_entry(
    hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback
) -> None:
    news = hass.data[f"{DOMAIN}_news"]
    entities: list[SensorEntity] = [
        GrandMarqueeMessagesSensor(hass, entry),
        GrandMarqueeNewsSensor(news, entry),
        GrandMarqueeSportsSensor(hass.data[f"{DOMAIN}_sports"], entry),
        GrandMarqueeWeatherSummarySensor(hass.data[f"{DOMAIN}_weather"], entry),
    ]
    entities += [GrandMarqueeTopicSensor(news, entry, key, label) for key, label in news.categories().items()]
    async_add_entities(entities)


class GrandMarqueeMessagesSensor(SensorEntity):
    """State = number of messages; attribute `messages` holds the list."""

    _attr_has_entity_name = True
    _attr_name = "Messages"
    _attr_icon = "mdi:message-text-fast"
    _attr_should_poll = False
    _attr_native_unit_of_measurement = "messages"

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        self._store = hass.data[DOMAIN]
        self._attr_unique_id = f"{entry.entry_id}_messages"
        self.entity_id = "sensor.grand_marquee_messages"
        self._attr_device_info = _device(entry)

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(
            async_dispatcher_connect(self.hass, SIGNAL_UPDATED, self._handle_update)
        )

    @callback
    def _handle_update(self) -> None:
        self.async_write_ha_state()

    @property
    def native_value(self) -> int:
        return len(self._store.messages)

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        return {"messages": self._store.messages}


class _CoordinatorSensor(CoordinatorEntity, SensorEntity):
    _attr_has_entity_name = True

    def __init__(self, coordinator, entry: ConfigEntry, key: str) -> None:
        super().__init__(coordinator)
        self._attr_unique_id = f"{entry.entry_id}_{key}"
        self._attr_device_info = _device(entry)

    @property
    def available(self) -> bool:
        # Stay available between refreshes; empty just means nothing yet.
        return True


class GrandMarqueeNewsSensor(_CoordinatorSensor):
    """State = number of headlines; attribute `headlines` holds them, feeds interleaved."""

    _attr_name = "News"
    _attr_icon = "mdi:newspaper-variant-outline"
    _attr_native_unit_of_measurement = "headlines"
    # Headlines change all day; keep them out of the history database.
    _unrecorded_attributes = frozenset({"headlines", "topics", "categories"})

    def __init__(self, coordinator, entry: ConfigEntry) -> None:
        super().__init__(coordinator, entry, "news")
        self.entity_id = "sensor.grand_marquee_news"

    @property
    def native_value(self) -> int:
        return len(self.coordinator.data or [])

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        return {
            "headlines": self.coordinator.data or [],
            "topics": list(self.coordinator.categories()),
            "categories": self.coordinator.categories(),
        }


class GrandMarqueeTopicSensor(_CoordinatorSensor):
    """One news topic or keyword. State = its newest headline."""

    _attr_icon = "mdi:newspaper-variant-outline"
    _unrecorded_attributes = frozenset({"headlines"})

    def __init__(self, coordinator, entry: ConfigEntry, key: str, label: str) -> None:
        super().__init__(coordinator, entry, f"news_{key}")
        self._key = key
        self._attr_name = f"News {label}"
        slug = re.sub(r"[^a-z0-9]+", "_", key.replace("kw:", "").casefold()).strip("_") or "topic"
        self.entity_id = f"sensor.grand_marquee_news_{slug}"

    @property
    def native_value(self) -> str | None:
        items = self.coordinator.for_category(self._key)
        return items[0]["title"][:255] if items else None

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        items = self.coordinator.for_category(self._key)
        return {"headlines": items, "count": len(items), "source": items[0]["source"] if items else None}


class GrandMarqueeSportsSensor(_CoordinatorSensor):
    """State = number of games; attribute `games` holds scores and start times."""

    _attr_name = "Sports"
    _attr_icon = "mdi:scoreboard-outline"
    _attr_native_unit_of_measurement = "games"
    _unrecorded_attributes = frozenset({"games", "leagues", "teams"})

    def __init__(self, coordinator, entry: ConfigEntry) -> None:
        super().__init__(coordinator, entry, "sports")
        self.entity_id = "sensor.grand_marquee_sports"

    @property
    def native_value(self) -> int:
        return len(self.coordinator.data or [])

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        games = self.coordinator.data or []
        return {
            "games": games,
            "live": sum(1 for g in games if g["state"] == "in"),
            "leagues": self.coordinator.leagues,
            "teams": self.coordinator.teams,
        }


class GrandMarqueeWeatherSummarySensor(_CoordinatorSensor):
    """State = today's weather as one sentence."""

    _attr_name = "Weather summary"
    _attr_icon = "mdi:weather-partly-cloudy"

    def __init__(self, coordinator, entry: ConfigEntry) -> None:
        super().__init__(coordinator, entry, "weather_summary")
        self.entity_id = "sensor.grand_marquee_weather_summary"

    @property
    def native_value(self) -> str | None:
        data = self.coordinator.data or {}
        return (data.get("summary") or "")[:255] or None

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        data = self.coordinator.data or {}
        return {
            "tomorrow": data.get("tomorrow"),
            "today": data.get("today"),
            "weather_entity": data.get("entity_id"),
        }
