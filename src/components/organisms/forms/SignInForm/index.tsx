import { useId, useState } from "react";
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
  const [loading, setLoading] = useState<boolean>(false);
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

  const userTagId = useId();
  const passwordTagId = useId();
  return (
    <div className="flex flex-col md:w-64 lg:w-96 min-h-full p-5 gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-left text-4xl font-semibold">Bem-vindo</h1>
        <h1 className="text-left">Insira seus dados para acessar sua conta</h1>
      </div>
      <div>
        <form
          onSubmit={handleSubmit(submitSignIn)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <LabeledInput>
              <Input label="Usuário" id={"user"} />
              {errors.user && (
                <Alert icon={<ErrorIcon />} severity="error">
                  Usuário inválido
                </Alert>
              )}
            </LabeledInput>
            <LabeledInput>
              <Input label="Senha" id={"password"} type="password" />
              {errors.password && (
                <Alert icon={<ErrorIcon />} severity="error">
                  Senha inválida
                </Alert>
              )}
            </LabeledInput>
          </div>
          <div className="flex justify-center py-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Carregando" : "Entrar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
