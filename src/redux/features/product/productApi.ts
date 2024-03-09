import baseApi from "../api/baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create new product
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products", "Product"],
    }),

    // get all product
    getAllProduct: builder.query({
      query: (query) => ({
        url: `/product?${query}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    // delete product by Id
    deleteProductById: builder.mutation({
      query: (productId) => ({
        url: `/product/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products", "Product"],
    }),

    // get product by Id
    getProductById: builder.query({
      query: (productId) => ({
        url: `/product/${productId}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    // update product
    updateProduct: builder.mutation({
      query: ({ productId, data }) => ({
        url: `/product/${productId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Product", "Products"],
    }),
    getHighestProductPrice: builder.query({
      query: () => ({
        url: "/product/highest-price",
        method: "GET",
      }),
    }),
  }),

  // get highest price
});

export const {
  useCreateProductMutation,
  useGetAllProductQuery,
  useGetProductByIdQuery,
  useDeleteProductByIdMutation,
  useUpdateProductMutation,
  useGetHighestProductPriceQuery,
} = productApi;
