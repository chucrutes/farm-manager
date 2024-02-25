"use client";

import React from "react";
import SelectInput from "../atoms/SelectInput";
import Label from "../atoms/Label";

export type IOption = {
  label: string;
  value: string;
  type: string;
};
type OptionsProps = {
  mainLabel: string;
  options: Array<IOption>;
  selectedOption: IOption;
  onChange: (value: string) => void;
};

const LabeledSelectInput = ({
  mainLabel,
  options,
  selectedOption,
  onChange,
}: OptionsProps) => {
  return (
    <div className="flex flex-col px-4 pt-2 align-bottom">
      <Label content={mainLabel} />
      <SelectInput
        options={options}
        onChange={onChange}
        selectedOption={selectedOption}
      />
    </div>
  );
};

export default LabeledSelectInput;
