import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenBackground } from "@components/ScreenBackground";
import { Card } from "@components/Card";
import { SectionTitle } from "@components/SectionTitle";
import { colors, radius, spacing, typography } from "@core/theme";
import { RootStackParamList } from "@core/navigation/types";
import { useSessionStore } from "@core/store/sessionStore";
import { getGames } from "@core/games";

type Props = NativeStackScreenProps<RootStackParamList, "GameMenu">;

export function GameMenuScreen({ navigation }: Props) {
  const players = useSessionStore((s) => s.players);
  const games = getGames();

  return (
    <ScreenBackground>
      <View style={styles.container}>
        <SectionTitle
          title={`${players.length} joueurs ce soir`}
          subtitle="Choisissez le mini-jeu à lancer"
        />

        <FlatList
          data={games}
          keyExtractor={(g) => g.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const disabled = players.length < item.minPlayers;
            return (
              <Pressable
                disabled={disabled}
                onPress={() =>
                  navigation.navigate("GameConfig", { gameId: item.id })
                }
                style={{ opacity: disabled ? 0.5 : 1 }}
              >
                <Card accentColor={item.color} style={styles.gameCard}>
                  <View style={styles.gameRow}>
                    <Text style={styles.gameEmoji}>{item.emoji}</Text>
                    <View style={styles.gameInfo}>
                      <Text style={[typography.subtitle, { color: colors.text }]}>
                        {item.name}
                      </Text>
                      <Text style={[typography.body, styles.gameTagline]}>
                        {item.tagline}
                      </Text>
                      {item.variantCount ? (
                        <Text style={[typography.caption, { color: item.color }]}>
                          {item.variantCount} sous-parties
                        </Text>
                      ) : null}
                      {disabled ? (
                        <Text style={styles.minPlayers}>
                          Minimum {item.minPlayers} joueurs
                        </Text>
                      ) : null}
                    </View>
                    <Text style={styles.chevron}>›</Text>
                  </View>
                </Card>
              </Pressable>
            );
          }}
          ListFooterComponent={
            <Card style={styles.comingSoon}>
              <Text style={styles.comingSoonEmoji}>🔮</Text>
              <Text style={[typography.bodyBold, { color: colors.text }]}>
                D'autres mini-jeux arrivent bientôt
              </Text>
              <Text style={[typography.body, styles.gameTagline]}>
                Chaque mise à jour ajoute de nouveaux jeux à enchaîner, seul
                ou en mode aléatoire.
              </Text>
            </Card>
          }
        />
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  list: {
    paddingBottom: spacing.xl,
  },
  gameCard: {
    marginBottom: spacing.md,
  },
  gameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  gameEmoji: {
    fontSize: 36,
    marginRight: spacing.md,
  },
  gameInfo: {
    flex: 1,
  },
  gameTagline: {
    color: colors.textMuted,
    marginTop: 2,
  },
  minPlayers: {
    color: colors.danger,
    marginTop: spacing.xs,
    fontSize: 12,
    fontWeight: "700",
  },
  chevron: {
    fontSize: 28,
    color: colors.textFaint,
  },
  comingSoon: {
    alignItems: "center",
    borderStyle: "dashed",
    marginTop: spacing.sm,
  },
  comingSoonEmoji: {
    fontSize: 28,
    marginBottom: spacing.xs,
  },
});
