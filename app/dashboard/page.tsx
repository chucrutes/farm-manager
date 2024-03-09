import AddItemForm from "@/components/organisms/forms/AddItemForm";
import { useState } from "react";
import { IItem } from "../entitities/item.schema";

const DashboardPage = () => {
  const [items, setItems] = useState<IItem[]>([]);

  const saveItem = (item: IItem) => {
    setItems((prev) => [item, ...prev]);
  };

  return (
    <div className="flex flex-col items-center">
      <AddItemForm saveItem={saveItem} />
    </div>
  );
};

export default DashboardPage;
