import { envs } from "../../../config/envs";

const { REACT_APP_API_URL } = envs;

type IResponse = {
  status: number;
  body: any;
};

const getTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem("token");
};

export const getRegisterById = async (id: string): Promise<IResponse> => {
  const token = getTokenFromLocalStorage();

  const response: Response = await fetch(
    `${REACT_APP_API_URL}/register/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();

  return { status: response.status, body: data };
};
