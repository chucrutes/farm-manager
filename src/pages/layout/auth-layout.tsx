import React from "react";
import Header from "../../components/UI/header";
import Footer from "../../components/UI/footer";
import LiveCattleFrame from "../../components/molecules/live-cattle-frame";
import useRequireAuth from "../../hooks/use-require-auth";
import Toast from "../../components/toast";

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
