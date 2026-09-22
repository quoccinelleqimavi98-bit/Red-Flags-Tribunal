import { ComponentType } from "react";
import { PlayerRecord } from "../db/repositories/playersRepo";

/**
 * Contrat que doit respecter tout mini-jeu pour s'intégrer à l'app.
 * Pour ajouter un nouveau jeu (patch futur) :
 *   1. Créer un dossier src/games/<mon-jeu>/
 *   2. Implémenter ce contrat dans un `index.ts`
 *   3. Ajouter `import "../games/<mon-jeu>";` dans src/core/games/index.ts
 * Aucune autre modification du cœur de l'app n'est nécessaire : la navigation,
 * le menu et les stats découvrent le jeu automatiquement via le registre.
 */
export interface GameConfigScreenProps {
  players: PlayerRecord[];
  onLaunch: (config: unknown) => void;
}

export interface GamePlayScreenProps<TConfig = unknown> {
  players: PlayerRecord[];
  config: TConfig;
  onFinished: () => void;
}

export interface GameModule<TConfig = any> {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  color: string;
  minPlayers: number;
  /** Nombre de sous-parties / thèmes proposés, affiché dans le menu. */
  variantCount?: number;
  ConfigScreen: ComponentType<GameConfigScreenProps>;
  PlayScreen: ComponentType<GamePlayScreenProps<TConfig>>;
}
