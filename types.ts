
export interface ShopConfig {
  id: string;
  name: string;
  category: string;
  owner: string;
}

export interface ShopDetail extends ShopConfig {
  country: string;
  realShopName: string;
  todeskId: string;
  pcPin: string;
  registrantName: string;
  email: string;
  emailPassword?: string;
  logo?: string; // Base64 or URL for the shop logo
}

export interface DailyShopRecord {
  revenue: number;
}

export interface DailyLog {
  date: string; // 格式: "1/01"
  shopData: Record<string, DailyShopRecord>; // key 为 shopId
}

export interface MonthlyAdSpend {
  shopId: string;
  amount: number;
}

export type ViewType = 'tracker' | 'upload' | 'analytics' | 'shops' | 'settings';

export interface Shop {
  id: string;
  name: string;
  revenue: number;
  orders: number;
  conversionRate: number;
  status: 'active' | 'vacation' | 'inactive';
  avatar: string;
}

export interface DailyMetric {
  date: string;
  revenue: number;
}

export interface Order {
  id: string;
  shopId: string;
  customerName: string;
  items: string[];
  date: string;
  status: 'shipped' | 'pending' | 'processing';
  amount: number;
}
