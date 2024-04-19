import { TResponseRedux } from "@/types";
import baseApi from "../api/baseApi";
import { TOption, TVariant } from "@/types/product.type";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create new product
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products", "Product"],
    }),

    // get all product
    getAllProduct: builder.query({
      query: (query) => ({
        url: `/products?${query}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    // delete product by Id
    deleteProductById: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products", "Product"],
    }),

    // get product by Id
    getProductById: builder.query({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    // update product
    updateProduct: builder.mutation({
      query: ({ productId, data }) => ({
        url: `/products/${productId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Product", "Products"],
    }),
    // get highest price
    getHighestProductPrice: builder.query({
      query: () => ({
        url: "/products/highest-price",
        method: "GET",
      }),
    }),

    // delete bulk product
    deleteBulkProducts: builder.mutation({
      query: (data) => ({
        url: "/products/bulk-delete",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Product", "Products"],
    }),

    // get all variants
    getAllVariants: builder.query({
      query: () => ({
        url: "/variants",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TVariant[]>) => ({
        data: response.data,
      }),
    }),

    // get all options
    getAllOptions: builder.query({
      query: (variantId) => ({
        url: `/options?variantId=${variantId}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TOption[]>) => ({
        data: response.data,
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductQuery,
  useGetProductByIdQuery,
  useDeleteProductByIdMutation,
  useUpdateProductMutation,
  useGetHighestProductPriceQuery,
  useDeleteBulkProductsMutation,
  useGetAllVariantsQuery,
  useGetAllOptionsQuery,
} = productApi;
