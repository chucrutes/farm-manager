"use client";

import { toast } from "react-toastify";

type IInput = {
  label: string;
  onChange: (value: any) => void;
  value: string;
  classNameProperties?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  type?: string;
  hidden?: boolean;
  required?: boolean;
};

const Input = ({
  label,
  required = true,
  value,
  onChange,
  classNameProperties,
  disabled = false,
  type = "text",
  hidden = false,
}: IInput) => {
  const placeholder = type == "password" ? "••••••••" : "Digite aqui";
  const className = `bg-brown rounded px-4 py-2 text-white-400 ${classNameProperties}`;

  const onInputChange = (value: any) => {
    if (required && value == "") {
      toast.error(`O campo ${label} não pode ser vazio`);
    }

    onChange(value);
  };

  return (
    <input
      className={className}
      placeholder={placeholder}
      height={40}
      hidden={hidden}
      value={value}
      type={type}
      onChange={(e) => onInputChange(e.target.value)}
      disabled={disabled}
    />
  );
};

export default Input;
