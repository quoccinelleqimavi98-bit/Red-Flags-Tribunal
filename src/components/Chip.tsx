import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radius, spacing, typography } from "@core/theme";

interface ChipProps {
  label: string;
  emoji?: string;
  selected: boolean;
  onPress: () => void;
  color?: string;
}

export function Chip({ label, emoji, selected, onPress, color }: ChipProps) {
  const tint = color ?? colors.primary;
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: selected ? tint + "26" : colors.surfaceAlt,
          borderColor: selected ? tint : colors.border,
        },
      ]}
    >
      <Text
        style={[
          typography.bodyBold,
          { color: selected ? tint : colors.textMuted },
        ]}
      >
        {emoji ? `${emoji} ` : ""}
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
});
