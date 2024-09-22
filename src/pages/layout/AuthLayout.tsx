import React from "react";
import Header from "../../components/UI/Header";
import Footer from "../../components/UI/Footer";
import LiveCattleFrame from "../../components/molecules/LiveCattleFrame";
import useRequireAuth from "../../hooks/useRequireAuth";
import Toast from "../../components/Toast";

type AuthLayoutProps = {
  children: React.ReactNode;
};
export default function AuthLayout({ children }: Readonly<AuthLayoutProps>) {
  useRequireAuth();

  return (
    <>
      <Header />
      <main className="flex flex-col h-[calc(100vh-24px)] overflow-x-auto bg-brown">
        <Toast />
        <div className="flex justify-center overflow-x-visible md:justify-end">
          <LiveCattleFrame />
        </div>
        {children}
      </main>
      <Footer />
    </>
  );
}
