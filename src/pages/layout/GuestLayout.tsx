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
      <main className="flex flex-col h-[calc(100vh-24px)] overflow-auto bg-[#fff4f0]">
        <div className="h-full flex flex-col gap-6">
          <Toast />
          <div className="flex justify-center overflow-x-visible md:justify-end">
            <LiveCattleFrame />
          </div>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
