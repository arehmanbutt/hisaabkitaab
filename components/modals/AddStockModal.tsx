'use client';
import { useState } from 'react';
import Modal from './Modal';
import { StockItem } from '@/lib/types';

interface Props {
  onClose: () => void;
  onAdd: (item: StockItem) => void;
}

export default function AddStockModal({ onClose, onAdd }: Props) {
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [quantity, setQuantity] = useState('');
  const [threshold, setThreshold] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !unit.trim()) return;
    onAdd({
      id: Date.now().toString(),
      name: name.trim(),
      unit: unit.trim(),
      quantity: parseInt(quantity) || 0,
      lowStockThreshold: parseInt(threshold) || 1,
    });
    onClose();
  };

  const ic = 'w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-[#1a7a4a] focus:bg-white focus:ring-2 focus:ring-[#1a7a4a]/10 transition-all duration-150';
  const lc = 'block text-[11px] font-bold text-gray-500 mb-1.5 uppercase tracking-widest';

  return (
    <Modal title="نیا آئٹم شامل کریں" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={lc}>آئٹم کا نام</label>
          <input className={ic} placeholder="مثال: روح افزا" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label className={lc}>اکائی</label>
          <input className={ic} placeholder="مثال: پیٹی، بوری، درجن" value={unit} onChange={e => setUnit(e.target.value)} required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={lc}>موجودہ مقدار</label>
            <input className={ic} placeholder="10" value={quantity} onChange={e => setQuantity(e.target.value)} type="number" min="0" />
          </div>
          <div>
            <label className={lc}>کم اسٹاک حد</label>
            <input className={ic} placeholder="2" value={threshold} onChange={e => setThreshold(e.target.value)} type="number" min="0" />
          </div>
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
