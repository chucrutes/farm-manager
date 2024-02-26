"use client";

type IInput = {
  onChange: (value: any) => void;
  value: string;
  classNameProperties?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  type?: string;
  hidden?: boolean;
};

const Input = ({
  value,
  onChange,
  classNameProperties,
  disabled = false,
  type = "text",
  hidden = false,
}: IInput) => {
  const placeholder = type == "password" ? "••••••••" : "Digite aqui";
  const className = `bg-brown rounded px-4 py-2 text-white-400 ${classNameProperties}`;

  return (
    <input
      className={className}
      placeholder={placeholder}
      height={40}
      hidden={hidden}
      //   size={640}
      value={value}
      type={type}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    />
  );
};

export default Input;
