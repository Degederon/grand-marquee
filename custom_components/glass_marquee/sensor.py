"""Sensor exposing the current marquee messages to the card."""

from __future__ import annotations

from typing import Any

from homeassistant.components.sensor import SensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN, SIGNAL_UPDATED


async def async_setup_entry(
    hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback
) -> None:
    async_add_entities([GlassMarqueeMessagesSensor(hass, entry)])


class GlassMarqueeMessagesSensor(SensorEntity):
    """State = number of messages; attribute `messages` holds the list."""

    _attr_has_entity_name = True
    _attr_name = "Messages"
    _attr_icon = "mdi:message-text-fast"
    _attr_should_poll = False
    _attr_native_unit_of_measurement = "messages"

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        self._store = hass.data[DOMAIN]
        self._attr_unique_id = f"{entry.entry_id}_messages"
        self.entity_id = "sensor.glass_marquee_messages"
        self._attr_device_info = {
            "identifiers": {(DOMAIN, entry.entry_id)},
            "name": "Glass Marquee",
            "manufacturer": "Glass Marquee",
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
