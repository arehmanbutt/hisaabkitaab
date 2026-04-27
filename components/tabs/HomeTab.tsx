'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MessageCircle, AlertTriangle, CheckCircle2, TrendingDown, ExternalLink, Receipt, Package } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { storage } from '@/lib/storage';
import { Loan, StockItem } from '@/lib/types';

function getUrduDate() {
  const d = new Date();
  const months = ['جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون', 'جولائی', 'اگست', 'ستمبر', 'اکتوبر', 'نومبر', 'دسمبر'];
  const days = ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'];
  return `${days[d.getDay()]}، ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function getDaysDiff(dateStr: string): number {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const d = new Date(dateStr); d.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - today.getTime()) / 86400000);
}

function fmt(n: number) { return n.toLocaleString('ur-PK'); }

export default function HomeTab() {
  const { shopInfo } = useApp();
  const router = useRouter();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [stock, setStock] = useState<StockItem[]>([]);

  useEffect(() => {
    setLoans(storage.getLoans());
    setStock(storage.getStock());
  }, []);

  const activeLoans = loans.filter(l => !l.settled);
  const overdueLoans = activeLoans.filter(l => getDaysDiff(l.reminderDate) < 0);
  const totalOutstanding = activeLoans.reduce((s, l) => s + l.amount, 0);
  const lowStockItems = stock.filter(i => i.quantity <= i.lowStockThreshold);
  const allClear = overdueLoans.length === 0 && lowStockItems.length === 0;

  return (
    <div className="px-4 sm:px-6 lg:px-8 xl:px-10 py-6 max-w-7xl mx-auto">

      {/* Greeting */}
      <div className="mb-6">
        <p className="text-gray-400 text-sm">{getUrduDate()}</p>
        <h1 className="text-2xl lg:text-3xl font-black text-gray-900 mt-1">
          خوش آمدید، {shopInfo?.shopName}!
        </h1>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Outstanding total */}
        <div
          className="sm:col-span-2 lg:col-span-1 bg-gradient-to-br from-[#1a7a4a] to-[#155f3a] rounded-2xl p-5 text-white shadow-lg shadow-emerald-900/20 cursor-pointer hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-900/25 active:scale-[0.98] transition-all duration-200"
          onClick={() => router.push('/loans')}
        >
          <p className="text-green-200 text-[11px] font-semibold uppercase tracking-widest">کل باقی رقم</p>
          <p className="text-4xl font-black mt-2 leading-none">₨{fmt(totalOutstanding)}</p>
          <p className="text-green-200/80 text-sm mt-2">{activeLoans.length} فعال ادھار</p>
        </div>

        {/* Overdue count */}
        <div
          className={`rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${
            overdueLoans.length > 0
              ? 'bg-red-50 ring-1 ring-red-200 hover:shadow-md hover:shadow-red-100'
              : 'bg-white ring-1 ring-black/[0.06] hover:shadow-md'
          }`}
          onClick={() => router.push('/loans')}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${overdueLoans.length > 0 ? 'bg-red-100' : 'bg-gray-100'}`}>
              <Receipt size={15} className={overdueLoans.length > 0 ? 'text-red-500' : 'text-gray-400'} />
            </div>
            <p className={`text-[11px] font-semibold uppercase tracking-widest ${overdueLoans.length > 0 ? 'text-red-500' : 'text-gray-400'}`}>
              تاریخ گزری
            </p>
          </div>
          <p className={`text-4xl font-black leading-none ${overdueLoans.length > 0 ? 'text-red-600' : 'text-gray-200'}`}>
            {overdueLoans.length}
          </p>
          <p className="text-xs text-gray-400 mt-1.5">ادھار</p>
        </div>

        {/* Low stock count */}
        <div
          className={`rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${
            lowStockItems.length > 0
              ? 'bg-orange-50 ring-1 ring-orange-200 hover:shadow-md hover:shadow-orange-100'
              : 'bg-white ring-1 ring-black/[0.06] hover:shadow-md'
          }`}
          onClick={() => router.push('/stock')}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${lowStockItems.length > 0 ? 'bg-orange-100' : 'bg-gray-100'}`}>
              <Package size={15} className={lowStockItems.length > 0 ? 'text-orange-500' : 'text-gray-400'} />
            </div>
            <p className={`text-[11px] font-semibold uppercase tracking-widest ${lowStockItems.length > 0 ? 'text-orange-500' : 'text-gray-400'}`}>
              کم اسٹاک
            </p>
          </div>
          <p className={`text-4xl font-black leading-none ${lowStockItems.length > 0 ? 'text-orange-600' : 'text-gray-200'}`}>
            {lowStockItems.length}
          </p>
          <p className="text-xs text-gray-400 mt-1.5">آئٹم</p>
        </div>
      </div>

      {allClear ? (
        <div className="bg-white rounded-2xl p-10 text-center ring-1 ring-black/[0.06] shadow-sm">
          <div className="w-16 h-16 bg-gradient-to-br from-[#eef7f2] to-[#d4eddf] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
            <CheckCircle2 size={30} className="text-[#1a7a4a]" />
          </div>
          <p className="font-black text-gray-800 text-lg">سب ٹھیک ہے!</p>
          <p className="text-gray-400 mt-1.5 text-sm">آج کوئی مسئلہ نہیں۔ دکان چل رہی ہے۔</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Overdue loans */}
          {overdueLoans.length > 0 && (
            <section className="bg-white rounded-2xl ring-1 ring-black/[0.06] shadow-sm overflow-hidden">
              <div className="flex items-center gap-2.5 px-5 py-4 border-b border-red-100 bg-red-50/60">
                <AlertTriangle size={15} className="text-red-500 shrink-0" />
                <h2 className="text-sm font-black text-red-700">تاریخ گزرے ادھار</h2>
                <span className="mr-auto bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {overdueLoans.length}
                </span>
              </div>
              <div className="divide-y divide-gray-50">
                {overdueLoans.map(loan => {
                  const diff = Math.abs(getDaysDiff(loan.reminderDate));
                  const waMsg = encodeURIComponent(`السلام علیکم! ${shopInfo.shopName} کی طرف سے یاد دہانی: آپ کے ذمہ ₨${loan.amount} روپے باقی ہیں۔ براہ کرم جلد دے دیں۔ شکریہ 🙏\n- ${shopInfo.ownerName}، ${shopInfo.shopName}`);
                  const waUrl = `https://wa.me/92${loan.phone.replace(/^0/, '')}?text=${waMsg}`;
                  return (
                    <div
                      key={loan.id}
                      className="flex items-center justify-between gap-3 px-5 py-3.5 hover:bg-red-50/40 cursor-pointer transition-colors duration-150"
                      onClick={() => router.push('/loans')}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-800 text-sm">{loan.customerName}</p>
                        <p className="text-red-500 text-xs mt-0.5">{diff} دن گزر گئے</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-black text-red-700 text-sm">₨{fmt(loan.amount)}</span>
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="w-8 h-8 bg-[#25D366] rounded-xl flex items-center justify-center text-white hover:bg-[#1ebe5d] active:scale-90 transition-all duration-150"
                        >
                          <MessageCircle size={14} />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Low stock */}
          {lowStockItems.length > 0 && (
            <section className="bg-white rounded-2xl ring-1 ring-black/[0.06] shadow-sm overflow-hidden">
              <div className="flex items-center gap-2.5 px-5 py-4 border-b border-orange-100 bg-orange-50/60">
                <TrendingDown size={15} className="text-orange-500 shrink-0" />
                <h2 className="text-sm font-black text-orange-700">کم اسٹاک</h2>
                <span className="mr-auto bg-orange-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {lowStockItems.length}
                </span>
              </div>
              <div className="divide-y divide-gray-50">
                {lowStockItems.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 px-5 py-3.5 hover:bg-orange-50/40 cursor-pointer transition-colors duration-150"
                    onClick={() => router.push('/stock')}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 text-sm">{item.name}</p>
                      <p className="text-orange-500 text-xs mt-0.5">{item.quantity} {item.unit} باقی</p>
                    </div>
                    <a
                      href="https://www.tajirapp.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="flex items-center gap-1 bg-[#1a7a4a] text-white text-xs font-bold px-2.5 py-1.5 rounded-xl hover:bg-[#155f3a] active:scale-90 transition-all duration-150 shrink-0"
                    >
                      <ExternalLink size={11} />Tajir
                    </a>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
