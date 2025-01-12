import { ReactNode } from "react";
import ContextProvider from "./context-provider";
import NextAuthProvider from "./next-auth-provider";
import { TanstackQueryProvider } from "./tanstack-query-provider";
import ThemeProvider from "./theme-provider";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <NextAuthProvider>
      <ContextProvider>
        <ThemeProvider>
          <TanstackQueryProvider>{children}</TanstackQueryProvider>
        </ThemeProvider>
      </ContextProvider>
    </NextAuthProvider>
  );
};
