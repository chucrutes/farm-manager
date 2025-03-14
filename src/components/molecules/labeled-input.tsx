type ILabeledInput = {
  hidden?: boolean;
  className?: string;
  children: React.ReactNode;
};

const LabeledInput = ({
  children,
  hidden = false,
  className,
}: ILabeledInput) => {
  return (
    <div
      hidden={hidden}
      className={`group ${className} flex flex-col px-1 py-1 align-middle `}
    >
      {children}
    </div>
  );
};

export default LabeledInput;
