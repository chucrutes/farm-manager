import Input from "../atoms/Input";
import Label from "../atoms/Label";

type ILabeledInput = {
  requiredInput?: boolean;
  labelContent: string;
  inputValue: string;
  inputType?: string;
  onInputChange: (value: any) => void;
  hidden?: boolean;
};

const LabeledInput = ({
  requiredInput = true,
  labelContent,
  inputValue,
  inputType,
  hidden = false,
  onInputChange,
}: ILabeledInput) => {
  return (
    <div hidden={hidden} className="flex flex-col px-4 pt-2 align-bottom">
      <Label hidden={hidden} content={labelContent} />
      <Input
        required={requiredInput}
        label={labelContent}
        hidden={hidden}
        type={inputType}
        value={inputValue}
        onChange={onInputChange}
      />
    </div>
  );
};

export default LabeledInput;
