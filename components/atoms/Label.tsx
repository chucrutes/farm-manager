type ILabel = {
  content: string;
};

const Label = ({ content }: ILabel) => {
  return <label>{content}</label>;
};

export default Label;
