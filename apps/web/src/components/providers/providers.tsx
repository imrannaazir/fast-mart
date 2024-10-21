import { ReactNode } from "react";
import NextAuthProvider from "./next-auth-provider";
import WishlistProvider from "./wishlist-provider";
import ThemeProvider from "./theme-provider";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <NextAuthProvider>
      <WishlistProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </WishlistProvider>
    </NextAuthProvider>
  );
};
