import { getErrorMessage } from "@repo/utils/functions";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type ApiOptions<TBody> = {
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

export type TApiResponse<T> = {
  data: T | null;
  success: boolean;
  message?: string;
  statusCode?: number;
};

// create custom error for authentication
export class AuthError extends Error {
  constructor(message: string = "Authentication Failed") {
    super(message);
    this.name = "AuthError";
  }
}

export default async function apiCall<TResponse, TBody = unknown>(
  endpoint: string,
  options: ApiOptions<TBody> = {}
): Promise<TApiResponse<TResponse>> {
  const { method = "GET", body, headers = {}, cache, next } = options;

  // if next is provided then include
  if (next) options.next = next;

  //if cache is provided then include that
  if (cache) options.cache = cache;

  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value || "";

  // add access token in request headers
  if (accessToken) {
    headers["Authorization"] = `${accessToken}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      cache,
      next,
    });

    // token not send -> 401 try to get access by refresh token
    if (response.status === 401) {
      const refreshTokenResponse = await fetch(`${API_URL}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
        headers: {
          Cookie: cookies().toString(),
        },
        cache: "no-store",
      });

      // if refresh token not sent
      if (refreshTokenResponse.status === 401) {
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");
        throw new AuthError();
      }
    }

    const result = await response.json();

    return {
      data: result?.data,
      success: true,
      message: result?.errorSources?.length ? result?.errorSources?.[0]?.message : result?.message,
      statusCode: response.status,
    };
  } catch (error) {
    console.log(error, "[api] - 84");

    if (error instanceof AuthError) {
      throw new AuthError();
    }

    return {
      data: null,
      success: false,
      message: getErrorMessage(error),
      statusCode: 500,
    };
  }
}
