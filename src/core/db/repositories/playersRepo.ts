import { getDatabase, slugifyName } from "../database";

export interface PlayerRecord {
  id: number;
  slug: string;
  name: string;
  created_at: string;
  last_played_at: string;
}

/**
 * Crée le joueur s'il n'existe pas (identifié par le prénom normalisé), ou
 * met à jour sa dernière date de jeu. Permet de retrouver un même joueur
 * d'une soirée à l'autre sans compte ni mot de passe.
 */
export async function upsertPlayer(name: string): Promise<PlayerRecord> {
  const db = await getDatabase();
  const slug = slugifyName(name);

  const existing = await db.getFirstAsync<PlayerRecord>(
    "SELECT * FROM players WHERE slug = ?",
    [slug]
  );

  if (existing) {
    await db.runAsync(
      "UPDATE players SET last_played_at = datetime('now'), name = ? WHERE id = ?",
      [name.trim(), existing.id]
    );
    return { ...existing, name: name.trim() };
  }

  const result = await db.runAsync(
    "INSERT INTO players (slug, name) VALUES (?, ?)",
    [slug, name.trim()]
  );

  const created = await db.getFirstAsync<PlayerRecord>(
    "SELECT * FROM players WHERE id = ?",
    [result.lastInsertRowId]
  );
  if (!created) throw new Error("Impossible de créer le joueur");
  return created;
}

export async function upsertPlayers(
  names: string[]
): Promise<PlayerRecord[]> {
  const players: PlayerRecord[] = [];
  for (const name of names) {
    players.push(await upsertPlayer(name));
  }
  return players;
}

export async function getAllPlayers(): Promise<PlayerRecord[]> {
  const db = await getDatabase();
  return db.getAllAsync<PlayerRecord>(
    "SELECT * FROM players ORDER BY last_played_at DESC"
  );
}
