import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { categoryType } from "../../../parser/getSchedule";

interface IState {
  id: string | null;
  name: string | null;
  category: categoryType;
}

const initialState: IState = {
  id: null,
  name: null,
  category: null,
};

export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin(state, action: PayloadAction<{ id: string; name: string, category: categoryType }>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.category = action.payload.category;

    },
    resetLogin: () => initialState,

  },
});

export default LoginSlice.reducer;