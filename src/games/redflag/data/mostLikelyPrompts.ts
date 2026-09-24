import { RedFlagSituation } from "../types";

/**
 * Banque de prompts pour le mode "Ce Serait Qui" — même forme que les
 * situations (RedFlagSituation), même sous-thèmes, mais formulés comme
 * des traits à désigner dans le groupe plutôt que des situations vécues.
 */
export const MOST_LIKELY_PROMPTS: RedFlagSituation[] = [
  // ---------- AMOUR — Premiers rendez-vous ----------
  {
    id: "ml-rdv-1",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "La personne la plus susceptible d'annuler un date à la dernière seconde avec une excuse à dormir debout.",
  },
  {
    id: "ml-rdv-2",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "La personne la plus susceptible de stalker le profil de son date en long, en large et en travers avant même le premier rendez-vous.",
  },
  {
    id: "ml-rdv-3",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "La personne la plus susceptible de tricher sur son âge ou sa taille sur une appli de rencontre, quitte à réécrire l'histoire.",
  },
  {
    id: "ml-rdv-4",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "La personne la plus susceptible de disparaître façon fantôme après un date qui l'a déçu·e, sans un mot d'explication.",
  },

  // ---------- AMOUR — Réseaux sociaux ----------
  {
    id: "ml-rsa-1",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "La personne la plus susceptible de stalker les réseaux de son ex à 2h du mat', en mode enquête judiciaire.",
  },
  {
    id: "ml-rsa-2",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "La personne la plus susceptible de liker une vieille photo en faisant style c'était un accident, on y croit tous.",
  },
  {
    id: "ml-rsa-3",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "La personne la plus susceptible de refaire toute sa bio Instagram dans l'heure qui suit une rupture.",
  },
  {
    id: "ml-rsa-4",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "La personne la plus susceptible d'espionner à fond le compte de la nouvelle personne de son ex, dossier complet en cours.",
  },

  // ---------- AMOUR — Les ex ----------
  {
    id: "ml-ex-1",
    category: "amour",
    subthemeId: "ex",
    text: "La personne la plus susceptible de répondre illico à un texto de son ex à 3h du mat', réflexe incontrôlable.",
  },
  {
    id: "ml-ex-2",
    category: "amour",
    subthemeId: "ex",
    text: "La personne la plus susceptible de comparer sans arrêt son/sa nouveau/nouvelle partenaire à son ex, palmarès à l'appui.",
  },
  {
    id: "ml-ex-3",
    category: "amour",
    subthemeId: "ex",
    text: "La personne la plus susceptible de rester copain-copine avec ABSOLUMENT toutes ses ex, un vrai club de fans.",
  },
  {
    id: "ml-ex-4",
    category: "amour",
    subthemeId: "ex",
    text: "La personne la plus susceptible de conserver une boîte à souvenirs entière dédiée à son ex, musée personnel inclus.",
  },

  // ---------- AMOUR — Famille du/de la partenaire ----------
  {
    id: "ml-fam-1",
    category: "amour",
    subthemeId: "belle-famille",
    text: "La personne la plus susceptible de sortir LA anecdote gênante devant toute la belle-famille, au pire moment possible.",
  },
  {
    id: "ml-fam-2",
    category: "amour",
    subthemeId: "belle-famille",
    text: "La personne la plus susceptible de flatter les parents de son/sa partenaire à grands coups de lèche exagérée.",
  },
  {
    id: "ml-fam-3",
    category: "amour",
    subthemeId: "belle-famille",
    text: "La personne la plus susceptible d'inventer n'importe quel prétexte pour zapper les repas de famille de son/sa partenaire.",
  },
  {
    id: "ml-fam-4",
    category: "amour",
    subthemeId: "belle-famille",
    text: "La personne la plus susceptible de partir en clash avec la belle-famille pour un détail complètement insignifiant.",
  },

  // ---------- AMOUR — Intimité ----------
  {
    id: "ml-int-1",
    category: "amour",
    subthemeId: "intimite",
    text: "La personne la plus susceptible de jouer les endormi·es à la perfection pour esquiver une conversation gênante.",
  },
  {
    id: "ml-int-2",
    category: "amour",
    subthemeId: "intimite",
    text: "La personne la plus susceptible de tout raconter en détail à ses potes, aucune pudeur, aucune limite.",
  },
  {
    id: "ml-int-3",
    category: "amour",
    subthemeId: "intimite",
    text: "La personne la plus susceptible d'avoir une liste de 'red flags' tellement stricte que personne au monde ne la validerait.",
  },
  {
    id: "ml-int-4",
    category: "amour",
    subthemeId: "intimite",
    text: "La personne la plus susceptible de bouder pendant des heures après une dispute plutôt que d'en parler comme un adulte.",
  },

  // ---------- AMITIÉ — Groupe d'amis ----------
  {
    id: "ml-gpe-1",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "La personne la plus susceptible d'annuler une sortie de groupe à la dernière minute, texto laconique à l'appui.",
  },
  {
    id: "ml-gpe-2",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "La personne la plus susceptible de monter deux potes l'un contre l'autre sans même s'en rendre compte, talent naturel.",
  },
  {
    id: "ml-gpe-3",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "La personne la plus susceptible de balancer un secret du groupe sans faire exprès, la bouche plus rapide que le cerveau.",
  },
  {
    id: "ml-gpe-4",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "La personne la plus susceptible de disparaître six mois dans la nature puis revenir comme si de rien n'était, culot monstre.",
  },

  // ---------- AMITIÉ — Colocation ----------
  {
    id: "ml-col-1",
    category: "amitie",
    subthemeId: "coloc",
    text: "La personne la plus susceptible de laisser sa vaisselle moisir des jours entiers avant de s'en occuper.",
  },
  {
    id: "ml-col-2",
    category: "amitie",
    subthemeId: "coloc",
    text: "La personne la plus susceptible d'inviter la terre entière sans jamais prévenir son/sa coloc.",
  },
  {
    id: "ml-col-3",
    category: "amitie",
    subthemeId: "coloc",
    text: "La personne la plus susceptible de finir en douce la nourriture des autres planquée dans le frigo.",
  },
  {
    id: "ml-col-4",
    category: "amitie",
    subthemeId: "coloc",
    text: "La personne la plus susceptible d'oublier sa part du loyer pile le jour où il faut payer, comme par magie.",
  },

  // ---------- AMITIÉ — Argent entre potes ----------
  {
    id: "ml-arg-1",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "La personne la plus susceptible d'oublier une dette avec une mémoire étonnamment sélective.",
  },
  {
    id: "ml-arg-2",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "La personne la plus susceptible de proposer 'on partage équitablement' pile quand c'est iel qui doit le plus. Calcul suspect.",
  },
  {
    id: "ml-arg-3",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "La personne la plus susceptible de s'évaporer dès qu'il faut cotiser pour un cadeau de groupe.",
  },
  {
    id: "ml-arg-4",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "La personne la plus susceptible de compter chaque centime que les autres lui doivent, comptable acharné·e.",
  },

  // ---------- AMITIÉ — Réseaux sociaux ----------
  {
    id: "ml-rse-1",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "La personne la plus susceptible de liker une story juste pour faire style qu'iel a vu ton message, technique bien rodée.",
  },
  {
    id: "ml-rse-2",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "La personne la plus susceptible de poster une story bien indirecte juste après une embrouille, le courage en option.",
  },
  {
    id: "ml-rse-3",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "La personne la plus susceptible de recadrer discrètement quelqu'un hors d'une photo de groupe avant de la poster.",
  },
  {
    id: "ml-rse-4",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "La personne la plus susceptible de screenshoter une conversation privée pour la balancer à qui veut bien la voir.",
  },
];
