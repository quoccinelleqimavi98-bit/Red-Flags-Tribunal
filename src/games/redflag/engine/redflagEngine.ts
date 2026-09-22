import { shuffle } from "@core/utils/shuffle";
import { Player } from "@core/types";
import { SITUATIONS } from "../data/situations";
import { MOST_LIKELY_PROMPTS } from "../data/mostLikelyPrompts";
import { RedFlagConfig, RedFlagMode, RedFlagSituation } from "../types";

/**
 * Banque de cartes source pour un mode donné : "Ce Serait Qui" pioche dans
 * les prompts "la personne la plus susceptible de...", tous les autres
 * modes piochent dans les situations red flag classiques.
 */
export function getCardBank(mode: RedFlagMode): RedFlagSituation[] {
  return mode === "whoismostlikely" ? MOST_LIKELY_PROMPTS : SITUATIONS;
}

/** Pioche toutes les cartes du sous-thème choisi, mélangées aléatoirement. */
export function pickCards(config: RedFlagConfig): RedFlagSituation[] {
  const pool = getCardBank(config.mode).filter(
    (s) => s.subthemeId === config.subthemeId
  );
  return shuffle(pool);
}

/**
 * Tire un joueur au hasard (mode "Le Procès"), en évitant si possible de
 * retirer deux fois de suite la même personne.
 */
export function drawRandomPlayer(
  players: Player[],
  excludePlayerId?: number
): Player {
  const pool =
    players.length > 1 && excludePlayerId !== undefined
      ? players.filter((p) => p.id !== excludePlayerId)
      : players;
  const source = pool.length > 0 ? pool : players;
  return source[Math.floor(Math.random() * source.length)];
}
