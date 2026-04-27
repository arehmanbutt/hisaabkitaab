import { Loan, Supplier, StockItem, ShopInfo } from './types';
import { seedLoans, seedSuppliers, seedStock, seedShopInfo } from './seedData';

const KEYS = {
  loans: 'hk_loans_v2',
  suppliers: 'hk_suppliers',
  stock: 'hk_stock',
  shop: 'hk_shop',
};

function load<T>(key: string, seed: T[]): T[] {
  if (typeof window === 'undefined') return seed;
  const raw = localStorage.getItem(key);
  if (raw === null) {
    localStorage.setItem(key, JSON.stringify(seed));
    return seed;
  }
  try { return JSON.parse(raw) as T[]; } catch { return seed; }
}

function save<T>(key: string, data: T[]) {
  if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(data));
}

export const storage = {
  getShopInfo: (): ShopInfo => {
    if (typeof window === 'undefined') return seedShopInfo;
    const raw = localStorage.getItem(KEYS.shop);
    if (!raw) {
      localStorage.setItem(KEYS.shop, JSON.stringify(seedShopInfo));
      return seedShopInfo;
    }
    try { return JSON.parse(raw) as ShopInfo; } catch { return seedShopInfo; }
  },
  saveShopInfo: (info: ShopInfo) => {
    if (typeof window !== 'undefined') localStorage.setItem(KEYS.shop, JSON.stringify(info));
  },
  getLoans: () => load<Loan>(KEYS.loans, seedLoans),
  saveLoans: (loans: Loan[]) => save(KEYS.loans, loans),
  getSuppliers: () => load<Supplier>(KEYS.suppliers, seedSuppliers),
  saveSuppliers: (s: Supplier[]) => save(KEYS.suppliers, s),
  getStock: () => load<StockItem>(KEYS.stock, seedStock),
  saveStock: (stock: StockItem[]) => save(KEYS.stock, stock),
};
