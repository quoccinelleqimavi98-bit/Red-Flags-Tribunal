import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { RootNavigator } from "@core/navigation/RootNavigator";
import { colors } from "@core/theme";

export default function App() {
  // Import direct des fichiers .ttf (plutôt que le barrel du package) pour
  // que Metro ne bundle que les graisses réellement utilisées, pas les
  // ~12 variantes disponibles de la famille.
  const [fontsLoaded] = useFonts({
    Oswald_400Regular: require("@expo-google-fonts/oswald/400Regular/Oswald_400Regular.ttf"),
    Oswald_500Medium: require("@expo-google-fonts/oswald/500Medium/Oswald_500Medium.ttf"),
    Oswald_600SemiBold: require("@expo-google-fonts/oswald/600SemiBold/Oswald_600SemiBold.ttf"),
    Oswald_700Bold: require("@expo-google-fonts/oswald/700Bold/Oswald_700Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <RootNavigator />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
});
