export type RedFlagCategory = "amour" | "amitie";
export type RedFlagMode = "chill" | "verdict";

export interface RedFlagCategoryInfo {
  id: RedFlagCategory;
  label: string;
  emoji: string;
  description: string;
}

export interface RedFlagSubtheme {
  id: string;
  category: RedFlagCategory;
  label: string;
  emoji: string;
}

export interface RedFlagSituation {
  id: string;
  category: RedFlagCategory;
  subthemeId: string;
  text: string;
}

export interface RedFlagModeInfo {
  id: RedFlagMode;
  label: string;
  emoji: string;
  description: string;
}

export interface RedFlagConfig {
  category: RedFlagCategory;
  subthemeId: string;
  mode: RedFlagMode;
}

export const CATEGORIES: RedFlagCategoryInfo[] = [
  {
    id: "amour",
    label: "Amour",
    emoji: "💔",
    description: "Les red flags qui pointent le bout de leur nez en couple.",
  },
  {
    id: "amitie",
    label: "Amitié",
    emoji: "🤝",
    description: "Les red flags entre potes, ceux qu'on préfère ignorer.",
  },
];

export const SUBTHEMES: RedFlagSubtheme[] = [
  { id: "premiers-rdv", category: "amour", label: "Premiers rendez-vous", emoji: "🍷" },
  { id: "reseaux-amour", category: "amour", label: "Réseaux sociaux", emoji: "📱" },
  { id: "ex", category: "amour", label: "Les ex", emoji: "👻" },
  { id: "belle-famille", category: "amour", label: "Famille du/de la partenaire", emoji: "🍽️" },
  { id: "intimite", category: "amour", label: "Intimité", emoji: "🔥" },
  { id: "groupe-amis", category: "amitie", label: "Groupe d'amis", emoji: "🎉" },
  { id: "coloc", category: "amitie", label: "Colocation", emoji: "🏠" },
  { id: "argent-potes", category: "amitie", label: "Argent entre potes", emoji: "💸" },
  { id: "reseaux-amitie", category: "amitie", label: "Réseaux sociaux", emoji: "📲" },
];

export const MODES: RedFlagModeInfo[] = [
  {
    id: "chill",
    label: "Qui l'a déjà vécu ?",
    emoji: "🔄",
    description:
      "Chaque situation se retourne : indiquez qui l'a déjà vécue (ou fait). Pas de vote, pas de gorgées — juste un compteur qui couronne le/la Red Flag de la soirée à la fin.",
  },
  {
    id: "verdict",
    label: "Le Verdict",
    emoji: "⚖️",
    description:
      "Vote à main levée : tout le monde vote 🚩 Red Flag ou ✅ Pas Red Flag. La minorité boit une gorgée. Sans pitié.",
  },
];
