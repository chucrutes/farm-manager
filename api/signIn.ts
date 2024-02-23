import env from "@/config/env";

const { BASE_URL } = env;
type ISignIn = {
  body: {
    emailOrUsername: string;
    password: string;
  };
};

const signIn = async ({ body }: ISignIn) => {
  const response: Response = await fetch(`${BASE_URL}/login`, {
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
