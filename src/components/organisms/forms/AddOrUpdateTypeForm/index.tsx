import {
  type AddOrUpdateTypeFormProps,
  AddOrUpdateTypeSchema,
  type IType,
} from "./@types/types";
import React, { useState } from "react";
import Alert from "../../../atoms/Span";
import Input from "../../../atoms/Input";
import Button from "../../../atoms/Button";
import { ErrorIcon } from "../../../Icons/ErrorIcon";
import LabeledInput from "../../../molecules/LabeledInput";
import {
  Categories,
  categoryOptions,
  findCategoryByValue,
} from "../../../../entities/categories.enum";
import GenericSelect, { Option } from "../../../atoms/GenericSelect";
import { validateData, verifyError } from "../../../../core/validator";
import { handleResponseToast } from "../../../../utils/handleToast";
import { ZodError } from "zod";
import CheckBox from "../../../atoms/CheckBox";

const AddTypeForm = ({
  saveItem,
  cleanItem,
  item,
}: AddOrUpdateTypeFormProps) => {
  const id = item?._id;
  const [name, setName] = useState<IType["name"]>(item?.name ? item.name : "");
  const [category, setCategory] = useState<Option>(categoryOptions[0]);
  const [commission, setCommission] = useState<IType["commission"]>(
    item?.commission ? item.commission : false
  );
  const [error, setError] = useState<ZodError<IType> | null>();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const type: IType = {
      _id: id,
      name,
      category: category.value as Categories,
      commission,
    };

    const isValid = validateData(AddOrUpdateTypeSchema, type);

    if (!isValid.success) {
      setError(isValid.data);
      return;
    }

    await saveItem(isValid.data);
  }

  const handleSelect = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(value);
    setCategory(findCategoryByValue(value));
  };

  return (
    <div className="flex flex-col justify-center">
      <h1 className="mb-4 md:mr-4 text-center text-2xl">Tipos</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex md:flex-row justify-center md:items-end flex-col">
          <LabeledInput>
            <Input
              label="Nome"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error && verifyError(error, "name") && (
              <Alert icon={<ErrorIcon />} severity="error">
                Nome inválido
              </Alert>
            )}
          </LabeledInput>
          <GenericSelect
            options={categoryOptions}
            name="category"
            onChange={handleSelect}
            label="Categoria"
          />
          <LabeledInput>
            <CheckBox
              label={"Possui comissão?"}
              value={commission}
              onChange={() => setCommission((prev) => !prev)}
            />
          </LabeledInput>
        </div>
        <div className="flex justify-center py-4">
          {item?._id ? (
            <>
              <div className="px-4">
                <Button type="submit">
                  {item?._id ? "Editar" : "Adicionar"}
                </Button>
              </div>
              <div className="px-4">
                <Button
                  color="primary"
                  onClick={() => cleanItem()}
                  type="button"
                >
                  Limpar
                </Button>
              </div>
            </>
          ) : (
            <Button type="submit">{item?._id ? "Salvar" : "Adicionar"}</Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddTypeForm;
