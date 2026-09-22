import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScreenBackground } from "@components/ScreenBackground";
import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { PlayerAvatar } from "@components/PlayerAvatar";
import { colors, radius, spacing, typography } from "@core/theme";
import { Player } from "@core/types";
import { shuffle } from "@core/utils/shuffle";
import { SwipeDirection } from "@components/SwipeCard";
import { CardDeck } from "../../components/CardDeck";
import { SipsResults } from "../../components/SipsResults";
import { ModePlayScreenProps } from "./types";

const PRE_COUNT_S = 3;
const TRIAL_DURATION_S = 30;
const LOSE_TOAST_DURATION_MS = 1800;

const LOSE_MESSAGES: Array<(name: string) => string> = [
  (name) => `${name} s'écroule à la barre... une gorgée pour ce mensonge !`,
  (name) => `Objection rejetée. ${name} boit une gorgée de la honte.`,
  (name) => `Le jury n'y croit pas une seconde : ${name}, à la gorgée !`,
  (name) => `Verdict sans appel : ${name} boit une gorgée.`,
  (name) => `Plaidoirie bidon, ${name} trinque avec le tribunal.`,
];

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
  // "Sac à jetons" mélangé : chaque joueur·se passe une fois avant qu'un
  // nom ne puisse ressortir, pour un tirage vraiment équilibré (pas de
  // répétitions rapprochées dues au hasard pur).
  const bagRef = useRef<Player[]>([]);

  function drawNext(excludeId?: number): Player {
    if (bagRef.current.length === 0) {
      const bag = shuffle(players);
      if (excludeId !== undefined && bag.length > 1 && bag[0].id === excludeId) {
        [bag[0], bag[1]] = [bag[1], bag[0]];
      }
      bagRef.current = bag;
    }
    return bagRef.current.shift()!;
  }

  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [defendant, setDefendant] = useState<Player | null>(() =>
    players.length > 0 ? drawNext() : null
  );
  const [preCount, setPreCount] = useState(PRE_COUNT_S);
  const [secondsLeft, setSecondsLeft] = useState(TRIAL_DURATION_S);
  const [toast, setToast] = useState<string | null>(null);
  const [sipsTotal, setSipsTotal] = useState<Record<number, number>>(() =>
    zeroTally(players)
  );
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const current = cards[index];
  const next = cards[index + 1];
  const isLast = index + 1 >= cards.length;

  useEffect(() => {
    if (finished || !current || toast) return;
    if (preCount <= 0) return;
    const timer = setTimeout(() => setPreCount((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [preCount, finished, current, index, toast]);

  useEffect(() => {
    if (finished || !current || toast) return;
    if (preCount > 0) return;
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, finished, current, index, preCount, toast]);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

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

  function advanceRound() {
    if (isLast) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setDefendant(drawNext(defendant!.id));
    setPreCount(PRE_COUNT_S);
    setSecondsLeft(TRIAL_DURATION_S);
  }

  function verdict(outcome: "rate" | "valide") {
    if (outcome === "rate") {
      addSip(defendant!.id, 1);
      const message =
        LOSE_MESSAGES[Math.floor(Math.random() * LOSE_MESSAGES.length)](
          defendant!.name
        );
      setToast(message);
      toastTimeoutRef.current = setTimeout(() => {
        setToast(null);
        advanceRound();
      }, LOSE_TOAST_DURATION_MS);
    } else {
      players
        .filter((p) => p.id !== defendant!.id)
        .forEach((p) => addSip(p.id, 1));
      advanceRound();
    }
  }

  function handleSwipe(direction: SwipeDirection) {
    verdict(direction === "left" ? "rate" : "valide");
  }

  const isPreCount = preCount > 0;
  const timeUp = secondsLeft <= 0;
  const interactionLocked = isPreCount || !!toast;

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
              {isPreCount
                ? "Prépare-toi..."
                : timeUp
                  ? "Temps écoulé !"
                  : "pour convaincre"}
            </Text>
          </View>
          <Text
            style={[
              typography.title,
              styles.timer,
              timeUp && !isPreCount ? styles.timerUp : null,
            ]}
          >
            {timeUp ? "⏰" : secondsLeft}
          </Text>
        </Card>

        <View style={styles.deckWrapper}>
          <CardDeck
            current={current}
            next={next}
            category={category}
            subtheme={subtheme}
            onSwiped={handleSwipe}
            swipeEnabled={!interactionLocked}
          />

          {isPreCount ? (
            <View style={styles.preCountBadge} pointerEvents="none">
              <Text style={styles.preCountText}>{preCount}</Text>
            </View>
          ) : null}

          {toast ? (
            <View style={styles.toastOverlay} pointerEvents="none">
              <Card accentColor={colors.primary} style={styles.toastCard}>
                <Text style={[typography.subtitle, styles.toastText]}>
                  🍻 {toast}
                </Text>
              </Card>
            </View>
          ) : null}
        </View>

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
              disabled={interactionLocked}
              style={styles.halfButton}
            />
            <Button
              label="Validé"
              icon="✅"
              onPress={() => verdict("valide")}
              disabled={interactionLocked}
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
  deckWrapper: {
    flex: 1,
    position: "relative",
  },
  preCountBadge: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(12,5,8,0.85)",
    borderWidth: 2,
    borderColor: colors.gold,
    zIndex: 5,
  },
  preCountText: {
    color: colors.gold,
    fontSize: 20,
    fontFamily: typography.bodyBold.fontFamily,
  },
  toastOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(12,5,8,0.72)",
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  toastCard: {
    alignItems: "center",
  },
  toastText: {
    color: colors.text,
    textAlign: "center",
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
