import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenBackground } from "@components/ScreenBackground";
import { Card } from "@components/Card";
import { SectionTitle } from "@components/SectionTitle";
import { SegmentedToggle } from "@components/SegmentedToggle";
import { colors, spacing, typography } from "@core/theme";
import { RootStackParamList } from "@core/navigation/types";
import {
  getGlobalStats,
  getPlayerLeaderboard,
  getQuizThemeBreakdown,
  getSuperlatives,
  GlobalStats,
  PlayerLeaderboardRow,
  StatsPeriod,
  Superlative,
  ThemeAccuracyRow,
} from "@core/db/repositories/statsRepo";

type Props = NativeStackScreenProps<RootStackParamList, "Stats">;

const PERIODS: { value: StatsPeriod; label: string }[] = [
  { value: "day", label: "Jour" },
  { value: "month", label: "Mois" },
  { value: "year", label: "Année" },
  { value: "all", label: "Toujours" },
];

export function StatsScreen({ navigation }: Props) {
  const [period, setPeriod] = useState<StatsPeriod>("all");
  const [global, setGlobal] = useState<GlobalStats | null>(null);
  const [leaderboard, setLeaderboard] = useState<PlayerLeaderboardRow[]>([]);
  const [themes, setThemes] = useState<ThemeAccuracyRow[]>([]);
  const [superlatives, setSuperlatives] = useState<Superlative[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (p: StatsPeriod) => {
    setLoading(true);
    try {
      const [g, l, t, s] = await Promise.all([
        getGlobalStats(p),
        getPlayerLeaderboard(p, null),
        getQuizThemeBreakdown(p),
        getSuperlatives(p),
      ]);
      setGlobal(g);
      setLeaderboard(l);
      setThemes(t);
      setSuperlatives(s);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load(period);
    }, [load, period])
  );

  function handlePeriodChange(p: StatsPeriod) {
    setPeriod(p);
    load(p);
  }

  const hasData = (global?.totalSessions ?? 0) > 0;

  return (
    <ScreenBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.emoji}>🏆</Text>
          <Text style={[typography.title, { color: colors.text }]}>
            Le Hall of Fame
          </Text>
          <Text style={[typography.body, styles.headerSub]}>
            Les stats (peu glorieuses) de vos soirées
          </Text>
        </View>

        <SegmentedToggle
          label="Période"
          value={period}
          onChange={handlePeriodChange}
          options={PERIODS}
        />

        {!loading && !hasData ? (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyEmoji}>🕸️</Text>
            <Text style={[typography.bodyBold, { color: colors.text }]}>
              Rien à afficher pour cette période
            </Text>
            <Text style={[typography.body, styles.headerSub]}>
              Lancez une partie pour commencer à remplir le tableau des
              records.
            </Text>
          </Card>
        ) : null}

        {global && hasData ? (
          <View style={styles.statGrid}>
            <StatTile emoji="🎮" label="Parties jouées" value={global.totalSessions} />
            <StatTile emoji="🙋" label="Joueurs actifs" value={global.totalPlayers} />
            <StatTile
              emoji="✅"
              label="Bonnes réponses"
              value={`${global.totalCorrect}/${global.totalQuestions}`}
            />
            <StatTile emoji="🍻" label="Gorgées distribuées" value={global.totalSipsGiven} />
          </View>
        ) : null}

        {superlatives.length > 0 ? (
          <View style={styles.section}>
            <SectionTitle title="Les titres de la soirée" />
            {superlatives.map((s) => (
              <Card key={s.key} style={styles.superlativeCard}>
                <Text style={styles.superlativeEmoji}>{s.emoji}</Text>
                <View style={styles.superlativeInfo}>
                  <Text style={[typography.bodyBold, { color: colors.text }]}>
                    {s.title}
                  </Text>
                  <Text style={[typography.body, styles.headerSub]}>
                    {s.playerName} · {s.valueLabel}
                  </Text>
                </View>
              </Card>
            ))}
          </View>
        ) : null}

        {leaderboard.length > 0 ? (
          <View style={styles.section}>
            <SectionTitle title="Classement général" />
            <Card>
              {leaderboard.map((row, index) => (
                <View
                  key={row.playerId}
                  style={[
                    styles.leaderboardRow,
                    index < leaderboard.length - 1 && styles.rowDivider,
                  ]}
                >
                  <Text style={[typography.bodyBold, styles.rank]}>
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                  </Text>
                  <Text style={[typography.bodyBold, styles.leaderboardName]}>
                    {row.name}
                  </Text>
                  <Text style={[typography.caption, styles.leaderboardMeta]}>
                    {Math.round(row.accuracy * 100)}% • 🍻{row.sipsGiven}
                  </Text>
                  <Text style={[typography.subtitle, { color: colors.gold }]}>
                    {row.totalScore}
                  </Text>
                </View>
              ))}
            </Card>
          </View>
        ) : null}

        {themes.length > 0 ? (
          <View style={styles.section}>
            <SectionTitle
              title="Quiz — Taux de réussite par thème"
              subtitle="De quoi savoir sur quel thème briller (ou pas)"
            />
            <Card>
              {themes.map((t, index) => (
                <View
                  key={t.theme}
                  style={[
                    styles.themeRow,
                    index < themes.length - 1 && styles.rowDivider,
                  ]}
                >
                  <Text style={[typography.bodyBold, { color: colors.text, flex: 1 }]}>
                    {t.theme}
                  </Text>
                  <View style={styles.themeBarTrack}>
                    <View
                      style={[
                        styles.themeBarFill,
                        { width: `${Math.round(t.accuracy * 100)}%` },
                      ]}
                    />
                  </View>
                  <Text style={[typography.caption, styles.themePercent]}>
                    {Math.round(t.accuracy * 100)}%
                  </Text>
                </View>
              ))}
            </Card>
          </View>
        ) : null}
      </ScrollView>
    </ScreenBackground>
  );
}

function StatTile({
  emoji,
  label,
  value,
}: {
  emoji: string;
  label: string;
  value: string | number;
}) {
  return (
    <Card style={styles.tile}>
      <Text style={styles.tileEmoji}>{emoji}</Text>
      <Text style={[typography.title, { color: colors.text }]}>{value}</Text>
      <Text style={[typography.caption, styles.tileLabel]}>{label}</Text>
    </Card>
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
  header: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  emoji: {
    fontSize: 36,
  },
  headerSub: {
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 2,
  },
  statGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  tile: {
    width: "48%",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  tileEmoji: {
    fontSize: 22,
    marginBottom: spacing.xs,
  },
  tileLabel: {
    color: colors.textMuted,
    marginTop: 2,
    textAlign: "center",
  },
  section: {
    marginTop: spacing.md,
  },
  superlativeCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  superlativeEmoji: {
    fontSize: 28,
    marginRight: spacing.md,
  },
  superlativeInfo: {
    flex: 1,
  },
  leaderboardRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rank: {
    width: 36,
    color: colors.text,
  },
  leaderboardName: {
    flex: 1,
    color: colors.text,
  },
  leaderboardMeta: {
    color: colors.textFaint,
    marginRight: spacing.sm,
  },
  themeRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  themeBarTrack: {
    width: 90,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.surfaceAlt,
    overflow: "hidden",
    marginRight: spacing.sm,
  },
  themeBarFill: {
    height: "100%",
    backgroundColor: colors.accent,
  },
  themePercent: {
    width: 40,
    textAlign: "right",
    color: colors.textMuted,
  },
  emptyCard: {
    alignItems: "center",
    marginTop: spacing.md,
  },
  emptyEmoji: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
});
