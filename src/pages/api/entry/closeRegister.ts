import { envs } from "../../../config/envs";

const { REACT_APP_API_URL } = envs;

type IResponse = {
  status: number;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  body: any;
};

const getTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem("token");
};

export const closeRegister = async (): Promise<IResponse> => {
  const token = getTokenFromLocalStorage();

  const response: Response = await fetch(`${REACT_APP_API_URL}/entries/close`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  return { status: response.status, body: data };
};
