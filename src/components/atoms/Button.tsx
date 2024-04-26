import { ComponentProps } from "react";
import MuiButton from "@mui/material/Button";

type ButtonProps = Omit<ComponentProps<"button">, "color"> & {
	color?: "success" | "inherit" | "primary" | "error";
};

const Button = ({
	color = "success",
	type = "submit",
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
			className="inline-flex bg-green items-center px-4 py-2 text-white"
			variant="contained"
			size="large"
			color={color}
			onClick={handleSubmit}
		>
			{children}
		</MuiButton>
	);
};

export default Button;
