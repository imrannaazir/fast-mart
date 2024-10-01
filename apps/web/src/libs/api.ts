import { getErrorMessage } from "@repo/utils/functions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

export default async function apiCall<TResponse, TBody = unknown>(
  endpoint: string,
  options: ApiOptions<TBody> = {}
): Promise<TApiResponse<TResponse>> {
  const { method = "GET", body, headers = {}, cache = "no-store", next = { revalidate: false } } = options;

  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value || "";

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

    console.log(response.status);
    if (response.status === 401) {
      // Attempt to refresh the token
      const refreshResponse = await fetch(`${API_URL}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
        headers: {
          refreshToken: refreshToken,
        },
      });

      if (refreshResponse.ok) {
        const { accessToken: newAccessToken } = await refreshResponse.json();
        cookieStore.set("accessToken", newAccessToken, { httpOnly: true, secure: true });

        // Retry the original request with the new token
        return apiCall(endpoint, options);
      } else {
        // If refresh fails, clear the token and redirect to login
        cookieStore.delete("accessToken");
        redirect("/login");
      }
    }
    const result = await response.json();
    // console.log({ result });

    return {
      data: result?.data,
      success: true,
      message: result?.errorSources?.length ? result?.errorSources?.[0]?.message : result?.message,
      statusCode: response.status,
    };
  } catch (error) {
    console.log(error, "error bro");

    return {
      data: null,
      success: false,
      message: getErrorMessage(error),
      statusCode: 500,
    };
  }
}
