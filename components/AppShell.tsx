'use client';
import { ReactNode } from 'react';
import { useApp } from '@/context/AppContext';
import BottomNav from './BottomNav';
import SideNav from './SideNav';
import ToastContainer from './Toast';

export default function AppShell({ children }: { children: ReactNode }) {
  const { isLoading } = useApp();

  if (isLoading) {
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-[#1a7a4a] to-[#155f3a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-white/15 rounded-3xl flex items-center justify-center mx-auto mb-5 backdrop-blur-sm">
            <span className="text-white text-4xl font-black">ہ</span>
          </div>
          <p className="text-white text-2xl font-black tracking-wide">ہساب کتاب</p>
          <div className="mt-5 flex justify-center gap-1.5">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-2 h-2 bg-white/50 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.18}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#f4f9f6]">
      <SideNav />

      <div className="lg:mr-60 xl:mr-64 min-h-screen flex flex-col">
        <main className="flex-1 pb-24 lg:pb-10">
          <div className="animate-fadeIn">{children}</div>
        </main>
      </div>

      <BottomNav />
      <ToastContainer />
    </div>
  );
}
