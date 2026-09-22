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
    text: "La personne la plus susceptible d'annuler un date à la dernière minute pour une excuse bidon.",
  },
  {
    id: "ml-rdv-2",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "La personne la plus susceptible de stalker le profil de son date avant le premier rendez-vous.",
  },
  {
    id: "ml-rdv-3",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "La personne la plus susceptible de mentir sur son âge ou sa taille sur une appli de rencontre.",
  },
  {
    id: "ml-rdv-4",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "La personne la plus susceptible de ghoster après un premier rendez-vous décevant.",
  },

  // ---------- AMOUR — Réseaux sociaux ----------
  {
    id: "ml-rsa-1",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "La personne la plus susceptible de stalker les réseaux de son ex à 2h du matin.",
  },
  {
    id: "ml-rsa-2",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "La personne la plus susceptible de liker une vieille photo en faisant style c'est un accident.",
  },
  {
    id: "ml-rsa-3",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "La personne la plus susceptible de changer sa bio Instagram juste après une rupture.",
  },
  {
    id: "ml-rsa-4",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "La personne la plus susceptible d'espionner le compte de la nouvelle personne de son ex.",
  },

  // ---------- AMOUR — Les ex ----------
  {
    id: "ml-ex-1",
    category: "amour",
    subthemeId: "ex",
    text: "La personne la plus susceptible de répondre à un texto de son ex à 3h du matin.",
  },
  {
    id: "ml-ex-2",
    category: "amour",
    subthemeId: "ex",
    text: "La personne la plus susceptible de comparer son/sa nouveau/nouvelle partenaire à son ex.",
  },
  {
    id: "ml-ex-3",
    category: "amour",
    subthemeId: "ex",
    text: "La personne la plus susceptible de rester ami·e avec absolument tou·tes ses ex.",
  },
  {
    id: "ml-ex-4",
    category: "amour",
    subthemeId: "ex",
    text: "La personne la plus susceptible de garder une boîte à souvenirs de son ex.",
  },

  // ---------- AMOUR — Famille du/de la partenaire ----------
  {
    id: "ml-fam-1",
    category: "amour",
    subthemeId: "belle-famille",
    text: "La personne la plus susceptible de raconter une anecdote gênante devant la belle-famille.",
  },
  {
    id: "ml-fam-2",
    category: "amour",
    subthemeId: "belle-famille",
    text: "La personne la plus susceptible de flatter exagérément les parents de son/sa partenaire.",
  },
  {
    id: "ml-fam-3",
    category: "amour",
    subthemeId: "belle-famille",
    text: "La personne la plus susceptible d'éviter les repas de famille de son/sa partenaire.",
  },
  {
    id: "ml-fam-4",
    category: "amour",
    subthemeId: "belle-famille",
    text: "La personne la plus susceptible de se disputer avec sa belle-famille pour un détail.",
  },

  // ---------- AMOUR — Intimité ----------
  {
    id: "ml-int-1",
    category: "amour",
    subthemeId: "intimite",
    text: "La personne la plus susceptible de faire semblant de dormir pour éviter une conversation gênante.",
  },
  {
    id: "ml-int-2",
    category: "amour",
    subthemeId: "intimite",
    text: "La personne la plus susceptible de raconter des détails intimes à ses potes.",
  },
  {
    id: "ml-int-3",
    category: "amour",
    subthemeId: "intimite",
    text: "La personne la plus susceptible d'avoir une liste de 'red flags' beaucoup trop stricte.",
  },
  {
    id: "ml-int-4",
    category: "amour",
    subthemeId: "intimite",
    text: "La personne la plus susceptible de bouder après une dispute plutôt que d'en parler.",
  },

  // ---------- AMITIÉ — Groupe d'amis ----------
  {
    id: "ml-gpe-1",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "La personne la plus susceptible d'annuler une sortie de groupe à la dernière minute.",
  },
  {
    id: "ml-gpe-2",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "La personne la plus susceptible de monter deux ami·es l'un contre l'autre sans le vouloir.",
  },
  {
    id: "ml-gpe-3",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "La personne la plus susceptible de raconter un secret du groupe sans faire exprès.",
  },
  {
    id: "ml-gpe-4",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "La personne la plus susceptible de disparaître six mois puis revenir comme si de rien n'était.",
  },

  // ---------- AMITIÉ — Colocation ----------
  {
    id: "ml-col-1",
    category: "amitie",
    subthemeId: "coloc",
    text: "La personne la plus susceptible de ne jamais faire sa vaisselle à temps.",
  },
  {
    id: "ml-col-2",
    category: "amitie",
    subthemeId: "coloc",
    text: "La personne la plus susceptible d'inviter du monde sans prévenir son/sa coloc.",
  },
  {
    id: "ml-col-3",
    category: "amitie",
    subthemeId: "coloc",
    text: "La personne la plus susceptible de finir la nourriture des autres dans le frigo.",
  },
  {
    id: "ml-col-4",
    category: "amitie",
    subthemeId: "coloc",
    text: "La personne la plus susceptible d'oublier de payer sa part du loyer à temps.",
  },

  // ---------- AMITIÉ — Argent entre potes ----------
  {
    id: "ml-arg-1",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "La personne la plus susceptible d'oublier de rembourser une dette.",
  },
  {
    id: "ml-arg-2",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "La personne la plus susceptible de proposer 'on partage' quand c'est elle qui doit le plus.",
  },
  {
    id: "ml-arg-3",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "La personne la plus susceptible de disparaître quand il faut cotiser pour un cadeau.",
  },
  {
    id: "ml-arg-4",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "La personne la plus susceptible de compter chaque centime que les autres lui doivent.",
  },

  // ---------- AMITIÉ — Réseaux sociaux ----------
  {
    id: "ml-rse-1",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "La personne la plus susceptible de liker une story juste pour faire style qu'elle a vu le message.",
  },
  {
    id: "ml-rse-2",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "La personne la plus susceptible de poster une story indirecte après une embrouille.",
  },
  {
    id: "ml-rse-3",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "La personne la plus susceptible d'exclure quelqu'un d'une photo de groupe sur les réseaux.",
  },
  {
    id: "ml-rse-4",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "La personne la plus susceptible de screenshot une conversation privée pour la montrer à d'autres.",
  },
];
