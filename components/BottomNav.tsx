'use client';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Receipt, Truck, Package, Settings } from 'lucide-react';

const tabs = [
  { path: '/',          icon: Home,     label: 'ہوم' },
  { path: '/loans',     icon: Receipt,  label: 'ہساب' },
  { path: '/suppliers', icon: Truck,    label: 'سپلائر' },
  { path: '/stock',     icon: Package,  label: 'اسٹاک' },
  { path: '/settings',  icon: Settings, label: 'ترتیبات' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router   = useRouter();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-8px_24px_rgba(0,0,0,0.06)]">
      <div className="flex items-stretch safe-area-inset-bottom">
        {tabs.map(({ path, icon: Icon, label }) => {
          const active = pathname === path;
          return (
            <button
              key={path}
              onClick={() => router.push(path)}
              className={`flex-1 flex flex-col items-center justify-center pt-2.5 pb-3 gap-1 relative transition-all duration-200 active:scale-95 ${
                active ? 'text-[#1a7a4a]' : 'text-gray-400'
              }`}
            >
              {/* Top indicator pill */}
              <span className={`absolute top-0 left-1/2 -translate-x-1/2 h-0.5 rounded-b-full transition-all duration-300 ${active ? 'w-6 bg-[#1a7a4a]' : 'w-0 bg-transparent'}`} />

              <div className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-200 ${active ? 'bg-[#eef7f2]' : ''}`}>
                <Icon size={19} strokeWidth={active ? 2.5 : 1.8} />
              </div>
              <span className={`text-[10px] font-bold leading-none transition-colors duration-200 ${active ? 'text-[#1a7a4a]' : 'text-gray-400'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
