import Input from "../atoms/Input";
import Label from "../atoms/Label";

type ILabeledInput = {
  labelContent: string;
  inputValue: string;
  inputType?: string;
  onInputChange: (value: any) => void;
};

const LabeledInput = ({
  labelContent,
  inputValue,
  inputType,
  onInputChange,
}: ILabeledInput) => {
  return (
    <div className="flex flex-col py-2">
      <Label content={labelContent} />
      <Input type={inputType} value={inputValue} onChange={onInputChange} />
    </div>
  );
};

export default LabeledInput;
