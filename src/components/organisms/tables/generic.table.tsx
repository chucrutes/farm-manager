import * as React from "react";

export type Column<T> = {
  id: keyof T | string;
  label: string;
  align?: "left" | "right" | "center";
  format?: (value: any) => string | React.ReactNode;
};

export type Row<T> = T & {
  actions?: () => React.ReactNode;
};

type StickyHeadTableProps<T> = {
  columns: Column<T>[];
  rows: Row<T>[];
  pk: keyof T;
  totalChildren?: React.ReactNode;
};

export const StickyHeadTable = <T,>({
  columns,
  rows,
  pk,
  totalChildren,
}: StickyHeadTableProps<T>) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, part) => acc?.[part], obj);
  };

  return (
    <div className="w-full overflow-hidden shadow-lg rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.id)}
                  className={`p-4 text-left font-semibold bg-gray-700 text-white uppercase ${
                    column.align === "right"
                      ? "text-right"
                      : column.align === "center"
                      ? "text-center"
                      : "text-left"
                  }`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <tr
                  key={String(row[pk])}
                  className={`hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  {columns.map((column) => (
                    <td
                      key={String(column.id)}
                      className={`p-4 border-b border-gray-200 ${
                        column.align === "right"
                          ? "text-right"
                          : column.align === "center"
                          ? "text-center"
                          : "text-left"
                      }`}
                    >
                      {column.format
                        ? column.format(getNestedValue(row, String(column.id)))
                        : String(getNestedValue(row, String(column.id)))}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2 justify-center items-center">
          <select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            className="p-2 border border-gray-300 rounded-md text-sm"
          >
            {[10, 15, 20].map((size) => (
              <option key={size} value={size}>
                {size} por página
              </option>
            ))}
          </select>
          <div className="text-sm text-gray-600">
            Mostrando {page * rowsPerPage + 1} a{" "}
            {Math.min((page + 1) * rowsPerPage, rows.length)} de {rows.length}{" "}
            registros
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleChangePage(page - 1)}
            disabled={page === 0}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <span className="text-sm text-gray-600">
            Página {page + 1} de {Math.ceil(rows.length / rowsPerPage)}
          </span>
          <button
            onClick={() => handleChangePage(page + 1)}
            disabled={page >= Math.ceil(rows.length / rowsPerPage) - 1}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próxima
          </button>
        </div>
      </div>

      {totalChildren && (
        <div className="p-1 bg-gray-50 border-t border-gray-200">
          {totalChildren}
        </div>
      )}
    </div>
  );
};
