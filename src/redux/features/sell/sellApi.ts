import baseApi from "../api/baseApi";

const sellApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //
    sellProduct: builder.mutation({
      query: (data) => ({
        url: "/order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product", "Products", "Order", "Orders"],
    }),

    //get all order list
    getAllOrder: builder.query({
      query: (query) => ({
        url: `/order/?${query}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSellProductMutation, useGetAllOrderQuery } = sellApi;
