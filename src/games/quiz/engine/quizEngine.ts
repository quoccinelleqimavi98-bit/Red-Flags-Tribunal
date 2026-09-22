import { QUESTIONS } from "../data/questions";
import { SIP_EVENTS, SipEventTemplate } from "../data/sipEvents";
import { DIFFICULTY_POINTS, QuizConfig, QuizQuestion } from "../types";

/** Fisher-Yates : mélange non-biaisé, réutilisé pour questions, choix et joueurs. */
export function shuffle<T>(input: T[]): T[] {
  const array = [...input];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/** Pioche `count` questions uniques parmi les thèmes sélectionnés, mélangées. */
export function pickQuestions(config: QuizConfig): QuizQuestion[] {
  const pool = QUESTIONS.filter((q) => config.themes.includes(q.theme));
  const shuffled = shuffle(pool);
  return shuffled.slice(0, Math.min(config.questionCount, shuffled.length));
}

/** Mélange les 4 choix d'une question pour que la bonne réponse ne soit jamais au même endroit. */
export function shuffleChoices(question: QuizQuestion): string[] {
  return shuffle(question.choices);
}

/**
 * Calcule les points d'une question selon sa difficulté. L'utilisation d'un
 * indice divise le barème par deux (arrondi à l'entier inférieur), et le
 * mode "au plus rapide" ajoute un bonus de vitesse proportionnel au temps
 * restant (jusqu'à +50% des points de base).
 */
export function computePoints(
  question: QuizQuestion,
  options: { usedHint: boolean; speedFraction?: number }
): number {
  const base = DIFFICULTY_POINTS[question.difficulty];
  const afterHint = options.usedHint ? Math.floor(base / 2) : base;
  if (!options.speedFraction) return afterHint;
  const speedBonus = Math.round(afterHint * 0.5 * options.speedFraction);
  return afterHint + speedBonus;
}

const SIP_EVENT_PROBABILITY = 0.35;

/** Tire un événement surprise (gorgées/gage) avec une probabilité fixe, ou null. */
export function rollSipEvent(): SipEventTemplate | null {
  if (Math.random() > SIP_EVENT_PROBABILITY) return null;
  const pool = SIP_EVENTS;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function nextPlayerIndex(current: number, playerCount: number): number {
  return (current + 1) % playerCount;
}
