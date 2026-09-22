import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "@core/theme";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <View style={styles.container}>
      <Text style={[typography.caption, { color: colors.accent }]}>
        {title}
      </Text>
      {subtitle ? (
        <Text style={[typography.body, styles.subtitle]}>{subtitle}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.textMuted,
    marginTop: 2,
  },
});
