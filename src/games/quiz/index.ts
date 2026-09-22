import { registerGame } from "@core/games/registry";
import { QuizConfigScreen } from "./screens/QuizConfigScreen";
import { QuizPlayScreen } from "./screens/QuizPlayScreen";
import { QuizConfig } from "./types";

registerGame<QuizConfig>({
  id: "quiz",
  name: "Le Quiz Ultime",
  emoji: "🧠",
  tagline: "Pop culture, culture G... et quelques gorgées.",
  description:
    "Un quiz à thèmes avec difficulté variable, indices, et ambiance soirée garantie.",
  color: "#ff2d95",
  minPlayers: 2,
  variantCount: 6,
  ConfigScreen: QuizConfigScreen,
  PlayScreen: QuizPlayScreen,
});
