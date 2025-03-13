import type React from "react";
import { AuthProvider } from "../../contexts/auth-context";

type RootLayoutProps = {
  children: React.ReactNode;
};
export default function RootLayout({ children }: RootLayoutProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
