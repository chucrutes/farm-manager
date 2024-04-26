import React, { useEffect, useState } from "react";
import { DtoItem } from "../dashboard";
import Button from "../../atoms/Button";
import { EditIcon } from "../../Icons/EditIcon";
import { DeleteIcon } from "../../Icons/DeleteIcon";
import StickyHeadTable, { Column, Row } from "./MuiTable";
import { brDateFormatter } from "../../../utils/formatters";
import { IAddItem } from "../forms/AddItemForm/@types/types";
import {
  Types,
  findTypeByKey,
  getCategory,
} from "../../../entities/types.enum";

type TableProps = {
  items: DtoItem[];
  total: number;
  editItem: (item: IAddItem) => void;
};

type Item = Row<DtoItem>;
const TestTable = ({ items, total, editItem }: TableProps) => {
  const columns: Column<DtoItem>[] = [
    {
      id: "description",
      label: "Descrição",
      format: (value: string) => value,
    },
    {
      id: "type",
      label: "Tipo",
      format: (value: string) => {
        const typeFound = findTypeByKey(value);
        return typeFound?.name || "dasdsa";
      },
    },
    {
      id: "category",
      label: "Categoria",
      format: (value: string) => {
        const newValue = value.toLowerCase() as "expense" | "profit" | "asset";
        return getCategory[newValue]();
      },
    },
    {
      id: "quantity",
      label: "Quantidade",
      format: (value: number) => {
        return value.toString();
      },
    },
    {
      id: "price",
      label: "Preço",
      format: (value: number) => {
        return value.toString();
      },
    },
    {
      id: "total",
      label: "Total",
      format: (value: number) => {
        return value.toString();
      },
    },
    {
      id: "updatedAt",
      label: "Atualizado em",
      format: (value: string) => {
        return brDateFormatter(new Date(value));
      },
    },
    {
      id: "actions",
      label: "Ações",
      format: (value) => {
        return value();
      },
    },
  ];
  const [rows, setRows] = useState<Item[]>([]);
  const handleEditItem = (item: DtoItem) => {
    if (!item) {
      return;
    }
    const typeFound = findTypeByKey(item.key);
    const data: IAddItem = {
      id: item._id,
      description: item.description,
      price: item.price,
      quantity: item.quantity,
      total: item.total,
      type: typeFound?.name || Types.BUY_CATTLE,
      fee: 0,
    };

    console.log("edit item");
    editItem(data);
  };
  const handleDeleteItem = (item: DtoItem) => {
    console.log("item");
    console.log(item);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const rows: Item[] = items.map((item) => ({
      ...item,
      actions: () => (
        <>
          <div className="py-2">
            <Button onClick={() => handleEditItem(item)}>
              <EditIcon />
            </Button>
          </div>
          <div className="py-2">
            <Button color="error" onClick={() => handleDeleteItem(item)}>
              <DeleteIcon />
            </Button>
          </div>
        </>
      ),
    }));

    setRows(rows);
  }, [items]);

  return <StickyHeadTable columns={columns} rows={rows} pk={"_id"} />;
};

export { TestTable };
