import { IAddOrUpdateEntry } from "../../../components/organisms/forms/add-update-entry-form/@types/types";
import { envs } from "../../../config/envs";
import { BodyCreation } from "../@types";

const { API_URL } = envs;

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

  const response: Response = await fetch(`${API_URL}/entries`, {
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
