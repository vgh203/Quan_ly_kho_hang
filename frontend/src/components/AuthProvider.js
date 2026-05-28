'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

export default function AuthProvider({ children }) {
  const initialize = useAuthStore((state) => state.initialize);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    initialize();
    setMounted(true);
  }, [initialize]);

  // Prevent flash of unstyled content or hydration mismatch
  if (!mounted) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-500 border-t-transparent"></div>
          <p className="text-sm font-medium tracking-wide text-slate-400">Đang tải cấu hình...</p>
        </div>
      </div>
    );
  }

  return children;
}
