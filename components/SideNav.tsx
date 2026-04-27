'use client';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Receipt, Truck, Package, Settings, BookOpen, Store } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const tabs = [
  { path: '/',          icon: Home,     label: 'ہوم' },
  { path: '/loans',     icon: Receipt,  label: 'ہساب' },
  { path: '/suppliers', icon: Truck,    label: 'سپلائر' },
  { path: '/stock',     icon: Package,  label: 'اسٹاک' },
  { path: '/settings',  icon: Settings, label: 'ترتیبات' },
];

export default function SideNav() {
  const pathname = usePathname();
  const router   = useRouter();
  const { shopInfo } = useApp();

  return (
    <aside className="hidden lg:flex flex-col w-60 xl:w-64 bg-white fixed right-0 top-0 h-screen z-30 border-l border-gray-100 shadow-[−2px_0_20px_rgba(0,0,0,0.04)]">

      {/* ── Brand ─────────────────────────────── */}
      <div className="px-5 pt-6 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#1a7a4a] to-[#155f3a] rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-900/20 shrink-0">
            <BookOpen size={22} className="text-white" />
          </div>
          <div>
            <p className="font-black text-gray-900 text-base leading-none">ہساب کتاب</p>
            <p className="text-gray-400 text-[11px] mt-1">آپ کی دکان کا بہی کھاتا</p>
          </div>
        </div>
      </div>

      <div className="mx-5 h-px bg-gray-100" />

      {/* ── Nav items ─────────────────────────── */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {tabs.map(({ path, icon: Icon, label }) => {
          const active = pathname === path;
          return (
            <button
              key={path}
              onClick={() => router.push(path)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                active
                  ? 'bg-[#eef7f2] text-[#1a7a4a]'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {/* Active bar on the inner edge (left in RTL = facing content) */}
              <span className={`w-1 h-5 rounded-full shrink-0 transition-all duration-200 ${active ? 'bg-[#1a7a4a]' : 'bg-transparent'}`} />
              <Icon
                size={18}
                strokeWidth={active ? 2.5 : 1.8}
                className={`shrink-0 transition-colors duration-200 ${active ? 'text-[#1a7a4a]' : 'text-gray-400'}`}
              />
              <span className="flex-1 text-right">{label}</span>
            </button>
          );
        })}
      </nav>

      {/* ── Shop card ─────────────────────────── */}
      {shopInfo && (
        <div className="p-4">
          <div
            className="bg-gradient-to-br from-[#f4f9f6] to-[#eaf4ee] rounded-2xl p-3.5 border border-green-100 cursor-pointer hover:border-green-200 transition-colors duration-200"
            onClick={() => router.push('/settings')}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1a7a4a] to-[#155f3a] rounded-xl flex items-center justify-center shrink-0 shadow-md shadow-emerald-900/20">
                <Store size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 font-bold text-sm leading-none truncate">{shopInfo.shopName}</p>
                <p className="text-gray-400 text-[11px] mt-1 truncate">{shopInfo.ownerName}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
