'use client';
import { useState } from 'react';
import { Edit2, LogOut, Store, User, Phone, MapPin } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import EditShopModal from '@/components/modals/EditShopModal';
import ConfirmDialog from '@/components/ConfirmDialog';
import { ShopInfo } from '@/lib/types';

export default function SettingsTab() {
  const { shopInfo, saveShopInfo, logout, toast } = useApp();
  const [showEdit, setShowEdit] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  if (!shopInfo) return null;

  const handleSave = (info: ShopInfo) => {
    saveShopInfo(info);
    toast('تفصیلات محفوظ ہو گئیں ✓');
    setShowEdit(false);
  };

  const rows = [
    { icon: Store, label: 'دکان کا نام', value: shopInfo.shopName },
    { icon: User, label: 'دکاندار کا نام', value: shopInfo.ownerName },
    { icon: Phone, label: 'فون نمبر', value: shopInfo.phone },
    { icon: MapPin, label: 'پتہ', value: shopInfo.address || '—' },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 xl:px-10 py-6 max-w-7xl mx-auto">
      <h1 className="text-2xl lg:text-3xl font-black text-gray-900 mb-6">ترتیبات</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Shop info card */}
        <div className="bg-white rounded-2xl ring-1 ring-black/[0.06] shadow-sm overflow-hidden">
          {/* Card header */}
          <div className="bg-gradient-to-br from-[#1a7a4a] to-[#155f3a] px-6 py-6 shadow-lg shadow-emerald-900/20">
            <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
              <Store size={26} className="text-white" />
            </div>
            <h2 className="text-white font-black text-xl leading-snug">{shopInfo.shopName}</h2>
            <p className="text-green-200/80 mt-0.5">{shopInfo.ownerName}</p>
          </div>

          {/* Details rows */}
          <div className="divide-y divide-gray-50">
            {rows.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4 px-6 py-4">
                <div className="w-9 h-9 bg-[#f0faf4] rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-[#1a7a4a]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-400 text-[11px] font-semibold uppercase tracking-widest">{label}</p>
                  <p className="text-gray-800 font-bold truncate mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 py-5 border-t border-gray-100">
            <button
              onClick={() => setShowEdit(true)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#1a7a4a] text-white font-bold rounded-xl shadow-md shadow-emerald-900/20 hover:bg-[#155f3a] hover:shadow-lg hover:shadow-emerald-900/25 active:scale-[0.98] transition-all duration-150"
            >
              <Edit2 size={16} />تبدیل کریں
            </button>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Logout */}
          <div className="bg-white rounded-2xl ring-1 ring-black/[0.06] shadow-sm p-6">
            <h3 className="font-black text-gray-800 mb-1.5">لاگ آؤٹ</h3>
            <p className="text-gray-400 text-sm mb-5">تمام ڈیٹا مٹ جائے گا اور آپ کو دوبارہ رجسٹر کرنا ہوگا۔</p>
            <button
              onClick={() => setShowLogout(true)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 font-bold rounded-xl ring-1 ring-red-200 hover:bg-red-100 hover:ring-red-300 active:scale-[0.98] transition-all duration-150"
            >
              <LogOut size={16} />لاگ آؤٹ
            </button>
          </div>
        </div>
      </div>

      {showEdit && (
        <EditShopModal current={shopInfo} onClose={() => setShowEdit(false)} onSave={handleSave} />
      )}
      {showLogout && (
        <ConfirmDialog
          message="لاگ آؤٹ کریں؟"
          detail="تمام ڈیٹا مٹ جائے گا۔ کیا آپ واقعی جاری رکھنا چاہتے ہیں؟"
          confirmText="ہاں، لاگ آؤٹ"
          cancelText="منسوخ"
          dangerous
          onConfirm={logout}
          onCancel={() => setShowLogout(false)}
        />
      )}
    </div>
  );
}
