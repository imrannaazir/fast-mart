import { TypedMutationTrigger } from "@reduxjs/toolkit/query/react";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

type CreateCollectionResult = {
  data: {
    _id: string;
  };
};

type CreateCollectionArg = Record<string, unknown>;

type CreateCollectionBaseQuery = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>;

export type TCreateCollection = TypedMutationTrigger<
  CreateCollectionResult,
  CreateCollectionArg,
  CreateCollectionBaseQuery
>;
