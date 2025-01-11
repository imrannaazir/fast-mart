"use server";
import { serverFetcher } from "@/libs/server-fetcher";

export const getClientSecret = async (amount: number) => {
  const res = await serverFetcher<{ clientSecret: string }>("/transactions/create-payment-intent", {
    method: "POST",
    body: {
      amount,
    },
    cache: "no-store",
  });

  return res;
};
