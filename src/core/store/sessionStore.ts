import { create } from "zustand";
import { Player } from "../types";

interface SessionState {
  /** Joueurs actifs pour la soirée en cours, en mémoire uniquement. */
  players: Player[];
  setPlayers: (players: Player[]) => void;
  clearPlayers: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  players: [],
  setPlayers: (players) => set({ players }),
  clearPlayers: () => set({ players: [] }),
}));
