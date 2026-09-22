import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenBackground } from "@components/ScreenBackground";
import { Card } from "@components/Card";
import { SectionTitle } from "@components/SectionTitle";
import { colors, spacing, typography } from "@core/theme";
import { RootStackParamList } from "@core/navigation/types";
import { getCardBank } from "../engine/redflagEngine";
import { CATEGORIES, SUBTHEMES } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Subtheme">;

export function SubthemeScreen({ navigation, route }: Props) {
  const { mode, category } = route.params;
  const categoryInfo = CATEGORIES.find((c) => c.id === category);
  const subthemes = SUBTHEMES.filter((s) => s.category === category);
  const bank = getCardBank(mode);

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
          subtitle={`${categoryInfo?.emoji} ${categoryInfo?.label} — choisissez le sous-thème`}
        />

        {subthemes.map((sub) => {
          const count = bank.filter((s) => s.subthemeId === sub.id).length;
          const disabled = count === 0;
          const countLabel =
            mode === "whoismostlikely" ? "prompts" : "situations";
          return (
            <Pressable
              key={sub.id}
              disabled={disabled}
              onPress={() =>
                !disabled &&
                navigation.navigate("Play", { mode, category, subthemeId: sub.id })
              }
            >
              <Card
                accentColor={disabled ? undefined : colors.primary}
                style={[styles.optionCard, disabled && styles.optionCardDisabled]}
              >
                <Text style={styles.optionEmoji}>{sub.emoji}</Text>
                <View style={styles.optionBody}>
                  <Text style={[typography.subtitle, styles.optionLabel]}>
                    {sub.label}
                  </Text>
                  <Text style={[typography.caption, styles.optionCount]}>
                    {disabled ? "Bientôt disponible" : `${count} ${countLabel}`}
                  </Text>
                </View>
                {!disabled ? <Text style={styles.chevron}>›</Text> : null}
              </Card>
            </Pressable>
          );
        })}
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
