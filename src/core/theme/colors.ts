// Identité "Red Flag Tribunal" : rose affirmé et blanc, avec un accent
// sombre (encre plum quasi-noire) pour le texte et les éléments importants
// — mordant plutôt que pastel, malgré une base claire.
export const colors = {
  background: "#FFF7F9",
  backgroundAlt: "#FCE0EA",
  surface: "#FFFFFF",
  surfaceAlt: "#FBE4ED",
  border: "rgba(32, 8, 26, 0.2)",

  gradientPrimary: ["#F2278A", "#C4127A"] as const,
  // Accent sombre en dégradé (boutons/éléments secondaires "sérieux").
  gradientInk: ["#3A1428", "#140509"] as const,
  gradientDanger: ["#FF2D6B", "#7A0A38"] as const,
  // Fonds de carte par catégorie de situation : Amour = fuchsia vif
  // (passion, accusation), Amitié = mauve/plum sombre (plus feutré,
  // mais tout aussi affirmé — jamais pastel).
  gradientAmour: ["#F2278A", "#7A0A38"] as const,
  gradientAmitie: ["#C43D9E", "#2E0B22"] as const,

  primary: "#D1146D",
  secondary: "#8C1354",
  accent: "#D1146D",
  // Accent sombre (texte/éléments importants, bordures, état "non red flag").
  ink: "#3A1428",
  danger: "#C4127A",
  success: "#4A8F63",

  text: "#1B0714",
  textMuted: "rgba(27, 7, 20, 0.62)",
  textFaint: "rgba(27, 7, 20, 0.55)",

  // Texte clair pour les fonds vifs/sombres (dégradés, boutons pleins).
  onVivid: "#FFF3F8",

  overlay: "rgba(20, 4, 14, 0.75)",
};

export type AppColors = typeof colors;
