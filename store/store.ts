import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeSlice from "./reducers/theme/themeSlice";
import scheduleSlice from "./reducers/schedule/scheduleSlice";
import settingsSlice from "./reducers/settings/settingsSlice";
import loginSlice from "./reducers/login/loginSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

const rootReducer = combineReducers({
  theme: themeSlice,
  login: loginSlice,
  settings: settingsSlice,
  schedule: scheduleSlice,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const setupStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];