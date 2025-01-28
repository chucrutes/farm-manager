import { useState } from "react";
import TextField from "@mui/material/TextField";
import type { TextFieldProps } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import { useFormContext, type ValidationRule } from "react-hook-form";

type InputProps = TextFieldProps & {
  label?: string;
  id: string;
  pattern?: ValidationRule<RegExp>;
};

function Input({
  id,
  label,
  type = "text",
  defaultValue,
  ref,
  ...props
}: InputProps) {
  const { register, watch } = useFormContext();
  const [isVisible, setIsVisible] = useState(type !== "password");
  const togglePassword = () => {
    setIsVisible((prev) => !prev);
  };

  const value = watch(id);
  return (
    <div>
      <TextField
        defaultValue={defaultValue}
        {...props}
        {...register(id)}
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

Input.displayName = "Input";
export default Input;
