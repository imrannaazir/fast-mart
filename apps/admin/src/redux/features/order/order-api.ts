import baseApi from "../api/baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all orders
    getAllOrders: builder.query({
      query: (query) => ({
        url: `/orders/admin/all?${query}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
  }),
});

export const { useGetAllOrdersQuery } = orderApi;
