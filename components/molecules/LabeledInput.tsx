import { flightRouterStateSchema } from "next/dist/server/app-render/types";
import Input from "../atoms/Input";
import Label from "../atoms/Label";

type ILabeledInput = {
  labelContent: string;
  inputValue: string;
  inputType?: string;
  onInputChange: (value: any) => void;
  hidden?: boolean;
};

const LabeledInput = ({
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
        hidden={hidden}
        type={inputType}
        value={inputValue}
        onChange={onInputChange}
      />
    </div>
  );
};

export default LabeledInput;
