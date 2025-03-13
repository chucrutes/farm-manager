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
      className={`flex flex-col px-1 py-2 align-middle ${className}`}
    >
      {children}
    </div>
  );
};

export default LabeledInput;
