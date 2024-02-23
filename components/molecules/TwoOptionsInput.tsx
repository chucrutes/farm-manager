import OptionInput from "../atoms/OptionInput";

type ITwoOptionsInput = {
  optionOneContent: string;
  optionTwoContent: string;
  optionOneChecked: boolean;
  optionTwoChecked: boolean;
  onOptionOneChange: () => void;
  onOptionTwoChange: () => void;
};

const TwoOptionsInput = ({
  optionOneContent,
  optionTwoContent,
  optionOneChecked,
  optionTwoChecked,
  onOptionOneChange,
  onOptionTwoChange,
}: ITwoOptionsInput) => {
  const handleOptionOneChange = () => {
    if (!optionOneChecked) {
      onOptionOneChange();
      onOptionTwoChange();
    }
  };

  const handleOptionTwoChange = () => {
    if (!optionTwoChecked) {
      onOptionTwoChange();
      onOptionOneChange();
    }
  };

  return (
    <div>
      <OptionInput
        content={optionOneContent}
        checked={optionOneChecked}
        onChange={handleOptionOneChange}
      />
      <OptionInput
        content={optionTwoContent}
        checked={optionTwoChecked}
        onChange={handleOptionTwoChange}
      />
    </div>
  );
};

export default TwoOptionsInput;
