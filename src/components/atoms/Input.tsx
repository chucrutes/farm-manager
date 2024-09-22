import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import type { TextFieldProps } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";

type InputProps = TextFieldProps & {
  label?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, type = "text", ...props }, ref) => {
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
          sx={{
            "& input": {
              fontFamily: "Sora, sans-serif",
              fontSize: "13px",
              padding: "6px 14px",
            },
            "& label": {
              fontFamily: "Sora, sans-serif",
              fontSize: "14px",
            },
            width: "100%",
          }}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-2 top-1/2 transform -translate-y-1/5 cursor-pointer"
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
