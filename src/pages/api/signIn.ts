import { envs } from "../../config/envs";

const { API_URL } = envs;

type ISignIn = {
  body: {
    user: string;
    password: string;
  };
};

type IResponse = {
  status: number
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
body: any
}

const signIn = async ({ body }: ISignIn): Promise<IResponse> => {
    const response: Response = await fetch(`${API_URL}/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...body }),
    });
    const data = await response.json();

    return {status: response.status, body: data}
};

export { signIn };
