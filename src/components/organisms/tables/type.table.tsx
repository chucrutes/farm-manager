import { TotalRow } from "./total-row";
import { useCallback, useEffect, useState } from "react";
import { EditIcon } from "../../Icons/edit-icon";
import { DeleteIcon } from "../../Icons/delete-icon";
import type { IEntryType } from "../../../entities/entry-type";
import type { Type } from "../forms/add-update-type-form/@types/types";
import GenericTable, { type Column, type Row } from "./generic.table";
import { brDateFormatter } from "../../../utils/formatters";
import {
	type Categories,
	findCategoryByValue,
} from "../../../entities/categories.enum";
import { deleteEntryType } from "../../../services/api/entry-type/delete";

export type DtoEntryType = Omit<IEntryType, "id"> & {
	_id: string;
	farm: unknown;
};

type TableProps = {
	items: DtoEntryType[];
	total?: number;
	editItem: (item: Type) => void;
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
		[editItem],
	);

	const handleDeleteItem = useCallback(
		async (itemId: string) => {
			await deleteEntryType({ ids: itemId });
			listItems();
		},
		[listItems],
	);

	useEffect(() => {
		const rows: Item[] = items.map((item) => ({
			...item,
			actions: () => (
				<div className="flex justify-center gap-2">
					<button
						onClick={() => handleEditItem(item)}
						className="p-2 bg-transparent hover:bg-gray-200 text-blue-600 rounded-md"
					>
						<EditIcon />
					</button>
					<button
						onClick={() => handleDeleteItem(item._id)}
						className="p-2 bg-transparent hover:bg-gray-200 text-red-500 rounded-md"
					>
						<DeleteIcon />
					</button>
				</div>
			),
		}));

		setRows(rows);
	}, [items, handleDeleteItem, handleEditItem]);

	return (
		<GenericTable
			columns={columns}
			rows={rows}
			pk={"_id"}
			totalChildren={total ? <TotalRow total={total} /> : null}
		/>
	);
};

export { EntryTypeTable };
