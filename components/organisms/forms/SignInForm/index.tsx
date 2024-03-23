"use client";
import { useId } from "react";
import { signIn } from "@/api/signIn";
import { useForm } from "react-hook-form";
import Alert from "@/components/atoms/Span";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorIcon } from "@/components/Icons/ErrorIcon";
import { IUser, signInSchema } from "@/app/entities/IUser";
import LabeledInput from "@/components/molecules/LabeledInput";
import Button from "@/components/atoms/Button";

const SignInForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IUser>({
		resolver: zodResolver(signInSchema),
	});
	async function submitSignIn(body: IUser) {
		await signIn({ body });
	}

	const userTagId = useId();
	const passwordTagId = useId();
	return (
		<div>
			<h3>Entre na sua conta</h3>
			<div>
				<form
					onSubmit={handleSubmit(submitSignIn)}
					className="flex flex-col items-center"
				>
					<LabeledInput>
						<Label htmlFor={userTagId}>Usuário</Label>
						<Input label="Usuário" id={userTagId} {...register("user")} />
						{errors.user && (
							<Alert icon={<ErrorIcon />} severity="error">
								Usuário inválido
							</Alert>
						)}
					</LabeledInput>
					<LabeledInput>
						<Label htmlFor={passwordTagId}>Senha</Label>
						<Input
							label="Usuário"
							id={passwordTagId}
							{...register("password")}
						/>
						{errors.password && (
							<Alert icon={<ErrorIcon />} severity="error">
								Senha inválida
							</Alert>
						)}
					</LabeledInput>
					<div>
						<Button type="submit">Enviar</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignInForm;
