export type SipEventKind = "bonus" | "malus" | "gage" | "distribution";

export interface SipEventTemplate {
  kind: SipEventKind;
  emoji: string;
  title: string;
  description: string;
  /** Quantité de gorgées associée (0 pour un pur gage sans gorgées). */
  amount: number;
}

/**
 * Banque d'événements surprise "ambiance soirée". Le moteur en tire un au
 * hasard selon une probabilité par question ; libre à un futur patch d'en
 * ajouter d'autres pour renouveler l'ambiance.
 */
export const SIP_EVENTS: SipEventTemplate[] = [
  {
    kind: "malus",
    emoji: "🍺",
    title: "Malus surprise !",
    description: "Mauvaise pioche : bois {amount} gorgées avant la question suivante.",
    amount: 2,
  },
  {
    kind: "bonus",
    emoji: "✨",
    title: "Bonus chanceux !",
    description: "Distribue {amount} gorgées à qui tu veux, tu l'as bien mérité.",
    amount: 2,
  },
  {
    kind: "distribution",
    emoji: "🎯",
    title: "Distribution générale",
    description: "Distribue 1 gorgée à chaque autre joueur de la table.",
    amount: 1,
  },
  {
    kind: "gage",
    emoji: "🕺",
    title: "Gage : la danse du vainqueur",
    description: "Fais 10 secondes de danse improvisée, sous les yeux (et les rires) de tout le monde.",
    amount: 0,
  },
  {
    kind: "gage",
    emoji: "🎭",
    title: "Gage : l'accent mystère",
    description: "Répond à la prochaine question avec un accent au choix du groupe.",
    amount: 0,
  },
  {
    kind: "malus",
    emoji: "😅",
    title: "Cul sec partiel",
    description: "Bois {amount} gorgées, cadeau de la maison.",
    amount: 3,
  },
  {
    kind: "gage",
    emoji: "🤐",
    title: "Gage : silence radio",
    description: "Tu ne peux plus parler jusqu'à la prochaine question, seulement mimer.",
    amount: 0,
  },
  {
    kind: "bonus",
    emoji: "🛡️",
    title: "Bouclier",
    description: "Tu es protégé : si tu te trompes à la prochaine question, tu ne bois rien.",
    amount: 0,
  },
];

export function formatSipDescription(
  template: SipEventTemplate
): string {
  return template.description.replace("{amount}", String(template.amount));
}
