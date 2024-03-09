import Footer from "@/components/UI/Footer";
import Header from "@/components/UI/Header";
import { DashboardComponent } from "@/components/organisms/dashboard";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center p-24">
        <DashboardComponent />
      </main>
      <Footer />
    </>
  );
}
