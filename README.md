<div align="center">

# Grand Marquee

**A smooth, frosted-glass scrolling marquee for Home Assistant.**

[![HACS Custom](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://hacs.xyz/docs/faq/custom_repositories)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2024.11%2B-18BCF2.svg?logo=homeassistant&logoColor=white)](https://www.home-assistant.io/)
[![Version](https://img.shields.io/badge/version-1.2.1-6E56CF.svg)](CHANGELOG.md)
[![Languages](https://img.shields.io/badge/languages-English%20%7C%20Deutsch%20%7C%20Espa%C3%B1ol%20%7C%20Fran%C3%A7ais-2E9E6B.svg)](#languages)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

Beautiful design and ease of use. https://github.com/Degederon/grand-marquee

Grand Marquee puts a rolling ticker on your Home Assistant dashboard: your own messages, today's weather and alerts, the latest headlines, sports scores, your calendar, countdowns, to-do lists, notes from your message board and more. It matches the look of [Glass Message Board](https://github.com/Degederon/GlassMessageBoard): frosted glass in any colour, or a plain solid bar if you prefer. Automations can post messages to it, live sensor values can scroll alongside them, and it can sit inside a dashboard or stay pinned to the top or bottom of the screen on a wall tablet.

**Languages:** English, German (Deutsch), Spanish (Español) and French (Français). The card, its settings and what it says follow your Home Assistant language.

## Contents

- [Features](#features)
- [Take a tour](#take-a-tour)
- [Requirements](#requirements)
- [Step-by-step setup](#step-by-step-setup)
- [Dashboard configuration](#dashboard-configuration)
- [Examples](#examples)
- [Actions](#actions)
- [Entities](#entities)
- [Automation examples](#automation-examples)
- [Languages](#languages)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Features

| Feature | Description |
|---|---|
| **Smooth scrolling** | Messages glide at a steady speed you choose, whatever their length, and loop with no visible seam. New messages join without the text jumping back to the start. |
| **Glass or plain** | Frosted glass with blur, sheen and glow, or a flat bar in exactly the colour you pick. |
| **Your colours** | Eighteen presets: six vivid ones (Frost, Aurora, Midnight, Rose, Ember, Light) and twelve professional palettes (Slate, Graphite, Navy, Harbor, Evergreen, Sage, Burgundy, Copper, Plum, Sand, Arctic, Monochrome). Colour pickers let you change the background, text, accent, edge and glow. |
| **Your font** | Your Home Assistant theme's font, System, Serif, Monospace or Rounded, ten web fonts such as Poppins and Orbitron, or any font name you type. |
| **Placement** | Inside a dashboard, or pinned to the top or bottom of the screen. Pinned bars line up with the dashboard, never covering the sidebar, and a top bar leaves room so it doesn't hide your cards. |
| **Choose what it shows** | Any mix of messages, weather alerts, today's weather, news by topic or keyword, sports scores, calendar events, countdowns, to-do lists, Glass Message Board notes, who's home, the commute, sunrise and sunset, the date and entity values, in the order you like. Small tags show which category each item is, in a colour you choose. |
| **Urgent items** | Urgent messages and weather alerts take over the bar in red for a few seconds, then join the scroll. Alerts always come first. |
| **Scroll or flip** | Glide continuously, or show one item at a time with a fade or slide. |
| **Time of day** | Change what's shown, the colours or anything else by time of day, or hide the marquee during quiet hours. |
| **Tap actions** | Tap a headline to open the article, tap a message to remove it, or tap to pause. |
| **Your language** | The card, its settings and what it says are in English, Spanish, French and German, following your Home Assistant language. |
| **Messages from automations** | Add, replace, remove or clear messages with actions. Messages can have an icon, a colour and a time limit, and survive restarts. |
| **Live values** | Scroll any entity's state, such as the outdoor temperature or the front door lock, next to your messages. |
| **Touch friendly** | Tap to pause and resume on a tablet; hover to pause on a computer. |

<p align="center">
  <img src="https://raw.githubusercontent.com/Degederon/grand-marquee/main/docs/images/styles.png" alt="Glass and plain marquees in different colours and fonts" width="100%">
</p>

## Take a tour

All pictures show the marquee on a Home Assistant dashboard with example messages. The settings for each one are under [Examples](#examples).

<table>
<tr>
<td width="50%" valign="top"><img src="https://raw.githubusercontent.com/Degederon/grand-marquee/main/docs/images/tour/01-pinned-bottom.jpg" alt="Pinned to the bottom of a wall tablet, floating over your usual dashboard." width="100%"><br><sub>Pinned to the bottom of a wall tablet, floating over your usual dashboard.</sub></td>
<td width="50%" valign="top"><img src="https://raw.githubusercontent.com/Degederon/grand-marquee/main/docs/images/tour/02-pinned-top.jpg" alt="Pinned to the top, just under the header. The Midnight preset keeps it calm on a dark screen." width="100%"><br><sub>Pinned to the top, just under the header. The Midnight preset keeps it calm on a dark screen.</sub></td>
</tr>
<tr>
<td width="50%" valign="top"><img src="https://raw.githubusercontent.com/Degederon/grand-marquee/main/docs/images/tour/03-inline.jpg" alt="Inside the dashboard like any other card, here across the top of a Sections view." width="100%"><br><sub>Inside the dashboard like any other card, here across the top of a Sections view.</sub></td>
<td width="50%" valign="top"><img src="https://raw.githubusercontent.com/Degederon/grand-marquee/main/docs/images/tour/04-live-values.jpg" alt="Live values scroll alongside your messages: the temperature, the front door, the washer." width="100%"><br><sub>Live values scroll alongside your messages: the temperature, the front door, the washer.</sub></td>
</tr>
<tr>
<td width="50%" valign="top"><img src="https://raw.githubusercontent.com/Degederon/grand-marquee/main/docs/images/tour/05b-professional.jpg" alt="Twelve professional palettes: muted colours, strong contrast and a soft glow." width="100%"><br><sub>Twelve professional palettes: muted colours, strong contrast and a soft glow.</sub></td>
<td width="50%" valign="top"><img src="https://raw.githubusercontent.com/Degederon/grand-marquee/main/docs/images/tour/05c-professional-plain.jpg" alt="The same twelve palettes in the Plain style, as solid bars." width="100%"><br><sub>The same twelve palettes in the Plain style, as solid bars.</sub></td>
</tr>
<tr>
<td width="50%" valign="top"><img src="https://raw.githubusercontent.com/Degederon/grand-marquee/main/docs/images/tour/05-presets.jpg" alt="Six colour presets: Frost, Aurora, Midnight, Rose, Ember and Light." width="100%"><br><sub>Six colour presets: Frost, Aurora, Midnight, Rose, Ember and Light.</sub></td>
<td width="50%" valign="top"><img src="https://raw.githubusercontent.com/Degederon/grand-marquee/main/docs/images/tour/06-custom-colours.jpg" alt="Pick your own glass tint, text, accent and glow colours." width="100%"><br><sub>Pick your own glass tint, text, accent and glow colours.</sub></td>
</tr>
<tr>
<td width="50%" valign="top"><img src="https://raw.githubusercontent.com/Degederon/grand-marquee/main/docs/images/tour/07-plain.jpg" alt="The Plain style: a flat, solid bar in exactly the colour you pick. No blur, glow or shine." width="100%"><br><sub>The Plain style: a flat, solid bar in exactly the colour you pick. No blur, glow or shine.</sub></td>
<td width="50%" valign="top"><img src="https://raw.githubusercontent.com/Degederon/grand-marquee/main/docs/images/tour/08-light-theme.jpg" alt="On a light Home Assistant theme, with the Light preset." width="100%"><br><sub>On a light Home Assistant theme, with the Light preset.</sub></td>
</tr>
<tr>
<td width="50%" valign="top"><img src="https://raw.githubusercontent.com/Degederon/grand-marquee/main/docs/images/tour/09-fonts.jpg" alt="Use your theme's font or pick another, such as Poppins, a serif or a monospace font." width="100%"><br><sub>Use your theme's font or pick another, such as Poppins, a serif or a monospace font.</sub></td>
<td width="50%" valign="top"><img src="https://raw.githubusercontent.com/Degederon/grand-marquee/main/docs/images/tour/10-big-ticker.jpg" alt="Make it tall and bold so it's easy to read from across the room." width="100%"><br><sub>Make it tall and bold so it's easy to read from across the room.</sub></td>
</tr>
<tr>
<td width="50%" valign="top"><img src="https://raw.githubusercontent.com/Degederon/grand-marquee/main/docs/images/tour/11-phone.jpg" alt="It works on phones too. Here it's pinned to the bottom with the Aurora preset." width="100%"><br><sub>It works on phones too. Here it's pinned to the bottom with the Aurora preset.</sub></td>
<td width="50%" valign="top"><img src="https://raw.githubusercontent.com/Degederon/grand-marquee/main/docs/images/tour/12-daily-briefing.jpg" alt="A daily briefing: the date, today's weather, your calendar, the shopping list and sunset, with category tags." width="100%"><br><sub>A daily briefing: the date, today's weather, your calendar, the shopping list and sunset, with category tags.</sub></td>
</tr>
<tr>
<td width="50%" valign="top"><img src="https://raw.githubusercontent.com/Degederon/grand-marquee/main/docs/images/tour/13-news.jpg" alt="Latest headlines by topic, tagged and with their source, next to your own messages." width="100%"><br><sub>Latest headlines by topic, tagged and with their source, next to your own messages.</sub></td>
<td width="50%" valign="top"><img src="https://raw.githubusercontent.com/Degederon/grand-marquee/main/docs/images/tour/14-urgent.jpg" alt="Urgent items take over the bar in red for a few seconds, then join the scroll. Weather alerts always come first." width="100%"><br><sub>Urgent items take over the bar in red for a few seconds, then join the scroll. Weather alerts always come first.</sub></td>
</tr>
<tr>
<td width="50%" valign="top"><img src="https://raw.githubusercontent.com/Degederon/grand-marquee/main/docs/images/tour/15-sports.jpg" alt="Live scores, tonight's games and final results for the teams you follow, with news about them." width="100%"><br><sub>Live scores, tonight's games and final results for the teams you follow, with news about them.</sub></td>
<td width="50%" valign="top"><img src="https://raw.githubusercontent.com/Degederon/grand-marquee/main/docs/images/tour/16-flip.jpg" alt="Flip mode shows one item at a time with a fade or slide. Here: notes from Glass Message Board." width="100%"><br><sub>Flip mode shows one item at a time with a fade or slide. Here: notes from Glass Message Board.</sub></td>
</tr>
<tr>
<td width="50%" valign="top"><img src="https://raw.githubusercontent.com/Degederon/grand-marquee/main/docs/images/tour/17-home-life.jpg" alt="Countdowns to dates and calendar events, who's home, and the drive to work." width="100%"><br><sub>Countdowns to dates and calendar events, who's home, and the drive to work.</sub></td>
<td width="50%"></td>
</tr>
</table>

### Architecture

A single installation provides two components:

- **Integration** (`grand_marquee`): stores and expires messages, fetches news and sports scores, summarises the weather, and provides actions and sensors.
- **Dashboard card** (`custom:grand-marquee`): the marquee itself, served by the integration and loaded on your dashboards.

## Requirements

- Home Assistant **2024.11** or later. On **2026.11** and later, install through the built-in **Marketplace**; on earlier versions, use **HACS**.
- A GitHub account, to add the repository to the Marketplace or HACS.
- Internet access on Home Assistant, only for news and sports; on the display, only if you choose one of the web fonts.
- For message board notes: [Glass Message Board](https://github.com/Degederon/GlassMessageBoard).
- For weather, calendar and to-do: any weather, calendar or to-do integration you already use in Home Assistant.

## Step-by-step setup

Follow these parts in order. Each one only needs to be done once.

### Part 1: Install the integration

**Using the Marketplace (Home Assistant 2026.11 and later)**

1. Go to **Settings → Marketplace**.
2. The first time, read the community-content warning and confirm.
3. Choose **Add via link**, paste `https://github.com/Degederon/grand-marquee`, and choose **Integration** if asked. You may be asked to connect your GitHub account.
4. Open **Grand Marquee** and select **Install**.
5. Restart Home Assistant: **Settings → System**, select the power icon (top right), then **Restart Home Assistant**.

**Using HACS (earlier versions)**

1. In HACS, open the menu (⋮) and select **Custom repositories**.
2. Paste `https://github.com/Degederon/grand-marquee`, choose the category **Integration**, and select **Add**.
3. Search for **Grand Marquee** and install it.
4. Restart Home Assistant.

**Manual installation**

1. Download the latest release.
2. Copy `custom_components/grand_marquee` into your `config/custom_components/` folder.
3. Restart Home Assistant.

### Part 2: Turn on the integration

Downloading the integration is not enough; it also has to be added.

1. Go to **Settings → Devices & services**.
2. Select **+ Add integration** (bottom right).
3. Search for **Grand Marquee**, select it, then select **Submit**.

To confirm it's working, open **Grand Marquee** on the **Devices & services** page. You should see a device with a **Messages** sensor.

### Part 3: Load the marquee's display file

This happens automatically: the integration adds the marquee under **Settings → Dashboards → Resources** and keeps it on the current version after every update. You don't need to do anything.

> [!TIP]
> To check that the file is reachable, open your Home Assistant address followed by `/grand_marquee/grand-marquee.js`, for example `http://homeassistant.local:8123/grand_marquee/grand-marquee.js`. You should see a page of code.

### Part 4: Add the marquee to a dashboard

1. Open the dashboard, select the pencil (top right) to edit it.
2. Select **+ Add card**, search for **Grand Marquee** and select it.
3. Pick a **Style** and **Color preset**, then open **Colors**, **Font** and **Layout & placement** to adjust anything you like. The preview updates as you go.
4. Select **Save**.

> [!NOTE]
> If you choose **Pinned to top of screen** or **Pinned to bottom of screen**, the marquee stays in place while you edit the dashboard so you can still select it. It moves to the edge of the screen when you select **Done**. For a bar pinned to the top, put the card first on the dashboard: it leaves room for itself so it doesn't cover the cards below.

### Part 5: Post your first message

1. Open **Developer tools** in the sidebar and choose the **Actions** tab.
2. Choose **Grand Marquee: Add message**, type some text, and select **Perform action**.
3. The message appears on the marquee straight away.

### Part 6: Choose what it shows (optional)

1. Edit the dashboard and open the marquee card.
2. Under **What to show**, tick what you want. Settings for each one appear when you tick it:

   | Source | Shows |
   |---|---|
   | **Messages** | Messages from automations and any you type in. |
   | **Weather alerts** | Warnings from alert entities you pick (for example Meteoalarm or NWS alerts). Always first, in red. |
   | **Weather** | Today's conditions, the temperature now, the high and low and the chance of rain. |
   | **News** | Headlines by topic or keyword. |
   | **Sports scores** | Live scores, upcoming games and final results. |
   | **Calendar** | Upcoming events. |
   | **Countdowns** | "Christmas in 54 days", from dates you type in or events in a calendar. |
   | **To-do lists** | Open items from your to-do and shopping lists. |
   | **Message board notes** | Notes from Glass Message Board, pinned ones first. |
   | **Who's home** | Where each person is. |
   | **Commute** | Travel time sensors, such as Waze or Google travel time. |
   | **Sunrise & sunset**, **Date**, **Entity values** | As named. |

3. Select **Save**.

**For news, sports and the weather summary**, first tell Home Assistant what to fetch:

1. Go to **Settings → Devices & services → Grand Marquee** and select **Configure**.
2. Tick the **News topics** you want (Top stories, World, National, Business, Technology, Entertainment, Sports, Science, Health). They come from Google News, in your Home Assistant language and country.
3. Under **News about keywords**, add anything you want news about, one per line: your team, your town, a hobby. Each keyword becomes its own topic.
4. Optionally paste the web address of any other news feed (RSS or Atom), one per line, under **Extra news feeds**.
5. Under **Sports leagues to follow**, pick leagues (NFL, NBA, MLB, NHL, MLS, Premier League and more). Under **Teams to follow**, add team names or abbreviations, one per line, or leave it empty for every game.
6. Optionally pick the **Weather** entity for the weather summary sensor.
7. Select **Submit**. Headlines and scores appear within a minute.

Each marquee can then show all of those, or only some, under **News topics** and **Leagues** in the card.

> [!NOTE]
> Sports scores come from ESPN's public scoreboard data. It's free and needs no account, but it isn't an official service, so it could change without notice.

## Dashboard configuration

Everything below can be set in the card editor. To edit it as YAML instead, open the card's **⋮** menu and choose **Edit in YAML**.

```yaml
type: custom:grand-marquee
title: Home              # optional label on the left
title_icon: mdi:home
style: glass             # glass | plain
theme: aurora            # frost | aurora | midnight | rose | ember | light
font_family: poppins
speed: 70                # pixels per second
position: bottom         # inline | top | bottom
entities:
  - sensor.outdoor_temperature
  - entity: lock.front_door
    name: Front door
    icon: mdi:door
messages:
  - Welcome home ✨
```

| Option | Default | Description |
|---|---|---|
| `sources` | `[messages, entities]` | What to show, in this order: `messages`, `alerts`, `weather`, `news`, `sports`, `calendar`, `countdown`, `todo`, `board`, `people`, `travel`, `sun`, `date`, `entities`. Alerts always come first. |
| `show_tags` | `true` | Show a small category tag (Weather, Tech, Calendar…) before items. |
| `weather_entity` | first weather entity | The weather entity for the `weather` source. |
| `weather_tomorrow` | `false` | Also show tomorrow's forecast. |
| `news_topics` | all turned on | Which topics to show: `top`, `world`, `nation`, `business`, `technology`, `entertainment`, `sports`, `science`, `health`, `custom` (your extra feeds), or a keyword topic such as `kw:tampa-bay-lightning`. |
| `sports_leagues`, `sports_count` | all you follow, 8 | Which leagues to show (`nfl`, `ncaaf`, `nba`, `wnba`, `ncaab`, `mlb`, `nhl`, `mls`, `epl`, `laliga`, `ucl`), and how many games. |
| `alerts_entities`, `alerts_urgent` | –, `true` | Alert entities to watch, and whether new alerts take over the bar. |
| `countdowns` | – | A list of `{name, date, icon}`. `date` is `MM-DD` (every year) or `YYYY-MM-DD` (once). In the editor, type one per line, such as `Christmas: 12-25`. |
| `countdown_calendars`, `countdown_days` | –, 90 | Also count down to events in these calendars; only show countdowns this many days ahead. |
| `board_count`, `board_drawings` | 8, `true` | How many Glass Message Board notes, and whether to include drawings. |
| `people_entities` | all | Which people to show under Who's home. |
| `travel_entities` | – | Travel time sensors to show under Commute. |
| `<source>_color` | preset accent (`alerts`: red) | A colour for each category's icon and tag, for example `news_color: "#e2e8f0"` or `weather_color: [125, 211, 252]`. |
| `mode` | `scroll` | `scroll`, or `flip` to show one item at a time. |
| `flip_seconds`, `flip_effect` | 5, `fade` | How long each item shows in flip mode, and `fade` or `slide`. Long items glide across before the next one. |
| `urgent_seconds`, `urgent_repeat` | 8, 0 | How long urgent items take over the bar, and how often (minutes) to repeat them; 0 shows each one once. |
| `open_links`, `dismiss_on_tap` | `true`, `false` | Tap a headline to open it; tap a message to remove it. |
| `schedule` | – | Different settings by time of day. See [Time of day and quiet hours](#time-of-day-and-quiet-hours). |
| `opacity` | 1 | Make the whole marquee more see-through, from 0.1 to 1. |
| `respect_reduced_motion` | `false` | Stop scrolling when the device's reduce-motion setting is on (Windows **Animation effects** off, Android **Remove animations**, iOS **Reduce Motion**). |
| `news_count`, `news_source` | 8, `true` | How many headlines, and whether to show where each one is from. |
| `calendar_entities`, `calendar_count`, `calendar_hours` | all, 6, 24 | Which calendars, how many events, and how many hours ahead to look. |
| `todo_entities`, `todo_count` | all, 5 | Which to-do lists, and how many items to name per list. |
| `entity` | `sensor.grand_marquee_messages` | Where messages come from. Any entity with a `messages` attribute works; for other entities the state is shown. Set to `""` to turn off. |
| `messages` | – | Messages that are always shown: text, or `{text, icon, color}`. |
| `entities` | – | Entity states to scroll: an entity ID, or `{entity, name, icon, color}`. |
| `style` | `glass` | `plain` gives a flat bar in exactly the colour you choose, without blur, sheen, glow or shadows. |
| `theme` | `frost` | Colour preset: `frost`, `aurora`, `midnight`, `rose`, `ember`, `light`, or a professional palette: `slate`, `graphite`, `navy`, `harbor`, `evergreen`, `sage`, `burgundy`, `copper`, `plum`, `sand`, `arctic`, `mono`. Each preset also has its own solid colour for the plain style. |
| `tint_color`, `text_color`, `accent_color`, `border_color`, `glow_color` | from preset | `"#7dd3fc"`, `"125,211,252"` or `[125, 211, 252]`. In the plain style `tint_color` is the background. |
| `tint_opacity`, `glow_strength` | from preset | 0 to 1. The plain style is fully opaque unless you change it. |
| `border_width` | 1 (glass), 0 (plain) | Pixels. |
| `blur` | 18 | Background blur in pixels (glass only). |
| `font_family` | `theme` | `theme`, `system`, `serif`, `mono`, `rounded`, `inter`, `poppins`, `roboto`, `montserrat`, `nunito`, `quicksand`, `playfair`, `bebas`, `orbitron`, `jetbrains`, or `custom`. |
| `font_family_custom` | – | Any font name, used with `font_family: custom`. |
| `load_web_font` | `false` | With `custom`, also download that font from Google Fonts. |
| `font_size`, `font_weight`, `uppercase` | 20, 500, `false` | Web fonts only come in the weights they ship (Bebas Neue has 400 only). |
| `speed`, `direction` | 70, `left` | Pixels per second, and `left` or `right`. |
| `height`, `border_radius`, `gap`, `separator` | 56, 18, 40, `•` | |
| `position`, `offset` | `inline`, 12 | `top` and `bottom` pin the marquee to the screen; `offset` is the distance from the edge. |
| `reserve_space` | `true` for top, `false` for bottom | When pinned, leave a gap the marquee's height where the card sits, so it doesn't cover the cards below it. |
| `fade_edges`, `pause_on_hover`, `show_icons` | `true` | |
| `tap_to_pause` | `true` | Tap the marquee to pause and resume. |
| `hide_when_empty`, `empty_text` | `false`, `No messages` | |

### Time of day and quiet hours

Add a `schedule` in the card's YAML to change any setting by time of day. The first block whose time matches wins; outside every block, the card's normal settings apply. Blocks can run past midnight, and `days` is optional.

```yaml
type: custom:grand-marquee
sources: [news, sports, messages]
schedule:
  - from: "06:00"
    to: "09:00"
    sources: [date, weather, calendar, todo, messages]   # morning briefing
    theme: arctic
  - from: "22:00"
    to: "06:30"
    hide: true                                           # quiet hours
  - from: "17:00"
    to: "22:00"
    days: [sat, sun]
    opacity: 0.6
```

> [!TIP]
> The web fonts are downloaded from Google Fonts the first time the marquee is shown. Without internet access the marquee uses the system font instead. The theme, System, Serif, Monospace and Rounded fonts never download anything.

## Examples

Each example matches a picture in the tour. Paste the YAML into a card's **Edit in YAML** view, or recreate it in the card editor.

### Placement

Where the marquee sits on the screen.

#### Pinned to the bottom of a wall tablet

Pinned to the bottom of a wall tablet, floating over your usual dashboard.

```yaml
type: custom:grand-marquee
title: Home
title_icon: mdi:home
position: bottom
```

#### Pinned to the top

Pinned to the top, just under the header. The Midnight preset keeps it calm on a dark screen.

Put it first on the dashboard. A bar pinned to the top leaves a gap its own height where it sits, so it doesn't cover the cards below it.

```yaml
type: custom:grand-marquee
theme: midnight
position: top
height: 48
font_size: 18
```

#### Inside the dashboard

Inside the dashboard like any other card, here across the top of a Sections view.

Add it to a section and set its width to full in the Layout tab.

```yaml
type: custom:grand-marquee
theme: aurora
title: Today
title_icon: mdi:calendar
```

#### On a phone

It works on phones too. Here it's pinned to the bottom with the Aurora preset.

```yaml
type: custom:grand-marquee
theme: aurora
position: bottom
height: 48
font_size: 17
offset: 10
```

### Colours

Start from a preset, then change any colour you like.

#### Six colour presets

Six colour presets: Frost, Aurora, Midnight, Rose, Ember and Light.

```yaml
type: custom:grand-marquee
theme: aurora   # frost, aurora, midnight, rose, ember or light
```

#### Twelve professional palettes

Twelve professional palettes: muted colours, strong contrast and a soft glow.

```yaml
type: custom:grand-marquee
theme: navy   # slate, graphite, navy, harbor, evergreen, sage,
               # burgundy, copper, plum, sand, arctic or mono
```

#### Professional palettes, plain style

The same twelve palettes in the Plain style, as solid bars.

```yaml
type: custom:grand-marquee
style: plain
theme: burgundy
```

#### Your own colours

Pick your own glass tint, text, accent and glow colours.

**Emerald**

```yaml
type: custom:grand-marquee
tint_color: '#10b981'
tint_opacity: 0.3
accent_color: '#fde047'
glow_color: '#34d399'
glow_strength: 0.5
```

**Gold on violet**

```yaml
type: custom:grand-marquee
tint_color: '#4c1d95'
tint_opacity: 0.55
text_color: '#fde68a'
accent_color: '#fbbf24'
border_color: '#fbbf24'
glow_color: '#f59e0b'
glow_strength: 0.45
```

**Candy**

```yaml
type: custom:grand-marquee
tint_color: '#f43f5e'
tint_opacity: 0.35
accent_color: '#ffffff'
border_color: '#fecdd3'
glow_color: '#fb7185'
glow_strength: 0.6
```

**Ice**

```yaml
type: custom:grand-marquee
tint_color: '#e0f2fe'
tint_opacity: 0.35
text_color: '#0c4a6e'
accent_color: '#0284c7'
glow_color: '#7dd3fc'
glow_strength: 0.3
```

#### Plain style

The Plain style: a flat, solid bar in exactly the colour you pick. No blur, glow or shine.

**Navy**

```yaml
type: custom:grand-marquee
style: plain
tint_color: '#1e3a8a'
accent_color: '#fde047'
```

**Forest, square corners**

```yaml
type: custom:grand-marquee
style: plain
tint_color: '#14532d'
accent_color: '#86efac'
border_radius: 0
```

**Signal red**

```yaml
type: custom:grand-marquee
style: plain
tint_color: '#b91c1c'
accent_color: '#ffffff'
font_weight: 700
```

**Charcoal with a border**

```yaml
type: custom:grand-marquee
style: plain
tint_color: '#262626'
border_color: '#525252'
border_width: 2
accent_color: '#f97316'
```

#### Light theme

On a light Home Assistant theme, with the Light preset.

```yaml
type: custom:grand-marquee
theme: light
position: bottom
title: Home
title_icon: mdi:home
```

### Text and size

Fonts, size and weight.

#### Fonts

Use your theme's font or pick another, such as Poppins, a serif or a monospace font.

**Theme font**

```yaml
type: custom:grand-marquee
theme: aurora
```

**Poppins**

```yaml
type: custom:grand-marquee
theme: aurora
font_family: poppins
```

**Serif**

```yaml
type: custom:grand-marquee
theme: aurora
font_family: serif
font_size: 22
```

**Monospace, uppercase**

```yaml
type: custom:grand-marquee
theme: aurora
font_family: mono
uppercase: true
font_size: 18
font_weight: 600
```

#### Readable across the room

Make it tall and bold so it's easy to read from across the room.

Put it first on the dashboard so the cards start below it.

```yaml
type: custom:grand-marquee
theme: ember
position: top
height: 96
font_size: 40
font_weight: 700
uppercase: true
gap: 64
separator: ✦
```

### What it shows

Pick any mix of messages, weather, news, sports, calendar, countdowns, to-do lists, board notes, who's home, the commute, sunrise and sunset, the date and entity values.

#### A daily briefing

A daily briefing: the date, today's weather, your calendar, the shopping list and sunset, with category tags.

Put it first on the dashboard. Leave `weather_entity`, `calendar_entities` and `todo_entities` out to use all of them.

```yaml
type: custom:grand-marquee
theme: navy
position: top
sources:
- date
- weather
- calendar
- todo
- sun
weather_tomorrow: true
```

#### Latest headlines

Latest headlines by topic, tagged and with their source, next to your own messages.

Turn the topics on first under **Settings → Devices & services → Grand Marquee → Configure**.

```yaml
type: custom:grand-marquee
theme: graphite
position: bottom
sources:
- news
- messages
news_topics:
- top
- technology
- sports
news_count: 6
```

#### Sports scores

Live scores, tonight's games and final results for the teams you follow, with news about them.

Pick leagues and teams under **Settings → Devices & services → Grand Marquee → Configure**.

```yaml
type: custom:grand-marquee
theme: slate
position: bottom
sources:
- sports
- news
news_topics:
- kw:tampa-bay-lightning
- sports
news_count: 3
```

#### Countdowns, who's home and the commute

Countdowns to dates and calendar events, who's home, and the drive to work.

```yaml
type: custom:grand-marquee
theme: sage
position: bottom
sources:
- countdown
- people
- travel
countdowns:
- name: Christmas
  date: 12-25
countdown_calendars:
- calendar.birthdays
travel_entities:
- sensor.commute_to_work
```

#### Live values

Live values scroll alongside your messages: the temperature, the front door, the washer.

```yaml
type: custom:grand-marquee
theme: rose
position: bottom
entities:
- sensor.outdoor_temperature
- entity: lock.front_door
  icon: mdi:door-closed-lock
- sensor.washer_status
- entity: sensor.energy_today
  name: Energy
```

### Alerts and display

Urgent items, weather alerts and showing one item at a time.

#### Urgent items and weather alerts

Urgent items take over the bar in red for a few seconds, then join the scroll. Weather alerts always come first.

Send your own urgent message with `grand_marquee.add_message` and `urgent: true`.

```yaml
type: custom:grand-marquee
theme: graphite
position: top
sources:
- alerts
- weather
- messages
alerts_entities:
- binary_sensor.storm_warning
urgent_seconds: 10
```

#### One at a time

Flip mode shows one item at a time with a fade or slide. Here: notes from Glass Message Board.

```yaml
type: custom:grand-marquee
theme: harbor
mode: flip
flip_effect: slide
sources:
- board
height: 72
font_size: 26
```

## Actions

| Action | Description |
|---|---|
| `grand_marquee.add_message` | Add a message. Using an `id` that already exists replaces that message. |
| `grand_marquee.remove_message` | Remove the message with the given `id`. |
| `grand_marquee.clear_messages` | Remove every message. |
| `grand_marquee.set_messages` | Replace all messages at once with a list. |

### `grand_marquee.add_message` fields

| Field | Required | Description |
|---|---|---|
| `text` | Yes | The message. |
| `icon` | No | An icon, for example `mdi:silverware-fork-knife`. |
| `color` | No | Accent colour for this message, for example `"#fbbf24"`. |
| `duration` | No | Remove the message automatically after this long, for example `"01:00:00"`. |
| `id` | No | A name for the message, so you can replace or remove it later. |
| `urgent` | No | `true` shows it in red across the whole marquee for a few seconds before it joins the scroll. |

## Entities

| Entity | Description |
|---|---|
| `sensor.grand_marquee_messages` | The number of messages. The `messages` attribute holds the list the marquee shows. |
| `sensor.grand_marquee_news` | The number of headlines. The `headlines` attribute holds them, with their title, source, topic and link. Headlines aren't saved in your history. |
| `sensor.grand_marquee_news_<topic>` | One per news topic and keyword, such as `sensor.grand_marquee_news_sports`. The state is the newest headline; `headlines` holds the rest. |
| `sensor.grand_marquee_sports` | The number of games. `games` holds each one's teams, score, status and start time; `live` counts games in progress. |
| `sensor.grand_marquee_weather_summary` | Today's weather in one sentence, such as "Partly cloudy, 72°F now, high 78°, low 61°, 20% chance of rain". `tomorrow` holds tomorrow's. |

## Automation examples

### Tell everyone the laundry is done

```yaml
alias: Laundry done on the marquee
triggers:
  - trigger: state
    entity_id: sensor.washer_status
    to: complete
actions:
  - action: grand_marquee.add_message
    data:
      id: laundry
      text: Laundry is done — move it to the dryer
      icon: mdi:washing-machine
      duration: "02:00:00"
```

### Keep a live status line up to date

Using the same `id` each time replaces the message instead of adding a new one.

```yaml
alias: Next train on the marquee
triggers:
  - trigger: state
    entity_id: sensor.next_train
actions:
  - action: grand_marquee.add_message
    data:
      id: train
      text: "Next train: {{ states('sensor.next_train') }}"
      icon: mdi:train
```

### Announce the weather every morning

```yaml
alias: Morning weather
triggers:
  - trigger: time
    at: "07:00:00"
actions:
  - action: notify.mobile_app_your_phone
    data:
      message: "{{ states('sensor.grand_marquee_weather_summary') }}"
```

### Flag something urgent

```yaml
alias: Garage left open
triggers:
  - trigger: state
    entity_id: cover.garage_door
    to: open
    for: "00:15:00"
actions:
  - action: grand_marquee.add_message
    data:
      id: garage
      text: The garage door has been open for 15 minutes
      icon: mdi:garage-open
      urgent: true
```

### Clear the marquee at bedtime

```yaml
alias: Clear marquee at night
triggers:
  - trigger: time
    at: "23:00:00"
actions:
  - action: grand_marquee.clear_messages
```

## Languages

Grand Marquee speaks four languages. Other languages show in English.

| Language | Setup and options | Card editor | What scrolls by | Weather summary sensor | News headlines |
|---|---|---|---|---|---|
| English | ✓ | ✓ | ✓ | ✓ | ✓ |
| German (Deutsch) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Spanish (Español) | ✓ | ✓ | ✓ | ✓ | ✓ |
| French (Français) | ✓ | ✓ | ✓ | ✓ | ✓ |

- **What scrolls by** covers the words the marquee adds itself: category tags, weather words, countdowns ("in 3 days"), sunrise and sunset, and "Final" or "Live" on sports scores. Your own messages show exactly as you write them.
- **The card and its editor** follow the language in your Home Assistant profile: select your name at the bottom of the sidebar and set **Language**.
- **Setup, the weather summary sensor and news** follow Home Assistant's own language, under **Settings → System → General**. News comes from Google News in that language and your country.

## Troubleshooting

### A red "Configuration error" box appears instead of the marquee

Your browser hasn't loaded the marquee's display file. Work through these steps in order and check the dashboard after each one.

1. Go to **Settings → Devices & services** and check that **Grand Marquee** is listed. If it isn't, complete [Part 2](#part-2-turn-on-the-integration).
2. Restart Home Assistant, then hard-refresh the page (**Ctrl + Shift + R**, or **Reset frontend cache** in the companion app).
3. Go to **Settings → Dashboards → ⋮ → Resources** (turn on **Advanced mode** in your profile if you don't see it) and check that `/grand_marquee/grand-marquee.js` is listed as a **JavaScript module**. If it's missing, select **+ Add resource**, enter `/grand_marquee/grand-marquee.js` as a **JavaScript module**, and refresh again.
4. Open your Home Assistant address followed by `/grand_marquee/grand-marquee.js`, for example `http://homeassistant.local:8123/grand_marquee/grand-marquee.js`.
   - If you see a page of code, the file is fine: clear the browser cache and try again.
   - If you see **404: Not Found**, go to **Settings → System → Logs**, search for `grand_marquee`, and include what you find when reporting the problem.
5. Still red? Edit the dashboard, select the red card, and note the full error text underneath. Include it when reporting the problem.

### Other problems

| Problem | Solution |
|---|---|
| The marquee says **No messages** | Nothing has been posted yet. Post one as described in [Part 5](#part-5-post-your-first-message), or add static `messages` or `entities` to the card. |
| A tile says **Grand Marquee – Up-to-date** | That is the Marketplace's update tracker, not the marquee. Delete the tile and add the marquee as described in [Part 4](#part-4-add-the-marquee-to-a-dashboard). |
| The pinned marquee covers something | Move the card to the top of the dashboard and turn on **Leave room so it doesn't cover cards** under **Layout & placement**. You can also change **Edge offset**, or switch **Placement** to the other edge. |
| The font didn't change | Web fonts need internet access on the display. Check the tablet is online, or choose a font that isn't downloaded (theme, System, Serif, Monospace or Rounded). |
| The colours look washed out on the glass style | The glass lets the background show through. Raise **Tint strength**, or switch **Style** to **Plain** for a solid colour. |
| The marquee isn't moving | Update to 1.2.1 or later, restart Home Assistant and hard-refresh the browser (**Ctrl + Shift + R**). If it's still, it may be paused: tap it once. If **Stop scrolling when the device asks for less motion** is on, it stays still on devices with reduce motion turned on. |
| Weather shows no high, low or chance of rain | Your weather integration doesn't provide a forecast. The current conditions still show. Pick a different entity under **Weather** if you have one with a forecast. |
| No headlines appear | Check that topics are ticked under **Settings → Devices & services → Grand Marquee → Configure**, and that Home Assistant can reach the internet. If the marquee says **Turn on … news**, tick that topic there. Problems reading a feed are listed in **Settings → System → Logs**. |
| Calendar or to-do items are missing | Only events in the next **Look ahead** hours and to-do items that aren't checked off are shown. The marquee checks for changes every 10 minutes and whenever the calendar or list changes. |
| No sports scores | Pick leagues under **Configure**. If you listed teams, check the names or abbreviations match how ESPN writes them, for example `TB` or `Lightning`. Problems reaching ESPN are listed in **Settings → System → Logs**. |
| Board notes don't show | Glass Message Board must be installed and set up. The marquee says so if it can't find it. |
| An alert keeps taking over the bar | Each alert takes over once when it appears. Set `urgent_repeat` to 0, or turn off **Show alerts as urgent**. |
| The marquee disappeared at night | A `schedule` block with `hide: true` is active. |
| A message disappeared | It reached the `duration` it was given. Leave `duration` out to keep a message until it's removed. |
| The Marketplace doesn't offer an update | Open **Grand Marquee** in the Marketplace, open the **⋮** menu and choose **Update information**. Updates appear once a new release is published on GitHub. |
| The marquee still looks like the old version after an update | Restart Home Assistant, then hard-refresh the browser or reset the companion app's frontend cache. The integration updates the version number in your resources automatically. |

## Contributing

Bug reports and pull requests are welcome. When reporting a problem, please include your Home Assistant version, browser, and any relevant entries from the Home Assistant log.

## License

Released under the [MIT License](LICENSE).
