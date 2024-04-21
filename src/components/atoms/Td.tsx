type TdProps = {
	content: string | React.ReactNode;
	colSpan?: number;
};

export const Td = ({ content, colSpan = 1 }: TdProps) => {
	return (
		<td
			className="px-6 py-4 whitespace-nowrap text-center text-black"
			colSpan={colSpan}
		>
			{content}
		</td>
	);
};
