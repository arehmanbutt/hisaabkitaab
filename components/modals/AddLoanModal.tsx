'use client';
import { useState } from 'react';
import Modal from './Modal';
import { Loan } from '@/lib/types';

interface Props {
  onClose: () => void;
  onAdd: (loan: Loan) => void;
}

export default function AddLoanModal({ onClose, onAdd }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [method, setMethod] = useState<'days' | 'date'>('days');
  const [date, setDate] = useState('');
  const [days, setDays] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const computedDate = () => {
    if (method === 'date') return date || today;
    const d = parseInt(days);
    if (!d || isNaN(d)) return today;
    const r = new Date();
    r.setDate(r.getDate() + d);
    return r.toISOString().split('T')[0];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !amount) return;
    onAdd({
      id: Date.now().toString(),
      customerName: name.trim(),
      phone: phone.trim(),
      amount: parseFloat(amount),
      reminderDate: computedDate(),
      createdAt: today,
      settled: false,
      note: note.trim() || undefined,
    });
    onClose();
  };

  const ic = 'w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-[#1a7a4a] focus:bg-white focus:ring-2 focus:ring-[#1a7a4a]/10 transition-all duration-150';
  const lc = 'block text-[11px] font-bold text-gray-500 mb-1.5 uppercase tracking-widest';

  return (
    <Modal title="نیا ادھار شامل کریں" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={lc}>گاہک کا نام</label>
          <input className={ic} placeholder="مثال: احمد خان" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label className={lc}>فون نمبر</label>
          <input className={ic} placeholder="03001234567" value={phone} onChange={e => setPhone(e.target.value)} type="tel" required />
        </div>
        <div>
          <label className={lc}>رقم (روپے)</label>
          <input className={ic} placeholder="500" value={amount} onChange={e => setAmount(e.target.value)} type="number" min="1" required />
        </div>
        <div>
          <label className={lc}>نوٹ (اختیاری)</label>
          <input className={ic} placeholder="مثال: آٹا ۲ کلو، چینی ۱ کلو" value={note} onChange={e => setNote(e.target.value)} />
        </div>
        <div>
          <label className={lc}>یاددہانی کا طریقہ</label>
          <div className="flex gap-2">
            {(['days', 'date'] as const).map(m => (
              <button key={m} type="button" onClick={() => setMethod(m)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-150 ${
                  method === m
                    ? 'bg-[#1a7a4a] text-white shadow-md shadow-emerald-900/20'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}>
                {m === 'days' ? 'دن کی تعداد' : 'تاریخ چنیں'}
              </button>
            ))}
          </div>
        </div>
        {method === 'days' ? (
          <div>
            <label className={lc}>آج سے کتنے دن بعد</label>
            <input className={ic} placeholder="7" value={days} onChange={e => setDays(e.target.value)} type="number" min="1" />
          </div>
        ) : (
          <div>
            <label className={lc}>یاددہانی کی تاریخ</label>
            <input className={ic} value={date} onChange={e => setDate(e.target.value)} type="date" min={today} />
          </div>
        )}
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
