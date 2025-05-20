import { envs } from "../../../config/envs";

const { API_URL } = envs;

type IResponse = {
  status: number;
  body: any;
};

const getTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem("token");
};

export const listEntryTypes = async (): Promise<IResponse> => {
  const token = getTokenFromLocalStorage();

  const response: Response = await fetch(`${API_URL}/entry-types`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  return { status: response.status, body: data };
};
