import { Home, Wallet, FileText, LogOut, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ReactNode, useState } from "react";

type NavItem = {
  path: string;
  content: string;
  icon: ReactNode;
};

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      path: "/dashboard",
      content: "Início",
      icon: <Home className="w-4 h-4 md:w-5 md:h-5" />,
    },
    {
      path: "/registers",
      content: "Caixas",
      icon: <Wallet className="w-4 h-4 md:w-5 md:h-5" />,
    },
    {
      path: "/types",
      content: "Tipos",
      icon: <FileText className="w-4 h-4 md:w-5 md:h-5" />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-white text-base md:text-xl font-semibold">
              Gerenciador de fazenda
            </h1>
          </div>

          <button
            className="md:hidden text-white p-2 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          <nav className="hidden md:flex md:flex-1 md:ml-10">
            <ul className="flex space-x-4">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.path}
                    className="flex items-center gap-2 text-sm text-white hover:text-green-200 transition-colors duration-200 p-2"
                  >
                    {item.icon}
                    <span>{item.content}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            className="hidden md:flex items-center gap-2 text-white text-sm md:text-base hover:text-green-200 transition-colors duration-200 ml-6 p-2"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 md:w-6 md:h-6" />
            <span>Sair</span>
          </button>
        </div>

        {isMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleMenu}
          >
            <div
              className="fixed right-0 top-0 h-full w-64 bg-gradient-to-r from-green-700 via-green-600 to-green-500 shadow-lg z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="flex flex-col space-y-4 p-4">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.path}
                      className="flex items-center gap-2 text-sm text-white hover:text-green-200 transition-colors duration-200 p-2"
                    >
                      {item.icon}
                      <span>{item.content}</span>
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    className="flex items-center gap-2 text-sm text-white hover:text-green-200 transition-colors duration-200 p-2 w-full"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sair</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
