import { useEffect, useState } from "react";
import AddItemForm from "./forms/AddItemForm";
import { ItemsTable } from "./tables/ItemsTable";
import { TestTable } from "./tables/GerericTableTest";
import { listEntry } from "../../pages/api/entry/list";
import { createEntry } from "../../pages/api/entry/create";
import { IAddItem } from "./forms/AddItemForm/@types/types";
import { Types, findTypeByType, types } from "../../entities/types.enum";

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
	console.log(itemToEdit);

	const listEntries = async () => {
		const response = await listEntry();
		setItems(response.body.dto);
		setTotal(response.body.total);
	};

	const saveItem = async ({
		type,
		total,
		price,
		fee,
		quantity,
		...item
	}: IAddItem) => {
		const typeFound = findTypeByType(type);
		if (!typeFound) return;
		if (type === Types.INVESTMENT) {
			await createEntry({
				body: { type: typeFound, total, price, quantity, ...item },
			});
			await createEntry({
				body: { type: types[7], total, price, quantity, ...item },
			});
			listEntries();
			return;
		}

		let newPrice = price;
		let newTotal = total;

		if (fee) {
			newPrice = parseFloat((price * (1 - fee / 100)).toFixed(2));
			newTotal = quantity * newPrice;
			newTotal = parseFloat((quantity * newPrice).toFixed(2));
		}

		await createEntry({
			body: {
				type: typeFound,
				price: newPrice,
				quantity,
				total: newTotal,
				...item,
			},
		});
		listEntries();
	};

	const handleEditItem = async (item: IAddItem) => {
		setItemToEdit(null);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		listEntries();
	}, []);

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

				{/* <div className="p-8 overflow-x-auto">
					<ItemsTable
						items={items}
						editItem={(item: IAddItem) => setItemToEdit(item)}
						total={total}
					/>
				</div> */}
				<div className="p-8 overflow-x-auto">
					<TestTable
						items={items}
						editItem={(item: IAddItem) => setItemToEdit(item)}
						total={total}
					/>
				</div>
			</div>
		</>
	);
};
