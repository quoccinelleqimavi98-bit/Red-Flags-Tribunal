import React, { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { colors, radius, spacing } from "@core/theme";

interface CardProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
  accentColor?: string;
}

export function Card({ children, style, accentColor }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        accentColor ? { borderColor: accentColor + "55" } : null,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
