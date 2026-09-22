import { AvatarId } from "./avatars";

/** Joueur actif pour la soirée en cours, tenu uniquement en mémoire (pas de persistance). */
export interface Player {
  id: number;
  name: string;
  avatarId: AvatarId;
}
