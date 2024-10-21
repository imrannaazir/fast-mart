"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const NextAuthProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider refetchInterval={300}>{children}</SessionProvider>;
};

export default NextAuthProvider;
