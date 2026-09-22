import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScreenBackground } from "@components/ScreenBackground";
import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { PlayerAvatar } from "@components/PlayerAvatar";
import { colors, spacing, typography } from "@core/theme";
import { Player } from "@core/types";
import { SwipeDirection } from "@components/SwipeCard";
import { drawRandomPlayer } from "../../engine/redflagEngine";
import { CardDeck } from "../../components/CardDeck";
import { SipsResults } from "../../components/SipsResults";
import { ModePlayScreenProps } from "./types";

const TRIAL_DURATION_S = 30;

function zeroTally(players: Player[]): Record<number, number> {
  const initial: Record<number, number> = {};
  players.forEach((p) => (initial[p.id] = 0));
  return initial;
}

/** Mode "Le Procès" : un·e accusé·e tiré·e au sort défend la situation, le host tranche au swipe. */
export function TrialPlayScreen({
  players,
  category,
  subtheme,
  cards,
  onReplay,
  onEnd,
}: ModePlayScreenProps) {
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [defendant, setDefendant] = useState<Player | null>(() =>
    players.length > 0 ? drawRandomPlayer(players) : null
  );
  const [secondsLeft, setSecondsLeft] = useState(TRIAL_DURATION_S);
  const [sipsTotal, setSipsTotal] = useState<Record<number, number>>(() =>
    zeroTally(players)
  );

  const current = cards[index];
  const next = cards[index + 1];
  const isLast = index + 1 >= cards.length;

  useEffect(() => {
    if (finished || !current) return;
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, finished, current, index]);

  if (!current || !defendant) {
    return (
      <ScreenBackground>
        <View style={styles.center}>
          <Text style={[typography.body, { color: colors.textMuted }]}>
            {players.length === 0
              ? "Il faut au moins un·e joueur·se pour passer en jugement."
              : "Aucune situation disponible pour ce sous-thème."}
          </Text>
          <Button label="Retour" onPress={onReplay} style={{ marginTop: spacing.md }} />
        </View>
      </ScreenBackground>
    );
  }

  if (finished) {
    return (
      <SipsResults
        emoji="🎭"
        title="Le Procès est clos"
        players={players}
        sipsTotal={sipsTotal}
        emptyMessage="Personne n'a été condamné·e ce soir, le tribunal est clément."
        onReplay={onReplay}
        onEnd={onEnd}
      />
    );
  }

  function addSip(playerId: number, amount: number) {
    setSipsTotal((prev) => ({ ...prev, [playerId]: (prev[playerId] ?? 0) + amount }));
  }

  function verdict(outcome: "rate" | "valide") {
    if (outcome === "rate") {
      addSip(defendant!.id, 1);
    } else {
      players
        .filter((p) => p.id !== defendant!.id)
        .forEach((p) => addSip(p.id, 1));
    }

    if (isLast) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setDefendant(drawRandomPlayer(players, defendant!.id));
    setSecondsLeft(TRIAL_DURATION_S);
  }

  function handleSwipe(direction: SwipeDirection) {
    verdict(direction === "left" ? "rate" : "valide");
  }

  const timeUp = secondsLeft <= 0;

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

        <Card accentColor={colors.gold} style={styles.defendantCard}>
          <PlayerAvatar avatarId={defendant.avatarId} size={24} />
          <View style={styles.defendantTextBlock}>
            <Text
              style={[typography.bodyBold, styles.defendantName]}
              numberOfLines={1}
            >
              {defendant.name} est à la barre
            </Text>
            <Text style={[typography.caption, styles.timerLabel]}>
              {timeUp ? "Temps écoulé !" : "pour convaincre"}
            </Text>
          </View>
          <Text
            style={[
              typography.title,
              styles.timer,
              timeUp ? styles.timerUp : null,
            ]}
          >
            {timeUp ? "⏰" : secondsLeft}
          </Text>
        </Card>

        <CardDeck
          current={current}
          next={next}
          category={category}
          subtheme={subtheme}
          onSwiped={handleSwipe}
          swipeEnabled
        />

        <View style={styles.panel}>
          <Text style={[typography.bodyBold, styles.hint]}>
            Swipe à gauche si raté, à droite si convaincant·e
          </Text>
          <View style={styles.buttonRow}>
            <Button
              label="Raté"
              icon="❌"
              variant="danger"
              onPress={() => verdict("rate")}
              style={styles.halfButton}
            />
            <Button
              label="Validé"
              icon="✅"
              onPress={() => verdict("valide")}
              style={styles.halfButton}
            />
          </View>
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
  defendantCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
    paddingVertical: spacing.sm,
  },
  defendantTextBlock: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  defendantName: {
    color: colors.text,
  },
  timer: {
    color: colors.gold,
  },
  timerUp: {
    color: colors.primary,
  },
  timerLabel: {
    color: colors.textFaint,
    marginTop: 2,
  },
  panel: {
    marginTop: spacing.md,
  },
  hint: {
    color: colors.text,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  buttonRow: {
    flexDirection: "row",
  },
  halfButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
});
