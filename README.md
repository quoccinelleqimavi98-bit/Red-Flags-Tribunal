# Red Flag Tribunal 🚩⚖️

Application mobile (React Native / Expo, TypeScript) : un jeu de soirée à
jouer entre amis pour débusquer les red flags, en amour comme en amitié.
L'app se concentre exclusivement sur ce jeu pour l'instant — pas de menu
multi-jeux.

Version volontairement simple : tout l'état (joueurs, avatars, scores) vit
en mémoire le temps de la session (jusqu'à fermeture de l'app), sans base
de données ni stats persistées.

## Identité visuelle

Direction artistique claire mais mordante, pas girly/pastel : fond blanc
cassé légèrement rosé (`#FFF7F9`), rose fuchsia vif en accent principal
(`#D1146D`, dégradés jusqu'à `#F2278A`), touches mauve/plum sombre pour la
catégorie Amitié, et un accent sombre quasi-noir (`#3A1428` / texte
`#1B0714`) pour le texte et les éléments importants — voir
`src/core/theme/colors.ts`. Le fort contraste texte/fond et les dégradés
saturés (jamais de rose délavé) gardent le côté "tribunal" tranchant
malgré une base claire.

Logo et icônes : illustration 3D dédiée ("RED FLAG TRIBUNAL", cœur brisé)
déclinée en plusieurs fichiers dans `assets/` —
- `icon.png` / `adaptive-icon.png` : icône de l'app (classique + Android
  adaptive, avec `android.adaptiveIcon.backgroundColor` réglé sur le ton
  rose pâle du badge d'origine dans `app.json`).
- `home-logo.png` : version détourée (fond transparent) du lockup,
  affichée en `<Image>` à la place de l'ancien titre texte sur l'écran
  d'accueil.
- `splash.png` : même lockup, centré sur le fond clair du splash screen
  (`app.json` → `splash.backgroundColor`).

Une police Google Font (`src/core/theme/typography.ts`), chargée via
`expo-font` + `@expo-google-fonts/oswald` : **Oswald** (demi-gras/gras,
capitales) pour les titres d'écran, badges et boutons — une sans-serif
condensée, effet "document officiel" — complétée par la police système
pour le texte courant. Le grand titre de l'app n'utilise plus de police
display dédiée : c'est désormais le logo illustré (`home-logo.png`), donc
Playfair Display a été retirée du bundle (police et dépendance).

Seuls les fichiers de graisse réellement utilisés sont importés
directement (`App.tsx`), pas le barrel du package `@expo-google-fonts`,
pour ne pas embarquer dans l'APK les ~12 variantes de police inutilisées.

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

## Parcours utilisateur

```
Home ──▶ [PlayerSetup, une seule fois] ──▶ Mode ──▶ Category ──▶ Subtheme ──▶ Play ──▶ Résultats
                                             ▲                                            │
                                             └────────── "Rejouer" (joueurs conservés) ◀──┘
```

- **Joueurs** (`PlayerSetupScreen`) : demandé juste après Home, uniquement
  la première fois (`players.length === 0` dans le store). Une fois
  configurés, ils restent en mémoire pour toute la session — "Rejouer" en
  fin de partie ramène directement à l'étape Mode sans repasser par la
  saisie des prénoms. La liste reste éditable à tout moment via la carte
  "N joueurs · gérer" sur l'écran Mode (route `PlayerSetup` avec
  `mode: "manage"`, qui revient en arrière au lieu d'avancer dans le
  parcours) — utile pour un retardataire ou quelqu'un qui part plus tôt.
- **Mode de jeu** (`ModeScreen`) puis **Catégorie** (`CategoryScreen`,
  💔 Amour ou 🤝 Amitié) puis **Sous-thème** (`SubthemeScreen`, filtré par
  la catégorie choisie).
- **Partie** (`PlayScreen`) puis **résultats**, avec deux actions :
  *Rejouer* (retour à Mode, joueurs conservés) ou *Terminer la soirée*
  (retour à Home).

L'écran d'accueil affiche aussi un encart discret rappelant que le jeu ne
nécessite aucune obligation de boire de l'alcool (gage adaptable : eau,
jus, gage rigolo...) — ton toujours fun, jamais moralisateur.

## Avatars

Chaque joueur choisit un avatar (10 emojis animaux) lors de sa création,
modifiable à tout moment depuis l'écran de gestion des joueurs. Le système
est conçu pour accueillir des illustrations custom plus tard sans rien
casser : un joueur ne stocke qu'un `avatarId` (`src/core/types.ts`), qui
pointe vers une entrée du registre `src/core/avatars.ts` :

```ts
export type AvatarDef =
  | { id: AvatarId; kind: "emoji"; emoji: string }
  | { id: AvatarId; kind: "image"; source: ImageSourcePropType };
```

Remplacer un emoji par une illustration dessinée revient à changer une
entrée de `AVATARS` (passer `kind` à `"image"` + fournir la source) —
aucun appelant (`<PlayerAvatar avatarId={...} />`) n'a besoin d'être
modifié, le composant gère déjà les deux cas. L'avatar s'affiche partout
où le prénom d'un joueur apparaît (vote, classement, bilan).

## Le jeu : Red Flag Tribunal

Dossier `src/games/redflag/` :
- `types.ts` — 2 catégories (💔 Amour, 🤝 Amitié), 9 sous-thèmes (5 Amour :
  premiers rendez-vous, réseaux sociaux, ex, famille du/de la partenaire,
  intimité ; 4 Amitié : groupe d'amis, colocation, argent entre potes,
  réseaux sociaux), 4 modes de jeu
- `data/situations.ts` — banque de 93 situations red flag (8 à 15 par
  sous-thème), en français, ton fun, mordant et bien tranché — utilisée
  par les modes Qui l'a déjà vécu ?, Le Verdict et Le Procès
- `data/mostLikelyPrompts.ts` — banque de 36 prompts "la personne la plus
  susceptible de..." (4 par sous-thème), utilisée uniquement par Ce
  Serait Qui — `engine/redflagEngine.ts` (`getCardBank`) sélectionne la
  bonne banque selon le mode
- `components/SituationCard.tsx` — la carte visuelle, volontairement
  grande (fond dégradé rouge pour Amour / or pour Amitié, cadre, emoji du
  sous-thème en filigrane), et `components/CardDeck.tsx` qui factorise la
  pile façon TOD (carte suivante visible en transparence derrière +
  carte active swipeable) partagée par les 4 modes
- `screens/PlayScreen.tsx` — un simple dispatcher : il pioche les cartes
  du sous-thème (`pickCards`) puis délègue à l'écran du mode choisi dans
  `screens/modes/`. Ajouter un mode = une entrée dans `types.ts` (`MODES`)
  + un écran dans `screens/modes/` + une ligne dans ce switch, sans
  toucher au reste de l'app :
  - **Qui l'a déjà vécu ?** (`ChillPlayScreen`) — au swipe (ou tap), la
    carte effectue une animation de retournement (`@components/FlipCard`,
    rotation 3D sur l'axe vertical) : au dos (`RosterBack`), la liste des
    joueurs avec deux options chacun, "Vécu 🚩" / "Pas vécu ✅", que le
    host coche individuellement. Une fois tout le monde renseigné (ou via
    le bouton "Valider"), la carte suivante apparaît, repartie sur sa
    face avant. Un compteur discret cumule les "Vécu" de chacun ; en fin
    de partie, la personne au plus haut compteur reçoit le titre "Le Red
    Flag de la soirée 🚩👑" (`CrownResults`). Pas de vote, pas de
    gorgées — ce mode reste volontairement léger, pensé pour la
    révélation et la discussion plutôt que la sanction.
  - **Le Verdict** (`VerdictPlayScreen`) — vote à main levée réel (🚩 en
    haut / ✅ en bas) puis, comme pour Qui l'a déjà vécu ?, la carte se
    retourne (même `@components/FlipCard`) : au dos (`VerdictBack`), le
    host reporte qui a levé la main en cochant "Red Flag 🚩" / "Pas Red
    Flag ✅" pour chaque joueur·se. Une fois le vote reporté, la face
    arrière affiche le résultat (🚩 vs ✅, minoritaires désigné·s) : la
    majorité ne boit rien, seul·e·s les minoritaires prennent une gorgée
    chacun·e, avant de passer à la carte suivante.
  - **Le Procès** 🎭 (`TrialPlayScreen`) — un·e accusé·e est tiré·e au
    sort dans la liste des joueurs via un "sac à jetons" mélangé
    (`shuffle` sur la liste complète à chaque cycle, plutôt qu'un tirage
    uniforme carte par carte) : tout le monde passe une fois avant qu'un
    nom ne puisse revenir, pour un tirage réellement équilibré et sans
    répétition rapprochée, sans bloquer le cas à 2 joueurs. L'accusé·e
    s'affiche dans un bandeau au-dessus de la carte ; un petit décompte
    (5, 4, 3, 2, 1 — de quoi lire la situation avant que le vrai chrono ne
    démarre) apparaît en overlay léger dans un coin de la carte — sans
    jamais la masquer — puis le compte à rebours de 30 secondes démarre
    pendant lequel iel doit défendre la situation à voix haute comme
    un·e avocat·e. Une fois le temps (ou la plaidoirie) écoulé, le host
    swipe la carte : à gauche = "raté" (pas convaincant·e) affiche un
    petit message ludique annonçant que l'accusé·e boit une gorgée avant
    de passer à la suivante ; à droite = "validé" (convaincant·e, tout le
    reste du groupe boit) — deux boutons "Raté"/"Validé" dupliquent le
    geste pour rester jouable sans swipe.
  - **Ce Serait Qui** 🔮 (`WhoIsMostLikelyPlayScreen`) — un prompt du
    type "la personne la plus susceptible de..." s'affiche ; tout le
    monde désigne en même temps qui ça évoque dans le groupe, sans
    interaction avec l'app pendant cette phase. Le host retourne ensuite
    la carte (même mécanique de flip que Qui l'a déjà vécu ?) pour
    accéder au dos (`DesignationBack`), où il sélectionne un ou plusieurs
    noms comme "red flag(s) désigné·s" pour cette carte (sélection
    multiple) : chaque personne désignée boit une gorgée, carte après
    carte.

Le Verdict, Le Procès et Ce Serait Qui partagent le même écran de fin
(`SipsResults`) : classement des gorgées de chacun·e, et un encart
spécial "☠️ Grand·e perdant·e de la soirée" qui inflige une gorgée
supplémentaire à qui a le score le plus élevé (ex æquo compris).

Toutes les cartes sont piochées et mélangées aléatoirement à chaque
partie. Rien n'est sauvegardé d'une soirée à l'autre : à la fermeture de
l'app, tout repart de zéro (joueurs, avatars, compteurs).

## Structure du projet

```
App.tsx
src/
  core/
    theme/          couleurs, typographie (Playfair Display + Oswald), espacements
    navigation/      RootNavigator + types de routes
    store/           état de session (joueurs actifs) via zustand, en mémoire
    utils/           utilitaires partagés (shuffle, ...)
    types.ts         type Player partagé
    avatars.ts       registre des avatars (emoji aujourd'hui, image demain)
  components/        composants UI partagés (Button, Card, SwipeCard,
                      FlipCard, PlayerAvatar, ScreenBackground, SectionTitle)
  screens/           Home, PlayerSetup (config + gestion des joueurs)
  games/
    redflag/         Red Flag Tribunal — types, données, moteur, écrans
```
