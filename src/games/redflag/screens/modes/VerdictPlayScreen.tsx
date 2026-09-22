import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ScreenBackground } from "@components/ScreenBackground";
import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { PlayerAvatar } from "@components/PlayerAvatar";
import { colors, radius, spacing, typography } from "@core/theme";
import { Player } from "@core/types";
import { CardDeck } from "../../components/CardDeck";
import { SipsResults } from "../../components/SipsResults";
import { ModePlayScreenProps } from "./types";

type Vote = "red" | "clean";
type Phase = "vote" | "tally" | "result";

function initAssignments(players: Player[]): Record<number, Vote | null> {
  const initial: Record<number, Vote | null> = {};
  players.forEach((p) => (initial[p.id] = null));
  return initial;
}

function zeroTally(players: Player[]): Record<number, number> {
  const initial: Record<number, number> = {};
  players.forEach((p) => (initial[p.id] = 0));
  return initial;
}

/** Mode "Le Verdict" : vote à main levée, le host reporte, la minorité boit. */
export function VerdictPlayScreen({
  players,
  category,
  subtheme,
  cards,
  onReplay,
  onEnd,
}: ModePlayScreenProps) {
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [phase, setPhase] = useState<Phase>("vote");
  const [assignments, setAssignments] = useState<Record<number, Vote | null>>(
    () => initAssignments(players)
  );
  const [sipsTotal, setSipsTotal] = useState<Record<number, number>>(() =>
    zeroTally(players)
  );
  const [lastOutcome, setLastOutcome] = useState<{
    redCount: number;
    cleanCount: number;
    minority: Player[];
  } | null>(null);

  const current = cards[index];
  const next = cards[index + 1];
  const isLast = index + 1 >= cards.length;

  if (!current) {
    return (
      <ScreenBackground>
        <View style={styles.center}>
          <Text style={[typography.body, { color: colors.textMuted }]}>
            Aucune situation disponible pour ce sous-thème.
          </Text>
          <Button label="Retour" onPress={onReplay} style={{ marginTop: spacing.md }} />
        </View>
      </ScreenBackground>
    );
  }

  if (finished) {
    return (
      <SipsResults
        emoji="⚖️"
        title="Le Verdict est tombé"
        players={players}
        sipsTotal={sipsTotal}
        emptyMessage="Groupe très consensuel ce soir, personne n'a bu une goutte."
        onReplay={onReplay}
        onEnd={onEnd}
      />
    );
  }

  function goToNext() {
    if (isLast) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setAssignments(initAssignments(players));
    setLastOutcome(null);
    setPhase("vote");
  }

  function cycleAssignment(playerId: number) {
    setAssignments((prev) => {
      const current = prev[playerId];
      const next: Vote | null =
        current === null ? "red" : current === "red" ? "clean" : null;
      return { ...prev, [playerId]: next };
    });
  }

  function validateVote() {
    const redPlayers = players.filter((p) => assignments[p.id] === "red");
    const cleanPlayers = players.filter((p) => assignments[p.id] === "clean");
    const minority =
      redPlayers.length === cleanPlayers.length
        ? []
        : redPlayers.length < cleanPlayers.length
          ? redPlayers
          : cleanPlayers;

    if (minority.length > 0) {
      setSipsTotal((prev) => {
        const next = { ...prev };
        minority.forEach((p) => (next[p.id] = (next[p.id] ?? 0) + 1));
        return next;
      });
    }

    setLastOutcome({
      redCount: redPlayers.length,
      cleanCount: cleanPlayers.length,
      minority,
    });
    setPhase("result");
  }

  const allAssigned = players.every((p) => assignments[p.id] !== null);

  return (
    <ScreenBackground>
      <View style={styles.content}>
        <View style={styles.progressRow}>
          <Text style={[typography.caption, styles.progressText]}>
            {category.emoji} {category.label} · {subtheme.label}
          </Text>
          <Text style={[typography.caption, styles.progressText]}>
            {index + 1} / {cards.length}
          </Text>
        </View>

        <CardDeck
          current={current}
          next={next}
          category={category}
          subtheme={subtheme}
          onSwiped={goToNext}
          swipeEnabled={phase === "result"}
        />

        <View style={styles.panel}>
          {phase === "vote" ? (
            <Card style={styles.voteCard}>
              <Text style={[typography.bodyBold, styles.voteHint]}>
                🚩 Levez la main bien haut pour "Red Flag" · ✅ Main baissée
                pour "Pas Red Flag"
              </Text>
              <Button
                label="Voir les résultats du vote"
                icon="👀"
                onPress={() => setPhase("tally")}
                style={{ marginTop: spacing.md }}
              />
            </Card>
          ) : null}

          {phase === "tally" ? (
            <View>
              <Text style={[typography.bodyBold, styles.sectionLabel]}>
                Qui a voté quoi ? (appuyez sur chaque joueur pour faire défiler
                son vote)
              </Text>
              <View style={styles.avatarRow}>
                {players.map((p) => {
                  const vote = assignments[p.id];
                  return (
                    <Pressable
                      key={p.id}
                      onPress={() => cycleAssignment(p.id)}
                      style={[
                        styles.playerChip,
                        vote === "red" && styles.playerChipRed,
                        vote === "clean" && styles.playerChipClean,
                      ]}
                    >
                      <PlayerAvatar avatarId={p.avatarId} size={18} />
                      <Text style={[typography.bodyBold, styles.playerChipLabel]}>
                        {p.name}
                      </Text>
                      <Text style={styles.playerChipVote}>
                        {vote === "red" ? "🚩" : vote === "clean" ? "✅" : "?"}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              <Button
                label="Valider le vote"
                icon="⚖️"
                onPress={validateVote}
                disabled={!allAssigned}
                style={{ marginTop: spacing.md }}
              />
            </View>
          ) : null}

          {phase === "result" && lastOutcome ? (
            <Card
              style={styles.resultCard}
              accentColor={
                lastOutcome.minority.length > 0 ? colors.primary : colors.gold
              }
            >
              <Text style={[typography.subtitle, { color: colors.text }]}>
                🚩 {lastOutcome.redCount} vs ✅ {lastOutcome.cleanCount}
              </Text>
              {lastOutcome.minority.length > 0 ? (
                <View style={styles.minorityRow}>
                  <Text style={[typography.body, styles.resultText]}>
                    Minoritaires :
                  </Text>
                  {lastOutcome.minority.map((p) => (
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
              <Button
                label={isLast ? "Voir le bilan" : "Situation suivante"}
                icon={isLast ? "🏆" : "➡️"}
                onPress={goToNext}
                style={{ marginTop: spacing.md }}
              />
            </Card>
          ) : null}
        </View>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  progressText: {
    color: colors.textFaint,
  },
  panel: {
    marginTop: spacing.md,
  },
  voteCard: {
    alignItems: "center",
  },
  voteHint: {
    color: colors.text,
    textAlign: "center",
  },
  sectionLabel: {
    color: colors.text,
    marginBottom: spacing.sm,
  },
  avatarRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  playerChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  playerChipRed: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + "26",
  },
  playerChipClean: {
    borderColor: colors.gold,
    backgroundColor: colors.gold + "26",
  },
  playerChipLabel: {
    color: colors.text,
    marginHorizontal: spacing.xs,
  },
  playerChipVote: {
    fontSize: 16,
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
