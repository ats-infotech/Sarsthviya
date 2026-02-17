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

interface details {
  title: string;
  description: string;
}

interface DeliveryAndReturn {
  title: string;
  rules: string[];
}

interface Review {
  rating: number;
  verified: boolean;
  userName: string;
  date: string;
  title: string;
  description: string;
  replied: string;
}

export interface Product {
  id: number;
  product_name: string;
  image: string[];
  rating: number;
  original_price: number;
  discounted_price: number;
  discount_percentage: number;
  cashback_amount: number;
  currency: string;
  size: string[];
  description: string;
  info: string;
  details: details[];
  care: string[];
  shippingCondition: string[];
  deliveryAndReturns: DeliveryAndReturn[];
  reviews: Review[];
}

export interface NewArrivalSection {
  title: string;
  titleUnderLinerSvg: string;
  products: Product[];
}

export interface SeasonalOffer {
  offerTitle: string;
  offer: string;
  image: string;
}

export interface SeasonalOfferSection {
  title: string;
  offerInfo: SeasonalOffer[];
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
