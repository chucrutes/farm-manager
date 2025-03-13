import { useEffect, useState } from "react";
import { listEntry } from "../../pages/api/entry/list";
import type { IAddOrUpdateEntry } from "./forms/add-update-entry-form/@types/types";
import Button from "../atoms/Button";
import { closeRegister } from "../../pages/api/entry/closeRegister";
import AddEntryForm from "./forms/add-update-entry-form/add-update-entry.form";
import { IEntryType, IType } from "../../entities/entry-type";
import { listEntryTypes } from "../../pages/api/entry-types/list";
import { createOrUpdateEntry } from "../../pages/api/entry/create";
import { handleResponseToast } from "../../utils/handleToast";
import { EntryTable } from "./tables/entry.table";
import { stringifier } from "../../@utils/stringifier";

export type DtoEntry = {
  _id: string;
  farmId: string;
  description: string;
  price: number;
  quantity: number;
  total: number;
  type: IEntryType;
  category: string;
  createdAt: string;
  updatedAt: string;
  key: string;
};

export const DashboardComponent = () => {
  const [items, setItems] = useState<DtoEntry[]>([]);
  const [types, setTypes] = useState<IType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [itemToEdit, setItemToEdit] = useState<IAddOrUpdateEntry | null>(null);

  const listEntries = async () => {
    const response = await listEntry();
    stringifier(response.body)
    setItems(response.body.dto.entries);
    setTotal(response.body.dto.total);
  };
  const listTypes = async () => {
    const response = await listEntryTypes();
    setTypes(response.body.dto);
  };

  const saveItem = async (item: IAddOrUpdateEntry) => {
    const res = await createOrUpdateEntry({ body: item });
    if (![200, 201].includes(res.status)) {
      handleResponseToast(res);

      return;
    }

    handleResponseToast(res);

    const typeSaved = res.body.dto as DtoEntry;
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

  const handleEditItem = async (item: IAddOrUpdateEntry) => {
    setItemToEdit(null);
  };

  useEffect(() => {
    listEntries();
    listTypes();
  }, []);

  const handleCloseRegister = async () => {
    await closeRegister();
    listEntries();
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <AddEntryForm
          cleanItem={() => setItemToEdit(null)}
          saveItem={saveItem}
          editItem={handleEditItem}
          item={itemToEdit}
          types={types}
        />

        <div className="p-8 overflow-x-auto">
          <EntryTable
            items={items}
            editEntry={(item: IAddOrUpdateEntry) => setItemToEdit(item)}
            total={total}
            listEntries={listEntries}
          />
          <div className="flex justify-end">
            <Button color="primary" onClick={() => handleCloseRegister()}>
              Fechar caixa
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
