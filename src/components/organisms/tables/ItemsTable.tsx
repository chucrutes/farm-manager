import React from "react";
import { Th } from "../../atoms/Th";
import { Td } from "../../atoms/Td";
import { findTypeByKey, getCategory } from "../../../entities/types.enum";
import { DtoItem } from "../dashboard";
import { EditIcon } from "../../Icons/EditIcon";

type TableProps = {
	items: DtoItem[];
};

export const ItemsTable: React.FC<TableProps> = ({ items }) => {
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
						return (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<tr key={index}>
								<Td content={item.description} />
								<Td content={typeFound?.name || "dsadasda"} />
								<Td content={getCategory[typeFound?.category || "expense"]()} />
								<Td content={item.quantity.toString()} />
								<Td content={item.price.toString()} />
								<Td content={item.total.toString()} />
								<Td content={item.updatedAt} />
								<Td content={<EditIcon />} />
							</tr>
						);
					})
				) : (
					<tr>
						<Td content="Nenhum registro" colSpan={8} />
					</tr>
				)}
			</tbody>
		</table>
	);
};
