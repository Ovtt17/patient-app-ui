import { type FC, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import type { SidebarMenuItem } from "@/shared/types/sidebar-menu-item";


interface SidebarProps {
  menuItems: SidebarMenuItem[];
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

/**
 * Sidebar genérico para todos los roles (Admin, Doctor, Paciente)
 */
const Sidebar: FC<SidebarProps> = ({ menuItems, setSidebarOpen }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleSubmenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <nav className="h-full flex flex-col justify-between">
      {/* LOGO / HEADER */}
      <div className="px-6 py-4 flex items-center gap-3 border-b border-gray-200 dark:border-gray-700">
        <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-lg" />
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Panel
        </h2>
      </div>

      {/* MENÚ PRINCIPAL */}
      <ul className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive =
            item.href && location.pathname.startsWith(item.href);

          const isOpen = openMenus.includes(item.title);

          return (
            <li key={item.title}>
              {item.subItems ? (
                <div>
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors 
                      ${isActive ? "bg-gray-100 dark:bg-gray-800" : ""}
                      text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-5 h-5">{item.icon}</span>
                      {item.title}
                    </span>
                    {isOpen ? (
                      <ChevronDownIcon className="w-4 h-4" />
                    ) : (
                      <ChevronRightIcon className="w-4 h-4" />
                    )}
                  </button>

                  {/* Submenú animado */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-6 mt-1 space-y-1"
                      >
                        {item.subItems.map((sub) => (
                          <li key={sub.title}>
                            <NavLink
                              to={sub.href}
                              onClick={() => setSidebarOpen(false)}
                              className={({ isActive }) =>
                                `flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                                  isActive
                                    ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`
                              }
                            >
                              {sub.icon && (
                                <span className="w-4 h-4">{sub.icon}</span>
                              )}
                              {sub.title}
                            </NavLink>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink
                  to={item.href!}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`
                  }
                >
                  <span className="w-5 h-5">{item.icon}</span>
                  {item.title}
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>

      {/* FOOTER / CIERRE */}
      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
         {new Date().getFullYear()} Hospital Salud y Vida
      </div>
    </nav>
  );
};

export default Sidebar;
