import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import type { SidebarMenuItem } from '@/shared/types/sidebar-menu-item';
import { cn } from '@/lib/utils';

interface MenuItemProps {
  item: SidebarMenuItem;
  pathname: string;
  setSidebarOpen: (arg: boolean) => void;
}

const MenuItem = ({ item, pathname, setSidebarOpen }: MenuItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (item.subItems) {
      const isSubRouteActive = item.subItems.some(sub => pathname.startsWith(sub.href || ''));
      setIsOpen(isSubRouteActive);
    }
  }, [pathname, item.subItems]);

  const renderLink = (href: string, icon: React.ReactNode, title: string) => {
    const isActive = pathname === href;
    return (
      <NavLink
        to={href}
        onClick={() => setSidebarOpen(false)}
        className={cn(
          'group relative flex items-center gap-3 rounded-2xl px-4 py-2 text-sm font-medium transition-colors duration-300',
          isActive
            ? 'bg-gradient-to-r from-primary to-secondary text-white'
            : 'text-sidebar-900 hover:bg-sidebar-100 hover:text-white'
        )}
      >
        <span
          className={cn(
            'flex items-center justify-center w-6 h-6 min-w-[1.5rem] text-lg transition-colors',
            isActive ? 'text-white' : 'text-gray-400'
          )}
        >
          {icon}
        </span>
        <span className="truncate">{title}</span>
      </NavLink>
    );
  };

  const isSubRouteActive = item.subItems?.some(sub => pathname.startsWith(sub.href || '')) || false;

  if (!item.subItems) {
    return <li className="mb-1">{renderLink(item.href || '#', item.icon, item.title)}</li>;
  }

  return (
    <li className="mb-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex w-full items-center justify-between rounded-2xl px-4 py-2 text-sm font-medium transition-colors duration-300',
          isSubRouteActive
            ? 'bg-primary text-white'
            : 'text-sidebar-900 hover:bg-sidebar-100 hover:text-white'
        )}
      >
        <div className="flex items-center gap-3">
          <span
            className={cn(
              'flex items-center justify-center w-6 h-6 min-w-[1.5rem] text-lg transition-colors',
              isSubRouteActive ? 'text-white' : 'text-gray-400'
            )}
          >
            {item.icon}
          </span>
          <span className="truncate">{item.title}</span>
        </div>
        <ChevronDownIcon
          className={cn(
            'h-5 w-5 transition-transform duration-200',
            isSubRouteActive ? 'text-white' : 'text-gray-400',
            isOpen ? 'rotate-180' : ''
          )}
        />
      </button>
      <ul
        className={cn(
          'ml-4 mt-1 space-y-1 pl-4 border-l border-sidebar-300 transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        )}
      >
        {item.subItems.map((sub) => (
          <li key={sub.title}>
            {renderLink(sub.href || '#', sub.icon, sub.title)}
          </li>
        ))}
      </ul>
    </li>
  );
};

export default MenuItem;
