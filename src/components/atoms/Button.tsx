import type { ComponentProps } from "react";
import MuiButton from "@mui/material/Button";

type ButtonProps = Omit<ComponentProps<"button">, "color"> & {
  color?: string;
};

const Button = ({
  type = "submit",
  color = "success",
  onClick,
  disabled = false,
  children,
}: ButtonProps) => {
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
  };

  return (
    <MuiButton
      type={type}
      disabled={disabled}
      variant="contained"
      size="large"
      onClick={handleSubmit}
      sx={{
        fontFamily: "Sora, sans-serif",
        marginX: "15px",
        width: "100%",
        textTransform: "none",
        fontSize: "14px",
        borderRadius: "8px",
        backgroundColor: color,
        "&:hover": {
          backgroundColor: color,
        },
      }}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
