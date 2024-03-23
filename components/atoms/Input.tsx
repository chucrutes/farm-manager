"use client";

import React from "react";
import { ComponentProps } from "react";
import TextField from "@mui/material/TextField";

type InputProps = Omit<ComponentProps<"input">, "id" | "color"> & {
	id?: string;
	label: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ id, size, label, value, type = "text", ...props }, ref) => {
		const placeholder = type === "password" ? "••••••••" : "Digite aqui";

		return (
			<TextField
				{...props}
				type={type}
				color="primary"
				value={value}
				placeholder={placeholder}
				id={id}
				label={label}
				variant="outlined"
				className=" text-white"
				ref={ref}
			/>
		);
	},
);

Input.displayName = "Input";

export default Input;
