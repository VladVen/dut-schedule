import { applyMiddleware, combineReducers, createStore } from "redux";
import { loginStudentReducer } from "./loginStudentReducer";
import thunk from "redux-thunk";
import { scheduleReducer } from "./scheduleReducer";
import { loginTeacherReducer } from "./loginTeacherReducer";
import { settingsReducer } from "./settingsReducer";
import { themeReducer } from "./themeReducer";

const reducers = combineReducers({
  login: loginStudentReducer,
  loginTeacher: loginTeacherReducer,
  schedule: scheduleReducer,
  settings: settingsReducer,
  theme: themeReducer
});

export const store = createStore(reducers, applyMiddleware(thunk));
