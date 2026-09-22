import React from "react";
import { Image, Text } from "react-native";
import { AvatarId, getAvatar } from "@core/avatars";

interface PlayerAvatarProps {
  avatarId: AvatarId;
  size?: number;
}

/** Rend l'avatar d'un joueur, quel que soit son type (emoji aujourd'hui,
 * image custom potentiellement demain) — les appelants n'ont jamais à
 * savoir lequel c'est. */
export function PlayerAvatar({ avatarId, size = 24 }: PlayerAvatarProps) {
  const avatar = getAvatar(avatarId);
  if (avatar.kind === "image") {
    return (
      <Image
        source={avatar.source}
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
    );
  }
  return <Text style={{ fontSize: size }}>{avatar.emoji}</Text>;
}
