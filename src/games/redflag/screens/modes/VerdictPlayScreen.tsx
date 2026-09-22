import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScreenBackground } from "@components/ScreenBackground";
import { Button } from "@components/Button";
import { FlipCard } from "@components/FlipCard";
import { colors, spacing, typography } from "@core/theme";
import { Player } from "@core/types";
import { CardDeck } from "../../components/CardDeck";
import { SipsResults } from "../../components/SipsResults";
import { SituationCard } from "../../components/SituationCard";
import { Vote, VerdictBack, VerdictOutcome } from "../../components/VerdictBack";
import { ModePlayScreenProps } from "./types";

function initAssignments(players: Player[]): Record<number, Vote> {
  const initial: Record<number, Vote> = {};
  players.forEach((p) => (initial[p.id] = null));
  return initial;
}

function zeroTally(players: Player[]): Record<number, number> {
  const initial: Record<number, number> = {};
  players.forEach((p) => (initial[p.id] = 0));
  return initial;
}

/**
 * Mode "Le Verdict" : vote à main levée réel, puis la carte se retourne
 * (même mécanisme que "Qui l'a déjà vécu ?") pour que le host reporte qui
 * a levé la main — l'app calcule la minorité et lui inflige une gorgée.
 */
export function VerdictPlayScreen({
  players,
  category,
  subtheme,
  cards,
  onReplay,
  onEnd,
}: ModePlayScreenProps) {
  const [index, setIndex] = React.useState(0);
  const [finished, setFinished] = React.useState(false);
  const [flipped, setFlipped] = React.useState(false);
  const [assignments, setAssignments] = React.useState<Record<number, Vote>>(
    () => initAssignments(players)
  );
  const [outcome, setOutcome] = React.useState<VerdictOutcome | null>(null);
  const [sipsTotal, setSipsTotal] = React.useState<Record<number, number>>(() =>
    zeroTally(players)
  );

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

  function setVote(playerId: number, vote: Exclude<Vote, null>) {
    setAssignments((prev) => ({ ...prev, [playerId]: vote }));
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

    setOutcome({ redCount: redPlayers.length, cleanCount: cleanPlayers.length, minority });
  }

  function goToNext() {
    if (isLast) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setAssignments(initAssignments(players));
    setOutcome(null);
    setFlipped(false);
  }

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
          onSwiped={() => setFlipped(true)}
          swipeEnabled={!flipped}
          flyOffOnSwipe={false}
        >
          <FlipCard
            key={current.id}
            flipped={flipped}
            style={styles.flipInner}
            front={
              <SituationCard
                situation={current}
                category={category}
                subtheme={subtheme}
              />
            }
            back={
              <VerdictBack
                players={players}
                assignments={assignments}
                onSetVote={setVote}
                onValidate={validateVote}
                outcome={outcome}
                onNext={goToNext}
                isLast={isLast}
              />
            }
          />
        </CardDeck>

        {!flipped ? (
          <View style={styles.panel}>
            <Text style={[typography.bodyBold, styles.hint]}>
              🚩 Levez la main bien haut pour "Red Flag" · ✅ Main baissée
              pour "Pas Red Flag"
            </Text>
            <Button
              label="Voir qui a voté quoi"
              icon="🔄"
              onPress={() => setFlipped(true)}
              style={{ marginTop: spacing.sm }}
            />
          </View>
        ) : null}
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
  flipInner: {
    width: "100%",
  },
  panel: {
    marginTop: spacing.md,
  },
  hint: {
    color: colors.text,
    textAlign: "center",
  },
});
