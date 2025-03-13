import { useId } from "react";
import { toast } from "react-toastify";
import Input from "../../../atoms/Input";
import { useForm } from "react-hook-form";
import Button from "../../../atoms/Button";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "../../../../pages/api/signIn";
import { useAuth } from "../../../../contexts/AuthContext";
import LabeledInput from "../../../molecules/LabeledInput";
import { type IUser, signInSchema } from "../../../../entities/IUser";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

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
    <div className="flex flex-col lg:w-96 min-h-full gap-4">
      <div className="flex flex-col gap-4">
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
              <Input
                label="Usuário"
                id={userTagId}
                {...register("user")}
                icon={
                  <PersonIcon fontSize="small" className=" text-[#404040]" />
                }
                error={!!errors.user}
                errorMessage={errors.user?.message}
              />
            </LabeledInput>
            <LabeledInput>
              <Input
                label="Senha"
                id={passwordTagId}
                {...register("password")}
                type="password"
                icon={
                  <LockIcon fontSize="inherit" className=" text-[#404040]" />
                }
                error={!!errors.password}
                errorMessage={errors.password?.message}
              />
            </LabeledInput>
          </div>
          <div className="flex justify-center py-4 px-20">
            <Button type="submit" color="#1C804E">
              Entrar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
