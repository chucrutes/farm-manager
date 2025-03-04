import React, { ComponentProps, forwardRef, useEffect, useState } from "react";
import { numberToBrFormat } from "../../@utils/formatters";

export type Details = {
  value: number;
  formattedValue: string;
  splittedValue: string[];
};

export type CurrencyInputProps = Omit<
  ComponentProps<"input">,
  "value" | "onChange"
> & {
  value: number;
  onChange: (value: number, details?: Details) => void;
  defaultValue?: number;
  placeholder?: string;
  addonBefore?: string;
};

const DECIMAL_SIZE = 2;

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    {
      value,
      onChange,
      placeholder,
      addonBefore = "R$",
      ...props
    }: CurrencyInputProps,
    ref
  ) => {
    const [currentValue, setCurrentValue] = useState<string>(`${value}`);
    console.log(currentValue);

    useEffect(() => {
      const valueString = `${value}`;
      if (/\D/.test(valueString.replace(".", ""))) return;

      setCurrentValue(numberToBrFormat(value));
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.value);
      const valueParsedToNum = event.target.value.replace(",", "");
      console.log(valueParsedToNum);
      const sizeSlice = valueParsedToNum.length - DECIMAL_SIZE;

      const newValue = [
        valueParsedToNum.slice(0, sizeSlice),
        ".",
        valueParsedToNum.slice(sizeSlice),
      ].join("");
      console.log(newValue);
      const numParsed = Number.parseFloat(newValue);
      console.log(numParsed);

      onChange(numParsed);
    };

    return (
      <input
        type="text"
        value={currentValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="border p-2 rounded w-full"
        {...props}
        ref={ref}
      />
    );
  }
);
