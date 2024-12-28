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
  }),
});

export const { useGetAllUsersQuery } = userApi;
