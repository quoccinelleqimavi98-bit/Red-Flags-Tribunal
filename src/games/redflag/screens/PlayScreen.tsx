import React, { useEffect, useMemo } from "react";
import { CommonActions } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@core/navigation/types";
import { useSessionStore } from "@core/store/sessionStore";
import { pickCards } from "../engine/redflagEngine";
import { CATEGORIES, MODES, SUBTHEMES } from "../types";
import { ChillPlayScreen } from "./modes/ChillPlayScreen";
import { VerdictPlayScreen } from "./modes/VerdictPlayScreen";
import { TrialPlayScreen } from "./modes/TrialPlayScreen";
import { WhoIsMostLikelyPlayScreen } from "./modes/WhoIsMostLikelyPlayScreen";

type Props = NativeStackScreenProps<RootStackParamList, "Play">;

/**
 * Dispatcher : pioche les cartes et délègue à l'écran du mode choisi.
 * Ajouter un mode = une entrée dans redflag/types.ts (MODES) + un écran
 * dans screens/modes/ + une ligne ici, sans toucher au reste de l'app.
 */
export function PlayScreen({ navigation, route }: Props) {
  const { category, subthemeId, mode } = route.params;
  const players = useSessionStore((s) => s.players);
  const seenCardIdsBySubtheme = useSessionStore((s) => s.seenCardIdsBySubtheme);
  const setSeenCardIds = useSessionStore((s) => s.setSeenCardIds);

  const { cards, seenIds } = useMemo(
    () =>
      pickCards(
        { category, subthemeId, mode },
        seenCardIdsBySubtheme[subthemeId] ?? []
      ),
    // Volontairement calculé une seule fois par partie (au montage de cet
    // écran) : on ne veut pas repiocher si le store se met à jour ailleurs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [category, subthemeId, mode]
  );

  useEffect(() => {
    setSeenCardIds(subthemeId, seenIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seenIds]);

  const categoryInfo = CATEGORIES.find((c) => c.id === category)!;
  const subthemeInfo = SUBTHEMES.find((s) => s.id === subthemeId)!;
  const modeInfo = MODES.find((m) => m.id === mode)!;

  function onReplay() {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "Home" }, { name: "Mode" }],
      })
    );
  }

  function onEnd() {
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: "Home" }] })
    );
  }

  const commonProps = {
    mode: modeInfo,
    players,
    category: categoryInfo,
    subtheme: subthemeInfo,
    cards,
    onReplay,
    onEnd,
  };

  switch (mode) {
    case "chill":
      return <ChillPlayScreen {...commonProps} />;
    case "verdict":
      return <VerdictPlayScreen {...commonProps} />;
    case "trial":
      return <TrialPlayScreen {...commonProps} />;
    case "whoismostlikely":
      return <WhoIsMostLikelyPlayScreen {...commonProps} />;
    default:
      return null;
  }
}
