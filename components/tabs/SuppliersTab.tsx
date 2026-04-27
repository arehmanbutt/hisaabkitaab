'use client';
import { useState, useEffect } from 'react';
import { Plus, MessageCircle, Phone, ExternalLink, Trash2, Tag } from 'lucide-react';
import { Supplier } from '@/lib/types';
import { storage } from '@/lib/storage';
import { useApp } from '@/context/AppContext';
import AddSupplierModal from '@/components/modals/AddSupplierModal';
import ConfirmDialog from '@/components/ConfirmDialog';

function SupplierCard({ supplier, onDelete }: { supplier: Supplier; onDelete: (id: string) => void }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const waUrl = `https://wa.me/92${supplier.phone.replace(/^0/, '')}`;
  const telUrl = `tel:+92${supplier.phone.replace(/^0/, '')}`;

  return (
    <>
      <div className="bg-white rounded-2xl p-4 lg:p-5 ring-1 ring-black/[0.06] shadow-sm flex flex-col h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-start justify-between gap-3 flex-1">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-800 text-base lg:text-lg">{supplier.name}</h3>
            {supplier.category && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <Tag size={11} className="text-[#1a7a4a] shrink-0" />
                <span className="text-[#1a7a4a] text-xs font-bold bg-[#eef7f2] px-2.5 py-0.5 rounded-full">{supplier.category}</span>
              </div>
            )}
            <p className="text-gray-500 text-sm mt-2">{supplier.supplies}</p>
            <p className="text-gray-400 text-xs mt-1">{supplier.phone}</p>
          </div>
          <button
            onClick={() => setConfirmDelete(true)}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-300 hover:text-red-400 hover:bg-red-50 active:scale-90 transition-all duration-150 shrink-0"
          >
            <Trash2 size={15} />
          </button>
        </div>
        <div className="flex gap-2 mt-4">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#1ebe5d] active:scale-95 transition-all duration-150"
          >
            <MessageCircle size={14} />واٹس ایپ
          </a>
          <a
            href={telUrl}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-50 text-blue-600 text-xs font-bold hover:bg-blue-100 active:scale-95 transition-all duration-150"
          >
            <Phone size={14} />کال
          </a>
        </div>
      </div>

      {confirmDelete && (
        <ConfirmDialog
          message="سپلائر حذف کریں؟"
          detail={`کیا آپ ${supplier.name} کو فہرست سے نکالنا چاہتے ہیں؟`}
          confirmText="حذف کریں"
          cancelText="منسوخ"
          dangerous
          onConfirm={() => { onDelete(supplier.id); setConfirmDelete(false); }}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </>
  );
}

export default function SuppliersTab() {
  const { toast } = useApp();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => { setSuppliers(storage.getSuppliers()); }, []);

  const save = (data: Supplier[]) => { setSuppliers(data); storage.saveSuppliers(data); };
  const addSupplier = (s: Supplier) => { save([...suppliers, s]); toast('سپلائر شامل کر دیا گیا ✓'); };
  const remove = (id: string) => { save(suppliers.filter(s => s.id !== id)); toast('سپلائر حذف ہو گیا', 'error'); };

  return (
    <div className="px-4 sm:px-6 lg:px-8 xl:px-10 py-6 max-w-7xl mx-auto">

      {/* Tajir Banner */}
      <a
        href="https://www.tajirapp.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between bg-gradient-to-br from-[#1a7a4a] to-[#155f3a] rounded-2xl p-5 lg:p-6 mb-6 shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:shadow-emerald-900/25 hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200 group"
      >
        <div>
          <p className="text-white font-black text-lg">Tajir پر آرڈر کریں</p>
          <p className="text-green-200/80 text-sm mt-1">بہترین قیمتوں پر تھوک مال منگوائیں</p>
        </div>
        <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center group-hover:bg-white/25 transition-colors duration-200">
          <ExternalLink size={20} className="text-white" />
        </div>
      </a>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl lg:text-3xl font-black text-gray-900">سپلائرز</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#1a7a4a] text-white font-bold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-900/20 hover:bg-[#155f3a] hover:shadow-lg hover:shadow-emerald-900/25 active:scale-95 transition-all duration-150"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">سپلائر شامل کریں</span>
          <span className="sm:hidden">شامل</span>
        </button>
      </div>

      {suppliers.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl ring-1 ring-black/[0.06] shadow-sm">
          <p className="text-5xl mb-4">🚚</p>
          <p className="font-black text-gray-700 text-lg">کوئی سپلائر نہیں</p>
          <p className="text-gray-400 mt-1.5 text-sm">اپنے سپلائرز کی فہرست بنائیں</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {suppliers.map(s => (
            <SupplierCard key={s.id} supplier={s} onDelete={remove} />
          ))}
        </div>
      )}

      {showModal && <AddSupplierModal onClose={() => setShowModal(false)} onAdd={addSupplier} />}
    </div>
  );
}
