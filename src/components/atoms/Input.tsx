import React from "react";
import TextField from "@mui/material/TextField";
import { TextFieldProps } from "@mui/material";

type InputProps = TextFieldProps;

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
