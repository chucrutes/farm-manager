import { z } from "zod";
import { Option } from "../components/atoms/GenericSelect";

export enum Categories {
  EXPENSE = "EXPENSE",
  PROFIT = "PROFIT",
  ASSET = "ASSET",
  INVESTMENT = "INVESTMENT",
}



export const categoryOptions:Option[] =[
  {
    label: 'Dívida',
    value: Categories.EXPENSE
  },
  {
    label: 'Lucro',
    value: Categories.PROFIT
  },
  {
    label: 'Ativo',
    value: Categories.ASSET
  },
  {
    label: 'Investimento',
    value: Categories.INVESTMENT
  },
] 


export const categoriesSchema = z.nativeEnum(Categories)
