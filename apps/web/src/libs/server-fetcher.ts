import { getSession } from "./auth-utils";
import { ApiResponse, fetcher, FetcherOptions } from "./fetcher";

export async function serverFetcher<TResponse, TBody = unknown>(
  endpoint: string,
  options: FetcherOptions<TBody> = {}
): Promise<ApiResponse<TBody>> {
  const { session } = await getSession();
  return await fetcher(endpoint, options, session);
}
