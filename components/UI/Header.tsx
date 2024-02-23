import LiItem from "../atoms/LiItem";
import LinkItem from "../atoms/LinkItem";

const Header = () => {
  return (
    <header>
      <h1>Gerenciador de fazenda</h1>
      <nav>
        <ul className="flex flex-row px-8">
          <LinkItem path="/">
            <LiItem content="Início" />
          </LinkItem>
          <LinkItem path="/dashboard">
            <LiItem content="Dashboard" />
          </LinkItem>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
