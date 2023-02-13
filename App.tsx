import React from "react";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import { ThemeProvider } from "./src/Components/ThemeProvider/ThemeProvider";
import { PersistGate } from "redux-persist/integration/react";
import { AppPreloader } from "./src/Components/UI/AppPreloader";
import { setupStore } from "./store/store";
import { persistStore } from "redux-persist";

export default function App() {
  const [loaded] = useFonts({
    eUkraine: require("./font/e-Ukraine-Regular.otf"),
  });

  const store = setupStore();
  let persistor = persistStore(store);
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
        loading={
          <AppPreloader
            background={store.getState().theme.colors.background}
            color={store.getState().theme.colors.textColor}
          />
        }
        persistor={persistor}
      >
        <ThemeProvider />
      </PersistGate>
    </Provider>
  );
}

