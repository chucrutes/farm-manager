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
    <div className="flex flex-col px-4 pt-2 align-bottom">
      <Label content={labelContent} />
      <Input type={inputType} value={inputValue} onChange={onInputChange} />
    </div>
  );
};

export default LabeledInput;
