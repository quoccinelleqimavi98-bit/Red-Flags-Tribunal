import React, { useEffect, useRef } from "react";
import { Animated, StyleProp, StyleSheet, ViewStyle } from "react-native";

interface FlipCardProps {
  /** Face actuellement visible. Piloté par l'appelant (pas de state interne). */
  flipped: boolean;
  front: React.ReactNode;
  back: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  durationMs?: number;
}

/**
 * Carte à deux faces qui se retourne autour de l'axe vertical. Le
 * composant ne fait qu'animer `flipped` : pour qu'une nouvelle carte
 * reparte instantanément face avant (sans animation de retour), montez-la
 * avec une nouvelle `key` plutôt que de repasser `flipped` à false.
 */
export function FlipCard({
  flipped,
  front,
  back,
  style,
  durationMs = 420,
}: FlipCardProps) {
  const progress = useRef(new Animated.Value(flipped ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: flipped ? 1 : 0,
      duration: durationMs,
      useNativeDriver: true,
    }).start();
  }, [flipped]);

  const frontRotate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });
  const backRotate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });
  const frontOpacity = progress.interpolate({
    inputRange: [0, 0.5, 0.5001, 1],
    outputRange: [1, 1, 0, 0],
  });
  const backOpacity = progress.interpolate({
    inputRange: [0, 0.5, 0.5001, 1],
    outputRange: [0, 0, 1, 1],
  });

  return (
    <Animated.View style={style}>
      <Animated.View
        style={[
          styles.face,
          {
            opacity: frontOpacity,
            transform: [{ perspective: 1200 }, { rotateY: frontRotate }],
          },
        ]}
      >
        {front}
      </Animated.View>
      <Animated.View
        style={[
          styles.face,
          styles.back,
          {
            opacity: backOpacity,
            transform: [{ perspective: 1200 }, { rotateY: backRotate }],
          },
        ]}
      >
        {back}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  face: {
    backfaceVisibility: "hidden",
  },
  back: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
