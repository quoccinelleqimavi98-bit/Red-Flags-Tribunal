import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, radius, spacing, typography } from "@core/theme";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "gold" | "ghost" | "danger";
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  style?: ViewStyle;
}

export function Button({
  label,
  onPress,
  variant = "primary",
  disabled,
  loading,
  icon,
  style,
}: ButtonProps) {
  const isGhost = variant === "ghost";
  const isGold = variant === "gold";
  const gradientColors = isGold
    ? colors.gradientGold
    : variant === "danger"
      ? colors.gradientDanger
      : colors.gradientPrimary;
  const solidTextColor = isGold ? colors.background : colors.text;

  const content = (
    <>
      {loading ? (
        <ActivityIndicator color={isGhost ? colors.primary : solidTextColor} />
      ) : (
        <Text
          style={[
            typography.subtitle,
            styles.label,
            isGhost
              ? styles.labelGhost
              : { color: solidTextColor },
          ]}
        >
          {icon ? `${icon}  ` : ""}
          {label}
        </Text>
      )}
    </>
  );

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        { opacity: disabled ? 0.5 : pressed ? 0.85 : 1 },
        style,
      ]}
    >
      {isGhost ? (
        <Text
          style={[styles.ghostInner, typography.subtitle, styles.labelGhost]}
        >
          {icon ? `${icon}  ` : ""}
          {label}
        </Text>
      ) : (
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {content}
        </LinearGradient>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.pill,
    overflow: "hidden",
  },
  gradient: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  ghostInner: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    textAlign: "center",
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.pill,
  },
  label: {
    textAlign: "center",
  },
  labelGhost: {
    color: colors.text,
  },
});
