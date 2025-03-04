import { z } from "zod";
import type { Option } from "../components/atoms/GenericSelect";

export enum Categories {
  EXPENSE = "EXPENSE",
  PROFIT = "PROFIT",
  ASSET = "ASSET",
  INVESTMENT = "INVESTMENT",
}

export const categoryOptions: Option[] = [
  {
    label: "Dívida",
    value: Categories.EXPENSE,
  },
  {
    label: "Lucro",
    value: Categories.PROFIT,
  },
  {
    label: "Ativo",
    value: Categories.ASSET,
  },
];

export const findLabel = (category: Categories) => {
  return categoryOptions.find((item) => item.value === category)
    ?.label as string;
};

export const findCategoryByValue = (value: string) => {
  return categoryOptions.find((item) => item.value === value) as Option;
};

export const categoriesSchema = z.nativeEnum(Categories);
