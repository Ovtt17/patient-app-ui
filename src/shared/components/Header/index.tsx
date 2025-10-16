import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import DropdownUser from './DropdownUser.tsx';
import DarkModeSwitcher from './DarkModeSwitcher.tsx';
import SidebarIcon from './SidebarIcon.tsx';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const controls = useAnimation();
  const [lastScroll, setLastScroll] = useState(0);

  const handleScroll = () => {
    const container = document.getElementById('layout-scroll-container');
    if (!container) return;

    const currentScroll = container.scrollTop;
    if (currentScroll > lastScroll && currentScroll > 50) {
      // Scroll hacia abajo -> ocultar header
      controls.start({ y: '-100%', transition: { duration: 0.3 } });
    } else {
      // Scroll hacia arriba -> mostrar header
      controls.start({ y: '0%', transition: { duration: 0.3 } });
    }
    setLastScroll(currentScroll);
  };

  useEffect(() => {
    const container = document.getElementById('layout-scroll-container');
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  return (
    <motion.header
      animate={controls}
      className="sticky bg-gradient-light dark:bg-gradient-dark shadow-lg top-0 z-50 flex w-full h-[10%] drop-shadow-1 dark:drop-shadow-none"
    >
      <div className="flex flex-grow items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-50 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark"
          >
            <SidebarIcon sidebarOpen={props.sidebarOpen} />
          </button>
          <Link className="block flex-shrink-0" to="/">
            <img src='/logo.png' alt="Logo" className='w-13 h-13 rounded-lg' />
          </Link>
        </div>
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DarkModeSwitcher />
            <DropdownUser />
          </ul>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
