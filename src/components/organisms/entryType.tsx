import { useEffect, useState } from "react";
import Button from "../atoms/Button";
import { closeRegister } from "../../pages/api/entry/closeRegister";
import { type DtoEntryType, EntryTypeTable } from "./tables/EntryTypeTable";
import { listEntryTypes } from "../../pages/api/entry-types/list";
import { createEntryType } from "../../pages/api/entry-types/create";
import AddTypeForm from "./forms/AddTypeForm";
import type { IAddType } from "./forms/AddTypeForm/@types/types";

export const EntryTypeComponent = () => {
  const [items, setItems] = useState<DtoEntryType[]>([]);
  const [itemToEdit, setItemToEdit] = useState<IAddType | null>(null);

  const listEntries = async () => {
    const response = await listEntryTypes();
    setItems(response.body.dto);
  };

  const saveItem = async (item: IAddType) => {
    const res = await createEntryType({ body: item });

    const newItems = [res.body.dto as DtoEntryType, ...items];
    setItems(newItems);

    return res;
  };

  const handleEditItem = async (item: IAddType) => {
    setItemToEdit(null);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    listEntries();
  }, []);

  const handleListEntries = () => {
    listEntries();
  };

  const handleCloseRegister = async () => {
    await closeRegister();
    listEntries();
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <AddTypeForm
          cleanItem={() => console.log("clean")}
          editItem={async (item) => handleEditItem(item)}
          saveItem={saveItem}
        />

        <div className="p-8 overflow-x-auto">
          <EntryTypeTable
            items={items}
            editItem={(item: IAddType) => setItemToEdit(item)}
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
