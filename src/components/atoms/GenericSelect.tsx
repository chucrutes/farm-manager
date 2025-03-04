import { ComponentProps } from "react";

export type Option = {
  label: string;
  value: string;
};

export type SelectProps = ComponentProps<"select"> & {
  options: Option[];
  label: string;
  placeholder?: string;
};

const GenericSelect = ({
  name,
  label,
  placeholder,
  options,
  onChange,
  value,
}: SelectProps) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="block mb-2 text-sm font-medium">
        {label}
      </label>

      <div className="relative">
        <select
          id={name}
          onChange={onChange}
          value={value}
          className={`form-select w-full p-2 border rounded-md
           border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {
            <option value="" disabled>
              {placeholder}
            </option>
          }
          {options.map((option) => (
            <option key={String(option.value)} value={String(option.value)}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default GenericSelect;
