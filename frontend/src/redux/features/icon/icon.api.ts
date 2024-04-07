import baseApi from "../api/baseApi";

const iconApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllIcons: builder.query({
      query: () => ({
        url: "/icons",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllIconsQuery } = iconApi;
