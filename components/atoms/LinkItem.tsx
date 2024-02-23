import Link from "next/link";

type ILinkItem = {
  children: React.ReactNode;
  path: string;
};

const LinkItem = ({ children, path }: ILinkItem) => (
  <Link href={path}>{children}</Link>
);

export default LinkItem;
