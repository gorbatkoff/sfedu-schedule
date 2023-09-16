import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { __API_URL__ } from "/src/shared/api/api";

interface IFetchScheduleByWeek {
  group: string;
  week: string | number;
}

export const scheduleApi = createApi({
  reducerPath: "scheduleApi",
  baseQuery: fetchBaseQuery({ baseUrl: __API_URL__ }),
  endpoints: (builder) => ({
    fetchScheduleByWeek: builder.query({
      query: ({ group, week }: IFetchScheduleByWeek) =>
        `/?group=${group}&week=${week}`,
    }),
  }),
});

export const { useLazyFetchScheduleByWeekQuery, useFetchScheduleByWeekQuery } =
  scheduleApi;
