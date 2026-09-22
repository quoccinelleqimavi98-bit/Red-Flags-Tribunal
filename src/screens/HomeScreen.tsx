import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenBackground } from "@components/ScreenBackground";
import { Button } from "@components/Button";
import { colors, spacing, typography } from "@core/theme";
import { RootStackParamList } from "@core/navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
  return (
    <ScreenBackground>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.emoji}>🎉🍻🎲</Text>
          <Text style={[typography.huge, styles.title]}>Soirée Games</Text>
          <Text style={[typography.body, styles.tagline]}>
            Le pack de mini-jeux pour animer vos soirées entre amis.
          </Text>
        </View>

        <View style={styles.actions}>
          <Button
            label="Lancer une soirée"
            icon="🚀"
            onPress={() => navigation.navigate("PlayerSetup")}
          />
          <Button
            label="Hall of Fame"
            icon="🏆"
            variant="gold"
            onPress={() => navigation.navigate("Stats")}
            style={styles.spacedButton}
          />
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
  spacedButton: {
    marginTop: spacing.md,
  },
});
