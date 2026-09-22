import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "@core/theme";

interface StepperInputProps {
  label: string;
  value: number;
  options: number[];
  onChange: (value: number) => void;
  suffix?: string;
}

export function StepperInput({
  label,
  value,
  options,
  onChange,
  suffix,
}: StepperInputProps) {
  return (
    <View style={styles.container}>
      <Text style={[typography.bodyBold, styles.label]}>{label}</Text>
      <View style={styles.row}>
        {options.map((option) => {
          const selected = option === value;
          return (
            <Pressable
              key={option}
              onPress={() => onChange(option)}
              style={[
                styles.option,
                selected && styles.optionSelected,
              ]}
            >
              <Text
                style={[
                  typography.bodyBold,
                  { color: selected ? "#1a0a2e" : colors.textMuted },
                ]}
              >
                {option}
                {suffix ?? ""}
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
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  option: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  optionSelected: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
});
