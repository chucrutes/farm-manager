type TdProps = {
  content: string;
  colSpan?: number;
};

export const Td = ({ content, colSpan = 1 }: TdProps) => {
  return (
    <td
      className={`px-6 py-4 whitespace-nowrap ${
        colSpan > 1 ? "text-center" : "text-left"
      } text-black`}
      colSpan={colSpan}
    >
      {content}
    </td>
  );
};
