import type { ComponentProps } from "react";

type ILabel = ComponentProps<"label">;

const Label = ({ children, hidden }: ILabel) => {
  return <label hidden={hidden}>{children}</label>;
};

export default Label;
