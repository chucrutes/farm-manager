import React from "react";
import Footer from "../../components/UI/Footer";
import LiveCattleFrame from "../../components/molecules/LiveCattleFrame";
import Toast from "../../components/Toast";

type GuestayoutProps = {
	children: React.ReactNode;
};
export default function GuestLayout({ children }: GuestayoutProps) {
	return (
		<>
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
