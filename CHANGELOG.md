# Changelog

All notable changes to this project are documented in this file.

## [1.2.1] - 2026-11-02

### Fixed

- **The marquee now keeps scrolling on computers set to reduce motion.** When Windows' **Animation effects** (or Android's **Remove animations**) was off, Edge and Chrome asked pages for less motion and the marquee stopped. It now scrolls anyway; turn on **Stop scrolling when the device asks for less motion** to get the old behaviour.
- Leaving a view while an urgent item was showing no longer leaves the marquee stuck.
- Tapping the marquee on a touch screen no longer pauses it as if a mouse were hovering. **Pause on hover** now only reacts to a real mouse.
- Text no longer jumps when the weather, news or calendar changes; it stays exactly where it was.
- If the marquee is shown before the page has finished laying out, it now waits and starts instead of standing still.

### Added

- A safety net: every few seconds the marquee checks it's still scrolling, and restarts if anything stalled it. It also restarts when you come back to the browser tab.
- `respect_reduced_motion` option (off by default).

## [1.2.0] - 2026-11-01

### Added

- **Eight new things to show**, each picked under **What to show**:
  - **Weather alerts** from alert entities such as Meteoalarm or NWS alerts. They always come first, in red.
  - **Sports scores:** live scores, upcoming games and final results for the leagues and teams you follow (NFL, NBA, MLB, NHL, MLS, Premier League and more).
  - **Countdowns** to dates you type in ("Christmas: 12-25") or events in a calendar, such as birthdays.
  - **Message board notes** from Glass Message Board, followed live, pinned notes first.
  - **Who's home** and **Commute** (travel time sensors).
  - **News about keywords:** add your team, your town or a hobby under **Configure**, and each becomes its own topic.
- **Urgent items:** urgent messages (`urgent: true` on `grand_marquee.add_message`) and weather alerts take over the bar in red for a few seconds, then join the scroll. Tap to dismiss early.
- **Flip mode:** show one item at a time with a fade or slide; long items glide across before the next.
- **Time of day:** a `schedule` changes any setting by time of day and day of the week, or hides the marquee during quiet hours.
- **Tap actions:** tap a headline to open the article, or tap a message to remove it.
- **Colours per category** for each source's icon and tag.
- **Opacity** setting for the whole marquee.
- **New sensors:** one per news topic and keyword, a Sports sensor, and a Weather summary sensor with today's forecast in one sentence, for automations and notifications.
- **Languages:** the card, its editor, its text and the integration's settings are now in English, Spanish, French and German.
- Four new pictures in the tour: urgent alerts, sports, flip mode, and countdowns with who's home.

### Changed

- The device now shows **by Degederon** under Service info.
- News topic tags use the full topic name in your language (for example "Technology").

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
