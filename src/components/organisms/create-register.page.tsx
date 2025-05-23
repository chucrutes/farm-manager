import { useEffect, useState } from "react";
import { listEntry } from "../../services/api/entry/list";
import type { IAddOrUpdateEntry } from "./forms/add-update-entry-form/@types/types";
import Button from "../atoms/button";
import AddEntryForm from "./forms/add-update-entry-form/add-update-entry.form";
import { IEntryType, Type } from "../../entities/entry-type";
import { listEntryTypes } from "../../services/api/entry-type/list";
import { createOrUpdateEntry } from "../../services/api/entry/create";
import { handleResponseToast } from "../../utils/handle-toast";
import { EntryTable } from "./tables/entry.table";
import { PlusIcon } from "../Icons/plus-icon";
import { closeRegister } from "../../services/api/register/close-register";
import { DtoEntry } from "./dashboard.page";

export const CreateRegisterComponent = () => {
	const [items, setItems] = useState<DtoEntry[]>([]);
	const [types, setTypes] = useState<Type[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [itemToEdit, setItemToEdit] = useState<IAddOrUpdateEntry | null>(null);
	const [showForm, setShowForm] = useState<boolean>(false);

	const listEntries = async () => {
		const response = await listEntry();
		setItems(response.body.dto.entries);
		setTotal(response.body.dto.total);
	};

	const listTypes = async () => {
		const response = await listEntryTypes();
		setTypes(response.body.dto);
	};

	const saveItem = async (item: IAddOrUpdateEntry) => {
		const res = await createOrUpdateEntry({ body: item });
		if (![200, 201].includes(res.status)) {
			handleResponseToast(res);
			return;
		}

		handleResponseToast(res);

		const typeSaved = res.body.dto as DtoEntry;
		if (res.status === 201) {
			const newItems = [typeSaved, ...items];
			setItems(newItems);
			if (typeSaved.type.category === "EXPENSE") {
				setTotal((prevTotal) => prevTotal - typeSaved.total);
			} else {
				setTotal((prevTotal) => prevTotal + typeSaved.total);
			}
			setItemToEdit(null);
			return;
		}
		setItems((previousItems) =>
			previousItems.map((entry) =>
				entry._id === typeSaved._id ? typeSaved : entry,
			),
		);
		setItemToEdit(null);
	};

	const handleEditItem = async (item: IAddOrUpdateEntry) => {
		setItemToEdit(item);
		setShowForm(true);
	};

	useEffect(() => {
		listEntries();
		listTypes();
	}, []);

	const handleCloseRegister = async () => {
		await closeRegister();
		listEntries();
	};

	const handleAddClick = () => {
		setShowForm(true);
		setItemToEdit(null);
	};

	const handleFormClose = () => {
		setShowForm(false);
		setItemToEdit(null);
	};

	return (
		<div className="p-8 bg-gray-50 min-h-screen">
			<div className="max-w-7xl mx-auto">
				<div className="relative min-h-[60px]">
					<div
						className={`transform transition-all duration-300 ease-in-out ${
							!showForm
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-4 absolute"
						}`}
						key="add-button"
					>
						{!showForm && (
							<div className="flex justify-between items-center mb-8">
								<h1 className="text-3xl font-bold text-gray-800">
									Entradas e Saídas
								</h1>
								<Button
									color="#00c950"
									onClick={handleAddClick}
									width="auto"
									icon={<PlusIcon />}
								>
									Adicionar
								</Button>
							</div>
						)}
					</div>

					<div
						className={`transform transition-all duration-300 ease-in-out ${
							showForm
								? "opacity-100 translate-y-0"
								: "opacity-0 -translate-y-4 absolute"
						}`}
						key="form"
					>
						{showForm && (
							<div className="mb-6">
								<div className="bg-white p-6 rounded-lg shadow-sm">
									<AddEntryForm
										cleanItem={handleFormClose}
										saveItem={saveItem}
										editItem={handleEditItem}
										item={itemToEdit}
										types={types}
									/>
								</div>
								<div className="flex mt-6">
									<h2 className="text-2xl font-semibold">Entradas e Saídas</h2>
								</div>
							</div>
						)}
					</div>
				</div>

				<EntryTable
					items={items}
					editEntry={handleEditItem}
					total={total}
					listEntries={listEntries}
				/>

				<div className="flex justify-end mt-6">
					<Button color="#16a44b" onClick={handleCloseRegister}>
						Fechar caixa
					</Button>
				</div>
			</div>
		</div>
	);
};
