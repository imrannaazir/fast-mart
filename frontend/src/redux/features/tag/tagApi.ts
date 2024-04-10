import baseApi from "../api/baseApi";

const tagApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTag: builder.query({
      query: () => ({
        url: "/tag",
        method: "GET",
      }),
      transformErrorResponse: (response) => {
        console.log({ response });
        return {};
      },
      providesTags: ["Tags"],
    }),

    // create new brand
    createTag: builder.mutation({
      query: (data) => ({
        url: "/tag",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tags"],
    }),
  }),
});

export const { useCreateTagMutation, useGetAllTagQuery } = tagApi;
