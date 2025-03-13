import { z } from "zod";
import type { Option } from "../components/atoms/select";

export enum Categories {
  EXPENSE = "EXPENSE",
  INCOME = "INCOME",
  ASSET = "ASSET",
}

export const categoryOptions: Option[] = [
  {
    label: "Dívida",
    value: Categories.EXPENSE,
  },
  {
    label: "Receita",
    value: Categories.INCOME,
  },
  {
    label: "Ativo",
    value: Categories.ASSET,
  },
];

export const findCategoryByValue = (value: string) => {
  return categoryOptions.find((item) => item.value === value) as Option;
};

export const categoriesSchema = z.nativeEnum(Categories);
