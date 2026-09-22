import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { RootNavigator } from "@core/navigation/RootNavigator";
import { colors } from "@core/theme";
// Enregistre tous les mini-jeux disponibles auprès du registre central.
import "@core/games";

export default function App() {
  // Import direct des fichiers .ttf (plutôt que le barrel du package) pour
  // que Metro ne bundle que les graisses réellement utilisées, pas les
  // ~24 variantes disponibles des deux familles de polices.
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_900Black: require("@expo-google-fonts/playfair-display/900Black/PlayfairDisplay_900Black.ttf"),
    PlayfairDisplay_700Bold_Italic: require("@expo-google-fonts/playfair-display/700Bold_Italic/PlayfairDisplay_700Bold_Italic.ttf"),
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
      <StatusBar style="light" />
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
