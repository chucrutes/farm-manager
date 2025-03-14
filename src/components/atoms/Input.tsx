import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { InputAdornment, type TextFieldProps } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import { ErrorIcon } from "../Icons/error-icon";

type InputProps = TextFieldProps & {
  label?: string;
  icon?: React.ReactNode;
  error?: boolean;
  errorMessage?: string;
  variant?: "standard" | "filled" | "outlined";
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      type = "text",
      icon,
      error,
      errorMessage,
      variant = "standard",
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(type === "text");

    const togglePassword = () => {
      setIsVisible((prev) => !prev);
    };

    return (
      <div className="relative">
        <TextField
          {...props}
          type={isVisible ? "text" : "password"}
          color={variant === "standard" ? "success" : "primary"}
          id={id}
          label={label}
          variant={variant}
          ref={ref}
          size="small"
          error={error}
          InputLabelProps={{
            shrink: variant === "standard" ? true : false,
          }}
          InputProps={{
            startAdornment: icon && (
              <InputAdornment
                className={`${type === "password" ? "pl-0.5" : ""}`}
                position="start"
              >
                {icon}
              </InputAdornment>
            ),
          }}
          sx={{
            width: "100%",
            ...(variant === "standard" && {
              "& input": {
                fontFamily: "Sora, sans-serif",
                fontSize: "14px",
                padding: (theme) =>
                  type === "password" ? "6px 1.5px" : "6px 0px",
              },
              "& label": {
                fontFamily: "Sora, sans-serif",
                fontSize: "14px",
                color: "black",
                transform: icon
                  ? "translate(26px, 22px) scale(1)"
                  : "translate(0, 22px) scale(1)",
                "&.Mui-focused": {
                  transform: "translate(2px, 3px) scale(0.80)",
                  color: "green",
                },
                "&.MuiFormLabel-filled": {
                  transform: "translate(2px, 3px) scale(0.80)",
                },
              },
              "& .MuiInput-underline": {
                "&::before": {
                  borderBottom: error ? "1px solid red" : "1px solid black",
                },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottom: error ? "2px solid red" : "2px solid black",
                },
                "&::after": {
                  borderBottom: error ? "2px solid red" : "2px solid green",
                },
              },
            }),
            ...(variant !== "standard" && {
              "& input": {
                paddingTop: "8px",
                fontFamily: "Sora, sans-serif",
                fontSize: "14px",
              },
              "& label": {
                position: "relative",
                transform: "translateY(-20%)",
                fontSize: "14px",
                fontFamily: "Sora, sans-serif",
                fontWeight: "medium",
                color: "black",
                "&.Mui-focused": {
                  color: "black",
                },
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: error ? "red" : "#E0E0E0",
                },
                "&:hover fieldset": {
                  borderColor: error ? "red" : "#E0E0E0",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "black",
                },
              },
              "& .MuiFilledInput-root": {
                "&::before": {
                  borderBottom: error ? "2px solid red" : "2px solid black",
                },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottom: error ? "2px solid red" : "2px solid black",
                },
                "&::after": {
                  borderBottom: error ? "2px solid red" : "2px solid black",
                },
              },
            }),
          }}
        />
        {error && errorMessage && (
          <div className="flex text-red-500 gap-1 px-2 pt-2">
            <ErrorIcon />
            <p className="text-xs">{errorMessage}</p>
          </div>
        )}
        {type === "password" && (
          <button
            type="button"
            onClick={togglePassword}
            className={`absolute right-2 top-1/2 transform  cursor-pointer ${
              error ? "-translate-y-4" : "-translate-y-1/5"
            }`}
          >
            {isVisible ? (
              <Eye className="size-4 text-gray-500" />
            ) : (
              <EyeOff className="size-4 text-gray-500" />
            )}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
