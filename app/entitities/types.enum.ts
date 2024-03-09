import { Categories } from "./categories.enum";

export type IType = {
  name: string;
  key: string;
  type: Categories;
};

export const types: IType[] = [
  {
    name: "Venda de Gado",
    key: "cattle_sale",
    type: Categories.PROFIT,
  },
  {
    name: "Compra de gado",
    key: "buy_cattle",
    type: Categories.PROFIT,
  },
  {
    name: "Remédio",
    key: "medicine",
    type: Categories.EXPENSE,
  },
  {
    name: "Veneno",
    key: "pesticide",
    type: Categories.EXPENSE,
  },
  {
    name: "Ração",
    key: "feed",
    type: Categories.EXPENSE,
  },
  {
    name: "Funcionário",
    key: "staff",
    type: Categories.EXPENSE,
  },
  {
    name: "Investimento",
    key: "investment",
    type: Categories.ASSET,
  },
];
