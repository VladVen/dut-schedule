import { createSlice } from "@reduxjs/toolkit";
import { DefaultTheme } from "react-native-paper";
import { DarkTHEME, LightTHEME } from "../../../theme/Theme";
import { ThemeBase } from "react-native-paper/src/types";
import { ITheme } from "../../../theme/theme.types";

interface IState extends ThemeBase {
  colors: ITheme;
  darkTheme: boolean;
}

const initialState: IState = {
  ...DefaultTheme,
  colors: DarkTHEME,
  darkTheme: true,
};

export const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeMode(state) {
      if (state.darkTheme) {
        state.colors = LightTHEME;
        state.darkTheme = false;
      } else {
        state.colors = DarkTHEME;
        state.darkTheme = true;
      }
    },
  },
});

export default ThemeSlice.reducer