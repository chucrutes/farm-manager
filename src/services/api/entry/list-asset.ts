import { envs } from "../../../config/envs";

const { API_URL } = envs;

type IResponse = {
	status: number;
	body: any;
};

const getTokenFromLocalStorage = (): string | null => {
	return localStorage.getItem("token");
};

export const listAsset = async (): Promise<IResponse> => {
	const token = getTokenFromLocalStorage();

	const response: Response = await fetch(
		`${API_URL}/entries/assets?type=true&farm=true&removeDeletedAt=true`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		},
	);
	const data = await response.json();

	return { status: response.status, body: data };
};
