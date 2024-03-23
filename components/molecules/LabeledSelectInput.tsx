"use client";

type LabeledSelectInputProps = {
	children: React.ReactNode;
};

const LabeledSelectInput = ({ children }: LabeledSelectInputProps) => {
	return <div className="flex flex-col px-4 pt-2 align-bottom">{children}</div>;
};

export default LabeledSelectInput;
