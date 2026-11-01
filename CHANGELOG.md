# Changelog

All notable changes to this project are documented in this file.

## [1.1.0] - 2026-11-01

### Added

- **Choose what the marquee shows.** A new **What to show** section in the card lets you pick any mix of sources, in any order:
  - **Weather:** today's conditions, the temperature now, the high and low and the chance of rain, from any weather entity. Optionally tomorrow too.
  - **News:** the latest headlines by topic (Top stories, World, National, Business, Technology, Entertainment, Sports, Science, Health) in your Home Assistant language and country, plus any RSS or Atom feed you add.
  - **Calendar:** upcoming events from your calendars.
  - **To-do lists:** open items from your to-do and shopping lists.
  - **Sunrise & sunset**, and **the date**.
  - **Messages** and **Entity values**, as before.
- Small category tags (Weather, Tech, Calendar…) before items. They can be turned off.
- News settings under **Settings → Devices & services → Grand Marquee → Configure**: topics, extra feeds, how often to check and how many headlines per topic.
- A **News** sensor (`sensor.grand_marquee_news`) holding the latest headlines.
- Two new pictures in the tour: a daily briefing and a news ticker.

### Changed

- Existing marquees keep working exactly as before: without a **What to show** choice they show messages and entity values.

## [1.0.1] - 2026-11-01

### Added

- Twelve professional colour palettes: Slate, Graphite, Navy, Harbor, Evergreen, Sage, Burgundy, Copper, Plum, Sand, Arctic and Monochrome. Each works with both the Glass and Plain styles, and they're marked **Professional** in the card editor.
- **Leave room so it doesn't cover cards** (`reserve_space`): a pinned marquee can keep a gap its own height in the dashboard. It's on by default for bars pinned to the top.
- A **Take a tour** section in the README with 13 pictures, and an **Examples** section with the settings for each one: placement, colours, fonts and live values.

### Fixed

- A pinned marquee now lines up with the dashboard instead of stretching over the sidebar on computers and tablets that show it.

## [1.0.0] - 2026-11-01

### Added

- First release of Grand Marquee: a smooth scrolling marquee card (`custom:grand-marquee`) and an integration that stores its messages.
- **Glass** and **Plain** styles, six colour presets, and colour pickers for the background, text, accent, edge and glow.
- A font choice: your Home Assistant theme's font, System, Serif, Monospace, Rounded, ten web fonts, or any font name.
- Placement inside a dashboard or pinned to the top or bottom of the screen.
- Actions to add, replace, remove and clear messages, with optional icons, colours and time limits. Messages survive restarts.
- Live entity states can scroll alongside messages.
- The card is added to **Settings → Dashboards → Resources** automatically and kept on the current version after every update.
- An app icon: a frosted-glass marquee bar with scrolling dots.
