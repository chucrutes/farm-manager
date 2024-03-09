import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gerenciador de fazenda",
  description: "App para gerenciar fluxo de caixa de fazenda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <AppRouterCacheProvider> */}
      <body className={inter.className}>{children}</body>
      {/* </AppRouterCacheProvider> */}
    </html>
  );
}
