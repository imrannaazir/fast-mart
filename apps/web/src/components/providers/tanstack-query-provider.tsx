"use client";
import { dehydrate, QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";

export const getQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000, // 1 minute
      },
    },
  });

export function TanstackQueryProvider({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export { dehydrate, useQuery };
