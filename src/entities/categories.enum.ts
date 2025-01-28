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
  {
    label: "Investimento",
    value: Categories.INVESTMENT,
  },
];

export const findLabel = (category: Categories) => {
  return categoryOptions.find((item) => item.value === category)
    ?.label as string;
};

export const categoriesSchema = z.nativeEnum(Categories);
