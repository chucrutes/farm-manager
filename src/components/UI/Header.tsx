import LiItem from "../atoms/LiItem";
import LinkItem from "../atoms/LinkItem";

const Header = () => {
  return (
    <header className="flex flex-col md:flex-row justify-around items-center pt-4 px-4 relative bottom-0 bg-brown-dark">
      <h1 className="text-center md:text-left">Gerenciador de fazenda</h1>
      <nav className="px-4 md:px-32 mt-4 md:mt-0">
        <ul className="flex flex-row justify-center md:justify-end">
          <LinkItem path="/">
            <LiItem content="Início" />
          </LinkItem>
          <LinkItem path="/dashboard">
            <LiItem content="Registros" />
          </LinkItem>
          <LinkItem path="/types">
            <LiItem content="Tipos" />
          </LinkItem>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
