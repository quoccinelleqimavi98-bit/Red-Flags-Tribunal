import React from "react";
import { StyleSheet, Text } from "react-native";
import { colors, spacing, typography } from "@core/theme";
import { RedFlagModeInfo } from "../types";

/** Bandeau affiché en haut de chaque écran de partie, pour rappeler en
 * permanence dans quel mode de jeu on se trouve. */
export function ModeHeader({ mode }: { mode: RedFlagModeInfo }) {
  return (
    <Text style={[typography.subtitle, styles.text]}>
      {mode.emoji} {mode.label}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.ink,
    textAlign: "center",
    marginBottom: spacing.xs,
  },
});
