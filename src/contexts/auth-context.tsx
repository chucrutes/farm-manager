import React, { createContext, useContext, useState } from "react";

type AuthProviderProps = {
	children: React.ReactNode;
};

type AuthContextType = {
	token: string | null;
	updateToken: (token: string) => void;
};

export const AuthContext = createContext<AuthContextType>({
	token: null,
	updateToken: () => {
		throw new Error("No provider was given");
	},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [token, setToken] = useState(localStorage.getItem("token"));

	const updateToken = (newToken: string) => {
		setToken(newToken);
		localStorage.setItem("token", newToken);
	};

	return (
		<AuthContext.Provider value={{ token, updateToken }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error("useAuth must be within an AuthProvider");
	}

	return context;
};
