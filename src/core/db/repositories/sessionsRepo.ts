import { getDatabase } from "../database";

export interface GameResultInput {
  playerId: number;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  sipsGiven: number;
  sipsReceived: number;
  hintsUsed: number;
  rank: number;
}

export interface SipEventInput {
  playerId?: number | null;
  kind: string;
  label: string;
  amount: number;
}

export interface QuizAnswerInput {
  playerId: number;
  questionId: string;
  theme: string;
  difficulty: string;
  isCorrect: boolean;
  usedHint: boolean;
  pointsEarned: number;
}

/** Démarre une session de jeu et rattache les joueurs actifs du soir. */
export async function startGameSession(
  gameId: string,
  playerIds: number[]
): Promise<number> {
  const db = await getDatabase();
  const result = await db.runAsync(
    "INSERT INTO game_sessions (game_id) VALUES (?)",
    [gameId]
  );
  const sessionId = Number(result.lastInsertRowId);

  for (const playerId of playerIds) {
    await db.runAsync(
      "INSERT OR IGNORE INTO session_players (session_id, player_id) VALUES (?, ?)",
      [sessionId, playerId]
    );
  }

  return sessionId;
}

export async function endGameSession(sessionId: number): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    "UPDATE game_sessions SET ended_at = datetime('now') WHERE id = ?",
    [sessionId]
  );
}

export async function saveGameResults(
  sessionId: number,
  gameId: string,
  results: GameResultInput[]
): Promise<void> {
  const db = await getDatabase();
  for (const r of results) {
    await db.runAsync(
      `INSERT INTO game_results
        (session_id, game_id, player_id, score, correct_answers, total_questions, sips_given, sips_received, hints_used, rank)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        sessionId,
        gameId,
        r.playerId,
        r.score,
        r.correctAnswers,
        r.totalQuestions,
        r.sipsGiven,
        r.sipsReceived,
        r.hintsUsed,
        r.rank,
      ]
    );
  }
}

export async function saveQuizAnswers(
  sessionId: number,
  answers: QuizAnswerInput[]
): Promise<void> {
  const db = await getDatabase();
  for (const a of answers) {
    await db.runAsync(
      `INSERT INTO quiz_answers
        (session_id, player_id, question_id, theme, difficulty, is_correct, used_hint, points_earned)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        sessionId,
        a.playerId,
        a.questionId,
        a.theme,
        a.difficulty,
        a.isCorrect ? 1 : 0,
        a.usedHint ? 1 : 0,
        a.pointsEarned,
      ]
    );
  }
}

export async function saveSipEvents(
  sessionId: number,
  gameId: string,
  events: SipEventInput[]
): Promise<void> {
  const db = await getDatabase();
  for (const e of events) {
    await db.runAsync(
      `INSERT INTO sip_events (session_id, game_id, player_id, kind, label, amount)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [sessionId, gameId, e.playerId ?? null, e.kind, e.label, e.amount]
    );
  }
}
