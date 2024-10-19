"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
  return <SessionProvider refetchInterval={300}>{children}</SessionProvider>;
};
