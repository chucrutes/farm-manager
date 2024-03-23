import React from "react";
import { Th } from "@/components/atoms/Th";
import { Td } from "@/components/atoms/Td";
import { IItem } from "@/app/entities/IItem";
import { getCategory } from "@/app/entities/types.enum";

type TableProps = {
	items: IItem[];
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
				</tr>
			</thead>
			<tbody className="bg-white divide-y divide-gray-200">
				{items && items.length > 0 ? (
					items.map((item, index) => (
						<tr key={index}>
							<Td content={item.description} />
							<Td content={item.type.name} />
							<Td content={getCategory[item.type.category]()} />
							<Td content={item.quantity.toString()} />
							<Td content={item.price.toString()} />
							<Td content={item.total.toString()} />
						</tr>
					))
				) : (
					<tr>
						<Td content="Nenhum registro" colSpan={6} />
					</tr>
				)}
			</tbody>
		</table>
	);
};
