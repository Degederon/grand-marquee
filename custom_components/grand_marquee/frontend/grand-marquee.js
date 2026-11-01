/*
 * Grand Marquee — smooth, glass-styled scrolling ticker for Home Assistant.
 * Shipped and auto-registered by the grand_marquee integration (can also be
 * added manually as a dashboard resource).
 */
const GM_VERSION = "1.2.0";

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
  mode: "scroll",          // scroll | flip
  flip_seconds: 5,
  flip_effect: "fade",     // fade | slide
  urgent_seconds: 8,
  urgent_repeat: 0,        // minutes; 0 = show once
  open_links: true,
  dismiss_on_tap: false,
};

const DEFAULT_ENTITY = "sensor.grand_marquee_messages";
const NEWS_ENTITY = "sensor.grand_marquee_news";

const SPORTS_ENTITY = "sensor.grand_marquee_sports";

// What the marquee can show. `sources` picks some and sets their order.
const SOURCE_KEYS = ["messages", "alerts", "weather", "news", "sports", "calendar", "countdown", "todo", "board", "people", "travel", "sun", "date", "entities"];
const DEFAULT_SOURCES = ["messages", "entities"];
const NEWS_TOPIC_KEYS = ["top", "world", "nation", "business", "technology", "entertainment", "sports", "science", "health", "custom"];
const LEAGUES = {
  nfl: ["NFL", "mdi:football"], ncaaf: ["College football", "mdi:football"], nba: ["NBA", "mdi:basketball"],
  wnba: ["WNBA", "mdi:basketball"], ncaab: ["College basketball", "mdi:basketball"], mlb: ["MLB", "mdi:baseball"],
  nhl: ["NHL", "mdi:hockey-puck"], mls: ["MLS", "mdi:soccer"], epl: ["Premier League", "mdi:soccer"],
  laliga: ["LaLiga", "mdi:soccer"], ucl: ["Champions League", "mdi:soccer"],
};
const ALERT_RGB = [239, 68, 68];

/* ---------- words: English, Spanish, French, German ---------- */
const STRINGS = {
  en: {
    src_messages: "Messages", src_alerts: "Weather alerts", src_weather: "Weather", src_news: "News", src_sports: "Sports scores",
    src_calendar: "Calendar", src_countdown: "Countdowns", src_todo: "To-do lists", src_board: "Message board notes",
    src_people: "Who's home", src_travel: "Commute", src_sun: "Sunrise & sunset", src_date: "Date", src_entities: "Entity values",
    t_top: "Top stories", t_world: "World", t_nation: "National", t_business: "Business", t_technology: "Technology",
    t_entertainment: "Entertainment", t_sports: "Sports", t_science: "Science", t_health: "Health", t_custom: "Your own feeds",
    tag_weather: "Weather", tag_calendar: "Calendar", tag_todo: "To-do", tag_board: "Board", tag_alert: "Alert",
    tag_countdown: "Countdown", tag_people: "Home", tag_travel: "Commute", tag_news: "News", tag_urgent: "Urgent",
    now: "now", high: "High", low: "Low", rain: "{n}% chance of rain", tomorrow: "Tomorrow", today: "Today",
    sunrise: "Sunrise {t}", sunset: "Sunset {t}", more: "+{n} more", final: "Final", live: "Live", at: "at",
    in_days: "{name} in {n} days", is_tomorrow: "{name} is tomorrow", is_today: "Today: {name}",
    drawing: "✏️ Drawing", everyone: "Everyone", no_messages: "No messages",
    turn_on_news: "Turn on {x} news under Settings → Devices & services → Grand Marquee → Configure",
    turn_on_sports: "Choose leagues to follow under Settings → Devices & services → Grand Marquee → Configure",
    no_board: "Install Glass Message Board to show its notes here",
    sec_show: "What to show", sec_colors: "Colors", sec_glass: "Glass colors", sec_cat: "Category colors", sec_font: "Font",
    sec_layout: "Layout & placement", sec_behavior: "Scrolling, alerts & taps",
    title: "Label (optional pill on the left)", title_icon: "Label icon", entity: "Message sensor",
    sources: "Show these, in this order", messages_text: "Static messages (one per line)", entities: "Entities to show",
    weather_entity: "Weather", weather_tomorrow: "Also show tomorrow",
    news_topics: "News topics (empty = all you turned on)", news_count: "Headlines", news_source: "Show the news source",
    sports_leagues: "Leagues (empty = all you follow)", sports_count: "Games",
    calendar_entities: "Calendars (empty = all)", calendar_count: "Events", calendar_hours: "Look ahead",
    countdowns_text: "Countdowns (one per line, e.g. Christmas: 12-25 or Trip: 2027-03-14)",
    countdown_calendars: "Also count down to events in these calendars", countdown_days: "Show countdowns this many days ahead",
    todo_entities: "To-do lists (empty = all)", todo_count: "Items per list",
    board_count: "Notes", board_drawings: "Include drawings",
    alerts_entities: "Alert entities (weather warnings and similar)", alerts_urgent: "Show alerts as urgent",
    people_entities: "People (empty = everyone)", travel_entities: "Travel time sensors",
    show_tags: "Show category tags (Weather, News, …)",
    speed: "Speed", direction: "Direction", dir_left: "Right → left", dir_right: "Left → right",
    style: "Style", style_glass: "Glass", style_plain: "Plain (solid color)", theme: "Color preset", professional: "Professional",
    tint_color: "Glass tint", tint_color_plain: "Background", tint_opacity: "Tint strength", text_color: "Text",
    accent_color: "Accent / icons", border_color: "Edge highlight", border_width: "Border width", glow_color: "Glow",
    glow_strength: "Glow strength", blur: "Background blur", color_of: "{x}",
    font_family: "Font", font_family_custom: "Font name (e.g. Comfortaa, or one installed on the device)",
    load_web_font: "Load this font from Google Fonts", font_size: "Font size", font_weight: "Font weight", uppercase: "Uppercase",
    position: "Placement", pos_inline: "In the dashboard", pos_top: "Pinned to top of screen", pos_bottom: "Pinned to bottom of screen",
    offset: "Edge offset", reserve_space: "Leave room so it doesn't cover cards", height: "Height", border_radius: "Corner radius",
    gap: "Space between messages", separator: "Separator", fade_edges: "Fade edges", pause_on_hover: "Pause on hover",
    show_icons: "Show icons", hide_when_empty: "Hide when empty", opacity: "Opacity",
    mode: "Display", mode_scroll: "Scroll continuously", mode_flip: "One at a time (flip)",
    flip_seconds: "Seconds per item", flip_effect: "Transition", fx_fade: "Fade", fx_slide: "Slide up",
    urgent_seconds: "Show urgent items for", urgent_repeat: "Repeat urgent items every (0 = once)",
    open_links: "Tap a headline to open it", dismiss_on_tap: "Tap a message to remove it", tap_to_pause: "Tap to pause",
    sec: "s", min: "min",
  },
  es: {
    src_messages: "Mensajes", src_alerts: "Alertas meteorológicas", src_weather: "Tiempo", src_news: "Noticias", src_sports: "Resultados deportivos",
    src_calendar: "Calendario", src_countdown: "Cuentas atrás", src_todo: "Listas de tareas", src_board: "Notas del tablón",
    src_people: "Quién está en casa", src_travel: "Trayecto", src_sun: "Amanecer y atardecer", src_date: "Fecha", src_entities: "Valores de entidades",
    t_top: "Portada", t_world: "Mundo", t_nation: "Nacional", t_business: "Economía", t_technology: "Tecnología",
    t_entertainment: "Entretenimiento", t_sports: "Deportes", t_science: "Ciencia", t_health: "Salud", t_custom: "Tus fuentes",
    tag_weather: "Tiempo", tag_calendar: "Calendario", tag_todo: "Tareas", tag_board: "Tablón", tag_alert: "Alerta",
    tag_countdown: "Cuenta atrás", tag_people: "Casa", tag_travel: "Trayecto", tag_news: "Noticias", tag_urgent: "Urgente",
    now: "ahora", high: "Máx.", low: "Mín.", rain: "{n}% de probabilidad de lluvia", tomorrow: "Mañana", today: "Hoy",
    sunrise: "Amanecer {t}", sunset: "Atardecer {t}", more: "+{n} más", final: "Final", live: "En directo", at: "en",
    in_days: "{name} en {n} días", is_tomorrow: "{name} es mañana", is_today: "Hoy: {name}",
    drawing: "✏️ Dibujo", everyone: "Todos", no_messages: "No hay mensajes",
    turn_on_news: "Activa las noticias de {x} en Ajustes → Dispositivos y servicios → Grand Marquee → Configurar",
    turn_on_sports: "Elige las ligas en Ajustes → Dispositivos y servicios → Grand Marquee → Configurar",
    no_board: "Instala Glass Message Board para mostrar aquí sus notas",
    sec_show: "Qué mostrar", sec_colors: "Colores", sec_glass: "Colores del cristal", sec_cat: "Colores por categoría", sec_font: "Fuente",
    sec_layout: "Diseño y posición", sec_behavior: "Desplazamiento, alertas y toques",
    title: "Etiqueta (opcional, a la izquierda)", title_icon: "Icono de la etiqueta", entity: "Sensor de mensajes",
    sources: "Mostrar esto, en este orden", messages_text: "Mensajes fijos (uno por línea)", entities: "Entidades a mostrar",
    weather_entity: "Tiempo", weather_tomorrow: "Mostrar también mañana",
    news_topics: "Temas (vacío = todos los activados)", news_count: "Titulares", news_source: "Mostrar la fuente",
    sports_leagues: "Ligas (vacío = todas las que sigues)", sports_count: "Partidos",
    calendar_entities: "Calendarios (vacío = todos)", calendar_count: "Eventos", calendar_hours: "Mirar hacia adelante",
    countdowns_text: "Cuentas atrás (una por línea, p. ej. Navidad: 12-25 o Viaje: 2027-03-14)",
    countdown_calendars: "Contar también hasta eventos de estos calendarios", countdown_days: "Mostrar cuentas atrás con estos días de antelación",
    todo_entities: "Listas de tareas (vacío = todas)", todo_count: "Elementos por lista",
    board_count: "Notas", board_drawings: "Incluir dibujos",
    alerts_entities: "Entidades de alerta (avisos meteorológicos y similares)", alerts_urgent: "Mostrar las alertas como urgentes",
    people_entities: "Personas (vacío = todas)", travel_entities: "Sensores de tiempo de viaje",
    show_tags: "Mostrar etiquetas de categoría (Tiempo, Noticias, …)",
    speed: "Velocidad", direction: "Dirección", dir_left: "Derecha → izquierda", dir_right: "Izquierda → derecha",
    style: "Estilo", style_glass: "Cristal", style_plain: "Sencillo (color sólido)", theme: "Combinación de colores", professional: "Profesional",
    tint_color: "Tinte del cristal", tint_color_plain: "Fondo", tint_opacity: "Intensidad del tinte", text_color: "Texto",
    accent_color: "Acento / iconos", border_color: "Borde", border_width: "Grosor del borde", glow_color: "Brillo",
    glow_strength: "Intensidad del brillo", blur: "Desenfoque del fondo", color_of: "{x}",
    font_family: "Fuente", font_family_custom: "Nombre de la fuente (p. ej. Comfortaa, o una instalada en el dispositivo)",
    load_web_font: "Cargar esta fuente de Google Fonts", font_size: "Tamaño de letra", font_weight: "Grosor de letra", uppercase: "Mayúsculas",
    position: "Posición", pos_inline: "En el panel", pos_top: "Fijada arriba", pos_bottom: "Fijada abajo",
    offset: "Distancia al borde", reserve_space: "Dejar espacio para no tapar tarjetas", height: "Altura", border_radius: "Radio de las esquinas",
    gap: "Espacio entre mensajes", separator: "Separador", fade_edges: "Difuminar bordes", pause_on_hover: "Pausar al pasar el ratón",
    show_icons: "Mostrar iconos", hide_when_empty: "Ocultar si está vacía", opacity: "Opacidad",
    mode: "Visualización", mode_scroll: "Desplazamiento continuo", mode_flip: "De uno en uno",
    flip_seconds: "Segundos por elemento", flip_effect: "Transición", fx_fade: "Fundido", fx_slide: "Deslizar hacia arriba",
    urgent_seconds: "Mostrar lo urgente durante", urgent_repeat: "Repetir lo urgente cada (0 = una vez)",
    open_links: "Tocar un titular para abrirlo", dismiss_on_tap: "Tocar un mensaje para quitarlo", tap_to_pause: "Tocar para pausar",
    sec: "s", min: "min",
  },
  fr: {
    src_messages: "Messages", src_alerts: "Alertes météo", src_weather: "Météo", src_news: "Actualités", src_sports: "Résultats sportifs",
    src_calendar: "Agenda", src_countdown: "Comptes à rebours", src_todo: "Listes de tâches", src_board: "Notes du tableau",
    src_people: "Qui est à la maison", src_travel: "Trajet", src_sun: "Lever et coucher du soleil", src_date: "Date", src_entities: "Valeurs d'entités",
    t_top: "À la une", t_world: "Monde", t_nation: "National", t_business: "Économie", t_technology: "Technologie",
    t_entertainment: "Divertissement", t_sports: "Sports", t_science: "Sciences", t_health: "Santé", t_custom: "Vos flux",
    tag_weather: "Météo", tag_calendar: "Agenda", tag_todo: "Tâches", tag_board: "Tableau", tag_alert: "Alerte",
    tag_countdown: "Compte à rebours", tag_people: "Maison", tag_travel: "Trajet", tag_news: "Actualités", tag_urgent: "Urgent",
    now: "maintenant", high: "Max.", low: "Min.", rain: "{n} % de risque de pluie", tomorrow: "Demain", today: "Aujourd'hui",
    sunrise: "Lever {t}", sunset: "Coucher {t}", more: "+{n} autres", final: "Terminé", live: "En direct", at: "chez",
    in_days: "{name} dans {n} jours", is_tomorrow: "{name}, c'est demain", is_today: "Aujourd'hui : {name}",
    drawing: "✏️ Dessin", everyone: "Tout le monde", no_messages: "Aucun message",
    turn_on_news: "Activez les actualités {x} dans Paramètres → Appareils et services → Grand Marquee → Configurer",
    turn_on_sports: "Choisissez les ligues dans Paramètres → Appareils et services → Grand Marquee → Configurer",
    no_board: "Installez Glass Message Board pour afficher ses notes ici",
    sec_show: "Que montrer", sec_colors: "Couleurs", sec_glass: "Couleurs du verre", sec_cat: "Couleurs par catégorie", sec_font: "Police",
    sec_layout: "Disposition et position", sec_behavior: "Défilement, alertes et appuis",
    title: "Étiquette (facultative, à gauche)", title_icon: "Icône de l'étiquette", entity: "Capteur de messages",
    sources: "Afficher ceci, dans cet ordre", messages_text: "Messages fixes (un par ligne)", entities: "Entités à afficher",
    weather_entity: "Météo", weather_tomorrow: "Afficher aussi demain",
    news_topics: "Sujets (vide = tous ceux activés)", news_count: "Titres", news_source: "Afficher la source",
    sports_leagues: "Ligues (vide = toutes celles suivies)", sports_count: "Matchs",
    calendar_entities: "Agendas (vide = tous)", calendar_count: "Événements", calendar_hours: "Regarder en avant",
    countdowns_text: "Comptes à rebours (un par ligne, ex. Noël : 12-25 ou Voyage : 2027-03-14)",
    countdown_calendars: "Compter aussi jusqu'aux événements de ces agendas", countdown_days: "Afficher les comptes à rebours à partir de ce nombre de jours",
    todo_entities: "Listes de tâches (vide = toutes)", todo_count: "Éléments par liste",
    board_count: "Notes", board_drawings: "Inclure les dessins",
    alerts_entities: "Entités d'alerte (vigilances météo et similaires)", alerts_urgent: "Afficher les alertes comme urgentes",
    people_entities: "Personnes (vide = tout le monde)", travel_entities: "Capteurs de temps de trajet",
    show_tags: "Afficher les étiquettes de catégorie (Météo, Actualités, …)",
    speed: "Vitesse", direction: "Sens", dir_left: "Droite → gauche", dir_right: "Gauche → droite",
    style: "Style", style_glass: "Verre", style_plain: "Uni (couleur pleine)", theme: "Palette", professional: "Professionnel",
    tint_color: "Teinte du verre", tint_color_plain: "Fond", tint_opacity: "Intensité de la teinte", text_color: "Texte",
    accent_color: "Accent / icônes", border_color: "Bordure", border_width: "Épaisseur de bordure", glow_color: "Lueur",
    glow_strength: "Intensité de la lueur", blur: "Flou de l'arrière-plan", color_of: "{x}",
    font_family: "Police", font_family_custom: "Nom de la police (ex. Comfortaa, ou une installée sur l'appareil)",
    load_web_font: "Charger cette police depuis Google Fonts", font_size: "Taille du texte", font_weight: "Graisse", uppercase: "Majuscules",
    position: "Position", pos_inline: "Dans le tableau de bord", pos_top: "Fixé en haut", pos_bottom: "Fixé en bas",
    offset: "Distance du bord", reserve_space: "Laisser de la place pour ne pas masquer les cartes", height: "Hauteur", border_radius: "Arrondi des coins",
    gap: "Espace entre les messages", separator: "Séparateur", fade_edges: "Fondu sur les bords", pause_on_hover: "Pause au survol",
    show_icons: "Afficher les icônes", hide_when_empty: "Masquer si vide", opacity: "Opacité",
    mode: "Affichage", mode_scroll: "Défilement continu", mode_flip: "Un à la fois",
    flip_seconds: "Secondes par élément", flip_effect: "Transition", fx_fade: "Fondu", fx_slide: "Glisser vers le haut",
    urgent_seconds: "Afficher l'urgent pendant", urgent_repeat: "Répéter l'urgent toutes les (0 = une fois)",
    open_links: "Appuyer sur un titre pour l'ouvrir", dismiss_on_tap: "Appuyer sur un message pour le retirer", tap_to_pause: "Appuyer pour mettre en pause",
    sec: "s", min: "min",
  },
  de: {
    src_messages: "Nachrichten", src_alerts: "Wetterwarnungen", src_weather: "Wetter", src_news: "News", src_sports: "Sportergebnisse",
    src_calendar: "Kalender", src_countdown: "Countdowns", src_todo: "To-do-Listen", src_board: "Notizen vom Board",
    src_people: "Wer ist zu Hause", src_travel: "Arbeitsweg", src_sun: "Sonnenauf- und -untergang", src_date: "Datum", src_entities: "Entitätswerte",
    t_top: "Schlagzeilen", t_world: "Welt", t_nation: "Inland", t_business: "Wirtschaft", t_technology: "Technik",
    t_entertainment: "Unterhaltung", t_sports: "Sport", t_science: "Wissenschaft", t_health: "Gesundheit", t_custom: "Eigene Feeds",
    tag_weather: "Wetter", tag_calendar: "Kalender", tag_todo: "To-do", tag_board: "Board", tag_alert: "Warnung",
    tag_countdown: "Countdown", tag_people: "Zuhause", tag_travel: "Weg", tag_news: "News", tag_urgent: "Dringend",
    now: "jetzt", high: "Höchst", low: "Tiefst", rain: "{n} % Regenwahrscheinlichkeit", tomorrow: "Morgen", today: "Heute",
    sunrise: "Sonnenaufgang {t}", sunset: "Sonnenuntergang {t}", more: "+{n} weitere", final: "Endstand", live: "Live", at: "bei",
    in_days: "{name} in {n} Tagen", is_tomorrow: "{name} ist morgen", is_today: "Heute: {name}",
    drawing: "✏️ Zeichnung", everyone: "Alle", no_messages: "Keine Nachrichten",
    turn_on_news: "Aktiviere {x}-News unter Einstellungen → Geräte & Dienste → Grand Marquee → Konfigurieren",
    turn_on_sports: "Wähle Ligen unter Einstellungen → Geräte & Dienste → Grand Marquee → Konfigurieren",
    no_board: "Installiere Glass Message Board, um seine Notizen hier zu zeigen",
    sec_show: "Was anzeigen", sec_colors: "Farben", sec_glass: "Glasfarben", sec_cat: "Farben je Kategorie", sec_font: "Schrift",
    sec_layout: "Layout & Platzierung", sec_behavior: "Laufen, Warnungen & Tippen",
    title: "Beschriftung (optional, links)", title_icon: "Symbol der Beschriftung", entity: "Nachrichtensensor",
    sources: "Diese anzeigen, in dieser Reihenfolge", messages_text: "Feste Nachrichten (eine pro Zeile)", entities: "Anzuzeigende Entitäten",
    weather_entity: "Wetter", weather_tomorrow: "Auch morgen anzeigen",
    news_topics: "Themen (leer = alle aktivierten)", news_count: "Schlagzeilen", news_source: "Quelle anzeigen",
    sports_leagues: "Ligen (leer = alle verfolgten)", sports_count: "Spiele",
    calendar_entities: "Kalender (leer = alle)", calendar_count: "Termine", calendar_hours: "Vorausschauen",
    countdowns_text: "Countdowns (einer pro Zeile, z. B. Weihnachten: 12-25 oder Reise: 2027-03-14)",
    countdown_calendars: "Auch bis zu Terminen in diesen Kalendern zählen", countdown_days: "Countdowns so viele Tage vorher zeigen",
    todo_entities: "To-do-Listen (leer = alle)", todo_count: "Einträge pro Liste",
    board_count: "Notizen", board_drawings: "Zeichnungen einschließen",
    alerts_entities: "Warnungs-Entitäten (Unwetterwarnungen u. Ä.)", alerts_urgent: "Warnungen als dringend zeigen",
    people_entities: "Personen (leer = alle)", travel_entities: "Fahrzeit-Sensoren",
    show_tags: "Kategorie-Etiketten zeigen (Wetter, News, …)",
    speed: "Geschwindigkeit", direction: "Richtung", dir_left: "Rechts → links", dir_right: "Links → rechts",
    style: "Stil", style_glass: "Glas", style_plain: "Schlicht (Vollfarbe)", theme: "Farbschema", professional: "Professionell",
    tint_color: "Glastönung", tint_color_plain: "Hintergrund", tint_opacity: "Tönungsstärke", text_color: "Text",
    accent_color: "Akzent / Symbole", border_color: "Rand", border_width: "Randbreite", glow_color: "Leuchten",
    glow_strength: "Leuchtstärke", blur: "Hintergrundunschärfe", color_of: "{x}",
    font_family: "Schrift", font_family_custom: "Schriftname (z. B. Comfortaa oder eine auf dem Gerät installierte)",
    load_web_font: "Diese Schrift von Google Fonts laden", font_size: "Schriftgröße", font_weight: "Schriftstärke", uppercase: "Großbuchstaben",
    position: "Platzierung", pos_inline: "Im Dashboard", pos_top: "Oben angeheftet", pos_bottom: "Unten angeheftet",
    offset: "Abstand zum Rand", reserve_space: "Platz lassen, damit keine Karten verdeckt werden", height: "Höhe", border_radius: "Eckenradius",
    gap: "Abstand zwischen Nachrichten", separator: "Trennzeichen", fade_edges: "Ränder ausblenden", pause_on_hover: "Bei Mauszeiger pausieren",
    show_icons: "Symbole zeigen", hide_when_empty: "Ausblenden, wenn leer", opacity: "Deckkraft",
    mode: "Anzeige", mode_scroll: "Durchlaufend", mode_flip: "Eins nach dem anderen",
    flip_seconds: "Sekunden pro Eintrag", flip_effect: "Übergang", fx_fade: "Überblenden", fx_slide: "Nach oben schieben",
    urgent_seconds: "Dringendes zeigen für", urgent_repeat: "Dringendes wiederholen alle (0 = einmal)",
    open_links: "Schlagzeile antippen zum Öffnen", dismiss_on_tap: "Nachricht antippen zum Entfernen", tap_to_pause: "Antippen zum Pausieren",
    sec: "s", min: "Min.",
  },
};
function tr(lang, key, vars) {
  const l = String(lang || "en").split("-")[0];
  let s = (STRINGS[l] && STRINGS[l][key]) || STRINGS.en[key] || key;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.split(`{${k}}`).join(v);
  return s;
}

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
const WEATHER_TEXT_I18N = {"es": {"clear-night": "Despejado", "cloudy": "Nublado", "exceptional": "Tiempo inusual", "fog": "Niebla", "hail": "Granizo", "lightning": "Tormentas", "lightning-rainy": "Tormentas y lluvia", "partlycloudy": "Parcialmente nublado", "pouring": "Lluvia intensa", "rainy": "Lluvia", "snowy": "Nieve", "snowy-rainy": "Aguanieve", "sunny": "Soleado", "windy": "Ventoso", "windy-variant": "Ventoso y nublado"}, "fr": {"clear-night": "Dégagé", "cloudy": "Nuageux", "exceptional": "Temps inhabituel", "fog": "Brouillard", "hail": "Grêle", "lightning": "Orages", "lightning-rainy": "Orages et pluie", "partlycloudy": "Partiellement nuageux", "pouring": "Fortes pluies", "rainy": "Pluie", "snowy": "Neige", "snowy-rainy": "Neige fondue", "sunny": "Ensoleillé", "windy": "Venteux", "windy-variant": "Venteux et nuageux"}, "de": {"clear-night": "Klar", "cloudy": "Bewölkt", "exceptional": "Ungewöhnliches Wetter", "fog": "Nebel", "hail": "Hagel", "lightning": "Gewitter", "lightning-rainy": "Gewitter und Regen", "partlycloudy": "Teilweise bewölkt", "pouring": "Starkregen", "rainy": "Regen", "snowy": "Schnee", "snowy-rainy": "Schneeregen", "sunny": "Sonnig", "windy": "Windig", "windy-variant": "Windig und bewölkt"}};
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
    this._base = { ...DEFAULTS, ...config };
    this._effKey = null;
    this._applyEffective();
    this._startScheduleTimer();
  }

  /* ----- schedules: different settings by time of day, or hidden (quiet hours) ----- */
  _activeBlock() {
    const list = Array.isArray(this._base.schedule) ? this._base.schedule : [];
    const now = new Date();
    const mins = now.getHours() * 60 + now.getMinutes();
    const day = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][now.getDay()];
    const toMin = (t) => { const m = String(t || "").match(/^(\d{1,2}):(\d{2})/); return m ? +m[1] * 60 + +m[2] : null; };
    return list.findIndex((b) => {
      if (!b || typeof b !== "object") return false;
      if (Array.isArray(b.days) && b.days.length && !b.days.map((d) => String(d).slice(0, 3).toLowerCase()).includes(day)) return false;
      const from = toMin(b.from), to = toMin(b.to);
      if (from === null || to === null) return false;
      return from <= to ? mins >= from && mins < to : mins >= from || mins < to; // overnight blocks wrap
    });
  }

  _applyEffective() {
    const i = this._activeBlock();
    const key = String(i);
    if (key === this._effKey && this._config) return;
    this._effKey = key;
    const block = i >= 0 ? this._base.schedule[i] : null;
    const overrides = block ? Object.fromEntries(Object.entries(block).filter(([k]) => !["from", "to", "days"].includes(k))) : {};
    this._config = { ...this._base, ...overrides };
    this._sig = "";
    this._listsKey = null;     // re-fetch calendar / to-do for the new settings
    if (this._hass) this._ensureSources();
    this._renderShell();
    this._update();
  }

  _startScheduleTimer() {
    clearInterval(this._schedTimer);
    this._schedTimer = null;
    if (this.isConnected && Array.isArray(this._base && this._base.schedule) && this._base.schedule.length) {
      this._schedTimer = setInterval(() => this._applyEffective(), 30000);
    }
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
    if (this._base) { this._startScheduleTimer(); this._applyEffective(); }
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
    clearInterval(this._schedTimer); this._schedTimer = null;
    clearInterval(this._urgentTimer); this._urgentTimer = null;
    clearTimeout(this._urgentHide);
    this._flipRun = null;
  }

  _lng() { return this._lang(); }
  _t(key, vars) { return tr(this._lang(), key, vars); }

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
          opacity: ${num(c.opacity, 1)};
        }
        :host([sched-hidden]) { display: none; }
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
          --tag-bg: var(--tag-rgb);
          font-size: max(10px, calc(var(--gm-font) * 0.55)); font-weight: 700; line-height: 1;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 0.45em 0.75em; border-radius: 999px;
          color: var(--gm-text);
          background: rgba(var(--tag-rgb), 0.22);
          border: 1px solid rgba(var(--tag-rgb), 0.5);
          text-shadow: none;
        }
        .sep {
          display: inline-block; flex: none; padding-right: var(--gm-gap);
          color: var(--gm-accent); font-size: var(--gm-font); opacity: 0.9;
          text-shadow: 0 0 10px var(--gm-accent);
        }
        .empty { padding: 0 20px; opacity: 0.6; font-size: var(--gm-font); }
        .item { --tag-rgb: ${rgb(p.accent)}; }
        .item[data-link], .item[data-dismiss] { cursor: pointer; }
        .item.urgent .text { font-weight: 700; }
        .item.urgent ha-icon { color: rgb(${rgb(ALERT_RGB)}); }

        /* urgent banner: takes over the bar for a few seconds */
        .urgent-banner {
          position: absolute; inset: 0; z-index: 3;
          display: flex; align-items: center; justify-content: center; gap: 12px;
          padding: 0 24px; border-radius: inherit;
          background: linear-gradient(90deg, rgb(${rgb(ALERT_RGB)}), rgb(185, 28, 28), rgb(${rgb(ALERT_RGB)}));
          color: #fff; font-size: var(--gm-font); font-weight: 700; white-space: nowrap; overflow: hidden;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
          opacity: 0; pointer-events: none; transition: opacity 0.35s ease;
          cursor: pointer;
        }
        .urgent-banner.show { opacity: 1; pointer-events: auto; animation: gm-pulse 1.6s ease-in-out infinite; }
        .urgent-banner ha-icon { --mdc-icon-size: calc(var(--gm-font) * 1.2); flex: none; }
        .urgent-banner .ub-text { overflow: hidden; text-overflow: ellipsis; }
        @keyframes gm-pulse { 0%, 100% { box-shadow: inset 0 0 0 0 rgba(255,255,255,0); } 50% { box-shadow: inset 0 0 0 2px rgba(255,255,255,0.55); } }

        /* flip mode: one item at a time */
        .track.flip { position: relative; width: 100%; height: 100%; transform: none !important; }
        .slide {
          position: absolute; inset: 0; display: flex; align-items: center;
          padding: 0 22px; overflow: hidden; opacity: 0;
        }
        .slide.fits { justify-content: center; }
        .slide .item { padding-right: 0; will-change: transform; }
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
          <div class="urgent-banner" role="alert"><ha-icon icon="mdi:alert"></ha-icon><span class="ub-text"></span></div>
        </div>
      </ha-card>`;
    this.toggleAttribute("sched-hidden", !!c.hide);
    this._banner = this.shadowRoot.querySelector(".urgent-banner");
    this._banner.addEventListener("click", (e) => { e.stopPropagation(); this._hideUrgent(); });
    this._viewport = this.shadowRoot.querySelector(".viewport");
    this._track = this.shadowRoot.querySelector(".track");
    this._observed = false;

    if (c.pause_on_hover) {
      this._viewport.addEventListener("mouseenter", () => this._setPaused(true));
      this._viewport.addEventListener("mouseleave", () => this._setPaused(false));
    }
    // Taps: open a headline, remove a message, or pause / resume (wall tablets).
    this._viewport.addEventListener("click", (e) => {
      const el = e.target.closest && e.target.closest(".item");
      const item = el && this._items ? this._items[+el.dataset.i] : null;
      if (item && item.link && c.open_links !== false) {
        window.open(item.link, "_blank", "noopener");
        return;
      }
      if (item && item.dismiss && c.dismiss_on_tap && this._hass) {
        this._hass.callService("grand_marquee", "remove_message", { id: item.dismiss });
        return;
      }
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
    if (Array.isArray(list) && list.length) return list.filter((x) => SOURCE_KEYS.includes(x));
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
    this._ensureBoard();
  }

  _stopSources() {
    this._unsubWeather();
    clearInterval(this._listTimer);
    clearTimeout(this._listDebounce);
    this._listTimer = null;
    this._listsKey = null;
    this._listsStamp = null;
    this._unsubBoard();
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
    const l = this._lang().split("-")[0];
    return t || (WEATHER_TEXT_I18N[l] && WEATHER_TEXT_I18N[l][cond]) || WEATHER_TEXT[cond] || cond || "";
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
    if (typeof a.temperature === "number") parts.push(`${Math.round(a.temperature)}${unit} ${this._t("now")}`);
    const today = this._forecastDay(0);
    if (today) {
      if (today.hi !== null) parts.push(`${this._t("high")} ${deg(today.hi)}`);
      if (today.lo !== null && today.lo !== today.hi) parts.push(`${this._t("low")} ${deg(today.lo)}`);
      if (today.rain) parts.push(this._t("rain", { n: Math.round(today.rain) }));
    }
    const items = [{ text: parts.join(" · "), icon: WEATHER_ICONS[st.state] || "mdi:weather-partly-cloudy", tag: this._t("tag_weather") }];
    const tomorrow = this._config.weather_tomorrow ? this._forecastDay(1) : null;
    if (tomorrow) {
      const t = [this._conditionText(tomorrow.cond)];
      if (tomorrow.hi !== null) t.push(tomorrow.lo !== null && tomorrow.lo !== tomorrow.hi ? `${deg(tomorrow.hi)} / ${deg(tomorrow.lo)}` : deg(tomorrow.hi));
      if (tomorrow.rain) t.push(this._t("rain", { n: Math.round(tomorrow.rain) }));
      items.push({ text: t.join(" · "), icon: WEATHER_ICONS[tomorrow.cond] || "mdi:weather-partly-cloudy", tag: this._dayLabel(new Date(Date.now() + 86400000)) || this._t("tomorrow") });
    }
    return items;
  }

  /* calendar, countdown calendars and to-do: fetched every 10 minutes and whenever they change */
  _ensureLists() {
    const src = this._sources();
    const c = this._config;
    const cal = src.includes("calendar") ? this._ids(c.calendar_entities, "calendar") : [];
    const cd = src.includes("countdown") && Array.isArray(c.countdown_calendars) ? c.countdown_calendars.filter((id) => this._hass.states[id]) : [];
    const todo = src.includes("todo") ? this._ids(c.todo_entities, "todo") : [];
    const key = JSON.stringify([cal, cd, todo, num(c.calendar_hours, 24), num(c.countdown_days, 90)]);
    const stamp = cal.concat(cd, todo).map((id) => this._hass.states[id].last_updated).join("|");
    const any = cal.length || cd.length || todo.length;
    if (key !== this._listsKey) {
      this._listsKey = key;
      this._listsStamp = stamp;
      clearInterval(this._listTimer);
      this._listTimer = any ? setInterval(() => this._fetchLists(cal, todo, cd), LIST_REFRESH_MS) : null;
      this._events = []; this._todos = []; this._cdEvents = [];
      if (any) this._fetchLists(cal, todo, cd);
    } else if (stamp !== this._listsStamp) {
      this._listsStamp = stamp;
      clearTimeout(this._listDebounce);
      this._listDebounce = setTimeout(() => this._fetchLists(cal, todo, cd), 1500);
    }
  }

  async _call(domain, service, target, data) {
    const r = await this._hass.callWS({
      type: "call_service", domain, service, target: { entity_id: target },
      service_data: data, return_response: true,
    });
    return (r && r.response) || {};
  }

  async _events_for(ids, hours) {
    const resp = await this._call("calendar", "get_events", ids, { duration: { hours } });
    return Object.entries(resp)
      .flatMap(([id, v]) => ((v && v.events) || []).map((e) => ({ ...e, calendar: id })))
      .sort((x, y) => new Date(x.start) - new Date(y.start));
  }

  async _fetchLists(cal, todo, cd = []) {
    if (!this._hass || !this._hass.callWS) return;
    const c = this._config;
    if (cal.length) {
      try { this._events = await this._events_for(cal, num(c.calendar_hours, 24)); } catch (e) { this._events = []; }
    }
    if (cd.length) {
      try { this._cdEvents = await this._events_for(cd, num(c.countdown_days, 90) * 24); } catch (e) { this._cdEvents = []; }
    }
    if (todo.length) {
      try {
        const resp = await this._call("todo", "get_items", todo, { status: ["needs_action"] });
        this._todos = Object.entries(resp).map(([id, v]) => ({ id, items: (v && v.items) || [] }));
      } catch (e) { this._todos = []; }
    }
    this._update();
  }

  _cap(s) { return s ? s[0].toUpperCase() + s.slice(1) : s; }

  _calendarItems() {
    const now = new Date();
    return (this._events || [])
      .filter((e) => new Date(e.end || e.start) > now)
      .slice(0, num(this._config.calendar_count, 6))
      .map((e) => {
        const allDay = typeof e.start === "string" && e.start.length <= 10;
        const start = allDay ? new Date(e.start + "T00:00:00") : new Date(e.start);
        const day = this._dayLabel(start);
        const when = allDay ? (day || this._t("today")) : `${day ? day + " " : ""}${start < now ? this._cap(this._t("now")) : this._time(start)}`;
        return { pre: when, text: e.summary || "", icon: "mdi:calendar", tag: this._t("tag_calendar") };
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
          text: more > 0 ? `${shown} ${this._t("more", { n: more })}` : shown,
          icon: "mdi:clipboard-check-outline",
          tag: this._t("tag_todo"),
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
      tag: NEWS_TOPIC_KEYS.includes(h.category) && h.category !== "custom" ? this._t("t_" + h.category) : h.label || this._t("tag_news"),
      link: h.link || null,
    }));
    // A topic picked on the card but not turned on in the integration: say where to turn it on.
    const enabled = st.attributes.topics || [];
    const off = (wanted || []).filter((t) => t !== "custom" && !enabled.includes(t));
    if (off.length) {
      const names = off.map((t) => (NEWS_TOPIC_KEYS.includes(t) ? this._t("t_" + t) : t.replace(/^kw:/, "").replace(/-/g, " "))).join(", ");
      items.push({ text: this._t("turn_on_news", { x: names }), icon: "mdi:information-outline", tag: this._t("tag_news") });
    }
    return items;
  }

  _sunItems() {
    const st = this._hass.states["sun.sun"];
    if (!st) return [];
    const rise = st.attributes.next_rising && new Date(st.attributes.next_rising);
    const set = st.attributes.next_setting && new Date(st.attributes.next_setting);
    const parts = [];
    if (rise) parts.push([rise, this._t("sunrise", { t: this._time(rise) }), "up"]);
    if (set) parts.push([set, this._t("sunset", { t: this._time(set) }), "down"]);
    if (!parts.length) return [];
    parts.sort((x, y) => x[0] - y[0]);
    return [{ text: parts.map((x) => x[1]).join(" · "), icon: `mdi:weather-sunset-${parts[0][2]}` }];
  }

  _dateItems() {
    const text = new Date().toLocaleDateString(this._lang(), { weekday: "long", month: "long", day: "numeric" });
    return [{ text: this._cap(text), icon: "mdi:calendar-today" }];
  }

  /* weather alerts: from alert entities (Meteoalarm, NWS alerts and similar) */
  _alertItems() {
    const c = this._config;
    const ids = Array.isArray(c.alerts_entities) ? c.alerts_entities : c.alerts_entities ? [c.alerts_entities] : [];
    const urgent = c.alerts_urgent !== false;
    const out = [];
    for (const id of ids) {
      const st = this._hass.states[id];
      if (!st || ["off", "unknown", "unavailable", "0", "", "none", "None"].includes(String(st.state))) continue;
      const a = st.attributes;
      const list = a.alerts || a.Alerts || a.warnings || a.Warnings;
      const pick = (o) => (o && (o.headline || o.Headline || o.event || o.Event || o.title || o.Title || o.description)) || "";
      if (Array.isArray(list) && list.length) {
        for (const al of list) {
          const text = pick(al);
          if (text) out.push({ text, icon: "mdi:alert", tag: this._t("tag_alert"), urgent, key: `alert:${id}:${text}` });
        }
      } else {
        const text = pick(a) || a.friendly_name || id;
        out.push({ text, icon: "mdi:alert", tag: this._t("tag_alert"), urgent, key: `alert:${id}:${text}` });
      }
    }
    return out;
  }

  /* countdowns: your own dates (yearly or one-off) plus events from chosen calendars */
  _countdownItems() {
    const c = this._config;
    const ahead = num(c.countdown_days, 90);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const daysUntil = (d) => Math.round((new Date(d.getFullYear(), d.getMonth(), d.getDate()) - today) / 86400000);
    const phrase = (name, n) => (n === 0 ? this._t("is_today", { name }) : n === 1 ? this._t("is_tomorrow", { name }) : this._t("in_days", { name, n }));
    const found = [];
    for (const cd of Array.isArray(c.countdowns) ? c.countdowns : []) {
      if (!cd || !cd.name || !cd.date) continue;
      const m = String(cd.date).match(/^(?:(\d{4})-)?(\d{1,2})-(\d{1,2})$/);
      if (!m) continue;
      let d = new Date(m[1] ? +m[1] : today.getFullYear(), +m[2] - 1, +m[3]);
      if (!m[1] && daysUntil(d) < 0) d = new Date(today.getFullYear() + 1, +m[2] - 1, +m[3]);
      const n = daysUntil(d);
      if (n >= 0 && n <= ahead) found.push({ n, name: cd.name, icon: cd.icon || "mdi:timer-sand" });
    }
    const seen = new Set();
    for (const e of this._cdEvents || []) {
      const allDay = typeof e.start === "string" && e.start.length <= 10;
      const d = allDay ? new Date(e.start + "T00:00:00") : new Date(e.start);
      const n = daysUntil(d);
      const k = `${e.summary}|${n}`;
      if (n < 0 || n > ahead || seen.has(k) || !e.summary) continue;
      seen.add(k);
      found.push({ n, name: e.summary, icon: "mdi:calendar-star" });
    }
    return found.sort((x, y) => x.n - y.n).slice(0, num(c.countdown_count, 6))
      .map((f) => ({ text: phrase(f.name, f.n), icon: f.icon, tag: this._t("tag_countdown") }));
  }

  /* who's home */
  _peopleItems() {
    const c = this._config;
    const ids = this._ids(c.people_entities, "person");
    if (!ids.length) return [];
    const parts = ids.map((id) => {
      const st = this._hass.states[id];
      const name = st.attributes.friendly_name || id;
      const where = this._hass.formatEntityState ? this._hass.formatEntityState(st) : st.state;
      return `${name}: ${where}`;
    });
    return [{ text: parts.join(" · "), icon: "mdi:home-account", tag: this._t("tag_people") }];
  }

  /* commute / travel time sensors */
  _travelItems() {
    const c = this._config;
    const ids = Array.isArray(c.travel_entities) ? c.travel_entities : [];
    return ids.flatMap((id) => {
      const st = this._hass.states[id];
      if (!st || ["unknown", "unavailable"].includes(st.state)) return [];
      const value = this._hass.formatEntityState ? this._hass.formatEntityState(st) : `${st.state} ${st.attributes.unit_of_measurement || ""}`.trim();
      return [{ pre: st.attributes.friendly_name || id, text: value, icon: "mdi:car", tag: this._t("tag_travel") }];
    });
  }

  /* sports scores, from the integration's Sports sensor */
  _sportsItems() {
    const c = this._config;
    const st = this._hass.states[SPORTS_ENTITY];
    if (!st) return [];
    if (!(st.attributes.leagues || []).length) {
      return [{ text: this._t("turn_on_sports"), icon: "mdi:information-outline", tag: this._t("src_sports") }];
    }
    let games = st.attributes.games || [];
    if (Array.isArray(c.sports_leagues) && c.sports_leagues.length) games = games.filter((g) => c.sports_leagues.includes(g.league));
    return games.slice(0, num(c.sports_count, 8)).map((g) => {
      const icon = (LEAGUES[g.league] || [])[1] || "mdi:trophy-outline";
      const a = g.away, h = g.home;
      if (g.state === "pre") {
        const start = g.start ? new Date(g.start) : null;
        const when = start ? `${this._dayLabel(start) ? this._dayLabel(start) + " " : ""}${this._time(start)}` : g.detail;
        return { pre: when, text: `${a.name} ${this._t("at")} ${h.name}`, icon, tag: g.label };
      }
      const score = `${a.name} ${a.score ?? ""} – ${h.name} ${h.score ?? ""}`.replace(/\s+/g, " ").trim();
      if (g.state === "in") return { pre: this._t("live"), text: score, sub: g.detail, icon, tag: g.label };
      return { pre: this._t("final"), text: score, icon, tag: g.label };
    });
  }

  /* Glass Message Board notes, followed live */
  _ensureBoard() {
    const want = this._sources().includes("board");
    if (!want) { this._unsubBoard(); return; }
    if (this._boardSub || this._boardMissing) return;
    const conn = this._hass.connection;
    if (!conn || !conn.subscribeMessage) return;
    this._boardSub = "pending";
    conn.subscribeMessage((ev) => {
      if (!ev) return;
      if (ev.action === "snapshot") this._board = new Map((ev.messages || []).map((m) => [m.id, m]));
      else if (ev.message && this._board) {
        if (ev.action === "removed") this._board.delete(ev.message.id);
        else this._board.set(ev.message.id, { ...(this._board.get(ev.message.id) || {}), ...ev.message });
      }
      this._update();
    }, { type: "glass_messages/subscribe" })
      .then((unsub) => { if (this._boardSub === "pending") this._boardSub = unsub; else unsub(); })
      .catch(() => { this._boardSub = null; this._boardMissing = true; this._update(); });
  }

  _unsubBoard() {
    if (typeof this._boardSub === "function") { try { this._boardSub(); } catch (e) { /* gone */ } }
    this._boardSub = null;
    this._board = null;
  }

  _boardItems() {
    if (this._boardMissing) return [{ text: this._t("no_board"), icon: "mdi:information-outline", tag: this._t("tag_board") }];
    if (!this._board) return [];
    const c = this._config;
    const notes = [...this._board.values()]
      .filter((m) => m.text || c.board_drawings !== false)
      .sort((x, y) => (y.pinned ? 1 : 0) - (x.pinned ? 1 : 0) || String(y.created).localeCompare(String(x.created)))
      .slice(0, num(c.board_count, 8));
    return notes.map((m) => ({
      pre: m.recipient_name ? `${m.sender_name || ""} → ${m.recipient_name}` : m.sender_name || "",
      text: m.text || this._t("drawing"),
      icon: m.pinned ? "mdi:pin" : "mdi:note-text-outline",
      tag: this._t("tag_board"),
    }));
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
      if (Array.isArray(list)) list.forEach((m) => {
        const n = norm(m);
        if (n) items.push({ ...n, dismiss: entityId === DEFAULT_ENTITY ? m.id : null, key: m.id ? `msg:${m.id}` : undefined });
      });
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
    const c = this._config;
    const build = {
      messages: () => this._messageItems(), alerts: () => this._alertItems(), weather: () => this._weatherItems(),
      news: () => this._newsItems(), sports: () => this._sportsItems(), calendar: () => this._calendarItems(),
      countdown: () => this._countdownItems(), todo: () => this._todoItems(), board: () => this._boardItems(),
      people: () => this._peopleItems(), travel: () => this._travelItems(), sun: () => this._sunItems(),
      date: () => this._dateItems(), entities: () => this._entityItems(),
    };
    let order = this._sources();
    if (order.includes("alerts")) order = ["alerts", ...order.filter((x) => x !== "alerts")]; // alerts always lead
    return order.flatMap((src) => {
      let list;
      try { list = build[src](); } catch (e) { list = []; }
      const color = c[`${src}_color`] || (src === "alerts" ? ALERT_RGB : null);
      return list.map((it) => ({ ...it, src, color: it.color || color || undefined }));
    });
  }

  _itemHTML(m, i) {
    const c = this._config;
    const color = m.color ? toRGB(m.color, null) : m.urgent ? ALERT_RGB : null;
    const style = color ? ` style="--item-color: rgb(${rgb(color)}); --tag-rgb: ${rgb(color)}"` : "";
    const icon = c.show_icons && m.icon ? `<ha-icon icon="${esc(m.icon)}"></ha-icon>` : "";
    const name = m.name ? `<span class="name">${esc(m.name)}:</span>` : "";
    const tagText = m.urgent && !m.tag ? this._t("tag_urgent") : m.tag;
    const tag = tagText && c.show_tags !== false ? `<span class="tag">${esc(tagText)}</span>` : "";
    const pre = m.pre ? `<span class="pre">${esc(m.pre)}</span>` : "";
    const sub = m.sub ? `<span class="sub">${esc(m.sub)}</span>` : "";
    const attrs = `${m.link && c.open_links !== false ? " data-link" : ""}${m.dismiss && c.dismiss_on_tap ? " data-dismiss" : ""}`;
    return `<span class="item${m.urgent ? " urgent" : ""}" data-i="${i}"${attrs}${style}>${tag}${icon}${name}${pre}<span class="text">${esc(m.text)}</span>${sub}</span>`;
  }

  _update() {
    if (!this._config || !this._track) return;
    const items = this._collect();
    const sig = JSON.stringify(items);
    if (sig === this._sig) return;
    this._sig = sig;
    this._items = items;

    const c = this._config;
    if (!items.length && c.hide_when_empty) this.setAttribute("hidden-empty", "");
    else this.removeAttribute("hidden-empty");
    this._checkUrgent();

    if (!items.length) {
      if (this._anim) { this._anim.cancel(); this._anim = null; }
      this._flipRun = null;
      this._track.className = "track";
      this._track.style.transform = "none";
      this._track.innerHTML = `<div class="empty">${esc(c.empty_text || this._t("no_messages"))}</div>`;
      return;
    }

    if (c.mode === "flip") {
      this._track.className = "track flip";
      this._track.innerHTML = items.map((m, i) => `<div class="slide">${this._itemHTML(m, i)}</div>`).join("");
      this._startFlip();
      return;
    }
    this._flipRun = null;
    this._track.className = "track";
    const sep = c.separator ? `<span class="sep">${esc(c.separator)}</span>` : "";
    this._groupHTML = items.map((m, i) => this._itemHTML(m, i) + sep).join("");
    this._track.innerHTML = `<div class="group">${this._groupHTML}</div>`;
    this._scheduleMeasure();
  }

  /* ----- urgent items: take over the bar for a few seconds, then join the scroll ----- */
  _checkUrgent() {
    const c = this._config;
    const repeatMs = num(c.urgent_repeat, 0) * 60000;
    const now = Date.now();
    this._urgentSeen = this._urgentSeen || new Map();
    const urgent = (this._items || []).filter((m) => m.urgent);
    const live = new Set(urgent.map((m) => m.key || m.text));
    for (const k of [...this._urgentSeen.keys()]) if (!live.has(k)) this._urgentSeen.delete(k); // gone: show again if it returns
    this._urgentQueue = this._urgentQueue || [];
    for (const m of urgent) {
      const k = m.key || m.text;
      const last = this._urgentSeen.get(k);
      if (last === undefined || (repeatMs && now - last >= repeatMs)) {
        this._urgentSeen.set(k, now);
        if (!this._urgentQueue.some((q) => (q.key || q.text) === k)) this._urgentQueue.push(m);
      }
    }
    clearInterval(this._urgentTimer);
    this._urgentTimer = repeatMs && urgent.length && this.isConnected ? setInterval(() => this._checkUrgent(), 30000) : null;
    if (!this._urgentShowing) this._nextUrgent();
  }

  _nextUrgent() {
    const m = this._urgentQueue && this._urgentQueue.shift();
    if (!m || !this._banner) { this._urgentShowing = false; return; }
    this._urgentShowing = true;
    this._banner.querySelector(".ub-text").textContent = [m.pre, m.text].filter(Boolean).join(" · ");
    this._banner.querySelector("ha-icon").setAttribute("icon", m.icon || "mdi:alert");
    this._banner.classList.add("show");
    this._holdForUrgent(true);
    clearTimeout(this._urgentHide);
    this._urgentHide = setTimeout(() => this._hideUrgent(), num(this._config.urgent_seconds, 8) * 1000);
  }

  _hideUrgent() {
    clearTimeout(this._urgentHide);
    if (this._banner) this._banner.classList.remove("show");
    this._holdForUrgent(false);
    this._urgentShowing = false;
    setTimeout(() => { if (!this._urgentShowing) this._nextUrgent(); }, 400);
  }

  _holdForUrgent(on) {
    this._urgentHold = on;
    if (this._anim) { if (on) this._anim.pause(); else if (!this._paused) this._anim.play(); }
  }

  /* ----- flip mode: one item at a time, long ones glide across ----- */
  async _startFlip() {
    const run = {};
    this._flipRun = run;
    const c = this._config;
    const slides = [...this._track.querySelectorAll(".slide")];
    if (!slides.length) return;
    const wait = async (ms) => {
      let left = ms;
      while (left > 0) {
        await new Promise((r) => setTimeout(r, 100));
        if (this._flipRun !== run) throw new Error("stopped");
        if (!this._paused && !this._urgentHold) left -= 100;
      }
    };
    const slideFx = c.flip_effect === "slide";
    const inFx = slideFx ? [{ opacity: 0, transform: "translateY(60%)" }, { opacity: 1, transform: "translateY(0)" }] : [{ opacity: 0 }, { opacity: 1 }];
    const outFx = slideFx ? [{ opacity: 1, transform: "translateY(0)" }, { opacity: 0, transform: "translateY(-60%)" }] : [{ opacity: 1 }, { opacity: 0 }];
    let i = Math.min(this._flipIndex || 0, slides.length - 1);
    try {
      for (;;) {
        const slide = slides[i];
        const item = slide.querySelector(".item");
        const overflow = Math.max(0, item.scrollWidth - (slide.clientWidth - 44));
        slide.classList.toggle("fits", overflow === 0);
        item.style.transform = "translateX(0)";
        slide.animate(inFx, { duration: 450, easing: "ease-out", fill: "forwards" });
        if (overflow > 0) {
          await wait(1500);
          const speed = Math.max(5, num(c.speed, 70));
          const glide = item.animate([{ transform: "translateX(0)" }, { transform: `translateX(${-overflow}px)` }],
            { duration: (overflow / speed) * 1000, easing: "linear", fill: "forwards" });
          this._anim = glide;
          if (this._paused || this._urgentHold) glide.pause();
          await glide.finished.catch(() => {});
          this._anim = null;
          if (this._flipRun !== run) return;
          await wait(1500);
        } else {
          await wait(num(c.flip_seconds, 5) * 1000);
        }
        if (slides.length === 1) { await wait(60000); continue; }
        slide.animate(outFx, { duration: 400, easing: "ease-in", fill: "forwards" });
        await wait(350);
        i = (i + 1) % slides.length;
        this._flipIndex = i;
      }
    } catch (e) { /* replaced by a newer run */ }
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
    if (this._config.mode === "flip") return;
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
    if (this._paused || this._urgentHold || (reduce && this._config.respect_reduced_motion !== false)) this._anim.pause();
  }

  _setPaused(p) {
    this._paused = p;
    if (!this._anim) return;
    if (p) this._anim.pause();
    else if (!this._urgentHold) this._anim.play();
  }
}

/* ---------- visual editor ---------- */
const THEME_LABELS = { mono: "Monochrome" };
const PRO_THEMES = ["slate", "graphite", "navy", "harbor", "evergreen", "sage", "burgundy", "copper", "plum", "sand", "arctic", "mono"];
const COLOR_KEYS = ["tint_color", "text_color", "accent_color", "border_color", "glow_color"];
const FONT_OPTIONS = Object.entries(FONTS).map(([value, f]) => ({ value, label: f.label }));

function buildSchema(c, lang, hass) {
  const t = (k, v) => tr(lang, k, v);
  const plain = c.style === "plain";
  const src = Array.isArray(c.sources) && c.sources.length ? c.sources : DEFAULT_SOURCES;
  const has = (k) => src.includes(k);
  const box = (min, max, unit) => ({ number: { min, max, step: 1, mode: "box", ...(unit ? { unit_of_measurement: unit } : {}) } });
  const opts = (pairs) => pairs.map(([value, label]) => ({ value, label }));
  const themeOptions = Object.keys(THEMES).map((k) => ({
    value: k,
    label: (THEME_LABELS[k] || k[0].toUpperCase() + k.slice(1)) + (PRO_THEMES.includes(k) ? ` · ${t("professional")}` : ""),
  }));
  // News topics: the built-in ones, plus the keyword topics turned on in the integration.
  const cats = (hass && hass.states[NEWS_ENTITY] && hass.states[NEWS_ENTITY].attributes.categories) || {};
  const topicOptions = NEWS_TOPIC_KEYS.map((k) => ({ value: k, label: t("t_" + k) }))
    .concat(Object.entries(cats).filter(([k]) => k.startsWith("kw:")).map(([value, label]) => ({ value, label })));

  const showFields = [
    { name: "sources", selector: { select: { multiple: true, mode: "list", options: SOURCE_KEYS.map((k) => ({ value: k, label: t("src_" + k) })) } } },
    ...(has("messages") ? [
      { name: "entity", selector: { entity: { domain: "sensor" } } },
      { name: "messages_text", selector: { text: { multiline: true } } },
    ] : []),
    ...(has("alerts") ? [
      { name: "alerts_entities", selector: { entity: { multiple: true } } },
      { name: "alerts_urgent", selector: { boolean: {} } },
    ] : []),
    ...(has("weather") ? [{ type: "grid", name: "", schema: [
      { name: "weather_entity", selector: { entity: { domain: "weather" } } },
      { name: "weather_tomorrow", selector: { boolean: {} } },
    ] }] : []),
    ...(has("news") ? [
      { name: "news_topics", selector: { select: { multiple: true, mode: "dropdown", options: topicOptions } } },
      { type: "grid", name: "", schema: [
        { name: "news_count", selector: box(1, 40) },
        { name: "news_source", selector: { boolean: {} } },
      ] },
    ] : []),
    ...(has("sports") ? [
      { name: "sports_leagues", selector: { select: { multiple: true, mode: "dropdown", options: Object.entries(LEAGUES).map(([value, l]) => ({ value, label: l[0] })) } } },
      { name: "sports_count", selector: box(1, 30) },
    ] : []),
    ...(has("calendar") ? [
      { name: "calendar_entities", selector: { entity: { domain: "calendar", multiple: true } } },
      { type: "grid", name: "", schema: [
        { name: "calendar_count", selector: box(1, 20) },
        { name: "calendar_hours", selector: box(1, 168, "h") },
      ] },
    ] : []),
    ...(has("countdown") ? [
      { name: "countdowns_text", selector: { text: { multiline: true } } },
      { name: "countdown_calendars", selector: { entity: { domain: "calendar", multiple: true } } },
      { name: "countdown_days", selector: box(1, 366) },
    ] : []),
    ...(has("todo") ? [
      { name: "todo_entities", selector: { entity: { domain: "todo", multiple: true } } },
      { name: "todo_count", selector: box(1, 20) },
    ] : []),
    ...(has("board") ? [{ type: "grid", name: "", schema: [
      { name: "board_count", selector: box(1, 30) },
      { name: "board_drawings", selector: { boolean: {} } },
    ] }] : []),
    ...(has("people") ? [{ name: "people_entities", selector: { entity: { domain: "person", multiple: true } } }] : []),
    ...(has("travel") ? [{ name: "travel_entities", selector: { entity: { domain: "sensor", multiple: true } } }] : []),
    ...(has("entities") ? [{ name: "entities", selector: { entity: { multiple: true } } }] : []),
    { name: "show_tags", selector: { boolean: {} } },
  ];

  const colorFields = plain
    ? [
        { name: "tint_color", selector: { color_rgb: {} } },
        { name: "tint_opacity", selector: { number: { min: 0, max: 1, step: 0.01, mode: "slider" } } },
        { name: "text_color", selector: { color_rgb: {} } },
        { name: "accent_color", selector: { color_rgb: {} } },
        { name: "border_color", selector: { color_rgb: {} } },
        { name: "border_width", selector: box(0, 8, "px") },
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
    ...(c.font_family === "custom" ? [
      { name: "font_family_custom", selector: { text: {} } },
      { name: "load_web_font", selector: { boolean: {} } },
    ] : []),
    { type: "grid", name: "", schema: [
      { name: "font_size", selector: box(10, 72, "px") },
      { name: "font_weight", selector: { select: { mode: "dropdown", options: ["300", "400", "500", "600", "700", "800"] } } },
      { name: "uppercase", selector: { boolean: {} } },
    ] },
  ];

  const flip = c.mode === "flip";
  const behaviorFields = [
    { type: "grid", name: "", schema: [
      { name: "mode", selector: { select: { mode: "dropdown", options: opts([["scroll", t("mode_scroll")], ["flip", t("mode_flip")]]) } } },
      ...(flip ? [
        { name: "flip_seconds", selector: box(2, 60, t("sec")) },
        { name: "flip_effect", selector: { select: { mode: "dropdown", options: opts([["fade", t("fx_fade")], ["slide", t("fx_slide")]]) } } },
      ] : []),
      { name: "urgent_seconds", selector: box(2, 60, t("sec")) },
      { name: "urgent_repeat", selector: box(0, 240, t("min")) },
    ] },
    { type: "grid", name: "", schema: [
      { name: "open_links", selector: { boolean: {} } },
      { name: "dismiss_on_tap", selector: { boolean: {} } },
      { name: "tap_to_pause", selector: { boolean: {} } },
      { name: "pause_on_hover", selector: { boolean: {} } },
    ] },
  ];

  return [
    { name: "title", selector: { text: {} } },
    { name: "title_icon", selector: { icon: {} } },
    { type: "expandable", flatten: true, expanded: true, name: "show", title: t("sec_show"), icon: "mdi:format-list-bulleted", schema: showFields },
    {
      type: "grid", name: "", schema: [
        { name: "speed", selector: { number: { min: 10, max: 300, step: 5, mode: "slider", unit_of_measurement: "px/s" } } },
        { name: "direction", selector: { select: { mode: "dropdown", options: opts([["left", t("dir_left")], ["right", t("dir_right")]]) } } },
      ],
    },
    {
      type: "grid", name: "", schema: [
        { name: "style", selector: { select: { mode: "dropdown", options: opts([["glass", t("style_glass")], ["plain", t("style_plain")]]) } } },
        { name: "theme", selector: { select: { mode: "dropdown", options: themeOptions } } },
      ],
    },
    { type: "expandable", flatten: true, name: "colors", title: plain ? t("sec_colors") : t("sec_glass"), icon: "mdi:palette",
      schema: [{ type: "grid", name: "", schema: colorFields }] },
    { type: "expandable", flatten: true, name: "catcolors", title: t("sec_cat"), icon: "mdi:palette-swatch-variant",
      schema: [{ type: "grid", name: "", schema: src.map((k) => ({ name: `${k}_color`, selector: { color_rgb: {} } })) }] },
    { type: "expandable", flatten: true, name: "font", title: t("sec_font"), icon: "mdi:format-font", schema: fontFields },
    { type: "expandable", flatten: true, name: "behavior", title: t("sec_behavior"), icon: "mdi:gesture-tap", schema: behaviorFields },
    {
      type: "expandable", flatten: true, name: "layout", title: t("sec_layout"), icon: "mdi:page-layout-header", schema: [
        { type: "grid", name: "", schema: [
          { name: "position", selector: { select: { mode: "dropdown", options: opts([["inline", t("pos_inline")], ["top", t("pos_top")], ["bottom", t("pos_bottom")]]) } } },
          { name: "offset", selector: box(0, 80, "px") },
          ...(c.position === "top" || c.position === "bottom" ? [{ name: "reserve_space", selector: { boolean: {} } }] : []),
          { name: "height", selector: { number: { min: 28, max: 160, step: 2, mode: "box", unit_of_measurement: "px" } } },
          { name: "border_radius", selector: box(0, 80, "px") },
          { name: "gap", selector: { number: { min: 0, max: 200, step: 2, mode: "box", unit_of_measurement: "px" } } },
          { name: "separator", selector: { text: {} } },
          { name: "opacity", selector: { number: { min: 0.1, max: 1, step: 0.05, mode: "slider" } } },
        ] },
        { type: "grid", name: "", schema: [
          { name: "fade_edges", selector: { boolean: {} } },
          { name: "show_icons", selector: { boolean: {} } },
          { name: "hide_when_empty", selector: { boolean: {} } },
        ] },
      ],
    },
  ];
}

// "Christmas: 12-25" lines <-> [{ name, date }]
function parseCountdowns(text) {
  return String(text || "").split("\n").map((l) => l.trim()).filter(Boolean).flatMap((line) => {
    const m = line.match(/^(.*?)[\s:=,–-]+\s*((?:\d{4}-)?\d{1,2}-\d{1,2})\s*$/);
    return m && m[1].trim() ? [{ name: m[1].trim(), date: m[2] }] : [];
  });
}
const countdownsText = (list) => (Array.isArray(list) ? list : []).map((c) => `${c.name}: ${c.date}`).join("\n");

class GrandMarqueeEditor extends HTMLElement {
  setConfig(config) {
    this._config = { ...config };
    this._render();
  }
  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    if (this._form) this._form.hass = hass;
    if (first && this._config) this._render(); // labels in the user's language, keyword topics
  }

  _lang() {
    const h = this._hass;
    return (h && ((h.locale && h.locale.language) || h.language)) || navigator.language || "en";
  }

  _formData() {
    const c = { ...DEFAULTS, ...this._config };
    const theme = THEMES[c.theme] || THEMES.frost;
    const data = { ...c };
    data.messages_text = (c.messages || []).map((m) => (typeof m === "string" ? m : m.text)).join("\n");
    data.entities = (c.entities || []).map((e) => (typeof e === "string" ? e : e.entity));
    data.countdowns_text = countdownsText(c.countdowns);
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
    for (const k of SOURCE_KEYS) data[`${k}_color`] = toRGB(c[`${k}_color`], k === "alerts" ? ALERT_RGB : theme.accent);
    const defaults = {
      weather_tomorrow: false, news_count: 8, news_source: true, calendar_count: 6, calendar_hours: 24, todo_count: 5,
      show_tags: true, sports_count: 8, countdown_days: 90, board_count: 8, board_drawings: true, alerts_urgent: true,
      tap_to_pause: true, opacity: 1,
    };
    for (const [k, v] of Object.entries(defaults)) if (data[k] === undefined) data[k] = v;
    return data;
  }

  _render() {
    if (!this._form) {
      this._form = document.createElement("ha-form");
      this._form.addEventListener("value-changed", (ev) => this._changed(ev.detail.value));
      this.appendChild(this._form);
    }
    const lang = this._lang();
    this._form.computeLabel = (sch) => {
      if (/_color$/.test(sch.name) && SOURCE_KEYS.includes(sch.name.slice(0, -6))) return tr(lang, "src_" + sch.name.slice(0, -6));
      if (sch.name === "tint_color" && this._config.style === "plain") return tr(lang, "tint_color_plain");
      return tr(lang, sch.name);
    };
    this._form.hass = this._hass;
    this._form.schema = buildSchema({ ...DEFAULTS, ...this._config }, lang, this._hass);
    this._form.data = this._formData();
  }

  _changed(value) {
    const prev = this._config;
    const prevData = this._formData();
    const next = { ...prev };
    const special = ["messages_text", "entities", "countdowns_text"];

    for (const [k, v] of Object.entries(value)) {
      if (special.includes(k)) continue;
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
    if (value.countdowns_text !== undefined && value.countdowns_text !== prevData.countdowns_text) {
      const list = parseCountdowns(value.countdowns_text);
      if (list.length) next.countdowns = list; else delete next.countdowns;
    }
    if (JSON.stringify(value.entities || []) !== JSON.stringify(prevData.entities)) {
      const old = prev.entities || [];
      next.entities = (value.entities || []).map((id) => old.find((e) => (typeof e === "string" ? e : e.entity) === id) || id);
      if (!next.entities.length) delete next.entities;
    }
    if (next.entity === "" || next.entity === undefined) delete next.entity;
    for (const k of ["news_topics", "calendar_entities", "todo_entities", "sports_leagues", "countdown_calendars", "alerts_entities", "people_entities", "travel_entities"]) {
      if (Array.isArray(next[k]) && !next[k].length) delete next[k];
    }
    if (!next.weather_entity) delete next.weather_entity;

    this._config = next;
    this._render();
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
    description: "Smooth scrolling ticker: messages, weather, news, sports, calendar and more, in glass or plain styles.",
    preview: true,
    documentationURL: "https://github.com/Degederon/grand-marquee",
  });
}

console.info(`%c GRAND-MARQUEE %c ${GM_VERSION} `, "background:#7dd3fc;color:#0f172a;border-radius:4px 0 0 4px;padding:2px 4px;font-weight:700", "background:#0f172a;color:#7dd3fc;border-radius:0 4px 4px 0;padding:2px 4px");
