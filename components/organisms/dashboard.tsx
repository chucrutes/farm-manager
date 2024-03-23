"use client";

import { useState } from "react";
import { IItem } from "@/app/entities/IItem";
import AddItemForm from "./forms/AddItemForm";
import { ItemsTable } from "./tables/ItemsTable";
import { IAddItem } from "./forms/AddItemForm/@types/types";
import { findTypeByType } from "@/app/entities/types.enum";

export const DashboardComponent = () => {
	const [items, setItems] = useState<IItem[]>([]);

	const saveItem = ({ type, ...item }: IAddItem) => {
		const typeFound = findTypeByType(type);
		if (!typeFound) return;

		const itemToSave: IItem = {
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

			<div>
				<ItemsTable items={items} />
			</div>
		</div>
	);
};
