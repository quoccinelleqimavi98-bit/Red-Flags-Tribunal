import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenBackground } from "@components/ScreenBackground";
import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { SectionTitle } from "@components/SectionTitle";
import { colors, radius, spacing, typography } from "@core/theme";
import { RootStackParamList } from "@core/navigation/types";
import { useSessionStore } from "@core/store/sessionStore";

type Props = NativeStackScreenProps<RootStackParamList, "PlayerSetup">;

const AVATAR_EMOJIS = ["🦄", "🐸", "🦊", "🐼", "🐵", "🦁", "🐙", "🦖", "🍉", "🌵", "👽", "🤖"];

export function PlayerSetupScreen({ navigation }: Props) {
  const [names, setNames] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const setPlayers = useSessionStore((s) => s.setPlayers);

  function addPlayer() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    if (names.some((n) => n.toLowerCase() === trimmed.toLowerCase())) {
      setDraft("");
      return;
    }
    setNames((prev) => [...prev, trimmed]);
    setDraft("");
  }

  function removePlayer(name: string) {
    setNames((prev) => prev.filter((n) => n !== name));
  }

  function handleContinue() {
    if (names.length < 2) return;
    const players = names.map((name, index) => ({ id: index + 1, name }));
    setPlayers(players);
    navigation.navigate("GameMenu");
  }

  return (
    <ScreenBackground>
      <View style={styles.container}>
        <SectionTitle
          title="Qui est de la soirée ?"
          subtitle="Ajoutez les prénoms des joueurs actifs ce soir"
        />

        <View style={styles.inputRow}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Prénom du joueur"
            placeholderTextColor={colors.textFaint}
            style={styles.input}
            onSubmitEditing={addPlayer}
            returnKeyType="done"
            autoCapitalize="words"
          />
          <Pressable style={styles.addButton} onPress={addPlayer}>
            <Text style={styles.addButtonLabel}>+</Text>
          </Pressable>
        </View>

        <FlatList
          data={names}
          keyExtractor={(item) => item}
          numColumns={2}
          columnWrapperStyle={styles.column}
          contentContainerStyle={styles.list}
          renderItem={({ item, index }) => (
            <Card style={styles.playerCard}>
              <View style={styles.playerRow}>
                <Text style={styles.avatar}>
                  {AVATAR_EMOJIS[index % AVATAR_EMOJIS.length]}
                </Text>
                <Text style={[typography.bodyBold, styles.playerName]} numberOfLines={1}>
                  {item}
                </Text>
                <Pressable onPress={() => removePlayer(item)}>
                  <Text style={styles.remove}>✕</Text>
                </Pressable>
              </View>
            </Card>
          )}
          ListEmptyComponent={
            <Text style={[typography.body, styles.empty]}>
              Aucun joueur pour l'instant. Ajoutez au moins 2 prénoms.
            </Text>
          }
        />

        <Button
          label={`Continuer (${names.length} joueur${names.length > 1 ? "s" : ""})`}
          icon="👉"
          onPress={handleContinue}
          disabled={names.length < 2}
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
  inputRow: {
    flexDirection: "row",
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.text,
    borderWidth: 1.5,
    borderColor: colors.border,
    marginRight: spacing.sm,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonLabel: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1a0a2e",
  },
  list: {
    flexGrow: 1,
    paddingVertical: spacing.sm,
  },
  column: {
    gap: spacing.sm,
  },
  playerCard: {
    flex: 1,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  playerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    fontSize: 20,
    marginRight: spacing.xs,
  },
  playerName: {
    flex: 1,
    color: colors.text,
  },
  remove: {
    color: colors.textFaint,
    fontSize: 16,
    paddingLeft: spacing.xs,
  },
  empty: {
    color: colors.textFaint,
    textAlign: "center",
    marginTop: spacing.xl,
  },
});
