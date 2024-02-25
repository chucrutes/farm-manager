"use client";

import React from "react";

export type IOption = {
  label: string;
  value: string;
  type: string;
};
type OptionsProps = {
  options: Array<IOption>;
  selectedOption: IOption;
  onChange: (value: string) => void;
};

const SelectInput = ({ options, selectedOption, onChange }: OptionsProps) => {
  const otherOptions = options.filter(
    (option) => option.value !== selectedOption.value
  );
  return (
    <select
      className="bg-brown flex px-4 py-2"
      value={selectedOption.value}
      style={{ height: "40px" }}
      onChange={(e) => onChange(e.target.value)}
    >
      <option key={selectedOption.value} value={selectedOption.value}>
        {selectedOption.label}
      </option>
      {otherOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
