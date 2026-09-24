import React, { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@core/theme";

export function ScreenBackground({ children }: PropsWithChildren) {
  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundAlt]}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 0.9, y: 1 }}
      style={StyleSheet.absoluteFill}
    >
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />
      <SafeAreaView style={styles.safe}>{children}</SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  glowTop: {
    position: "absolute",
    top: -120,
    right: -80,
    width: 280,
    height: 280,
    borderRadius: 280,
    backgroundColor: "rgba(209, 20, 109, 0.08)",
  },
  glowBottom: {
    position: "absolute",
    bottom: -140,
    left: -100,
    width: 320,
    height: 320,
    borderRadius: 320,
    backgroundColor: "rgba(58, 20, 40, 0.05)",
  },
});
