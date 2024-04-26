import React from "react";
import { Th } from "../../atoms/Th";
import { Td } from "../../atoms/Td";
import {
	Types,
	findTypeByKey,
	getCategory,
} from "../../../entities/types.enum";
import { DtoItem } from "../dashboard";
import { EditIcon } from "../../Icons/EditIcon";
import { IAddItem } from "../forms/AddItemForm/@types/types";
import Button from "../../atoms/Button";

type TableProps = {
	items: DtoItem[];
	total: number;
	editItem: (item: IAddItem) => void;
};

export const ItemsTable: React.FC<TableProps> = ({
	items,
	editItem,
	total,
}) => {
	function handleEditItem(item: DtoItem) {
		const typeFound = findTypeByKey(item.key);
		const data: IAddItem = {
			id: item._id,
			description: item.description,
			price: item.price,
			quantity: item.quantity,
			total: item.total,
			type: typeFound?.name || Types.BUY_CATTLE,
			fee: 0,
		};

		editItem(data);
	}

	return (
		<table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
			<thead className="bg-gray-50">
				<tr>
					<Th content="Descrição" />
					<Th content="Tipo" />
					<Th content="Categoria" />
					<Th content="Quantidade" />
					<Th content="Preço" />
					<Th content="Total" />
					<Th content="Atualizado em" />
					<Th content="Editar" />
				</tr>
			</thead>
			<tbody className="min-w-full bg-white divide-y divide-gray-200">
				{items && items.length > 0 ? (
					items.map((item, index) => {
						const typeFound = findTypeByKey(item.key);
						const category = getCategory[typeFound?.category || "expense"]();
						return (
							<tr key={item._id}>
								<Td>{item.description}</Td>
								<Td>{typeFound?.name || "dsadasda"}</Td>
								<Td>{category}</Td>
								<Td>{item.quantity.toString()}</Td>
								<Td>{item.price.toString()}</Td>
								<Td>{item.total.toString()}</Td>
								<Td>
									{new Date(item.updatedAt).toLocaleDateString("pt-BR", {
										day: "2-digit",
										month: "2-digit",
										hour: "2-digit",
										minute: "2-digit",
									})}
								</Td>
								<Td>
									<Button onClick={() => handleEditItem(item)}>
										<EditIcon />
									</Button>
								</Td>
							</tr>
						);
					})
				) : (
					<tr>
						<Td content="Nenhum registro" colSpan={8} />
					</tr>
				)}
				<tr>
					<Td colSpan={7}>Total</Td>
					<Td>{total}</Td>
				</tr>
			</tbody>
		</table>
	);
};
