import MuiAlert from "@mui/material/Alert";
import { ReactNode } from "react";

type AlertProps = {
	children: ReactNode;
	icon: ReactNode;
	severity: "success" | "info" | "warning" | "error";
};

const Alert = ({ children, ...props }: AlertProps) => {
	return (
		<MuiAlert variant="outlined" {...props}>
			{children}
		</MuiAlert>
	);
};

export default Alert;
