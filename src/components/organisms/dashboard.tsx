import { useEffect, useState } from "react";
import AddItemForm from "./forms/AddItemForm";
import { listEntry } from "../../pages/api/entry/list";
import { createEntry } from "../../pages/api/entry/create";
import type { IAddItem } from "./forms/AddItemForm/@types/types";
import { findTypeByType } from "../../entities/types.enum";
import { ItemsTableGeneric } from "./tables/GerericTableTest";
import Button from "../atoms/Button";
import { closeRegister } from "../../pages/api/entry/closeRegister";

export type DtoItem = {
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
  const [items, setItems] = useState<DtoItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [itemToEdit, setItemToEdit] = useState<IAddItem | null>(null);

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
  }: IAddItem) => {
    const typeFound = findTypeByType(type);
    if (!typeFound) return;

    // let newPrice = price;
    let newTotal = total;

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

  const handleEditItem = async (item: IAddItem) => {
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
        <AddItemForm
          cleanItem={() => setItemToEdit(null)}
          key={itemToEdit?.id || "new"}
          saveItem={saveItem}
          editItem={handleEditItem}
          item={itemToEdit}
        />

        <div className="p-8 overflow-x-auto">
          <ItemsTableGeneric
            items={items}
            editItem={(item: IAddItem) => setItemToEdit(item)}
            total={total}
            listEntries={handleListEntries}
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
