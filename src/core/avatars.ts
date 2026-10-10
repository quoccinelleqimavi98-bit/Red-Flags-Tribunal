/**
 * Registre des avatars joueurs. Chaque joueur ne stocke qu'un `avatarId`
 * (voir `Player` dans `types.ts`) — jamais l'emoji ou l'image directement.
 * Tout le monde lit l'avatar via `getAvatar(avatarId)` / le composant
 * `<PlayerAvatar>`, qui gère les deux `kind` (emoji ou image) de façon
 * transparente pour l'appelant.
 *
 * Pour ajouter un avatar : dépose le PNG dans `assets/avatars/` (carré,
 * fond transparent, 512px de côté max, <300 Ko — redimensionne-le avant
 * si besoin, React Native ne le fait pas pour toi) puis ajoute une ligne
 * ici avec un nouvel id et son `require(...)`. React Native ne permet
 * pas de `require` un chemin dynamique, donc chaque source doit être un
 * `require(...)` explicite, littéral, comme ci-dessous.
 *
 * `kind: "emoji"` reste un type valide : utile en secours si jamais une
 * illustration manque pour un id donné, sans avoir à toucher au reste de
 * l'app (`PlayerAvatar` sait déjà afficher les deux).
 */
import { ImageSourcePropType } from "react-native";

export type AvatarId =
  | "avatar-01"
  | "avatar-02"
  | "avatar-03"
  | "avatar-04"
  | "avatar-05"
  | "avatar-06"
  | "avatar-07"
  | "avatar-08"
  | "avatar-09"
  | "avatar-10"
  | "avatar-11"
  | "avatar-12"
  | "avatar-13"
  | "avatar-14"
  | "avatar-15";

export type AvatarDef =
  | { id: AvatarId; kind: "emoji"; emoji: string }
  | { id: AvatarId; kind: "image"; source: ImageSourcePropType };

export const AVATARS: AvatarDef[] = [
  { id: "avatar-01", kind: "image", source: require("../../assets/avatars/avatar-01.png") },
  { id: "avatar-02", kind: "image", source: require("../../assets/avatars/avatar-02.png") },
  { id: "avatar-03", kind: "image", source: require("../../assets/avatars/avatar-03.png") },
  { id: "avatar-04", kind: "image", source: require("../../assets/avatars/avatar-04.png") },
  { id: "avatar-05", kind: "image", source: require("../../assets/avatars/avatar-05.png") },
  { id: "avatar-06", kind: "image", source: require("../../assets/avatars/avatar-06.png") },
  { id: "avatar-07", kind: "image", source: require("../../assets/avatars/avatar-07.png") },
  { id: "avatar-08", kind: "image", source: require("../../assets/avatars/avatar-08.png") },
  { id: "avatar-09", kind: "image", source: require("../../assets/avatars/avatar-09.png") },
  { id: "avatar-10", kind: "image", source: require("../../assets/avatars/avatar-10.png") },
  { id: "avatar-11", kind: "image", source: require("../../assets/avatars/avatar-11.png") },
  { id: "avatar-12", kind: "image", source: require("../../assets/avatars/avatar-12.png") },
  { id: "avatar-13", kind: "image", source: require("../../assets/avatars/avatar-13.png") },
  { id: "avatar-14", kind: "image", source: require("../../assets/avatars/avatar-14.png") },
  { id: "avatar-15", kind: "image", source: require("../../assets/avatars/avatar-15.png") },
];

export const DEFAULT_AVATAR_ID: AvatarId = AVATARS[0].id;

export function getAvatar(avatarId: AvatarId): AvatarDef {
  return AVATARS.find((a) => a.id === avatarId) ?? AVATARS[0];
}

/** Attribution par défaut d'un avatar non déjà pris, pour un nouveau joueur. */
export function pickNextAvatarId(takenIds: AvatarId[]): AvatarId {
  const free = AVATARS.find((a) => !takenIds.includes(a.id));
  return free ? free.id : AVATARS[takenIds.length % AVATARS.length].id;
}
