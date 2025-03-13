import { useState } from "react";
import {
  AddOrUpdateEntryFormProps,
  AddOrUpdateEntrySchema,
  IAddOrUpdateEntry,
} from "../@types/types";
import { IType } from "../../../../../entities/entry-type";
import { Categories } from "../../../../../entities/categories.enum";
import { ZodError } from "zod";
import { useValidateData } from "../../@hooks/use-validate-form";

type Params = Omit<AddOrUpdateEntryFormProps, "editItem">;

export const useEntryForm = ({ item, saveItem, cleanItem, types }: Params) => {
  const id = item?._id;
  const [description, setDescription] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<IType>();
  const [category, setCategory] = useState<Categories | null>(null);
  const [error, setError] = useState<ZodError<IAddOrUpdateEntry> | null>();

  const { validateData } = useValidateData();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedType) return;

    const item = {
      _id: id,
      description,
      price,
      quantity,
      total,
      type: selectedType,
    };

    const isValid = validateData(AddOrUpdateEntrySchema, item);

    if (!isValid.success) {
      setError(isValid.data);
      return;
    }

    await saveItem(isValid.data);
    resetForm();
  }

  const handlePriceBlur = (value: number) => {
    if (!quantity) return;

    const total = (value * quantity).toFixed(2);
    setPrice(value);
    setTotal(Number.parseFloat(total));
  };

  const handleQuantityBlur = (value: number) => {
    if (!price) return;

    const total = (price * value).toFixed(2);
    setQuantity(value);
    setTotal(Number.parseFloat(total));
  };
  const handleTotalBlur = (_: number) => {};

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;

    const selectedTypeObj = findType(types, selectedId);

    if (!selectedTypeObj) return;
    setSelectedType(selectedTypeObj);
    setCategory(selectedTypeObj?.category ?? null);
  };

  const resetForm = () => {
    cleanItem();
    setForm(undefined);
  };

  const setForm = (item?: IAddOrUpdateEntry | null) => {
    if (!item) {
      setDescription("");
      setQuantity(0);
      setPrice(0);
      setTotal(0);
      setSelectedType(undefined);
      setCategory(null);
      setError(null);

      return;
    }

    setDescription(item.description);
    setQuantity(item.quantity);
    setPrice(item.price);
    setTotal(item.total);
    setCategory(item.type.category);
    setError(null);

    const typeFound = findType(types, item.type?._id);

    if (!typeFound) return;
    setSelectedType(typeFound);
    setCategory(typeFound?.category ?? null);
  };

  return {
    setTotal,
    setPrice,
    setQuantity,
    setDescription,
    setSelectedType,
    setForm,
    handleSubmit,
    handlePriceBlur,
    handleTypeChange,
    handleQuantityBlur,
    handleTotalBlur,
    id,
    total,
    price,
    error,
    quantity,
    category,
    selectedType,
    description,
  };
};

const findType = (types: IType[], id?: string | null) => {
  return types.find((type) => type._id === id);
};
