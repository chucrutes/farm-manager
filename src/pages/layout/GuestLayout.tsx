import type React from "react";
import Footer from "../../components/UI/Footer";
import LiveCattleFrame from "../../components/molecules/LiveCattleFrame";
import Toast from "../../components/Toast";

type GuestLayoutProps = {
  children: React.ReactNode;
};
export default function GuestLayout({ children }: Readonly<GuestLayoutProps>) {
  return (
    <>
      <main className="flex flex-col h-[calc(100vh-24px)] overflow-auto bg-white">
        <div className="h-full flex flex-col gap-6">
          <Toast />
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
