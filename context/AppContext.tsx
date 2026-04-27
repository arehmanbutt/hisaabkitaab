'use client';
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { ShopInfo } from '@/lib/types';
import { storage } from '@/lib/storage';
import { seedShopInfo } from '@/lib/seedData';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error';
}

interface AppCtx {
  shopInfo: ShopInfo;
  isLoading: boolean;
  saveShopInfo: (info: ShopInfo) => void;
  logout: () => void;
  toasts: Toast[];
  toast: (message: string, type?: 'success' | 'error') => void;
}

const AppContext = createContext<AppCtx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [shopInfo, setShopInfo] = useState<ShopInfo>(seedShopInfo);
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    setShopInfo(storage.getShopInfo());
    setIsLoading(false);
  }, []);

  const saveShopInfo = useCallback((info: ShopInfo) => {
    storage.saveShopInfo(info);
    setShopInfo(info);
  }, []);

  const logout = useCallback(() => {
    if (typeof window !== 'undefined') localStorage.clear();
    setShopInfo(seedShopInfo);
  }, []);

  const toast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  return (
    <AppContext.Provider value={{ shopInfo, isLoading, saveShopInfo, logout, toasts, toast }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
}
