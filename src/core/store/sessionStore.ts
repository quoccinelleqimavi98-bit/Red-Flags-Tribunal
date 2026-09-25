import { create } from "zustand";
import { Player } from "../types";

interface SessionState {
  /** Joueurs actifs pour la soirée en cours, en mémoire uniquement. */
  players: Player[];
  setPlayers: (players: Player[]) => void;
  clearPlayers: () => void;
  /** Ids des cartes déjà servies par sous-thème, pour ne pas répéter une
   * situation tant que le sous-thème n'est pas épuisé (même session). */
  seenCardIdsBySubtheme: Record<string, string[]>;
  setSeenCardIds: (subthemeId: string, ids: string[]) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  players: [],
  setPlayers: (players) => set({ players }),
  clearPlayers: () => set({ players: [] }),
  seenCardIdsBySubtheme: {},
  setSeenCardIds: (subthemeId, ids) =>
    set((state) => ({
      seenCardIdsBySubtheme: { ...state.seenCardIdsBySubtheme, [subthemeId]: ids },
    })),
}));
