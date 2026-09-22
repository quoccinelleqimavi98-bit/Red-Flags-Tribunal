import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "@core/theme";

interface Option<T extends string> {
  value: T;
  label: string;
  emoji?: string;
}

interface SegmentedToggleProps<T extends string> {
  label: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
}

export function SegmentedToggle<T extends string>({
  label,
  value,
  options,
  onChange,
}: SegmentedToggleProps<T>) {
  return (
    <View style={styles.container}>
      <Text style={[typography.bodyBold, styles.label]}>{label}</Text>
      <View style={styles.track}>
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <Pressable
              key={option.value}
              onPress={() => onChange(option.value)}
              style={[styles.segment, selected && styles.segmentSelected]}
            >
              <Text
                style={[
                  typography.bodyBold,
                  styles.segmentLabel,
                  { color: selected ? "#1a0a2e" : colors.textMuted },
                ]}
              >
                {option.emoji ? `${option.emoji} ` : ""}
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    color: colors.text,
    marginBottom: spacing.sm,
  },
  track: {
    flexDirection: "row",
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.pill,
    padding: 4,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  segment: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    alignItems: "center",
  },
  segmentSelected: {
    backgroundColor: colors.accent,
  },
  segmentLabel: {
    textAlign: "center",
  },
});
