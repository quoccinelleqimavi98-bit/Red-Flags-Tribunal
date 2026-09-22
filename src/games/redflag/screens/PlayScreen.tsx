import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenBackground } from "@components/ScreenBackground";
import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { PlayerAvatar } from "@components/PlayerAvatar";
import { SwipeCard } from "@components/SwipeCard";
import { colors, radius, spacing, typography } from "@core/theme";
import { RootStackParamList } from "@core/navigation/types";
import { useSessionStore } from "@core/store/sessionStore";
import { Player } from "@core/types";
import { pickSituations } from "../engine/redflagEngine";
import { SituationCard } from "../components/SituationCard";
import { CATEGORIES, RedFlagConfig, RedFlagSituation, SUBTHEMES } from "../types";

type Vote = "red" | "clean";
type VerdictPhase = "vote" | "tally" | "result";

type Props = NativeStackScreenProps<RootStackParamList, "Play">;

export function PlayScreen({ navigation, route }: Props) {
  const { category, subthemeId, mode } = route.params;
  const players = useSessionStore((s) => s.players);

  const config: RedFlagConfig = { category, subthemeId, mode };
  const situations = useMemo(() => pickSituations(config), [category, subthemeId]);
  const categoryInfo = CATEGORIES.find((c) => c.id === category)!;
  const subthemeInfo = SUBTHEMES.find((s) => s.id === subthemeId)!;

  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  // Mode "Red Flag ou Pas" — qui s'accuse sur la carte en cours + compteur cumulé.
  const [accusedThisCard, setAccusedThisCard] = useState<Record<number, boolean>>(
    () => zeroBoolMap(players)
  );
  const [accusationCounts, setAccusationCounts] = useState<Record<number, number>>(
    () => zeroTally(players)
  );

  // Mode "Le Verdict" — vote à main levée reporté par le host.
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

  const situation: RedFlagSituation | undefined = situations[index];
  const nextSituation = situations[index + 1];
  const isLast = index + 1 >= situations.length;

  function replay() {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "Home" }, { name: "Category" }],
      })
    );
  }

  function endEvening() {
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: "Home" }] })
    );
  }

  if (!situation) {
    return (
      <ScreenBackground>
        <View style={styles.center}>
          <Text style={[typography.body, { color: colors.textMuted }]}>
            Aucune situation disponible pour ce sous-thème.
          </Text>
          <Button label="Retour" onPress={replay} style={{ marginTop: spacing.md }} />
        </View>
      </ScreenBackground>
    );
  }

  if (finished) {
    return mode === "chill" ? (
      <AccusedResults
        players={players}
        counts={accusationCounts}
        onReplay={replay}
        onEnd={endEvening}
      />
    ) : (
      <VerdictResults
        players={players}
        sipsTotal={sipsTotal}
        onReplay={replay}
        onEnd={endEvening}
      />
    );
  }

  function goToNext() {
    if (isLast) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setAccusedThisCard(zeroBoolMap(players));
    setAssignments(initAssignments(players));
    setLastOutcome(null);
    setPhase("vote");
  }

  // ---------- Mode "Red Flag ou Pas" ----------
  function toggleAccusation(playerId: number) {
    setAccusedThisCard((prev) => ({ ...prev, [playerId]: !prev[playerId] }));
  }

  function chillAdvance() {
    setAccusationCounts((prev) => {
      const next = { ...prev };
      players.forEach((p) => {
        if (accusedThisCard[p.id]) next[p.id] = (next[p.id] ?? 0) + 1;
      });
      return next;
    });
    goToNext();
  }

  // ---------- Mode "Le Verdict" ----------
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
  const swipeEnabled = mode === "chill" || phase === "result";

  return (
    <ScreenBackground>
      <View style={styles.content}>
        <View style={styles.progressRow}>
          <Text style={[typography.caption, styles.progressText]}>
            {categoryInfo.emoji} {categoryInfo.label} · {subthemeInfo.label}
          </Text>
          <Text style={[typography.caption, styles.progressText]}>
            {index + 1} / {situations.length}
          </Text>
        </View>

        <View style={styles.deck}>
          {nextSituation ? (
            <View style={styles.behindCard} pointerEvents="none">
              <SituationCard
                situation={nextSituation}
                category={categoryInfo}
                subtheme={subthemeInfo}
              />
            </View>
          ) : null}
          <SwipeCard
            onSwiped={mode === "chill" ? chillAdvance : goToNext}
            swipeEnabled={swipeEnabled}
            style={styles.frontCard}
          >
            <SituationCard
              situation={situation}
              category={categoryInfo}
              subtheme={subthemeInfo}
            />
          </SwipeCard>
        </View>

        {mode === "chill" ? (
          <View style={styles.chillPanel}>
            <Text style={[typography.bodyBold, styles.chillHint]}>
              Tu l'as déjà vécu (ou fait) ? Touche ton avatar 👇
            </Text>
            <View style={styles.avatarRow}>
              {players.map((p) => {
                const accused = !!accusedThisCard[p.id];
                return (
                  <Pressable
                    key={p.id}
                    onPress={() => toggleAccusation(p.id)}
                    style={[styles.avatarBig, accused && styles.avatarBigAccused]}
                  >
                    <PlayerAvatar avatarId={p.avatarId} size={26} />
                    <Text
                      style={[typography.caption, styles.avatarBigLabel]}
                      numberOfLines={1}
                    >
                      {p.name}
                    </Text>
                    {accused ? <Text style={styles.avatarBigFlag}>🚩</Text> : null}
                  </Pressable>
                );
              })}
            </View>
            <Button
              label={isLast ? "Terminer" : "Suivant"}
              icon={isLast ? "🎉" : "➡️"}
              onPress={chillAdvance}
              style={{ marginTop: spacing.md }}
            />
          </View>
        ) : (
          <View style={styles.verdictPanel}>
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
                  Qui a voté quoi ? (appuyez sur chaque joueur pour faire
                  défiler son vote)
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
        )}
      </View>
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

function zeroBoolMap(players: Player[]): Record<number, boolean> {
  const initial: Record<number, boolean> = {};
  players.forEach((p) => (initial[p.id] = false));
  return initial;
}

function AccusedResults({
  players,
  counts,
  onReplay,
  onEnd,
}: {
  players: Player[];
  counts: Record<number, number>;
  onReplay: () => void;
  onEnd: () => void;
}) {
  const maxCount = Math.max(0, ...players.map((p) => counts[p.id] ?? 0));
  const champions = players.filter((p) => maxCount > 0 && counts[p.id] === maxCount);
  const ranked = [...players].sort(
    (a, b) => (counts[b.id] ?? 0) - (counts[a.id] ?? 0)
  );

  return (
    <ScreenBackground>
      <View style={styles.resultsContent}>
        <Text style={styles.resultsEmoji}>🚩👑</Text>
        <Text
          style={[typography.title, { color: colors.text, textAlign: "center" }]}
        >
          Le verdict de la soirée
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
            <Text style={[typography.subtitle, styles.championTitle]}>
              {champions.map((p) => p.name).join(" & ")}
            </Text>
            <Text style={[typography.caption, styles.championLabel]}>
              Le{champions.length > 1 ? "s" : ""} Red Flag{champions.length > 1 ? "s" : ""} de la soirée
            </Text>
          </Card>
        ) : (
          <Text style={[typography.body, styles.resultsSubtitle]}>
            Groupe irréprochable ce soir, personne ne s'est accusé·e.
          </Text>
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
          label="Rejouer (nouvelle catégorie)"
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
      </View>
    </ScreenBackground>
  );
}

function VerdictResults({
  players,
  sipsTotal,
  onReplay,
  onEnd,
}: {
  players: Player[];
  sipsTotal: Record<number, number>;
  onReplay: () => void;
  onEnd: () => void;
}) {
  const ranked = [...players].sort(
    (a, b) => (sipsTotal[b.id] ?? 0) - (sipsTotal[a.id] ?? 0)
  );
  const totalSips = Object.values(sipsTotal).reduce((a, b) => a + b, 0);

  return (
    <ScreenBackground>
      <View style={styles.resultsContent}>
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
              <PlayerAvatar avatarId={p.avatarId} size={22} />
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
          label="Rejouer (nouvelle catégorie)"
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
      </View>
    </ScreenBackground>
  );
}

const CARD_WIDTH = "82%" as const;

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
  deck: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  behindCard: {
    position: "absolute",
    width: CARD_WIDTH,
    opacity: 0.5,
    transform: [{ scale: 0.94 }, { translateY: 14 }],
  },
  frontCard: {
    width: CARD_WIDTH,
  },
  chillPanel: {
    marginTop: spacing.md,
  },
  chillHint: {
    color: colors.text,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  avatarRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  avatarBig: {
    alignItems: "center",
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    margin: spacing.xs,
    width: 76,
  },
  avatarBigAccused: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + "26",
  },
  avatarBigLabel: {
    color: colors.text,
    marginTop: 2,
    textTransform: "none",
  },
  avatarBigFlag: {
    position: "absolute",
    top: -6,
    right: -6,
    fontSize: 14,
  },
  verdictPanel: {
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
  resultsContent: {
    flex: 1,
    padding: spacing.lg,
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
  championCard: {
    alignItems: "center",
    marginTop: spacing.md,
  },
  championAvatar: {
    marginHorizontal: 4,
  },
  championTitle: {
    color: colors.text,
    marginTop: spacing.sm,
  },
  championLabel: {
    color: colors.gold,
    marginTop: 2,
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
  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.md,
  },
  resultName: {
    flex: 1,
    color: colors.text,
    marginLeft: spacing.sm,
  },
});
