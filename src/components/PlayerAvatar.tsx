import React from "react";
import { Image, Text, View } from "react-native";
import { AvatarId, getAvatar } from "@core/avatars";
import { colors } from "@core/theme";

interface PlayerAvatarProps {
  avatarId: AvatarId;
  size?: number;
}

/** Rend l'avatar d'un joueur, quel que soit son type (illustration custom
 * ou emoji de secours) — les appelants n'ont jamais à savoir lequel c'est.
 * Les illustrations reposent sur un petit cadre rose (palette de l'app)
 * pour rester lisibles sur n'importe quel fond ; `resizeMode="contain"`
 * garantit qu'elles s'affichent toujours entières, jamais rognées ni
 * déformées, quelle que soit la taille demandée. */
export function PlayerAvatar({ avatarId, size = 24 }: PlayerAvatarProps) {
  const avatar = getAvatar(avatarId);
  if (avatar.kind === "image") {
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.22,
          backgroundColor: colors.surfaceAlt,
          borderWidth: 1,
          borderColor: colors.border,
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Image
          source={avatar.source}
          style={{ width: size * 0.86, height: size * 0.86 }}
          resizeMode="contain"
        />
      </View>
    );
  }
  return <Text style={{ fontSize: size }}>{avatar.emoji}</Text>;
}
