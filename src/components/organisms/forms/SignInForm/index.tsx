import React, { useState } from "react";
import { toast } from "react-toastify";
import Input from "../../../atoms/Input";
import Button from "../../../atoms/Button";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../../../pages/api/signIn";
import { useAuth } from "../../../../contexts/AuthContext";
import LabeledInput from "../../../molecules/LabeledInput";
import { type IUser, signInSchema } from "../../../../entities/IUser";
import { validateData, verifyError } from "../../../../core/validator";
import { ZodError } from "zod";
import { Alert } from "@mui/material";
import { ErrorIcon } from "../../../Icons/ErrorIcon";

const SignInForm = () => {
  const navigate = useNavigate();
  const context = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  if (!context) {
    throw new Error("no provider was given");
  }
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<ZodError<IUser> | null>();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const userToSignIn = {
      user,
      password,
    };

    const isValid = validateData(signInSchema, userToSignIn);

    if (!isValid.success) {
      setError(isValid.data);
      return;
    }

    await submitSignIn(isValid.data);
  }

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

  return (
    <div className="flex flex-col md:w-64 lg:w-96 min-h-full p-5 gap-4">
      <div className="flex flex-col gap-2">
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
                onChange={(e) => setUser(e.target.value)}
              />
              {error && verifyError(error, "user") && (
                <Alert icon={<ErrorIcon />} severity="error">
                  Usuário inválido
                </Alert>
              )}
            </LabeledInput>
            <LabeledInput>
              <Input
                label="Senha"
                id={"password"}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && verifyError(error, "password") && (
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
