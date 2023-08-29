import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultValue } from "/src/shared/const";
import { $api } from "/src/shared/api/api";
import { IChoices } from "/src/features/SearchSchedule";
import {
  IScheduleTable,
  ScheduleScheme,
} from "/src/entities/Table/model/types/Table";

export const fetchScheduleByQuery = createAsyncThunk(
  "schedule/fetchScheduleByQuery",
  async function (query: string, { rejectWithValue }) {
    if (query.trim() === "") return;
    try {
      const request = await $api.get("/", {
        params: {
          query,
        },
      });

      console.log(request.data);

      return request.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const fetchScheduleByGroup = createAsyncThunk(
  "schedule/fetchScheduleByGroup",
  async function (group: string, { rejectWithValue }) {
    try {
      const request = await $api.get("/", {
        params: {
          group,
        },
      });

      return request.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  },
);

interface IFetchScheduleByWeekProps {
  group: string;
  week: number;
}

export const fetchScheduleByWeek = createAsyncThunk(
  "schedule/fetchScheduleByGroup",
  async function (
    { group, week }: IFetchScheduleByWeekProps,
    { rejectWithValue },
  ) {
    try {
      const request = await $api.get("/", {
        params: {
          group,
          week,
        },
      });

      return request.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  },
);

const initialState: ScheduleScheme = {
  choices: null,
  schedule: defaultValue,
};

export const tableSlice = createSlice({
  name: "tableSlice",
  initialState,
  reducers: {
    setDefaultValue: (state) => {
      state.schedule = defaultValue;
      state.choices = null;
    },
    setSchedule: (state, action: PayloadAction<IScheduleTable>) => {
      state.schedule = action.payload;
      state.choices = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchScheduleByQuery.fulfilled,
        (state, action: PayloadAction<IScheduleTable | IChoices>) => {
          if ("choices" in action.payload) {
            state.choices = action.payload;
          } else {
            state.schedule = action.payload;
            state.choices = null;
          }

          console.log(action.payload);
        },
      )
      .addCase(
        fetchScheduleByGroup.fulfilled,
        (state, action: PayloadAction<IScheduleTable>) => {
          state.schedule = action.payload;
          state.choices = null;
        },
      )
      .addCase(
        fetchScheduleByWeek.fulfilled,
        (state, action: PayloadAction<IScheduleTable>) => {
          state.schedule = action.payload;
          state.choices = null;
        },
      );
  },
});

// Action creators are generated for each case reducer function
export const { actions: tableActions } = tableSlice;
export const { reducer: tableReducer } = tableSlice;
