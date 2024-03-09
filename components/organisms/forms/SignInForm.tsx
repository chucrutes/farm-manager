"use client";
import { signIn } from "@/api/signIn";
import Button from "../../atoms/Button";
import { useState } from "react";
import LabeledInput from "../../molecules/LabeledInput";

const SignInForm = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    await signIn({ body: { emailOrUsername, password } });
  }

  return (
    <div>
      <div>Entre na sua conta</div>
      <div>
        <form action="" className="flex flex-col items-center">
          <LabeledInput
            inputValue={emailOrUsername}
            onInputChange={setEmailOrUsername}
            labelContent="Email/Usuário"
          />
          <LabeledInput
            inputValue={password}
            onInputChange={setPassword}
            inputType="password"
            labelContent="Senha"
          />
          <div>
            <Button content="Enviar" onSubmit={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
