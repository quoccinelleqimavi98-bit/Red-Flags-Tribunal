import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScreenBackground } from "@components/ScreenBackground";
import { Button } from "@components/Button";
import { FlipCard } from "@components/FlipCard";
import { colors, spacing, typography } from "@core/theme";
import { Player } from "@core/types";
import { CardDeck } from "../../components/CardDeck";
import { CrownResults } from "../../components/CrownResults";
import { ModeHeader } from "../../components/ModeHeader";
import { RosterBack, ChillStatus } from "../../components/RosterBack";
import { SituationCard } from "../../components/SituationCard";
import { ModePlayScreenProps } from "./types";

function zeroStatusMap(players: Player[]): Record<number, ChillStatus> {
  const initial: Record<number, ChillStatus> = {};
  players.forEach((p) => (initial[p.id] = null));
  return initial;
}

function zeroTally(players: Player[]): Record<number, number> {
  const initial: Record<number, number> = {};
  players.forEach((p) => (initial[p.id] = 0));
  return initial;
}

/** Mode "Qui l'a déjà vécu ?" : la carte se retourne, chaque joueur est marqué vécu/pas vécu. */
export function ChillPlayScreen({
  mode,
  players,
  category,
  subtheme,
  cards,
  onReplay,
  onEnd,
}: ModePlayScreenProps) {
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [statuses, setStatuses] = useState<Record<number, ChillStatus>>(() =>
    zeroStatusMap(players)
  );
  const [counts, setCounts] = useState<Record<number, number>>(() =>
    zeroTally(players)
  );

  const current = cards[index];
  const next = cards[index + 1];
  const isLast = index + 1 >= cards.length;

  useEffect(() => {
    if (!flipped || players.length === 0) return;
    const allSet = players.every((p) => statuses[p.id] != null);
    if (!allSet) return;
    const timer = setTimeout(() => commitAndAdvance(), 350);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statuses, flipped]);

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
      <CrownResults
        emoji="🍀💀"
        title="Le verdict de la soirée"
        players={players}
        counts={counts}
        emptyMessage="Groupe irréprochable ce soir, personne ne s'est accusé·e."
        championLabel="Champion·ne incontesté·e de la poisse"
        onReplay={onReplay}
        onEnd={onEnd}
      />
    );
  }

  function setStatus(playerId: number, status: ChillStatus) {
    setStatuses((prev) => ({ ...prev, [playerId]: status }));
  }

  function commitAndAdvance() {
    setCounts((prev) => {
      const next = { ...prev };
      players.forEach((p) => {
        if (statuses[p.id] === "vecu") next[p.id] = (next[p.id] ?? 0) + 1;
      });
      return next;
    });
    if (isLast) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setFlipped(false);
    setStatuses(zeroStatusMap(players));
  }

  return (
    <ScreenBackground>
      <View style={styles.content}>
        <ModeHeader mode={mode} />
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
              <RosterBack
                players={players}
                statuses={statuses}
                onSetStatus={setStatus}
                onValidate={commitAndAdvance}
                isLast={isLast}
              />
            }
          />
        </CardDeck>

        {!flipped ? (
          <View style={styles.panel}>
            <Text style={[typography.bodyBold, styles.hint]}>
              Swipe la carte ou appuie ci-dessous pour désigner qui l'a déjà
              vécue
            </Text>
            <Button
              label="Qui l'a vécu ?"
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
