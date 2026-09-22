import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenBackground } from "@components/ScreenBackground";
import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { PlayerAvatar } from "@components/PlayerAvatar";
import { colors, spacing, typography } from "@core/theme";
import { Player } from "@core/types";

interface CrownResultsProps {
  emoji: string;
  title: string;
  players: Player[];
  counts: Record<number, number>;
  emptyMessage: string;
  championLabel: string;
  /** Si défini, affiche "🍻 x N" à côté du/des champion·nes (ex. la double peine de "Ce Serait Qui"). */
  sipsAwarded?: number;
  onReplay: () => void;
  onEnd: () => void;
}

/** Classement générique "compteur + couronne" — réutilisé par "Qui l'a déjà vécu ?" et "Ce Serait Qui". */
export function CrownResults({
  emoji,
  title,
  players,
  counts,
  emptyMessage,
  championLabel,
  sipsAwarded,
  onReplay,
  onEnd,
}: CrownResultsProps) {
  const maxCount = Math.max(0, ...players.map((p) => counts[p.id] ?? 0));
  const champions = players.filter((p) => maxCount > 0 && counts[p.id] === maxCount);
  const ranked = [...players].sort(
    (a, b) => (counts[b.id] ?? 0) - (counts[a.id] ?? 0)
  );

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text
          style={[typography.title, { color: colors.text, textAlign: "center" }]}
        >
          {title}
        </Text>

        {champions.length > 0 ? (
          <Card accentColor={colors.primary} style={styles.championCard}>
            <View style={styles.avatarRow}>
              {champions.map((p) => (
                <View key={p.id} style={styles.championAvatar}>
                  <PlayerAvatar avatarId={p.avatarId} size={32} />
                </View>
              ))}
            </View>
            <Text style={[typography.subtitle, styles.championName]}>
              {champions.map((p) => p.name).join(" & ")}
            </Text>
            <Text style={[typography.caption, styles.championLabel]}>
              {championLabel}
            </Text>
            {sipsAwarded ? (
              <Text style={[typography.bodyBold, styles.championSips]}>
                {"🍻".repeat(sipsAwarded)} {sipsAwarded} gorgées d'un coup !
              </Text>
            ) : null}
          </Card>
        ) : (
          <Text style={[typography.body, styles.subtitle]}>{emptyMessage}</Text>
        )}

        {ranked.map((p) => (
          <View key={p.id} style={styles.tallyRow}>
            <PlayerAvatar avatarId={p.avatarId} size={20} />
            <Text style={[typography.bodyBold, styles.tallyName]}>{p.name}</Text>
            <Text style={[typography.body, styles.tallyCount]}>
              {counts[p.id] ?? 0}
            </Text>
          </View>
        ))}

        <Button
          label="Rejouer (nouveau mode)"
          icon="🔄"
          onPress={onReplay}
          style={{ marginTop: spacing.lg }}
        />
        <Button
          label="Terminer la soirée"
          icon="🏁"
          variant="ghost"
          onPress={onEnd}
          style={{ marginTop: spacing.sm }}
        />
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  emoji: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textMuted,
    textAlign: "center",
    marginTop: spacing.md,
  },
  championCard: {
    alignItems: "center",
    marginTop: spacing.md,
  },
  avatarRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  championAvatar: {
    marginHorizontal: 4,
  },
  championName: {
    color: colors.text,
    marginTop: spacing.sm,
  },
  championLabel: {
    color: colors.gold,
    marginTop: 2,
  },
  championSips: {
    color: colors.primary,
    marginTop: spacing.sm,
  },
  tallyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.sm,
  },
  tallyName: {
    flex: 1,
    color: colors.text,
    marginLeft: spacing.sm,
  },
  tallyCount: {
    color: colors.primary,
  },
});
