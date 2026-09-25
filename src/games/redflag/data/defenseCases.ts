import { RedFlagSituation } from "../types";

/**
 * Banque de cas à défendre pour le mode "Le Procès" — mêmes sous-thèmes
 * que situations.ts, mais formulés comme un plaidoyer à la 2e personne
 * ("Défends le fait de...") plutôt qu'une situation vécue à la 3e
 * personne. L'accusé·e tiré·e au sort doit justifier le comportement
 * affiché à voix haute pendant 30 secondes.
 */
export const DEFENSE_CASES: RedFlagSituation[] = [
  // ---------- AMOUR — Premiers rendez-vous ----------
  {
    id: "def-rdv-1",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "Défends le fait d'arriver systématiquement en retard à tes rendez-vous sans prévenir.",
  },
  {
    id: "def-rdv-2",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "Justifie pourquoi tu parles de ton ex pendant tout le premier rendez-vous.",
  },
  {
    id: "def-rdv-3",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "Explique pourquoi tu ne poses jamais la moindre question sur la personne en face de toi.",
  },
  {
    id: "def-rdv-4",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "Défends le fait de commander à la place de ton date sans jamais lui demander son avis.",
  },
  {
    id: "def-rdv-5",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "Justifie pourquoi tu regardes ton téléphone toutes les cinq minutes en plein rendez-vous.",
  },
  {
    id: "def-rdv-6",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "Explique pourquoi c'est totalement normal d'engueuler le serveur devant tout le monde.",
  },
  {
    id: "def-rdv-7",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "Défends le fait de proposer d'aller chez toi dès le premier verre.",
  },
  {
    id: "def-rdv-8",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "Justifie pourquoi tu ne proposes jamais de payer, même pas symboliquement.",
  },

  // ---------- AMOUR — Réseaux sociaux ----------
  {
    id: "def-rsa-1",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "Défends le fait de liker systématiquement toutes les photos de ton ex.",
  },
  {
    id: "def-rsa-2",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "Justifie pourquoi tu as un compte privé secondaire que ton/ta partenaire n'a pas le droit de suivre.",
  },
  {
    id: "def-rsa-3",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "Explique pourquoi tu ne tagues jamais ton/ta partenaire sur tes photos, même après plusieurs mois.",
  },
  {
    id: "def-rsa-4",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "Défends le fait de mettre des émojis flamme sous les photos d'inconnu·es.",
  },
  {
    id: "def-rsa-5",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "Justifie pourquoi tu changes ta photo de profil dès que ça va mal dans le couple.",
  },
  {
    id: "def-rsa-6",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "Explique pourquoi c'est normal d'être 'en ligne' sur WhatsApp sans jamais répondre.",
  },
  {
    id: "def-rsa-7",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "Défends le fait d'avoir annoncé ta relation en ligne avant même d'en avoir parlé avec ton/ta partenaire.",
  },
  {
    id: "def-rsa-8",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "Justifie pourquoi tu gardes une photo de couple avec ton ex épinglée sur ton profil.",
  },

  // ---------- AMOUR — Les ex ----------
  {
    id: "def-ex-1",
    category: "amour",
    subthemeId: "ex",
    text: "Défends le fait de rester super proche d'absolument tou·tes tes ex.",
  },
  {
    id: "def-ex-2",
    category: "amour",
    subthemeId: "ex",
    text: "Justifie pourquoi tu compares sans arrêt ton/ta partenaire actuel·le à tes ex.",
  },
  {
    id: "def-ex-3",
    category: "amour",
    subthemeId: "ex",
    text: "Explique pourquoi tu gardes encore bien en évidence les cadeaux de ton ex.",
  },
  {
    id: "def-ex-4",
    category: "amour",
    subthemeId: "ex",
    text: "Défends le fait de répondre à tous les messages de ton ex, à n'importe quelle heure.",
  },
  {
    id: "def-ex-5",
    category: "amour",
    subthemeId: "ex",
    text: "Justifie pourquoi tu as présenté ton/ta partenaire à ton ex sans le/la prévenir avant.",
  },
  {
    id: "def-ex-6",
    category: "amour",
    subthemeId: "ex",
    text: "Explique pourquoi tu dis du mal d'absolument tou·tes tes ex sans exception.",
  },
  {
    id: "def-ex-7",
    category: "amour",
    subthemeId: "ex",
    text: "Défends le fait de trouver toujours 'une bonne raison' de revoir ton ex en tête-à-tête.",
  },
  {
    id: "def-ex-8",
    category: "amour",
    subthemeId: "ex",
    text: "Justifie pourquoi tu appelles encore ton/ta partenaire par le surnom de ton ex.",
  },

  // ---------- AMOUR — Famille du/de la partenaire ----------
  {
    id: "def-fam-1",
    category: "amour",
    subthemeId: "belle-famille",
    text: "Défends le fait de critiquer ouvertement les choix de ton/ta partenaire devant toute ta famille.",
  },
  {
    id: "def-fam-2",
    category: "amour",
    subthemeId: "belle-famille",
    text: "Justifie pourquoi tu ne défends jamais ton/ta partenaire face aux remarques de ta famille.",
  },
  {
    id: "def-fam-3",
    category: "amour",
    subthemeId: "belle-famille",
    text: "Explique pourquoi tes parents ont toujours le dernier mot sur vos projets de couple.",
  },
  {
    id: "def-fam-4",
    category: "amour",
    subthemeId: "belle-famille",
    text: "Défends le fait d'exiger que ton/ta partenaire appelle tes parents 'maman'/'papa' après seulement deux semaines.",
  },
  {
    id: "def-fam-5",
    category: "amour",
    subthemeId: "belle-famille",
    text: "Justifie pourquoi ta famille pose des questions hyper intrusives sur la vie intime du couple.",
  },
  {
    id: "def-fam-6",
    category: "amour",
    subthemeId: "belle-famille",
    text: "Explique pourquoi tu changes complètement de personnalité devant ta famille.",
  },
  {
    id: "def-fam-7",
    category: "amour",
    subthemeId: "belle-famille",
    text: "Défends le fait de ne toujours pas avoir présenté officiellement ton/ta partenaire après plusieurs mois.",
  },
  {
    id: "def-fam-8",
    category: "amour",
    subthemeId: "belle-famille",
    text: "Justifie pourquoi ta famille compare systématiquement ton/ta partenaire actuel·le à l'ex précédent·e.",
  },

  // ---------- AMOUR — Intimité ----------
  {
    id: "def-int-1",
    category: "amour",
    subthemeId: "intimite",
    text: "Défends le fait de bouder quand ton/ta partenaire n'est pas d'humeur, comme une punition.",
  },
  {
    id: "def-int-2",
    category: "amour",
    subthemeId: "intimite",
    text: "Justifie pourquoi tu refuses de parler consentement ou limites avec ton/ta partenaire.",
  },
  {
    id: "def-int-3",
    category: "amour",
    subthemeId: "intimite",
    text: "Explique pourquoi tu fais culpabiliser ton/ta partenaire quand iel propose d'utiliser une protection.",
  },
  {
    id: "def-int-4",
    category: "amour",
    subthemeId: "intimite",
    text: "Défends le fait de comparer les performances de ton/ta partenaire à celles de ton ex, à voix haute.",
  },
  {
    id: "def-int-5",
    category: "amour",
    subthemeId: "intimite",
    text: "Justifie pourquoi tu insistes plusieurs fois après un 'non'.",
  },
  {
    id: "def-int-6",
    category: "amour",
    subthemeId: "intimite",
    text: "Explique pourquoi tu partages des détails intimes de ta relation sans l'accord de ton/ta partenaire.",
  },
  {
    id: "def-int-7",
    category: "amour",
    subthemeId: "intimite",
    text: "Défends le fait de vouloir un contrôle total sur le quand et le comment, jamais l'inverse.",
  },
  {
    id: "def-int-8",
    category: "amour",
    subthemeId: "intimite",
    text: "Justifie pourquoi tu fais la tête si ce n'était 'pas assez souvent' à ton goût.",
  },

  // ---------- AMITIÉ — Groupe d'amis ----------
  {
    id: "def-gpe-1",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "Défends le fait de raconter les secrets de tes potes au reste du groupe 'juste pour rire'.",
  },
  {
    id: "def-gpe-2",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "Justifie pourquoi tu prends toujours le crédit des idées des autres devant le groupe.",
  },
  {
    id: "def-gpe-3",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "Explique pourquoi tu organises des sorties de groupe en excluant systématiquement la même personne.",
  },
  {
    id: "def-gpe-4",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "Défends le fait de te moquer de tes potes devant tout le monde et de les traiter de 'susceptibles' s'iels réagissent.",
  },
  {
    id: "def-gpe-5",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "Justifie pourquoi tu ne soutiens jamais tes ami·es publiquement, même quand iels ont raison.",
  },
  {
    id: "def-gpe-6",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "Explique pourquoi tu montes les gens du groupe les uns contre les autres.",
  },
  {
    id: "def-gpe-7",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "Défends le fait de disparaître dès qu'on a besoin de toi mais de réapparaître pour chaque fête.",
  },
  {
    id: "def-gpe-8",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "Justifie pourquoi tu critiques tes ami·es dès qu'iels ont le dos tourné.",
  },

  // ---------- AMITIÉ — Colocation ----------
  {
    id: "def-col-1",
    category: "amitie",
    subthemeId: "coloc",
    text: "Défends le fait de ne jamais faire la vaisselle sauf si on te le répète cinq fois.",
  },
  {
    id: "def-col-2",
    category: "amitie",
    subthemeId: "coloc",
    text: "Justifie pourquoi tu invites des gens sans prévenir alors que ton/ta coloc a cours ou boulot le lendemain.",
  },
  {
    id: "def-col-3",
    category: "amitie",
    subthemeId: "coloc",
    text: "Explique pourquoi tu 'empruntes' systématiquement les affaires des autres sans jamais demander.",
  },
  {
    id: "def-col-4",
    category: "amitie",
    subthemeId: "coloc",
    text: "Défends le fait de payer ta part des charges en retard, chaque mois, sans exception.",
  },
  {
    id: "def-col-5",
    category: "amitie",
    subthemeId: "coloc",
    text: "Justifie pourquoi tu fais du bruit tard le soir sans te soucier du sommeil de ton/ta coloc.",
  },
  {
    id: "def-col-6",
    category: "amitie",
    subthemeId: "coloc",
    text: "Explique pourquoi tu laisses la vaisselle sale tremper pendant une semaine 'pour plus tard'.",
  },
  {
    id: "def-col-7",
    category: "amitie",
    subthemeId: "coloc",
    text: "Défends le fait d'utiliser les produits des autres (shampoing, café...) sans jamais les racheter.",
  },
  {
    id: "def-col-8",
    category: "amitie",
    subthemeId: "coloc",
    text: "Justifie pourquoi tu fais la loi sur les espaces communs sans consulter personne.",
  },

  // ---------- AMITIÉ — Argent entre potes ----------
  {
    id: "def-arg-1",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "Défends le fait d''oublier' systématiquement de rembourser tes potes.",
  },
  {
    id: "def-arg-2",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "Justifie pourquoi tu proposes toujours de partager en deux, sauf quand c'est toi qui dois le plus.",
  },
  {
    id: "def-arg-3",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "Explique pourquoi tu empruntes de l'argent à tes potes puis t'achètes un truc cher juste après.",
  },
  {
    id: "def-arg-4",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "Défends le fait de culpabiliser tes potes quand iels réclament ce que tu leur dois.",
  },
  {
    id: "def-arg-5",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "Justifie pourquoi tu choisis toujours le resto le plus cher en sachant que tes potes galèrent ce mois-ci.",
  },
  {
    id: "def-arg-6",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "Explique pourquoi tu disparais des radars dès qu'il faut cotiser pour un cadeau de groupe.",
  },
  {
    id: "def-arg-7",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "Défends le fait de compter au centime près ce qu'on te doit, mais jamais l'inverse.",
  },
  {
    id: "def-arg-8",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "Justifie pourquoi tu redemandes de l'argent 'juste cette fois', pour la 5e fois ce mois-ci.",
  },

  // ---------- AMITIÉ — Réseaux sociaux ----------
  {
    id: "def-rse-1",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "Défends le fait de liker les stories de tout le monde sauf celles de ton/ta pote.",
  },
  {
    id: "def-rse-2",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "Justifie pourquoi tu postes des photos de sorties entre potes où quelqu'un n'a délibérément pas été invité·e.",
  },
  {
    id: "def-rse-3",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "Explique pourquoi tu screenshotes des conversations privées pour les montrer à d'autres personnes.",
  },
  {
    id: "def-rse-4",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "Défends le fait de commenter négativement les posts de tes potes 'pour rire', en public.",
  },
  {
    id: "def-rse-5",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "Justifie pourquoi tu ne réponds jamais aux messages mais postes des stories toutes les heures.",
  },
  {
    id: "def-rse-6",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "Explique pourquoi tu partages dans un groupe des infos qu'on t'a confiées en privé.",
  },
  {
    id: "def-rse-7",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "Défends le fait de poster des indirectes après une embrouille au lieu d'aller en parler directement.",
  },
  {
    id: "def-rse-8",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "Justifie pourquoi tu unfollow discrètement quelqu'un après une dispute, sans lui en parler.",
  },
];
