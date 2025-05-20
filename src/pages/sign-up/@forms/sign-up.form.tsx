import { useState } from "react";
import { useSignUp } from "./@hooks/use-sign-up";
import Input from "../../../components/atoms/Input";
import Button from "../../../components/atoms/button";
import { Lock } from "../../../components/Icons/lock-icon";
import LabeledInput from "../../../components/molecules/labeled-input";
import Alert from "../../../components/atoms/span";
import { ErrorIcon } from "../../../components/Icons/error-icon";
import { stringifier } from "../../../@utils/stringifier";

const SignUpForm = () => {
	const { handleSubmit, register, onSubmit, errors } = useSignUp();
	stringifier(errors);
	const [loading] = useState<boolean>(false);

	return (
		<div className="flex flex-col lg:w-96 min-h-full gap-4">
			<div className="flex flex-col gap-4">
				<h1 className="text-left">Insira seus dados para se cadastrar</h1>
			</div>
			<div>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<LabeledInput>
							<Input label="Email" id={"email"} {...register("email")} />
							{errors.email && (
								<Alert icon={<ErrorIcon />} severity="error">
									Email inválido
								</Alert>
							)}
						</LabeledInput>
						<LabeledInput>
							<Input label="Nome" id={"name"} {...register("name")} />
							{errors.name && (
								<Alert icon={<ErrorIcon />} severity="error">
									Nome inválido
								</Alert>
							)}
						</LabeledInput>
						<LabeledInput>
							<Input
								label="Usuário"
								id={"username"}
								{...register("username")}
							/>
							{errors.phone && (
								<Alert icon={<ErrorIcon />} severity="error">
									Usuário inválido
								</Alert>
							)}
						</LabeledInput>
						<LabeledInput>
							<Input label="Telefone" id={"phone"} {...register("phone")} />
							{errors.phone && (
								<Alert icon={<ErrorIcon />} severity="error">
									Telefone inválido
								</Alert>
							)}
						</LabeledInput>
						<LabeledInput>
							<Input
								label="Senha"
								id={"password"}
								type={"password"}
								icon={<Lock />}
								{...register("password")}
							/>
							{errors.password && (
								<Alert icon={<ErrorIcon />} severity="error">
									A senha deve ter pelo menos 3 caracteres
								</Alert>
							)}
						</LabeledInput>
						<LabeledInput>
							<Input
								label="Confirmação de senha"
								id={"confirm-password"}
								type={"password"}
								icon={<Lock />}
								{...register("confirmPassword")}
							/>
							{errors.confirmPassword && (
								<Alert icon={<ErrorIcon />} severity="error">
									{errors.confirmPassword.message}
								</Alert>
							)}
						</LabeledInput>
					</div>
					<div className="flex flex-col items-center">
						<Button type="submit" disabled={loading}>
							{loading ? "Carregando" : "Criar"}
						</Button>
						<a href="/">Acessar sua conta</a>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUpForm;
