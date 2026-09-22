import React, { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenBackground } from "@components/ScreenBackground";
import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { SipEventModal } from "@components/SipEventModal";
import { colors, radius, spacing, typography } from "@core/theme";
import { GamePlayScreenProps } from "@core/games/types";
import {
  computePoints,
  nextPlayerIndex,
  pickQuestions,
  rollSipEvent,
  shuffleChoices,
} from "../engine/quizEngine";
import { formatSipDescription, SipEventTemplate } from "../data/sipEvents";
import { QuizConfig, QuizQuestion, THEME_COLORS } from "../types";

const TIME_LIMIT_MS = 15000;

interface PlayerScoreAcc {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  sipsGiven: number;
  sipsReceived: number;
  hintsUsed: number;
}

function emptyScore(): PlayerScoreAcc {
  return {
    score: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    sipsGiven: 0,
    sipsReceived: 0,
    hintsUsed: 0,
  };
}

export function QuizPlayScreen({
  players,
  config,
  onFinished,
}: GamePlayScreenProps<QuizConfig>) {
  const questions = useMemo(() => pickQuestions(config), [config]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [turnIndex, setTurnIndex] = useState(0);
  const [choices, setChoices] = useState<string[]>(() =>
    questions.length ? shuffleChoices(questions[0]) : []
  );
  const [answeringPlayerId, setAnsweringPlayerId] = useState<number | null>(
    config.mode === "tour_par_tour" ? players[0]?.id ?? null : null
  );
  const [hintUsed, setHintUsed] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const [revealedAnswer, setRevealedAnswer] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [lastPoints, setLastPoints] = useState(0);
  const [questionStartAt, setQuestionStartAt] = useState(Date.now());
  const [buzzElapsedMs, setBuzzElapsedMs] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());
  const [finished, setFinished] = useState(false);
  const [activeSipEvent, setActiveSipEvent] = useState<SipEventTemplate | null>(
    null
  );

  const [scores, setScores] = useState<Record<number, PlayerScoreAcc>>(() => {
    const initial: Record<number, PlayerScoreAcc> = {};
    players.forEach((p) => (initial[p.id] = emptyScore()));
    return initial;
  });

  const maybeQuestion: QuizQuestion | undefined = questions[questionIndex];
  const currentPlayer =
    config.mode === "tour_par_tour" ? players[turnIndex % players.length] : null;

  useEffect(() => {
    if (config.mode !== "au_plus_rapide" || answeringPlayerId !== null || resolved) {
      return;
    }
    const interval = setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(interval);
  }, [config.mode, answeringPlayerId, resolved, questionIndex]);

  if (!maybeQuestion) {
    return (
      <ScreenBackground>
        <View style={styles.center}>
          <Text style={[typography.body, { color: colors.textMuted }]}>
            Aucune question disponible pour cette configuration.
          </Text>
          <Button label="Retour" onPress={onFinished} style={{ marginTop: spacing.md }} />
        </View>
      </ScreenBackground>
    );
  }

  const question: QuizQuestion = maybeQuestion;

  function addSipsReceived(playerId: number, amount: number) {
    if (amount <= 0) return;
    setScores((prev) => ({
      ...prev,
      [playerId]: {
        ...prev[playerId],
        sipsReceived: prev[playerId].sipsReceived + amount,
      },
    }));
  }

  function addSipsGiven(playerId: number, amount: number) {
    if (amount <= 0) return;
    setScores((prev) => ({
      ...prev,
      [playerId]: {
        ...prev[playerId],
        sipsGiven: prev[playerId].sipsGiven + amount,
      },
    }));
  }

  function handleBuzz(playerId: number) {
    if (answeringPlayerId !== null) return;
    setAnsweringPlayerId(playerId);
    setBuzzElapsedMs(Date.now() - questionStartAt);
  }

  function toggleHint() {
    if (resolved) return;
    setHintUsed(true);
    setHintVisible(true);
  }

  function resolveAnswer(isCorrect: boolean) {
    if (resolved || answeringPlayerId === null) return;
    const elapsed =
      config.mode === "au_plus_rapide" ? buzzElapsedMs ?? TIME_LIMIT_MS : undefined;
    const speedFraction =
      elapsed !== undefined
        ? Math.max(0, Math.min(1, 1 - elapsed / TIME_LIMIT_MS))
        : undefined;
    const points = isCorrect
      ? computePoints(question, { usedHint: hintUsed, speedFraction })
      : 0;

    setScores((prev) => ({
      ...prev,
      [answeringPlayerId]: {
        ...prev[answeringPlayerId],
        score: prev[answeringPlayerId].score + points,
        correctAnswers: prev[answeringPlayerId].correctAnswers + (isCorrect ? 1 : 0),
        totalQuestions: prev[answeringPlayerId].totalQuestions + 1,
        hintsUsed: prev[answeringPlayerId].hintsUsed + (hintUsed ? 1 : 0),
      },
    }));

    setLastCorrect(isCorrect);
    setLastPoints(points);
    setResolved(true);
  }

  function applySipEvent(template: SipEventTemplate, playerId: number) {
    if (template.kind === "malus") {
      addSipsReceived(playerId, template.amount);
    } else if (template.kind === "bonus" && template.amount > 0) {
      addSipsGiven(playerId, template.amount);
    } else if (template.kind === "distribution") {
      const others = players.filter((p) => p.id !== playerId);
      addSipsGiven(playerId, template.amount * others.length);
      others.forEach((p) => addSipsReceived(p.id, template.amount));
    }
  }

  function goToNextQuestion() {
    const nextIndex = questionIndex + 1;
    if (nextIndex >= questions.length) {
      setFinished(true);
      return;
    }
    setQuestionIndex(nextIndex);
    setChoices(shuffleChoices(questions[nextIndex]));
    if (config.mode === "tour_par_tour") {
      const newTurn = nextPlayerIndex(turnIndex, players.length);
      setTurnIndex(newTurn);
      setAnsweringPlayerId(players[newTurn].id);
    } else {
      setAnsweringPlayerId(null);
      setBuzzElapsedMs(null);
    }
    setHintUsed(false);
    setHintVisible(false);
    setRevealedAnswer(false);
    setResolved(false);
    setQuestionStartAt(Date.now());
  }

  function handleContinue() {
    const event = answeringPlayerId !== null ? rollSipEvent() : null;
    if (event && answeringPlayerId !== null) {
      applySipEvent(event, answeringPlayerId);
      setActiveSipEvent(event);
    } else {
      goToNextQuestion();
    }
  }

  function handleSipModalClose() {
    setActiveSipEvent(null);
    goToNextQuestion();
  }

  if (finished) {
    return (
      <QuizResults
        players={players}
        scores={scores}
        onFinished={onFinished}
      />
    );
  }

  const answeringPlayer = players.find((p) => p.id === answeringPlayerId);
  const remainingMs =
    config.mode === "au_plus_rapide" && answeringPlayerId === null
      ? Math.max(0, TIME_LIMIT_MS - (now - questionStartAt))
      : null;
  const themeColor = THEME_COLORS[question.theme];
  const basePoints = resolved ? lastPoints : null;

  return (
    <ScreenBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.progressRow}>
          <Text style={[typography.caption, styles.progressText]}>
            Question {questionIndex + 1} / {questions.length}
          </Text>
          {config.mode === "tour_par_tour" && currentPlayer ? (
            <Text style={[typography.caption, { color: colors.gold }]}>
              Au tour de {currentPlayer.name}
            </Text>
          ) : remainingMs !== null ? (
            <Text style={[typography.caption, { color: colors.danger }]}>
              ⏱ {Math.ceil(remainingMs / 1000)}s
            </Text>
          ) : null}
        </View>

        <Card accentColor={themeColor} style={styles.questionCard}>
          <View style={styles.badgeRow}>
            <Badge label={question.theme} color={themeColor} />
            <Badge label={question.difficulty} color={colors.textFaint} />
          </View>
          <Text style={[typography.title, styles.questionText]}>
            {question.question}
          </Text>

          {hintVisible ? (
            <Text style={[typography.body, styles.hint]}>💡 {question.hint}</Text>
          ) : (
            <Pressable onPress={toggleHint} disabled={resolved}>
              <Text style={[typography.bodyBold, styles.hintButton]}>
                💡 Afficher un indice (÷2 points)
              </Text>
            </Pressable>
          )}
        </Card>

        {config.mode === "au_plus_rapide" && answeringPlayerId === null ? (
          <View style={styles.section}>
            <Text style={[typography.bodyBold, styles.sectionLabel]}>
              Qui buzz en premier ?
            </Text>
            <View style={styles.buzzRow}>
              {players.map((p) => (
                <Pressable
                  key={p.id}
                  onPress={() => handleBuzz(p.id)}
                  style={styles.buzzButton}
                >
                  <Text style={[typography.bodyBold, { color: colors.text }]}>
                    {p.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : null}

        {answeringPlayerId !== null && !resolved ? (
          <View style={styles.section}>
            {config.mode === "au_plus_rapide" ? (
              <Text style={[typography.bodyBold, styles.sectionLabel]}>
                {answeringPlayer?.name} répond :
              </Text>
            ) : null}

            {config.withChoices ? (
              <View>
                {choices.map((choice) => (
                  <Pressable
                    key={choice}
                    onPress={() => resolveAnswer(choice === question.answer)}
                    style={styles.choiceButton}
                  >
                    <Text style={[typography.bodyBold, { color: colors.text }]}>
                      {choice}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ) : !revealedAnswer ? (
              <Button
                label="Révéler la réponse"
                icon="🔍"
                variant="ghost"
                onPress={() => setRevealedAnswer(true)}
              />
            ) : (
              <View>
                <Card style={styles.answerCard}>
                  <Text style={[typography.subtitle, { color: colors.accent }]}>
                    {question.answer}
                  </Text>
                </Card>
                <View style={styles.judgeRow}>
                  <Button
                    label="Correct"
                    icon="✅"
                    variant="primary"
                    onPress={() => resolveAnswer(true)}
                    style={styles.judgeButton}
                  />
                  <Button
                    label="Faux"
                    icon="❌"
                    variant="danger"
                    onPress={() => resolveAnswer(false)}
                    style={styles.judgeButton}
                  />
                </View>
              </View>
            )}
          </View>
        ) : null}

        {resolved ? (
          <Card
            style={styles.feedbackCard}
            accentColor={lastCorrect ? colors.success : colors.danger}
          >
            <Text style={[typography.subtitle, { color: colors.text }]}>
              {lastCorrect ? "✅ Bonne réponse !" : "❌ Mauvaise réponse"}
              {lastCorrect ? ` (+${basePoints} pts)` : ""}
            </Text>
            {!config.withChoices ? null : (
              <Text style={[typography.body, styles.correctAnswerText]}>
                Réponse : {question.answer}
              </Text>
            )}
            <Text style={[typography.body, styles.funFact]}>
              ℹ️ {question.funFact}
            </Text>
            <Button
              label={
                questionIndex + 1 >= questions.length
                  ? "Voir les résultats"
                  : "Question suivante"
              }
              icon="➡️"
              onPress={handleContinue}
              style={{ marginTop: spacing.md }}
            />
          </Card>
        ) : null}
      </ScrollView>

      <SipEventModal
        visible={!!activeSipEvent}
        emoji={activeSipEvent?.emoji ?? ""}
        title={activeSipEvent?.title ?? ""}
        description={activeSipEvent ? formatSipDescription(activeSipEvent) : ""}
        onClose={handleSipModalClose}
      />
    </ScreenBackground>
  );
}

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <View style={[styles.badge, { borderColor: color }]}>
      <Text style={[typography.caption, { color }]}>{label}</Text>
    </View>
  );
}

function QuizResults({
  players,
  scores,
  onFinished,
}: {
  players: { id: number; name: string }[];
  scores: Record<number, PlayerScoreAcc>;
  onFinished: () => void;
}) {
  const ranked = players
    .map((p) => ({ player: p, stats: scores[p.id] ?? emptyScore() }))
    .sort((a, b) => b.stats.score - a.stats.score);

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.resultsContent}>
        <Text style={styles.resultsEmoji}>🏆</Text>
        <Text style={[typography.title, { color: colors.text, textAlign: "center" }]}>
          Résultats de la partie
        </Text>

        {ranked.map((entry, index) => (
          <Card
            key={entry.player.id}
            style={styles.resultRow}
            accentColor={index === 0 ? colors.gold : undefined}
          >
            <Text style={styles.resultRank}>
              {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
            </Text>
            <View style={styles.resultInfo}>
              <Text style={[typography.bodyBold, { color: colors.text }]}>
                {entry.player.name}
              </Text>
              <Text style={[typography.caption, styles.resultMeta]}>
                {entry.stats.correctAnswers}/{entry.stats.totalQuestions} bonnes
                réponses · 🍻 {entry.stats.sipsReceived} bues · 😈{" "}
                {entry.stats.sipsGiven} distribuées
              </Text>
            </View>
            <Text style={[typography.title, { color: colors.gold }]}>
              {entry.stats.score}
            </Text>
          </Card>
        ))}

        <Button
          label="Terminer"
          icon="🎉"
          onPress={onFinished}
          style={{ marginTop: spacing.lg }}
        />
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  progressText: {
    color: colors.textFaint,
  },
  questionCard: {
    marginBottom: spacing.md,
  },
  badgeRow: {
    flexDirection: "row",
    marginBottom: spacing.sm,
  },
  badge: {
    borderWidth: 1.5,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    marginRight: spacing.xs,
  },
  questionText: {
    color: colors.text,
    marginBottom: spacing.md,
  },
  hint: {
    color: colors.accent,
    fontStyle: "italic",
  },
  hintButton: {
    color: colors.accent,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionLabel: {
    color: colors.text,
    marginBottom: spacing.sm,
  },
  buzzRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  buzzButton: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  choiceButton: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  answerCard: {
    alignItems: "center",
    marginBottom: spacing.md,
  },
  judgeRow: {
    flexDirection: "row",
  },
  judgeButton: {
    flex: 1,
    marginRight: spacing.sm,
  },
  feedbackCard: {
    marginTop: spacing.sm,
  },
  correctAnswerText: {
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  funFact: {
    color: colors.textMuted,
    marginTop: spacing.sm,
    fontStyle: "italic",
  },
  resultsContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  resultsEmoji: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: spacing.xs,
  },
  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.md,
  },
  resultRank: {
    fontSize: 22,
    width: 44,
  },
  resultInfo: {
    flex: 1,
  },
  resultMeta: {
    color: colors.textFaint,
    marginTop: 2,
  },
});
