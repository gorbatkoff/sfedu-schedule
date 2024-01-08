import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { __API_URL__ } from "/src/shared/api/api";

interface IFetchScheduleByWeek {
  group: string;
  week: string | number;
}

export const lessonsApi = createApi({
  reducerPath: "lessonsApi",
  baseQuery: fetchBaseQuery({ baseUrl: __API_URL__ }),
  endpoints: (builder) => ({
    fetchUpcomingLessons: builder.query({
      query: ({ group, week }: IFetchScheduleByWeek) =>
        `/?group=${group}&week=${week}`,
    }),
  }),
});

export const { useFetchUpcomingLessonsQuery } = lessonsApi;
