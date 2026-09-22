import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { colors } from "@core/theme";
import { HomeScreen } from "@screens/HomeScreen";
import { PlayerSetupScreen } from "@screens/PlayerSetupScreen";
import { GameMenuScreen } from "@screens/GameMenuScreen";
import { GameConfigScreen } from "@screens/GameConfigScreen";
import { GamePlayScreen } from "@screens/GamePlayScreen";

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
        <Stack.Screen name="GameMenu" component={GameMenuScreen} />
        <Stack.Screen name="GameConfig" component={GameConfigScreen} />
        <Stack.Screen name="GamePlay" component={GamePlayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
