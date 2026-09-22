import { getDatabase } from "../database";

export type StatsPeriod = "day" | "month" | "year" | "all";

/** Traduit une période en filtre SQL sur played_at / created_at (colonne datetime UTC). */
function periodClause(column: string, period: StatsPeriod): string {
  switch (period) {
    case "day":
      return `date(${column}) = date('now')`;
    case "month":
      return `strftime('%Y-%m', ${column}) = strftime('%Y-%m', 'now')`;
    case "year":
      return `strftime('%Y', ${column}) = strftime('%Y', 'now')`;
    case "all":
    default:
      return "1 = 1";
  }
}

export interface GlobalStats {
  totalSessions: number;
  totalPlayers: number;
  totalQuestions: number;
  totalCorrect: number;
  totalSipsGiven: number;
  totalSipsReceived: number;
}

export async function getGlobalStats(
  period: StatsPeriod
): Promise<GlobalStats> {
  const db = await getDatabase();
  const clause = periodClause("played_at", period);

  const row = await db.getFirstAsync<{
    sessions: number;
    questions: number;
    correct: number;
    sipsGiven: number;
    sipsReceived: number;
  }>(
    `SELECT
      COUNT(DISTINCT session_id) as sessions,
      COALESCE(SUM(total_questions), 0) as questions,
      COALESCE(SUM(correct_answers), 0) as correct,
      COALESCE(SUM(sips_given), 0) as sipsGiven,
      COALESCE(SUM(sips_received), 0) as sipsReceived
     FROM game_results WHERE ${clause}`
  );

  const playersRow = await db.getFirstAsync<{ count: number }>(
    `SELECT COUNT(DISTINCT player_id) as count FROM game_results WHERE ${clause}`
  );

  return {
    totalSessions: row?.sessions ?? 0,
    totalPlayers: playersRow?.count ?? 0,
    totalQuestions: row?.questions ?? 0,
    totalCorrect: row?.correct ?? 0,
    totalSipsGiven: row?.sipsGiven ?? 0,
    totalSipsReceived: row?.sipsReceived ?? 0,
  };
}

export interface PlayerLeaderboardRow {
  playerId: number;
  name: string;
  sessions: number;
  totalScore: number;
  correctAnswers: number;
  totalQuestions: number;
  accuracy: number;
  sipsGiven: number;
  sipsReceived: number;
  wins: number;
}

/** Classement par joueur pour un jeu et une période donnés (ou tous les jeux si gameId est null). */
export async function getPlayerLeaderboard(
  period: StatsPeriod,
  gameId: string | null = null
): Promise<PlayerLeaderboardRow[]> {
  const db = await getDatabase();
  const clause = periodClause("gr.played_at", period);
  const gameFilter = gameId ? "AND gr.game_id = ?" : "";
  const params = gameId ? [gameId] : [];

  return db.getAllAsync<PlayerLeaderboardRow>(
    `SELECT
      p.id as playerId,
      p.name as name,
      COUNT(DISTINCT gr.session_id) as sessions,
      COALESCE(SUM(gr.score), 0) as totalScore,
      COALESCE(SUM(gr.correct_answers), 0) as correctAnswers,
      COALESCE(SUM(gr.total_questions), 0) as totalQuestions,
      CASE WHEN SUM(gr.total_questions) > 0
        THEN CAST(SUM(gr.correct_answers) AS FLOAT) / SUM(gr.total_questions)
        ELSE 0 END as accuracy,
      COALESCE(SUM(gr.sips_given), 0) as sipsGiven,
      COALESCE(SUM(gr.sips_received), 0) as sipsReceived,
      SUM(CASE WHEN gr.rank = 1 THEN 1 ELSE 0 END) as wins
     FROM game_results gr
     JOIN players p ON p.id = gr.player_id
     WHERE ${clause} ${gameFilter}
     GROUP BY p.id
     ORDER BY totalScore DESC`,
    params
  );
}

export interface ThemeAccuracyRow {
  theme: string;
  total: number;
  correct: number;
  accuracy: number;
}

export async function getQuizThemeBreakdown(
  period: StatsPeriod
): Promise<ThemeAccuracyRow[]> {
  const db = await getDatabase();
  const clause = periodClause("played_at", period);

  return db.getAllAsync<ThemeAccuracyRow>(
    `SELECT
      theme,
      COUNT(*) as total,
      SUM(is_correct) as correct,
      CAST(SUM(is_correct) AS FLOAT) / COUNT(*) as accuracy
     FROM quiz_answers
     WHERE ${clause}
     GROUP BY theme
     ORDER BY total DESC`
  );
}

/** Superlatifs "Hall of Fame" calculés à partir du leaderboard multi-jeux. */
export interface Superlative {
  key: string;
  title: string;
  emoji: string;
  playerName: string;
  valueLabel: string;
}

export async function getSuperlatives(
  period: StatsPeriod
): Promise<Superlative[]> {
  const leaderboard = await getPlayerLeaderboard(period, null);
  if (leaderboard.length === 0) return [];

  const superlatives: Superlative[] = [];

  const byAccuracy = [...leaderboard]
    .filter((p) => p.totalQuestions >= 3)
    .sort((a, b) => b.accuracy - a.accuracy)[0];
  if (byAccuracy) {
    superlatives.push({
      key: "brain",
      title: "Le Cerveau du groupe",
      emoji: "🧠",
      playerName: byAccuracy.name,
      valueLabel: `${Math.round(byAccuracy.accuracy * 100)}% de bonnes réponses`,
    });
  }

  const bySipsGiven = [...leaderboard].sort(
    (a, b) => b.sipsGiven - a.sipsGiven
  )[0];
  if (bySipsGiven && bySipsGiven.sipsGiven > 0) {
    superlatives.push({
      key: "dealer",
      title: "Le Semeur de Chaos",
      emoji: "😈",
      playerName: bySipsGiven.name,
      valueLabel: `${bySipsGiven.sipsGiven} gorgées distribuées`,
    });
  }

  const bySipsReceived = [...leaderboard].sort(
    (a, b) => b.sipsReceived - a.sipsReceived
  )[0];
  if (bySipsReceived && bySipsReceived.sipsReceived > 0) {
    superlatives.push({
      key: "sponge",
      title: "L'Éponge de la Soirée",
      emoji: "🍻",
      playerName: bySipsReceived.name,
      valueLabel: `${bySipsReceived.sipsReceived} gorgées bues`,
    });
  }

  const byWins = [...leaderboard].sort((a, b) => b.wins - a.wins)[0];
  if (byWins && byWins.wins > 0) {
    superlatives.push({
      key: "champion",
      title: "Le Champion",
      emoji: "🏆",
      playerName: byWins.name,
      valueLabel: `${byWins.wins} victoire${byWins.wins > 1 ? "s" : ""}`,
    });
  }

  const bySessions = [...leaderboard].sort((a, b) => b.sessions - a.sessions)[0];
  if (bySessions) {
    superlatives.push({
      key: "regular",
      title: "L'Habitué",
      emoji: "🎉",
      playerName: bySessions.name,
      valueLabel: `${bySessions.sessions} partie${bySessions.sessions > 1 ? "s" : ""} jouée${bySessions.sessions > 1 ? "s" : ""}`,
    });
  }

  const worstAccuracy = [...leaderboard]
    .filter((p) => p.totalQuestions >= 3)
    .sort((a, b) => a.accuracy - b.accuracy)[0];
  if (worstAccuracy) {
    superlatives.push({
      key: "cancre",
      title: "Le Cancre du Quiz",
      emoji: "🤡",
      playerName: worstAccuracy.name,
      valueLabel: `${Math.round(worstAccuracy.accuracy * 100)}% de bonnes réponses`,
    });
  }

  return superlatives;
}
