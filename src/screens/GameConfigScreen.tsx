import React from "react";
import { Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@core/navigation/types";
import { useSessionStore } from "@core/store/sessionStore";
import { getGame } from "@core/games";
import { ScreenBackground } from "@components/ScreenBackground";

type Props = NativeStackScreenProps<RootStackParamList, "GameConfig">;

/**
 * Dispatcher générique : délègue l'écran de configuration au module de jeu
 * correspondant. La navigation n'a jamais besoin de connaître les jeux
 * individuellement, ce qui permet d'en ajouter sans y toucher.
 */
export function GameConfigScreen({ route, navigation }: Props) {
  const { gameId } = route.params;
  const players = useSessionStore((s) => s.players);
  const game = getGame(gameId);

  if (!game) {
    return (
      <ScreenBackground>
        <Text>Jeu introuvable : {gameId}</Text>
      </ScreenBackground>
    );
  }

  const ConfigScreen = game.ConfigScreen;
  return (
    <ConfigScreen
      players={players}
      onLaunch={(config) =>
        navigation.navigate("GamePlay", { gameId, config })
      }
    />
  );
}
