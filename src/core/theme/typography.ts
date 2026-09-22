import { TextStyle } from "react-native";

export const typography: Record<string, TextStyle> = {
  display: {
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "700",
  },
  body: {
    fontSize: 15,
    fontWeight: "500",
  },
  bodyBold: {
    fontSize: 15,
    fontWeight: "700",
  },
  caption: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  huge: {
    fontSize: 48,
    fontWeight: "900",
  },
};
