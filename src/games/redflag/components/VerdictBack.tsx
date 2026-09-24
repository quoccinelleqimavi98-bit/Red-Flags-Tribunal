import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { PlayerAvatar } from "@components/PlayerAvatar";
import { colors, radius, spacing, typography } from "@core/theme";
import { Player } from "@core/types";

export type Vote = "red" | "clean" | null;

export interface VerdictOutcome {
  redCount: number;
  cleanCount: number;
  minority: Player[];
}

interface VerdictBackProps {
  players: Player[];
  assignments: Record<number, Vote>;
  onSetVote: (playerId: number, vote: Exclude<Vote, null>) => void;
  onValidate: () => void;
  outcome: VerdictOutcome | null;
  onNext: () => void;
  isLast: boolean;
}

/**
 * Dos de carte du mode "Le Verdict" : même mécanisme que "Qui l'a déjà
 * vécu ?" (roster à deux pastilles par joueur), suivi d'un court rappel
 * du résultat du vote avant de passer à la carte suivante.
 */
export function VerdictBack({
  players,
  assignments,
  onSetVote,
  onValidate,
  outcome,
  onNext,
  isLast,
}: VerdictBackProps) {
  if (outcome) {
    return (
      <View style={styles.card}>
        <Text style={[typography.caption, styles.title]}>
          ⚖️ Le verdict est tombé
        </Text>
        <Card
          style={styles.resultCard}
          accentColor={outcome.minority.length > 0 ? colors.primary : colors.ink}
        >
          <Text style={[typography.subtitle, { color: colors.text }]}>
            🚩 {outcome.redCount} vs ✅ {outcome.cleanCount}
          </Text>
          {outcome.minority.length > 0 ? (
            <View style={styles.minorityRow}>
              <Text style={[typography.body, styles.resultText]}>
                Minoritaires :
              </Text>
              {outcome.minority.map((p) => (
                <View key={p.id} style={styles.minorityChip}>
                  <PlayerAvatar avatarId={p.avatarId} size={16} />
                  <Text style={[typography.caption, styles.minorityChipLabel]}>
                    {p.name}
                  </Text>
                </View>
              ))}
              <Text style={[typography.body, styles.resultText]}>
                une gorgée chacun·e ! 🍻
              </Text>
            </View>
          ) : (
            <Text style={[typography.body, styles.resultText]}>
              Égalité parfaite : personne ne boit ce coup-ci.
            </Text>
          )}
        </Card>
        <Button
          label={isLast ? "Voir le bilan" : "Situation suivante"}
          icon={isLast ? "🏆" : "➡️"}
          onPress={onNext}
          style={{ marginTop: spacing.sm }}
        />
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={[typography.caption, styles.title]}>
        ⚖️ Qui a voté quoi ?
      </Text>
      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {players.map((p) => {
          const vote = assignments[p.id];
          return (
            <View key={p.id} style={styles.row}>
              <PlayerAvatar avatarId={p.avatarId} size={20} />
              <Text style={[typography.bodyBold, styles.name]} numberOfLines={1}>
                {p.name}
              </Text>
              <Pressable
                onPress={() => onSetVote(p.id, "red")}
                style={[styles.pill, vote === "red" && styles.pillRed]}
              >
                <Text style={[typography.caption, styles.pillLabel]}>
                  Red Flag 🚩
                </Text>
              </Pressable>
              <Pressable
                onPress={() => onSetVote(p.id, "clean")}
                style={[styles.pill, vote === "clean" && styles.pillGold]}
              >
                <Text style={[typography.caption, styles.pillLabel]}>
                  Pas Red Flag ✅
                </Text>
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
      <Button
        label="Voir le résultat"
        icon="⚖️"
        onPress={onValidate}
        style={{ marginTop: spacing.sm }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.primary + "55",
    padding: spacing.md,
  },
  title: {
    color: colors.ink,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  name: {
    flex: 1,
    color: colors.text,
    marginLeft: spacing.xs,
    marginRight: spacing.xs,
  },
  pill: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
    marginLeft: spacing.xs,
  },
  pillRed: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + "26",
  },
  pillGold: {
    borderColor: colors.ink,
    backgroundColor: colors.ink + "26",
  },
  pillLabel: {
    color: colors.text,
  },
  resultCard: {
    alignItems: "center",
  },
  resultText: {
    color: colors.textMuted,
    textAlign: "center",
    marginTop: spacing.sm,
  },
  minorityRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.sm,
  },
  minorityChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    marginHorizontal: 4,
  },
  minorityChipLabel: {
    color: colors.text,
    marginLeft: 4,
  },
});
