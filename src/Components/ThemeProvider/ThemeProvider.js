import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { AppNavigation } from "../../Navigation/AppNavigation";
import { useSelector } from "react-redux";

export const ThemeProvider = () => {
  const theme = useSelector((state) => state.theme);
  return (
    <PaperProvider theme={theme}>
      <AppNavigation />
    </PaperProvider>
  );
};

