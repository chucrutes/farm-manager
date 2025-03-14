import { TotalRow } from "./total-row";
import Button from "../../atoms/button";
import { useCallback, useEffect, useState } from "react";
import { EditIcon } from "../../Icons/edit-icon";
import { DeleteIcon } from "../../Icons/delete-icon";
import type { IEntryType } from "../../../entities/entry-type";
import type { IType } from "../forms/add-update-type-form/@types/types";
import { StickyHeadTable, type Column, type Row } from "./generic.table";
import { brDateFormatter } from "../../../utils/formatters";
import {
  type Categories,
  findCategoryByValue,
} from "../../../entities/categories.enum";
import { deleteEntryType } from "../../../pages/api/entry-types/delete";

export type DtoEntryType = Omit<IEntryType, "id"> & {
  _id: string;
  farm: unknown;
};

type TableProps = {
  items: DtoEntryType[];
  total?: number;
  editItem: (item: IType) => void;
  listItems: () => void;
};

type Item = Row<DtoEntryType>;
const EntryTypeTable = ({ items, total, editItem, listItems }: TableProps) => {
  const columns: Column<DtoEntryType>[] = [
    {
      id: "name",
      label: "Nome",
      align: "center",
      format: (value: string) => value,
    },
    {
      id: "category",
      label: "Categoria",
      align: "center",
      format: (value: Categories) => findCategoryByValue(value).label,
    },
    {
      id: "commission",
      label: "Possui comissão?",
      align: "center",
      format: (value: boolean) => {
        return value ? "Sim" : "Não";
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
      format: (value) => {
        return value();
      },
    },
  ];
  const [rows, setRows] = useState<Item[]>([]);
  const handleEditItem = useCallback(
    (item: DtoEntryType) => {
      editItem(item);
    },
    [editItem]
  );

  const handleDeleteItem = useCallback(
    async (itemId: string) => {
      await deleteEntryType({ ids: itemId });
      listItems();
    },
    [listItems]
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const rows: Item[] = items.map((item) => ({
      ...item,
      actions: () => (
        <div className="flex flex-row">
          <div className="px-2">
            <Button onClick={() => handleEditItem(item)}>
              <EditIcon />
            </Button>
          </div>
          <div className="px-2">
            <Button color="error" onClick={() => handleDeleteItem(item._id)}>
              <DeleteIcon />
            </Button>
          </div>
        </div>
      ),
    }));

    setRows(rows);
  }, [items, handleDeleteItem, handleEditItem]);

  return (
    <StickyHeadTable
      columns={columns}
      rows={rows}
      pk={"_id"}
      totalChildren={total ? <TotalRow total={total} /> : null}
    />
  );
};

export { EntryTypeTable };
