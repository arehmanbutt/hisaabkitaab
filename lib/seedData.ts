import { Loan, Supplier, StockItem, ShopInfo } from './types';

export const seedShopInfo: ShopInfo = {
  ownerName: 'محمد علی',
  phone: '03001234567',
  shopName: 'بسم اللہ کریانہ اسٹور',
  address: 'گلی نمبر ۳، محلہ گلشن، لاہور',
};

const today = new Date();
const addDays = (d: Date, days: number) => {
  const r = new Date(d);
  r.setDate(r.getDate() + days);
  return r.toISOString().split('T')[0];
};

export const seedLoans: Loan[] = [
  {
    id: '1',
    customerName: 'احمد خان',
    phone: '03001234567',
    amount: 1500,
    reminderDate: addDays(today, -5),
    createdAt: addDays(today, -15),
    settled: false,
    note: 'آٹا ۲ کلو، چینی ۱ کلو',
  },
  {
    id: '2',
    customerName: 'محمد علی',
    phone: '03211234567',
    amount: 800,
    reminderDate: addDays(today, -2),
    createdAt: addDays(today, -10),
    settled: false,
    note: 'سگریٹ اور بسکٹ',
  },
  {
    id: '3',
    customerName: 'فاطمہ بی بی',
    phone: '03451234567',
    amount: 2200,
    reminderDate: addDays(today, 3),
    createdAt: addDays(today, -5),
    settled: false,
  },
  {
    id: '4',
    customerName: 'رشید میاں',
    phone: '03331234567',
    amount: 550,
    reminderDate: addDays(today, 7),
    createdAt: addDays(today, -2),
    settled: false,
    note: 'دودھ کی ادھاری',
  },
];

export const seedSuppliers: Supplier[] = [
  { id: '1', name: 'رشید آٹا والا', supplies: 'آٹا، چینی، دالیں', phone: '03001112222', category: 'خشک اجناس' },
  { id: '2', name: 'کولڈ ڈرنک والا شفیق', supplies: 'پیپسی، کوکا کولا، سپرائٹ', phone: '03111112222', category: 'مشروبات' },
  { id: '3', name: 'ڈیری والا ارشد', supplies: 'دودھ، دہی، مکھن', phone: '03221112222', category: 'ڈیری' },
  { id: '4', name: 'گروسری والا اکبر', supplies: 'چپس، بسکٹ، مٹھائی', phone: '03331112222', category: 'اسنیکس' },
  { id: '5', name: 'سبزی والا کریم', supplies: 'پیاز، ٹماٹر، آلو', phone: '03441112222', category: 'سبزیاں' },
];

export const seedStock: StockItem[] = [
  { id: '1', name: 'روح افزا', quantity: 6, unit: 'بوتل', lowStockThreshold: 3 },
  { id: '2', name: 'لیز چپس', quantity: 2, unit: 'پیٹی', lowStockThreshold: 2 },
  { id: '3', name: 'سرف ایکسل', quantity: 8, unit: 'پیکٹ', lowStockThreshold: 5 },
  { id: '4', name: 'نیسلے دودھ', quantity: 1, unit: 'پیٹی', lowStockThreshold: 2 },
  { id: '5', name: 'آٹا', quantity: 4, unit: 'بوری', lowStockThreshold: 2 },
  { id: '6', name: 'پیپسی', quantity: 3, unit: 'کریٹ', lowStockThreshold: 2 },
  { id: '7', name: 'ماچس', quantity: 15, unit: 'درجن', lowStockThreshold: 5 },
  { id: '8', name: 'چائے پتی', quantity: 2, unit: 'ڈبہ', lowStockThreshold: 3 },
];
