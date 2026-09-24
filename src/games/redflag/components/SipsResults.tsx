import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenBackground } from "@components/ScreenBackground";
import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { PlayerAvatar } from "@components/PlayerAvatar";
import { colors, spacing, typography } from "@core/theme";
import { Player } from "@core/types";

interface SipsResultsProps {
  emoji: string;
  title: string;
  players: Player[];
  sipsTotal: Record<number, number>;
  emptyMessage: string;
  onReplay: () => void;
  onEnd: () => void;
}

/**
 * Classement générique "gorgées par joueur" — réutilisé par Le Verdict,
 * Le Procès et Ce Serait Qui. Met en avant le/la "grand·e perdant·e"
 * (score de gorgées le plus élevé, ex æquo compris) avec une gorgée
 * bonus annoncée en encart.
 */
export function SipsResults({
  emoji,
  title,
  players,
  sipsTotal,
  emptyMessage,
  onReplay,
  onEnd,
}: SipsResultsProps) {
  const ranked = [...players].sort(
    (a, b) => (sipsTotal[b.id] ?? 0) - (sipsTotal[a.id] ?? 0)
  );
  const total = Object.values(sipsTotal).reduce((a, b) => a + b, 0);
  const maxSips = Math.max(0, ...players.map((p) => sipsTotal[p.id] ?? 0));
  const grandLosers =
    maxSips > 0 ? players.filter((p) => (sipsTotal[p.id] ?? 0) === maxSips) : [];

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text
          style={[typography.title, { color: colors.text, textAlign: "center" }]}
        >
          {title}
        </Text>

        {total === 0 ? (
          <Text style={[typography.body, styles.subtitle]}>{emptyMessage}</Text>
        ) : (
          <>
            <Card accentColor={colors.primary} style={styles.grandLoserCard}>
              <View style={styles.avatarRow}>
                {grandLosers.map((p) => (
                  <View key={p.id} style={styles.grandLoserAvatar}>
                    <PlayerAvatar avatarId={p.avatarId} size={28} />
                  </View>
                ))}
              </View>
              <Text style={[typography.subtitle, styles.grandLoserName]}>
                {grandLosers.map((p) => p.name).join(" & ")}
              </Text>
              <Text style={[typography.caption, styles.grandLoserLabel]}>
                ☠️ Grand·e perdant·e de la soirée
              </Text>
              <Text style={[typography.bodyBold, styles.grandLoserBonus]}>
                +1 gorgée supplémentaire à boire, séance tenante !
              </Text>
            </Card>

            {ranked.map((p) => (
              <Card
                key={p.id}
                style={styles.row}
                accentColor={
                  (sipsTotal[p.id] ?? 0) === maxSips ? colors.primary : undefined
                }
              >
                <PlayerAvatar avatarId={p.avatarId} size={22} />
                <Text style={[typography.bodyBold, styles.name]}>{p.name}</Text>
                <Text style={[typography.title, { color: colors.primary }]}>
                  🍻 {sipsTotal[p.id] ?? 0}
                </Text>
              </Card>
            ))}
          </>
        )}

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
  grandLoserCard: {
    alignItems: "center",
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  avatarRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  grandLoserAvatar: {
    marginHorizontal: 4,
  },
  grandLoserName: {
    color: colors.text,
    marginTop: spacing.sm,
  },
  grandLoserLabel: {
    color: colors.ink,
    marginTop: 2,
  },
  grandLoserBonus: {
    color: colors.primary,
    textAlign: "center",
    marginTop: spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.md,
  },
  name: {
    flex: 1,
    color: colors.text,
    marginLeft: spacing.sm,
  },
});
