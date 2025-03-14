import { useState, useCallback } from "react";
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
  const [error, setError] = useState<
    ZodError<IAddOrUpdateEntry> | Record<string, string> | null
  >(null);

  const { validateData } = useValidateData();

  const hasError = (field: string): boolean => {
    if (!error) return false;

    if (error instanceof ZodError) {
      return error.errors.some((err) => err.path.includes(field));
    }

    return !!error[field];
  };

  const getErrorMessage = (field: string): string => {
    if (!error) return "";

    if (error instanceof ZodError) {
      const fieldError = error.errors.find((err) => err.path.includes(field));
      return fieldError ? fieldError.message : "";
    }

    return error[field] || "";
  };

  const validateRequiredFields = (): boolean => {
    const errors: Record<string, string> = {};

    if (!description) {
      errors.description = "Descrição é obrigatória";
    }
    if (!selectedType) {
      errors.selectedType = "Tipo é obrigatório";
    }
    if (!quantity) {
      errors.quantity = "Quantidade é obrigatória";
    }
    if (!price) {
      errors.price = "Preço é obrigatório";
    }
    if (!total) {
      errors.total = "Total é obrigatório";
    }
    if (selectedType?.commission && !commission) {
      errors.commission = "Comissão é obrigatória";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateRequiredFields()) {
      return;
    }

    if (!selectedType) return;

    const item: IAddOrUpdateEntry = {
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
  };

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

  const setForm = useCallback(
    (item?: IAddOrUpdateEntry | null) => {
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
    },
    [
      setDescription,
      setQuantity,
      setPrice,
      setTotal,
      setCategory,
      setError,
      setSelectedType,
      types,
    ]
  );

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
    hasError,
    getErrorMessage,
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

const findType = (types: IType[], id?: string | null): IType | undefined => {
  return types.find((type) => type._id === id);
};
