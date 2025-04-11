import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { calculateBalance } from "../../utils/calculate-balance";
import { EntryTable } from "./tables/entry.table";
import type { DtoRegister } from "./registers.page";
import { getRegisterById } from "../../services/api/register/get";

export const RegisterDetailComponent = () => {
	const { id } = useParams<{ id: string }>();
	const [register, setRegister] = useState<DtoRegister | null>(null);
	const [error, setError] = useState<string | null>(null);

	const getRegister = useCallback(async () => {
		try {
			if (!id) return;
			const response = await getRegisterById(id);
			setRegister(response.body.dto);
		} catch (_err) {
			setError("Ocorreu um erro ao buscar os dados do caixa.");
		}
	}, [id]);

	useEffect(() => {
		getRegister();
	}, [getRegister]);

	if (error) {
		return (
			<div className="p-8 bg-gray-50 h-full flex items-center justify-center">
				<div className="text-red-600">{error}</div>
			</div>
		);
	}

	if (!register) {
		return (
			<div className="p-8 bg-gray-50 h-full flex items-center justify-center">
				<div className="text-gray-600">Caixa não encontrado.</div>
			</div>
		);
	}

	const balance = calculateBalance(register.totalIncome, register.totalExpense);

	return (
		<div className="p-8 bg-gray-50 h-full">
			<div className="max-w-7xl mx-auto">
				<h1 className="text-3xl font-bold text-gray-800 mb-8">
					Caixa: {register.name}
				</h1>

				<EntryTable
					items={register.entries || []}
					editEntry={() => {}}
					total={balance}
					listEntries={() => {}}
				/>
			</div>
		</div>
	);
};
