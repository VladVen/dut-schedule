import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LangType = "English" | "Українська";

interface IState {
  lang: LangType;
}

const initialState: IState = {
  lang: "English",
};

export const SettingsSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    changeLang(state, action: PayloadAction<LangType>) {
      state.lang = action.payload;
    },
  },
});

export default SettingsSlice.reducer;