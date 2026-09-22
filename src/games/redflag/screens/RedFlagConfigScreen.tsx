import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenBackground } from "@components/ScreenBackground";
import { Card } from "@components/Card";
import { SectionTitle } from "@components/SectionTitle";
import { colors, radius, spacing, typography } from "@core/theme";
import { GameConfigScreenProps } from "@core/games/types";
import { SITUATIONS } from "../data/situations";
import {
  CATEGORIES,
  MODES,
  RedFlagCategory,
  RedFlagConfig,
  RedFlagMode,
  SUBTHEMES,
} from "../types";

type Step = "category" | "subtheme" | "mode";

const STEP_ORDER: Step[] = ["category", "subtheme", "mode"];

export function RedFlagConfigScreen({ onLaunch }: GameConfigScreenProps) {
  const [step, setStep] = useState<Step>("category");
  const [category, setCategory] = useState<RedFlagCategory | null>(null);
  const [subthemeId, setSubthemeId] = useState<string | null>(null);

  const stepIndex = STEP_ORDER.indexOf(step);
  const subthemes = SUBTHEMES.filter((s) => s.category === category);

  function selectCategory(cat: RedFlagCategory) {
    setCategory(cat);
    setSubthemeId(null);
    setStep("subtheme");
  }

  function selectSubtheme(id: string) {
    setSubthemeId(id);
    setStep("mode");
  }

  function selectMode(mode: RedFlagMode) {
    if (!category || !subthemeId) return;
    const config: RedFlagConfig = { category, subthemeId, mode };
    onLaunch(config);
  }

  function goBack() {
    if (step === "subtheme") setStep("category");
    else if (step === "mode") setStep("subtheme");
  }

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          {step !== "category" ? (
            <Pressable onPress={goBack} hitSlop={12}>
              <Text style={[typography.bodyBold, styles.back]}>‹ Retour</Text>
            </Pressable>
          ) : (
            <View style={styles.backPlaceholder} />
          )}
          <View style={styles.dots}>
            {STEP_ORDER.map((s, i) => (
              <View
                key={s}
                style={[styles.dot, i <= stepIndex && styles.dotActive]}
              />
            ))}
          </View>
        </View>

        {step === "category" ? (
          <>
            <SectionTitle
              title="Étape 1 / 3"
              subtitle="Quelle catégorie de red flags ce soir ?"
            />
            {CATEGORIES.map((cat) => (
              <Pressable key={cat.id} onPress={() => selectCategory(cat.id)}>
                <Card accentColor={colors.primary} style={styles.optionCard}>
                  <Text style={styles.optionEmoji}>{cat.emoji}</Text>
                  <View style={styles.optionBody}>
                    <Text style={[typography.subtitle, styles.optionLabel]}>
                      {cat.label}
                    </Text>
                    <Text style={[typography.body, styles.optionDesc]}>
                      {cat.description}
                    </Text>
                  </View>
                  <Text style={styles.chevron}>›</Text>
                </Card>
              </Pressable>
            ))}
          </>
        ) : null}

        {step === "subtheme" && category ? (
          <>
            <SectionTitle
              title="Étape 2 / 3"
              subtitle="Choisissez le sous-thème"
            />
            {subthemes.map((sub) => {
              const count = SITUATIONS.filter(
                (s) => s.subthemeId === sub.id
              ).length;
              const disabled = count === 0;
              return (
                <Pressable
                  key={sub.id}
                  onPress={() => !disabled && selectSubtheme(sub.id)}
                  disabled={disabled}
                >
                  <Card
                    accentColor={disabled ? undefined : colors.primary}
                    style={[
                      styles.optionCard,
                      disabled ? styles.optionCardDisabled : null,
                    ]}
                  >
                    <Text style={styles.optionEmoji}>{sub.emoji}</Text>
                    <View style={styles.optionBody}>
                      <Text style={[typography.subtitle, styles.optionLabel]}>
                        {sub.label}
                      </Text>
                      <Text style={[typography.caption, styles.optionCount]}>
                        {disabled
                          ? "Bientôt disponible"
                          : `${count} situations`}
                      </Text>
                    </View>
                    {!disabled ? (
                      <Text style={styles.chevron}>›</Text>
                    ) : null}
                  </Card>
                </Pressable>
              );
            })}
          </>
        ) : null}

        {step === "mode" ? (
          <>
            <SectionTitle title="Étape 3 / 3" subtitle="Choisissez le mode de jeu" />
            {MODES.map((mode) => (
              <Pressable key={mode.id} onPress={() => selectMode(mode.id)}>
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
          </>
        ) : null}
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
  backPlaceholder: {
    width: 60,
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
  optionCardDisabled: {
    opacity: 0.45,
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
  optionCount: {
    color: colors.gold,
    marginTop: 2,
  },
  chevron: {
    fontSize: 26,
    color: colors.textFaint,
    marginLeft: spacing.sm,
  },
});
