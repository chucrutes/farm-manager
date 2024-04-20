import { envs } from "@/config/envs";
const { API_URL } = envs;

type ISignIn = {
  body: {
    user: string;
    password: string;
  };
};

const signIn = async ({ body }: ISignIn) => {
    const response: Response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...body }),
    });
    const data = await response.json();
    console.log(JSON.stringify(data));
};

export { signIn };
