import { envs } from "../../../config/envs";
import type { IItem } from "../../../entities/IItem";

const { REACT_APP_API_URL } = envs;

type ICreateEntry = {
	body: Omit<IItem, "createdAt" | "updatedAt">;
};

type IResponse = {
	status: number;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	body: any;
};

const getTokenFromLocalStorage = (): string | null => {
	return localStorage.getItem("token");
};

export const createEntry = async ({
	body,
}: ICreateEntry): Promise<IResponse> => {
	const token = getTokenFromLocalStorage();

	const response: Response = await fetch(`${REACT_APP_API_URL}/entries`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ ...body }),
	});
	const data = await response.json();

	return { status: response.status, body: data };
};
