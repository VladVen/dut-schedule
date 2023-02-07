import { DarkTHEME, LightTHEME } from "../Theme";
import { DefaultTheme } from "react-native-paper";

const CHANGE_THEME = "CHANGE_THEME";

const initialState = {
  ...DefaultTheme,
  colors: DarkTHEME,
  darkTheme: true,
};

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_THEME: {
      if(state.darkTheme) {
        return {
          ...state,
          colors: LightTHEME,
          darkTheme: false
        };
      } else {
        return {
          ...state,
          colors: DarkTHEME,
          darkTheme: true
        };
      }
    }
    default:
      return state;
  }
};
export const changeTheme = (theme) => ({
  type: CHANGE_THEME,
  payload: { theme },
});
