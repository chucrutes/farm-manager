import { useCallback, useEffect, useState } from "react";
import { listRegister } from "../../services/api/register/list";
import { useNavigate } from "react-router-dom";
import { formatBrazillianCurrency } from "../../@utils/formatters";
import Button from "../atoms/button";
import { PlusIcon } from "../Icons/plus-icon";
import {
	formatDate,
	formatShortDate,
	formatTime,
} from "../../utils/formatters";
import { calculateBalance } from "../../utils/calculate-balance";
import { calculateDuration } from "../../utils/calculate-register-duration";
import { extractRegisterNumber } from "../../utils/extract-register-number";
import type { DtoEntry } from "./dashboard.page";

export type DtoRegister = {
	_id: string;
	name: string;
	date: string;
	startDate: string;
	endDate: string;
	totalIncome: number;
	totalExpense: number;
	entries?: DtoEntry[];
};

export const RegistersComponent = () => {
	const [registers, setRegisters] = useState<DtoRegister[]>([]);
	const navigate = useNavigate();

	const handleRegisterClick = (id: string) => {
		navigate(`/register/${id}`);
	};

	const handleNewRegister = () => {
		navigate("/register/new");
	};

	const listRegisters = useCallback(async () => {
		const response = await listRegister();
		setRegisters(response.body.dto);
	}, []);

	useEffect(() => {
		listRegisters();
	}, [listRegisters]);

	return (
		<div className="p-8 bg-gray-50 min-h-screen">
			<div className="max-w-7xl mx-auto">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-gray-800">
						Caixas Registrados
					</h1>
					<Button
						type="button"
						color="#00c950"
						onClick={handleNewRegister}
						icon={<PlusIcon />}
						width="auto"
					>
						Novo Caixa
					</Button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{registers.length === 0 ? (
						<div className="col-span-full text-center py-16">
							<svg
								className="w-16 h-16 mx-auto text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>teste</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1"
									d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
							<p className="mt-4 text-gray-500 text-lg">
								Nenhum caixa registrado ainda.
							</p>
							<button
								type="button"
								onClick={() => navigate("/register/new")}
								className="mt-4 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200"
							>
								Criar seu primeiro caixa
							</button>
						</div>
					) : (
						registers.map((register, index) => {
							const balance = calculateBalance(
								register.totalIncome,
								register.totalExpense,
							);
							const isPositive = balance >= 0;
							const caixaNumber = extractRegisterNumber(register.name, index);
							const duration = calculateDuration(
								register.startDate,
								register.endDate,
							);

							return (
								<button
									type="button"
									key={register._id}
									onClick={() => handleRegisterClick(register._id)}
									className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden"
								>
									<div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
										<div className="flex justify-between items-center">
											<div className="flex items-center">
												<div
													className={`flex justify-center items-center w-10 h-10 rounded-full mr-3 ${
														isPositive
															? "bg-green-100 text-green-800"
															: "bg-red-100 text-red-800"
													}`}
												>
													<span className="font-bold">{caixaNumber}</span>
												</div>
												<div>
													<h2 className="font-semibold text-gray-800">
														Caixa {caixaNumber}
													</h2>
													<p className="text-xs text-gray-500">
														{formatDate(register.date)}
													</p>
												</div>
											</div>
											<span
												className={`text-xs font-medium ${
													isPositive
														? "bg-green-100 text-green-800"
														: "bg-red-100 text-red-800"
												} px-2 py-1 rounded-full`}
											>
												{isPositive ? "Lucro" : "Prejuízo"}
											</span>
										</div>
									</div>

									<div className="p-6">
										<div className="mb-4 bg-gray-50 rounded-lg p-4">
											<div className="flex justify-between items-center">
												<div className="text-center">
													<p className="text-xs text-gray-500">Início</p>
													<p className="text-sm font-medium text-gray-800">
														{formatShortDate(register.startDate)}
													</p>
													<p className="text-xs text-gray-500">
														{formatTime(register.startDate)}
													</p>
												</div>

												<div className="px-4">
													<div className="flex items-center">
														<div className="h-1 w-10 bg-gray-300" />
														<div className="mx-2 text-xs font-medium text-gray-600">
															{duration}
														</div>
														<div className="h-1 w-10 bg-gray-300" />
													</div>
												</div>

												<div className="text-center">
													<p className="text-xs text-gray-500">Fim</p>
													<p className="text-sm font-medium text-gray-800">
														{formatShortDate(register.endDate)}
													</p>
													<p className="text-xs text-gray-500">
														{formatTime(register.endDate)}
													</p>
												</div>
											</div>
										</div>

										<div className="flex flex-col space-y-2">
											<div className="flex justify-between">
												<span className="text-sm text-gray-600">Receitas:</span>
												<span className="text-sm font-medium text-green-600">
													{formatBrazillianCurrency(register.totalIncome)}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-sm text-gray-600">Despesas:</span>
												<span className="text-sm font-medium text-red-600">
													{formatBrazillianCurrency(register.totalExpense)}
												</span>
											</div>
											<div className="flex justify-between pt-2 border-t border-gray-100">
												<span className="text-sm font-medium text-gray-700">
													Saldo:
												</span>
												<span
													className={`text-sm font-bold ${
														isPositive ? "text-green-600" : "text-red-600"
													}`}
												>
													{formatBrazillianCurrency(balance, true)}
												</span>
											</div>
										</div>
									</div>

									<div
										className={`h-2 w-full ${
											isPositive ? "bg-green-500" : "bg-red-500"
										}`}
									/>
								</button>
							);
						})
					)}
				</div>
			</div>
		</div>
	);
};
