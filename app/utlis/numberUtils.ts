export const parseNum = (value: any) => {
  const parsedNumber = Number(value);

  if (isNaN(parsedNumber)) return;

  return parsedNumber;
};
