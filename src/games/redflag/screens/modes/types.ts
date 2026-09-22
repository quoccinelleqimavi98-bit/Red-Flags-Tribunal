import { Player } from "@core/types";
import { RedFlagCategoryInfo, RedFlagSituation, RedFlagSubtheme } from "../../types";

/** Props communes à tous les écrans de mode, fournies par le PlayScreen dispatcher. */
export interface ModePlayScreenProps {
  players: Player[];
  category: RedFlagCategoryInfo;
  subtheme: RedFlagSubtheme;
  cards: RedFlagSituation[];
  onReplay: () => void;
  onEnd: () => void;
}
