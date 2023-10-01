import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { __API_URL__ } from "/src/shared/api/api";

interface IFetchGroupByWeek {
  group: string;
  week: number;
}

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: __API_URL__ }),
  endpoints: (builder) => ({
    fetchChoices: builder.query({
      query: (query: string) => `/?query=${query}`,
    }),
    fetchGroup: builder.query({
      query: (group: string) => `/?group=${group}`,
    }),
    fetchGroupByWeek: builder.query({
      query: ({ group, week }: IFetchGroupByWeek) =>
        `/?group=${group}&week=${week}`,
    }),
  }),
});

export const {
  useLazyFetchChoicesQuery,
  useLazyFetchGroupQuery,
  useFetchGroupQuery,
  useFetchGroupByWeekQuery,
} = searchApi;
