"""Constants for Grand Marquee."""

DOMAIN = "grand_marquee"
VERSION = "1.2.1"

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

# News source (set in Settings > Devices & services > Grand Marquee > Configure)
CONF_NEWS_TOPICS = "news_topics"
CONF_CUSTOM_FEEDS = "custom_feeds"
CONF_REFRESH_MINUTES = "refresh_minutes"
CONF_PER_FEED = "headlines_per_feed"
CONF_KEYWORDS = "news_keywords"
CONF_SPORTS_LEAGUES = "sports_leagues"
CONF_SPORTS_TEAMS = "sports_teams"
CONF_WEATHER_ENTITY = "weather_entity"
ATTR_URGENT = "urgent"
MANUFACTURER = "Degederon"
