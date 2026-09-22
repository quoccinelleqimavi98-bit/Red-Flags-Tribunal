import React from "react";
import { StyleSheet, View } from "react-native";
import { SwipeCard } from "@components/SwipeCard";
import { SituationCard } from "./SituationCard";
import {
  RedFlagCategoryInfo,
  RedFlagSituation,
  RedFlagSubtheme,
} from "../types";

export const CARD_WIDTH = "92%" as const;

interface CardDeckProps {
  current: RedFlagSituation;
  next?: RedFlagSituation;
  category: RedFlagCategoryInfo;
  subtheme: RedFlagSubtheme;
  onSwiped: (direction: "left" | "right") => void;
  swipeEnabled: boolean;
  /** false : la carte reste au centre et se retourne plutôt que de filer hors écran. */
  flyOffOnSwipe?: boolean;
  /** Contenu de la face avant ; par défaut la carte de situation classique
   * (utilisé tel quel, ou enveloppé dans un <FlipCard> par l'appelant). */
  children?: React.ReactNode;
}

/**
 * Pile de cartes façon TOD, réutilisée par tous les modes : la carte
 * suivante apparaît en aperçu, légèrement réduite et décalée, derrière la
 * carte active (swipable).
 */
export function CardDeck({
  current,
  next,
  category,
  subtheme,
  onSwiped,
  swipeEnabled,
  flyOffOnSwipe = true,
  children,
}: CardDeckProps) {
  return (
    <View style={styles.deck}>
      {next ? (
        <View style={styles.behindCard} pointerEvents="none">
          <SituationCard situation={next} category={category} subtheme={subtheme} />
        </View>
      ) : null}
      <SwipeCard
        onSwiped={onSwiped}
        swipeEnabled={swipeEnabled}
        flyOffOnSwipe={flyOffOnSwipe}
        style={styles.frontCard}
      >
        {children ?? (
          <SituationCard situation={current} category={category} subtheme={subtheme} />
        )}
      </SwipeCard>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
