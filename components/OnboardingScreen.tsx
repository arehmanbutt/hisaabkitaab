'use client';
import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ShopInfo } from '@/lib/types';

export default function OnboardingScreen() {
  const { saveShopInfo } = useApp();
  const [form, setForm] = useState<ShopInfo>({ ownerName: '', phone: '', shopName: '', address: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof ShopInfo, boolean>>>({});

  const set = (key: keyof ShopInfo, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: false }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof ShopInfo, boolean>> = {};
    if (!form.ownerName.trim()) newErrors.ownerName = true;
    if (!form.phone.trim()) newErrors.phone = true;
    if (!form.shopName.trim()) newErrors.shopName = true;
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    saveShopInfo(form);
  };

  const inputClass = (key: keyof ShopInfo) =>
    `w-full border ${errors[key] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a7a4a] focus:bg-white transition-colors`;

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-[#1a7a4a] via-[#1a7a4a] to-[#155f3a] flex flex-col lg:flex-row items-center justify-center p-5 lg:gap-16">
      {/* App logo / branding */}
      <div className="text-center lg:text-right mb-8 lg:mb-0 lg:max-w-xs">
        <div className="w-20 h-20 lg:w-24 lg:h-24 bg-white/20 rounded-3xl flex items-center justify-center mx-auto lg:mx-0 mb-4 shadow-lg">
          <BookOpen size={40} className="text-white" />
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold text-white">ہساب کتاب</h1>
        <p className="text-green-200 text-base lg:text-lg mt-2">آپ کی دکان کا ڈیجیٹل بہی کھاتا</p>
        <div className="hidden lg:flex flex-col gap-2 mt-8">
          {['قرض و ادھار ٹریک کریں', 'سپلائرز کی فہرست بنائیں', 'اسٹاک پر نظر رکھیں'].map(f => (
            <div key={f} className="flex items-center gap-2 text-green-200 text-sm">
              <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-[10px] text-white">✓</span>
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Form card */}
      <div className="w-full max-w-sm lg:max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-[#f0faf4] px-6 py-4 border-b border-green-100">
          <h2 className="text-lg font-bold text-[#1a7a4a] text-center">اپنی دکان رجسٹر کریں</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 tracking-wide">دکاندار کا نام *</label>
            <input
              className={inputClass('ownerName')}
              placeholder="مثال: محمد علی"
              value={form.ownerName}
              onChange={e => set('ownerName', e.target.value)}
            />
            {errors.ownerName && <p className="text-red-500 text-xs mt-1">نام درج کریں</p>}
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 tracking-wide">فون نمبر *</label>
            <input
              className={inputClass('phone')}
              placeholder="03001234567"
              type="tel"
              value={form.phone}
              onChange={e => set('phone', e.target.value)}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">فون نمبر درج کریں</p>}
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 tracking-wide">دکان کا نام *</label>
            <input
              className={inputClass('shopName')}
              placeholder="مثال: علی کریانہ اسٹور"
              value={form.shopName}
              onChange={e => set('shopName', e.target.value)}
            />
            {errors.shopName && <p className="text-red-500 text-xs mt-1">دکان کا نام درج کریں</p>}
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 tracking-wide">پتہ</label>
            <input
              className={inputClass('address')}
              placeholder="مثال: گلی نمبر ۲، محلہ گلشن"
              value={form.address}
              onChange={e => set('address', e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 bg-[#1a7a4a] text-white font-bold text-base rounded-xl hover:bg-[#155f3a] active:scale-95 transition-all shadow-md mt-2"
          >
            شروع کریں ←
          </button>
        </form>
      </div>

      <p className="text-green-300 text-xs mt-6 text-center lg:hidden">تمام ڈیٹا آپ کے فون میں محفوظ ہے</p>
    </div>
  );
}
