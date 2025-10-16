import { Link } from "react-router-dom";
import DropdownUser from "./DropdownUser.tsx";
import DarkModeSwitcher from "./DarkModeSwitcher.tsx";
import { Menu } from "lucide-react";

interface HeaderProps {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (open: boolean) => void;
}

const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  return (
    <header className="sticky bg-white dark:bg-gray-900 shadow-lg top-0 z-50 flex w-full h-16">
      <div className="flex flex-grow items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Botón del menú lateral */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="block rounded border border-gray-200 bg-white p-2 shadow-sm 
                       dark:border-gray-700 dark:bg-gray-900 md:hidden"
          >
            <span className="relative block h-6 w-6 cursor-pointer">
              <Menu className="text-black dark:text-white" />
            </span>
          </button>

          {/* Logo */}
          <Link className="block flex-shrink-0" to="/">
            <img src="/logo.png" alt="Logo" className="w-12 h-12 rounded-lg" />
          </Link>
        </div>

        {/* Controles derechos */}
        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-3">
            <DarkModeSwitcher />
            <DropdownUser />
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
