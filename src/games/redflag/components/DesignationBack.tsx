import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "@components/Button";
import { PlayerAvatar } from "@components/PlayerAvatar";
import { colors, radius, spacing, typography } from "@core/theme";
import { Player } from "@core/types";

interface DesignationBackProps {
  players: Player[];
  designated: Record<number, boolean>;
  onToggle: (playerId: number) => void;
  onValidate: () => void;
  isLast: boolean;
}

/** Dos de carte du mode "Ce Serait Qui" : sélection multiple des désigné·es. */
export function DesignationBack({
  players,
  designated,
  onToggle,
  onValidate,
  isLast,
}: DesignationBackProps) {
  return (
    <View style={styles.card}>
      <Text style={[typography.caption, styles.title]}>
        🔮 Qui le groupe a-t-il désigné ?
      </Text>
      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {players.map((p) => {
          const isDesignated = !!designated[p.id];
          return (
            <Pressable
              key={p.id}
              onPress={() => onToggle(p.id)}
              style={[styles.row, isDesignated && styles.rowDesignated]}
            >
              <PlayerAvatar avatarId={p.avatarId} size={20} />
              <Text style={[typography.bodyBold, styles.name]} numberOfLines={1}>
                {p.name}
              </Text>
              <Text style={styles.flag}>{isDesignated ? "🚩" : "◯"}</Text>
            </Pressable>
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
    borderColor: colors.gold + "55",
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
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.sm,
  },
  rowDesignated: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + "26",
  },
  name: {
    flex: 1,
    color: colors.text,
    marginLeft: spacing.xs,
  },
  flag: {
    fontSize: 18,
  },
});
