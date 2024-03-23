import { z } from "zod";

export enum Categories {
  EXPENSE = "expense",
  PROFIT = "profit",
  ASSET = "asset",
}


export const categoriesSchema = z.nativeEnum(Categories)
