import AuthLayout from "../layout/AuthLayout";
import { DashboardComponent } from "../../components/organisms/dashboard";

const DashboardPage = () => {
	return (
		<AuthLayout>
			<DashboardComponent />
		</AuthLayout>
	);
};

export default DashboardPage;
