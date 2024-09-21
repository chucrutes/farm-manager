import type { ComponentProps } from "react";

type TdProps = ComponentProps<"td">;

export const Td = ({ colSpan = 1, children }: TdProps) => {
  return (
    <td
      className="px-6 py-4 whitespace-nowrap text-center text-black"
      colSpan={colSpan}
    >
      {children}
    </td>
  );
};
