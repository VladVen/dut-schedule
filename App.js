import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useFonts } from "expo-font";
import { ThemeProvider } from "./src/Components/ThemeProvider/ThemeProvider";

export default function App() {
  const [loaded] = useFonts({
    eUkraine: require("./font/e-Ukraine-Regular.otf"),
  });

  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={store.getState().theme.colors.textColor} size={"large"} />
      </View>
    );
  }



  return (
    <Provider store={store}>
     <ThemeProvider />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: store.getState().theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
