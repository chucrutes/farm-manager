import { IAddOrUpdateEntry } from "../../../components/organisms/forms/AddOrUpdateEntryForm/@types/types";
import { envs } from "../../../config/envs";
import type { IEntry } from "../../../entities/entry";
import { BodyCreation } from "../@types";

const { REACT_APP_API_URL } = envs;

type ICreateEntry = {
  body: IAddOrUpdateEntry;
};

type IResponse = {
  status: number;
  body: BodyCreation;
};

const getTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem("token");
};

export const createOrUpdateEntry = async ({
  body,
}: ICreateEntry): Promise<IResponse> => {
  const token = getTokenFromLocalStorage();
  console.log('createOrUpdateEntry')

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
