import { shuffle } from "@core/utils/shuffle";
import { SITUATIONS } from "../data/situations";
import { RedFlagConfig, RedFlagSituation } from "../types";

/** Pioche toutes les situations du sous-thème choisi, mélangées aléatoirement. */
export function pickSituations(config: RedFlagConfig): RedFlagSituation[] {
  const pool = SITUATIONS.filter((s) => s.subthemeId === config.subthemeId);
  return shuffle(pool);
}
