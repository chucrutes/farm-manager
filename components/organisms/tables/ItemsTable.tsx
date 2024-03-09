import { IItem } from "@/app/entitities/item.schema";
import { getCategory } from "@/app/entitities/types.enum";
import { Td } from "@/components/atoms/Td";
import { Th } from "@/components/atoms/Th";
import React from "react";

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
        {items.map((item, index) => (
          <tr key={index}>
            <Td content={item.description} />
            <Td content={item.type.name} />
            <Td content={getCategory[item.type.category]()} />
            <Td content={item.quantity.toString()} />
            <Td content={item.price.toString()} />
            <Td content={item.total.toString()} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
