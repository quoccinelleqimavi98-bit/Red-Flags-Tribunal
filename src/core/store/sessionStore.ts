import { create } from "zustand";
import { PlayerRecord } from "../db/repositories/playersRepo";

interface SessionState {
  /** Joueurs actifs pour la soirée en cours (persistés en DB via upsertPlayers). */
  players: PlayerRecord[];
  setPlayers: (players: PlayerRecord[]) => void;
  clearPlayers: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  players: [],
  setPlayers: (players) => set({ players }),
  clearPlayers: () => set({ players: [] }),
}));
