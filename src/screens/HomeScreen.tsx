import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenBackground } from "@components/ScreenBackground";
import { Button } from "@components/Button";
import { colors, radius, spacing, typography } from "@core/theme";
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
          <Image
            source={require("../../assets/home-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.divider} />
          <Text style={[typography.caption, styles.kicker]}>
            La cour est en session
          </Text>
          <Text style={[typography.body, styles.tagline]}>
            Le jeu de soirée qui débusque les red flags entre amis —
            verdicts sans pitié, gorgées à la clé.
          </Text>
          <View style={styles.disclaimer}>
            <Text style={[typography.caption, styles.disclaimerText]}>
              🧃 Zéro obligation d'alcool : eau, jus, gage rigolo... à vous de
              voir. Le seul vrai verdict, c'est de s'amuser dans le respect
              des limites de chacun·e.
            </Text>
          </View>
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
  logo: {
    width: "84%",
    aspectRatio: 924 / 548,
  },
  divider: {
    width: 64,
    height: 2,
    backgroundColor: colors.ink,
    marginTop: spacing.md,
  },
  kicker: {
    color: colors.ink,
    marginTop: spacing.sm,
  },
  tagline: {
    color: colors.textMuted,
    textAlign: "center",
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  disclaimer: {
    marginTop: spacing.lg,
    marginHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  disclaimerText: {
    color: colors.textFaint,
    textAlign: "center",
    textTransform: "none",
    letterSpacing: 0,
  },
  actions: {
    marginBottom: spacing.lg,
  },
});
