type ILiItem = {
  content: string;
};

const LiItem = ({ content }: ILiItem) => {
  return <li className="px-4">{content}</li>;
};

export default LiItem;
