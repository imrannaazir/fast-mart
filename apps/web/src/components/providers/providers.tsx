import { ReactNode } from "react";
import NextAuthProvider from "./next-auth-provider";
import ThemeProvider from "./theme-provider";
import ContextProvider from "./context-provider";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <NextAuthProvider>
      <ContextProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </ContextProvider>
    </NextAuthProvider>
  );
};
