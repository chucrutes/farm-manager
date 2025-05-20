import AuthLayout from "../layout/auth-layout";
import { DashboardComponent } from "../../components/organisms/dashboard.page";

const DashboardPage = () => {
  return (
    <AuthLayout>
      <DashboardComponent />
    </AuthLayout>
  );
};

export default DashboardPage;
