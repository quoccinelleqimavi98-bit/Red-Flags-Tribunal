import { colors } from "@core/theme";

export type QuizTheme =
  | "Manga"
  | "Jeux Vidéo"
  | "Séries"
  | "Films"
  | "Musique"
  | "Culture Générale";

export type QuizDifficulty = "facile" | "moyen" | "difficile";
export type QuizMode = "tour_par_tour" | "au_plus_rapide";

export interface QuizQuestion {
  id: string;
  theme: QuizTheme;
  difficulty: QuizDifficulty;
  question: string;
  choices: [string, string, string, string];
  answer: string;
  hint: string;
  funFact: string;
}

export interface QuizConfig {
  themes: QuizTheme[];
  questionCount: number;
  mode: QuizMode;
  withChoices: boolean;
}

export const DIFFICULTY_POINTS: Record<QuizDifficulty, number> = {
  facile: 10,
  moyen: 20,
  difficile: 30,
};

export const THEME_COLORS: Record<QuizTheme, string> = {
  Manga: colors.themeManga,
  "Jeux Vidéo": colors.themeGaming,
  Séries: colors.themeSeries,
  Films: colors.themeFilms,
  Musique: colors.themeMusique,
  "Culture Générale": colors.themeCultureG,
};

export const ALL_THEMES: QuizTheme[] = [
  "Manga",
  "Jeux Vidéo",
  "Séries",
  "Films",
  "Musique",
  "Culture Générale",
];
