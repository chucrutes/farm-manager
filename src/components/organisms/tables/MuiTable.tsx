import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

export type Column<T> = {
  id: keyof T | "actions";
  label: string;
  minWidth?: number;
  align?: "center" | "left" | "center";
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  format?: (value: any) => string | React.JSX.Element;
};

export type Row<T> = T & { actions: (item: T) => React.JSX.Element };

export type StickyHeadTableProps<T> = {
  columns: Column<T>[];
  rows: Row<T>[];
  pk: keyof T;
  totalChildren?: React.ReactNode;
};

export default function StickyHeadTable<T>({
  columns,
  rows,
  pk,
  totalChildren,
}: StickyHeadTableProps<T>) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className="w-full">
      <TableContainer className="max-h-440">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  className="min-w-fit"
                  key={column.id as string}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column, index) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                          key={index}
                          align={column.align}
                        >
                          {column.format?.(value)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            {totalChildren}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage="Itens por página"
        rowsPerPageOptions={[10, 15, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
