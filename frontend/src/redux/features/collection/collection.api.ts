import { TResponseRedux } from "@/types";
import baseApi from "../api/baseApi";
import { TCollection } from "@/types/product.type";

const collectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all collections
    getAllCollections: builder.query({
      query: (params) => ({
        url: `/collections`,
        method: "GET",
        params: params,
      }),
      transformResponse: (response: TResponseRedux<TCollection[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
  }),
});

export const { useGetAllCollectionsQuery } = collectionApi;
