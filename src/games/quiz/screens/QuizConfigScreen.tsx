import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenBackground } from "@components/ScreenBackground";
import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { Chip } from "@components/Chip";
import { SectionTitle } from "@components/SectionTitle";
import { StepperInput } from "@components/StepperInput";
import { SegmentedToggle } from "@components/SegmentedToggle";
import { colors, spacing, typography } from "@core/theme";
import { GameConfigScreenProps } from "@core/games/types";
import { ALL_THEMES, QuizConfig, QuizMode, THEME_COLORS } from "../types";
import { QUESTIONS } from "../data/questions";

const THEME_EMOJIS: Record<string, string> = {
  Manga: "🌸",
  "Jeux Vidéo": "🎮",
  Séries: "📺",
  Films: "🎬",
  Musique: "🎵",
  "Culture Générale": "🧠",
};

export function QuizConfigScreen({ onLaunch }: GameConfigScreenProps) {
  const [selectedThemes, setSelectedThemes] = useState<string[]>([...ALL_THEMES]);
  const [questionCount, setQuestionCount] = useState(15);
  const [mode, setMode] = useState<QuizMode>("tour_par_tour");
  const [withChoices, setWithChoices] = useState(true);

  const availableQuestions = useMemo(
    () => QUESTIONS.filter((q) => selectedThemes.includes(q.theme)).length,
    [selectedThemes]
  );

  function toggleTheme(theme: string) {
    setSelectedThemes((prev) =>
      prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme]
    );
  }

  function handleLaunch() {
    const config: QuizConfig = {
      themes: selectedThemes as QuizConfig["themes"],
      questionCount: Math.min(questionCount, availableQuestions),
      mode,
      withChoices,
    };
    onLaunch(config);
  }

  const canLaunch = selectedThemes.length > 0 && availableQuestions > 0;

  return (
    <ScreenBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.emoji}>🧠🍻</Text>
        <Text style={[typography.title, { color: colors.text }]}>
          Le Quiz Ultime
        </Text>
        <Text style={[typography.body, styles.subtitle]}>
          Configurez la partie avant de lancer les hostilités.
        </Text>

        <View style={styles.section}>
          <SectionTitle
            title="Thèmes"
            subtitle="Cochez les sous-parties à inclure dans la pioche"
          />
          <View style={styles.chipsRow}>
            {ALL_THEMES.map((theme) => (
              <Chip
                key={theme}
                label={theme}
                emoji={THEME_EMOJIS[theme]}
                selected={selectedThemes.includes(theme)}
                onPress={() => toggleTheme(theme)}
                color={THEME_COLORS[theme]}
              />
            ))}
          </View>
        </View>

        <Card style={styles.section}>
          <StepperInput
            label="Nombre de questions"
            value={questionCount}
            options={[10, 15, 20, 25]}
            onChange={setQuestionCount}
          />
          <Text style={[typography.caption, styles.poolInfo]}>
            {availableQuestions} question{availableQuestions > 1 ? "s" : ""}{" "}
            disponible{availableQuestions > 1 ? "s" : ""} avec ces thèmes
          </Text>
        </Card>

        <Card style={styles.section}>
          <SegmentedToggle
            label="Mode de jeu"
            value={mode}
            onChange={setMode}
            options={[
              { value: "tour_par_tour", label: "Chacun son tour", emoji: "🔄" },
              { value: "au_plus_rapide", label: "Au plus rapide", emoji: "⚡" },
            ]}
          />
          <SegmentedToggle
            label="Propositions de réponses"
            value={withChoices ? "avec" : "sans"}
            onChange={(v) => setWithChoices(v === "avec")}
            options={[
              { value: "avec", label: "Avec choix", emoji: "🔤" },
              { value: "sans", label: "Sans (à l'oral)", emoji: "🎤" },
            ]}
          />
        </Card>

        <Card style={styles.infoCard} accentColor={colors.accent}>
          <Text style={[typography.bodyBold, { color: colors.text }]}>
            💡 Difficulté &amp; indices
          </Text>
          <Text style={[typography.body, styles.infoText]}>
            Facile = 10 pts, Moyen = 20 pts, Difficile = 30 pts. Utiliser un
            indice divise les points par deux. En mode "au plus rapide", plus
            vous répondez vite, plus le bonus est élevé.
          </Text>
        </Card>

        <Card style={styles.infoCard} accentColor={colors.primary}>
          <Text style={[typography.bodyBold, { color: colors.text }]}>
            🍻 Ambiance soirée
          </Text>
          <Text style={[typography.body, styles.infoText]}>
            Des gages et des gorgées surprises surgiront aléatoirement pendant
            la partie. Aucune partie ne se ressemble !
          </Text>
        </Card>

        <Button
          label="Lancer le quiz"
          icon="🚀"
          onPress={handleLaunch}
          disabled={!canLaunch}
          style={styles.launchButton}
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
  emoji: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textMuted,
    marginTop: 2,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.md,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  poolInfo: {
    color: colors.textFaint,
  },
  infoCard: {
    marginBottom: spacing.md,
  },
  infoText: {
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  launchButton: {
    marginTop: spacing.sm,
  },
});
