"""Config flow for Grand Marquee: one instance, with news options under Configure."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.config_entries import ConfigEntry, ConfigFlow, ConfigFlowResult, OptionsFlow
from homeassistant.core import callback
from homeassistant.helpers.selector import (
    NumberSelector,
    NumberSelectorConfig,
    NumberSelectorMode,
    SelectSelector,
    SelectSelectorConfig,
    SelectSelectorMode,
    TextSelector,
    TextSelectorConfig,
)

from .const import (
    CONF_CUSTOM_FEEDS,
    CONF_NEWS_TOPICS,
    CONF_PER_FEED,
    CONF_REFRESH_MINUTES,
    DOMAIN,
)
from .news import DEFAULT_PER_FEED, DEFAULT_REFRESH_MINUTES, DEFAULT_TOPICS, TOPICS


class GrandMarqueeConfigFlow(ConfigFlow, domain=DOMAIN):
    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")
        if user_input is not None:
            return self.async_create_entry(title="Grand Marquee", data={})
        return self.async_show_form(step_id="user")

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> OptionsFlow:
        return GrandMarqueeOptionsFlow()


class GrandMarqueeOptionsFlow(OptionsFlow):
    """News topics and feeds for the marquee's News source."""

    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        if user_input is not None:
            feeds = [
                line.strip()
                for line in str(user_input.get(CONF_CUSTOM_FEEDS, "")).splitlines()
                if line.strip()
            ]
            errors = {}
            if any(not f.lower().startswith(("http://", "https://")) for f in feeds):
                errors[CONF_CUSTOM_FEEDS] = "invalid_feed"
            if not errors:
                return self.async_create_entry(
                    data={
                        CONF_NEWS_TOPICS: user_input.get(CONF_NEWS_TOPICS, []),
                        CONF_CUSTOM_FEEDS: feeds,
                        CONF_REFRESH_MINUTES: int(user_input[CONF_REFRESH_MINUTES]),
                        CONF_PER_FEED: int(user_input[CONF_PER_FEED]),
                    }
                )
            return self.async_show_form(step_id="init", data_schema=self._schema(user_input), errors=errors)

        opts = self.config_entry.options
        current = {
            CONF_NEWS_TOPICS: opts.get(CONF_NEWS_TOPICS, DEFAULT_TOPICS),
            CONF_CUSTOM_FEEDS: "\n".join(opts.get(CONF_CUSTOM_FEEDS, [])),
            CONF_REFRESH_MINUTES: opts.get(CONF_REFRESH_MINUTES, DEFAULT_REFRESH_MINUTES),
            CONF_PER_FEED: opts.get(CONF_PER_FEED, DEFAULT_PER_FEED),
        }
        return self.async_show_form(step_id="init", data_schema=self._schema(current))

    @staticmethod
    def _schema(values: dict[str, Any]) -> vol.Schema:
        return vol.Schema(
            {
                vol.Optional(CONF_NEWS_TOPICS, default=values.get(CONF_NEWS_TOPICS, DEFAULT_TOPICS)): SelectSelector(
                    SelectSelectorConfig(
                        options=list(TOPICS),
                        multiple=True,
                        mode=SelectSelectorMode.LIST,
                        translation_key="news_topics",
                    )
                ),
                vol.Optional(CONF_CUSTOM_FEEDS, default=values.get(CONF_CUSTOM_FEEDS, "")): TextSelector(
                    TextSelectorConfig(multiline=True)
                ),
                vol.Required(
                    CONF_REFRESH_MINUTES, default=values.get(CONF_REFRESH_MINUTES, DEFAULT_REFRESH_MINUTES)
                ): NumberSelector(
                    NumberSelectorConfig(min=5, max=240, step=5, unit_of_measurement="min", mode=NumberSelectorMode.BOX)
                ),
                vol.Required(CONF_PER_FEED, default=values.get(CONF_PER_FEED, DEFAULT_PER_FEED)): NumberSelector(
                    NumberSelectorConfig(min=1, max=30, step=1, mode=NumberSelectorMode.BOX)
                ),
            }
        )
