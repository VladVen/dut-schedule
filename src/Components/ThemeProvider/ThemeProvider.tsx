import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { AppNavigation } from "../../Navigation/AppNavigation";
import { StatusBar } from "react-native";
import { useAppSelector } from "../../../hooks/redux";

export const ThemeProvider = () => {
  const theme = useAppSelector((state) => state.theme);
  return (
    <PaperProvider theme={theme}>
      <StatusBar animated={true} backgroundColor={theme.colors.headerColor} />
      <AppNavigation />
    </PaperProvider>
  );
};

