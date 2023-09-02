import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "/src/features/Counter/model/slice/counterSlice";
import { userGroupReducer } from "/src/widgets/DrawerMenu/model/slice/userGroupSlice";
import { tableReducer } from "/src/entities/Table/model/slice/tableSlice";
import { favoriteSearchReducer } from "/src/entities/Table/model/slice/favoriteSearchSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    userGroup: userGroupReducer,
    schedule: tableReducer,
    favoriteSearch: favoriteSearchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
