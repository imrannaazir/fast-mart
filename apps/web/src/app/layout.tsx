import { Providers } from "@/components/providers/providers";
import type { Metadata } from "next";
import "../styles/global.css";

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
