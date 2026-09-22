import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScreenBackground } from "@components/ScreenBackground";
import { Button } from "@components/Button";
import { FlipCard } from "@components/FlipCard";
import { colors, spacing, typography } from "@core/theme";
import { Player } from "@core/types";
import { CardDeck } from "../../components/CardDeck";
import { CrownResults } from "../../components/CrownResults";
import { DesignationBack } from "../../components/DesignationBack";
import { SituationCard } from "../../components/SituationCard";
import { ModePlayScreenProps } from "./types";

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

/** Mode "Ce Serait Qui" : le groupe désigne à voix haute, le host reporte sur le dos de la carte. */
export function WhoIsMostLikelyPlayScreen({
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
  const [designated, setDesignated] = useState<Record<number, boolean>>(() =>
    zeroBoolMap(players)
  );
  const [counts, setCounts] = useState<Record<number, number>>(() =>
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
            Aucun prompt disponible pour ce sous-thème.
          </Text>
          <Button label="Retour" onPress={onReplay} style={{ marginTop: spacing.md }} />
        </View>
      </ScreenBackground>
    );
  }

  if (finished) {
    return (
      <CrownResults
        emoji="🔮👑"
        title="Le verdict est tombé"
        players={players}
        counts={counts}
        emptyMessage="Personne n'a été désigné·e ce soir, groupe étonnamment discret."
        championLabel="Le Red Flag de la soirée"
        sipsAwarded={2}
        onReplay={onReplay}
        onEnd={onEnd}
      />
    );
  }

  function toggleDesignated(playerId: number) {
    setDesignated((prev) => ({ ...prev, [playerId]: !prev[playerId] }));
  }

  function commitAndAdvance() {
    setCounts((prev) => {
      const next = { ...prev };
      players.forEach((p) => {
        if (designated[p.id]) next[p.id] = (next[p.id] ?? 0) + 1;
      });
      return next;
    });
    if (isLast) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setFlipped(false);
    setDesignated(zeroBoolMap(players));
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
              <DesignationBack
                players={players}
                designated={designated}
                onToggle={toggleDesignated}
                onValidate={commitAndAdvance}
                isLast={isLast}
              />
            }
          />
        </CardDeck>

        {!flipped ? (
          <View style={styles.panel}>
            <Text style={[typography.bodyBold, styles.hint]}>
              Tout le monde désigne en même temps à voix haute (ou du doigt),
              puis swipe ou appuie ci-dessous
            </Text>
            <Button
              label="On a désigné !"
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
