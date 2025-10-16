import type { SidebarMenuItem } from '@/shared/types/sidebar-menu-item';
import MenuItem from './MenuItem';

interface MenuGroupProps {
  title: string;
  items: SidebarMenuItem[];
  pathname: string;
  setSidebarOpen: (arg: boolean) => void;
}

const MenuGroup = ({ title, items, pathname, setSidebarOpen }: MenuGroupProps) => (
  <div>
    <h3 className="mb-4 ml-4 text-sm font-semibold">
      {title}
    </h3>
    <ul className="mb-6 flex flex-col gap-1.5">
      {items.map((item) => (
        <MenuItem
          key={item.title}
          item={item}
          pathname={pathname}
          setSidebarOpen={setSidebarOpen}
        />
      ))}
    </ul>
  </div>
);

export default MenuGroup;