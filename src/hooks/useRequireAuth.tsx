import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const useRequireAuth = () => {
	const navigate = useNavigate();
	const { token } = useAuth();

	useEffect(() => {
		if (!token) {
			navigate("/");
		}
	}, [token, navigate]);

	return token;
};

export default useRequireAuth;
