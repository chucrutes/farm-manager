import { z } from "zod";
import OptionInput from "../components/atoms/OptionInput";
import { Option } from "../components/atoms/GenericSelect";

export enum Categories {
  EXPENSE = "expense",
  PROFIT = "profit",
  ASSET = "asset",
  INVESTMENT = "investment",
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
