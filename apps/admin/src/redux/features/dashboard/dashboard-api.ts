import baseApi from "../api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get dashboard insights
    getDashboardInsights: builder.query({
      query: () => ({
        url: `/dashboard/insights`,
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardInsightsQuery } = dashboardApi;
