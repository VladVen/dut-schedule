import { applyMiddleware, combineReducers, createStore } from "redux";
import { loginStudentReducer } from "./loginStudentReducer";
import thunk from "redux-thunk";
import { scheduleReducer } from "./scheduleReducer";
import { loginTeacherReducer } from "./loginTeacherReducer";

const reducers = combineReducers({
  login: loginStudentReducer,
  loginTeacher: loginTeacherReducer,
  schedule: scheduleReducer,
});

export const store = createStore(reducers, applyMiddleware(thunk));
