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
  const [afterTax, setAfterTax] = useState<number | null>(null);
  const [commission, setCommission] = useState<number | null | undefined>(null);
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
      commission,
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
  const handleCommissionBlur = (value: number) => {
    const percentage = 1 - value / 100;

    setAfterTax(total * percentage);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;

    const selectedTypeObj = findType(types, selectedId);
    if (!selectedTypeObj) return;
    setSelectedType(selectedTypeObj);
    setCategory(selectedTypeObj?.category ?? null);
  };

  const resetForm = () => {
    cleanItem();
    setDescription("");
    setQuantity(0);
    setPrice(0);
    setTotal(0);
    setCommission(0);
    setSelectedType(undefined);
    setCategory(null);
    setError(null);
  };

  const setForm = (item?: IAddOrUpdateEntry | null) => {
    if (!item) return;

    const percentage = 1 - (item.commission ?? 0) / 100;

    setDescription(item.description);
    setQuantity(item.quantity);
    setPrice(item.price);
    setTotal(item.total);
    setCommission(item.commission);
    setCategory(item.type.category);
    setAfterTax(item.total * percentage);
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
    setAfterTax,
    setCommission,
    setDescription,
    setSelectedType,
    setForm,
    resetForm,
    handleSubmit,
    handlePriceBlur,
    handleTotalBlur,
    handleTypeChange,
    handleQuantityBlur,
    handleCommissionBlur,
    id,
    total,
    price,
    error,
    quantity,
    category,
    afterTax,
    commission,
    description,
    selectedType,
  };
};

const findType = (types: IType[], id?: string | null) => {
  return types.find((type) => type._id === id);
};
