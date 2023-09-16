import { configureStore } from "@reduxjs/toolkit";
import { userGroupReducer } from "/src/widgets/DrawerMenu/model/slice/userGroupSlice";
import { tableReducer } from "/src/entities/ScheduleTable/model/slice/tableSlice";
import { favoriteSearchReducer } from "/src/entities/ScheduleTable/model/slice/favoriteSearchSlice";
import { selectVPKReducer } from "/src/features/SelectVPK/model/slice/selectVPKSlice";
import { searchApi } from "/src/features/SearchSchedule/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { scheduleApi } from "/src/entities/ScheduleTable/api";

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
