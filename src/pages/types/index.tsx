import AuthLayout from "../layout/AuthLayout";
import AddTypeForm from "../../components/organisms/forms/AddTypeForm";
const TypesPage = () => {
	return (
		<AuthLayout>
			<AddTypeForm cleanItem={() => console.log('clean')} editItem={async () => console.log('edit')} saveItem={async () => console.log('clean')} />
		</AuthLayout>
	);
};

export default TypesPage;
