import { IType } from "./types.enum";

export type IItem = {
  description: string;
  type: IType;
  quantity: number;
  price: number;
  total: number;
};
