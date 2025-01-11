import { TChangePasswordFieldValues } from "@repo/utils/types";
import baseApi from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //login
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Orders", "Order", "Products", "Product"],
    }),
    //register
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Orders", "Order", "Products", "Product"],
    }),
    //logout
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    // change password
    changePassword: builder.mutation({
      query: (data: Pick<TChangePasswordFieldValues, "oldPassword" | "password">) => ({
        url: `/auth/change-password`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLogoutMutation, useLoginMutation, useRegisterMutation, useChangePasswordMutation } = authApi;
