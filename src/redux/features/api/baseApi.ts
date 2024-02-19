import { RootState } from "@/redux/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  //   prepareHeaders: (headers, { getState }) => {
  //     const token = (getState() as RootState)?.auth?.token;

  //     // If we have a token set in state, let's assume that we should be passing it.
  //     if (token) {
  //       headers.set("authorization", `Bearer ${token}`);
  //     }

  //     return headers;
  //   },
});

const baseApi = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: () => ({}),
});

export default baseApi;
