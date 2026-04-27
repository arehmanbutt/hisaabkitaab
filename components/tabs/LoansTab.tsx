"use client";
import { useState, useEffect } from "react";
import {
  Plus,
  MessageCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Clock,
  Trash2,
  FileText,
} from "lucide-react";
import { Loan } from "@/lib/types";
import { storage } from "@/lib/storage";
import { useApp } from "@/context/AppContext";
import AddLoanModal from "@/components/modals/AddLoanModal";
import ConfirmDialog from "@/components/ConfirmDialog";

function getDaysDiff(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(dateStr);
  d.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - today.getTime()) / 86400000);
}
function fmt(n: number) {
  return n.toLocaleString("ur-PK");
}

function LoanCard({
  loan,
  onPaid,
  onDelete,
}: {
  loan: Loan;
  onPaid: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const { shopInfo } = useApp();
  const diff = getDaysDiff(loan.reminderDate);
  const isOverdue = diff < 0;
  const isDueToday = diff === 0;
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const waMsg = encodeURIComponent(
    `السلام علیکم! ${shopInfo.shopName} کی طرف سے یاد دہانی: آپ کے ذمہ ₨${loan.amount} روپے باقی ہیں۔ براہ کرم جلد دے دیں۔ شکریہ 🙏\n- ${shopInfo.ownerName}، ${shopInfo.shopName}`,
  );
  const waUrl = `https://wa.me/92${loan.phone.replace(/^0/, "")}?text=${waMsg}`;

  return (
    <>
      <div
        className={`bg-white rounded-2xl p-4 lg:p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
          isOverdue
            ? "ring-1 ring-red-200 bg-red-50/20 hover:shadow-red-100"
            : "ring-1 ring-black/[0.06]"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-800 text-base lg:text-lg">
              {loan.customerName}
            </h3>
            <p className="text-gray-400 text-xs mt-0.5">{loan.phone}</p>
            {loan.note && (
              <div className="flex items-center gap-1.5 mt-2 bg-gray-50 rounded-lg px-2 py-1.5">
                <FileText size={11} className="text-gray-400 shrink-0" />
                <p className="text-gray-500 text-xs">{loan.note}</p>
              </div>
            )}
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <p className="font-black text-[#1a7a4a] text-xl leading-none">
              ₨{fmt(loan.amount)}
            </p>
            {isDueToday ? (
              <span className="inline-flex items-center gap-1 text-amber-600 text-xs font-semibold bg-amber-50 px-2 py-0.5 rounded-full">
                <Clock size={10} />
                آج دینا ہے
              </span>
            ) : !isOverdue ? (
              <span className="text-gray-400 text-xs">باقی {diff} دن</span>
            ) : null}
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#1ebe5d] active:scale-95 transition-all duration-150"
          >
            <MessageCircle size={14} />
            واٹس ایپ
          </a>
          <button
            onClick={() => setConfirmPaid(true)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#eef7f2] text-[#1a7a4a] text-xs font-bold hover:bg-green-100 active:scale-95 transition-all duration-150"
          >
            <CheckCircle2 size={14} />
            ادا ہو گیا
          </button>
          <button
            onClick={() => setConfirmDelete(true)}
            className="w-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-300 hover:bg-red-50 hover:text-red-400 active:scale-95 transition-all duration-150"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {confirmPaid && (
        <ConfirmDialog
          message="ادائیگی کی تصدیق"
          detail={`کیا ${loan.customerName} نے ₨${fmt(loan.amount)} ادا کر دیے؟`}
          confirmText="ہاں، ادا ہو گیا"
          cancelText="نہیں"
          onConfirm={() => {
            onPaid(loan.id);
            setConfirmPaid(false);
          }}
          onCancel={() => setConfirmPaid(false)}
        />
      )}
      {confirmDelete && (
        <ConfirmDialog
          message="ادھار حذف کریں؟"
          detail="یہ ریکارڈ ہمیشہ کے لیے مٹ جائے گا۔"
          confirmText="حذف کریں"
          cancelText="منسوخ"
          dangerous
          onConfirm={() => {
            onDelete(loan.id);
            setConfirmDelete(false);
          }}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </>
  );
}

export default function LoansTab() {
  const { toast } = useApp();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showSettled, setShowSettled] = useState(false);

  useEffect(() => {
    setLoans(storage.getLoans());
  }, []);

  const save = (updated: Loan[]) => {
    setLoans(updated);
    storage.saveLoans(updated);
  };

  const addLoan = (loan: Loan) => {
    save([loan, ...loans]);
    toast("قرض شامل کر دیا گیا ✓");
  };
  const markPaid = (id: string) => {
    save(
      loans.map((l) =>
        l.id === id
          ? { ...l, settled: true, settledAt: new Date().toISOString() }
          : l,
      ),
    );
    toast("ادائیگی ہو گئی ✓");
  };
  const deleteLoan = (id: string) => {
    save(loans.filter((l) => l.id !== id));
    toast("ریکارڈ حذف ہو گیا", "error");
  };

  const active = loans
    .filter((l) => !l.settled)
    .sort((a, b) => {
      const da = getDaysDiff(a.reminderDate),
        db = getDaysDiff(b.reminderDate);
      if (da < 0 && db >= 0) return -1;
      if (da >= 0 && db < 0) return 1;
      return a.reminderDate.localeCompare(b.reminderDate);
    });

  const settled = loans.filter((l) => l.settled);
  const total = active.reduce((s, l) => s + l.amount, 0);
  const overdueCount = active.filter(
    (l) => getDaysDiff(l.reminderDate) < 0,
  ).length;

  return (
    <div className="px-4 sm:px-6 lg:px-8 xl:px-10 py-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-gray-900">
            قرض و ادھار
          </h1>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#1a7a4a] text-white font-bold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-900/20 hover:bg-[#155f3a] hover:shadow-lg hover:shadow-emerald-900/25 active:scale-95 transition-all duration-150 shrink-0"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">ادھار شامل کریں</span>
          <span className="sm:hidden">شامل</span>
        </button>
      </div>

      {/* Summary card */}
      <div className="bg-gradient-to-br from-[#1a7a4a] to-[#155f3a] rounded-2xl p-5 lg:p-6 mb-6 text-white shadow-lg shadow-emerald-900/25">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-green-200 text-[11px] font-semibold uppercase tracking-widest">
              کل باقی رقم
            </p>
            <p className="text-4xl lg:text-5xl font-black mt-2 leading-none">
              ₨{fmt(total)}
            </p>
            <p className="text-green-200/80 text-sm mt-2">
              ادھار لینے والے افراد کی تعداد :{active.length}
            </p>
          </div>
        </div>
      </div>

      {/* Loan cards grid */}
      {active.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl ring-1 ring-black/[0.06] shadow-sm">
          <p className="text-5xl mb-4">📋</p>
          <p className="font-black text-gray-700 text-lg">کوئی ادھار نہیں</p>
          <p className="text-gray-400 mt-1.5 text-sm">
            نیا ادھار شامل کرنے کے لیے بٹن دبائیں
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {active.map((loan) => (
            <LoanCard
              key={loan.id}
              loan={loan}
              onPaid={markPaid}
              onDelete={deleteLoan}
            />
          ))}
        </div>
      )}

      {/* Settled section */}
      {settled.length > 0 && (
        <div className="mt-6">
          <button
            onClick={() => setShowSettled((v) => !v)}
            className="flex items-center gap-2 text-gray-500 text-sm font-bold w-full py-3 px-4 bg-white rounded-xl ring-1 ring-black/[0.06] hover:bg-gray-50 transition-colors duration-150 shadow-sm"
          >
            {showSettled ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            ادا شدہ ادھار ({settled.length})
          </button>
          {showSettled && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 mt-3">
              {settled.map((loan) => (
                <div
                  key={loan.id}
                  className="bg-white rounded-2xl p-4 ring-1 ring-black/[0.04] opacity-50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-700 text-sm">
                        {loan.customerName}
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        {loan.phone}
                      </p>
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-gray-400 line-through text-sm">
                        ₨{fmt(loan.amount)}
                      </p>
                      <span className="text-[#1a7a4a] text-xs font-bold">
                        ادا ✓
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showModal && (
        <AddLoanModal onClose={() => setShowModal(false)} onAdd={addLoan} />
      )}
    </div>
  );
}
