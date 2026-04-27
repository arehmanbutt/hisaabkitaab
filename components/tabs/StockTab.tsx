'use client';
import { useState, useEffect } from 'react';
import { Plus, Minus, AlertTriangle, ExternalLink, Trash2, MessageCircle } from 'lucide-react';
import { StockItem } from '@/lib/types';
import { storage } from '@/lib/storage';
import { useApp } from '@/context/AppContext';
import AddStockModal from '@/components/modals/AddStockModal';
import ConfirmDialog from '@/components/ConfirmDialog';

function StockCard({ item, onUpdateQty, onDelete }: {
  item: StockItem;
  onUpdateQty: (id: string, delta: number) => void;
  onDelete: (id: string) => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const isLow = item.quantity <= item.lowStockThreshold;
  const supplierMsg = encodeURIComponent(`السلام علیکم! ${item.name} کم ہو گیا ہے، براہ کرم جلد بھیجیں۔`);
  const waUrl = `https://wa.me/?text=${supplierMsg}`;

  return (
    <>
      <div className={`bg-white rounded-2xl p-4 lg:p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
        isLow
          ? 'ring-1 ring-red-200 bg-red-50/20 hover:shadow-red-100'
          : 'ring-1 ring-black/[0.06]'
      }`}>
        <div className="flex items-start justify-between gap-2 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-800 text-base lg:text-lg truncate">{item.name}</h3>
              {isLow && (
                <span className="shrink-0 bg-red-50 rounded-full p-0.5">
                  <AlertTriangle size={13} className="text-red-500" />
                </span>
              )}
            </div>
            <p className="text-gray-400 text-[11px] mt-0.5">اکائی: {item.unit} · حد: {item.lowStockThreshold}</p>
          </div>
          <button
            onClick={() => setConfirmDelete(true)}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-300 hover:text-red-400 hover:bg-red-50 active:scale-90 transition-all duration-150 shrink-0"
          >
            <Trash2 size={14} />
          </button>
        </div>

        {/* Quantity controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onUpdateQty(item.id, -1)}
              className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 active:scale-90 transition-all duration-150"
            >
              <Minus size={17} />
            </button>
            <div className="text-center min-w-[4rem]">
              <p className={`text-3xl font-black leading-none ${isLow ? 'text-red-600' : 'text-gray-800'}`}>
                {item.quantity}
              </p>
              <p className="text-gray-400 text-[11px] mt-0.5">{item.unit}</p>
            </div>
            <button
              onClick={() => onUpdateQty(item.id, 1)}
              className="w-10 h-10 rounded-xl bg-[#eef7f2] hover:bg-green-200 flex items-center justify-center text-[#1a7a4a] active:scale-90 transition-all duration-150"
            >
              <Plus size={17} />
            </button>
          </div>

          {isLow ? (
            <div className="flex gap-1.5">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center bg-[#25D366] text-white rounded-xl hover:bg-[#1ebe5d] active:scale-95 transition-all duration-150"
              >
                <MessageCircle size={14} />
              </a>
              <a
                href="https://www.tajirapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 bg-[#1a7a4a] text-white text-[11px] font-bold px-2.5 py-2 rounded-xl hover:bg-[#155f3a] active:scale-95 transition-all duration-150"
              >
                <ExternalLink size={12} />Tajir
              </a>
            </div>
          ) : (
            <span className="text-[#1a7a4a] text-xs font-semibold bg-[#eef7f2] px-2.5 py-1 rounded-full">موجود ✓</span>
          )}
        </div>
      </div>

      {confirmDelete && (
        <ConfirmDialog
          message="آئٹم حذف کریں؟"
          detail={`کیا آپ "${item.name}" کو فہرست سے نکالنا چاہتے ہیں؟`}
          confirmText="حذف کریں"
          cancelText="منسوخ"
          dangerous
          onConfirm={() => { onDelete(item.id); setConfirmDelete(false); }}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </>
  );
}

export default function StockTab() {
  const { toast } = useApp();
  const [items, setItems] = useState<StockItem[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => { setItems(storage.getStock()); }, []);

  const save = (data: StockItem[]) => { setItems(data); storage.saveStock(data); };
  const addItem = (item: StockItem) => { save([...items, item]); toast('آئٹم شامل کر دیا گیا ✓'); };
  const remove = (id: string) => { save(items.filter(i => i.id !== id)); toast('آئٹم حذف ہو گیا', 'error'); };
  const updateQty = (id: string, delta: number) => {
    save(items.map(i => i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i));
  };

  const sorted = [...items].sort((a, b) => {
    const aLow = a.quantity <= a.lowStockThreshold;
    const bLow = b.quantity <= b.lowStockThreshold;
    if (aLow && !bLow) return -1;
    if (!aLow && bLow) return 1;
    return a.name.localeCompare(b.name, 'ur');
  });

  const lowCount = items.filter(i => i.quantity <= i.lowStockThreshold).length;

  return (
    <div className="px-4 sm:px-6 lg:px-8 xl:px-10 py-6 max-w-7xl mx-auto">

      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-gray-900">اسٹاک</h1>
          {lowCount > 0 && (
            <p className="text-red-500 text-sm font-semibold mt-1 flex items-center gap-1">
              <AlertTriangle size={13} />{lowCount} آئٹم کم
            </p>
          )}
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#1a7a4a] text-white font-bold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-900/20 hover:bg-[#155f3a] hover:shadow-lg hover:shadow-emerald-900/25 active:scale-95 transition-all duration-150 shrink-0"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">آئٹم شامل کریں</span>
          <span className="sm:hidden">شامل</span>
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl ring-1 ring-black/[0.06] shadow-sm">
          <p className="text-5xl mb-4">📦</p>
          <p className="font-black text-gray-700 text-lg">اسٹاک فہرست خالی ہے</p>
          <p className="text-gray-400 mt-1.5 text-sm">پہلا آئٹم شامل کریں اور اپنا اسٹاک ٹریک کریں</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {sorted.map(item => (
            <StockCard key={item.id} item={item} onUpdateQty={updateQty} onDelete={remove} />
          ))}
        </div>
      )}

      {showModal && <AddStockModal onClose={() => setShowModal(false)} onAdd={addItem} />}
    </div>
  );
}
