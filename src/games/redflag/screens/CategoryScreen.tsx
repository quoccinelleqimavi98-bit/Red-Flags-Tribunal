import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenBackground } from "@components/ScreenBackground";
import { Card } from "@components/Card";
import { SectionTitle } from "@components/SectionTitle";
import { PlayerAvatar } from "@components/PlayerAvatar";
import { colors, spacing, typography } from "@core/theme";
import { RootStackParamList } from "@core/navigation/types";
import { useSessionStore } from "@core/store/sessionStore";
import { CATEGORIES, RedFlagCategory } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Category">;

export function CategoryScreen({ navigation }: Props) {
  const players = useSessionStore((s) => s.players);

  function selectCategory(category: RedFlagCategory) {
    if (players.length === 0) {
      navigation.navigate("PlayerSetup", { mode: "onboarding", category });
    } else {
      navigation.navigate("Subtheme", { category });
    }
  }

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.emoji}>🚩</Text>
          <Text style={[typography.title, { color: colors.text }]}>
            La cour est en session
          </Text>
        </View>

        {players.length > 0 ? (
          <Pressable
            onPress={() => navigation.navigate("PlayerSetup", { mode: "manage" })}
          >
            <Card style={styles.playersCard}>
              <View style={styles.avatarsRow}>
                {players.slice(0, 8).map((p) => (
                  <View key={p.id} style={styles.avatarBubble}>
                    <PlayerAvatar avatarId={p.avatarId} size={20} />
                  </View>
                ))}
              </View>
              <Text style={[typography.caption, styles.playersLabel]}>
                {players.length} joueur{players.length > 1 ? "s" : ""} · gérer
              </Text>
            </Card>
          </Pressable>
        ) : null}

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
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  emoji: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  playersCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  avatarsRow: {
    flexDirection: "row",
  },
  avatarBubble: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
    marginRight: -spacing.xs,
    borderWidth: 1.5,
    borderColor: colors.background,
  },
  playersLabel: {
    color: colors.gold,
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
