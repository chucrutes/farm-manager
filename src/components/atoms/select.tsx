import { ComponentProps } from "react";
import { ErrorIcon } from "../Icons/error-icon";

export type Option = {
  label: string;
  value: string;
};

export type SelectProps = ComponentProps<"select"> & {
  options: Option[];
  label: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
};

const Select = ({
  name,
  label,
  placeholder = "Selecione uma opção",
  options,
  onChange,
  value,
  error,
  errorMessage,
}: SelectProps) => {
  const optionsLength = options.length;
  const disabled = optionsLength === 0;

  return (
    <div className="form-group group">
      <label
        htmlFor={name}
        className={`block text-sm font-medium mb-1 ${
          error ? "text-red-500 group-focus-within:text-black" : "text-black"
        }`}
        style={{
          fontFamily: "Sora, sans-serif",
          fontSize: "14px",
        }}
      >
        {label}
      </label>

      <div className="relative">
        <select
          disabled={disabled}
          id={name}
          onChange={onChange}
          value={value}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
            error
              ? "border-red-500 focus:border-black"
              : "border-gray-300 focus:border-black"
          }`}
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: "14px",
            backgroundColor: "white",
            color: value === "" ? "#6B7280" : "black",
          }}
        >
          <option
            value=""
            disabled
            selected={!value}
            style={{ color: "#6B7280" }}
          >
            {optionsLength === 0 ? "Nenhum item" : placeholder}
          </option>

          {options.map((option) => (
            <option
              key={String(option.value)}
              value={String(option.value)}
              style={{
                color: "black",
              }}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {error && errorMessage && (
        <div className="flex text-red-500 gap-1 px-2 pt-2">
          <ErrorIcon />
          <p className="text-xs">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Select;
