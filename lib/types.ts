export interface ShopInfo {
  ownerName: string;
  phone: string;
  shopName: string;
  address: string;
}

export interface Loan {
  id: string;
  customerName: string;
  phone: string;
  amount: number;
  reminderDate: string;
  createdAt: string;
  settled: boolean;
  settledAt?: string;
  note?: string;
}

export interface Supplier {
  id: string;
  name: string;
  supplies: string;
  phone: string;
  category?: string;
}

export interface StockItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  lowStockThreshold: number;
}
