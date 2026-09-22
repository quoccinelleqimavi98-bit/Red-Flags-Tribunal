import React from "react";
import { Text } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@core/navigation/types";
import { useSessionStore } from "@core/store/sessionStore";
import { getGame } from "@core/games";
import { ScreenBackground } from "@components/ScreenBackground";

type Props = NativeStackScreenProps<RootStackParamList, "GamePlay">;

export function GamePlayScreen({ route, navigation }: Props) {
  const { gameId, config } = route.params;
  const players = useSessionStore((s) => s.players);
  const game = getGame(gameId);

  if (!game) {
    return (
      <ScreenBackground>
        <Text>Jeu introuvable : {gameId}</Text>
      </ScreenBackground>
    );
  }

  const PlayScreen = game.PlayScreen;
  return (
    <PlayScreen
      players={players}
      config={config}
      onFinished={() =>
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: "Home" }, { name: "GameMenu" }],
          })
        )
      }
    />
  );
}
