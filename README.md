# Red Flag Tribunal 🚩⚖️

Application mobile (React Native / Expo, TypeScript) regroupant plusieurs
mini-jeux à jouer entre amis lors d'une soirée. L'architecture est conçue
pour qu'ajouter un nouveau mini-jeu ne nécessite (presque) jamais de
toucher au cœur de l'application.

Version volontairement simple : tout l'état (joueurs, scores) vit en
mémoire le temps de la soirée, sans base de données ni stats persistées.

## Identité visuelle

Direction artistique sombre et affirmée, pas pastel : fond noir/bordeaux
nuit (`#0c0508`), rouge vif accusateur en accent (`#e8112d`), touches or
(`#d4af37`) et blanc cassé (`#f7ede2`) pour l'élégance — voir
`src/core/theme/colors.ts`.

Deux polices Google Fonts (`src/core/theme/typography.ts`), chargées via
`expo-font` + `@expo-google-fonts/*` :
- **Playfair Display** (graisse 900 Black) pour le grand titre de l'app —
  un serif dramatique à fort contraste, effet "acte d'accusation".
- **Oswald** (demi-gras/gras, capitales) pour les titres d'écran, badges
  et boutons — une sans-serif condensée, effet "document officiel".

D'autres pistes envisagées pour le titre : **Bebas Neue** (ultra-condensée,
très graphique/poster, mais un peu trop "sport" et pas assez féminine) et
**Anton** (encore plus massive, trop brutale pour l'équilibre "mordant
mais élégant" recherché). Playfair Display Black a été retenu pour son
contraste de graisse (fins/épais) qui donne du caractère sans perdre en
élégance, complété par Oswald pour que le reste de l'interface (labels,
boutons, badges) reste lisible à petite taille — un serif dramatique
partout aurait nui à la lisibilité.

Seuls les fichiers de graisse réellement utilisés sont importés
directement (`App.tsx`), pas le barrel des packages `@expo-google-fonts`,
pour ne pas embarquer dans l'APK les ~20 variantes de police inutilisées.

## Stack technique

- **Expo (SDK 51) + React Native 0.74 + TypeScript**
- **React Navigation** (native-stack) pour la navigation
- **Zustand** pour l'état de session (joueurs actifs de la soirée, en
  mémoire uniquement — réinitialisé à chaque relance de l'app)
- **expo-linear-gradient** pour l'habillage visuel
- **expo-font + Google Fonts** pour l'identité typographique

## Lancer le projet

```bash
npm install
npx expo start
```

Puis scannez le QR code avec l'app Expo Go, ou lancez un émulateur Android
(`npm run android`) / simulateur iOS (`npm run ios`).

Pour générer un APK Android manuellement depuis votre machine :

```bash
npx eas build -p android --profile preview
```

(nécessite un compte Expo/EAS, voir `eas.json` ; ou `npx expo run:android`
pour un build local avec Android Studio installé). Un APK est aussi généré
**automatiquement via GitHub Actions** sans rien installer localement —
voir la section suivante.

## Générer un APK sans rien installer localement (GitHub Actions + EAS)

Le workflow `.github/workflows/build-android-apk.yml` construit l'APK
Android sur les serveurs **EAS Build** (Expo Application Services), pas sur
votre machine. Deux façons de récupérer le résultat :

- **À chaque push, sur n'importe quelle branche** : l'APK est déposé comme
  **artifact du run** — onglet *Actions* → cliquez sur le run → section
  *Artifacts* en bas de page → téléchargez le `.zip` (contient le
  `.apk`). Pratique pour tester rapidement une branche, mais l'artifact
  expire au bout d'un moment (rétention par défaut du dépôt).
- **En poussant un tag de version `vX.Y.Z`** (ex. `v1.0.0`) : en plus de
  l'artifact, une **Release GitHub** est créée avec l'APK en pièce jointe
  permanente — onglet *Releases* du dépôt. C'est la méthode à privilégier
  pour un lien stable à partager ou garder.

Le workflow reste aussi déclenchable manuellement depuis l'onglet
*Actions* → *Build Android APK* → *Run workflow*.

Étapes à suivre **une seule fois** pour l'activer :

1. **Créer un compte Expo** (gratuit) sur https://expo.dev/signup si vous
   n'en avez pas déjà un.

2. **Installer eas-cli en local** et vous connecter :
   ```bash
   npm install -g eas-cli
   eas login
   ```

3. **Lier le projet à EAS**, depuis la racine du dépôt :
   ```bash
   eas init
   ```
   Cette commande crée un projet sur expo.dev et ajoute un champ
   `extra.eas.projectId` dans `app.json`. **Committez et pushez** ce
   changement — sans lui, le workflow ne peut pas builder l'app.

4. **Générer un token d'accès EAS** pour la CI :
   - Le plus simple : allez sur
     https://expo.dev/accounts/**[votre-compte]**/settings/access-tokens
     → *Create token* → donnez-lui un nom (ex. `github-actions`) → copiez
     la valeur affichée (elle ne sera plus jamais visible ensuite).
   - Recommandé pour un projet à plusieurs personnes : créez plutôt un
     **robot user** dédié à la CI (rôle limité, révocable indépendamment
     de votre compte perso) en suivant
     https://docs.expo.dev/accounts/programmatic-access/, puis générez un
     token pour ce robot.

5. **Ajouter le token comme secret GitHub** : dans le dépôt GitHub, allez
   dans *Settings* → *Secrets and variables* → *Actions* →
   *New repository secret* :
   - Nom : `EXPO_TOKEN`
   - Valeur : le token copié à l'étape 4

6. **Déclencher un build** : poussez simplement un commit (n'importe quelle
   branche), ou créez un tag `v1.0.0` pour obtenir en plus une Release, ou
   lancez le workflow manuellement depuis l'onglet *Actions*. Le premier
   build prend généralement 10 à 20 minutes le temps qu'EAS compile l'APK
   sur ses serveurs ; EAS génère et stocke automatiquement un keystore de
   signature Android la première fois (aucune action requise de votre
   part). Une fois terminé, récupérez l'APK dans les *Artifacts* du run
   (tout push) ou dans *Releases* (si vous avez poussé un tag), puis
   installez-le sur un téléphone Android (activer "Sources inconnues"
   pour l'installer hors Play Store).

> Le profil `preview` de `eas.json` génère un `.apk` classique (et non un
> `.aab` réservé au Play Store), adapté à une installation directe entre
> amis.

> ⚠️ Le workflow se déclenche sur **chaque push, toute branche confondue**
> — chaque run consomme un build EAS (quota limité sur le plan gratuit
> Expo, ~30 builds/mois). Si vous poussez très souvent, pensez à retirer
> la clé `branches: ["**"]` de `on.push` dans le workflow pour la
> restreindre à une branche précise (ex. `[main]`).

## Architecture — comment ajouter un nouveau mini-jeu

Toute la logique de découverte des jeux passe par un **registre central**
(`src/core/games/registry.ts`). Un mini-jeu est un simple objet qui respecte
l'interface `GameModule` (`src/core/games/types.ts`) :

```ts
export interface GameModule<TConfig> {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  color: string;
  minPlayers: number;
  variantCount?: number;
  ConfigScreen: ComponentType<GameConfigScreenProps>;
  PlayScreen: ComponentType<GamePlayScreenProps<TConfig>>;
}
```

Pour ajouter un mini-jeu "Ballon Prisonnier des Vannes" par exemple :

1. Créer `src/games/ballon-prisonnier/` avec :
   - `types.ts` (config spécifique au jeu)
   - `screens/ConfigScreen.tsx` (paramétrage avant de lancer)
   - `screens/PlayScreen.tsx` (déroulé de la partie)
   - `index.ts` qui appelle `registerGame({...})`
2. Ajouter une ligne `import "../../games/ballon-prisonnier";` dans
   `src/core/games/index.ts`.

C'est tout : le menu des mini-jeux et la navigation (`GameConfig`/`GamePlay`
génériques) détectent automatiquement le nouveau jeu. Aucune autre partie
de l'app n'a besoin d'être modifiée — c'est ce qui permet de livrer de
nouveaux jeux via de simples patchs.

## Mini-jeu : Red Flag Tribunal

Dossier `src/games/redflag/` — le jeu qui donne son nom à l'app. Après la
configuration des joueurs, un assistant en 3 étapes (géré entièrement dans
`RedFlagConfigScreen.tsx`, sans toucher à la navigation centrale) :

1. **Catégorie** : 💔 Amour ou 🤝 Amitié
2. **Sous-thème** : 5 sous-thèmes Amour (premiers rendez-vous, réseaux
   sociaux, ex, famille du/de la partenaire, intimité) et 4 sous-thèmes
   Amitié (groupe d'amis, colocation, argent entre potes, réseaux
   sociaux) — `data/situations.ts` contient une banque de 8 situations par
   sous-thème (72 au total), en français, ton fun et provocateur
3. **Mode de jeu** :
   - **Red Flag ou Pas** — mode chill, les situations défilent une par
     une pour lancer la discussion, sans score.
   - **Le Verdict** — vote à main levée : tout le monde lève la main
     (🚩 en haut / ✅ en bas), le host reporte ensuite qui a voté quoi en
     tapant sur les prénoms, l'app calcule la minorité et lui inflige une
     gorgée chacun. Bilan des gorgées en fin de partie (en mémoire pour
     la soirée, non sauvegardé).

## Mini-jeu : Le Quiz Ultime

Dossier `src/games/quiz/` :
- `data/questions.ts` — banque de ~70 questions réparties sur 6 thèmes
  (Manga, Jeux Vidéo, Séries, Films, Musique, Culture Générale), avec 3
  niveaux de difficulté, un indice et une anecdote par question
- `data/sipEvents.ts` — banque d'événements surprise (bonus/malus de
  gorgées, gages, distributions) tirés aléatoirement pendant la partie
- `engine/quizEngine.ts` — pioche/mélange aléatoire des questions (pas de
  répétition dans une partie), calcul du barème (facile/moyen/difficile,
  pénalité d'indice, bonus de vitesse en mode "au plus rapide")
- `screens/QuizConfigScreen.tsx` — choix des thèmes, nombre de questions,
  mode de jeu (chacun son tour / au plus rapide), avec ou sans
  propositions de réponses
- `screens/QuizPlayScreen.tsx` — déroulé de la partie, gestion du buzz en
  mode "au plus rapide", indices, événements surprise, écran de résultats
  (classement final, gorgées) tenu en mémoire pour la soirée en cours

Toutes les questions et réponses sont piochées et mélangées aléatoirement
à chaque partie pour une rejouabilité infinie. Les scores et gorgées ne
sont pas sauvegardés d'une soirée à l'autre : à la fermeture de l'app, tout
repart de zéro.

## Structure du projet

```
App.tsx
src/
  core/
    theme/          couleurs, typographie (Playfair Display + Oswald), espacements
    navigation/      RootNavigator + types de routes
    store/           état de session (joueurs actifs) via zustand, en mémoire
    games/           registre central des mini-jeux
    utils/           utilitaires partagés (shuffle, ...)
    types.ts         type Player partagé
  components/        composants UI partagés (Button, Card, Chip, ...)
  screens/           écrans transverses (Home, PlayerSetup, GameMenu)
  games/
    redflag/         Red Flag Tribunal (voir ci-dessus)
    quiz/            Le Quiz Ultime (voir ci-dessus)
```
