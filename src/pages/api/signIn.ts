import { envs } from "../../config/envs";
const { REACT_APP_API_URL } = envs;

type ISignIn = {
  body: {
    user: string;
    password: string;
  };
};

type IResponse = {
  status: number;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  body: any;
};

const signIn = async ({ body }: ISignIn): Promise<IResponse> => {
  console.log("signing in");

  const response: Response = await fetch(`${REACT_APP_API_URL}/auth/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...body }),
  });
  const data = await response.json();

  return { status: response.status, body: data };
};

export { signIn };
