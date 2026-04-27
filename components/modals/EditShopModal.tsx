'use client';
import { useState } from 'react';
import Modal from './Modal';
import { ShopInfo } from '@/lib/types';

interface Props {
  current: ShopInfo;
  onClose: () => void;
  onSave: (info: ShopInfo) => void;
}

export default function EditShopModal({ current, onClose, onSave }: Props) {
  const [form, setForm] = useState<ShopInfo>({ ...current });

  const set = (key: keyof ShopInfo, v: string) => setForm(prev => ({ ...prev, [key]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.ownerName.trim() || !form.phone.trim() || !form.shopName.trim()) return;
    onSave(form);
    onClose();
  };

  const ic = 'w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-[#1a7a4a] focus:bg-white focus:ring-2 focus:ring-[#1a7a4a]/10 transition-all duration-150';
  const lc = 'block text-[11px] font-bold text-gray-500 mb-1.5 uppercase tracking-widest';

  return (
    <Modal title="دکان کی تفصیلات تبدیل کریں" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={lc}>دکاندار کا نام</label>
          <input className={ic} value={form.ownerName} onChange={e => set('ownerName', e.target.value)} required />
        </div>
        <div>
          <label className={lc}>فون نمبر</label>
          <input className={ic} value={form.phone} onChange={e => set('phone', e.target.value)} type="tel" required />
        </div>
        <div>
          <label className={lc}>دکان کا نام</label>
          <input className={ic} value={form.shopName} onChange={e => set('shopName', e.target.value)} required />
        </div>
        <div>
          <label className={lc}>پتہ</label>
          <input className={ic} value={form.address} onChange={e => set('address', e.target.value)} />
        </div>
        <div className="flex gap-3 pt-1">
          <button type="button" onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-gray-50 text-sm font-semibold text-gray-600 hover:bg-gray-100 active:scale-95 transition-all duration-150">
            منسوخ
          </button>
          <button type="submit"
            className="flex-1 py-3 rounded-xl bg-[#1a7a4a] text-white text-sm font-bold hover:bg-[#155f3a] active:scale-95 transition-all duration-150 shadow-md shadow-emerald-900/20">
            محفوظ کریں
          </button>
        </div>
      </form>
    </Modal>
  );
}
