'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import { 
  LayoutDashboard, Package, LogOut, Menu, X, Sun, Moon,
  User, Shield, UserCheck, Warehouse, MapPin, ClipboardList, TrendingUp, ChevronDown,
  ArrowDownToLine, ArrowUpFromLine
} from 'lucide-react';

export default function DashboardLayout({ children }) {
  const { isAuthenticated, isLoading, user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load and apply initial theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Theme toggler
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

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
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
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
    {
      name: 'Phiếu nhập kho',
      href: '/dashboard/imports',
      icon: ArrowDownToLine,
    },
    {
      name: 'Phiếu xuất kho',
      href: '/dashboard/exports',
      icon: ArrowUpFromLine,
    },
  ];

  if (user?.role === 'admin') {
    menuItems.push({
      name: 'Phân quyền người dùng',
      href: '/dashboard/users',
      icon: UserCheck,
    });
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      
      {/* Sidebar - Desktop Layout */}
      <aside className="hidden w-64 border-r border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950/80 backdrop-blur-xl p-6 md:flex md:flex-col justify-between shrink-0 print:hidden">
        <div className="space-y-6">
          {/* Logo Brand */}
          <div className="flex items-center gap-2.5 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 shadow-md">
              <Warehouse className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-slate-900 dark:text-white block text-sm">WMS LOGISTICS</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">Hệ thống quản lý kho</span>
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
                      ? 'bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/60 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User profile footer in Sidebar removed to top right */}
      </aside>

      {/* Sidebar - Mobile Layout */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden bg-slate-950/40 dark:bg-slate-950/80 backdrop-blur-sm print:hidden">
          <aside className="w-64 border-r border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950 p-6 flex flex-col justify-between animate-slide-in text-slate-900 dark:text-slate-100">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 px-1">
                  <Warehouse className="h-5 w-5 text-indigo-500" />
                  <span className="font-bold text-slate-900 dark:text-white text-sm">WMS KHO HÀNG</span>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
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
                          ? 'bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/60 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      <Icon className="h-4.5 w-4.5" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* User profile footer in Sidebar removed to top right */}
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar Header */}
        <header className="flex h-16 items-center justify-between border-b border-slate-200 dark:border-slate-900 bg-white/80 dark:bg-slate-950/60 backdrop-blur-md px-6 shrink-0 no-print">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-lg p-1.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 hidden sm:inline-block">
              Chi nhánh:
            </span>
            <span className="text-xs font-medium bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 px-2.5 py-1 rounded text-slate-700 dark:text-slate-300">
              Tổng kho Bách Hóa Xanh
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle Switch */}
            <button
              onClick={toggleTheme}
              className="rounded-lg p-1.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Chuyển đổi giao diện sáng/tối"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-amber-400" />
              ) : (
                <Moon className="h-5 w-5 text-slate-600" />
              )}
            </button>

            {/* Profile Dropdown */}
            <div ref={dropdownRef} className="relative border-l border-slate-200 dark:border-slate-800 pl-4">
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-lg p-1 text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white shadow-sm">
                  {user?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span className="hidden text-sm font-semibold text-slate-700 dark:text-slate-300 md:block">
                  {user?.full_name}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-2 shadow-xl animate-fade-in z-50 text-slate-800 dark:text-slate-200">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-900">
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">Đang đăng nhập</p>
                    <p className="text-sm font-bold truncate text-slate-800 dark:text-slate-200 mt-0.5">{user?.full_name}</p>
                    <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mt-1">
                      {user?.role}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    Đăng xuất
                  </button>
                </div>
              )}
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
