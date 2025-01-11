import { TProfileFieldValues } from "@repo/utils/types";
import baseApi from "../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all users
    getAllUsers: builder.query({
      query: (query) => ({
        url: `/users/all?${query}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    updateMyData: builder.mutation({
      query: (data: Partial<TProfileFieldValues>) => ({
        url: `/users/update-me`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    // get my data
    getMyData: builder?.query({
      query: () => ({
        url: `/users/me`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetAllUsersQuery, useGetMyDataQuery, useUpdateMyDataMutation } = userApi;
