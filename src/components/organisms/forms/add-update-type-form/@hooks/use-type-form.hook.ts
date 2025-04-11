import { ZodError } from "zod";
import { useCallback, useState } from "react";
import { Option } from "../../../../atoms/select";
import {
  AddOrUpdateTypeFormProps,
  AddOrUpdateTypeSchema,
  IType,
} from "../@types/types";
import { useValidateData } from "../../@hooks/use-validate-form";
import {
  Categories,
  categoryOptions,
  findCategoryByValue,
} from "../../../../../entities/categories.enum";

type Params = Omit<AddOrUpdateTypeFormProps, "editItem">;

export const useTypeForm = ({ item, saveItem, cleanItem }: Params) => {
  const id = item?._id;
  const [name, setName] = useState<IType["name"]>("");
  const [category, setCategory] = useState<Option>(categoryOptions[0]);
  const [commission, setCommission] = useState<IType["commission"]>(false);
  const [error, setError] = useState<ZodError<IType> | null>();

  const { validateData } = useValidateData();

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
    resetForm();
  }

  const resetForm = () => {
    cleanItem();
    setName("");
    setCategory(categoryOptions[0]);
    setCommission(false);
    setError(null);
  };

  const setForm = useCallback(
    (item?: IType | null) => {
      if (!item) return;

      setName(item.name);
      setCategory(findCategoryByValue(item.category));
      setCommission(item.commission);
    },
    [setName, setCategory, setCommission]
  );

  const handleSelect = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(findCategoryByValue(value));
  };

  return {
    setName,
    setError,
    setCategory,
    setCommission,
    handleSubmit,
    handleSelect,
    resetForm,
    setForm,
    name,
    category,
    error,
    commission,
  };
};
