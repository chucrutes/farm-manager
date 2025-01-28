import {
  Controller,
  useFormContext,
  type RegisterOptions,
} from "react-hook-form";

export type Option = {
  label: string;
  value: string;
};

type GenericSelectProps = {
  name: string;
  options: Option[];
  label?: string;
  rules?: RegisterOptions;
  placeholder?: string;
  value?: string;
};

const GenericSelect = ({
  name,
  options,
  label,
  rules,
  value,
  placeholder,
}: GenericSelectProps) => {
  const { control } = useFormContext();

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} className="block mb-2 text-sm font-medium">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={value || ""}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <div className="relative">
            <select
              id={name}
              {...field}
              className={`form-select w-full p-2 border rounded-md ${
                error ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {placeholder && (
                <option value="" disabled>
                  {placeholder}
                </option>
              )}
              {options.map((option) => (
                <option key={String(option.value)} value={String(option.value)}>
                  {option.label}
                </option>
              ))}
            </select>
            {error && (
              <span className="text-red-500 text-sm mt-1 block">
                {error.message}
              </span>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default GenericSelect;
