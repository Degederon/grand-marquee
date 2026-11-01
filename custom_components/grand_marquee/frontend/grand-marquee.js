/*
 * Grand Marquee — smooth, glass-styled scrolling ticker for Home Assistant.
 * Shipped and auto-registered by the grand_marquee integration (can also be
 * added manually as a dashboard resource).
 */
const GM_VERSION = "1.1.0";

// `plain` is the solid background used when style: plain and no custom color is set.
const THEMES = {
  frost:    { tint: [255, 255, 255], tint_opacity: 0.14, plain: [30, 41, 59],    text: [255, 255, 255], accent: [125, 211, 252], border: [255, 255, 255], glow: [125, 211, 252], glow_strength: 0.25 },
  aurora:   { tint: [56, 189, 248],  tint_opacity: 0.18, plain: [15, 118, 110],  text: [240, 253, 250], accent: [52, 211, 153],  border: [167, 243, 208], glow: [45, 212, 191],  glow_strength: 0.35 },
  midnight: { tint: [15, 23, 42],    tint_opacity: 0.45, plain: [15, 23, 42],    text: [226, 232, 240], accent: [129, 140, 248], border: [148, 163, 184], glow: [99, 102, 241],  glow_strength: 0.30 },
  rose:     { tint: [244, 114, 182], tint_opacity: 0.18, plain: [157, 23, 77],   text: [255, 241, 242], accent: [251, 191, 36],  border: [253, 164, 175], glow: [244, 114, 182], glow_strength: 0.35 },
  ember:    { tint: [249, 115, 22],  tint_opacity: 0.16, plain: [154, 52, 18],   text: [255, 247, 237], accent: [253, 224, 71],  border: [253, 186, 116], glow: [251, 146, 60],  glow_strength: 0.35 },
  light:    { tint: [255, 255, 255], tint_opacity: 0.55, plain: [248, 250, 252], text: [15, 23, 42],    accent: [37, 99, 235],   border: [203, 213, 225], glow: [147, 197, 253], glow_strength: 0.20 },

  // Professional palettes: muted, high-contrast, low glow.
  slate:     { tint: [51, 65, 85],    tint_opacity: 0.55, plain: [51, 65, 85],    text: [241, 245, 249], accent: [56, 189, 248],  border: [148, 163, 184], glow: [100, 116, 139], glow_strength: 0.15 },
  graphite:  { tint: [23, 23, 23],    tint_opacity: 0.65, plain: [28, 28, 30],    text: [245, 245, 245], accent: [245, 158, 11],  border: [82, 82, 91],    glow: [0, 0, 0],       glow_strength: 0.10 },
  navy:      { tint: [23, 37, 84],    tint_opacity: 0.60, plain: [23, 37, 84],    text: [239, 246, 255], accent: [212, 175, 55],  border: [96, 115, 170],  glow: [37, 99, 235],   glow_strength: 0.18 },
  harbor:    { tint: [12, 74, 110],   tint_opacity: 0.55, plain: [12, 74, 110],   text: [240, 249, 255], accent: [103, 232, 249], border: [125, 211, 252], glow: [14, 165, 233],  glow_strength: 0.18 },
  evergreen: { tint: [20, 83, 45],    tint_opacity: 0.58, plain: [20, 83, 45],    text: [240, 253, 244], accent: [190, 242, 100], border: [134, 239, 172], glow: [34, 197, 94],   glow_strength: 0.15 },
  sage:      { tint: [94, 117, 98],   tint_opacity: 0.55, plain: [84, 104, 88],   text: [247, 248, 240], accent: [245, 230, 190], border: [190, 205, 185], glow: [134, 160, 138], glow_strength: 0.12 },
  burgundy:  { tint: [94, 23, 45],    tint_opacity: 0.60, plain: [104, 25, 49],   text: [255, 241, 242], accent: [232, 180, 150], border: [190, 120, 140], glow: [159, 18, 57],   glow_strength: 0.18 },
  copper:    { tint: [87, 52, 30],    tint_opacity: 0.60, plain: [92, 56, 33],    text: [255, 247, 237], accent: [217, 119, 6],   border: [180, 120, 80],  glow: [194, 101, 42],  glow_strength: 0.18 },
  plum:      { tint: [59, 34, 86],    tint_opacity: 0.58, plain: [59, 34, 86],    text: [245, 243, 255], accent: [196, 181, 253], border: [167, 139, 250], glow: [124, 58, 237],  glow_strength: 0.18 },
  sand:      { tint: [245, 235, 220], tint_opacity: 0.80, plain: [240, 230, 212], text: [41, 37, 36],    accent: [180, 83, 9],    border: [214, 197, 170], glow: [217, 180, 130], glow_strength: 0.12 },
  arctic:    { tint: [241, 245, 249], tint_opacity: 0.80, plain: [236, 242, 248], text: [15, 23, 42],    accent: [30, 64, 175],   border: [203, 213, 225], glow: [148, 163, 184], glow_strength: 0.12 },
  mono:      { tint: [0, 0, 0],       tint_opacity: 0.70, plain: [0, 0, 0],       text: [255, 255, 255], accent: [255, 255, 255], border: [115, 115, 115], glow: [0, 0, 0],       glow_strength: 0.0 },
};

// Font choices. `google` fonts are fetched from Google Fonts on first use;
// the rest use what's already on the device / in your HA theme.
const FONTS = {
  theme:     { label: "Home Assistant theme", css: 'var(--ha-font-family-body, var(--paper-font-body1_-_font-family, system-ui, sans-serif))' },
  system:    { label: "System", css: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' },
  serif:     { label: "Serif", css: 'Georgia, "Times New Roman", serif' },
  mono:      { label: "Monospace", css: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace' },
  rounded:   { label: "Rounded", css: 'ui-rounded, "SF Pro Rounded", "Nunito", system-ui, sans-serif' },
  inter:     { label: "Inter", google: "Inter", weights: "300;400;500;600;700;800" },
  poppins:   { label: "Poppins", google: "Poppins", weights: "300;400;500;600;700;800" },
  roboto:    { label: "Roboto", google: "Roboto", weights: "300;400;500;700" },
  montserrat:{ label: "Montserrat", google: "Montserrat", weights: "300;400;500;600;700;800" },
  nunito:    { label: "Nunito", google: "Nunito", weights: "300;400;500;600;700;800" },
  quicksand: { label: "Quicksand", google: "Quicksand", weights: "300;400;500;600;700" },
  playfair:  { label: "Playfair Display", google: "Playfair Display", weights: "400;500;600;700;800" },
  bebas:     { label: "Bebas Neue", google: "Bebas Neue", weights: "400" },
  orbitron:  { label: "Orbitron", google: "Orbitron", weights: "400;500;600;700;800" },
  jetbrains: { label: "JetBrains Mono", google: "JetBrains Mono", weights: "300;400;500;600;700;800" },
  custom:    { label: "Custom…" },
};

function loadGoogleFont(family, weights) {
  const id = "gm-font-" + family.replace(/\W+/g, "-").toLowerCase();
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  const fam = encodeURIComponent(family).replace(/%20/g, "+");
  link.href = `https://fonts.googleapis.com/css2?family=${fam}${weights ? ":wght@" + weights : ""}&display=swap`;
  document.head.appendChild(link);
}

// Returns the CSS font-family stack for a config, loading web fonts if needed.
function resolveFont(c) {
  const key = c.font_family || "theme";
  if (key === "custom") {
    const name = String(c.font_family_custom || "").trim();
    if (!name) return FONTS.theme.css;
    if (c.load_web_font) loadGoogleFont(name, "");
    return `"${name.replace(/"/g, "")}", ${FONTS.system.css}`;
  }
  const f = FONTS[key] || FONTS.theme;
  if (f.google) {
    loadGoogleFont(f.google, f.weights);
    return `"${f.google}", ${FONTS.system.css}`;
  }
  return f.css;
}

const DEFAULTS = {
  theme: "frost",
  style: "glass",          // glass | plain
  font_family: "theme",
  speed: 70,               // pixels per second — constant regardless of text length
  direction: "left",
  height: 56,
  font_size: 20,
  font_weight: 500,
  border_radius: 18,
  blur: 18,
  fade_edges: true,
  pause_on_hover: true,
  show_icons: true,
  separator: "•",
  position: "inline",      // inline | top | bottom
  offset: 12,
  gap: 40,
  hide_when_empty: false,
  empty_text: "No messages",
};

const DEFAULT_ENTITY = "sensor.grand_marquee_messages";
const NEWS_ENTITY = "sensor.grand_marquee_news";

// What the marquee can show, in the order they appear unless `sources` says otherwise.
const SOURCES = {
  messages: "Messages",
  weather: "Weather",
  news: "News",
  calendar: "Calendar",
  todo: "To-do lists",
  sun: "Sunrise & sunset",
  date: "Date",
  entities: "Entity values",
};
const DEFAULT_SOURCES = ["messages", "entities"];

const NEWS_TOPICS = {
  top: "Top stories", world: "World", nation: "National", business: "Business",
  technology: "Technology", entertainment: "Entertainment", sports: "Sports",
  science: "Science", health: "Health", custom: "Your own feeds",
};

const WEATHER_ICONS = {
  "clear-night": "mdi:weather-night", cloudy: "mdi:weather-cloudy", exceptional: "mdi:alert-circle-outline",
  fog: "mdi:weather-fog", hail: "mdi:weather-hail", lightning: "mdi:weather-lightning",
  "lightning-rainy": "mdi:weather-lightning-rainy", partlycloudy: "mdi:weather-partly-cloudy",
  pouring: "mdi:weather-pouring", rainy: "mdi:weather-rainy", snowy: "mdi:weather-snowy",
  "snowy-rainy": "mdi:weather-snowy-rainy", sunny: "mdi:weather-sunny", windy: "mdi:weather-windy",
  "windy-variant": "mdi:weather-windy-variant",
};
const WEATHER_TEXT = {
  "clear-night": "Clear", cloudy: "Cloudy", exceptional: "Unusual weather", fog: "Fog", hail: "Hail",
  lightning: "Thunderstorms", "lightning-rainy": "Thunderstorms and rain", partlycloudy: "Partly cloudy",
  pouring: "Heavy rain", rainy: "Rain", snowy: "Snow", "snowy-rainy": "Sleet", sunny: "Sunny",
  windy: "Windy", "windy-variant": "Windy and cloudy",
};
const LIST_REFRESH_MS = 10 * 60 * 1000; // calendar and to-do lists

/* ---------- helpers ---------- */
function toRGB(v, fallback) {
  if (v === undefined || v === null || v === "") return fallback;
  if (Array.isArray(v) && v.length >= 3) return v.slice(0, 3).map(Number);
  const s = String(v).trim();
  const hex = s.replace("#", "");
  if (/^[0-9a-f]{3}$/i.test(hex)) return hex.split("").map((c) => parseInt(c + c, 16));
  if (/^[0-9a-f]{6}([0-9a-f]{2})?$/i.test(hex)) return [0, 2, 4].map((i) => parseInt(hex.substr(i, 2), 16));
  const m = s.match(/(\d+)\D+(\d+)\D+(\d+)/);
  if (m) return [+m[1], +m[2], +m[3]];
  return fallback;
}
const rgb = (c) => c.join(", ");
const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const num = (v, d) => (v === undefined || v === null || v === "" || isNaN(+v) ? d : +v);

/* ---------- card ---------- */
class GrandMarqueeCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement("grand-marquee-editor");
  }

  static getStubConfig(hass) {
    const hasSensor = hass && hass.states && hass.states[DEFAULT_ENTITY];
    return hasSensor
      ? { entity: DEFAULT_ENTITY, theme: "frost" }
      : { theme: "frost", messages: ["Welcome home ✨", "Add messages with grand_marquee.add_message"] };
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._anim = null;
    this._sig = "";
    this._paused = false;
    this._ro = new ResizeObserver(() => this._scheduleMeasure());
    this._onFonts = () => this._scheduleMeasure();
  }

  setConfig(config) {
    if (!config) throw new Error("Invalid configuration");
    this._config = { ...DEFAULTS, ...config };
    this._sig = "";
    this._listsKey = null;     // re-fetch calendar / to-do for the new settings
    if (this._hass) this._ensureSources();
    this._renderShell();
    this._update();
  }

  set hass(hass) {
    this._hass = hass;
    this._ensureSources();
    this._update();
  }

  // Keep fixed-position marquees inline while editing so they stay grabbable.
  set editMode(v) { this._editMode = v; this._applyPosition(); }
  set preview(v) { this._preview = v; this._applyPosition(); }

  getCardSize() { return 1; }
  getGridOptions() { return { columns: 12, rows: 1, min_rows: 1, min_columns: 3 }; }
  getLayoutOptions() { return { grid_columns: 4, grid_rows: 1 }; }

  connectedCallback() {
    if (document.fonts) document.fonts.addEventListener("loadingdone", this._onFonts);
    if (this._config) this._applyPosition();
    if (this._config && this._hass) this._ensureSources();
    this._scheduleMeasure();
  }

  disconnectedCallback() {
    if (this._anim) this._anim.cancel();
    this._anim = null;
    this._ro.disconnect();
    this._observed = false;
    if (document.fonts) document.fonts.removeEventListener("loadingdone", this._onFonts);
    this._trackArea(false);
    this._stopSources();
  }

  /* ----- colors ----- */
  _palette() {
    const c = this._config;
    const t = THEMES[c.theme] || THEMES.frost;
    const plain = c.style === "plain";
    return {
      plain,
      tint: toRGB(c.tint_color, plain ? t.plain : t.tint),
      tintOpacity: num(c.tint_opacity, plain ? 1 : t.tint_opacity),
      borderWidth: num(c.border_width, plain ? 0 : 1),
      text: toRGB(c.text_color, t.text),
      accent: toRGB(c.accent_color, t.accent),
      border: toRGB(c.border_color, t.border),
      glow: toRGB(c.glow_color, t.glow),
      glowStrength: num(c.glow_strength, t.glow_strength),
    };
  }

  _renderShell() {
    const c = this._config;
    const p = this._palette();
    const font = resolveFont(c);
    const fade = c.fade_edges ? "linear-gradient(90deg, transparent 0, #000 7%, #000 93%, transparent 100%)" : "none";
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          --gm-tint: rgba(${rgb(p.tint)}, ${p.tintOpacity});
          --gm-text: rgb(${rgb(p.text)});
          --gm-accent: rgb(${rgb(p.accent)});
          --gm-border: rgba(${rgb(p.border)}, ${p.plain ? 1 : 0.38});
          --gm-border-width: ${p.borderWidth}px;
          --gm-font-family: ${font};
          --gm-glow: rgba(${rgb(p.glow)}, ${p.glowStrength});
          --gm-blur: ${num(c.blur, 18)}px;
          --gm-radius: ${num(c.border_radius, 18)}px;
          --gm-height: ${num(c.height, 56)}px;
          --gm-font: ${num(c.font_size, 20)}px;
          --gm-gap: ${num(c.gap, 40)}px;
        }
        /* Pinned: the bar floats at the edge of the dashboard area (not over the
           sidebar). The card itself can keep a gap where it sits so the bar
           doesn't cover the cards beneath it. */
        :host([fixed]) { height: 0; }
        :host([fixed][reserve]) { height: var(--gm-height); }
        :host([fixed]) ha-card {
          position: fixed; z-index: 7; pointer-events: auto;
          left: calc(var(--gm-area-left, 0px) + ${num(c.offset, 12)}px);
          right: calc(var(--gm-area-right, 0px) + ${num(c.offset, 12)}px);
          width: auto;
        }
        :host([fixed="top"]) ha-card { top: calc(var(--header-height, 56px) + ${num(c.offset, 12)}px); }
        :host([fixed="bottom"]) ha-card { bottom: calc(env(safe-area-inset-bottom, 0px) + ${num(c.offset, 12)}px); }
        :host([hidden-empty]) { display: none; }
        ha-card {
          display: block; width: 100%; min-width: 0; overflow: visible;
          background: none; border: none; box-shadow: none; padding: 0;
        }

        .glass {
          position: relative; box-sizing: border-box;
          width: 100%; min-width: 0;
          height: var(--gm-height);
          border-radius: var(--gm-radius);
          overflow: hidden;
          display: flex; align-items: center;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.02) 100%),
            var(--gm-tint);
          -webkit-backdrop-filter: blur(var(--gm-blur)) saturate(170%);
          backdrop-filter: blur(var(--gm-blur)) saturate(170%);
          border: var(--gm-border-width) solid var(--gm-border);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.45),
            inset 0 -1px 0 rgba(255,255,255,0.08),
            0 10px 30px rgba(0,0,0,0.22),
            0 0 28px var(--gm-glow);
          color: var(--gm-text);
          font-family: var(--gm-font-family);
          isolation: isolate;
        }
        /* soft sheen across the top half, like light on glass */
        .glass::before {
          content: ""; position: absolute; inset: 0 0 50% 0; z-index: -1;
          background: linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0));
          pointer-events: none;
        }
        .label {
          flex: none; display: flex; align-items: center; gap: 8px;
          height: calc(var(--gm-height) - 16px);
          margin-left: 8px; padding: 0 14px;
          border-radius: calc(var(--gm-radius) - 6px);
          background: rgba(${rgb(p.accent)}, 0.22);
          border: 1px solid rgba(${rgb(p.accent)}, 0.45);
          color: var(--gm-text);
          font-size: calc(var(--gm-font) * 0.72); font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase; white-space: nowrap;
          box-shadow: 0 0 16px rgba(${rgb(p.accent)}, 0.25);
        }
        .label ha-icon { --mdc-icon-size: calc(var(--gm-font) * 1.0); color: var(--gm-accent); }
        .viewport {
          flex: 1 1 0; min-width: 0; width: 0; height: 100%;
          overflow: hidden; contain: layout paint; display: flex; align-items: center;
          -webkit-mask-image: ${fade}; mask-image: ${fade};
          cursor: ${c.pause_on_hover ? "default" : "auto"};
        }
        .track {
          display: flex; flex: none; width: max-content;
          will-change: transform; transform: translate3d(0,0,0);
          backface-visibility: hidden;
        }
        .group { display: flex; flex: none; align-items: center; }
        .item {
          display: inline-flex; align-items: center; gap: 10px; flex: none;
          padding-right: var(--gm-gap);
          font-size: var(--gm-font); font-weight: ${num(c.font_weight, 500)};
          line-height: 1; white-space: nowrap;
          text-shadow: 0 1px 2px rgba(0,0,0,0.25);
          ${c.uppercase ? "text-transform: uppercase; letter-spacing: 0.04em;" : ""}
        }
        .item ha-icon { --mdc-icon-size: calc(var(--gm-font) * 1.15); color: var(--item-color, var(--gm-accent)); flex: none; }
        .item .name { opacity: 0.75; }
        .item .pre { opacity: 0.72; font-weight: 600; }
        .item .sub { opacity: 0.55; font-size: 0.78em; margin-left: 2px; }
        .item .tag {
          flex: none; align-self: center;
          font-size: max(10px, calc(var(--gm-font) * 0.55)); font-weight: 700; line-height: 1;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 0.45em 0.75em; border-radius: 999px;
          color: var(--gm-text);
          background: rgba(${rgb(p.accent)}, 0.2);
          border: 1px solid rgba(${rgb(p.accent)}, 0.45);
          text-shadow: none;
        }
        .sep {
          display: inline-block; flex: none; padding-right: var(--gm-gap);
          color: var(--gm-accent); font-size: var(--gm-font); opacity: 0.9;
          text-shadow: 0 0 10px var(--gm-accent);
        }
        .empty { padding: 0 20px; opacity: 0.6; font-size: var(--gm-font); }
        /* ---- plain style: a solid, flat bar in exactly the chosen color ---- */
        .glass.plain {
          background: var(--gm-tint);
          -webkit-backdrop-filter: none; backdrop-filter: none;
          box-shadow: none;
        }
        .glass.plain::before { display: none; }
        .glass.plain .label { box-shadow: none; background: rgba(${rgb(p.accent)}, 0.18); }
        .glass.plain .item { text-shadow: none; }
        .glass.plain .sep { text-shadow: none; }
        @media (prefers-reduced-motion: reduce) { .track { will-change: auto; } }
      </style>
      <ha-card>
        <div class="glass${p.plain ? " plain" : ""}">
          ${c.title || c.title_icon
            ? `<div class="label">${c.title_icon ? `<ha-icon icon="${esc(c.title_icon)}"></ha-icon>` : ""}${esc(c.title || "")}</div>`
            : ""}
          <div class="viewport"><div class="track"></div></div>
        </div>
      </ha-card>`;
    this._viewport = this.shadowRoot.querySelector(".viewport");
    this._track = this.shadowRoot.querySelector(".track");
    this._observed = false;

    if (c.pause_on_hover) {
      this._viewport.addEventListener("mouseenter", () => this._setPaused(true));
      this._viewport.addEventListener("mouseleave", () => this._setPaused(false));
    }
    // Tap to pause / resume on touch screens (wall tablets).
    this._viewport.addEventListener("click", () => {
      if (c.tap_to_pause === false) return;
      this._setPaused(!this._paused);
    });
    this._applyPosition();
    if (document.fonts && c.font_family && c.font_family !== "theme") {
      const fam = font.split(",")[0];
      document.fonts.load(`${num(c.font_weight, 500)} ${num(c.font_size, 20)}px ${fam}`)
        .then(() => this._scheduleMeasure())
        .catch(() => {});
    }
  }

  _applyPosition() {
    const c = this._config;
    const pos = c && c.position;
    const editing = this._editMode || this._preview;
    const pinned = (pos === "top" || pos === "bottom") && !editing;
    if (pinned) this.setAttribute("fixed", pos);
    else this.removeAttribute("fixed");
    // Top bars keep a gap in the dashboard by default; bottom bars don't.
    const reserve = c && (c.reserve_space !== undefined ? c.reserve_space : pos === "top");
    if (pinned && reserve) this.setAttribute("reserve", "");
    else this.removeAttribute("reserve");
    this._trackArea(pinned);
  }

  // Line a pinned bar up with the dashboard area, so it never covers the sidebar.
  _findArea() {
    let node = this;
    while (node) {
      const tag = node.localName || "";
      if (tag === "hui-view" || tag === "hui-panel-view" || /^hui-.*-view$/.test(tag)) return node;
      node = node.parentNode || (node.getRootNode && node.getRootNode().host) || null;
    }
    return null;
  }

  _trackArea(on) {
    if (this._areaRO) { this._areaRO.disconnect(); this._areaRO = null; }
    window.removeEventListener("resize", this._areaHandler || (() => {}));
    if (!on || !this.isConnected) return;
    const area = this._findArea();
    this._areaHandler = () => {
      const r = area ? area.getBoundingClientRect() : null;
      this.style.setProperty("--gm-area-left", r ? `${Math.max(0, r.left)}px` : "0px");
      this.style.setProperty("--gm-area-right", r ? `${Math.max(0, window.innerWidth - r.right)}px` : "0px");
    };
    this._areaHandler();
    window.addEventListener("resize", this._areaHandler);
    if (area) { this._areaRO = new ResizeObserver(this._areaHandler); this._areaRO.observe(area); }
  }

  /* ----- data sources ----- */
  _sources() {
    const list = this._config.sources;
    if (Array.isArray(list) && list.length) return list.filter((x) => x in SOURCES);
    return DEFAULT_SOURCES;
  }

  _lang() {
    const h = this._hass;
    return (h && ((h.locale && h.locale.language) || h.language)) || navigator.language || "en";
  }

  _time(date) {
    const fmt = this._hass && this._hass.locale && this._hass.locale.time_format;
    const hour12 = fmt === "12" ? true : fmt === "24" ? false : undefined;
    return date.toLocaleTimeString(this._lang(), { hour: "numeric", minute: "2-digit", hour12 });
  }

  _dayLabel(date) {
    const now = new Date();
    const day = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const diff = Math.round((day(date) - day(now)) / 86400000);
    if (diff === 0) return "";
    const rel = new Intl.RelativeTimeFormat(this._lang(), { numeric: "auto" });
    if (diff === 1) { const t = rel.format(1, "day"); return t[0].toUpperCase() + t.slice(1); }
    return date.toLocaleDateString(this._lang(), { weekday: "short" });
  }

  _ids(conf, domain) {
    if (Array.isArray(conf) && conf.length) return conf.filter((id) => this._hass.states[id]);
    if (typeof conf === "string" && conf) return this._hass.states[conf] ? [conf] : [];
    return Object.keys(this._hass.states).filter((id) => id.startsWith(domain + "."));
  }

  _ensureSources() {
    if (!this._config || !this._hass || !this.isConnected) return;
    this._ensureWeather();
    this._ensureLists();
  }

  _stopSources() {
    this._unsubWeather();
    clearInterval(this._listTimer);
    clearTimeout(this._listDebounce);
    this._listTimer = null;
    this._listsKey = null;
    this._listsStamp = null;
  }

  /* weather: live forecast subscription for today's high, low and rain chance */
  _weatherId() {
    const c = this._config;
    if (c.weather_entity) return this._hass.states[c.weather_entity] ? c.weather_entity : null;
    return Object.keys(this._hass.states).find((id) => id.startsWith("weather.")) || null;
  }

  _unsubWeather() {
    if (this._weatherUnsub) { try { this._weatherUnsub(); } catch (e) { /* already gone */ } }
    this._weatherUnsub = null;
    this._weatherFor = null;
    this._forecast = null;
  }

  async _ensureWeather() {
    const want = this._sources().includes("weather") ? this._weatherId() : null;
    if (want === this._weatherFor) return;
    this._unsubWeather();
    this._weatherFor = want;
    const conn = this._hass.connection;
    if (!want || !conn || !conn.subscribeMessage) return;
    const f = this._hass.states[want].attributes.supported_features || 0;
    const type = f & 1 ? "daily" : f & 4 ? "twice_daily" : f & 2 ? "hourly" : null;
    if (!type) return; // no forecast: current conditions only
    try {
      const unsub = await conn.subscribeMessage((ev) => {
        if (this._weatherFor !== want) return;
        this._forecast = { type, list: (ev && ev.forecast) || [] };
        this._update();
      }, { type: "weather/subscribe_forecast", forecast_type: type, entity_id: want });
      if (this._weatherFor === want) this._weatherUnsub = unsub;
      else unsub();
    } catch (e) {
      /* forecast not available; current conditions still show */
    }
  }

  _conditionText(cond, stateObj) {
    const h = this._hass;
    if (stateObj && h.formatEntityState) return h.formatEntityState(stateObj);
    const key = `component.weather.entity_component._.state.${cond}`;
    const t = h.localize ? h.localize(key) : "";
    return t || WEATHER_TEXT[cond] || cond || "";
  }

  _forecastDay(offset) {
    if (!this._forecast || !this._forecast.list.length) return null;
    const target = new Date();
    target.setDate(target.getDate() + offset);
    const same = (d) => d.getFullYear() === target.getFullYear() && d.getMonth() === target.getMonth() && d.getDate() === target.getDate();
    const entries = this._forecast.list.filter((e) => same(new Date(e.datetime)));
    if (!entries.length) return null;
    const temps = entries.map((e) => e.temperature).filter((v) => typeof v === "number");
    const lows = entries.map((e) => (typeof e.templow === "number" ? e.templow : e.temperature)).filter((v) => typeof v === "number");
    const rain = entries.map((e) => e.precipitation_probability).filter((v) => typeof v === "number");
    const midday = entries.find((e) => { const h = new Date(e.datetime).getHours(); return h >= 11 && h <= 15; }) || entries[0];
    return {
      hi: temps.length ? Math.max(...temps) : null,
      lo: lows.length ? Math.min(...lows) : null,
      rain: rain.length ? Math.max(...rain) : null,
      cond: midday.condition,
    };
  }

  _weatherItems() {
    const id = this._weatherId();
    const st = id && this._hass.states[id];
    if (!st || ["unknown", "unavailable"].includes(st.state)) return [];
    const a = st.attributes;
    const unit = a.temperature_unit || "°";
    const deg = (v) => `${Math.round(v)}°`;
    const parts = [this._conditionText(st.state, st)];
    if (typeof a.temperature === "number") parts.push(`${Math.round(a.temperature)}${unit} now`);
    const today = this._forecastDay(0);
    if (today) {
      if (today.hi !== null) parts.push(`High ${deg(today.hi)}`);
      if (today.lo !== null && today.lo !== today.hi) parts.push(`Low ${deg(today.lo)}`);
      if (today.rain) parts.push(`${Math.round(today.rain)}% chance of rain`);
    }
    const items = [{ text: parts.join(" · "), icon: WEATHER_ICONS[st.state] || "mdi:weather-partly-cloudy", tag: "Weather" }];
    const tomorrow = this._config.weather_tomorrow ? this._forecastDay(1) : null;
    if (tomorrow) {
      const t = [this._conditionText(tomorrow.cond)];
      if (tomorrow.hi !== null) t.push(tomorrow.lo !== null && tomorrow.lo !== tomorrow.hi ? `${deg(tomorrow.hi)} / ${deg(tomorrow.lo)}` : deg(tomorrow.hi));
      if (tomorrow.rain) t.push(`${Math.round(tomorrow.rain)}% chance of rain`);
      items.push({ text: t.join(" · "), icon: WEATHER_ICONS[tomorrow.cond] || "mdi:weather-partly-cloudy", tag: this._dayLabel(new Date(Date.now() + 86400000)) || "Tomorrow" });
    }
    return items;
  }

  /* calendar and to-do: fetched every 10 minutes and whenever those entities change */
  _ensureLists() {
    const src = this._sources();
    const c = this._config;
    const cal = src.includes("calendar") ? this._ids(c.calendar_entities, "calendar") : [];
    const todo = src.includes("todo") ? this._ids(c.todo_entities, "todo") : [];
    const key = JSON.stringify([cal, todo, num(c.calendar_hours, 24)]);
    const stamp = cal.concat(todo).map((id) => this._hass.states[id].last_updated).join("|");
    if (key !== this._listsKey) {
      this._listsKey = key;
      this._listsStamp = stamp;
      clearInterval(this._listTimer);
      this._listTimer = cal.length || todo.length ? setInterval(() => this._fetchLists(cal, todo), LIST_REFRESH_MS) : null;
      this._events = []; this._todos = [];
      if (cal.length || todo.length) this._fetchLists(cal, todo);
    } else if (stamp !== this._listsStamp) {
      this._listsStamp = stamp;
      clearTimeout(this._listDebounce);
      this._listDebounce = setTimeout(() => this._fetchLists(cal, todo), 1500);
    }
  }

  async _call(domain, service, target, data) {
    const r = await this._hass.callWS({
      type: "call_service", domain, service, target: { entity_id: target },
      service_data: data, return_response: true,
    });
    return (r && r.response) || {};
  }

  async _fetchLists(cal, todo) {
    if (!this._hass || !this._hass.callWS) return;
    const c = this._config;
    if (cal.length) {
      try {
        const resp = await this._call("calendar", "get_events", cal, { duration: { hours: num(c.calendar_hours, 24) } });
        this._events = Object.entries(resp)
          .flatMap(([id, v]) => ((v && v.events) || []).map((e) => ({ ...e, calendar: id })))
          .sort((x, y) => new Date(x.start) - new Date(y.start));
      } catch (e) { this._events = []; }
    }
    if (todo.length) {
      try {
        const resp = await this._call("todo", "get_items", todo, { status: ["needs_action"] });
        this._todos = Object.entries(resp).map(([id, v]) => ({ id, items: (v && v.items) || [] }));
      } catch (e) { this._todos = []; }
    }
    this._update();
  }

  _calendarItems() {
    const now = new Date();
    return (this._events || [])
      .filter((e) => new Date(e.end || e.start) > now)
      .slice(0, num(this._config.calendar_count, 6))
      .map((e) => {
        const allDay = typeof e.start === "string" && e.start.length <= 10;
        const start = allDay ? new Date(e.start + "T00:00:00") : new Date(e.start);
        const day = this._dayLabel(start);
        const when = allDay ? (day || "Today") : `${day ? day + " " : ""}${start < now ? "Now" : this._time(start)}`;
        return { pre: when, text: e.summary || "Event", icon: "mdi:calendar", tag: "Calendar" };
      });
  }

  _todoItems() {
    const max = num(this._config.todo_count, 5);
    return (this._todos || [])
      .filter((l) => l.items.length)
      .map((l) => {
        const st = this._hass.states[l.id];
        const shown = l.items.slice(0, max).map((i) => i.summary).join(", ");
        const more = l.items.length - max;
        return {
          pre: (st && st.attributes.friendly_name) || l.id,
          text: more > 0 ? `${shown} +${more} more` : shown,
          icon: "mdi:clipboard-check-outline",
          tag: "To-do",
        };
      });
  }

  _newsItems() {
    const c = this._config;
    const st = this._hass.states[NEWS_ENTITY];
    if (!st) return [];
    const wanted = Array.isArray(c.news_topics) && c.news_topics.length ? c.news_topics : null;
    let list = st.attributes.headlines || [];
    if (wanted) list = list.filter((h) => wanted.includes(h.category));
    const items = list.slice(0, num(c.news_count, 8)).map((h) => ({
      text: h.title,
      sub: c.news_source === false ? "" : h.source,
      icon: "mdi:newspaper-variant-outline",
      tag: h.label || "News",
    }));
    // A topic picked on the card but not turned on in the integration: say where to turn it on.
    const enabled = st.attributes.topics || [];
    const off = (wanted || []).filter((t) => t !== "custom" && !enabled.includes(t));
    if (off.length) {
      items.push({
        text: `Turn on ${off.map((t) => NEWS_TOPICS[t] || t).join(", ")} news under Settings → Devices & services → Grand Marquee → Configure`,
        icon: "mdi:information-outline",
        tag: "News",
      });
    }
    return items;
  }

  _sunItems() {
    const st = this._hass.states["sun.sun"];
    if (!st) return [];
    const rise = st.attributes.next_rising && new Date(st.attributes.next_rising);
    const set = st.attributes.next_setting && new Date(st.attributes.next_setting);
    const parts = [];
    if (rise) parts.push([rise, `Sunrise ${this._time(rise)}`]);
    if (set) parts.push([set, `Sunset ${this._time(set)}`]);
    if (!parts.length) return [];
    parts.sort((x, y) => x[0] - y[0]);
    const icon = parts[0][1].startsWith("Sunset") ? "mdi:weather-sunset-down" : "mdi:weather-sunset-up";
    return [{ text: parts.map((x) => x[1]).join(" · "), icon }];
  }

  _dateItems() {
    const text = new Date().toLocaleDateString(this._lang(), { weekday: "long", month: "long", day: "numeric" });
    return [{ text, icon: "mdi:calendar-today" }];
  }

  _messageItems() {
    const c = this._config;
    const hass = this._hass;
    const items = [];
    const norm = (m) => (typeof m === "string" ? { text: m } : m && m.text !== undefined ? m : null);
    (c.messages || []).forEach((m) => { const n = norm(m); if (n) items.push(n); });
    const entityId = c.entity === undefined ? (hass && hass.states[DEFAULT_ENTITY] ? DEFAULT_ENTITY : null) : c.entity;
    if (entityId && hass && hass.states[entityId]) {
      const st = hass.states[entityId];
      const list = st.attributes.messages;
      if (Array.isArray(list)) list.forEach((m) => { const n = norm(m); if (n) items.push(n); });
      else if (entityId !== DEFAULT_ENTITY && st.state && !["unknown", "unavailable", ""].includes(st.state)) items.push({ text: st.state });
    }
    return items;
  }

  _entityItems() {
    const hass = this._hass;
    return (this._config.entities || []).flatMap((e) => {
      const conf = typeof e === "string" ? { entity: e } : e;
      const st = hass && hass.states[conf.entity];
      if (!st) return [];
      const value = hass.formatEntityState ? hass.formatEntityState(st) : `${st.state}${st.attributes.unit_of_measurement ? " " + st.attributes.unit_of_measurement : ""}`;
      return [{
        name: conf.name !== undefined ? conf.name : st.attributes.friendly_name || conf.entity,
        text: value,
        icon: conf.icon || st.attributes.icon,
        color: conf.color,
      }];
    });
  }

  _collect() {
    if (!this._hass) return this._messageItems();
    const build = {
      messages: () => this._messageItems(),
      weather: () => this._weatherItems(),
      news: () => this._newsItems(),
      calendar: () => this._calendarItems(),
      todo: () => this._todoItems(),
      sun: () => this._sunItems(),
      date: () => this._dateItems(),
      entities: () => this._entityItems(),
    };
    return this._sources().flatMap((src) => {
      try { return build[src](); } catch (e) { return []; }
    });
  }

  _update() {
    if (!this._config || !this._track) return;
    const items = this._collect();
    const sig = JSON.stringify(items);
    if (sig === this._sig) return;
    this._sig = sig;

    const c = this._config;
    if (!items.length && c.hide_when_empty) this.setAttribute("hidden-empty", "");
    else this.removeAttribute("hidden-empty");

    if (!items.length) {
      if (this._anim) { this._anim.cancel(); this._anim = null; }
      this._track.style.transform = "none";
      this._track.innerHTML = `<div class="empty">${esc(c.empty_text)}</div>`;
      return;
    }

    const sep = c.separator ? `<span class="sep">${esc(c.separator)}</span>` : "";
    this._groupHTML = items
      .map((m) => {
        const color = m.color ? toRGB(m.color, null) : null;
        const style = color ? ` style="--item-color: rgb(${rgb(color)})"` : "";
        const icon = c.show_icons && m.icon ? `<ha-icon icon="${esc(m.icon)}"></ha-icon>` : "";
        const name = m.name ? `<span class="name">${esc(m.name)}:</span>` : "";
        const tag = m.tag && c.show_tags !== false ? `<span class="tag">${esc(m.tag)}</span>` : "";
        const pre = m.pre ? `<span class="pre">${esc(m.pre)}</span>` : "";
        const sub = m.sub ? `<span class="sub">${esc(m.sub)}</span>` : "";
        return `<span class="item"${style}>${tag}${icon}${name}${pre}<span class="text">${esc(m.text)}</span>${sub}</span>${sep}`;
      })
      .join("");
    this._track.innerHTML = `<div class="group">${this._groupHTML}</div>`;
    this._scheduleMeasure();
  }

  /* ----- animation: seamless, constant-speed loop ----- */
  _scheduleMeasure() {
    if (!this._track || !this.isConnected) return;
    if (!this._observed && this._viewport) {
      this._ro.observe(this._viewport);
      this._observed = true;
    }
    cancelAnimationFrame(this._raf);
    this._raf = requestAnimationFrame(() => {
      const go = () => this._start();
      if (document.fonts && document.fonts.status !== "loaded") document.fonts.ready.then(go);
      else go();
    });
  }

  _start() {
    const groups = this._track.querySelectorAll(".group");
    if (!groups.length) return;
    // Keep one source group, then measure it.
    groups.forEach((g, i) => i && g.remove());
    const first = groups[0];
    const groupW = first.getBoundingClientRect().width;
    const viewW = this._viewport.getBoundingClientRect().width;
    if (!groupW || !viewW) return;

    // Clone the group until the strip is at least one viewport + one group wide,
    // so shifting by exactly one group width loops with no visible seam.
    const copies = Math.max(2, Math.ceil(viewW / groupW) + 1);
    for (let i = 1; i < copies; i++) {
      const clone = first.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      this._track.appendChild(clone);
    }

    const speed = Math.max(5, num(this._config.speed, 70));
    const duration = (groupW / speed) * 1000;
    const keyframes = this._config.direction === "right"
      ? [{ transform: `translate3d(${-groupW}px,0,0)` }, { transform: "translate3d(0,0,0)" }]
      : [{ transform: "translate3d(0,0,0)" }, { transform: `translate3d(${-groupW}px,0,0)` }];

    // Preserve where we were so content/size updates don't make the text jump.
    let progress = 0;
    if (this._anim) {
      const t = this._anim.currentTime || 0;
      const d = this._anim.effect.getTiming().duration || 1;
      progress = (t % d) / d;
      this._anim.cancel();
    }

    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this._anim = this._track.animate(keyframes, { duration, iterations: Infinity, easing: "linear" });
    this._anim.currentTime = progress * duration;
    if (this._paused || (reduce && this._config.respect_reduced_motion !== false)) this._anim.pause();
  }

  _setPaused(p) {
    this._paused = p;
    if (!this._anim) return;
    if (p) this._anim.pause();
    else this._anim.play();
  }
}

/* ---------- visual editor ---------- */
const THEME_LABELS = { mono: "Monochrome" };
const PRO_THEMES = ["slate", "graphite", "navy", "harbor", "evergreen", "sage", "burgundy", "copper", "plum", "sand", "arctic", "mono"];
const THEME_OPTIONS = Object.keys(THEMES).map((k) => ({
  value: k,
  label: (THEME_LABELS[k] || k[0].toUpperCase() + k.slice(1)) + (PRO_THEMES.includes(k) ? " · Professional" : ""),
}));
const COLOR_KEYS = ["tint_color", "text_color", "accent_color", "border_color", "glow_color"];

const FONT_OPTIONS = Object.entries(FONTS).map(([value, f]) => ({ value, label: f.label }));

function buildSchema(c) {
  const plain = c.style === "plain";
  const colorFields = plain
    ? [
        { name: "tint_color", selector: { color_rgb: {} } },
        { name: "tint_opacity", selector: { number: { min: 0, max: 1, step: 0.01, mode: "slider" } } },
        { name: "text_color", selector: { color_rgb: {} } },
        { name: "accent_color", selector: { color_rgb: {} } },
        { name: "border_color", selector: { color_rgb: {} } },
        { name: "border_width", selector: { number: { min: 0, max: 8, step: 1, mode: "box", unit_of_measurement: "px" } } },
      ]
    : [
        { name: "tint_color", selector: { color_rgb: {} } },
        { name: "tint_opacity", selector: { number: { min: 0, max: 1, step: 0.01, mode: "slider" } } },
        { name: "text_color", selector: { color_rgb: {} } },
        { name: "accent_color", selector: { color_rgb: {} } },
        { name: "border_color", selector: { color_rgb: {} } },
        { name: "glow_color", selector: { color_rgb: {} } },
        { name: "glow_strength", selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } } },
        { name: "blur", selector: { number: { min: 0, max: 40, step: 1, mode: "slider", unit_of_measurement: "px" } } },
      ];

  const fontFields = [
    { name: "font_family", selector: { select: { mode: "dropdown", options: FONT_OPTIONS } } },
    ...(c.font_family === "custom"
      ? [
          { name: "font_family_custom", selector: { text: {} } },
          { name: "load_web_font", selector: { boolean: {} } },
        ]
      : []),
    { type: "grid", name: "", schema: [
      { name: "font_size", selector: { number: { min: 10, max: 72, step: 1, mode: "box", unit_of_measurement: "px" } } },
      { name: "font_weight", selector: { select: { mode: "dropdown", options: ["300", "400", "500", "600", "700", "800"] } } },
      { name: "uppercase", selector: { boolean: {} } },
    ] },
  ];

  const src = Array.isArray(c.sources) && c.sources.length ? c.sources : DEFAULT_SOURCES;
  const has = (k) => src.includes(k);
  const box = (min, max, unit) => ({ number: { min, max, step: 1, mode: "box", ...(unit ? { unit_of_measurement: unit } : {}) } });
  const showFields = [
    { name: "sources", selector: { select: { multiple: true, mode: "list", options: Object.entries(SOURCES).map(([value, label]) => ({ value, label })) } } },
    ...(has("messages") ? [
      { name: "entity", selector: { entity: { domain: "sensor" } } },
      { name: "messages_text", selector: { text: { multiline: true } } },
    ] : []),
    ...(has("weather") ? [{ type: "grid", name: "", schema: [
      { name: "weather_entity", selector: { entity: { domain: "weather" } } },
      { name: "weather_tomorrow", selector: { boolean: {} } },
    ] }] : []),
    ...(has("news") ? [
      { name: "news_topics", selector: { select: { multiple: true, mode: "dropdown", options: Object.entries(NEWS_TOPICS).map(([value, label]) => ({ value, label })) } } },
      { type: "grid", name: "", schema: [
        { name: "news_count", selector: box(1, 40) },
        { name: "news_source", selector: { boolean: {} } },
      ] },
    ] : []),
    ...(has("calendar") ? [
      { name: "calendar_entities", selector: { entity: { domain: "calendar", multiple: true } } },
      { type: "grid", name: "", schema: [
        { name: "calendar_count", selector: box(1, 20) },
        { name: "calendar_hours", selector: box(1, 168, "h") },
      ] },
    ] : []),
    ...(has("todo") ? [
      { name: "todo_entities", selector: { entity: { domain: "todo", multiple: true } } },
      { name: "todo_count", selector: box(1, 20) },
    ] : []),
    ...(has("entities") ? [{ name: "entities", selector: { entity: { multiple: true } } }] : []),
    { name: "show_tags", selector: { boolean: {} } },
  ];

  return [
    { name: "title", selector: { text: {} } },
    { name: "title_icon", selector: { icon: {} } },
    { type: "expandable", flatten: true, expanded: true, name: "show", title: "What to show", icon: "mdi:format-list-bulleted", schema: showFields },
    {
      type: "grid", name: "", schema: [
        { name: "speed", selector: { number: { min: 10, max: 300, step: 5, mode: "slider", unit_of_measurement: "px/s" } } },
        { name: "direction", selector: { select: { mode: "dropdown", options: [{ value: "left", label: "Right → left" }, { value: "right", label: "Left → right" }] } } },
      ],
    },
    {
      type: "grid", name: "", schema: [
        { name: "style", selector: { select: { mode: "dropdown", options: [
          { value: "glass", label: "Glass" },
          { value: "plain", label: "Plain (solid color)" },
        ] } } },
        { name: "theme", selector: { select: { mode: "dropdown", options: THEME_OPTIONS } } },
      ],
    },
    {
      type: "expandable", flatten: true, name: "colors", title: plain ? "Colors" : "Glass colors", icon: "mdi:palette",
      schema: [{ type: "grid", name: "", schema: colorFields }],
    },
    { type: "expandable", flatten: true, name: "font", title: "Font", icon: "mdi:format-font", schema: fontFields },
    {
      type: "expandable", flatten: true, name: "layout", title: "Layout & placement", icon: "mdi:page-layout-header", schema: [
        { type: "grid", name: "", schema: [
          { name: "position", selector: { select: { mode: "dropdown", options: [
            { value: "inline", label: "In the dashboard" },
            { value: "top", label: "Pinned to top of screen" },
            { value: "bottom", label: "Pinned to bottom of screen" },
          ] } } },
          { name: "offset", selector: { number: { min: 0, max: 80, step: 1, mode: "box", unit_of_measurement: "px" } } },
          ...(c.position === "top" || c.position === "bottom" ? [{ name: "reserve_space", selector: { boolean: {} } }] : []),
          { name: "height", selector: { number: { min: 28, max: 160, step: 2, mode: "box", unit_of_measurement: "px" } } },
          { name: "border_radius", selector: { number: { min: 0, max: 80, step: 1, mode: "box", unit_of_measurement: "px" } } },
          { name: "gap", selector: { number: { min: 0, max: 200, step: 2, mode: "box", unit_of_measurement: "px" } } },
          { name: "separator", selector: { text: {} } },
        ] },
        { type: "grid", name: "", schema: [
          { name: "fade_edges", selector: { boolean: {} } },
          { name: "pause_on_hover", selector: { boolean: {} } },
          { name: "show_icons", selector: { boolean: {} } },
          { name: "hide_when_empty", selector: { boolean: {} } },
        ] },
      ],
    },
  ];
}

const LABELS = {
  title: "Label (optional pill on the left)",
  title_icon: "Label icon",
  entity: "Message sensor",
  sources: "Show these, in this order",
  weather_entity: "Weather",
  weather_tomorrow: "Also show tomorrow",
  news_topics: "News topics (empty = all you turned on)",
  news_count: "Headlines",
  news_source: "Show the news source",
  calendar_entities: "Calendars (empty = all)",
  calendar_count: "Events",
  calendar_hours: "Look ahead",
  todo_entities: "To-do lists (empty = all)",
  todo_count: "Items per list",
  show_tags: "Show category tags (Weather, News, …)",
  messages_text: "Static messages (one per line)",
  entities: "Also scroll these entity states",
  speed: "Speed",
  direction: "Direction",
  theme: "Color preset",
  style: "Style",
  border_width: "Border width",
  font_family: "Font",
  font_family_custom: "Font name (e.g. Comfortaa, or one installed on the device)",
  load_web_font: "Load this font from Google Fonts",
  tint_color: "Glass tint",
  tint_opacity: "Tint strength",
  text_color: "Text",
  accent_color: "Accent / icons",
  border_color: "Edge highlight",
  glow_color: "Glow",
  glow_strength: "Glow strength",
  blur: "Background blur",
  position: "Placement",
  offset: "Edge offset",
  reserve_space: "Leave room so it doesn't cover cards",
  height: "Height",
  font_size: "Font size",
  font_weight: "Font weight",
  border_radius: "Corner radius",
  gap: "Space between messages",
  separator: "Separator",
  fade_edges: "Fade edges",
  pause_on_hover: "Pause on hover",
  show_icons: "Show icons",
  uppercase: "Uppercase",
  hide_when_empty: "Hide when empty",
};

class GrandMarqueeEditor extends HTMLElement {
  setConfig(config) {
    this._config = { ...config };
    this._render();
  }
  set hass(hass) {
    this._hass = hass;
    if (this._form) this._form.hass = hass;
  }

  _formData() {
    const c = { ...DEFAULTS, ...this._config };
    const theme = THEMES[c.theme] || THEMES.frost;
    const data = { ...c };
    data.messages_text = (c.messages || []).map((m) => (typeof m === "string" ? m : m.text)).join("\n");
    data.entities = (c.entities || []).map((e) => (typeof e === "string" ? e : e.entity));
    data.font_weight = String(c.font_weight);
    // Show the theme's colors when no custom color is set.
    const map = { tint_color: "tint", text_color: "text", accent_color: "accent", border_color: "border", glow_color: "glow" };
    const plain = c.style === "plain";
    if (plain) map.tint_color = "plain";
    COLOR_KEYS.forEach((k) => (data[k] = toRGB(c[k], theme[map[k]])));
    if (c.tint_opacity === undefined) data.tint_opacity = plain ? 1 : theme.tint_opacity;
    if (c.border_width === undefined) data.border_width = plain ? 0 : 1;
    if (c.reserve_space === undefined) data.reserve_space = c.position === "top";
    if (c.glow_strength === undefined) data.glow_strength = theme.glow_strength;
    data.sources = Array.isArray(c.sources) && c.sources.length ? c.sources : DEFAULT_SOURCES;
    const defaults = { weather_tomorrow: false, news_count: 8, news_source: true, calendar_count: 6, calendar_hours: 24, todo_count: 5, show_tags: true };
    for (const [k, v] of Object.entries(defaults)) if (data[k] === undefined) data[k] = v;
    return data;
  }

  _render() {
    if (!this._form) {
      this._form = document.createElement("ha-form");
      this._form.computeLabel = (s) => LABELS[s.name] || s.name;
      this._form.addEventListener("value-changed", (ev) => this._changed(ev.detail.value));
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    this._form.schema = buildSchema({ ...DEFAULTS, ...this._config });
    this._form.data = this._formData();
  }

  _changed(value) {
    const prev = this._config;
    const prevData = this._formData();
    const next = { ...prev };

    for (const [k, v] of Object.entries(value)) {
      if (k === "messages_text" || k === "entities") continue;
      if (JSON.stringify(v) === JSON.stringify(prevData[k])) continue; // untouched
      next[k] = k === "font_weight" ? Number(v) : v;
    }
    // Switching preset or style resets custom colors so the preset shows through.
    if (value.theme !== prevData.theme || value.style !== prevData.style) {
      COLOR_KEYS.concat(["tint_opacity", "glow_strength", "border_width"]).forEach((k) => delete next[k]);
    }
    if (next.font_family !== "custom") { delete next.font_family_custom; delete next.load_web_font; }
    if (value.messages_text !== prevData.messages_text) {
      const lines = (value.messages_text || "").split("\n").map((s) => s.trim()).filter(Boolean);
      if (lines.length) next.messages = lines; else delete next.messages;
    }
    if (JSON.stringify(value.entities || []) !== JSON.stringify(prevData.entities)) {
      const old = prev.entities || [];
      next.entities = (value.entities || []).map((id) => old.find((e) => (typeof e === "string" ? e : e.entity) === id) || id);
      if (!next.entities.length) delete next.entities;
    }
    if (next.entity === "" || next.entity === undefined) delete next.entity;
    for (const k of ["news_topics", "calendar_entities", "todo_entities"]) {
      if (Array.isArray(next[k]) && !next[k].length) delete next[k];
    }
    if (!next.weather_entity) delete next.weather_entity;

    this._config = next;
    this._form.schema = buildSchema({ ...DEFAULTS, ...next });
    this._form.data = this._formData();
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: next }, bubbles: true, composed: true }));
  }
}

if (!customElements.get("grand-marquee")) customElements.define("grand-marquee", GrandMarqueeCard);
if (!customElements.get("grand-marquee-editor")) customElements.define("grand-marquee-editor", GrandMarqueeEditor);

window.customCards = window.customCards || [];
if (!window.customCards.some((c) => c.type === "grand-marquee")) {
  window.customCards.push({
    type: "grand-marquee",
    name: "Grand Marquee",
    description: "Smooth scrolling ticker — glass or plain, with configurable colors and fonts.",
    preview: true,
    documentationURL: "https://github.com/Degederon/grand-marquee",
  });
}

console.info(`%c GRAND-MARQUEE %c ${GM_VERSION} `, "background:#7dd3fc;color:#0f172a;border-radius:4px 0 0 4px;padding:2px 4px;font-weight:700", "background:#0f172a;color:#7dd3fc;border-radius:0 4px 4px 0;padding:2px 4px");
