import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { ScreenBackground } from "@components/ScreenBackground";
import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { FlipCard } from "@components/FlipCard";
import { PlayerAvatar } from "@components/PlayerAvatar";
import { SwipeDirection } from "@components/SwipeCard";
import { colors, radius, spacing, typography } from "@core/theme";
import { Player } from "@core/types";
import { shuffle } from "@core/utils/shuffle";
import { CardDeck } from "../../components/CardDeck";
import { DesignationBack } from "../../components/DesignationBack";
import { ModeHeader } from "../../components/ModeHeader";
import { RosterBack, ChillStatus } from "../../components/RosterBack";
import { SipsResults } from "../../components/SipsResults";
import { SituationCard } from "../../components/SituationCard";
import { VerdictBack, Vote, VerdictOutcome } from "../../components/VerdictBack";
import { MODES } from "../../types";
import { MixPlayScreenProps } from "./types";

const PRE_COUNT_S = 5;
const TRIAL_DURATION_S = 30;
const LOSE_TOAST_DURATION_MS = 3200;

const LOSE_MESSAGES: Array<(name: string) => string> = [
  (name) => `${name} s'écroule à la barre... une gorgée pour ce mensonge !`,
  (name) => `Objection rejetée. ${name} boit une gorgée de la honte.`,
  (name) => `Le jury n'y croit pas une seconde : ${name}, à la gorgée !`,
  (name) => `Verdict sans appel : ${name} boit une gorgée.`,
  (name) => `Plaidoirie bidon, ${name} trinque avec le tribunal.`,
];

function zeroStatusMap(players: Player[]): Record<number, ChillStatus> {
  const initial: Record<number, ChillStatus> = {};
  players.forEach((p) => (initial[p.id] = null));
  return initial;
}
function zeroVoteMap(players: Player[]): Record<number, Vote> {
  const initial: Record<number, Vote> = {};
  players.forEach((p) => (initial[p.id] = null));
  return initial;
}
function zeroBoolMap(players: Player[]): Record<number, boolean> {
  const initial: Record<number, boolean> = {};
  players.forEach((p) => (initial[p.id] = false));
  return initial;
}
function zeroTally(players: Player[]): Record<number, number> {
  const initial: Record<number, number> = {};
  players.forEach((p) => (initial[p.id] = 0));
  return initial;
}

/**
 * Mode Surprise : chaque carte porte son propre sous-mode (tiré au sort par
 * salves de 2-3, voir `pickMixCards`). Réutilise les mêmes dos de carte que
 * les 4 écrans dédiés (RosterBack, VerdictBack, DesignationBack, mise en
 * page du Procès) et cumule toutes les gorgées dans un seul bilan final :
 * un "vécu" en "Qui l'a déjà vécu ?" vaut une gorgée, au même titre qu'un
 * vote minoritaire au Verdict, une plaidoirie ratée au Procès ou une
 * désignation à Ce Serait Qui.
 */
export function MixPlayScreen({
  players,
  category,
  subtheme,
  cards,
  onReplay,
  onEnd,
}: MixPlayScreenProps) {
  const bagRef = useRef<Player[]>([]);

  function drawDefendant(excludeId?: number): Player {
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
  const [flipped, setFlipped] = useState(false);
  const [chillStatuses, setChillStatuses] = useState<Record<number, ChillStatus>>(
    () => zeroStatusMap(players)
  );
  const [verdictAssignments, setVerdictAssignments] = useState<Record<number, Vote>>(
    () => zeroVoteMap(players)
  );
  const [verdictOutcome, setVerdictOutcome] = useState<VerdictOutcome | null>(null);
  const [designated, setDesignated] = useState<Record<number, boolean>>(() =>
    zeroBoolMap(players)
  );
  const [defendant, setDefendant] = useState<Player | null>(() =>
    players.length > 0 && cards[0]?.subMode === "trial" ? drawDefendant() : null
  );
  const [preCount, setPreCount] = useState(PRE_COUNT_S);
  const [secondsLeft, setSecondsLeft] = useState(TRIAL_DURATION_S);
  const [toast, setToast] = useState<string | null>(null);
  const [sipsTotal, setSipsTotal] = useState<Record<number, number>>(() =>
    zeroTally(players)
  );
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastAnim = useRef(new Animated.Value(0)).current;

  const current = cards[index];
  const next = cards[index + 1];
  const isLast = index + 1 >= cards.length;
  const subMode = current?.subMode;
  const subModeInfo = subMode ? MODES.find((m) => m.id === subMode)! : null;

  // Auto-avance "Qui l'a déjà vécu ?" une fois tout le monde statué (même
  // délai que l'écran dédié).
  useEffect(() => {
    if (subMode !== "chill" || !flipped || players.length === 0) return;
    const allSet = players.every((p) => chillStatuses[p.id] != null);
    if (!allSet) return;
    const timer = setTimeout(() => commitChillAndAdvance(), 350);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chillStatuses, flipped, subMode]);

  useEffect(() => {
    if (!toast) return;
    toastAnim.setValue(0);
    Animated.spring(toastAnim, {
      toValue: 1,
      friction: 6,
      useNativeDriver: true,
    }).start();
  }, [toast, toastAnim]);

  useEffect(() => {
    if (subMode !== "trial" || finished || !current || toast) return;
    if (preCount <= 0) return;
    const timer = setTimeout(() => setPreCount((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [preCount, finished, current, index, toast, subMode]);

  useEffect(() => {
    if (subMode !== "trial" || finished || !current || toast) return;
    if (preCount > 0) return;
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, finished, current, index, preCount, toast, subMode]);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  if (!current) {
    return (
      <ScreenBackground>
        <View style={styles.center}>
          <Text style={[typography.body, { color: colors.textMuted }]}>
            Aucune carte disponible pour ce sous-thème.
          </Text>
          <Button label="Retour" onPress={onReplay} style={{ marginTop: spacing.md }} />
        </View>
      </ScreenBackground>
    );
  }

  if (subMode === "trial" && (!defendant || players.length === 0)) {
    return (
      <ScreenBackground>
        <View style={styles.center}>
          <Text style={[typography.body, { color: colors.textMuted }]}>
            Il faut au moins un·e joueur·se pour passer en jugement.
          </Text>
          <Button label="Retour" onPress={onReplay} style={{ marginTop: spacing.md }} />
        </View>
      </ScreenBackground>
    );
  }

  if (finished) {
    return (
      <SipsResults
        emoji="🎲"
        title="Le Mode Surprise est bouclé"
        players={players}
        sipsTotal={sipsTotal}
        emptyMessage="Soirée étonnamment sage : personne n'a bu une goutte, tous mini-jeux confondus."
        grandLoserLabel="🚩 Red Flag de la soirée"
        onReplay={onReplay}
        onEnd={onEnd}
      />
    );
  }

  function addSip(playerId: number, amount: number) {
    setSipsTotal((prev) => ({ ...prev, [playerId]: (prev[playerId] ?? 0) + amount }));
  }

  function goToNextSlot() {
    if (isLast) {
      setFinished(true);
      return;
    }
    const nextIndex = index + 1;
    const nextSubMode = cards[nextIndex]?.subMode;
    setIndex(nextIndex);
    setFlipped(false);
    setChillStatuses(zeroStatusMap(players));
    setVerdictAssignments(zeroVoteMap(players));
    setVerdictOutcome(null);
    setDesignated(zeroBoolMap(players));
    if (nextSubMode === "trial") {
      setDefendant(drawDefendant(defendant?.id));
      setPreCount(PRE_COUNT_S);
      setSecondsLeft(TRIAL_DURATION_S);
    }
  }

  function setChillStatus(playerId: number, status: ChillStatus) {
    setChillStatuses((prev) => ({ ...prev, [playerId]: status }));
  }

  function commitChillAndAdvance() {
    setSipsTotal((prev) => {
      const next = { ...prev };
      players.forEach((p) => {
        if (chillStatuses[p.id] === "vecu") next[p.id] = (next[p.id] ?? 0) + 1;
      });
      return next;
    });
    goToNextSlot();
  }

  function setVerdictVote(playerId: number, vote: Exclude<Vote, null>) {
    setVerdictAssignments((prev) => ({ ...prev, [playerId]: vote }));
  }

  function validateVerdictVote() {
    const redPlayers = players.filter((p) => verdictAssignments[p.id] === "red");
    const cleanPlayers = players.filter((p) => verdictAssignments[p.id] === "clean");
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

    setVerdictOutcome({
      redCount: redPlayers.length,
      cleanCount: cleanPlayers.length,
      minority,
    });
  }

  function toggleDesignated(playerId: number) {
    setDesignated((prev) => ({ ...prev, [playerId]: !prev[playerId] }));
  }

  function commitDesignationAndAdvance() {
    setSipsTotal((prev) => {
      const next = { ...prev };
      players.forEach((p) => {
        if (designated[p.id]) next[p.id] = (next[p.id] ?? 0) + 1;
      });
      return next;
    });
    goToNextSlot();
  }

  function trialVerdict(outcome: "rate" | "valide") {
    if (outcome === "rate") {
      addSip(defendant!.id, 1);
      const message =
        LOSE_MESSAGES[Math.floor(Math.random() * LOSE_MESSAGES.length)](
          defendant!.name
        );
      setToast(message);
      toastTimeoutRef.current = setTimeout(() => {
        setToast(null);
        goToNextSlot();
      }, LOSE_TOAST_DURATION_MS);
    } else {
      players.filter((p) => p.id !== defendant!.id).forEach((p) => addSip(p.id, 1));
      goToNextSlot();
    }
  }

  function handleTrialSwipe(direction: SwipeDirection) {
    trialVerdict(direction === "left" ? "rate" : "valide");
  }

  const header = (
    <>
      <Text style={[typography.caption, styles.mixBadge]}>🎲 Mode Surprise</Text>
      <ModeHeader mode={subModeInfo!} />
      <View style={styles.progressRow}>
        <Text style={[typography.caption, styles.progressText]}>
          {category.emoji} {category.label} · {subtheme.label}
        </Text>
        <Text style={[typography.caption, styles.progressText]}>
          {index + 1} / {cards.length}
        </Text>
      </View>
    </>
  );

  if (subMode === "trial") {
    const isPreCount = preCount > 0;
    const timeUp = secondsLeft <= 0;
    const interactionLocked = isPreCount || !!toast;

    return (
      <ScreenBackground>
        <View style={styles.content}>
          {header}

          <Card accentColor={colors.ink} style={styles.defendantCard}>
            <PlayerAvatar avatarId={defendant!.avatarId} size={24} />
            <View style={styles.defendantTextBlock}>
              <Text
                style={[typography.bodyBold, styles.defendantName]}
                numberOfLines={1}
              >
                {defendant!.name} est à la barre
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
              current={current.card}
              next={next?.card}
              category={category}
              subtheme={subtheme}
              onSwiped={handleTrialSwipe}
              swipeEnabled={!interactionLocked}
            />

            {isPreCount ? (
              <View style={styles.preCountBadge} pointerEvents="none">
                <Text style={styles.preCountText}>{preCount}</Text>
              </View>
            ) : null}

            {toast ? (
              <View style={styles.toastOverlay} pointerEvents="none">
                <Animated.View
                  style={{
                    opacity: toastAnim,
                    transform: [
                      {
                        scale: toastAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.85, 1],
                        }),
                      },
                    ],
                  }}
                >
                  <Card accentColor={colors.primary} style={styles.toastCard}>
                    <Text style={styles.toastEmoji}>🍻</Text>
                    <Text style={[typography.subtitle, styles.toastText]}>
                      {toast}
                    </Text>
                    <Text style={[typography.bodyBold, styles.toastSips]}>
                      +1 gorgée à boire, séance tenante !
                    </Text>
                  </Card>
                </Animated.View>
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
                onPress={() => trialVerdict("rate")}
                disabled={interactionLocked}
                style={styles.halfButton}
              />
              <Button
                label="Validé"
                icon="✅"
                onPress={() => trialVerdict("valide")}
                disabled={interactionLocked}
                style={styles.halfButton}
              />
            </View>
          </View>
        </View>
      </ScreenBackground>
    );
  }

  const back =
    subMode === "chill" ? (
      <RosterBack
        players={players}
        statuses={chillStatuses}
        onSetStatus={setChillStatus}
        onValidate={commitChillAndAdvance}
        isLast={isLast}
      />
    ) : subMode === "verdict" ? (
      <VerdictBack
        players={players}
        assignments={verdictAssignments}
        onSetVote={setVerdictVote}
        onValidate={validateVerdictVote}
        outcome={verdictOutcome}
        onNext={goToNextSlot}
        isLast={isLast}
      />
    ) : (
      <DesignationBack
        players={players}
        designated={designated}
        onToggle={toggleDesignated}
        onValidate={commitDesignationAndAdvance}
        isLast={isLast}
      />
    );

  const hint =
    subMode === "chill"
      ? "Swipe la carte ou appuie ci-dessous pour désigner qui l'a déjà vécue"
      : subMode === "verdict"
        ? "🚩 Levez la main bien haut pour \"Red Flag\" · ✅ Main baissée pour \"Pas Red Flag\""
        : "Tout le monde désigne en même temps à voix haute (ou du doigt), puis swipe ou appuie ci-dessous";

  const flipButtonLabel =
    subMode === "chill"
      ? "Qui l'a vécu ?"
      : subMode === "verdict"
        ? "Voir qui a voté quoi"
        : "On a désigné !";

  return (
    <ScreenBackground>
      <View style={styles.content}>
        {header}

        <CardDeck
          current={current.card}
          next={next?.card}
          category={category}
          subtheme={subtheme}
          onSwiped={() => setFlipped(true)}
          swipeEnabled={!flipped}
          flyOffOnSwipe={false}
        >
          <FlipCard
            key={current.card.id}
            flipped={flipped}
            style={styles.flipInner}
            front={
              <SituationCard
                situation={current.card}
                category={category}
                subtheme={subtheme}
              />
            }
            back={back}
          />
        </CardDeck>

        {!flipped ? (
          <View style={styles.panel}>
            <Text style={[typography.bodyBold, styles.hint]}>{hint}</Text>
            <Button
              label={flipButtonLabel}
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
  mixBadge: {
    color: colors.textFaint,
    textAlign: "center",
    marginBottom: 2,
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
    color: colors.ink,
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
    borderColor: colors.ink,
    zIndex: 5,
  },
  preCountText: {
    color: colors.ink,
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
  toastEmoji: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  toastText: {
    color: colors.text,
    textAlign: "center",
  },
  toastSips: {
    color: colors.primary,
    textAlign: "center",
    marginTop: spacing.sm,
  },
  buttonRow: {
    flexDirection: "row",
  },
  halfButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
});
