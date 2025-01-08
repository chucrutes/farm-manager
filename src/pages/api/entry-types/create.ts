import { envs } from "../../../config/envs";
import { IEntryType } from "../../../entities/entry-type";
import { ResponseCreation } from "../@types";

const { REACT_APP_API_URL } = envs;

type ICreateEntryType = {
  body: Omit<IEntryType, "createdAt" | "updatedAt">;
};

const getTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem("token");
};

export const createEntryType = async ({
  body,
}: ICreateEntryType): Promise<ResponseCreation> => {
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
