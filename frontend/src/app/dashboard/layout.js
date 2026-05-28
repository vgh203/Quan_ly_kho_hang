'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import { 
  LayoutDashboard, Package, LogOut, Menu, X, 
  User, Shield, UserCheck, Warehouse, MapPin, ClipboardList, TrendingUp
} from 'lucide-react';

export default function DashboardLayout({ children }) {
  const { isAuthenticated, isLoading, user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-500 border-t-transparent"></div>
          <p className="text-sm font-medium tracking-wide text-slate-400">Đang xác thực quyền truy cập...</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    {
      name: 'Trang tổng quan',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Quản lý sản phẩm',
      href: '/dashboard/products',
      icon: Package,
    },
    {
      name: 'Nhà cung cấp & Bản đồ',
      href: '/dashboard/suppliers',
      icon: MapPin,
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      {/* Sidebar - Desktop Layout */}
      <aside className="hidden w-64 border-r border-slate-900 bg-slate-950/80 backdrop-blur-xl p-6 md:flex md:flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* Logo Brand */}
          <div className="flex items-center gap-2.5 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-600 to-blue-500 shadow-md">
              <Warehouse className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-white block text-sm">WMS LOGISTICS</span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Hệ thống quản lý kho</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-violet-600/10 text-violet-400 border border-violet-500/20'
                      : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User profile footer in Sidebar */}
        <div className="border-t border-slate-900 pt-4 mt-auto">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-300">
              <User className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-slate-200">{user?.full_name}</p>
              <span className={`inline-block text-[9px] font-bold uppercase tracking-wider ${
                user?.role === 'admin' ? 'text-violet-400' : 'text-blue-400'
              }`}>
                {user?.role}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-red-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut className="h-4.5 w-4.5" />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Sidebar - Mobile Layout */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden bg-slate-950/80 backdrop-blur-sm">
          <aside className="w-64 border-r border-slate-900 bg-slate-950 p-6 flex flex-col justify-between animate-slide-in">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 px-1">
                  <Warehouse className="h-5 w-5 text-violet-500" />
                  <span className="font-bold text-white text-sm">WMS KHO HÀNG</span>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-900 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="space-y-1.5">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-violet-600/10 text-violet-400 border border-violet-500/20'
                          : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
                      }`}
                    >
                      <Icon className="h-4.5 w-4.5" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="border-t border-slate-900 pt-4 mt-auto">
              <div className="flex items-center gap-3 px-2 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                  <User className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-slate-200">{user?.full_name}</p>
                  <span className="text-[10px] font-medium text-slate-500 uppercase">{user?.role}</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300"
              >
                <LogOut className="h-4.5 w-4.5" />
                Đăng xuất
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar Header */}
        <header className="flex h-16 items-center justify-between border-b border-slate-900 bg-slate-950/60 backdrop-blur-md px-6 shrink-0">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-900 hover:text-white md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 hidden sm:inline-block">
              Chi nhánh:
            </span>
            <span className="text-xs font-medium bg-slate-900 border border-slate-800/80 px-2 py-1 rounded text-slate-300">
              Tổng kho Bách Hóa Xanh
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span className="hidden sm:inline">{user?.full_name}</span>
            </div>
          </div>
        </header>

        {/* Dynamic Pages viewport */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
