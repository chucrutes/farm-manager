import { useEffect, useState } from "react";
import { listEntry } from "../../pages/api/entry/list";
import type { IAddEntry } from "./forms/AddEntryForm/@types/types";
import Button from "../atoms/Button";
import { closeRegister } from "../../pages/api/entry/closeRegister";
import { EntryTable } from "./tables/EntryTable";

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
  const [total, setTotal] = useState<number>(0);
  const [itemToEdit, setItemToEdit] = useState<IAddEntry | null>(null);

  const listEntries = async () => {
    const response = await listEntry();
    setItems(response.body.dto.entries);
    setTotal(response.body.dto.total);
  };

  const saveItem = async ({
    type,
    // total,
    // price,
    fee,
    // quantity,
    ...item
  }: IAddEntry) => {
    // let newPrice = price;
    // let newTotal = total;

    if (fee) {
      // newPrice = Number.parseFloat((price * (1 - fee / 100)).toFixed(2));
      // newTotal = quantity * newPrice;
      // newTotal = Number.parseFloat((quantity * newPrice).toFixed(2));
    }

    // await createEntry({
    // body: {
    //   type: typeFound,
    //   price: newPrice,
    //   quantity,
    //   total: newTotal,
    //   ...item,
    // },
    // });
    listEntries();
  };

  const handleEditItem = async (item: IAddEntry) => {
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
        {/* <AddEntryForm
          cleanItem={() => setItemToEdit(null)}
          key={itemToEdit?.id || "new"}
          saveItem={saveItem}
          editItem={handleEditItem}
          item={itemToEdit} */}
        {/* /> */}

        <div className="p-8 overflow-x-auto">
          <EntryTable
            items={items}
            editEntry={(item: IAddEntry) => setItemToEdit(item)}
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
