import { USER_FAVORITE_SEARCH } from "../const/localStorageKeys";
import { IScheduleTable } from "/src/entities/ScheduleTable";
import { IFavoriteChoice } from "/src/widgets/Table/ui/ScheduleTable";

export const addSearchToFavorite = (
  schedule: IScheduleTable,
  favoriteSearch: IFavoriteChoice
): boolean => {
  const localStorageGroups = JSON.parse(
    localStorage.getItem(USER_FAVORITE_SEARCH) || "[]"
  ) as IFavoriteChoice[];

  if (
    localStorageGroups.filter((item) => item.name === favoriteSearch.name)
      .length > 0
  ) {
    localStorage.setItem(
      USER_FAVORITE_SEARCH,
      JSON.stringify(
        localStorageGroups.filter((item) => item.name !== favoriteSearch.name)
      )
    );
    return false;
  } else {
    localStorageGroups.push(favoriteSearch);

    localStorage.setItem(
      USER_FAVORITE_SEARCH,
      JSON.stringify(localStorageGroups)
    );
    return true;
  }
};
