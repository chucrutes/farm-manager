import { envs } from "../../../config/envs";
import { IEntryTpe } from "../../../entities/entry-type";

const { REACT_APP_API_URL } = envs;

type ICreateEntryType = {
	body: Omit<IEntryTpe, "createdAt" | "updatedAt">;
};

type IResponse = {
	status: number;
	body: unknown;
};

const getTokenFromLocalStorage = (): string | null => {
	return localStorage.getItem("token");
};

export const createEntryType = async ({
	body,
}: ICreateEntryType): Promise<IResponse> => {
	const token = getTokenFromLocalStorage();

	const response: Response = await fetch(`${REACT_APP_API_URL}/entry-types`, {
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
