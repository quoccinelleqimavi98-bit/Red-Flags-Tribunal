// Palette "soirée" : fond profond violet/nuit, accents néon.
export const colors = {
  background: "#150a24",
  backgroundAlt: "#1f0f36",
  surface: "#26123f",
  surfaceAlt: "#301751",
  border: "rgba(255, 255, 255, 0.08)",

  gradientPrimary: ["#ff2d95", "#7b2ff7"] as const,
  gradientGold: ["#ffd76a", "#ff9a3d"] as const,
  gradientDanger: ["#ff5858", "#f857a6"] as const,

  primary: "#ff2d95",
  secondary: "#7b2ff7",
  accent: "#00e5c7",
  gold: "#ffd76a",
  danger: "#ff5858",
  success: "#3ddc84",

  text: "#f8f4ff",
  textMuted: "rgba(248, 244, 255, 0.62)",
  textFaint: "rgba(248, 244, 255, 0.4)",

  overlay: "rgba(9, 4, 18, 0.72)",

  themeManga: "#ff6ad5",
  themeGaming: "#7bffb0",
  themeSeries: "#7ab8ff",
  themeFilms: "#ffb37a",
  themeMusique: "#c58bff",
  themeCultureG: "#ffe27a",
};

export type AppColors = typeof colors;
