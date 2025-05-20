export const extractRegisterNumber = (name: string, index: number) => {
  const match = name.match(/Caixa\s+(\d+)/i);
  return match ? match[1] : (index + 1).toString();
};
