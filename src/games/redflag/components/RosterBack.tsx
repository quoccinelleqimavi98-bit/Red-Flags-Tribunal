import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "@components/Button";
import { PlayerAvatar } from "@components/PlayerAvatar";
import { colors, radius, spacing, typography } from "@core/theme";
import { Player } from "@core/types";

export type ChillStatus = "vecu" | "pas_vecu" | null;

interface RosterBackProps {
  players: Player[];
  statuses: Record<number, ChillStatus>;
  onSetStatus: (playerId: number, status: ChillStatus) => void;
  onValidate: () => void;
  isLast: boolean;
}

/** Dos de carte du mode "Qui l'a déjà vécu ?" : deux options par joueur. */
export function RosterBack({
  players,
  statuses,
  onSetStatus,
  onValidate,
  isLast,
}: RosterBackProps) {
  return (
    <View style={styles.card}>
      <Text style={[typography.caption, styles.title]}>
        🔄 Qui l'a déjà vécu ?
      </Text>
      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {players.map((p) => {
          const status = statuses[p.id];
          return (
            <View key={p.id} style={styles.row}>
              <PlayerAvatar avatarId={p.avatarId} size={20} />
              <Text style={[typography.bodyBold, styles.name]} numberOfLines={1}>
                {p.name}
              </Text>
              <Pressable
                onPress={() => onSetStatus(p.id, "vecu")}
                style={[styles.pill, status === "vecu" && styles.pillRed]}
              >
                <Text style={[typography.caption, styles.pillLabel]}>Vécu 🚩</Text>
              </Pressable>
              <Pressable
                onPress={() => onSetStatus(p.id, "pas_vecu")}
                style={[styles.pill, status === "pas_vecu" && styles.pillGold]}
              >
                <Text style={[typography.caption, styles.pillLabel]}>
                  Pas vécu ✅
                </Text>
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
      <Button
        label={isLast ? "Voir le bilan" : "Valider"}
        icon={isLast ? "🏆" : "✅"}
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
    color: colors.gold,
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
    borderColor: colors.gold,
    backgroundColor: colors.gold + "26",
  },
  pillLabel: {
    color: colors.text,
  },
});
