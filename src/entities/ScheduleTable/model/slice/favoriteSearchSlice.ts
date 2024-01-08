import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IFavoriteChoice } from "/src/entities/ScheduleTable";

import { USER_FAVORITE_SEARCH } from "/src/shared/const/localStorage/localStorageKeys";

const initialState: IFavoriteChoice[] = JSON.parse(
  localStorage.getItem(USER_FAVORITE_SEARCH) || "[]"
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
      const data = JSON.parse(
        localStorage.getItem(USER_FAVORITE_SEARCH) || "[]"
      );

      const filteredData = data.filter((favorite: IFavoriteChoice) => {
        return favorite.name !== action.payload;
      });

      localStorage.setItem(USER_FAVORITE_SEARCH, JSON.stringify(filteredData));

      return state.filter(
        (item: IFavoriteChoice) => item.name !== action.payload
      );
    },
  },
  extraReducers: () => {},
});

export const { actions: favoriteSearchActions } = favoriteSearchSlice;
export const { reducer: favoriteSearchReducer } = favoriteSearchSlice;
