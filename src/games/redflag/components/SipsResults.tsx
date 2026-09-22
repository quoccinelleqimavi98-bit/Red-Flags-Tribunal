import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
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

/** Classement générique "gorgées par joueur" — réutilisé par Le Verdict et Le Procès. */
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
          ranked.map((p, index) => (
            <Card
              key={p.id}
              style={styles.row}
              accentColor={index === 0 ? colors.primary : undefined}
            >
              <PlayerAvatar avatarId={p.avatarId} size={22} />
              <Text style={[typography.bodyBold, styles.name]}>{p.name}</Text>
              <Text style={[typography.title, { color: colors.primary }]}>
                🍻 {sipsTotal[p.id] ?? 0}
              </Text>
            </Card>
          ))
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
