import { formatBrazillianCurrency } from "../../../@utils/formatters";

type TotalRowProps = {
  total: number;
};

const TotalRow = ({ total }: TotalRowProps) => {
  const textColor = total < 0 ? "text-red-500" : "text-green-500";

  return (
    <div className="flex justify-end items-center p-4 bg-gray-50 font-medium">
      <div className="text-gray-700 mr-4">Total:</div>
      <div className={`font-bold ${textColor}`}>
        {formatBrazillianCurrency(total)}
      </div>
    </div>
  );
};

export { TotalRow };
