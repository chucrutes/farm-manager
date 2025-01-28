import { useEffect, useState } from "react";
// import { closeRegister } from "../../pages/api/entry/closeRegister";
import { type DtoEntryType, EntryTypeTable } from "./tables/EntryTypeTable";
import { listEntryTypes } from "../../pages/api/entry-types/list";
import { createOrUpdateEntryType } from "../../pages/api/entry-types/create";
import AddTypeForm from "./forms/AddOrUpdateTypeForm";
import type { IType } from "./forms/AddOrUpdateTypeForm/@types/types";

export const EntryTypeComponent = () => {
  const [items, setItems] = useState<DtoEntryType[]>([]);
  const [itemToEdit, setItemToEdit] = useState<IType | null>(null);

  const listEntries = async () => {
    const response = await listEntryTypes();
    setItems(response.body.dto);
  };

  const saveItem = async (item: IType) => {
    const res = await createOrUpdateEntryType({ body: item });

    const newItems = [res.body.dto as DtoEntryType, ...items];
    setItems(newItems);

    return res;
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    listEntries();
  }, []);

  const handleListEntries = () => {
    listEntries();
  };

  // const handleCloseRegister = async () => {
  //   await closeRegister();
  //   listEntries();
  // };

  return (
    <>
      <div className="flex flex-col items-center">
        <AddTypeForm
          item={itemToEdit}
          cleanItem={() => setItemToEdit(null)}
          editItem={async (item) => setItemToEdit(item)}
          saveItem={saveItem}
        />

        <div className="p-8 overflow-x-auto">
          <EntryTypeTable
            items={items}
            editItem={(item: IType) => setItemToEdit(item)}
            listEntries={handleListEntries}
          />
          {/* <div className="flex justify-end">
            <Button color="primary" onClick={() => handleCloseRegister()}>
              Fechar caixa
            </Button>
          </div> */}
        </div>
      </div>
    </>
  );
};
