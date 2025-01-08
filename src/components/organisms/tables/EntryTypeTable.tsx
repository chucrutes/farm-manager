import { TotalRow } from "./TotalRow";
import Button from "../../atoms/Button";
import { useEffect, useState } from "react";
import { EditIcon } from "../../Icons/EditIcon";
import { DeleteIcon } from "../../Icons/DeleteIcon";
import { IEntryType } from "../../../entities/entry-type";
import { IAddType } from "../forms/AddTypeForm/@types/types";
import StickyHeadTable, { type Column, type Row } from "./MuiTable";
import { brDateFormatter } from "../../../utils/formatters";
import { Categories, findLabel } from "../../../entities/categories.enum";

export type DtoEntryType = Omit<IEntryType, "id"> & {
  _id: string;
  farm: unknown;
};

type TableProps = {
  items: DtoEntryType[];
  total?: number;
  editItem: (item: IAddType) => void;
  listEntries: () => void;
};

type Item = Row<DtoEntryType>;
const EntryTypeTable = ({ items, total }: TableProps) => {
  const columns: Column<DtoEntryType>[] = [
    {
      id: "name",
      label: "Nome",
      align: "left",
      format: (value: string) => value,
    },
    {
      id: "category",
      label: "Nome",
      align: "left",
      format: (value: Categories) => findLabel(value),
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
  const [rows, setRows] = useState<Item[]>([]);
  const handleEditItem = (item: DtoEntryType) => {};
  const handleDeleteItem = async (itemId: string) => {};

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
  }, [items]);

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
