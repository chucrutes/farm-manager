import {
  type AddOrUpdateTypeFormProps,
  AddOrUpdateTypeSchema,
  type IType,
} from "./@types/types";
import React, { useEffect, useState } from "react";
import Alert from "../../../atoms/Span";
import Input from "../../../atoms/Input";
import Button from "../../../atoms/Button";
import { ErrorIcon } from "../../../Icons/ErrorIcon";
import LabeledInput from "../../../molecules/LabeledInput";
import {
  categoryOptions,
} from "../../../../entities/categories.enum";
import Select from "../../../atoms/Select";
import CheckBox from "../../../atoms/CheckBox";
import { useValidateData } from "../@hooks/use-validate-form";
import { useTypeForm } from "./@hooks/use-type-form.hook";

const AddTypeForm = ({
  saveItem,
  cleanItem,
  item,
}: AddOrUpdateTypeFormProps) => {
  const { verifyError} = useValidateData()
  const {resetForm, handleSubmit, category, name, setName, error, handleSelect, commission, setCommission} = useTypeForm({item, saveItem, cleanItem})


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
          <Select
            options={categoryOptions}
            name="category"
            onChange={handleSelect}
            label="Categoria"
            value={category.value}
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
                  onClick={() => resetForm()}
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
