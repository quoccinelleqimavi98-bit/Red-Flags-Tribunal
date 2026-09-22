import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { colors } from "@core/theme";
import { HomeScreen } from "@screens/HomeScreen";
import { PlayerSetupScreen } from "@screens/PlayerSetupScreen";
import { CategoryScreen } from "@games/redflag/screens/CategoryScreen";
import { SubthemeScreen } from "@games/redflag/screens/SubthemeScreen";
import { ModeScreen } from "@games/redflag/screens/ModeScreen";
import { PlayScreen } from "@games/redflag/screens/PlayScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.background,
    text: colors.text,
    border: colors.border,
    primary: colors.primary,
  },
};

export function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PlayerSetup" component={PlayerSetupScreen} />
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="Subtheme" component={SubthemeScreen} />
        <Stack.Screen name="Mode" component={ModeScreen} />
        <Stack.Screen name="Play" component={PlayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
