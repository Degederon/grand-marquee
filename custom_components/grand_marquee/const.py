"""Constants for Grand Marquee."""

DOMAIN = "grand_marquee"
VERSION = "1.0.1"

STORAGE_KEY = f"{DOMAIN}.messages"
STORAGE_VERSION = 1

CARD_FILENAME = "grand-marquee.js"
CARD_URL_BASE = f"/{DOMAIN}"
CARD_URL = f"{CARD_URL_BASE}/{CARD_FILENAME}"

SIGNAL_UPDATED = f"{DOMAIN}_updated"

SERVICE_ADD = "add_message"
SERVICE_REMOVE = "remove_message"
SERVICE_CLEAR = "clear_messages"
SERVICE_SET = "set_messages"

ATTR_TEXT = "text"
ATTR_ICON = "icon"
ATTR_COLOR = "color"
ATTR_DURATION = "duration"
ATTR_ID = "id"
ATTR_MESSAGES = "messages"
