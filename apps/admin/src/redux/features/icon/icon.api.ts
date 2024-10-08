import { TResponseRedux } from "@/types";
import baseApi from "../api/baseApi";
import { TIcon } from "@repo/utils/types";

const iconApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllIcons: builder.query({
      query: (params) => ({
        url: "/icons",
        method: "GET",
        params: params,
      }),
      transformResponse: (response: TResponseRedux<TIcon[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
  }),
});

export const { useGetAllIconsQuery } = iconApi;
