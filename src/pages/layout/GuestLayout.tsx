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
