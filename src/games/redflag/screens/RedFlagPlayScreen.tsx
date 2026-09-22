import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenBackground } from "@components/ScreenBackground";
import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { colors, radius, spacing, typography } from "@core/theme";
import { GamePlayScreenProps } from "@core/games/types";
import { Player } from "@core/types";
import { pickSituations } from "../engine/redflagEngine";
import { CATEGORIES, RedFlagConfig, RedFlagSituation, SUBTHEMES } from "../types";

type Vote = "red" | "clean";
type VerdictPhase = "vote" | "tally" | "result";

export function RedFlagPlayScreen({
  players,
  config,
  onFinished,
}: GamePlayScreenProps<RedFlagConfig>) {
  const situations = useMemo(() => pickSituations(config), [config]);
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const [phase, setPhase] = useState<VerdictPhase>("vote");
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

  const category = CATEGORIES.find((c) => c.id === config.category);
  const subtheme = SUBTHEMES.find((s) => s.id === config.subthemeId);
  const situation: RedFlagSituation | undefined = situations[index];
  const isLast = index + 1 >= situations.length;

  if (!situation) {
    return (
      <ScreenBackground>
        <View style={styles.center}>
          <Text style={[typography.body, { color: colors.textMuted }]}>
            Aucune situation disponible pour ce sous-thème.
          </Text>
          <Button
            label="Retour"
            onPress={onFinished}
            style={{ marginTop: spacing.md }}
          />
        </View>
      </ScreenBackground>
    );
  }

  if (finished) {
    return (
      <RedFlagResults
        players={players}
        sipsTotal={sipsTotal}
        mode={config.mode}
        onFinished={onFinished}
      />
    );
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

  const allAssigned = players.every((p) => assignments[p.id] !== null);

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.progressRow}>
          <Text style={[typography.caption, styles.progressText]}>
            {category?.emoji} {category?.label} · {subtheme?.label}
          </Text>
          <Text style={[typography.caption, styles.progressText]}>
            {index + 1} / {situations.length}
          </Text>
        </View>

        <Card accentColor={colors.primary} style={styles.situationCard}>
          <Text style={styles.situationEmoji}>🚩</Text>
          <Text style={[typography.title, styles.situationText]}>
            {situation.text}
          </Text>
        </Card>

        {config.mode === "chill" ? (
          <Button
            label={isLast ? "Terminer" : "Situation suivante"}
            icon={isLast ? "🎉" : "➡️"}
            onPress={goToNext}
          />
        ) : (
          <>
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
              <View style={styles.section}>
                <Text style={[typography.bodyBold, styles.sectionLabel]}>
                  Qui a voté quoi ? (appuyez sur chaque joueur pour faire
                  défiler son vote)
                </Text>
                <View style={styles.playersGrid}>
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
                        <Text
                          style={[typography.bodyBold, styles.playerChipLabel]}
                        >
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
                  <Text style={[typography.body, styles.resultText]}>
                    Minoritaires :{" "}
                    {lastOutcome.minority.map((p) => p.name).join(", ")} —
                    une gorgée chacun·e ! 🍻
                  </Text>
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
          </>
        )}
      </ScrollView>
    </ScreenBackground>
  );
}

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

function RedFlagResults({
  players,
  sipsTotal,
  mode,
  onFinished,
}: {
  players: Player[];
  sipsTotal: Record<number, number>;
  mode: RedFlagConfig["mode"];
  onFinished: () => void;
}) {
  const ranked = [...players].sort(
    (a, b) => (sipsTotal[b.id] ?? 0) - (sipsTotal[a.id] ?? 0)
  );
  const totalSips = Object.values(sipsTotal).reduce((a, b) => a + b, 0);

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.resultsContent}>
        <Text style={styles.resultsEmoji}>⚖️</Text>
        <Text
          style={[typography.title, { color: colors.text, textAlign: "center" }]}
        >
          Le Verdict est tombé
        </Text>

        {totalSips === 0 ? (
          <Text style={[typography.body, styles.resultsSubtitle]}>
            Groupe très consensuel ce soir, personne n'a bu une goutte.
          </Text>
        ) : (
          ranked.map((p, index) => (
            <Card
              key={p.id}
              style={styles.resultRow}
              accentColor={index === 0 ? colors.primary : undefined}
            >
              <Text style={styles.resultRank}>
                {index === 0 ? "🚩" : `#${index + 1}`}
              </Text>
              <Text style={[typography.bodyBold, styles.resultName]}>
                {p.name}
              </Text>
              <Text style={[typography.title, { color: colors.primary }]}>
                🍻 {sipsTotal[p.id] ?? 0}
              </Text>
            </Card>
          ))
        )}

        <Button
          label="Terminer"
          icon="🎉"
          onPress={onFinished}
          style={{ marginTop: spacing.lg }}
        />
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
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
  situationCard: {
    marginBottom: spacing.lg,
    alignItems: "center",
    paddingVertical: spacing.xl,
  },
  situationEmoji: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  situationText: {
    color: colors.text,
    textAlign: "center",
  },
  voteCard: {
    alignItems: "center",
  },
  voteHint: {
    color: colors.text,
    textAlign: "center",
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionLabel: {
    color: colors.text,
    marginBottom: spacing.sm,
  },
  playersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
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
    marginRight: spacing.xs,
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
  resultsContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  resultsEmoji: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: spacing.xs,
  },
  resultsSubtitle: {
    color: colors.textMuted,
    textAlign: "center",
    marginTop: spacing.md,
  },
  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.md,
  },
  resultRank: {
    fontSize: 22,
    width: 44,
  },
  resultName: {
    flex: 1,
    color: colors.text,
  },
});
