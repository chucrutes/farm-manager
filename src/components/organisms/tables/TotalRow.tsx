import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

type TotalRowProps = {
  total: number;
};

const TotalRow = ({ total }: TotalRowProps) => {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={"total"}>
      <TableCell key={"total"} align={"center"}>
        {"Total"}
      </TableCell>
      <TableCell colSpan={6} />
      <TableCell key={"total-value"} align={"center"}>
        {total ? total : 0}
      </TableCell>
    </TableRow>
  );
};

export { TotalRow };
