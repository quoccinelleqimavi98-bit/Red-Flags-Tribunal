/**
 * Registre des avatars joueurs. Chaque joueur ne stocke qu'un `avatarId`
 * (voir `Player` dans `types.ts`) — jamais l'emoji ou l'image directement.
 * Pour remplacer un avatar emoji par une illustration custom plus tard,
 * il suffit de changer l'entrée correspondante ici (kind: "image" + une
 * source d'image), sans toucher au reste de l'app : tout le monde lit
 * l'avatar via `getAvatar(avatarId)` / le composant `<PlayerAvatar>`.
 */
import { ImageSourcePropType } from "react-native";

export type AvatarId =
  | "fox"
  | "cat"
  | "dog"
  | "lion"
  | "panda"
  | "rabbit"
  | "koala"
  | "tiger"
  | "unicorn"
  | "bear";

export type AvatarDef =
  | { id: AvatarId; kind: "emoji"; emoji: string }
  | { id: AvatarId; kind: "image"; source: ImageSourcePropType };

export const AVATARS: AvatarDef[] = [
  { id: "fox", kind: "emoji", emoji: "🦊" },
  { id: "cat", kind: "emoji", emoji: "🐱" },
  { id: "dog", kind: "emoji", emoji: "🐶" },
  { id: "lion", kind: "emoji", emoji: "🦁" },
  { id: "panda", kind: "emoji", emoji: "🐼" },
  { id: "rabbit", kind: "emoji", emoji: "🐰" },
  { id: "koala", kind: "emoji", emoji: "🐨" },
  { id: "tiger", kind: "emoji", emoji: "🐯" },
  { id: "unicorn", kind: "emoji", emoji: "🦄" },
  { id: "bear", kind: "emoji", emoji: "🐻" },
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
