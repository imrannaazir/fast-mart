import { useGetSession } from "@/libs/auth-utils";
import { ApiResponse, fetcher, FetcherOptions } from "@/libs/fetcher";

export const useFetcher = () => {
  const { session } = useGetSession();
  return async function <TResponse, TBody = unknown>(
    endpoint: string,
    options: FetcherOptions<TBody> = {}
  ): Promise<ApiResponse<TResponse>> {
    return fetcher(endpoint, options, session);
  };
};
