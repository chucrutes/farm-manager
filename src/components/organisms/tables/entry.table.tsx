import Button from "../../atoms/Button";
import { useCallback, useEffect, useState } from "react";
import { EditIcon } from "../../Icons/EditIcon";
import { DeleteIcon } from "../../Icons/DeleteIcon";
import StickyHeadTable, { type Column, type Row } from "./generic.table";
import { brDateFormatter } from "../../../utils/formatters";
import { TotalRow } from "./TotalRow";
import { deleteEntry } from "../../../pages/api/entry/delete";
import { DtoEntry } from "../dashboard.page";
import { IAddOrUpdateEntry } from "../forms/add-update-entry-form/@types/types";
import { IEntryType } from "../../../entities/entry-type";
import { findCategoryByValue } from "../../../entities/categories.enum";
import { formatBrazilianCurrency } from "../../../@utils/formatters";

type EntryTableProps = {
  items: DtoEntry[];
  total: number;
  editEntry: (item: IAddOrUpdateEntry) => void;
  listEntries: () => void;
};

type Entry = Row<DtoEntry>;
const EntryTable = ({
  items,
  total,
  editEntry,
  listEntries,
}: EntryTableProps) => {
  const columns: Column<DtoEntry>[] = [
    {
      id: "description",
      label: "Descrição",
      align: "left",
      format: (value: string) => value,
    },
    {
      id: "type",
      label: "Tipo",
      align: "left",
      format: (value: IEntryType) => {
        return value.name;
      },
    },
    {
      id: "type",
      label: "Categoria",
      align: "left",
      format: (value: IEntryType) => {
        return findCategoryByValue( value.category).label;
      },
    },
    {
      id: "quantity",
      label: "Quantidade",
      align: "left",
      format: (value: number) => {
        return value.toLocaleString('pt-BR', {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2
        });
      },
    },
    {
      id: "price",
      label: "Preço",
      align: "left",
      format: (value: number) => {
        return formatBrazilianCurrency(value);
      },
    },
    {
      id: "total",
      label: "Total",
      align: "left",
      format: (value: number) => {
        return formatBrazilianCurrency(value);
      },
    },
    {
      id: "updatedAt",
      label: "Atualizado em",
      align: "left",
      format: (value: string) => {
        return brDateFormatter(new Date(value));
      },
    },
    {
      id: "actions",
      label: "Ações",
      align: "left",
      format: (value) => {
        return value();
      },
    },
  ];
  const [rows, setRows] = useState<Entry[]>([]);
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
      };

      editEntry(data);
    },
    [editEntry]
  );

  const handleDeleteEntry = useCallback(
    async (itemId: string) => {
      await deleteEntry({ entryId: itemId });
      listEntries();
    },
    [listEntries]
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const rows: Entry[] = items.map((item) => ({
      ...item,
      actions: () => (
        <div className="flex flex-row">
          <div className="px-2">
            <Button onClick={() => handleEditEntry(item)}>
              <EditIcon />
            </Button>
          </div>
          <div className="px-2">
            <Button color="error" onClick={() => handleDeleteEntry(item._id)}>
              <DeleteIcon />
            </Button>
          </div>
        </div>
      ),
    }));

    setRows(rows);
  }, [items, handleEditEntry, handleDeleteEntry]);

  return (
    <StickyHeadTable
      columns={columns}
      rows={rows}
      pk={"_id"}
      totalChildren={<TotalRow total={total} />}
    />
  );
};

export { EntryTable };
