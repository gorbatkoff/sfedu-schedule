import { USER_FAVORITE_SEARCH } from "../const/localStorage/localStorageKeys";
import { IFavoriteChoice } from "/src/entities/ScheduleTable/ui/ScheduleTable";

export const addSearchToFavorite = (
  favoriteSearch: IFavoriteChoice,
): boolean => {
  const localStorageGroups = JSON.parse(
    localStorage.getItem(USER_FAVORITE_SEARCH) || "[]",
  ) as IFavoriteChoice[];

  if (
    localStorageGroups.filter((item) => item.name === favoriteSearch.name)
      .length > 0
  ) {
    localStorage.setItem(
      USER_FAVORITE_SEARCH,
      JSON.stringify(
        localStorageGroups.filter((item) => item.name !== favoriteSearch.name),
      ),
    );
    return false;
  } else {
    localStorageGroups.push(favoriteSearch);

    localStorage.setItem(
      USER_FAVORITE_SEARCH,
      JSON.stringify(localStorageGroups),
    );
    return true;
  }
};
