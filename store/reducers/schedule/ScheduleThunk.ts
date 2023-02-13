import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDate1, getParsedDate } from "./ParsedDate";
import { getSchedule } from "../../../parser/getSchedule";

interface IUser {
  id: string;
  category: "group" | "teacher";
}

export const fetchSchedule = createAsyncThunk(
  "schedule/fetchAll",
  async ({ id, category }: IUser, thunkAPI) => {
    try {
      await thunkAPI.dispatch(getCurrentWeek({ id, category }));
      await thunkAPI.dispatch(getNextWeek({ id, category }));
      await thunkAPI.dispatch(getSecondWeek({ id, category }));
      await thunkAPI.dispatch(getThirdWeek({ id, category }));
    } catch (e) {
      return thunkAPI.rejectWithValue("Internet Error");
    }
  }
);
export const getCurrentWeek = createAsyncThunk(
  "schedule/getCurrentWeek",
  async ({ id, category }: IUser, thunkAPI) => {
    try {
      let d = new Date();
      let date1 = new Date(d.setDate(d.getDate() - ((d.getDay() + 6) % 7)));
      const [parsedDate1, parsedDate2] = getParsedDate(d, date1);

      const schedule = await getSchedule(
        id,
        parsedDate1,
        parsedDate2,
        category
      );
      return schedule;
    } catch (e) {
      return thunkAPI.rejectWithValue("Internet Error");
    }
  }
);
export const getNextWeek = createAsyncThunk(
  "schedule/getNextWeek",
  async ({ id, category }: IUser, thunkAPI) => {
    try {
      const [d, date1] = getDate1();
      const [parsedDate1, parsedDate2] = getParsedDate(d, date1);
      const schedule = await getSchedule(
        id,
        parsedDate1,
        parsedDate2,
        category
      );
      return schedule;
    } catch (e) {
      return thunkAPI.rejectWithValue("Internet Error");
    }
  }
);
export const getSecondWeek = createAsyncThunk(
  "schedule/getSecondWeek",
  async ({ id, category }: IUser, thunkAPI) => {
    try {
      const [d, date1] = getDate1(7);
      const [parsedDate1, parsedDate2] = getParsedDate(d, date1);
      const schedule = await getSchedule(
        id,
        parsedDate1,
        parsedDate2,
        category
      );
      return schedule;
    } catch (e) {
      return thunkAPI.rejectWithValue("Internet Error");
    }
  }
);
export const getThirdWeek = createAsyncThunk(
  "schedule/getThirdWeek",
  async ({ id, category }: IUser, thunkAPI) => {
    try {
      const [d, date1] = getDate1(14);
      const [parsedDate1, parsedDate2] = getParsedDate(d, date1);
      const schedule = await getSchedule(
        id,
        parsedDate1,
        parsedDate2,
        category
      );
      return schedule;
    } catch (e) {
      return thunkAPI.rejectWithValue("Internet Error");
    }
  }
);
