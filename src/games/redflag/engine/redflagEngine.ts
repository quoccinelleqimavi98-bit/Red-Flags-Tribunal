import { shuffle } from "@core/utils/shuffle";
import { SITUATIONS } from "../data/situations";
import { MOST_LIKELY_PROMPTS } from "../data/mostLikelyPrompts";
import { DEFENSE_CASES } from "../data/defenseCases";
import {
  RedFlagConfig,
  RedFlagMode,
  RedFlagSituation,
  RedFlagSubMode,
} from "../types";

/**
 * Banque de cartes source pour un mode donné : "Ce Serait Qui" pioche dans
 * les prompts "la personne la plus susceptible de...", "Le Procès" pioche
 * dans les cas à défendre à la 2e personne, les autres modes (Qui l'a déjà
 * vécu ?, Le Verdict) piochent dans les situations red flag classiques.
 * "Mode Surprise" n'a pas de banque propre : il pioche à la volée dans
 * celle du sous-mode tiré au sort pour chaque carte (voir `pickMixCards`).
 */
export function getCardBank(mode: RedFlagMode): RedFlagSituation[] {
  if (mode === "whoismostlikely") return MOST_LIKELY_PROMPTS;
  if (mode === "trial") return DEFENSE_CASES;
  if (mode === "mix") return [];
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

const SUB_MODES: RedFlagSubMode[] = ["chill", "verdict", "trial", "whoismostlikely"];
/** Taille d'une salve de cartes consécutives tirées dans le même sous-mode,
 * pour garder une mécanique cohérente sur un court instant de jeu. */
const MIX_BLOCK_SIZES = [2, 3];

/** Carte annotée du sous-mode dont elle provient (toujours un des 4 modes
 * classiques, jamais "mix" lui-même). */
export interface PlayCard {
  card: RedFlagSituation;
  subMode: RedFlagSubMode;
}

export interface PickPlayCardsResult {
  cards: PlayCard[];
  seenIds: string[];
}

/** Tire une séquence de sous-modes de longueur `total`, par salves de 2-3
 * cartes du même sous-mode, sans jamais répéter le sous-mode de la salve
 * précédente (pour que le changement de règles soit toujours net). */
function buildMixRoundPlan(total: number): RedFlagSubMode[] {
  const plan: RedFlagSubMode[] = [];
  let lastMode: RedFlagSubMode | null = null;
  while (plan.length < total) {
    const remaining = total - plan.length;
    const candidates: RedFlagSubMode[] = lastMode
      ? SUB_MODES.filter((m) => m !== lastMode)
      : SUB_MODES;
    const nextMode: RedFlagSubMode =
      candidates[Math.floor(Math.random() * candidates.length)];
    const blockSize = Math.min(
      remaining,
      MIX_BLOCK_SIZES[Math.floor(Math.random() * MIX_BLOCK_SIZES.length)]
    );
    for (let i = 0; i < blockSize; i++) plan.push(nextMode);
    lastMode = nextMode;
  }
  return plan;
}

/**
 * Pioche jusqu'à `MAX_CARDS_PER_GAME` cartes pour "Mode Surprise" : une
 * séquence de sous-modes est tirée par salves (`buildMixRoundPlan`), puis
 * chaque carte est piochée au dernier moment dans la banque du sous-mode
 * correspondant pour ce sous-thème, en excluant à chaque tirage toutes les
 * cartes déjà servies cette partie (`usedThisGame`) — un seul set partagé
 * entre tous les sous-modes, et non un par sous-mode : "Qui l'a déjà
 * vécu ?" et "Le Verdict" piochent tous les deux dans `situations.ts`, donc
 * piocher au fur et à mesure (plutôt que pré-tirer une file par sous-mode)
 * évite qu'une même situation ressorte deux fois dans la partie sous deux
 * mécaniques différentes.
 */
export function pickMixCards(
  config: RedFlagConfig,
  previouslySeenIds: string[] = []
): PickPlayCardsResult {
  const plan = buildMixRoundPlan(MAX_CARDS_PER_GAME);
  const seenSet = new Set(previouslySeenIds);
  const usedThisGame = new Set<string>();

  const cards: PlayCard[] = [];
  for (const subMode of plan) {
    const pool = getCardBank(subMode).filter(
      (s) => s.subthemeId === config.subthemeId
    );
    let available = pool.filter(
      (s) => !seenSet.has(s.id) && !usedThisGame.has(s.id)
    );
    if (available.length === 0 && pool.length > 0) {
      // Cycle épuisé pour ce sous-mode : on retente en ignorant seulement
      // l'historique des parties précédentes, jamais les cartes de CETTE
      // partie (sans quoi on pourrait répéter dans le même tirage).
      available = pool.filter((s) => !usedThisGame.has(s.id));
    }
    if (available.length === 0) continue;
    const picked = available[Math.floor(Math.random() * available.length)];
    usedThisGame.add(picked.id);
    cards.push({ card: picked, subMode });
  }

  return { cards, seenIds: [...previouslySeenIds, ...cards.map((c) => c.card.id)] };
}

/**
 * Point d'entrée unique du dispatcher `PlayScreen` : pioche les cartes du
 * mode choisi et les annote systématiquement avec leur sous-mode, que ce
 * soit le mode lui-même (cas classique) ou le sous-mode tiré au sort pour
 * chaque carte (mode "mix").
 */
export function pickPlayCards(
  config: RedFlagConfig,
  previouslySeenIds: string[] = []
): PickPlayCardsResult {
  if (config.mode === "mix") return pickMixCards(config, previouslySeenIds);
  const { cards, seenIds } = pickCards(config, previouslySeenIds);
  return {
    cards: cards.map((card) => ({ card, subMode: config.mode as RedFlagSubMode })),
    seenIds,
  };
}
