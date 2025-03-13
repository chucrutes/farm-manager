import { useEffect, useState } from "react";
// import { closeRegister } from "../../pages/api/entry/closeRegister";
import { type DtoEntryType, EntryTypeTable } from "./tables/type.table";
import { listEntryTypes } from "../../pages/api/entry-types/list";
import { createOrUpdateEntryType } from "../../pages/api/entry-types/create";
import AddTypeForm from "./forms/add-update-type-form/add-update-type.form";
import type { IType } from "./forms/add-update-type-form/@types/types";
import { handleResponseToast } from "../../utils/handleToast";

export const EntryTypeComponent = () => {
  const [items, setItems] = useState<DtoEntryType[]>([]);
  const [itemToEdit, setItemToEdit] = useState<IType | null>(null);

  const listEntries = async () => {
    const response = await listEntryTypes();
    setItems(response.body.dto);
  };

  const saveItem = async (item: IType) => {
    const res = await createOrUpdateEntryType({ body: item });
    if (![200, 201].includes(res.status)) {
      handleResponseToast(res);

      return;
    }

    handleResponseToast(res);

    const typeSaved = res.body.dto as DtoEntryType;
    if (res.status === 201) {
      const newItems = [typeSaved, ...items];
      setItems(newItems);
      setItemToEdit(null);
      return;
    }
    setItems((previousItems) =>
      previousItems.map((entry) =>
        entry._id === typeSaved._id ? typeSaved : entry
      )
    );
    setItemToEdit(null);
  };

  useEffect(() => {
    listEntries();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center">
        <AddTypeForm
          item={itemToEdit}
          cleanItem={() => setItemToEdit(null)}
          editItem={(item) => setItemToEdit(item)}
          saveItem={saveItem}
        />

        <div className="p-8 overflow-x-auto">
          <EntryTypeTable
            items={items}
            editItem={(item: IType) => setItemToEdit(item)}
            listItems={listEntries}
          />
        </div>
      </div>
    </>
  );
};
