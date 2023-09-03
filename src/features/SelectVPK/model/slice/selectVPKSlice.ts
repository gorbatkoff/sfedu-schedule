import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { $api } from "/src/shared/api/api";
import { IChoices } from "/src/features/SearchSchedule";
import { IVPK } from "/src/features/SelectVPK/model/types/VPK";
import { VPKSchema } from "/src/features/SelectVPK/model/types/VPKSchema";
import {
  USER_VPK,
  VPK_FROM_LOCALSTORAGE,
} from "/src/shared/const/localStorageKeys";
import { defaultValue } from "/src/shared/const";
import { IScheduleTable } from "/src/entities/Table/model/types/Table";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";
import { tableActions } from "/src/entities/Table/model/slice/tableSlice";

export const fetchVPK = createAsyncThunk(
  "vpk/fetchVPK",
  async function (_, { rejectWithValue }) {
    try {
      const request = await $api.get("?query=ВПК");

      return request.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  },
);

interface IFetchVPKByWeek {
  week: string | number;
  vpk: IVPK;
}

export const fetchVPKByWeek = createAsyncThunk(
  "vpk/fetchVPKByWeek",
  async function ({ week, vpk }: IFetchVPKByWeek, { rejectWithValue }) {
    try {
      console.log("vpk", vpk);

      const request = await $api.get("/", {
        params: {
          group: vpk.group,
          week: week,
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

const initialState: VPKSchema = {
  choices: [],
  VPK: VPK_FROM_LOCALSTORAGE,
  VPKData: defaultValue,
};

export const selectVPKSlice = createSlice({
  name: "selectVPKSlice",
  initialState,
  reducers: {
    setVPK: (state, action: PayloadAction<IVPK>) => {
      state.VPK = action.payload;
      localStorage.setItem(USER_VPK, JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVPK.fulfilled, (state, action: PayloadAction<IChoices>) => {
        state.choices = action.payload.choices;
      })
      .addCase(
        fetchVPKByWeek.fulfilled,
        (state, action: PayloadAction<IScheduleTable>) => {
          state.VPKData = action.payload;
          localStorage.setItem(
            "VPK_LOCALSTORAGE",
            JSON.stringify(action.payload),
          );
        },
      );
  },
});

// Action creators are generated for each case reducer function
export const { actions: selectVPKActions } = selectVPKSlice;
export const { reducer: selectVPKReducer } = selectVPKSlice;
