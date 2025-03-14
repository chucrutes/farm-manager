import type { ComponentProps } from "react";

type ILabel = ComponentProps<"label"> & {
  error?: boolean;
};

const Label = ({ children, hidden, error }: ILabel) => {
  return (
    <label
      hidden={hidden}
      className={`text-sm font-medium mb-1 ${
        error ? "text-red-500 group-focus-within:text-black" : "text-black"
      }`}
    >
      {children}
    </label>
  );
};

export default Label;
