import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  IS_BUTTONS_BLOCKED,
  SHOW_EMPTY_LESSONS,
  SHOW_SCHEDULE_AS_CARDS,
  USER_GROUP,
} from "/src/shared/const/localStorage/localStorageKeys";

import { IUserGroup, UserGroupSchema } from "../types/UserGroup";

const isShowEmptyLessons = JSON.parse(
  localStorage.getItem(SHOW_EMPTY_LESSONS) || "true"
);

const isScheduleAsCards = JSON.parse(
  localStorage.getItem(SHOW_SCHEDULE_AS_CARDS) || "true"
);

const initialState: UserGroupSchema = {
  userGroup: {
    groupId: "",
    name: "",
  },
  userSettings: {
    isShowEmptyLessons: isShowEmptyLessons,
    showScheduleAsCards: isScheduleAsCards,
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
    setShowEmptyLessons: (state, action: PayloadAction<boolean>) => {
      state.userSettings.isShowEmptyLessons = action.payload;
    },
    setShowScheduleAsCards: (state, action: PayloadAction<boolean>) => {
      state.userSettings.showScheduleAsCards = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: userGroupActions } = userGroupSlice;
export const { reducer: userGroupReducer } = userGroupSlice;
