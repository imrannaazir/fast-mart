import baseApi from "../api/baseApi";

const operatingSystemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOperatingSystems: builder.query({
      query: () => ({
        url: "/operating-system",
        method: "GET",
      }),
      providesTags: ["OperatingSystems"],
    }),

    // create new brand
    createOperatingSystems: builder.mutation({
      query: (data) => ({
        url: "/operating-system",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["OperatingSystems"],
    }),
  }),
});

export const {
  useCreateOperatingSystemsMutation,
  useGetAllOperatingSystemsQuery,
} = operatingSystemApi;
