export const calculateFee = (value: number, fee: number) => {
  return parseFloat((value * (1 - fee / 100)).toFixed(2));
};
