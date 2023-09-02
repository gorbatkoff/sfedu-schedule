import { configureStore } from "@reduxjs/toolkit";
import { userGroupReducer } from "/src/widgets/DrawerMenu/model/slice/userGroupSlice";
import { tableReducer } from "/src/entities/Table/model/slice/tableSlice";
import { favoriteSearchReducer } from "/src/entities/Table/model/slice/favoriteSearchSlice";
import { selectVPKReducer } from "/src/features/SelectVPK/model/slice/selectVPKSlice";

export const store = configureStore({
  reducer: {
    userGroup: userGroupReducer,
    schedule: tableReducer,
    favoriteSearch: favoriteSearchReducer,
    selectVPK: selectVPKReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
