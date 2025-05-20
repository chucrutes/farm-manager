import { toast } from "react-toastify";
import { envs } from "../../../config/envs";
const { API_URL } = envs;

type ISignIn = {
  body: {
    user: string;
    password: string;
  };
};

type IResponse = {
  status: number;
  body: any;
};

const signIn = async ({ body }: ISignIn): Promise<IResponse> => {
  const response: Response = await fetch(`${API_URL}/auth/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...body }),
  });
  const data = await response.json();

  if (response.ok) {
    toast.success("Login realizado com sucesso");
  }

  if (!response.ok) {
    toast.error("Usuário ou senha incorretos");
  }

  return { status: response.status, body: data };
};

export { signIn };
