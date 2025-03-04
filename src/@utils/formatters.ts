export const numberToBrFormat = (value: number) => {
  return value.toFixed(2).toString().replace(".", ",");
};
export const stringToNumber = (value: string) => {
  return Number.parseFloat(value.replace(",", "."));
};
