import baseApi from "../api/baseApi";

const featureNameApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFeatureNames: builder.query({
      query: () => ({
        url: "/feature-name",
        method: "GET",
      }),
      providesTags: ["FeatureNames"],
    }),

    // create new brand
    createFeatureName: builder.mutation({
      query: (data) => ({
        url: "/feature-name",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FeatureNames"],
    }),
  }),
});

export const { useGetAllFeatureNamesQuery, useCreateFeatureNameMutation } =
  featureNameApi;
