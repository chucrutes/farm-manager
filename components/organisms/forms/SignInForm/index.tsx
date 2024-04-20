"use client";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "@/app/api/signIn";
import Alert from "@/components/atoms/Span";
import { useRouter } from "next/navigation";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorIcon } from "@/components/Icons/ErrorIcon";
import { IUser, signInSchema } from "@/app/entities/IUser";
import LabeledInput from "@/components/molecules/LabeledInput";

const SignInForm = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IUser>({
		resolver: zodResolver(signInSchema),
	});

	async function submitSignIn(body: IUser) {
		await signIn({ body });

		router.push("/dashboard");
	}

	const userTagId = useId();
	const passwordTagId = useId();
	return (
		<div className="flex flex-col justify-center md:w-64 lg:w-96">
			<h1 className="text-center">Entre na sua conta</h1>
			<div>
				<form
					onSubmit={handleSubmit(submitSignIn)}
					className="flex flex-col items-center"
				>
					<LabeledInput>
						<Input label="Usuário" id={userTagId} {...register("user")} />
						{errors.user && (
							<Alert icon={<ErrorIcon />} severity="error">
								Usuário inválido
							</Alert>
						)}
					</LabeledInput>
					<LabeledInput>
						<Input
							label="Senha"
							id={passwordTagId}
							{...register("password")}
							type="password"
						/>
						{errors.password && (
							<Alert icon={<ErrorIcon />} severity="error">
								Senha inválida
							</Alert>
						)}
					</LabeledInput>
					<div className="flex justify-center py-4">
						<Button type="submit">Entrar</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignInForm;
