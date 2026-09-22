import { RedFlagCategory, RedFlagMode } from "@games/redflag/types";

export type PlayerSetupMode = "onboarding" | "manage";

export type RootStackParamList = {
  Home: undefined;
  PlayerSetup: { mode: PlayerSetupMode };
  Mode: undefined;
  Category: { mode: RedFlagMode };
  Subtheme: { mode: RedFlagMode; category: RedFlagCategory };
  Play: { mode: RedFlagMode; category: RedFlagCategory; subthemeId: string };
};
