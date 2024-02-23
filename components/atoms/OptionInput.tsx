type IChooseBetweenButton = {
  onChange: () => void;
  content: string;
  checked: boolean;
};

const OptionInput = ({ checked, content, onChange }: IChooseBetweenButton) => {
  return (
    <label>
      <input
        type="radio"
        value={content}
        checked={checked}
        onChange={onChange}
      />
      {content}
    </label>
  );
};

export default OptionInput;
