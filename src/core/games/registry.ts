import { GameModule } from "./types";

const registry = new Map<string, GameModule<any>>();

/** Appelé par chaque module de jeu pour s'enregistrer auprès de l'app. */
export function registerGame<TConfig = any>(module: GameModule<TConfig>): void {
  if (registry.has(module.id)) {
    console.warn(`Le jeu "${module.id}" est déjà enregistré, il sera remplacé.`);
  }
  registry.set(module.id, module);
}

export function getGames(): GameModule[] {
  return Array.from(registry.values());
}

export function getGame(id: string): GameModule | undefined {
  return registry.get(id);
}
