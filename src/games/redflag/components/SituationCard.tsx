import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, radius, spacing, typography } from "@core/theme";
import {
  RedFlagCategoryInfo,
  RedFlagSituation,
  RedFlagSubtheme,
} from "../types";

interface SituationCardProps {
  situation: RedFlagSituation;
  category: RedFlagCategoryInfo;
  subtheme: RedFlagSubtheme;
}

export function SituationCard({
  situation,
  category,
  subtheme,
}: SituationCardProps) {
  const gradient =
    category.id === "amour" ? colors.gradientAmour : colors.gradientAmitie;
  const textColor = category.id === "amour" ? colors.text : colors.background;
  const mutedTextColor =
    category.id === "amour"
      ? "rgba(247, 237, 226, 0.75)"
      : "rgba(12, 5, 8, 0.65)";

  return (
    <LinearGradient
      colors={gradient}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 0.9, y: 1 }}
      style={styles.card}
    >
      <View style={styles.frame}>
        <View style={styles.headerRow}>
          <Text style={[typography.caption, { color: mutedTextColor }]}>
            {category.emoji} {category.label.toUpperCase()}
          </Text>
          <Text style={[typography.caption, { color: mutedTextColor }]}>
            {subtheme.emoji} {subtheme.label}
          </Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.watermark}>{subtheme.emoji}</Text>
          <Text style={[typography.title, styles.text, { color: textColor }]}>
            {situation.text}
          </Text>
        </View>

        <Text style={styles.corner}>🚩</Text>
      </View>
    </LinearGradient>
  );
}

const CARD_ASPECT_RATIO = 0.64;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    aspectRatio: CARD_ASPECT_RATIO,
    borderRadius: radius.lg,
    padding: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  frame: {
    flex: 1,
    borderRadius: radius.lg - 2,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.35)",
    padding: spacing.lg,
    justifyContent: "space-between",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  watermark: {
    fontSize: 72,
    opacity: 0.18,
    position: "absolute",
  },
  text: {
    textAlign: "center",
    lineHeight: 30,
  },
  corner: {
    fontSize: 22,
    alignSelf: "flex-end",
  },
});
