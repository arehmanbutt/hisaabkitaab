'use client';
import { AlertTriangle } from 'lucide-react';

interface Props {
  message: string;
  detail?: string;
  confirmText?: string;
  cancelText?: string;
  dangerous?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  message,
  detail,
  confirmText = 'ہاں',
  cancelText = 'نہیں',
  dangerous = false,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[6px]" onClick={onCancel} />
      <div className="relative w-full max-w-xs bg-white rounded-3xl shadow-2xl animate-scaleIn p-6 text-center">
        {dangerous && (
          <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={26} className="text-red-500" />
          </div>
        )}
        <p className="font-black text-gray-900 text-base">{message}</p>
        {detail && <p className="text-gray-400 text-sm mt-2 leading-relaxed">{detail}</p>}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl bg-gray-50 text-gray-600 text-sm font-semibold hover:bg-gray-100 active:scale-95 transition-all duration-150"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-3 rounded-xl text-white text-sm font-bold active:scale-95 transition-all duration-150 ${
              dangerous
                ? 'bg-red-500 hover:bg-red-600 shadow-md shadow-red-200'
                : 'bg-[#1a7a4a] hover:bg-[#155f3a] shadow-md shadow-emerald-900/20'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
