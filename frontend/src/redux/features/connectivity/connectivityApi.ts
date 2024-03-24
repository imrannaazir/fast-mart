import baseApi from "../api/baseApi";

const connectivityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllConnectivity: builder.query({
      query: () => ({
        url: "/connectivity",
        method: "GET",
      }),
      providesTags: ["Connectivity"],
    }),

    // create new brand
    createConnectivity: builder.mutation({
      query: (data) => ({
        url: "/connectivity",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Connectivity"],
    }),
  }),
});

export const { useCreateConnectivityMutation, useGetAllConnectivityQuery } =
  connectivityApi;
