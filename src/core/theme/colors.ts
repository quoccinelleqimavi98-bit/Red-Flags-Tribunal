// Identité "Red Flag Tribunal" : sombre et affirmé, rouge accusateur,
// touches or et blanc cassé — féminin avec du mordant, pas de pastel.
export const colors = {
  background: "#0c0508",
  backgroundAlt: "#180810",
  surface: "#22101a",
  surfaceAlt: "#2d1522",
  border: "rgba(245, 234, 217, 0.1)",

  gradientPrimary: ["#ff2d55", "#7a0a1f"] as const,
  gradientGold: ["#f3d98a", "#c9962f"] as const,
  gradientDanger: ["#ff1a3c", "#42030f"] as const,

  primary: "#e8112d",
  secondary: "#8a0f2b",
  accent: "#d4af37",
  gold: "#d4af37",
  danger: "#c81034",
  success: "#4a8f63",

  text: "#f7ede2",
  textMuted: "rgba(247, 237, 226, 0.64)",
  textFaint: "rgba(247, 237, 226, 0.4)",

  overlay: "rgba(6, 2, 4, 0.78)",

  themeManga: "#c9184a",
  themeGaming: "#b08d57",
  themeSeries: "#7a1f3d",
  themeFilms: "#d4af37",
  themeMusique: "#9c2b3d",
  themeCultureG: "#e8c9a0",
};

export type AppColors = typeof colors;
