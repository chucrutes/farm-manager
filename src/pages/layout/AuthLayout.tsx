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
			<main className="flex min-h-screen overflow-auto flex-col bg-brown">
				<Toast />
				<div className="flex justify-end">
					<LiveCattleFrame />
				</div>
				{children}
			</main>
			<Footer />
		</>
	);
}
