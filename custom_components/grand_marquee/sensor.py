"""Sensors that feed the marquee card: messages and news headlines."""

from __future__ import annotations

from typing import Any

from homeassistant.components.sensor import SensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN, SIGNAL_UPDATED


async def async_setup_entry(
    hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback
) -> None:
    async_add_entities(
        [
            GrandMarqueeMessagesSensor(hass, entry),
            GrandMarqueeNewsSensor(hass.data[f"{DOMAIN}_news"], entry),
        ]
    )


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
        self._attr_device_info = {
            "identifiers": {(DOMAIN, entry.entry_id)},
            "name": "Grand Marquee",
            "manufacturer": "Grand Marquee",
            "entry_type": "service",
        }

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


class GrandMarqueeNewsSensor(CoordinatorEntity, SensorEntity):
    """State = number of headlines; attribute `headlines` holds them, newest feeds interleaved."""

    _attr_has_entity_name = True
    _attr_name = "News"
    _attr_icon = "mdi:newspaper-variant-outline"
    _attr_native_unit_of_measurement = "headlines"
    # Headlines change all day; keep them out of the history database.
    _unrecorded_attributes = frozenset({"headlines", "topics"})

    def __init__(self, coordinator, entry: ConfigEntry) -> None:
        super().__init__(coordinator)
        self._attr_unique_id = f"{entry.entry_id}_news"
        self.entity_id = "sensor.grand_marquee_news"
        self._attr_device_info = {
            "identifiers": {(DOMAIN, entry.entry_id)},
            "name": "Grand Marquee",
            "manufacturer": "Grand Marquee",
            "entry_type": "service",
        }

    @property
    def available(self) -> bool:
        # Stay available between refreshes; an empty list just means nothing yet.
        return True

    @property
    def native_value(self) -> int:
        return len(self.coordinator.data or [])

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        return {
            "headlines": self.coordinator.data or [],
            "topics": self.coordinator.topics,
        }
