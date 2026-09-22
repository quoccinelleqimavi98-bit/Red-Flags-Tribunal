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
import { PlayerAvatar } from "@components/PlayerAvatar";
import { colors, radius, spacing, typography } from "@core/theme";
import { RootStackParamList } from "@core/navigation/types";
import { useSessionStore } from "@core/store/sessionStore";
import { Player } from "@core/types";
import { AVATARS, pickNextAvatarId } from "@core/avatars";

type Props = NativeStackScreenProps<RootStackParamList, "PlayerSetup">;

export function PlayerSetupScreen({ navigation, route }: Props) {
  const mode = route.params?.mode ?? "onboarding";
  const category = route.params?.category;
  const storedPlayers = useSessionStore((s) => s.players);
  const setPlayers = useSessionStore((s) => s.setPlayers);

  const [draft, setDraft] = useState<Player[]>(storedPlayers);
  const [nameInput, setNameInput] = useState("");
  const [openAvatarPickerFor, setOpenAvatarPickerFor] = useState<number | null>(
    null
  );

  function addPlayer() {
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    if (draft.some((p) => p.name.toLowerCase() === trimmed.toLowerCase())) {
      setNameInput("");
      return;
    }
    const nextId = (draft.reduce((max, p) => Math.max(max, p.id), 0) || 0) + 1;
    const avatarId = pickNextAvatarId(draft.map((p) => p.avatarId));
    setDraft((prev) => [...prev, { id: nextId, name: trimmed, avatarId }]);
    setNameInput("");
  }

  function removePlayer(id: number) {
    setDraft((prev) => prev.filter((p) => p.id !== id));
    if (openAvatarPickerFor === id) setOpenAvatarPickerFor(null);
  }

  function setAvatar(id: number, avatarId: Player["avatarId"]) {
    setDraft((prev) =>
      prev.map((p) => (p.id === id ? { ...p, avatarId } : p))
    );
    setOpenAvatarPickerFor(null);
  }

  function handleContinue() {
    if (draft.length < 2) return;
    setPlayers(draft);
    if (mode === "manage") {
      navigation.goBack();
    } else if (category) {
      navigation.navigate("Subtheme", { category });
    }
  }

  const title =
    mode === "manage" ? "Gérer les joueurs" : "Qui est de la soirée ?";
  const subtitle =
    mode === "manage"
      ? "Ajoutez un retardataire ou retirez quelqu'un qui s'en va"
      : "Ajoutez les prénoms et choisissez un avatar pour chacun";

  return (
    <ScreenBackground>
      <View style={styles.container}>
        <SectionTitle title={title} subtitle={subtitle} />

        <View style={styles.inputRow}>
          <TextInput
            value={nameInput}
            onChangeText={setNameInput}
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
          data={draft}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Card style={styles.playerCard}>
              <View style={styles.playerRow}>
                <Pressable
                  onPress={() =>
                    setOpenAvatarPickerFor((prev) =>
                      prev === item.id ? null : item.id
                    )
                  }
                  style={styles.avatarButton}
                >
                  <PlayerAvatar avatarId={item.avatarId} size={26} />
                </Pressable>
                <Text
                  style={[typography.bodyBold, styles.playerName]}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
                <Pressable onPress={() => removePlayer(item.id)}>
                  <Text style={styles.remove}>✕</Text>
                </Pressable>
              </View>

              {openAvatarPickerFor === item.id ? (
                <View style={styles.avatarPicker}>
                  {AVATARS.map((avatar) => (
                    <Pressable
                      key={avatar.id}
                      onPress={() => setAvatar(item.id, avatar.id)}
                      style={[
                        styles.avatarOption,
                        avatar.id === item.avatarId && styles.avatarOptionSelected,
                      ]}
                    >
                      <PlayerAvatar avatarId={avatar.id} size={22} />
                    </Pressable>
                  ))}
                </View>
              ) : null}
            </Card>
          )}
          ListEmptyComponent={
            <Text style={[typography.body, styles.empty]}>
              Aucun joueur pour l'instant. Ajoutez au moins 2 prénoms.
            </Text>
          }
        />

        <Button
          label={
            mode === "manage"
              ? `Enregistrer (${draft.length} joueur${draft.length > 1 ? "s" : ""})`
              : `Continuer (${draft.length} joueur${draft.length > 1 ? "s" : ""})`
          }
          icon="👉"
          onPress={handleContinue}
          disabled={draft.length < 2}
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
    color: colors.background,
  },
  list: {
    flexGrow: 1,
    paddingVertical: spacing.sm,
  },
  playerCard: {
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  playerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
    borderWidth: 1.5,
    borderColor: colors.border,
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
  avatarPicker: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  avatarOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  avatarOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + "26",
  },
  empty: {
    color: colors.textFaint,
    textAlign: "center",
    marginTop: spacing.xl,
  },
});
