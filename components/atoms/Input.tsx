"use client";
import { useState } from "react";

type IInput = {
  classNameProperties?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  type?: string;
};

const Input = ({
  classNameProperties,
  children,
  disabled = false,
  type = "text",
}: IInput) => {
  const placeholder = type == "password" ? "••••••••" : "Digite aqui";
  const [value, setValue] = useState("");
  const [inputStyle, setInputStyle] = useState({ height: "auto" });
  const className = `bg-brown rounded px-4 py-2 text-neutral-400 ${classNameProperties}`;

  const handleChange = (e: any) => {
    setValue(e.target.value);
    setInputStyle({ height: `${e.target.scrollHeight}px` });
  };

  return (
    <input
      className={className}
      placeholder={placeholder}
      //   size={640}
      style={inputStyle}
      value={value}
      type={type}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};

export default Input;
