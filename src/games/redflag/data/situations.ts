import { RedFlagSituation } from "../types";

/**
 * Banque de situations red flag. Pour ajouter du contenu à un sous-thème
 * existant ou en créer un nouveau (patch futur), il suffit d'allonger ce
 * tableau et, si besoin, d'ajouter l'entrée correspondante dans
 * `SUBTHEMES` (types.ts).
 */
export const SITUATIONS: RedFlagSituation[] = [
  // ---------- AMOUR — Premiers rendez-vous ----------
  {
    id: "rdv-1",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "Il/elle est en retard de 20 minutes sans un message d'excuse.",
  },
  {
    id: "rdv-2",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "Il/elle parle de son ex pendant tout le rendez-vous.",
  },
  {
    id: "rdv-3",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "Il/elle ne te pose aucune question sur toi de toute la soirée.",
  },
  {
    id: "rdv-4",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "Il/elle commande pour toi sans te demander ton avis.",
  },
  {
    id: "rdv-5",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "Il/elle sort son téléphone toutes les 5 minutes pour checker ses notifs.",
  },
  {
    id: "rdv-6",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "Il/elle critique le service devant le personnel, de façon agressive.",
  },
  {
    id: "rdv-7",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "Il/elle propose d'aller chez lui/elle dès le premier verre.",
  },
  {
    id: "rdv-8",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "Il/elle ne propose jamais de payer, même symboliquement.",
  },

  // ---------- AMOUR — Réseaux sociaux ----------
  {
    id: "rsa-1",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "Il/elle like systématiquement les photos de son ex.",
  },
  {
    id: "rsa-2",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "Il/elle a un compte privé secondaire que tu n'as pas le droit de suivre.",
  },
  {
    id: "rsa-3",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "Il/elle ne te tague jamais sur ses photos, même après plusieurs mois.",
  },
  {
    id: "rsa-4",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "Il/elle commente avec des émojis flamme sous les photos d'inconnu·es.",
  },
  {
    id: "rsa-5",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "Il/elle change sa photo de profil dès qu'un truc va mal dans votre couple.",
  },
  {
    id: "rsa-6",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "Il/elle est en ligne sur WhatsApp mais ne répond pas depuis 3 heures.",
  },
  {
    id: "rsa-7",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "Il/elle poste 'in a relationship' avant même d'en avoir parlé avec toi.",
  },
  {
    id: "rsa-8",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "Il/elle a encore une photo de couple avec son ex en post épinglé.",
  },

  // ---------- AMOUR — Les ex ----------
  {
    id: "ex-1",
    category: "amour",
    subthemeId: "ex",
    text: "Il/elle est encore très proche de tou·tes ses ex, sans exception.",
  },
  {
    id: "ex-2",
    category: "amour",
    subthemeId: "ex",
    text: "Il/elle compare régulièrement ta façon de faire à celle de son ex.",
  },
  {
    id: "ex-3",
    category: "amour",
    subthemeId: "ex",
    text: "Il/elle garde des cadeaux de son ex bien en évidence chez lui/elle.",
  },
  {
    id: "ex-4",
    category: "amour",
    subthemeId: "ex",
    text: "Il/elle répond encore à tous les messages de son ex, à toute heure.",
  },
  {
    id: "ex-5",
    category: "amour",
    subthemeId: "ex",
    text: "Il/elle t'a présenté·e à son ex sans te prévenir avant.",
  },
  {
    id: "ex-6",
    category: "amour",
    subthemeId: "ex",
    text: "Il/elle dit du mal de tou·tes ses ex, absolument sans exception.",
  },
  {
    id: "ex-7",
    category: "amour",
    subthemeId: "ex",
    text: "Il/elle trouve toujours 'une bonne raison' de revoir son ex seul à seul.",
  },
  {
    id: "ex-8",
    category: "amour",
    subthemeId: "ex",
    text: "Il/elle t'appelle encore par le surnom de son ex, par erreur ou pas.",
  },

  // ---------- AMOUR — Famille du/de la partenaire ----------
  {
    id: "fam-1",
    category: "amour",
    subthemeId: "belle-famille",
    text: "Sa famille critique ouvertement tes choix, dès le premier repas.",
  },
  {
    id: "fam-2",
    category: "amour",
    subthemeId: "belle-famille",
    text: "Il/elle ne te défend jamais face aux remarques de sa famille.",
  },
  {
    id: "fam-3",
    category: "amour",
    subthemeId: "belle-famille",
    text: "Sa mère/son père a toujours le dernier mot sur vos projets de couple.",
  },
  {
    id: "fam-4",
    category: "amour",
    subthemeId: "belle-famille",
    text: "Il/elle attend que tu appelles ses parents 'maman'/'papa' après 2 semaines.",
  },
  {
    id: "fam-5",
    category: "amour",
    subthemeId: "belle-famille",
    text: "Sa famille pose des questions très intrusives sur votre vie intime.",
  },
  {
    id: "fam-6",
    category: "amour",
    subthemeId: "belle-famille",
    text: "Il/elle change complètement de personnalité en présence de sa famille.",
  },
  {
    id: "fam-7",
    category: "amour",
    subthemeId: "belle-famille",
    text: "On ne t'a toujours pas présenté·e officiellement après plusieurs mois.",
  },
  {
    id: "fam-8",
    category: "amour",
    subthemeId: "belle-famille",
    text: "Sa famille te compare systématiquement à l'ex précédent·e, devant toi.",
  },

  // ---------- AMOUR — Intimité ----------
  {
    id: "int-1",
    category: "amour",
    subthemeId: "intimite",
    text: "Il/elle boude si tu n'es pas d'humeur, comme une punition.",
  },
  {
    id: "int-2",
    category: "amour",
    subthemeId: "intimite",
    text: "Il/elle refuse de parler consentement ou limites, ça le/la gêne.",
  },
  {
    id: "int-3",
    category: "amour",
    subthemeId: "intimite",
    text: "Il/elle culpabilise quand tu proposes d'utiliser une protection.",
  },
  {
    id: "int-4",
    category: "amour",
    subthemeId: "intimite",
    text: "Il/elle compare tes performances à celles de son ex, à voix haute.",
  },
  {
    id: "int-5",
    category: "amour",
    subthemeId: "intimite",
    text: "Il/elle n'accepte jamais un 'non' sans insister plusieurs fois.",
  },
  {
    id: "int-6",
    category: "amour",
    subthemeId: "intimite",
    text: "Il/elle partage des détails intimes de votre relation sans ton accord.",
  },
  {
    id: "int-7",
    category: "amour",
    subthemeId: "intimite",
    text: "Il/elle a besoin d'un contrôle total sur quand et comment, jamais l'inverse.",
  },
  {
    id: "int-8",
    category: "amour",
    subthemeId: "intimite",
    text: "Il/elle fait la tête après, si ce n'était 'pas assez souvent' à son goût.",
  },

  // ---------- AMITIÉ — Groupe d'amis ----------
  {
    id: "gpe-1",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "Il/elle raconte tes secrets au reste du groupe 'juste pour rire'.",
  },
  {
    id: "gpe-2",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "Il/elle prend toujours le crédit de tes idées devant les autres.",
  },
  {
    id: "gpe-3",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "Il/elle organise des sorties de groupe en t'excluant systématiquement.",
  },
  {
    id: "gpe-4",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "Il/elle se moque de toi devant tout le monde et te trouve 'susceptible' si tu réagis.",
  },
  {
    id: "gpe-5",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "Il/elle ne te soutient jamais publiquement, même quand t'as raison.",
  },
  {
    id: "gpe-6",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "Il/elle monte les gens du groupe les uns contre les autres.",
  },
  {
    id: "gpe-7",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "Il/elle disparaît dès que t'as besoin d'aide mais réapparaît pour les fêtes.",
  },
  {
    id: "gpe-8",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "Il/elle critique tes autres ami·es dès qu'iels ne sont pas là.",
  },

  // ---------- AMITIÉ — Colocation ----------
  {
    id: "col-1",
    category: "amitie",
    subthemeId: "coloc",
    text: "Il/elle ne fait jamais la vaisselle sauf si tu en parles pour la 5e fois.",
  },
  {
    id: "col-2",
    category: "amitie",
    subthemeId: "coloc",
    text: "Il/elle invite des gens sans prévenir alors que t'as cours/boulot le lendemain.",
  },
  {
    id: "col-3",
    category: "amitie",
    subthemeId: "coloc",
    text: "Il/elle 'emprunte' tes affaires sans demander, en mode systématique.",
  },
  {
    id: "col-4",
    category: "amitie",
    subthemeId: "coloc",
    text: "Il/elle ne paie jamais sa part des charges à temps, chaque mois.",
  },
  {
    id: "col-5",
    category: "amitie",
    subthemeId: "coloc",
    text: "Il/elle fait du bruit tard le soir sans se soucier de ton sommeil.",
  },
  {
    id: "col-6",
    category: "amitie",
    subthemeId: "coloc",
    text: "Il/elle laisse la vaisselle sale tremper 'pour plus tard' pendant une semaine.",
  },
  {
    id: "col-7",
    category: "amitie",
    subthemeId: "coloc",
    text: "Il/elle utilise tes produits (shampoing, café...) sans jamais les racheter.",
  },
  {
    id: "col-8",
    category: "amitie",
    subthemeId: "coloc",
    text: "Il/elle fait la loi sur les espaces communs sans consulter personne.",
  },

  // ---------- AMITIÉ — Argent entre potes ----------
  {
    id: "arg-1",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "Il/elle 'oublie' systématiquement de te rembourser.",
  },
  {
    id: "arg-2",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "Il/elle propose toujours de partager en deux, sauf quand c'est lui/elle qui doit le plus.",
  },
  {
    id: "arg-3",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "Il/elle t'emprunte de l'argent mais s'achète un truc cher juste après.",
  },
  {
    id: "arg-4",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "Il/elle culpabilise si tu réclames ce qu'il/elle te doit.",
  },
  {
    id: "arg-5",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "Il/elle choisit toujours le resto le plus cher en sachant que tu galères ce mois-ci.",
  },
  {
    id: "arg-6",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "Il/elle disparaît des radars dès qu'il faut cotiser pour un cadeau de groupe.",
  },
  {
    id: "arg-7",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "Il/elle compte au centime près ce que TU lui dois, jamais l'inverse.",
  },
  {
    id: "arg-8",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "Il/elle te demande de l'argent 'juste cette fois', pour la 5e fois ce mois-ci.",
  },

  // ---------- AMITIÉ — Réseaux sociaux ----------
  {
    id: "rse-1",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "Il/elle like les stories de tout le monde sauf les tiennes, à chaque fois.",
  },
  {
    id: "rse-2",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "Il/elle poste des photos de sorties entre potes où tu n'as délibérément pas été invité·e.",
  },
  {
    id: "rse-3",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "Il/elle screenshot vos conversations privées pour les montrer à d'autres.",
  },
  {
    id: "rse-4",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "Il/elle commente négativement tes posts 'pour rire', en public.",
  },
  {
    id: "rse-5",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "Il/elle ne répond jamais à tes messages mais poste des stories toutes les heures.",
  },
  {
    id: "rse-6",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "Il/elle partage des infos que tu lui as confiées en privé, dans un groupe.",
  },
  {
    id: "rse-7",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "Il/elle poste des indirectes après une embrouille entre vous.",
  },
  {
    id: "rse-8",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "Il/elle vous 'unfollow' discrètement après une dispute, sans en parler.",
  },
];
