import type React from "react";
import { Th } from "../../atoms/Th";
import { Td } from "../../atoms/Td";
import {
  Types,
  findTypeByKey,
  getCategory,
} from "../../../entities/types.enum";
import type { DtoItem } from "../dashboard";
import { EditIcon } from "../../Icons/EditIcon";
import type { IAddItem } from "../forms/AddItemForm/@types/types";
import Button from "../../atoms/Button";
import { DeleteIcon } from "../../Icons/DeleteIcon";
import { brDateFormatter } from "../../../utils/formatters";

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
    <div className="overflow-x-auto">
      <table className="divide-y divide-gray-200 relative">
        <thead className="bg-gray-50 sticky">
          <tr>
            <Th content="Descrição" />
            <Th content="Tipo" />
            <Th content="Categoria" />
            <Th content="Quantidade" />
            <Th content="Preço" />
            <Th content="Total" />
            <Th content="Atualizado em" />
            <Th content="Ações" />
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items && items.length > 0 ? (
            items.map((item) => {
              const typeFound = findTypeByKey(item.key);
              // const category = getCategory[typeFound?.category || "expense"]();
              const category = 'cascageaf';
              const date = brDateFormatter(new Date(item.updatedAt));
              return (
                <tr key={item._id}>
                  <Td>{item.description}</Td>
                  <Td>{typeFound?.name || "dsadasda"}</Td>
                  <Td>{category}</Td>
                  <Td>{item.quantity.toString()}</Td>
                  <Td>{item.price.toString()}</Td>
                  <Td>{item.total.toString()}</Td>
                  <Td>{date}</Td>
                  <Td>
                    <div className="py-2">
                      <Button onClick={() => handleEditItem(item)}>
                        <EditIcon />
                      </Button>
                    </div>
                    <div className="py-2">
                      <Button
                        color="error"
                        onClick={() => handleEditItem(item)}
                      >
                        <DeleteIcon />
                      </Button>
                    </div>
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
            <Td>Total</Td>
            <Td colSpan={6} />
            <Td>{total}</Td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
