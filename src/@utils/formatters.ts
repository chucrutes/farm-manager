export const numberToBrFormat = (value: number) => {
  return value.toFixed(2).toString().replace(".", ",");
};
export const stringToNumber = (value: string) => {
  return Number.parseFloat(value.replace(",", "."));
};

export const formatBrazillianCurrency = (amount: number) => {
  console.log(typeof amount);
  console.log(amount);

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Math.abs(amount));
};
