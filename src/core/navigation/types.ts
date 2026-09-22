export type RootStackParamList = {
  Home: undefined;
  PlayerSetup: undefined;
  GameMenu: undefined;
  GameConfig: { gameId: string };
  GamePlay: { gameId: string; config: unknown };
  Stats: undefined;
};
