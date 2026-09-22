import React, { useRef } from "react";
import { Animated, PanResponder, StyleProp, ViewStyle } from "react-native";

export type SwipeDirection = "left" | "right";

interface SwipeCardProps {
  /** Appelé une fois le swipe validé (seuil dépassé), avec la direction. */
  onSwiped: (direction: SwipeDirection) => void;
  swipeEnabled?: boolean;
  /**
   * true (par défaut) : la carte file hors écran avant d'appeler
   * `onSwiped` (effet Tinder classique). false : la carte revient
   * simplement au centre et `onSwiped` est appelé immédiatement — utile
   * quand le swipe déclenche une autre animation (ex. un retournement)
   * plutôt qu'un changement de carte.
   */
  flyOffOnSwipe?: boolean;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const SWIPE_THRESHOLD = 120;
const MAX_ROTATION_DEG = 12;
const EXIT_DISTANCE = 500;

/**
 * Carte glissable façon Tinder/TOD : suit le doigt horizontalement avec
 * une légère rotation, revient au centre si le swipe n'est pas assez
 * marqué, ou file hors écran et déclenche `onSwiped` sinon. Le composant
 * ne sait rien du contenu qu'il transporte — la logique "carte suivante"
 * reste chez l'appelant.
 */
export function SwipeCard({
  onSwiped,
  swipeEnabled = true,
  flyOffOnSwipe = true,
  style,
  children,
}: SwipeCardProps) {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        swipeEnabled && Math.abs(gesture.dx) > 6,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gesture) => {
        if (Math.abs(gesture.dx) > SWIPE_THRESHOLD) {
          const direction: SwipeDirection = gesture.dx > 0 ? "right" : "left";
          if (flyOffOnSwipe) {
            const toX = gesture.dx > 0 ? EXIT_DISTANCE : -EXIT_DISTANCE;
            Animated.timing(pan, {
              toValue: { x: toX, y: gesture.dy },
              duration: 220,
              useNativeDriver: false,
            }).start(() => {
              pan.setValue({ x: 0, y: 0 });
              onSwiped(direction);
            });
          } else {
            Animated.spring(pan, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: false,
              friction: 6,
            }).start();
            onSwiped(direction);
          }
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
            friction: 6,
          }).start();
        }
      },
    })
  ).current;

  const rotate = pan.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [`-${MAX_ROTATION_DEG}deg`, "0deg", `${MAX_ROTATION_DEG}deg`],
  });

  return (
    <Animated.View
      {...(swipeEnabled ? panResponder.panHandlers : {})}
      style={[
        style,
        { transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate }] },
      ]}
    >
      {children}
    </Animated.View>
  );
}
