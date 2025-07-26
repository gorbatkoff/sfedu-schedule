import { SAVED_SCHEDULE, USER_FAVORITE_SEARCH } from "/src/shared/const";

export const getSavedScheduleFromLS = JSON.parse(
  localStorage.getItem(SAVED_SCHEDULE) ?? "{}"
);

export const getFavoriteSearchFromLS = JSON.parse(
  localStorage.getItem(USER_FAVORITE_SEARCH) || "[]"
);
