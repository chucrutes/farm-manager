import TextField from "@mui/material/TextField";
import type { TextFieldProps } from "@mui/material";
import { useFormContext } from "react-hook-form";

type CurrencyInputProps = TextFieldProps & {
  label?: string;
  id: string;
};

function CurrencyInput({
  id,
  label,
  defaultValue,
  ...props
}: CurrencyInputProps) {
  const { register, watch } = useFormContext();
  const value = watch(id);
  return (
    <div>
      <TextField
        defaultValue={defaultValue}
        {...props}
        {...register(id)}
        InputLabelProps={{ shrink: !!value }}
        label={label}
        type="text"
        color="success"
        variant="standard"
        size="small"
        sx={{
          "& CurrencyInput": {
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
    </div>
  );
}

CurrencyInput.displayName = "CurrencyInput";
export default CurrencyInput;
