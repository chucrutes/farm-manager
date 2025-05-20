import { cn } from "../../utils/cn";

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
      className={cn("group flex flex-col px-1 py-1 align-middle", className)}
    >
      {children}
    </div>
  );
};

export default LabeledInput;
