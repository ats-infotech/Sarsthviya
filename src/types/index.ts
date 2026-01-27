import { Icons } from '@/components/icons';

export interface Items {
  menuTitle?: string;
  title: string;
  url: string;
  icon?: string;
}

export interface HeaderItem {
  title: string;
  url: string;
  subchildTitle?: string[];
  subchild?: Items[];
}

export interface FooterItem {
  title: string;
  subchild: Items[];
}

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icons | string;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[]; // Allow arbitrary depth for submenus
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]; // Recursive for deep submenus
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}
