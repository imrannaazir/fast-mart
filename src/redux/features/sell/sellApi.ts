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
  }),
});

export const { useSellProductMutation } = sellApi;
