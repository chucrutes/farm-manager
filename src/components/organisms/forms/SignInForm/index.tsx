import { useId } from "react";
import { toast } from "react-toastify";
import Alert from "../../../atoms/Span";
import Input from "../../../atoms/Input";
import { useForm } from "react-hook-form";
import Button from "../../../atoms/Button";
import { useNavigate } from "react-router-dom";
import { ErrorIcon } from "../../../Icons/ErrorIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "../../../../pages/api/signIn";
import { useAuth } from "../../../../contexts/AuthContext";
import LabeledInput from "../../../molecules/LabeledInput";
import { type IUser, signInSchema } from "../../../../entities/IUser";

const SignInForm = () => {
  const navigate = useNavigate();
  const context = useAuth();
  if (!context) {
    throw new Error("no provider was given");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: zodResolver(signInSchema),
  });

  async function submitSignIn(body: IUser) {
    const res = await signIn({ body });

    if (res.status !== 200) {
      toast.error("Usuário ou senha incorretos");

      return;
    }

    context.updateToken(res.body.token);

    navigate("/dashboard");
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
