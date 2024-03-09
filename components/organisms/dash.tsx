"use client";

import { IItem } from "@/app/entitities/item.schema";
import { useState } from "react";
import AddItemForm from "./forms/AddItemForm";
import { ItemsTable } from "./tables/ItemsTable";

export const DashboardComponent = () => {
  const [items, setItems] = useState<IItem[]>([]);

  const saveItem = (item: IItem) => {
    setItems((prev) => [item, ...prev]);
  };

  return (
    <div className="flex flex-col items-center">
      <AddItemForm saveItem={saveItem} />

      <div>
        <ItemsTable items={items} />
      </div>
    </div>
  );
};
