type ILabeledInput = {
  hidden?: boolean;
  children: React.ReactNode;
};

const LabeledInput = ({ children, hidden = false }: ILabeledInput) => {
  return (
    <div hidden={hidden} className="flex flex-col px-4 py-2 align-middle">
      {children}
    </div>
  );
};

export default LabeledInput;
