import LiveCattleFrame from "@/components/molecules/LiveCattleFrame";
import SignInForm from "@/components/organisms/forms/SignInForm";

export default function Home() {
	return (
		<>
			<main className="flex min-h-screen overflow-auto flex-col bg-brown">
				<div className="flex justify-end">
					<LiveCattleFrame />
				</div>
				<div className="flex justify-center">
					<SignInForm />
				</div>
			</main>
		</>
	);
}
