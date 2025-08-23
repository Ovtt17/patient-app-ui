import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BellIcon } from '@heroicons/react/24/solid';
import ClickOutside from '@/shared/utils/ClickOutside';

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <li>
        <Link
          onClick={() => {
            setNotifying(false);
            setDropdownOpen(!dropdownOpen);
          }}
          to="#"
          className="relative flex h-12 w-12 items-center justify-center rounded-md text-blue-600 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
        >
          <span
            className={`absolute -top-1 right-0 z-10 h-5 w-5 rounded-full bg-red-500 ${notifying === false ? 'hidden' : 'inline'}`}
          >
            <span className="absolute z-0 inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
          </span>
          <BellIcon className="w-5 h-5" />
        </Link>

        {dropdownOpen && (
          <div
            className="absolute right-0 mt-3 flex w-80 flex-col rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900 z-50"
          >
            <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
              <h5 className="text-base font-semibold text-gray-700 dark:text-gray-200">Notifications</h5>
            </div>

            <ul className="flex flex-col max-h-80 overflow-y-auto">
              <li>
                <Link
                  className="flex flex-col gap-2 border-b border-gray-100 dark:border-gray-800 px-5 py-4 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
                  to="#"
                >
                  <p className="text-sm text-gray-800 dark:text-gray-100">
                    <span className="font-medium">Edit your information in a swipe</span> Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">12 May, 2025</p>
                </Link>
              </li>
              <li>
                <Link
                  className="flex flex-col gap-2 border-b border-gray-100 dark:border-gray-800 px-5 py-4 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
                  to="#"
                >
                  <p className="text-sm text-gray-800 dark:text-gray-100">
                    <span className="font-medium">It is a long established fact</span> that a reader will be distracted by the readable.
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">24 Feb, 2025</p>
                </Link>
              </li>
              <li>
                <Link
                  className="flex flex-col gap-2 border-b border-gray-100 dark:border-gray-800 px-5 py-4 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
                  to="#"
                >
                  <p className="text-sm text-gray-800 dark:text-gray-100">
                    <span className="font-medium">There are many variations</span> of passages of Lorem Ipsum available, but the majority have suffered
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">04 Jan, 2025</p>
                </Link>
              </li>
              <li>
                <Link
                  className="flex flex-col gap-2 border-b border-gray-100 dark:border-gray-800 px-5 py-4 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
                  to="#"
                >
                  <p className="text-sm text-gray-800 dark:text-gray-100">
                    <span className="font-medium">There are many variations</span> of passages of Lorem Ipsum available, but the majority have suffered
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">01 Dec, 2024</p>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </li>
    </ClickOutside>
  );
};

export default DropdownNotification;
