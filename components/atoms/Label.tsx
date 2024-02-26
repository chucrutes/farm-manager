type ILabel = {
  content: string;
  hidden?: boolean;
};

const Label = ({ content, hidden }: ILabel) => {
  return <label hidden={hidden}>{content}</label>;
};

export default Label;
