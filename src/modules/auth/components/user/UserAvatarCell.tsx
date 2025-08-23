import { useState, type FC } from "react";
import type { User } from "../../types/user.types";
import { useAvatarUrl } from "../../hooks/useAvatarUrl";


interface UserAvatarCellProps {
  user: User;
  expandable?: boolean;
}

const UserAvatarCell: FC<UserAvatarCellProps> = ({ user, expandable = false }) => {
  const avatarUrl = useAvatarUrl(user?.profilePictureUrl, user.username);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (expandable) setOpen(true);
  };

  return (
    <>
      <div
        className={`h-12 w-12 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xl font-semibold select-none overflow-hidden ${expandable ? 'cursor-pointer' : ''}`}
        onClick={handleOpen}
      >
        <img
          src={avatarUrl}
          className="h-12 w-12 object-cover rounded-full"
          alt={user.username || 'User'}
        />
      </div>
      {expandable && open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 z-50 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors animate-avatar-zoom-in w-7 h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 flex items-center justify-center"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5 md:w-7 md:h-7 lg:w-9 lg:h-9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={avatarUrl}
              alt={user.username || 'User'}
              className="min-w-[200px] min-h-[200px] max-h-[80vh] max-w-[90vw] rounded-xl shadow-lg border-4 border-white dark:border-gray-800 object-contain transition-all duration-300 ease-out scale-90 opacity-0 animate-avatar-zoom-in"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UserAvatarCell;
