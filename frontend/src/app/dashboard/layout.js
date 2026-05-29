'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Bell,
  ChevronDown,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  Maximize,
  Menu,
  Moon,
  Package,
  Sun,
  Truck,
  User,
  UserCheck,
  Warehouse,
  X,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function DashboardLayout({ children }) {
  const { isAuthenticated, isLoading, user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [alertCount, setAlertCount] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchAlerts = async () => {
      try {
        const { default: api } = await import('@/lib/api');
        const res = await api.get('/inventory/alerts');
        const summary = res.data.summary || {};
        setAlertCount((summary.low_stock_count || 0) + (summary.expired_count || 0));
      } catch (error) {
        console.error('Failed to fetch alerts:', error);
      }
    };

    fetchAlerts();
  }, [isAuthenticated]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-100 text-slate-700">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
          <p className="text-sm font-medium tracking-wide text-slate-500">Đang xác thực quyền truy cập...</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { name: 'Tổng quan', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Sản phẩm', href: '/dashboard/products', icon: Package },
    { name: 'Nhà cung cấp', href: '/dashboard/suppliers', icon: Truck },
    { name: 'Phiếu nhập', href: '/dashboard/imports', icon: ArrowDownToLine },
    { name: 'Phiếu xuất', href: '/dashboard/exports', icon: ArrowUpFromLine },
    { name: 'Tồn kho', href: '/dashboard/inventory', icon: Warehouse },
  ];

  if (user?.role === 'admin') {
    menuItems.splice(3, 0, {
      name: 'Người dùng',
      href: '/dashboard/users',
      icon: UserCheck,
    });
    menuItems.push(
      { name: 'Cảnh báo', href: '/dashboard/alerts', icon: Bell },
      { name: 'Đề xuất bổ sung hàng', href: '/dashboard/replenishments', icon: Lightbulb },
    );
  }

  const Sidebar = ({ mobile = false }) => (
    <aside
      className={`bg-gray-50 text-gray-700 shadow-xl print:hidden ${
        mobile
          ? 'h-screen w-64'
          : 'fixed left-0 top-0 z-40 hidden h-screen w-64 md:block'
      }`}
    >
      <div className="flex h-20 items-center justify-center border-b border-gray-200 bg-slate-600 px-4">
        <div className="flex items-center gap-2">
          <Package className="h-11 w-11 text-white" strokeWidth={2} />
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-white/90">Quản lý kho hàng</p>
            <p className="truncate text-[11px] font-medium uppercase tracking-wider text-white/60">
              Bách Hóa Xanh WMS
            </p>
          </div>
        </div>
      </div>

      <nav className="h-[calc(100vh-5rem)] space-y-1 overflow-y-auto px-3 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.href === '/dashboard'
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => mobile && setIsSidebarOpen(false)}
              className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-gray-200 text-cyan-600 shadow-md'
                  : 'text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm'
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" strokeWidth={2} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );

  return (
    <div className="min-h-screen wms-shell text-slate-900">
      <Sidebar />

      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 flex bg-black/50 md:hidden print:hidden">
          <Sidebar mobile />
          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="m-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white"
            aria-label="Đóng menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col md:ml-64">
        <header className="sticky top-0 z-30 h-20 border-b border-slate-700 bg-slate-800 text-white no-print">
          <div className="flex h-full items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="rounded-lg p-2 text-white/80 transition hover:bg-white/10 hover:text-white md:hidden"
                title="Mở sidebar"
              >
                <Menu className="h-6 w-6" strokeWidth={2} />
              </button>

              <div className="hidden items-center gap-2 rounded-full bg-slate-900/60 px-4 py-2 text-sm text-white/75 ring-1 ring-slate-600 sm:flex">
                <Warehouse className="h-4 w-4 text-cyan-300" />
                <span>Tổng kho Bách Hóa Xanh</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleFullscreen}
                className="rounded-lg p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                title="Toàn màn hình"
              >
                <Maximize className="h-5 w-5" strokeWidth={2} />
              </button>

              <button
                onClick={() => router.push('/dashboard')}
                className="relative rounded-lg p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                title="Cảnh báo kho"
              >
                <Bell className="h-5 w-5" strokeWidth={2} />
                {alertCount > 0 && (
                  <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white ring-2 ring-slate-800">
                    {alertCount > 9 ? '9+' : alertCount}
                  </span>
                )}
              </button>

              <button
                onClick={toggleTheme}
                className="rounded-lg p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                title="Chuyển đổi giao diện"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-amber-300" strokeWidth={2} />
                ) : (
                  <Moon className="h-5 w-5" strokeWidth={2} />
                )}
              </button>

              <div ref={dropdownRef} className="relative ml-2">
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-white/10"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500 text-sm font-bold text-white">
                    {user?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="hidden max-w-40 truncate text-sm font-semibold text-white md:block">
                    {user?.full_name}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-white/70 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    strokeWidth={2}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 overflow-hidden rounded-xl border border-gray-100 bg-white py-2 text-gray-700 shadow-xl">
                    <div className="border-b border-gray-100 px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Đang đăng nhập</p>
                      <p className="mt-1 truncate text-sm font-bold text-slate-800">{user?.full_name}</p>
                      <span className="mt-1 inline-flex items-center gap-1 rounded bg-cyan-50 px-2 py-0.5 text-[10px] font-bold uppercase text-cyan-700">
                        <User className="h-3 w-3" />
                        {user?.role}
                      </span>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-600 transition hover:bg-gray-50"
                    >
                      <LogOut className="h-4 w-4" strokeWidth={2} />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="min-w-0 flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
