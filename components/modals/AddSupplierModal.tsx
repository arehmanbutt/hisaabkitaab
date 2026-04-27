'use client';
import { useState } from 'react';
import Modal from './Modal';
import { Supplier } from '@/lib/types';

interface Props {
  onClose: () => void;
  onAdd: (supplier: Supplier) => void;
}

export default function AddSupplierModal({ onClose, onAdd }: Props) {
  const [name, setName] = useState('');
  const [supplies, setSupplies] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    onAdd({ id: Date.now().toString(), name: name.trim(), supplies: supplies.trim(), phone: phone.trim(), category: category.trim() || undefined });
    onClose();
  };

  const ic = 'w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-[#1a7a4a] focus:bg-white focus:ring-2 focus:ring-[#1a7a4a]/10 transition-all duration-150';
  const lc = 'block text-[11px] font-bold text-gray-500 mb-1.5 uppercase tracking-widest';

  return (
    <Modal title="نیا سپلائر شامل کریں" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={lc}>سپلائر کا نام</label>
          <input className={ic} placeholder="مثال: رشید آٹا والا" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label className={lc}>زمرہ</label>
          <input className={ic} placeholder="مثال: مشروبات، ڈیری، خشک اجناس" value={category} onChange={e => setCategory(e.target.value)} />
        </div>
        <div>
          <label className={lc}>کیا سپلائی کرتا ہے</label>
          <input className={ic} placeholder="مثال: آٹا، چینی" value={supplies} onChange={e => setSupplies(e.target.value)} />
        </div>
        <div>
          <label className={lc}>فون نمبر</label>
          <input className={ic} placeholder="03001234567" value={phone} onChange={e => setPhone(e.target.value)} type="tel" required />
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
