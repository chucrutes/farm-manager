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
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, type = "text", icon, error, errorMessage, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(type === "text");

    const togglePassword = () => {
      setIsVisible((prev) => !prev);
    };

    return (
      <div className="relative">
        <TextField
          {...props}
          type={isVisible ? "text" : "password"}
          color="success"
          id={id}
          label={label}
          variant="standard"
          ref={ref}
          size="small"
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
            "& input": {
              fontFamily:
                type === "password" && !isVisible
                  ? "Arial, sans-serif"
                  : "Sora, sans-serif",
              fontSize: "13px",
              padding: (theme) =>
                type === "password" ? "6px 1.5px" : "6px 0px",
              paddingLeft: "8px",
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
              },
              "&.MuiFormLabel-filled": {
                transform: "translate(2px, 3px) scale(0.80)",
              },
            },
            "& .MuiInput-underline": {
              "&::before": {
                borderBottom: "1px solid black",
              },
              "&:hover:not(.Mui-disabled):before": {
                borderBottom: "2px solid black",
              },
            },
            width: "100%",
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
