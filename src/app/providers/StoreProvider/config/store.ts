import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { userGroupReducer } from "/src/widgets/DrawerMenu";

import { searchApi } from "/src/features/SearchSchedule";
import { selectVPKReducer } from "/src/features/SelectVPK";

import {
  favoriteSearchReducer,
  scheduleApi,
  tableReducer,
} from "/src/entities/ScheduleTable";

export const store = configureStore({
  reducer: {
    userGroup: userGroupReducer,
    schedule: tableReducer,
    favoriteSearch: favoriteSearchReducer,
    selectVPK: selectVPKReducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [scheduleApi.reducerPath]: scheduleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(searchApi.middleware)
      .concat(scheduleApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
