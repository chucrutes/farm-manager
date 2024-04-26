import React from "react";
import Header from "../../components/UI/Header";
import Footer from "../../components/UI/Footer";
import LiveCattleFrame from "../../components/molecules/LiveCattleFrame";
import useRequireAuth from "../../hooks/useRequireAuth";
import Toast from "../../components/Toast";

type AuthLayoutProps = {
	children: React.ReactNode;
};
export default function AuthLayout({ children }: AuthLayoutProps) {
	useRequireAuth();

	return (
		<>
			<Header />
			<main className="flex flex-col min-h-screen overflow-auto bg-brown">
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
