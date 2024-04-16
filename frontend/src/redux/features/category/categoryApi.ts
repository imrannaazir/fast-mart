import { TResponseRedux } from "@/types";
import baseApi from "../api/baseApi";
import { TCategory } from "@/types/contents.type";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //get all category
    getAllCategories: builder.query({
      query: (params) => ({
        url: "/category",
        method: "GET",
        params: params,
      }),
      transformResponse: (response: TResponseRedux<TCategory[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
      providesTags: ["Categories"],
    }),
    // create new category
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const { useCreateCategoryMutation, useGetAllCategoriesQuery } =
  categoryApi;
