import { useCallback, useEffect, useState } from "react";
import { EditIcon } from "../../Icons/edit-icon";
import { DeleteIcon } from "../../Icons/delete-icon";
import GenericTable, { type Column, type Row } from "./generic.table";
import { brDateFormatter } from "../../../utils/formatters";
import { TotalRow } from "./total-row";
import { deleteEntry } from "../../../services/api/entry/delete";
import { formatBrazillianCurrency } from "../../../@utils/formatters";
import { findCategoryByValue } from "../../../entities/categories.enum";
import { DtoEntry } from "../dashboard.page";
import { IAddOrUpdateEntry } from "../forms/add-update-entry-form/@types/types";

type EntryTableProps = {
  items: DtoEntry[];
  total: number;
  editEntry: (item: IAddOrUpdateEntry) => void;
  listEntries: () => void;
};

const EntryTable = ({
  items,
  total,
  editEntry,
  listEntries,
}: EntryTableProps) => {
  const [rows, setRows] = useState<Row<DtoEntry>[]>([]);

  const columns: Column<DtoEntry>[] = [
    {
      id: "description",
      label: "Descrição",
      align: "center",
      format: (value: string) => value,
    },
    {
      id: "type.name",
      label: "Tipo",
      align: "center",
      format: (value: string) => value,
    },
    {
      id: "type.category",
      label: "Categoria",
      align: "center",
      format: (value: string) => {
        return findCategoryByValue(value).label;
      },
    },
    {
      id: "quantity",
      label: "Quantidade",
      align: "center",
      format: (value: number) => {
        return value.toLocaleString("pt-BR", {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        });
      },
    },
    {
      id: "price",
      label: "Preço",
      align: "center",
      format: (value: number) => {
        return formatBrazillianCurrency(value);
      },
    },
    {
      id: "total",
      label: "Total",
      align: "center",
      format: (value: number) => {
        return formatBrazillianCurrency(value);
      },
    },
    {
      id: "updatedAt",
      label: "Atualizado em",
      align: "center",
      format: (value: string) => {
        return brDateFormatter(new Date(value));
      },
    },
    {
      id: "actions",
      label: "Ações",
      align: "center",
      format: (value: () => any) => {
        return value();
      },
    },
  ];

  const handleEditEntry = useCallback(
    (item: DtoEntry) => {
      if (!item) {
        return;
      }
      const data: IAddOrUpdateEntry = {
        _id: item._id,
        description: item.description,
        price: item.price,
        quantity: item.quantity,
        total: item.total,
        type: item.type,
        commission: item.commission,
      };

      editEntry(data);
    },
    [editEntry]
  );

  const handleDeleteEntry = useCallback(
    async (itemId: string) => {
      await deleteEntry({ ids: itemId });
      listEntries();
    },
    [listEntries]
  );

  useEffect(() => {
    const newRows: Row<DtoEntry>[] = items.map((item) => ({
      ...item,
      actions: () => (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handleEditEntry(item)}
            className="p-2 bg-transparent hover:bg-gray-200 text-blue-600 rounded-md"
          >
            <EditIcon />
          </button>
          <button
            onClick={() => handleDeleteEntry(item._id)}
            className="p-2 bg-transparent hover:bg-gray-200 text-red-500 rounded-md"
          >
            <DeleteIcon />
          </button>
        </div>
      ),
    }));

    setRows(newRows);
  }, [items, handleEditEntry, handleDeleteEntry]);

  return (
    <GenericTable
      columns={columns}
      rows={rows}
      pk="_id"
      totalChildren={<TotalRow total={total} />}
    />
  );
};

export { EntryTable };
