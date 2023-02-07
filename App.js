import React from "react";
import { Provider } from "react-redux";
import setupStore from "./redux/store";
import { useFonts } from "expo-font";
import { ThemeProvider } from "./src/Components/ThemeProvider/ThemeProvider";
import { PersistGate } from "redux-persist/integration/react";
import { AppPreloader } from "./src/Components/UI/AppPreloader";

export default function App() {
  const [loaded] = useFonts({
    eUkraine: require("./font/e-Ukraine-Regular.otf"),
  });

  const { store, persistor } = setupStore();

  if (!loaded) {
    return (
      <AppPreloader
        background={store.getState().theme.colors.background}
        color={store.getState().theme.colors.textColor}
      />
    );
  }

  return (
    <Provider store={store}>
      <PersistGate
        loading={<AppPreloader background={store.getState().theme.colors.background} color={store.getState().theme.colors.textColor} />}
        persistor={persistor}
      >
        <ThemeProvider />
      </PersistGate>
    </Provider>
  );
}

