import { ComponentProps } from "react";

export type CheckBoxProps = Omit<ComponentProps<"input">, "value"> & {
  label: string;
  value: boolean;
};

const CheckBox = ({ label, value, ...props }: CheckBoxProps) => {
  return (
    <label>
      <input className="mr-2" type="checkbox" checked={!!value} {...props} />
      {label}
    </label>
  );
};

export default CheckBox;
