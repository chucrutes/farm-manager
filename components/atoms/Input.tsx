"use client";
import { useState } from "react";

type IInput = {
  onChange: (value: any) => void;
  value: string;
  classNameProperties?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  type?: string;
};

const Input = ({
  value,
  onChange,
  classNameProperties,
  disabled = false,
  type = "text",
}: IInput) => {
  const placeholder = type == "password" ? "••••••••" : "Digite aqui";
  const className = `bg-brown rounded px-4 py-2 text-neutral-400 ${classNameProperties}`;

  return (
    <input
      className={className}
      placeholder={placeholder}
      //   size={640}
      value={value}
      type={type}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    />
  );
};

export default Input;
