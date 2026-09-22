import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenBackground } from "@components/ScreenBackground";
import { Card } from "@components/Card";
import { SectionTitle } from "@components/SectionTitle";
import { colors, spacing, typography } from "@core/theme";
import { RootStackParamList } from "@core/navigation/types";
import { CATEGORIES, RedFlagCategory } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Category">;

export function CategoryScreen({ navigation, route }: Props) {
  const { mode } = route.params;

  function selectCategory(category: RedFlagCategory) {
    navigation.navigate("Subtheme", { mode, category });
  }

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
            <View style={styles.dot} />
          </View>
        </View>

        <SectionTitle
          title="Étape 2 / 3"
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
