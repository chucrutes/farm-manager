import LiItem from "../atoms/LiItem";
import LinkItem from "../atoms/LinkItem";

const Header = () => {
	return (
		<header className="flex flex-col md:flex-row justify-around items-center pt-4 px-4 relative bottom-0 bg-brown-dark">
			<h1 className="text-center md:text-left">Gerenciador de fazenda</h1>
			<nav className="px-4 md:px-32 mt-4 md:mt-0 align-middle">
				<ul className="flex flex-row justify-center md:justify-end">
					<LinkItem path="/">
						<LiItem content="Início" />
					</LinkItem>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
