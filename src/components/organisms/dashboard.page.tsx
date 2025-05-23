import { useCallback, useEffect, useState } from "react";
import { listEntry } from "../../services/api/entry/list";
import type { IAddOrUpdateEntry } from "./forms/add-update-entry-form/@types/types";
import Button from "../atoms/button";
import AddEntryForm from "./forms/add-update-entry-form/add-update-entry.form";
import type { IEntryType, Type } from "../../entities/entry-type";
import { listEntryTypes } from "../../services/api/entry-type/list";
import { createOrUpdateEntry } from "../../services/api/entry/create";
import { handleResponseToast } from "../../utils/handle-toast";
import { EntryTable } from "./tables/entry.table";
import { PlusIcon } from "../Icons/plus-icon";
import { closeRegister } from "../../services/api/register/close-register";
import { listRegister } from "../../services/api/register/list";
import { stringifier } from "../../@utils/stringifier";
import BarChart from "./bar-chart";
import LiveCattlePrice from "../molecules/live-cattle-frame";

export type DtoEntry = {
	_id: string;
	description: string;
	price: number;
	quantity: number;
	commission: number | null;
	total: number;
	afterTax: number;
	type: IEntryType;
	category: string;
	createdAt: string;
	updatedAt: string;
	key: string;
};

export const DashboardComponent = () => {
	const [items, setItems] = useState<DtoEntry[]>([]);
	const [types, setTypes] = useState<Type[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [itemToEdit, setItemToEdit] = useState<IAddOrUpdateEntry | null>(null);
	const [showForm, setShowForm] = useState<boolean>(false);
	const [registers, setRegisters] = useState<any[]>([]);

	const listEntries = useCallback(async () => {
		const response = await listEntry();
		const registers = await listRegister();
		stringifier(registers.body);
		setItems(response.body.dto.entries);
		setTotal(response.body.dto.total);
		setRegisters(registers.body.dto);
	}, []);

	const listTypes = useCallback(async () => {
		const response = await listEntryTypes();
		setTypes(response.body.dto);
	}, []);

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
				setTotal((prevTotal) => prevTotal - typeSaved.afterTax);
			} else {
				setTotal((prevTotal) => prevTotal + typeSaved.afterTax);
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
	}, [listEntries, listTypes]);

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
		<>
			<div className="flex flex-col items-center">
				<div className="p-8 overflow-x-auto w-full">
					<div className="relative min-h-[60px]">
						<div
							className={`transform transition-all duration-300 ease-in-out ${
								!showForm
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-4 absolute"
							}`}
							key="add-button"
						>
							<div className="flex justify-end py-4">
								<LiveCattlePrice />
							</div>
							{!showForm && (
								<div className="flex justify-between items-center mb-4">
									<h2 className="text-2xl font-semibold">Entradas e Saídas</h2>
									<Button
										color="#00c950"
										onClick={handleAddClick}
										width="w-40"
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
								<div className="mb-6 ">
									<div className="bg-white p-4 rounded-lg">
										<AddEntryForm
											cleanItem={handleFormClose}
											saveItem={saveItem}
											editItem={handleEditItem}
											item={itemToEdit}
											types={types}
										/>
									</div>
									<div className="flex mt-6">
										<h2 className="text-2xl font-semibold">
											Entradas e Saídas
										</h2>
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

					<div className="flex justify-end mt-4">
						<Button color="#16a44b" onClick={handleCloseRegister}>
							Fechar caixa
						</Button>
					</div>
					<div className="p-8">
						{registers.length !== 0 && <BarChart data={registers} />}
					</div>
				</div>
			</div>
		</>
	);
};
