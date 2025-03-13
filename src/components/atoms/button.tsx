import type { ComponentProps } from "react";
import MuiButton from "@mui/material/Button";

type ButtonProps = Omit<ComponentProps<"button">, "color"> & {
  color?: "success" | "inherit" | "primary" | "error";
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
      color={color}
      onClick={handleSubmit}
      sx={{
        fontFamily: "Sora, sans-serif",
        marginX: "15px",
        width: "100%",
        textTransform: "none",
      }}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
