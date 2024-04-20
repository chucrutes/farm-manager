// import Toast from "@/components/Toast";
import Footer from "@/components/UI/Footer";
import Header from "@/components/UI/Header";
import LiveCattleFrame from "@/components/molecules/LiveCattleFrame";

type LayoutProps = {
	children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<Header />
			<main className="flex min-h-screen overflow-auto flex-col bg-brown">
				<div className="flex justify-end">
					<LiveCattleFrame />
				</div>
				{children}
			</main>
			<Footer />
		</>
	);
};

export default Layout;
