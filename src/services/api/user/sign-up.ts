import { envs } from "../../../config/envs";
import type { SignUp } from "../../../entities/user";
const { API_URL } = envs;

type SignUpBody = {
	body: SignUp;
};

type IResponse = {
	status: number;
	body: any;
};

const signUp = async ({ body }: SignUpBody): Promise<IResponse> => {
	const response: Response = await fetch(`${API_URL}/auth/sign-up`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ ...body }),
	});

	const data = await response.json();

	return { status: response.status, body: data };
};

export { signUp };
