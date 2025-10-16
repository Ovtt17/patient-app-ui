export interface SidebarSubMenuItem {
  title: string;
  href: string;
  icon?: React.JSX.Element;
}

export interface SidebarMenuItem {
  title: string;
  icon?: React.JSX.Element;
  href?: string;
  subItems?: SidebarSubMenuItem[];
}
