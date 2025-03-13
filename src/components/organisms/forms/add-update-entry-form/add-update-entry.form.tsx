import { Alert } from "@mui/material";
import Label from "../../../atoms/Label";
import Input from "../../../atoms/Input";
import Button from "../../../atoms/Button";
import { ErrorIcon } from "../../../Icons/ErrorIcon";
import Select, { Option } from "../../../atoms/Select";
import LabeledInput from "../../../molecules/LabeledInput";
import { AddOrUpdateEntryFormProps } from "./@types/types";
import { useEntryForm } from "./@hooks/use-entry-form.hook";
import { CurrencyInput } from "../../../atoms/CurrencyInput";
import { useValidateData } from "../@hooks/use-validate-form";
import { findCategoryByValue } from "../../../../entities/categories.enum";
import { useEffect } from "react";

const AddEntryForm = ({
  saveItem,
  cleanItem,
  item,
  types,
}: AddOrUpdateEntryFormProps) => {
  const { verifyError } = useValidateData();
  const {
    id,
    error,
    total,
    price,
    category,
    quantity,
    description,
    selectedType,
    handleSubmit,
    handlePriceBlur,
    handleQuantityBlur,
    handleTypeChange,
    handleTotalBlur,
    setDescription,
    setPrice,
    setQuantity,
    setTotal,
    setForm,
  } = useEntryForm({ item, saveItem, cleanItem, types });

  const typeOptions: Option[] = types.map((type) => ({
    value: type._id,
    label: type.name,
  }));

  useEffect(() => {
    setForm(item);
  }, [item, setForm]);

  return (
    <div className="flex flex-col justify-center">
      <h1 className="mb-4 md:mr-4 text-center text-2xl">Entradas e Saídas</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex md:flex-row justify-center md:items-end flex-col">
          <LabeledInput>
            <Input
              label="Descrição"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {error && verifyError(error, "description") && (
              <Alert icon={<ErrorIcon />} severity="error">
                Descrição inválida
              </Alert>
            )}
          </LabeledInput>
          <LabeledInput>
            <Input
              label="Categoria"
              id="category"
              disabled={true}
              value={category ? findCategoryByValue(category)?.label : ""}
            />
            {error && verifyError(error, "category") && (
              <Alert icon={<ErrorIcon />} severity="error">
                Categoria inválida
              </Alert>
            )}
          </LabeledInput>
          <Select
            options={typeOptions}
            name="type"
            onChange={handleTypeChange}
            label="Tipo"
            value={selectedType?._id ?? ""}
          />
          <LabeledInput>
            <Label>Quantidade</Label>
            <CurrencyInput
              id="quantity"
              value={quantity}
              onChange={setQuantity}
              onBlur={handleQuantityBlur}
            />
          </LabeledInput>
          <LabeledInput>
            <Label>Preço</Label>
            <CurrencyInput
              id="price"
              value={price}
              onChange={setPrice}
              onBlur={handlePriceBlur}
            />
          </LabeledInput>
          <LabeledInput>
            <Label>Total</Label>
            <CurrencyInput
              id="total"
              value={total}
              onChange={setTotal}
              onBlur={handleTotalBlur}
            />
          </LabeledInput>
        </div>

        <div className="flex justify-center py-4">
          {id ? (
            <>
              <div className="px-4">
                <Button type="submit">Editar</Button>
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
            <Button type="submit">Adicionar</Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddEntryForm;
