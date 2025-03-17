import { useEffect, useState } from "react";
import { type DtoEntryType, EntryTypeTable } from "./tables/type.table";
import { listEntryTypes } from "../../services/api/entry-type/list";
import { createOrUpdateEntryType } from "../../services/api/entry-type/create";
import AddTypeForm from "./forms/add-update-type-form/add-update-type.form";
import type { IType } from "./forms/add-update-type-form/@types/types";
import { handleResponseToast } from "../../utils/handleToast";
import Button from "../atoms/button";
import { PlusIcon } from "../Icons/plus-icon";

export const EntryTypeComponent = () => {
  const [items, setItems] = useState<DtoEntryType[]>([]);
  const [itemToEdit, setItemToEdit] = useState<IType | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  const listEntries = async () => {
    const response = await listEntryTypes();
    setItems(response.body.dto);
  };

  const saveItem = async (item: IType) => {
    const res = await createOrUpdateEntryType({ body: item });
    if (![200, 201].includes(res.status)) {
      handleResponseToast(res);
      return;
    }

    handleResponseToast(res);

    const typeSaved = res.body.dto as DtoEntryType;
    if (res.status === 201) {
      const newItems = [typeSaved, ...items];
      setItems(newItems);
      setItemToEdit(null);
      setShowForm(false);
      return;
    }
    setItems((previousItems) =>
      previousItems.map((entry) =>
        entry._id === typeSaved._id ? typeSaved : entry
      )
    );
    setItemToEdit(null);
    setShowForm(false);
  };

  const handleEditItem = (item: IType) => {
    setItemToEdit(item);
    setShowForm(true);
  };

  const handleAddClick = () => {
    setShowForm(true);
    setItemToEdit(null);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setItemToEdit(null);
  };

  useEffect(() => {
    listEntries();
  }, []);

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
                  Tipos de Entrada
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
                  <AddTypeForm
                    item={itemToEdit}
                    cleanItem={handleFormClose}
                    editItem={handleEditItem}
                    saveItem={saveItem}
                  />
                </div>
                <div className="flex mt-6">
                  <h2 className="text-2xl font-semibold">Tipos de Entrada</h2>
                </div>
              </div>
            )}
          </div>
        </div>

        <EntryTypeTable
          items={items}
          editItem={handleEditItem}
          listItems={listEntries}
        />
      </div>
    </div>
  );
};
