import { Controller, useFormContext, RegisterOptions } from 'react-hook-form';

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
};

const GenericSelect = ({
  name,
  options,
  label,
  rules,
  placeholder,
}: GenericSelectProps) => {
  const { control } = useFormContext();

  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <select
              id={name}
              {...field}
              className={`form-select ${error ? 'is-invalid' : ''}`}
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
            {error && <span className="error-text">{error.message}</span>}
          </>
        )}
      />
    </div>
  );
};

export default GenericSelect;
