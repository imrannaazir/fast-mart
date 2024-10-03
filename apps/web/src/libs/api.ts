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
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

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

    if (response.status === 401) {
      const refreshTokenResponse = await fetch(`${API_URL}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (refreshTokenResponse.status === 401) {
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");
        throw new AuthError();
      }

      // Handle successful token refresh
      const newTokens = await refreshTokenResponse.json();
      // Update cookies with new tokens
      cookieStore.set("accessToken", newTokens.data?.accessToken);

      // Retry the original request with the new access token
      return apiCall(endpoint, {
        ...options,
        headers: { ...headers, Authorization: `${newTokens?.data?.accessToken}` },
      });
    }

    const result = await response.json();

    return {
      data: result?.data,
      success: result.success,
      message: result?.errorSources?.length ? result?.errorSources[0]?.message : result?.message,
      statusCode: response.status,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }

    return {
      data: null,
      success: false,
      message: getErrorMessage(error),
      statusCode: 500,
    };
  }
}
