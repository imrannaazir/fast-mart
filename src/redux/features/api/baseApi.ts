import { RootState } from "@/redux/store";
import { BaseQueryApi, BaseQueryFn, DefinitionType, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken; 

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `${token}`);
      }

      return headers;
    },
});

const baseQueryWithRefreshToken :BaseQueryFn<FetchArgs,BaseQueryApi,DefinitionType> =async(args,api,extraOptions)=>{

}

const baseApi = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: () => ({}),
});

export default baseApi;
