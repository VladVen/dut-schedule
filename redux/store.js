import { applyMiddleware, combineReducers, createStore } from "redux";
import { loginStudentReducer } from "./loginStudentReducer";
import thunk from "redux-thunk";
import { scheduleReducer } from "./scheduleReducer";
import { loginTeacherReducer } from "./loginTeacherReducer";
import { settingsReducer } from "./settingsReducer";
import { themeReducer } from "./themeReducer";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';

const reducers = combineReducers({
  login: loginStudentReducer,
  loginTeacher: loginTeacherReducer,
  schedule: scheduleReducer,
  settings: settingsReducer,
  theme: themeReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return { store, persistor };
};

