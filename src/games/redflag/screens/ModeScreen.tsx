import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenBackground } from "@components/ScreenBackground";
import { Card } from "@components/Card";
import { SectionTitle } from "@components/SectionTitle";
import { colors, spacing, typography } from "@core/theme";
import { RootStackParamList } from "@core/navigation/types";
import { MODES, SUBTHEMES } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Mode">;

export function ModeScreen({ navigation, route }: Props) {
  const { category, subthemeId } = route.params;
  const subtheme = SUBTHEMES.find((s) => s.id === subthemeId);

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
            <Text style={[typography.bodyBold, styles.back]}>‹ Retour</Text>
          </Pressable>
          <View style={styles.dots}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={[styles.dot, styles.dotActive]} />
            <View style={[styles.dot, styles.dotActive]} />
          </View>
        </View>

        <SectionTitle
          title="Étape 3 / 3"
          subtitle={`${subtheme?.emoji} ${subtheme?.label} — choisissez le mode de jeu`}
        />

        {MODES.map((mode) => (
          <Pressable
            key={mode.id}
            onPress={() =>
              navigation.navigate("Play", { category, subthemeId, mode: mode.id })
            }
          >
            <Card accentColor={colors.gold} style={styles.optionCard}>
              <Text style={styles.optionEmoji}>{mode.emoji}</Text>
              <View style={styles.optionBody}>
                <Text style={[typography.subtitle, styles.optionLabel]}>
                  {mode.label}
                </Text>
                <Text style={[typography.body, styles.optionDesc]}>
                  {mode.description}
                </Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </Card>
          </Pressable>
        ))}
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  back: {
    color: colors.primary,
  },
  dots: {
    flexDirection: "row",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.surfaceAlt,
    marginLeft: spacing.xs,
  },
  dotActive: {
    backgroundColor: colors.primary,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  optionEmoji: {
    fontSize: 30,
    marginRight: spacing.md,
  },
  optionBody: {
    flex: 1,
  },
  optionLabel: {
    color: colors.text,
  },
  optionDesc: {
    color: colors.textMuted,
    marginTop: 2,
  },
  chevron: {
    fontSize: 26,
    color: colors.textFaint,
    marginLeft: spacing.sm,
  },
});
