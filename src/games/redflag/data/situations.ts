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
    text: "Il/elle arrive avec 20 minutes de retard sans même un misérable message d'excuse.",
  },
  {
    id: "rdv-2",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "Il/elle te raconte sa vie et ses ex pendant TOUT le rendez-vous, captivant.",
  },
  {
    id: "rdv-3",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "Zéro question sur toi de toute la soirée, la conversation est un monologue en solo.",
  },
  {
    id: "rdv-4",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "Il/elle commande à ta place sans même te demander ton avis, en mode 'je sais mieux que toi ce que tu veux manger'.",
  },
  {
    id: "rdv-5",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "Il/elle checke son téléphone toutes les 5 minutes, on dirait qu'il/elle attend un verdict de cour d'assises.",
  },
  {
    id: "rdv-6",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "Il/elle démonte le service devant tout le monde, ambiance client roi version tyran.",
  },
  {
    id: "rdv-7",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "Dès le premier verre, il/elle propose déjà de finir la soirée chez lui/elle. Patience, zéro.",
  },
  {
    id: "rdv-8",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "Il/elle ne propose jamais de payer, même pas un malheureux café par galanterie.",
  },
  {
    id: "rdv-9",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "Il/elle parle au serveur avec le melon d'un critique Michelin qui mange dans un routier.",
  },
  {
    id: "rdv-10",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "Il/elle propose de partager l'addition au premier date, le romantisme à l'état brut.",
  },
  {
    id: "rdv-11",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "Il/elle vient en jogging au restaurant pour être sûr d'avoir l'air chic.",
  },
  {
    id: "rdv-12",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "Il/elle refuse la carafe d'eau par pure fierté mal placée.",
  },
  {
    id: "rdv-13",
    category: "amour",
    subthemeId: "premiers-rdv",
    text: "Il/elle prend les plats les moins chers pour lui/elle quand c'est le moment de raquer.",
  },

  // ---------- AMOUR — Réseaux sociaux ----------
  {
    id: "rsa-1",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "Il/elle like systématiquement CHAQUE photo de son ex, le pouce le plus fidèle du game.",
  },
  {
    id: "rsa-2",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "Il/elle planque un compte privé secondaire, accès interdit à toi seul·e. Ultra louche.",
  },
  {
    id: "rsa-3",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "Après plusieurs mois, toujours aucun tag sur ses photos. Tu existes en mode témoin protégé.",
  },
  {
    id: "rsa-4",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "Il/elle balance des émojis flamme sous les photos d'inconnu·es, la classe et la discrétion en option.",
  },
  {
    id: "rsa-5",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "Dès que ça sent le roussi dans le couple, hop, nouvelle photo de profil. Un radar à drame intégré.",
  },
  {
    id: "rsa-6",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "'En ligne' sur WhatsApp depuis 3 heures, mais aucune réponse. Le ghosting version active.",
  },
  {
    id: "rsa-7",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "'In a relationship' posté avant même d'en avoir discuté avec toi. Officialisé sans ton accord, pratique.",
  },
  {
    id: "rsa-8",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "Une photo de couple avec l'ex, encore épinglée en post officiel. Musée permanent, entrée libre.",
  },
  {
    id: "rsa-9",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "Il/elle a un tatouage tribal sur le bras, histoire de rester bloqué en 2004.",
  },
  {
    id: "rsa-10",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "Il/elle a un tatouage de lion, le cri de ralliement des rois du pétrole... de la bêtise.",
  },
  {
    id: "rsa-11",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "Il/elle a un tatouage carpe diem, parce que 'saisir le jour' avec un lettrage raté, c'est tout un art.",
  },
  {
    id: "rsa-12",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "Il/elle s'est fait tatouer tout seul, bourré en soirée, avec l'aide d'un vieux dermographe acheté sur Wish.",
  },
  {
    id: "rsa-13",
    category: "amour",
    subthemeId: "reseaux-amour",
    text: "Il/elle ne supprime jamais ses mails (le genre à avoir 47 000 e-mails non lus, le chaos incarné).",
  },

  // ---------- AMOUR — Les ex ----------
  {
    id: "ex-1",
    category: "amour",
    subthemeId: "ex",
    text: "Il/elle reste super proche de TOUTES ses ex, sans exception. Un club de fans organisé.",
  },
  {
    id: "ex-2",
    category: "amour",
    subthemeId: "ex",
    text: "Il/elle compare régulièrement tes faits et gestes à ceux de son ex. Un jury permanent, et tu perds souvent.",
  },
  {
    id: "ex-3",
    category: "amour",
    subthemeId: "ex",
    text: "Les cadeaux de l'ex trônent encore bien en évidence chez lui/elle. Musée du souvenir, visite guidée gratuite.",
  },
  {
    id: "ex-4",
    category: "amour",
    subthemeId: "ex",
    text: "Il/elle répond encore à tous les messages de son ex, à toute heure du jour ou de la nuit. Service client 24/7 exclusif.",
  },
  {
    id: "ex-5",
    category: "amour",
    subthemeId: "ex",
    text: "Tu te retrouves face à l'ex sans prévenance aucune. Surprise party, ambiance gênante garantie.",
  },
  {
    id: "ex-6",
    category: "amour",
    subthemeId: "ex",
    text: "Il/elle démonte TOUTES ses ex sans exception. Sacré palmarès de rancune.",
  },
  {
    id: "ex-7",
    category: "amour",
    subthemeId: "ex",
    text: "Il y a toujours 'une bonne raison' de revoir l'ex en tête-à-tête. Coïncidence troublante, à répétition.",
  },
  {
    id: "ex-8",
    category: "amour",
    subthemeId: "ex",
    text: "Il/elle t'appelle encore par le petit surnom de son ex, erreur ou pas. Freudien au possible.",
  },

  // ---------- AMOUR — Famille du/de la partenaire ----------
  {
    id: "fam-1",
    category: "amour",
    subthemeId: "belle-famille",
    text: "Sa famille démonte ouvertement tes choix de vie dès le premier repas. Accueil chaleureux, vraiment.",
  },
  {
    id: "fam-2",
    category: "amour",
    subthemeId: "belle-famille",
    text: "Il/elle ne te défend jamais face aux piques de sa famille. Silence radio, tu es seul·e au front.",
  },
  {
    id: "fam-3",
    category: "amour",
    subthemeId: "belle-famille",
    text: "Sa mère ou son père a toujours le dernier mot sur VOS projets de couple. Un troisième membre non-consentant dans la relation.",
  },
  {
    id: "fam-4",
    category: "amour",
    subthemeId: "belle-famille",
    text: "Après 2 semaines, il/elle t'impose déjà 'maman'/'papa' pour ses parents. Zéro transition, full vitesse.",
  },
  {
    id: "fam-5",
    category: "amour",
    subthemeId: "belle-famille",
    text: "Sa famille te cuisine sur votre vie intime avec un tact proche de zéro. Interrogatoire en règle.",
  },
  {
    id: "fam-6",
    category: "amour",
    subthemeId: "belle-famille",
    text: "Il/elle change complètement de personnalité devant sa famille. Un cosplay de lui/elle-même, version obéissante.",
  },
  {
    id: "fam-7",
    category: "amour",
    subthemeId: "belle-famille",
    text: "Toujours pas présenté·e officiellement après plusieurs mois. Statut : secret d'État.",
  },
  {
    id: "fam-8",
    category: "amour",
    subthemeId: "belle-famille",
    text: "Sa famille te compare systématiquement à l'ex précédent·e, en direct devant toi. Standing ovation pour la délicatesse.",
  },
  {
    id: "fam-9",
    category: "amour",
    subthemeId: "belle-famille",
    text: "Il/elle engage la conversation sur la politique, la religion ou la guerre à table pour pourrir l'ambiance en famille.",
  },

  // ---------- AMOUR — Intimité ----------
  {
    id: "int-1",
    category: "amour",
    subthemeId: "intimite",
    text: "Il/elle boude si t'es pas d'humeur, mode punition collective activé.",
  },
  {
    id: "int-2",
    category: "amour",
    subthemeId: "intimite",
    text: "Parler consentement ou limites ? Ça le/la gêne total, sujet tabou officiel.",
  },
  {
    id: "int-3",
    category: "amour",
    subthemeId: "intimite",
    text: "Il/elle te fait culpabiliser dès que tu proposes une protection. Ambiance plombante garantie.",
  },
  {
    id: "int-4",
    category: "amour",
    subthemeId: "intimite",
    text: "Il/elle compare tes performances à celles de son ex, à voix haute en plus. Aucune pudeur, zéro tact.",
  },
  {
    id: "int-5",
    category: "amour",
    subthemeId: "intimite",
    text: "Il/elle ne capte pas le concept pourtant simple d'un 'non' sans insister lourdement.",
  },
  {
    id: "int-6",
    category: "amour",
    subthemeId: "intimite",
    text: "Il/elle balance des détails intimes de votre relation sans ton accord. Confidentialité, connais pas.",
  },
  {
    id: "int-7",
    category: "amour",
    subthemeId: "intimite",
    text: "Contrôle total sur le quand et le comment, jamais l'inverse. Dictature à deux, mais un seul dictateur.",
  },
  {
    id: "int-8",
    category: "amour",
    subthemeId: "intimite",
    text: "Il/elle fait la tête après coup si c'était 'pas assez souvent' à son goût. Un bulletin de notes, même au lit.",
  },

  // ---------- AMITIÉ — Groupe d'amis ----------
  {
    id: "gpe-1",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "Il/elle balance tes secrets à tout le groupe 'juste pour rire'. Hilarant, surtout pour toi.",
  },
  {
    id: "gpe-2",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "Il/elle rafle systématiquement le crédit de tes idées devant tout le monde. Un vrai talent... de voleur.",
  },
  {
    id: "gpe-3",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "Il/elle organise des sorties de groupe en t'oubliant à chaque fois, comme par hasard.",
  },
  {
    id: "gpe-4",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "Il/elle se moque de toi devant tout le monde, et te traite de 'susceptible' si t'oses réagir. Classique.",
  },
  {
    id: "gpe-5",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "Zéro soutien public de sa part, même quand t'as clairement raison. Solidarité aux abonnés absents.",
  },
  {
    id: "gpe-6",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "Il/elle monte tout le groupe les uns contre les autres, un vrai metteur en scène de drama.",
  },
  {
    id: "gpe-7",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "Il/elle disparaît dès que t'as besoin d'aide, mais réapparaît comme par magie pour la moindre fête.",
  },
  {
    id: "gpe-8",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "Il/elle démonte tes autres ami·es dès qu'iels ont le dos tourné. Fidélité à géométrie variable.",
  },
  {
    id: "gpe-9",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "Il/elle ne peut pas s'empêcher de discuter avec les tables d'à côté comme s'il/elle était le roi de la salle.",
  },
  {
    id: "gpe-10",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "Il/elle essaie d'engager la conversation avec toutes les serveuses avec un charisme de comptoir de PMU.",
  },
  {
    id: "gpe-11",
    category: "amitie",
    subthemeId: "groupe-amis",
    text: "Il/elle va plus souvent au restau avec ses potes qu'avec toi, et franchement, tout le monde y gagne.",
  },

  // ---------- AMITIÉ — Colocation ----------
  {
    id: "col-1",
    category: "amitie",
    subthemeId: "coloc",
    text: "Il/elle ne touche à la vaisselle qu'à la 5e relance. Sourd volontaire de compét.",
  },
  {
    id: "col-2",
    category: "amitie",
    subthemeId: "coloc",
    text: "Il/elle invite la moitié du quartier sans prévenir, alors que t'as cours/boulot le lendemain. Merci pour la nuit blanche.",
  },
  {
    id: "col-3",
    category: "amitie",
    subthemeId: "coloc",
    text: "Il/elle 'emprunte' tes affaires sans jamais demander, en mode systématique. La frontière propriété/collectif, jamais entendu parler.",
  },
  {
    id: "col-4",
    category: "amitie",
    subthemeId: "coloc",
    text: "Sa part des charges arrive en retard, chaque mois, sans exception. Un abonnement au retard.",
  },
  {
    id: "col-5",
    category: "amitie",
    subthemeId: "coloc",
    text: "Il/elle fait un boucan pas possible tard le soir, ton sommeil, iel s'en fiche royalement.",
  },
  {
    id: "col-6",
    category: "amitie",
    subthemeId: "coloc",
    text: "La vaisselle sale trempe 'pour plus tard' depuis une semaine. Un écosystème en développement dans l'évier.",
  },
  {
    id: "col-7",
    category: "amitie",
    subthemeId: "coloc",
    text: "Il/elle pille ton shampoing, ton café, tout ce qui traîne, sans jamais rien racheter. Parasite discret mais efficace.",
  },
  {
    id: "col-8",
    category: "amitie",
    subthemeId: "coloc",
    text: "Il/elle fait la loi sur les espaces communs sans consulter qui que ce soit. Autoproclamé·e chef·fe de la coloc.",
  },
  {
    id: "col-9",
    category: "amitie",
    subthemeId: "coloc",
    text: "Il/elle se lave les dents une seule fois par jour. On prie pour son entourage.",
  },
  {
    id: "col-10",
    category: "amitie",
    subthemeId: "coloc",
    text: "Il/elle pose ses pieds sur les chaises alentours, le savoir-vivre de la grande bourgeoisie.",
  },
  {
    id: "col-11",
    category: "amitie",
    subthemeId: "coloc",
    text: "Il/elle mastique en faisant du bruit, on dirait un broyeur à gravats.",
  },
  {
    id: "col-12",
    category: "amitie",
    subthemeId: "coloc",
    text: "Il/elle ne sait pas utiliser des couverts, option gros doigts pleins de sauce.",
  },
  {
    id: "col-13",
    category: "amitie",
    subthemeId: "coloc",
    text: "Il/elle fume pendant que tu manges, le combo fumée de tabac et friture.",
  },
  {
    id: "col-14",
    category: "amitie",
    subthemeId: "coloc",
    text: "Il/elle met du sel partout, même là où c'est déjà beaucoup trop salé.",
  },
  {
    id: "col-15",
    category: "amitie",
    subthemeId: "coloc",
    text: "Il/elle te parle la bouche pleine en postillonnant sur ta nappe.",
  },

  // ---------- AMITIÉ — Argent entre potes ----------
  {
    id: "arg-1",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "Il/elle 'oublie' systématiquement de te rembourser. Une mémoire sélective très pratique.",
  },
  {
    id: "arg-2",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "Il/elle propose de partager en deux, sauf pile quand c'est lui/elle qui doit le plus. Calcul à géométrie variable.",
  },
  {
    id: "arg-3",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "Il/elle t'emprunte du fric puis s'achète un truc cher dans la foulée. Priorités claires, juste pas les bonnes.",
  },
  {
    id: "arg-4",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "Il/elle te fait culpabiliser dès que tu réclames ton dû. Le monde à l'envers, version pro.",
  },
  {
    id: "arg-5",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "Il/elle choisit toujours le resto le plus cher, alors qu'iel sait très bien que tu galères ce mois-ci.",
  },
  {
    id: "arg-6",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "Il/elle disparaît des radars pile quand il faut cotiser pour un cadeau de groupe. Un vrai Houdini.",
  },
  {
    id: "arg-7",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "Il/elle compte au centime près ce que TU lui dois, mais jamais l'inverse. Comptabilité à sens unique.",
  },
  {
    id: "arg-8",
    category: "amitie",
    subthemeId: "argent-potes",
    text: "'Juste cette fois', pour la 5e fois ce mois-ci. La formule magique qui ne trompe plus personne.",
  },

  // ---------- AMITIÉ — Réseaux sociaux ----------
  {
    id: "rse-1",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "Il/elle like les stories de tout le monde sauf les tiennes. Systématique, presque un exploit.",
  },
  {
    id: "rse-2",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "Il/elle poste fièrement les sorties où tu n'as clairement pas été invité·e. Merci pour l'info en direct.",
  },
  {
    id: "rse-3",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "Il/elle screenshote vos conversations privées pour les montrer à qui veut bien regarder. Confidentialité, zéro.",
  },
  {
    id: "rse-4",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "Il/elle démonte tes posts en commentaire public, 'juste pour rire' bien sûr.",
  },
  {
    id: "rse-5",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "Aucune réponse à tes messages, mais une story postée toutes les heures. Le temps, iel l'a, juste pas pour toi.",
  },
  {
    id: "rse-6",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "Il/elle balance dans un groupe ce que tu lui as confié en privé. Un coffre-fort avec la porte grande ouverte.",
  },
  {
    id: "rse-7",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "Après une embrouille, hop, une story indirecte bien sentie. Le courage de la confrontation, next level.",
  },
  {
    id: "rse-8",
    category: "amitie",
    subthemeId: "reseaux-amitie",
    text: "Il/elle t'unfollow discrètement après une dispute, sans un mot. La communication, on repassera.",
  },
];
