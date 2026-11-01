# Glass Marquee

A smooth, glass-styled scrolling marquee for Home Assistant dashboards — built to match the Glass Message Board look, with every color configurable.

**What you get**

- **`custom:glass-marquee-card`** — the marquee itself. Loaded automatically on every dashboard; no resource to add.
- **`sensor.glass_marquee_messages`** — holds the current messages (state = count, `messages` attribute = list). Survives restarts.
- **Services** to push messages from automations: `add_message`, `remove_message`, `clear_messages`, `set_messages`.

## Install

**HACS (custom repository):** HACS → ⋮ → *Custom repositories* → add `https://github.com/Degederon/grand-marquee` as *Integration* → download → restart.

**Manual:** copy `custom_components/glass_marquee` into your `/config/custom_components/` folder → restart.

Then **Settings → Devices & services → Add integration → Glass Marquee**. Requires Home Assistant 2024.7 or newer.

## Add the card

Edit a dashboard → *Add card* → search **Glass Marquee**. The visual editor lets you choose **Glass** or **Plain** style, pick every color, choose a font, and set speed, direction, size and placement.

```yaml
type: custom:glass-marquee-card
title: Home              # optional pill on the left
title_icon: mdi:home
theme: aurora            # frost | aurora | midnight | rose | ember | light
style: glass             # glass | plain (solid color, no blur/sheen/glow)
font_family: poppins     # see font list below
speed: 70                # px per second — same pace for short or long text
direction: left          # left | right
position: bottom         # inline | top | bottom (top/bottom pin it to the screen)
entities:                # optional: scroll live entity states too
  - sensor.outdoor_temperature
  - entity: lock.front_door
    name: Front door
    icon: mdi:door
messages:                # optional static messages
  - Welcome home ✨
```

### All options

| Option | Default | Notes |
|---|---|---|
| `entity` | `sensor.glass_marquee_messages` | Any entity with a `messages` attribute; otherwise its state is shown. Set to `""` to disable. |
| `messages` | – | Strings or `{text, icon, color}` objects. |
| `entities` | – | Entity ids or `{entity, name, icon, color}`. |
| `style` | `glass` | `plain` gives a flat bar in exactly the color you pick — no blur, sheen, glow or shadows. |
| `theme` | `frost` | Color preset; individual colors below override it. In plain style each preset has its own solid background. |
| `tint_color`, `text_color`, `accent_color`, `border_color`, `glow_color` | from theme | Hex (`"#7dd3fc"`), `"r,g,b"` or `[r, g, b]`. In plain style `tint_color` is the background color. |
| `tint_opacity` / `glow_strength` | from theme | 0–1. Plain style defaults to fully opaque. |
| `border_width` | 1 glass / 0 plain | px. |
| `blur` | 18 | Backdrop blur, px (glass only). |
| `font_family` | `theme` | `theme`, `system`, `serif`, `mono`, `rounded`, or a web font: `inter`, `poppins`, `roboto`, `montserrat`, `nunito`, `quicksand`, `playfair`, `bebas`, `orbitron`, `jetbrains`. Or `custom` with the options below. |
| `font_family_custom` | – | Any font name (used with `font_family: custom`) — e.g. one installed on the tablet or loaded by your HA theme. |
| `load_web_font` | false | With `custom`, also fetch that name from Google Fonts. |
| `speed` / `direction` | 70 / left | |
| `height` / `font_size` / `font_weight` | 56 / 20 / 500 | Web fonts only include weights they ship (Bebas Neue is 400 only). |
| `border_radius` / `gap` / `separator` | 18 / 40 / `•` | |
| `position` / `offset` | inline / 12 | `top` and `bottom` pin the marquee over the dashboard (stays inline while editing). |
| `fade_edges` / `pause_on_hover` / `show_icons` / `uppercase` | true / true / true / false | Tapping the marquee also pauses/resumes it (`tap_to_pause: false` to disable). |
| `hide_when_empty` / `empty_text` | false / "No messages" | |

## Services

```yaml
# Add (re-using an id replaces that message — great for live status lines)
action: glass_marquee.add_message
data:
  text: "Dinner at 6:30 🍝"
  icon: mdi:silverware-fork-knife
  color: "#fbbf24"
  duration: "01:00:00"   # auto-remove after an hour
  id: dinner

action: glass_marquee.remove_message
data: { id: dinner }

action: glass_marquee.clear_messages

action: glass_marquee.set_messages
data:
  messages:
    - Good morning!
    - { text: Trash day, icon: mdi:delete }
```

### Example automation

```yaml
alias: Washer done → marquee
triggers:
  - trigger: state
    entity_id: sensor.washer_status
    to: "complete"
actions:
  - action: glass_marquee.add_message
    data:
      id: washer
      text: Laundry is done — move it to the dryer
      icon: mdi:washing-machine
      duration: "02:00:00"
```

### Plain bar example

```yaml
type: custom:glass-marquee-card
style: plain
tint_color: "#1e3a8a"
text_color: "#ffffff"
accent_color: "#fde047"
font_family: serif
```

**About web fonts:** the named web fonts (and `load_web_font`) are downloaded from Google Fonts the first time the card shows, so the tablet needs internet access for them. Without it the card falls back to the system font. Theme, system, serif, mono and rounded never download anything.

## How the scrolling stays smooth

The card measures one full set of messages, repeats it just enough to cover the screen, and slides the strip by exactly one set width on the GPU (Web Animations API, `translate3d`). That makes the loop seamless and the speed constant in px/s. When messages change or the screen resizes, it rebuilds while keeping its current position, so the text never jumps back to the start. It re-measures once a web font finishes loading, so the loop stays seamless with any font. It also respects the device's *reduce motion* setting.
