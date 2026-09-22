import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenBackground } from "@components/ScreenBackground";
import { Button } from "@components/Button";
import { colors, spacing, typography } from "@core/theme";
import { RootStackParamList } from "@core/navigation/types";
import { useSessionStore } from "@core/store/sessionStore";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
  const players = useSessionStore((s) => s.players);

  function handleStart() {
    if (players.length === 0) {
      navigation.navigate("PlayerSetup", { mode: "onboarding" });
    } else {
      navigation.navigate("Mode");
    }
  }

  return (
    <ScreenBackground>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.emoji}>🚩</Text>
          <Text style={[typography.huge, styles.title]}>
            Red Flag{"\n"}Tribunal
          </Text>
          <View style={styles.divider} />
          <Text style={[typography.caption, styles.kicker]}>
            La cour est en session
          </Text>
          <Text style={[typography.body, styles.tagline]}>
            Le jeu de soirée qui débusque les red flags entre amis —
            verdicts sans pitié, gorgées à la clé.
          </Text>
        </View>

        <View style={styles.actions}>
          <Button label="Lancer une soirée" icon="⚖️" onPress={handleStart} />
        </View>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: spacing.lg,
  },
  hero: {
    marginTop: spacing.xxl,
    alignItems: "center",
  },
  emoji: {
    fontSize: 40,
    marginBottom: spacing.md,
  },
  title: {
    color: colors.text,
    textAlign: "center",
    lineHeight: 44,
  },
  divider: {
    width: 64,
    height: 2,
    backgroundColor: colors.gold,
    marginTop: spacing.md,
  },
  kicker: {
    color: colors.gold,
    marginTop: spacing.sm,
  },
  tagline: {
    color: colors.textMuted,
    textAlign: "center",
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  actions: {
    marginBottom: spacing.lg,
  },
});
