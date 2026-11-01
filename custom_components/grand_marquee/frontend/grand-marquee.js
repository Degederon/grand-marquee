/*
 * Grand Marquee — smooth, glass-styled scrolling ticker for Home Assistant.
 * Shipped and auto-registered by the grand_marquee integration (can also be
 * added manually as a dashboard resource).
 */
const GM_VERSION = "1.0.0";

// `plain` is the solid background used when style: plain and no custom color is set.
const THEMES = {
  frost:    { tint: [255, 255, 255], tint_opacity: 0.14, plain: [30, 41, 59],    text: [255, 255, 255], accent: [125, 211, 252], border: [255, 255, 255], glow: [125, 211, 252], glow_strength: 0.25 },
  aurora:   { tint: [56, 189, 248],  tint_opacity: 0.18, plain: [15, 118, 110],  text: [240, 253, 250], accent: [52, 211, 153],  border: [167, 243, 208], glow: [45, 212, 191],  glow_strength: 0.35 },
  midnight: { tint: [15, 23, 42],    tint_opacity: 0.45, plain: [15, 23, 42],    text: [226, 232, 240], accent: [129, 140, 248], border: [148, 163, 184], glow: [99, 102, 241],  glow_strength: 0.30 },
  rose:     { tint: [244, 114, 182], tint_opacity: 0.18, plain: [157, 23, 77],   text: [255, 241, 242], accent: [251, 191, 36],  border: [253, 164, 175], glow: [244, 114, 182], glow_strength: 0.35 },
  ember:    { tint: [249, 115, 22],  tint_opacity: 0.16, plain: [154, 52, 18],   text: [255, 247, 237], accent: [253, 224, 71],  border: [253, 186, 116], glow: [251, 146, 60],  glow_strength: 0.35 },
  light:    { tint: [255, 255, 255], tint_opacity: 0.55, plain: [248, 250, 252], text: [15, 23, 42],    accent: [37, 99, 235],   border: [203, 213, 225], glow: [147, 197, 253], glow_strength: 0.20 },
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
    this._renderShell();
    this._update();
  }

  set hass(hass) {
    this._hass = hass;
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
    this._scheduleMeasure();
  }

  disconnectedCallback() {
    if (this._anim) this._anim.cancel();
    this._anim = null;
    this._ro.disconnect();
    this._observed = false;
    if (document.fonts) document.fonts.removeEventListener("loadingdone", this._onFonts);
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
        :host([fixed]) {
          position: fixed; left: ${num(c.offset, 12)}px; right: ${num(c.offset, 12)}px;
          z-index: 7; pointer-events: auto;
        }
        :host([fixed="top"]) { top: calc(var(--header-height, 56px) + ${num(c.offset, 12)}px); }
        :host([fixed="bottom"]) { bottom: calc(env(safe-area-inset-bottom, 0px) + ${num(c.offset, 12)}px); }
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
    const pos = this._config && this._config.position;
    const editing = this._editMode || this._preview;
    if ((pos === "top" || pos === "bottom") && !editing) this.setAttribute("fixed", pos);
    else this.removeAttribute("fixed");
  }

  /* ----- data ----- */
  _collect() {
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

    (c.entities || []).forEach((e) => {
      const conf = typeof e === "string" ? { entity: e } : e;
      const st = hass && hass.states[conf.entity];
      if (!st) return;
      const value = hass.formatEntityState ? hass.formatEntityState(st) : `${st.state}${st.attributes.unit_of_measurement ? " " + st.attributes.unit_of_measurement : ""}`;
      items.push({
        name: conf.name !== undefined ? conf.name : st.attributes.friendly_name || conf.entity,
        text: value,
        icon: conf.icon || st.attributes.icon,
        color: conf.color,
      });
    });
    return items;
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
        return `<span class="item"${style}>${icon}${name}<span class="text">${esc(m.text)}</span></span>${sep}`;
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
const THEME_OPTIONS = Object.keys(THEMES).map((k) => ({ value: k, label: k[0].toUpperCase() + k.slice(1) }));
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

  return [
    { name: "title", selector: { text: {} } },
    { name: "title_icon", selector: { icon: {} } },
    { name: "entity", selector: { entity: { domain: "sensor" } } },
    { name: "messages_text", selector: { text: { multiline: true } } },
    { name: "entities", selector: { entity: { multiple: true } } },
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
    if (c.glow_strength === undefined) data.glow_strength = theme.glow_strength;
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
