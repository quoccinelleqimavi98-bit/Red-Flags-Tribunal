import { registerGame } from "@core/games/registry";
import { colors } from "@core/theme";
import { RedFlagConfigScreen } from "./screens/RedFlagConfigScreen";
import { RedFlagPlayScreen } from "./screens/RedFlagPlayScreen";
import { RedFlagConfig } from "./types";

registerGame<RedFlagConfig>({
  id: "redflag",
  name: "Red Flag Tribunal",
  emoji: "🚩",
  tagline: "Amour, amitié : verdict sans pitié.",
  description:
    "Des situations red flag à débattre entre amis, en mode chill ou en mode vote — la minorité boit.",
  color: colors.primary,
  minPlayers: 2,
  variantCount: 9,
  ConfigScreen: RedFlagConfigScreen,
  PlayScreen: RedFlagPlayScreen,
});
