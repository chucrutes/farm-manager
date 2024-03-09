import { Categories } from "./categories.enum";

export type IType = {
  name: string;
  key: string;
  category: Categories;
};

export const types: IType[] = [
  {
    name: "Venda de Gado",
    key: "cattle_sale",
    category: Categories.PROFIT,
  },
  {
    name: "Compra de gado",
    key: "buy_cattle",
    category: Categories.PROFIT,
  },
  {
    name: "Remédio",
    key: "medicine",
    category: Categories.EXPENSE,
  },
  {
    name: "Veneno",
    key: "pesticide",
    category: Categories.EXPENSE,
  },
  {
    name: "Ração",
    key: "feed",
    category: Categories.EXPENSE,
  },
  {
    name: "Funcionário",
    key: "staff",
    category: Categories.EXPENSE,
  },
  {
    name: "Investimento",
    key: "investment",
    category: Categories.ASSET,
  },
];

export const getCategory = {
  expense: () => {
    return "Dívida";
  },
  profit: () => {
    return "Lucro";
  },
  asset: () => {
    return "Patrimônio";
  },
};
