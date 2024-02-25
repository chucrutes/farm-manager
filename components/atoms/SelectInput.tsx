"use client";

import React from "react";

export type IOption = {
  label: string;
  value: string;
};
type OptionsProps = {
  options: Array<IOption>;
  selectedOption: string;
  onChange: (value: string) => void;
};

const SelectInput = ({ options, selectedOption, onChange }: OptionsProps) => {
  return (
    <select
      className="bg-brown flex px-4 py-2"
      value={selectedOption}
      style={{ height: "40px" }}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
