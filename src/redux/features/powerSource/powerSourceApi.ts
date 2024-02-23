import baseApi from "../api/baseApi";

const powerSourceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPowerSources: builder.query({
      query: () => ({
        url: "/power-source",
        method: "GET",
      }),
      providesTags: ["PowerSources"],
    }),

    // create new brand
    createPowerSources: builder.mutation({
      query: (data) => ({
        url: "/power-source",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PowerSources"],
    }),
  }),
});

export const { useCreatePowerSourcesMutation, useGetAllPowerSourcesQuery } =
  powerSourceApi;
