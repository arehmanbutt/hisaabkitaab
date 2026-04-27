'use client';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function ToastContainer() {
  const { toasts } = useApp();
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-5 left-1/2 z-[200] flex flex-col items-center gap-2 pointer-events-none"
      style={{ transform: 'translateX(-50%)', width: 'max-content', maxWidth: '90vw' }}
    >
      {toasts.map(t => (
        <div
          key={t.id}
          className={`animate-toastIn flex items-center gap-2.5 px-5 py-3 rounded-2xl shadow-xl text-white text-sm font-bold backdrop-blur-sm ${
            t.type === 'error'
              ? 'bg-red-600 shadow-red-500/30'
              : 'bg-[#1a7a4a] shadow-emerald-900/30'
          }`}
        >
          {t.type === 'error'
            ? <XCircle size={16} className="shrink-0" />
            : <CheckCircle2 size={16} className="shrink-0" />}
          {t.message}
        </div>
      ))}
    </div>
  );
}
