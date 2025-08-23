import { MoonIcon, SunIcon, ComputerDesktopIcon } from '@heroicons/react/24/solid';
import useColorMode from '../../hooks/useColorMode.tsx';
import { useState } from 'react';
import { cn } from '@/lib/utils.ts';

const DarkModeSwitcher = () => {
  const [colorMode, setColorMode] = useColorMode();
  const [open, setOpen] = useState(false);

  const handleChange = (mode: 'light' | 'dark' | 'system') => {
    setColorMode(mode);
    setOpen(false);
  };

  const iconStyle = 'w-6 h-6 transition-all duration-300 transform absolute';

  return (
    <li className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors cursor-pointer"
        )}
        aria-label="Cambiar tema"
      >
        {/* Contenedor que superpone íconos */}
        <span className="relative w-6 h-6">
          <SunIcon
            className={cn(
              iconStyle,
              "text-yellow-500",
              colorMode === "light" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            )}
          />
          <MoonIcon
            className={cn(
              iconStyle,
              "text-indigo-400",
              colorMode === "dark" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            )}
          />
          <ComputerDesktopIcon
            className={cn(
              iconStyle,
              "text-blue-600 dark:text-blue-300",
              colorMode === "system" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            )}
          />
        </span>
      </button>

      {open && (
        <ul className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          <li>
            <button
              onClick={() => handleChange('light')}
              className={cn(
                "flex items-center gap-2 w-full px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-blue-800 transition-colors cursor-pointer"
              )}
            >
              <SunIcon className="w-5 h-5 text-yellow-500" /> Claro
            </button>
          </li>
          <li>
            <button
              onClick={() => handleChange('dark')}
              className={cn(
                "flex items-center gap-2 w-full px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-blue-800 transition-colors cursor-pointer"
              )}
            >
              <MoonIcon className="w-5 h-5 text-indigo-400" /> Oscuro
            </button>
          </li>
          <li>
            <button
              onClick={() => handleChange('system')}
              className={cn(
                "flex items-center gap-2 w-full px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-blue-800 transition-colors cursor-pointer"
              )}
            >
              <ComputerDesktopIcon className="w-5 h-5 text-blue-600 dark:text-blue-300" /> Sistema
            </button>
          </li>
        </ul>
      )}
    </li>
  );
};

export default DarkModeSwitcher;