import { shuffle } from "@core/utils/shuffle";
import { SITUATIONS } from "../data/situations";
import { MOST_LIKELY_PROMPTS } from "../data/mostLikelyPrompts";
import { DEFENSE_CASES } from "../data/defenseCases";
import { RedFlagConfig, RedFlagMode, RedFlagSituation } from "../types";

/**
 * Banque de cartes source pour un mode donné : "Ce Serait Qui" pioche dans
 * les prompts "la personne la plus susceptible de...", "Le Procès" pioche
 * dans les cas à défendre à la 2e personne, les autres modes (Qui l'a déjà
 * vécu ?, Le Verdict) piochent dans les situations red flag classiques.
 */
export function getCardBank(mode: RedFlagMode): RedFlagSituation[] {
  if (mode === "whoismostlikely") return MOST_LIKELY_PROMPTS;
  if (mode === "trial") return DEFENSE_CASES;
  return SITUATIONS;
}

export const MAX_CARDS_PER_GAME = 10;

export interface PickCardsResult {
  cards: RedFlagSituation[];
  /** Nouvelle liste des ids déjà servis pour ce sous-thème, à mémoriser
   * pour la prochaine partie (même session). */
  seenIds: string[];
}

/**
 * Pioche jusqu'à `MAX_CARDS_PER_GAME` cartes du sous-thème choisi, en
 * évitant les cartes déjà servies (`previouslySeenIds`) tant que la banque
 * n'est pas épuisée. Une fois toutes les cartes du sous-thème vues, le
 * cycle repart de zéro (nouvelle pioche possible dans tout le sous-thème).
 */
export function pickCards(
  config: RedFlagConfig,
  previouslySeenIds: string[] = []
): PickCardsResult {
  const pool = getCardBank(config.mode).filter(
    (s) => s.subthemeId === config.subthemeId
  );
  const seenSet = new Set(previouslySeenIds);
  let unseen = pool.filter((s) => !seenSet.has(s.id));
  const cycleReset = unseen.length === 0 && pool.length > 0;
  if (cycleReset) unseen = pool;

  const cards = shuffle(unseen).slice(0, MAX_CARDS_PER_GAME);
  const seenIds = cycleReset
    ? cards.map((c) => c.id)
    : [...previouslySeenIds, ...cards.map((c) => c.id)];

  return { cards, seenIds };
}
