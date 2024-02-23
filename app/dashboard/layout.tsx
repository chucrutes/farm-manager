import Footer from "@/components/UI/Footer";
import Header from "@/components/UI/Header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className="">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
