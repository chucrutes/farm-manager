import type { ComponentProps } from "react";
import MuiButton from "@mui/material/Button";
import { ThemeProvider } from "@mui/material";
import { buttonTheme } from "../templates/button-theme";
import React from "react";

type ButtonProps = Omit<ComponentProps<"button">, "color"> & {
  color?: string;
  palette?: "primary" | "secondary" | "success";
  icon?: React.ReactNode;
  width?: string;
};

const Button = ({
  type = "submit",
  color = "primary",
  onClick,
  disabled = false,
  palette,
  icon,
  width = "100%",
  children,
}: ButtonProps) => {
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
  };

  return (
    <ThemeProvider theme={buttonTheme}>
      <MuiButton
        type={type}
        disabled={disabled}
        variant="contained"
        size="large"
        onClick={handleSubmit}
        color={palette}
        startIcon={icon}
        sx={{
          fontFamily: "Sora, sans-serif",
          marginX: "15px",
          width: width,
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
    </ThemeProvider>
  );
};

export default Button;
