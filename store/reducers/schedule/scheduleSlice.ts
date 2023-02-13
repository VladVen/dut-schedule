import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWeek } from "../../../types/schedule.types";
import {
  getCurrentWeek,
  getNextWeek,
  getSecondWeek,
  getThirdWeek,
} from "./ScheduleThunk";

interface IState {
  currentWeek: IWeek;
  nextWeek: IWeek;
  secondWeek: IWeek;
  thirdWeek: IWeek;
  fetching: boolean;
  error: string;
}

const initialState: IState = {
  currentWeek: [],
  nextWeek: [],
  secondWeek: [],
  thirdWeek: [],
  fetching: true,
  error: "",
};

export const ScheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setCurrentWeek(state, action: PayloadAction<IWeek>) {
      state.currentWeek = action.payload;
    },
    setNextWeek(state, action: PayloadAction<IWeek>) {
      state.nextWeek = action.payload;
    },
    setSecondWeek(state, action: PayloadAction<IWeek>) {
      state.secondWeek = action.payload;
    },
    setThirdWeek(state, action: PayloadAction<IWeek>) {
      state.thirdWeek = action.payload;
    },
    removeError(state) {
      state.error = '';
    },
      resetSchedule: () => initialState,

  },
  extraReducers: (builder) =>
    builder
      .addCase(getCurrentWeek.fulfilled, (state, action) => {
        state.fetching = false;
        state.error = "";
        state.currentWeek = action.payload;
      })
      .addCase(getNextWeek.fulfilled, (state, action) => {
        state.fetching = false;
        state.error = "";
        state.nextWeek = action.payload;
      })
      .addCase(getSecondWeek.fulfilled, (state, action) => {
        state.fetching = false;
        state.error = "";
        state.secondWeek = action.payload;
      })
      .addCase(getThirdWeek.fulfilled, (state, action) => {
        state.fetching = false;
        state.error = "";
        state.thirdWeek = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state, { payload }) => {
          state.fetching = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, { payload }) => {
          state.fetching = false;
          state.error = payload;
        }
      )
      .addDefaultCase((state, action) => {}),
});

export default ScheduleSlice.reducer;
