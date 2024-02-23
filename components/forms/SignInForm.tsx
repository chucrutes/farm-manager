"use client";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

const SignInForm = () => {
  function handleSubmit() {
    console.log("Signing in...");
  }

  return (
    <div>
      <form action="" className="flex flex-col items-center">
        <div className="py-2">
          <label className="px-2" htmlFor="">
            Email
          </label>
          <Input type="email" />
        </div>
        <div className="py-2">
          <label htmlFor="">Senha</label>
          <Input type="password" />
        </div>
        <div>
          <Button content="Enviar" onSubmit={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
