import GuestLayout from "../layout/GuestLayout";
import SignInForm from "../../components/organisms/forms/SignInForm";

export default function Home() {
	return (
		<GuestLayout>
			<div className="flex justify-center">
				<SignInForm />
			</div>
		</GuestLayout>
	);
}
