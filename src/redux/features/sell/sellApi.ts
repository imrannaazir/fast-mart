import baseApi from "../api/baseApi";

const sellApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //
    sellProduct: builder.mutation({
      query: (data) => ({
        url: "/sell",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSellProductMutation } = sellApi;
