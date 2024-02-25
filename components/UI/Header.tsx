import LiItem from "../atoms/LiItem";
import LinkItem from "../atoms/LinkItem";

const Header = () => {
  return (
    <header className="flex justify-around items-center pt-4 px-4">
      <h1>Gerenciador de fazenda</h1>
      <nav className="px-32">
        <ul className="flex flex-row px-8">
          <LinkItem path="/">
            <LiItem content="Início" />
          </LinkItem>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
