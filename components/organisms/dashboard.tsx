"use client";

import { useState } from "react";
import { IItem } from "@/app/entities/IItem";
import AddItemForm from "./forms/AddItemForm";
import { ItemsTable } from "./tables/ItemsTable";
import { IAddItem } from "./forms/AddItemForm/@types/types";
import { Types, findTypeByType, types } from "@/app/entities/types.enum";

export const DashboardComponent = () => {
	const [items, setItems] = useState<IItem[]>([]);

	const saveItem = ({ type, ...item }: IAddItem) => {
		const typeFound = findTypeByType(type);
		if (!typeFound) return;
		if (type === Types.INVESTMENT) {
			console.log("in if");

			console.log(types[7]);

			const itemsToSave: IItem[] = [
				{
					createdAt: new Date(),
					updateAt: new Date(),
					type: typeFound,
					...item,
				},
				{
					createdAt: new Date(),
					updateAt: new Date(),
					type: types[7],
					...item,
				},
			];

			setItems((prev) => [...itemsToSave, ...prev]);
			return;
		}

		const itemToSave = {
			createdAt: new Date(),
			updateAt: new Date(),
			type: typeFound,
			...item,
		};

		setItems((prev) => [itemToSave, ...prev]);
	};

	return (
		<div className="flex flex-col items-center">
			<AddItemForm saveItem={saveItem} />

			<div className="p-8">
				<ItemsTable items={items} />
			</div>
		</div>
	);
};
