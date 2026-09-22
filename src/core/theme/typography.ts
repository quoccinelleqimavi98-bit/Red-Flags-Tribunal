import { TextStyle } from "react-native";

/**
 * Identité typographique "Red Flag Tribunal" :
 * - Playfair Display (serif dramatique, à fort contraste) pour le grand
 *   titre de l'app — l'effet "acte d'accusation".
 * - Oswald (sans-serif condensée, capitales) pour les titres d'écran,
 *   badges et boutons — l'effet "document officiel".
 * - Police système pour le texte courant (questions, situations,
 *   descriptions), pour rester lisible sur de longs paragraphes.
 */
export const fonts = {
  display: "PlayfairDisplay_900Black",
  displayItalic: "PlayfairDisplay_700Bold_Italic",
  heading: "Oswald_600SemiBold",
  headingBold: "Oswald_700Bold",
  label: "Oswald_500Medium",
  body: "Oswald_400Regular",
};

export const typography: Record<string, TextStyle> = {
  display: {
    fontFamily: fonts.display,
    fontSize: 40,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  huge: {
    fontFamily: fonts.display,
    fontSize: 40,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: 22,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontFamily: fonts.heading,
    fontSize: 16,
    letterSpacing: 0.2,
  },
  body: {
    fontSize: 15,
    fontWeight: "500",
  },
  bodyBold: {
    fontFamily: fonts.body,
    fontSize: 15,
  },
  caption: {
    fontFamily: fonts.label,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
};
