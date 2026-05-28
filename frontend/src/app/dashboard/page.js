'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { LogOut, User, Shield, Mail, Calendar } from 'lucide-react';

export default function DashboardPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Top Banner Welcome Panel */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-violet-950/40 p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-violet-500/10 blur-2xl"></div>
        
        <div className="relative flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              Chào mừng trở lại, {user.full_name}!
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Bạn đang đăng nhập vào hệ thống quản lý kho hàng WMS & Vận chuyển.
            </p>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition-all duration-200 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/25 active:scale-[0.98]"
          >
            <LogOut className="h-4 w-4" />
            Đăng xuất
          </button>
        </div>
      </div>

      {/* Profile Detail Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* User Card */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-md">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <User className="h-4 w-4 text-violet-400" />
            Thông tin tài khoản
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <span className="text-sm text-slate-400">Tên đăng nhập:</span>
              <span className="text-sm font-semibold text-slate-200">{user.username}</span>
            </div>
            
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <span className="text-sm text-slate-400">Họ và tên:</span>
              <span className="text-sm font-semibold text-slate-200">{user.full_name}</span>
            </div>

            <div className="flex items-center justify-between pb-2">
              <span className="text-sm text-slate-400">Email liên hệ:</span>
              <span className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-slate-500" />
                {user.email || 'Chưa cập nhật'}
              </span>
            </div>
          </div>
        </div>

        {/* Roles and System Info */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-md">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-400" />
            Phân quyền hệ thống
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <span className="text-sm text-slate-400">Vai trò chính:</span>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide shadow-sm ${
                user.role === 'admin' 
                  ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' 
                  : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
              }`}>
                {user.role}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Trạng thái hoạt động:</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400">
                <span className="h-2 w-2 rounded-full bg-teal-400 animate-ping"></span>
                Đang trực tuyến
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
