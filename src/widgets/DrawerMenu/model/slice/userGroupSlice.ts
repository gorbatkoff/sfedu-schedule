import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserGroup, UserGroupSchema } from "../types/UserGroup";
import {
  IS_BUTTONS_BLOCKED,
  SHOW_EMPTY_LESSONS,
  USER_GROUP,
} from "/src/shared/const/localStorage/localStorageKeys";

const isShowEmptyLessons = JSON.parse(
  localStorage.getItem(SHOW_EMPTY_LESSONS) || "true",
);

const initialState: UserGroupSchema = {
  userGroup: {
    groupId: "",
    name: "",
  },
  userSettings: {
    isShowEmptyLessons: isShowEmptyLessons,
  },
};

export const userGroupSlice = createSlice({
  name: "userGroupSlice",
  initialState,
  reducers: {
    setUserGroup: (state, action: PayloadAction<IUserGroup>) => {
      state.userGroup = action.payload;
      localStorage.setItem(USER_GROUP, JSON.stringify(action.payload));
      localStorage.setItem(IS_BUTTONS_BLOCKED, "true");
    },
    setUserSettings: (state, action: PayloadAction<boolean>) => {
      state.userSettings.isShowEmptyLessons = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: userGroupActions } = userGroupSlice;
export const { reducer: userGroupReducer } = userGroupSlice;
