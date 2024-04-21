import { envs } from "../../../config/envs";

const { API_URL } = envs;

type IResponse = {
  status: number;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  body: any;
};

const getTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem("token");
};

export const listEntry = async (): Promise<IResponse> => {
  const token = getTokenFromLocalStorage();
  console.log("token");
  console.log(token);

  const response: Response = await fetch(`${API_URL}/entries`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  return { status: response.status, body: data };
};
