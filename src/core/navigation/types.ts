import { RedFlagCategory, RedFlagMode } from "@games/redflag/types";

export type PlayerSetupMode = "onboarding" | "manage";

export type RootStackParamList = {
  Home: undefined;
  PlayerSetup: { mode: PlayerSetupMode; category?: RedFlagCategory };
  Category: undefined;
  Subtheme: { category: RedFlagCategory };
  Mode: { category: RedFlagCategory; subthemeId: string };
  Play: { category: RedFlagCategory; subthemeId: string; mode: RedFlagMode };
};
