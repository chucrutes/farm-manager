import type React from "react";
import { AuthProvider } from "../../contexts/AuthContext";

type RootLayoutProps = {
  children: React.ReactNode;
};
export default function RootLayout({ children }: RootLayoutProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
