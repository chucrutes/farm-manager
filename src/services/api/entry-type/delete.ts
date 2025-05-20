import { envs } from "../../../config/envs";
import type { ResponseCreation } from "../@types";

const { API_URL } = envs;

type IDeleteType = {
  ids: string[] | string;
};

const getTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem("token");
};

export const deleteEntryType = async (
  body: IDeleteType
): Promise<ResponseCreation> => {
  const token = getTokenFromLocalStorage();

  const response: Response = await fetch(`${API_URL}/entry-types`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();

  return { status: response.status, body: data };
};
