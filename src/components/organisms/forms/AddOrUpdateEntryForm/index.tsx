import { useState } from "react";
import { ZodError } from "zod";
import { Alert } from "@mui/material";
import { ErrorIcon } from "../../../Icons/ErrorIcon";
import { validateData, verifyError } from "../../../../core/validator";
import LabeledInput from "../../../molecules/LabeledInput";
import { AddOrUpdateEntryFormProps, AddOrUpdateEntrySchema, IAddOrUpdateEntry } from "./@types/types";
import Input from "../../../atoms/Input";
import Button from "../../../atoms/Button";
import { CurrencyInput } from "../../../atoms/CurrencyInput";
import {  IType } from "../../../../entities/entry-type";
import Label from "../../../atoms/Label";
import { Categories, findLabel } from "../../../../entities/categories.enum";
import Select, { Option } from "../../../atoms/Select";
import { stringifier } from "../../../../@utils/stringifier";

const AddEntryForm = ({
  saveItem,
  editItem,
  cleanItem,
  item,
  types,
}: AddOrUpdateEntryFormProps) => {
  const id = item?._id;
  const [description, setDescription] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<IType>();
  const [category, setCategory] = useState<Categories | null>(null);
  const [error, setError] = useState<ZodError<IAddOrUpdateEntry> | null>();
  console.log(price, quantity, total)

  const typeOptions: Option[] = types.map((type) => ({
    value: type._id,
    label: type.name,
  }));


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    console.log('handleSubmit')
    event.preventDefault();

    if(!selectedType) return;

    const item = {
      _id: id,
      description,
      price,
      quantity,
      total,
      type: selectedType
    };

    const isValid = validateData(AddOrUpdateEntrySchema, item);


    if (!isValid.success) {
      setError(isValid.data);
      return;
    }

    await saveItem(isValid.data);
    resetForm();
  }

  const resetForm = () => {
    cleanItem();

    setPrice(0);
    setQuantity(0);
    setTotal(0);
    setDescription("");
    setSelectedType(undefined);
    setError(null);
  };

  const handlePriceBlur = (value: number) => {
    if (!quantity) return;

    const total = (value * quantity).toFixed(2);
    setPrice(value);
    setTotal(Number.parseFloat(total));
  };

  const handleTotalBlur = (value: number) => {
    // if (!quantity) return;

    // const price = (value / quantity).toFixed(2);
    // console.log('price', price)
    // console.log('total', value)
    // setTotal(value)
    // setPrice(Number.parseFloat(price));
  };

  const handleQuantityBlur = (value: number) => {
    if (!price) return;

    const total = (price * value).toFixed(2);
    setQuantity(value);
    setTotal(Number.parseFloat(total));
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    
    const selectedTypeObj = types.find((type) => type._id === selectedId);

    
    if(!selectedTypeObj) return;
    setSelectedType(selectedTypeObj);
    setCategory(selectedTypeObj?.category ?? null);
  };


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
              value={category ? findLabel(category) : ""}
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
