import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useAuth } from '@/shared/context/auth/useAuth';
import adminMenuItems from '@/shared/constants/adminMenuItems';
import MenuGroup from './MenuGroup';
import doctorMenuItems from '@/shared/constants/doctorMenuItems';
import sharedMenuItems from '@/shared/constants/sharedMenuItems';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;
  const { isUserAdmin, isUserDoctor } = useAuth();

  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ code }: KeyboardEvent) => {
      if (!sidebarOpen || code !== 'Escape') return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <aside
      ref={sidebar}
      className={`absolute bg-gradient-dark left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden duration-300 ease-linear ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      <div className="relative flex items-center justify-center p-4">
        <NavLink to="/" target='_blank'>
          <img className="w-60 h-20 object-contain" src="/LogoD.png" alt="Logo" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="absolute right-4"
        >
          <ArrowLeftIcon className="w-6 h-6 text-white" />
        </button>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="py-4 px-4 lg:px-6">

          {isUserAdmin && (
            <MenuGroup
              title="ADMIN"
              items={adminMenuItems}
              pathname={pathname}
              setSidebarOpen={setSidebarOpen}
            />
          )}

          {isUserDoctor && (
            <MenuGroup
              title="DOCTOR"
              items={doctorMenuItems}
              pathname={pathname}
              setSidebarOpen={setSidebarOpen}
            />
          )}

          <MenuGroup
            title='PRINCIPAL'
            items={sharedMenuItems}
            pathname={pathname}
            setSidebarOpen={setSidebarOpen}
          />
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
