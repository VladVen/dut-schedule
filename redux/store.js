import {applyMiddleware, combineReducers, createStore} from "redux";
import {loginReducer} from "./loginReducer";
import thunk from "redux-thunk";
import {scheduleReducer} from "./scheduleReducer";


const reducers = combineReducers({
    login: loginReducer,
    schedule: scheduleReducer
})


export const store = createStore(reducers, applyMiddleware(thunk))