import { tv } from "tailwind-variants";

const th = tv({
	base: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider",
});

type ThProps = {
	content?: string;
	children?: string;
};

export const Th = ({ content }: ThProps) => {
	return (
		<th scope="col" className={th({})}>
			{content}
		</th>
	);
};
