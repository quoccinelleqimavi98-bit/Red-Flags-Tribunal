import * as SQLite from "expo-sqlite";
import { MIGRATIONS } from "./schema";

const DB_NAME = "soiree_games.db";

let dbInstance: SQLite.SQLiteDatabase | null = null;
let readyPromise: Promise<SQLite.SQLiteDatabase> | null = null;

/**
 * Ouvre (ou récupère) la base SQLite persistante de l'appareil et applique
 * les migrations manquantes. La base vit dans le stockage applicatif natif :
 * elle survit aux mises à jour de l'app et aux régénérations d'APK tant que
 * l'utilisateur ne désinstalle pas l'application.
 */
export function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (readyPromise) return readyPromise;

  readyPromise = (async () => {
    const db = await SQLite.openDatabaseAsync(DB_NAME);
    await db.execAsync("PRAGMA journal_mode = WAL;");
    await db.execAsync("PRAGMA foreign_keys = ON;");

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS schema_meta (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        version INTEGER NOT NULL DEFAULT 0
      );
      INSERT OR IGNORE INTO schema_meta (id, version) VALUES (1, 0);
    `);

    const row = await db.getFirstAsync<{ version: number }>(
      "SELECT version FROM schema_meta WHERE id = 1"
    );
    let currentVersion = row?.version ?? 0;

    for (let i = currentVersion; i < MIGRATIONS.length; i++) {
      await db.execAsync(MIGRATIONS[i]);
      await db.runAsync("UPDATE schema_meta SET version = ? WHERE id = 1", [
        i + 1,
      ]);
    }

    dbInstance = db;
    return db;
  })();

  return readyPromise;
}

export function slugifyName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, "-");
}
