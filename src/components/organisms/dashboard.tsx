import { useEffect, useState } from "react";
import AddItemForm from "./forms/AddItemForm";
import { ItemsTable } from "./tables/ItemsTable";
import { IAddItem } from "./forms/AddItemForm/@types/types";
import { Types, findTypeByType, types } from "../../entities/types.enum";
import { createEntry } from "../../pages/api/entry/create";
import { listEntry } from "../../pages/api/entry/list";

export type DtoItem = {
	_id: string;
	farmId: string;
	description: string;
	price: number;
	quantity: number;
	total: number;
	type: string;
	category: string;
	createdAt: Date;
	updatedAt: string;
	key: string;
};

export const DashboardComponent = () => {
	const [items, setItems] = useState<DtoItem[]>([]);

	const listEntries = async () => {
		const response = await listEntry();
		setItems(response.body.dto);
	};

	const saveItem = async ({ type, ...item }: IAddItem) => {
		const typeFound = findTypeByType(type);
		if (!typeFound) return;
		if (type === Types.INVESTMENT) {
			await createEntry({ body: { type: typeFound, ...item } });
			await createEntry({ body: { type: types[7], ...item } });
			listEntries(); // Refresh items after saving
			return;
		}

		const itemToSave = {
			createdAt: new Date(),
			updatedAt: new Date(),
			type: typeFound,
			...item,
		};
		await createEntry({ body: { type: typeFound, ...item } });
		listEntries(); // Refresh items after saving
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		listEntries();
	}, [saveItem]);

	return (
		<>
			<div className="flex flex-col items-center">
				<AddItemForm saveItem={saveItem} />

				<div className="p-8 overflow-x-auto">
					<ItemsTable items={items} />
				</div>
			</div>
		</>
	);
};
