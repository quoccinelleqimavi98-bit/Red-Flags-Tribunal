import { Player } from "@core/types";
import { PlayCard } from "../../engine/redflagEngine";
import {
  RedFlagCategoryInfo,
  RedFlagModeInfo,
  RedFlagSituation,
  RedFlagSubtheme,
} from "../../types";

/** Props communes à tous les écrans de mode, fournies par le PlayScreen dispatcher. */
export interface ModePlayScreenProps {
  mode: RedFlagModeInfo;
  players: Player[];
  category: RedFlagCategoryInfo;
  subtheme: RedFlagSubtheme;
  cards: RedFlagSituation[];
  onReplay: () => void;
  onEnd: () => void;
}

/** Props de "Mode Surprise" : chaque carte porte son propre sous-mode, tiré
 * au sort par salves (voir `pickMixCards`). */
export interface MixPlayScreenProps {
  players: Player[];
  category: RedFlagCategoryInfo;
  subtheme: RedFlagSubtheme;
  cards: PlayCard[];
  onReplay: () => void;
  onEnd: () => void;
}
