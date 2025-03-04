import { useEffect, useState } from "react";
import { listEntry } from "../../pages/api/entry/list";
import type { IAddOrUpdateEntry } from "./forms/AddOrUpdateEntryForm/@types/types";
import Button from "../atoms/Button";
import { closeRegister } from "../../pages/api/entry/closeRegister";
import { EntryTable } from "./tables/EntryTable";
import AddEntryForm from "./forms/AddOrUpdateEntryForm";
import { IEntryType } from "../../entities/entry-type";
import { listEntryTypes } from "../../pages/api/entry-types/list";

export type DtoEntry = {
  _id: string;
  farmId: string;
  description: string;
  price: number;
  quantity: number;
  total: number;
  type: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  key: string;
};

export const DashboardComponent = () => {
  const [items, setItems] = useState<DtoEntry[]>([]);
  const [types, setTypes] = useState<IEntryType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [itemToEdit, setItemToEdit] = useState<IAddOrUpdateEntry | null>(null);

  const listEntries = async () => {
    const response = await listEntry();
    setItems(response.body.dto.entries);
    setTotal(response.body.dto.total);
  };
  const listTypes = async () => {
    const response = await listEntryTypes();
    setTypes(response.body.dto);
  };

  const saveItem = async ({
    type,
    // total,
    // price,
    fee,
    // quantity,
    ...item
  }: IAddOrUpdateEntry) => {
    listEntries();
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
          key={itemToEdit?.id || "new"}
          saveItem={saveItem}
          editItem={handleEditItem}
          item={itemToEdit}
          types={types}
        />

        <div className="p-8 overflow-x-auto">
          {/* <EntryTable
            items={items}
            editEntry={(item: IAddOrUpdateEntry) => setItemToEdit(item)}
            total={total}
            listEntries={listEntries}
          /> */}
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
