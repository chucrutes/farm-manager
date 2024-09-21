import React from "react";
import TextField from "@mui/material/TextField";
import type { TextFieldProps } from "@mui/material";

type InputProps = TextFieldProps;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, size, label, value, placeholder, type = "text", ...props }, ref) => {
    let placeholderText = type === "password" ? "••••••••" : "Digite aqui";
    placeholderText = placeholder ? placeholder : placeholderText;
    return (
      <TextField
        {...props}
        type={type}
        color="primary"
        value={value}
        placeholder={placeholderText}
        id={id}
        label={label}
        variant="outlined"
        className=" text-white"
        ref={ref}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
