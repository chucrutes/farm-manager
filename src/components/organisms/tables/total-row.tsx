import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { formatBrazilianCurrency } from "../../../@utils/formatters";

type TotalRowProps = {
  total: number;
};

const TotalRow = ({ total }: TotalRowProps) => {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={"total"}>
      <TableCell key={"total"} align={"left"}>
        {"Total"}
      </TableCell>
      <TableCell colSpan={6} />
      <TableCell key={"total-value"} align={"left"}>
        <p className={total < 0 ? "text-red-600" : "text-green-600"}>{formatBrazilianCurrency(total)}</p>
      </TableCell>
    </TableRow>
  );
};

export { TotalRow };
