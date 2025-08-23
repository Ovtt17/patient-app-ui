import { useState } from 'react';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid';
import UserAvatarCell from '@/modules/auth/components/user/UserAvatarCell.tsx';
import { useAuth } from '@/shared/context/auth/useAuth';
import ClickOutside from '@/shared/utils/ClickOutside';

const DropdownUser = () => {
  const { logout, user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <span
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="h-12 w-12 rounded-full cursor-pointer flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xl font-semibold select-none overflow-hidden border border-blue-200 dark:border-blue-800 shadow-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
      >
        {user && (
          <UserAvatarCell user={user} />
        )}
      </span>

      {/* <!-- Dropdown Start --> */}
      {dropdownOpen && (
        <div
          className="absolute right-0 mt-4 flex w-64 flex-col rounded-lg text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg z-50"
        >
          <button
            onClick={logout}
            className="flex items-center gap-4 px-6 py-4 text-sm font-medium hover:text-red-600 dark:hover:text-red-400 transition-colors lg:text-base">
            <ArrowLeftStartOnRectangleIcon className="w-6 h-6" />
            Cerrar Sesión
          </button>
        </div>
      )}
      {/* <!-- Dropdown End --> */}
    </ClickOutside>
  );
};

export default DropdownUser;
