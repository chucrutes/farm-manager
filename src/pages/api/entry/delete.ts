import { envs } from "../../../config/envs";
import { IItem } from "../../../entities/IItem";

const { REACT_APP_API_URL } = envs;

type IParams = {
  entryId: string;
};

type IResponse = {
  status: number;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  body: any;
};

const getTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem("token");
};

export const deleteEntry = async ({ entryId }: IParams): Promise<IResponse> => {
  const token = getTokenFromLocalStorage();

  const response: Response = await fetch(
    `${REACT_APP_API_URL}/entries/${entryId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();

  return { status: response.status, body: data };
};
