import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFavoriteChoice } from "/src/entities/Table/ui/ScheduleTable";
import { USER_FAVORITE_SEARCH } from "/src/shared/const/localStorageKeys";

const initialState: IFavoriteChoice[] = JSON.parse(
  localStorage.getItem(USER_FAVORITE_SEARCH) || "[]",
);

export const favoriteSearchSlice = createSlice({
  name: "favoriteSearchSlice",
  initialState,
  reducers: {
    addSearchToFavorite: (state, action: PayloadAction<IFavoriteChoice>) => {
      state.push(action.payload);
      localStorage.setItem(USER_FAVORITE_SEARCH, JSON.stringify(state));
    },
    removeSearchFromFavorite: (state, action: PayloadAction<string>) => {
      return state.filter(
        (item: IFavoriteChoice) => item.name !== action.payload,
      );
    },
  },
  extraReducers: () => {},
});

export const { actions: favoriteSearchActions } = favoriteSearchSlice;
export const { reducer: favoriteSearchReducer } = favoriteSearchSlice;