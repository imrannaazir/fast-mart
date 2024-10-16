import { getErrorMessage } from "@repo/utils/functions";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface FetcherOptions<TBody = unknown> {
  method?: HttpMethod;
  headers?: HeadersInit;
  body?: TBody;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

export interface ApiResponse<T> {
  data: T | null;
  success: boolean;
  message: string;
  error?: unknown;
  statusCode: number;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

export async function fetcher<TResponse, TBody = unknown>(
  endpoint: string,
  options: FetcherOptions<TBody> = {}
): Promise<ApiResponse<TResponse>> {
  const { method = "GET", headers = {}, body, cache, next } = options;

  const url = `${baseUrl}${endpoint}`;

  const fetchOptions: RequestInit & { next?: NextFetchRequestConfig } = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  };
  // Only add cache or next options if they are provided
  if (cache) fetchOptions.cache = cache;
  if (next) fetchOptions.next = next;

  try {
    const response = await fetch(url, fetchOptions);
    const result = await response.json();
    if (response.ok) {
      return {
        data: result.data,
        success: true,
        message: result.message || "Request successful",
        statusCode: response.status,
      };
    } else {
      return {
        data: null,
        success: false,
        message: result.message || "Request failed",
        statusCode: response.status,
      };
    }
  } catch (error: unknown) {
    return {
      data: null,
      success: false,
      message: getErrorMessage(error),
      error,
      statusCode: 500,
    };
  }
}
