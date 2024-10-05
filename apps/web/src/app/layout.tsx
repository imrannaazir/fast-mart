import type { Metadata } from "next";
import "../styles/global.css";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { isAuthenticated } from "@/libs/auth";
import { getAllMyWishlistItems } from "@/actions/wishlist";

export const metadata: Metadata = {
  title: "Fast Mart",
  description: "Glossary shopping website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = isAuthenticated();
  const wishlist = user ? await getAllMyWishlistItems(user as string) : [];
  console.log(wishlist, "19");

  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
