'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuthStore } from '@/store/useAuthStore';
import { Lock, User, Eye, EyeOff, LogIn, AlertTriangle } from 'lucide-react';

// Form validation schema using Zod
const loginSchema = z.object({
  username: z.string().min(3, 'Tên đăng nhập phải chứa ít nhất 3 ký tự'),
  password: z.string().min(5, 'Mật khẩu phải chứa ít nhất 5 ký tự'),
});

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const result = await login(data.username, data.password);
      if (result.success) {
        router.push('/dashboard');
      } else {
        setErrorMsg(result.message);
      }
    } catch (err) {
      setErrorMsg('Đăng nhập thất bại. Vui lòng kiểm tra lại kết nối mạng.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">
      {/* Dynamic Background Glowing Circles */}
      <div className="absolute top-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-violet-600/20 blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-blue-600/20 blur-[100px] animate-pulse delay-700"></div>

      {/* Glassmorphic Container */}
      <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-slate-700/80">
        
        {/* Header/Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-blue-500 shadow-lg shadow-violet-500/20">
            <LogIn className="h-7 w-7 text-white" />
          </div>
          <h1 className="bg-gradient-to-r from-violet-400 via-blue-400 to-teal-300 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
            WMS & LOGISTICS
          </h1>
          <p className="mt-1.5 text-sm text-slate-400">
            Đăng nhập để vào hệ thống quản lý kho hàng
          </p>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mb-6 flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 p-3.5 text-sm text-red-400 animate-shake">
            <AlertTriangle className="h-5 w-5 shrink-0 text-red-500" />
            <p className="font-medium leading-5">{errorMsg}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Tên đăng nhập
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <User className="h-4.5 w-4.5" />
              </span>
              <input
                {...register('username')}
                type="text"
                autoComplete="username"
                placeholder="Nhập tên đăng nhập (ví dụ: admin)"
                className="w-full rounded-lg border border-slate-800 bg-slate-950/80 py-2.5 pr-3 pl-10 text-sm text-slate-200 placeholder-slate-600 transition-all duration-200 focus:border-violet-500/80 focus:ring-1 focus:ring-violet-500/50 focus:outline-none"
              />
            </div>
            {errors.username && (
              <p className="text-xs text-red-400 font-medium">{errors.username.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Mật khẩu
              </label>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <Lock className="h-4.5 w-4.5" />
              </span>
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Nhập mật khẩu (ví dụ: admin123)"
                className="w-full rounded-lg border border-slate-800 bg-slate-950/80 py-2.5 pr-10 pl-10 text-sm text-slate-200 placeholder-slate-600 transition-all duration-200 focus:border-violet-500/80 focus:ring-1 focus:ring-violet-500/50 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-400 font-medium">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || authLoading}
            className="group relative flex w-full justify-center rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:from-violet-500 hover:to-blue-500 hover:shadow-lg hover:shadow-violet-500/25 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
          >
            {loading || authLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span>Đang kiểm tra...</span>
              </div>
            ) : (
              <span className="flex items-center gap-1.5">
                Đăng nhập
                <LogIn className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            )}
          </button>
        </form>

        {/* Demo Accounts Information Footer */}
        <div className="mt-8 rounded-lg bg-slate-950/40 p-4 border border-slate-800/40 text-center text-xs text-slate-500">
          <p className="font-semibold text-slate-400 mb-1.5">Tài khoản demo kiểm thử:</p>
          <div className="flex flex-col gap-1 text-[11px]">
            <p>🔑 Admin: <span className="text-violet-400 font-medium font-mono">admin</span> / <span className="text-violet-400 font-mono">admin123</span></p>
            <p>🔑 Staff: <span className="text-blue-400 font-medium font-mono">nhanvien1</span> / <span className="text-blue-400 font-mono">nhanvien123</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
