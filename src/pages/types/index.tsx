import AuthLayout from "../layout/AuthLayout";
import AddTypeForm from "../../components/organisms/forms/AddTypeForm";
import { IAddType } from "../../components/organisms/forms/AddTypeForm/@types/types";
import { createEntryType } from "../api/entry-types/create";
const TypesPage = () => {
  const saveItem = async (item: IAddType) => {
    console.log("reach save 2");
    await createEntryType({ body: item });
  };

  return (
    <AuthLayout>
      <AddTypeForm
        cleanItem={() => console.log("clean")}
        editItem={async () => console.log("edit")}
        saveItem={saveItem}
      />
    </AuthLayout>
  );
};

export default TypesPage;
