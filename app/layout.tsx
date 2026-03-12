import type { Metadata } from "next";
import "./globals.css";
import { sora } from "./fonts";

export const metadata: Metadata = {
  title: "Bazarify by Orio",
  description: "Bazarify is a marketplace for everything",
};

import { TanstackClientProvider } from "@/components/query-provider";
import Navbar from "@/components/layout/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.className} antialiased`}>
        <TanstackClientProvider>
          <Navbar />
          {children}
        </TanstackClientProvider>
      </body>
    </html>
  );
}
