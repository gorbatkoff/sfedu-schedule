import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { userGroupReducer } from "/src/widgets/DrawerMenu/model/slice/userGroupSlice";
import { tableReducer } from "/src/entities/ScheduleTable/model/slice/tableSlice";
import { favoriteSearchReducer } from "/src/entities/ScheduleTable/model/slice/favoriteSearchSlice";
import { selectVPKReducer } from "/src/features/SelectVPK/model/slice/selectVPKSlice";
import { searchApi } from "/src/features/SearchSchedule";
import { scheduleApi } from "/src/entities/ScheduleTable";
import { lessonsApi } from "/src/entities/UpcomingLessons";

export const store = configureStore({
  reducer: {
    userGroup: userGroupReducer,
    schedule: tableReducer,
    favoriteSearch: favoriteSearchReducer,
    selectVPK: selectVPKReducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [scheduleApi.reducerPath]: scheduleApi.reducer,
    [lessonsApi.reducerPath]: lessonsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(searchApi.middleware)
      .concat(scheduleApi.middleware)
      .concat(lessonsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
