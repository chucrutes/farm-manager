import { ComponentProps, forwardRef } from "react";

export type Details = {
  value: number;
  formattedValue: string;
  splittedValue: string[];
};

export type CurrencyInputProps = Omit<
  ComponentProps<"input">,
  "value" | "onChange"
> & {
  value?: number;
  onChange?: (value: number, details?: Details) => void;
  defaultValue?: number;
  placeholder?: string;
  locale?: "pt-BR" | "en-US";
  currency?: "BRL" | "USD";
};

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    {
      value,
      onChange,
      placeholder,
      locale = "pt-BR",
      currency = "BRL",
      ...props
    }: CurrencyInputProps,
    ref
  ) => {
    // Format the number value to a currency string for display
    const formatToDisplay = (numValue: number | undefined): string => {
      if (numValue === undefined) return "";
      return numValue.toLocaleString(locale, {
        style: "currency",
        currency,
      });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      // Remove all non-numeric characters
      const numericValue = rawValue.replace(/[^0-9]/g, "");
      // Convert to number and divide by 100 to get the decimal value
      const parsedValue = Number(numericValue) / 100;

      const formattedValue = parsedValue.toLocaleString(locale, {
        style: "currency",
        currency,
      });

      onChange?.(parsedValue, {
        value: parsedValue,
        formattedValue,
        splittedValue: parsedValue.toString().split(""),
      });
    };

    return (
      <input
        type="text"
        value={formatToDisplay(value)}
        onChange={handleChange}
        placeholder={placeholder}
        className="border p-2 rounded w-full"
        {...props}
        ref={ref}
      />
    );
  }
);
