import type { Metadata } from "next";
import "../styles/global.css";
import ThemeProvider from "@/components/providers/theme-provider";
import { Providers } from "@/components/providers/providers";

export const metadata: Metadata = {
  title: "Fast Mart",
  description: "Glossary shopping website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
