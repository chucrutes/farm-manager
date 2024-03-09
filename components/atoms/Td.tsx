type TdProps = {
  content: string;
};

export const Td = ({ content }: TdProps) => {
  return <td className="px-6 py-4 whitespace-nowrap text-black">{content}</td>;
};
