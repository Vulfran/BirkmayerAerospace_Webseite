// ─── Zentrale Settings ───────────────────────────────────────────
// Alle wichtigen Konfigurationswerte an einem Ort.
// Änderungen hier wirken sich automatisch auf die gesamte Website aus.

// ── Farben ──────────────────────────────────────────────────────
export const colors = {
  /** Hauptfarbe (Dunkelblau) – Kacheln, Buttons, Akzente */
  brandPrimary: "#1E2656",
  /** Hover-Variante der Hauptfarbe */
  brandPrimaryHover: "#2a3470",
} as const;

// ── Timing / Animationen ────────────────────────────────────────
export const timing = {
  /** Referenz-Karussell: Verweildauer pro Folie in ms */
  testimonialInterval: 7500,
  /** Scroll-to-Anchor Verzögerung nach Content-Load (ms) */
  scrollToAnchorDelay: 300,
  /** Headings-Extraktion Verzögerung nach Render (ms) */
  headingExtractionDelay: 400,
} as const;

// ── Layout ──────────────────────────────────────────────────────
export const layout = {
  /** Scroll-Offset für fixierten Header (px, negativer Wert) */
  scrollOffset: -100,
  /** IntersectionObserver rootMargin für Scroll-Spy */
  scrollSpyRootMargin: "-80px 0px -60% 0px",
} as const;

// ── Externe Links ───────────────────────────────────────────────
export const links = {
  linkedin: "https://www.linkedin.com/in/wolfram-birkmayer/",
  ddim: "https://www.ddim.de/",
  web3formsEndpoint: "https://api.web3forms.com/submit",
} as const;

// ── API-Keys ────────────────────────────────────────────────────
// Web3Forms Access Key ist ein öffentlicher Formular-Key (kein Secret).
// Bei GitHub Pages (statischer Build) ist er ohnehin im JS-Bundle sichtbar.
export const apiKeys = {
  web3forms: "d897459d-964b-4055-b327-94f5d17f8cd5",
} as const;

// ── Bilder (relativ zu BASE_URL) ────────────────────────────────
export const images = {
  headerLogo: "logo3_Birkmayer_white_Slogan.png",
  footerLogo: "logo_merch1.png",
  ddimBadge: "ddim_mitglied.png",
  heroBackground: "955_Birkmayer_Hand-auf-Schulter_Landscape_comp.png",
  quoteBackground: "763_Birkmayer_Treppe_sitzend_Zitat_comp.png",
  carouselBackground: "Hintergrund_weiss.png",
} as const;

// ── Firmeninfo ──────────────────────────────────────────────────
export const company = {
  name: "Birkmayer Aerospace",
} as const;
