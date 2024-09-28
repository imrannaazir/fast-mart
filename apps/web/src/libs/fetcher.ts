import { getErrorMessage } from "@repo/utils/functions";

type THttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type TFetcherOptions<TBody = unknown> = {
  method?: THttpMethod;
  headers?: HeadersInit;
  body?: TBody;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

export type TApiResponse<T> = {
  data: T | null;
  success: boolean;
  message?: string;
  statusCode?: number;
};

const baseUrl = process.env.NEXT_PUBLIC_DB_URL as string;

export default async function fetcher<TResponse, TBody = unknown>(
  endpoint: string,
  options: TFetcherOptions<TBody> = {}
): Promise<TApiResponse<TResponse>> {
  const { method = "GET", headers = {}, body, cache = "force-cache", next = { revalidate: false } } = options;
  const url = `${baseUrl}${endpoint}`;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      cache,
      next,
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        data: null,
        success: false,
        statusCode: response.status,
        message: result?.errorSources.length ? result?.errorSources[0].message : result?.message,
      };
    }

    return {
      data: result?.data,
      success: true,
      message: result?.message,
      statusCode: response.status,
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: getErrorMessage(error),
      statusCode: 500,
    };
  }
}
