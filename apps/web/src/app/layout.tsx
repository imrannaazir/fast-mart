import type { Metadata } from "next";
// import { Public_Sans } from "next/font/google";
import "../styles/global.css";
import ThemeProvider from "@/components/providers/ThemeProvider";

// const public_sans = Public_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fast Mart",
  description: "Glossary shopping website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
