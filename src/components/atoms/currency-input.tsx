import type React from "react";
import { type ComponentProps, forwardRef, useEffect, useState } from "react";
import { numberToBrFormat } from "../../@utils/formatters";
import { ErrorIcon } from "../Icons/error-icon";

export type Details = {
	value: number;
	formattedValue: string;
	splittedValue: string[];
};

export type CurrencyInputProps = Omit<
	ComponentProps<"input">,
	"value" | "onChange" | "onBlur"
> & {
	value: number;
	onChange: (value: number, details?: Details) => void;
	onBlur?: (value: number) => void;
	defaultValue?: number;
	placeholder?: string;
	addonBefore?: string;
	error?: boolean;
	errorMessage?: string;
};

const DECIMAL_SIZE = 2;

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
	(
		{
			value,
			onChange,
			onBlur,
			placeholder,
			addonBefore = "R$",
			error,
			errorMessage,
			...props
		}: CurrencyInputProps,
		ref,
	) => {
		const [currentValue, setCurrentValue] = useState<string>(`${value}`);
		const [numParsed, setNumParsed] = useState<number>(value);

		useEffect(() => {
			const valueString = `${value}`;
			if (/\D/.test(valueString.replace(".", ""))) return;

			setCurrentValue(numberToBrFormat(value));
		}, [value]);

		const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const valueParsedToNum = event.target.value.replace(",", "");
			const sizeSlice = valueParsedToNum.length - DECIMAL_SIZE;

			const newValue = [
				valueParsedToNum.slice(0, sizeSlice),
				".",
				valueParsedToNum.slice(sizeSlice),
			].join("");
			const numParsed = Number.parseFloat(newValue);
			setNumParsed(numParsed);

			onChange(numParsed);
		};

		return (
			<div className="relative">
				<input
					type="text"
					value={currentValue}
					onChange={handleChange}
					onBlur={() => onBlur?.(numParsed)}
					placeholder={placeholder}
					className={`border p-2 rounded w-full focus:outline-black ${
						error
							? "border-red-500 focus:border-black"
							: "border-gray-300 focus:border-black"
					}`}
					style={{
						fontFamily: "Sora, sans-serif",
						fontSize: "14px",
					}}
					{...props}
					ref={ref}
				/>

				{error && errorMessage && (
					<div className="flex text-red-500 gap-1 px-2 pt-2">
						<ErrorIcon />
						<p className="text-xs">{errorMessage}</p>
					</div>
				)}
			</div>
		);
	},
);

CurrencyInput.displayName = "CurrencyInput";
