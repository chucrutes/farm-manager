type ILabeledInput = {
	hidden?: boolean;
	children: React.ReactNode;
};

const LabeledInput = ({ children, hidden = false }: ILabeledInput) => {
	return (
		<div hidden={hidden} className="flex flex-col px-4 pt-2 align-bottom">
			{children}
		</div>
	);
};

export default LabeledInput;
