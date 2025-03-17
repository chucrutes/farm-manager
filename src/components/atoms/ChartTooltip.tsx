import { ValueType } from "recharts/types/component/DefaultTooltipContent";
import { formatBrazillianCurrency } from "../../@utils/formatters";

export const ChartTooltip = (value: ValueType) => {
  const _value = formatBrazillianCurrency(value as number);
  return _value;
};
