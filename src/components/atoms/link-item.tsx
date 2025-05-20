import { Link } from "react-router-dom";

type ILinkItem = {
	children: React.ReactNode;
	path: string;
};

const LinkItem = ({ children, path }: ILinkItem) => (
	<Link to={path}>{children}</Link>
);

export default LinkItem;
