import SignInForm from "./forms/SignInForm";
import LiveCattleFrame from "../molecules/LiveCattleFrame";

const HomeComponent = () => {
	return (
		<>
			<div className="flex justify-end">
				<LiveCattleFrame />
			</div>
			<div className="flex justify-center">
				<SignInForm />
			</div>
		</>
	);
};

export default HomeComponent;
