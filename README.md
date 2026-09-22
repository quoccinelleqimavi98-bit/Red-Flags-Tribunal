# Soirée Games 🎉

Application mobile (React Native / Expo, TypeScript) regroupant plusieurs
mini-jeux à jouer entre amis lors d'une soirée. L'architecture est conçue
pour qu'ajouter un nouveau mini-jeu ne nécessite (presque) jamais de
toucher au cœur de l'application.

## Stack technique

- **Expo (SDK 51) + React Native 0.74 + TypeScript**
- **expo-sqlite** pour une base de données locale persistante (survit aux
  mises à jour de l'app et aux régénérations d'APK)
- **React Navigation** (native-stack) pour la navigation
- **Zustand** pour le petit état de session (joueurs actifs de la soirée)
- **expo-linear-gradient** pour l'habillage visuel "soirée"

## Lancer le projet

> **Node.js** : utilisez Node 18 ou 20 LTS (version recommandée par Expo
> SDK 51). Node 22 provoque une erreur de résolution ESM dans certains
> paquets natifs (dont `expo-sqlite`) lors de commandes comme
> `expo export`/`expo prebuild` — sans rapport avec le code de l'app.

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
**automatiquement** à chaque push sur `main` via GitHub Actions — voir la
section suivante.

## Configurer les builds Android automatiques (GitHub Actions + EAS)

Le workflow `.github/workflows/build-android-apk.yml` construit un APK
Android sur les serveurs **EAS Build** (Expo Application Services) à
chaque push sur `main`, puis le publie comme fichier `.apk` téléchargeable
dans une nouvelle **Release GitHub** (déclenchable aussi manuellement
depuis l'onglet *Actions* → *Build Android APK* → *Run workflow*).

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

6. **Déclencher un build** : poussez un commit sur `main` (ou lancez le
   workflow manuellement depuis l'onglet *Actions*). Le premier build
   prend généralement 10 à 20 minutes le temps qu'EAS compile l'APK sur
   ses serveurs ; EAS génère et stocke automatiquement un keystore de
   signature Android la première fois (aucune action requise de votre
   part). Une fois terminé, une nouvelle Release GitHub apparaît avec
   l'APK en pièce jointe, prêt à être téléchargé et installé sur un
   téléphone Android (activer "Sources inconnues" pour l'installer hors
   Play Store).

> Le profil `preview` de `eas.json` génère un `.apk` classique (et non un
> `.aab` réservé au Play Store), adapté à une installation directe entre
> amis.

> Remarque : ce dépôt contient le code source complet, mais aucune
> installation de dépendances ni build mobile n'a été exécutée dans
> l'environnement qui a généré ce patch (pas d'accès à un SDK Android/iOS).
> Un `npm install` est nécessaire avant la première exécution.

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

C'est tout : le menu des mini-jeux, la navigation (`GameConfig`/`GamePlay`
génériques) et l'écran de stats détectent automatiquement le nouveau jeu.
Aucune autre partie de l'app n'a besoin d'être modifiée — c'est ce qui
permet de livrer de nouveaux jeux via de simples patchs.

## Persistance & stats ("Hall of Fame")

Toutes les données de jeu sont stockées dans une base **SQLite locale**
(`src/core/db/`), avec un système de migrations (`schema.ts`) : chaque
évolution de schéma s'ajoute en fin de liste `MIGRATIONS`, sans jamais
modifier une migration déjà publiée, pour ne jamais perdre les stats des
joueurs lors d'une mise à jour de l'app.

Tables principales :
- `players` — joueurs identifiés par prénom normalisé (pas de compte)
- `game_sessions` / `session_players` — une soirée = une session
- `game_results` — score, bonnes réponses, gorgées données/reçues par
  joueur et par partie
- `quiz_answers` — détail question par question (thème, difficulté,
  indice utilisé) pour des stats fines
- `sip_events` — gages / gorgées bonus-malus déclenchés pendant la partie

L'écran **Hall of Fame** (`src/screens/StatsScreen.tsx`) agrège ces
données par période (jour / mois / année / toujours) via
`src/core/db/repositories/statsRepo.ts`, avec :
- des stats globales (parties jouées, bonnes réponses, gorgées...)
- des **superlatifs** décalés ("Le Cerveau du groupe", "Le Semeur de
  Chaos", "L'Éponge de la Soirée", "Le Cancre du Quiz"...)
- un classement général par joueur
- le taux de réussite par thème de quiz

## Premier mini-jeu : Le Quiz Ultime

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

Toutes les questions et réponses sont piochées et mélangées aléatoirement
à chaque partie pour une rejouabilité infinie.

## Structure du projet

```
App.tsx
src/
  core/
    theme/          couleurs, typographie, espacements ("ambiance soirée")
    navigation/      RootNavigator + types de routes
    db/              SQLite : schéma, migrations, repositories
    store/           état de session (joueurs actifs) via zustand
    games/           registre central des mini-jeux
  components/        composants UI partagés (Button, Card, Chip, ...)
  screens/           écrans transverses (Home, PlayerSetup, GameMenu, Stats)
  games/
    quiz/            premier mini-jeu (voir ci-dessus)
```
