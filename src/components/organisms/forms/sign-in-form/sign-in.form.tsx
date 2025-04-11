import type React from "react";
import { useState } from "react";
import type { ZodError } from "zod";
import { toast } from "react-toastify";
import Input from "../../../atoms/Input";
import Button from "../../../atoms/button";
import { useNavigate } from "react-router-dom";
import { Lock } from "../../../Icons/lock-icon";
import { Person } from "../../../Icons/person-icon";
import LabeledInput from "../../../molecules/labeled-input";
import { useAuth } from "../../../../contexts/auth-context";
import { signIn } from "../../../../services/api/user/sign-in";
import { useValidateData } from "../@hooks/use-validate-form";
import { type SignIn, SignInSchema } from "../../../../entities/user";

const SignInForm = () => {
	const navigate = useNavigate();
	const context = useAuth();
	const [loading, setLoading] = useState<boolean>(false);
	if (!context) {
		throw new Error("no provider was given");
	}
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<ZodError<SignIn> | null>();

	const { validateData } = useValidateData();

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const userToSignIn = {
			user,
			password,
		};

		const isValid = validateData(SignInSchema, userToSignIn);

		if (!isValid.success) {
			setError(isValid.data);
			return;
		}

		await submitSignIn(isValid.data);
	}

	async function submitSignIn(body: SignIn) {
		setLoading(true);
		const res = await signIn({ body });

		if (res.status !== 200) {
			toast.error("Usuário ou senha incorretos");
			setLoading(false);

			return;
		}

		context.updateToken(res.body.token);
		setLoading(false);

		navigate("/dashboard");
	}

	return (
		<div className="flex flex-col lg:w-96 min-h-full gap-4">
			<div className="flex flex-col gap-4">
				<h1 className="text-left text-4xl font-semibold">Bem-vindo</h1>
				<h1 className="text-left">Insira seus dados para acessar sua conta</h1>
			</div>
			<div>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<LabeledInput>
							<Input
								label="Usuário"
								id={"user"}
								value={user}
								icon={<Person />}
								error={!!error}
								errorMessage="Usuário inválido"
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setUser(e.target.value)
								}
							/>
						</LabeledInput>
						<LabeledInput>
							<Input
								label="Senha"
								id="password"
								type="password"
								value={password}
								icon={<Lock />}
								error={!!error}
								errorMessage="Senha inválida"
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setPassword(e.target.value)
								}
							/>
						</LabeledInput>
					</div>
					<div className="flex flex-col items-center">
						<Button type="submit" disabled={loading}>
							{loading ? "Carregando" : "Entrar"}
						</Button>
						<a href="/sign-up">Não possui uma conta ainda?</a>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignInForm;
