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
    // get my data
    getMyData: builder?.query({
      query: () => ({
        url: `/users/me`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useGetMyDataQuery } = userApi;
