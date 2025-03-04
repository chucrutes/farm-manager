import { useState } from "react";
import TextField from "@mui/material/TextField";
import type { TextFieldProps } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";

type InputProps = TextFieldProps & {
  label?: string;
  id: string;
};

function Input({
  id,
  label,
  type = "text",
  defaultValue,
  ref,
  value,
  ...props
}: InputProps) {
  const [isVisible, setIsVisible] = useState(type !== "password");
  const togglePassword = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      <TextField
        value={value}
        {...props}
        InputLabelProps={{ shrink: !!value }}
        label={label}
        type={isVisible ? "text" : "password"}
        ref={ref}
        color="success"
        variant="standard"
        size="small"
        sx={{
          "& input": {
            fontFamily: "Sora, sans-serif",
            fontSize: "13px",
            padding: "6px 14px",
            paddingRight: "40px",
          },
          "& label": {
            fontFamily: "Sora, sans-serif",
            fontSize: "14px",
          },
          width: "100%",
          position: "relative",
        }}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
          }}
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

Input.displayName = "Input";
export default Input;
