/**
 * Schéma SQLite. Toute évolution de schéma passe par une nouvelle entrée
 * dans MIGRATIONS (jamais de modif rétroactive d'une migration déjà publiée),
 * pour ne jamais perdre les stats déjà enregistrées sur l'appareil d'un joueur.
 */
export const MIGRATIONS: string[] = [
  // v1 — socle commun à tous les jeux
  `
  CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    last_played_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS game_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id TEXT NOT NULL,
    started_at TEXT NOT NULL DEFAULT (datetime('now')),
    ended_at TEXT
  );

  CREATE TABLE IF NOT EXISTS session_players (
    session_id INTEGER NOT NULL REFERENCES game_sessions(id),
    player_id INTEGER NOT NULL REFERENCES players(id),
    PRIMARY KEY (session_id, player_id)
  );

  CREATE TABLE IF NOT EXISTS game_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id INTEGER NOT NULL REFERENCES game_sessions(id),
    game_id TEXT NOT NULL,
    player_id INTEGER NOT NULL REFERENCES players(id),
    score INTEGER NOT NULL DEFAULT 0,
    correct_answers INTEGER NOT NULL DEFAULT 0,
    total_questions INTEGER NOT NULL DEFAULT 0,
    sips_given INTEGER NOT NULL DEFAULT 0,
    sips_received INTEGER NOT NULL DEFAULT 0,
    hints_used INTEGER NOT NULL DEFAULT 0,
    rank INTEGER NOT NULL DEFAULT 0,
    played_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS quiz_answers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id INTEGER NOT NULL REFERENCES game_sessions(id),
    player_id INTEGER NOT NULL REFERENCES players(id),
    question_id TEXT NOT NULL,
    theme TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    is_correct INTEGER NOT NULL,
    used_hint INTEGER NOT NULL DEFAULT 0,
    points_earned INTEGER NOT NULL DEFAULT 0,
    played_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS sip_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id INTEGER NOT NULL REFERENCES game_sessions(id),
    game_id TEXT NOT NULL,
    player_id INTEGER REFERENCES players(id),
    kind TEXT NOT NULL,
    label TEXT NOT NULL,
    amount INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_results_player ON game_results(player_id);
  CREATE INDEX IF NOT EXISTS idx_results_game ON game_results(game_id);
  CREATE INDEX IF NOT EXISTS idx_answers_theme ON quiz_answers(theme);
  CREATE INDEX IF NOT EXISTS idx_answers_player ON quiz_answers(player_id);
  `,
];
