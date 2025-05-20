export const numberToBrFormat = (value: number) => {
  return value.toFixed(2).toString().replace(".", ",");
};
export const stringToNumber = (value: string) => {
  return Number.parseFloat(value.replace(",", "."));
};

export const formatBrazillianCurrency = (amount: number, signal?: boolean) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(signal ? amount : Math.abs(amount));
};
