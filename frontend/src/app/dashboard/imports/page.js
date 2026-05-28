'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import {
  ArrowDownToLine, Plus, Search, Filter, RefreshCw,
  Eye, Trash2, ChevronLeft, ChevronRight, TrendingDown,
  Truck, CheckCircle2, XCircle, Clock, Package, AlertCircle
} from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

// ─── Status config ────────────────────────────────────────────
const STATUS_MAP = {
  IN_TRANSIT:  { label: 'Đang vận chuyển', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30',    icon: Truck },
  ARRIVED:     { label: 'Đã về kho',        color: 'bg-amber-500/15 text-amber-400 border-amber-500/30', icon: Package },
  INSPECTING:  { label: 'Đang kiểm tra',    color: 'bg-purple-500/15 text-purple-400 border-purple-500/30', icon: Clock },
  COMPLETED:   { label: 'Hoàn tất',         color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', icon: CheckCircle2 },
  CANCELLED:   { label: 'Đã huỷ',           color: 'bg-red-500/15 text-red-400 border-red-500/30',       icon: XCircle },
};

function StatusBadge({ status }) {
  const cfg = STATUS_MAP[status] || { label: status, color: 'bg-slate-500/15 text-slate-400 border-slate-500/30', icon: AlertCircle };
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${cfg.color}`}>
      <Icon className="h-3 w-3" />
      {cfg.label}
    </span>
  );
}

function formatCurrency(n) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n || 0);
}

export default function ImportsPage() {
  const router = useRouter();
  const { token, user } = useAuthStore();

  const [receipts, setReceipts]   = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 15, total_pages: 1 });
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');

  // Filters
  const [search, setSearch]     = useState('');
  const [status, setStatus]     = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate]     = useState('');
  const [page, setPage]         = useState(1);

  // Stats
  const [stats, setStats] = useState(null);

  // ── fetch list ─────────────────────────────────────────────
  const fetchReceipts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({
        page, limit: 15,
        ...(search   && { search }),
        ...(status   && { status }),
        ...(fromDate && { from_date: fromDate }),
        ...(toDate   && { to_date: toDate }),
      });
      const res = await fetch(`${API}/api/imports?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Lỗi tải danh sách');
      const data = await res.json();
      setReceipts(data.data || []);
      setPagination(data.pagination || {});
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [token, page, search, status, fromDate, toDate]);

  // ── fetch stats ────────────────────────────────────────────
  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/imports/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setStats(await res.json());
    } catch (_) {}
  }, [token]);

  useEffect(() => { fetchReceipts(); fetchStats(); }, [fetchReceipts, fetchStats]);

  // reset page khi filter thay đổi
  const applyFilter = () => { setPage(1); fetchReceipts(); };

  // ── delete ─────────────────────────────────────────────────
  const handleDelete = async (id, code) => {
    if (!confirm(`Xoá phiếu nhập ${code}?`)) return;
    try {
      const res = await fetch(`${API}/api/imports/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error); }
      fetchReceipts();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Page Header ────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-600/30">
            <ArrowDownToLine className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Phiếu nhập kho</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {pagination.total} phiếu nhập
            </p>
          </div>
        </div>
        <Link
          href="/dashboard/imports/new"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 active:bg-indigo-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Tạo phiếu nhập
        </Link>
      </div>

      {/* ── Stats Cards ─────────────────────────────────────── */}
      {stats && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Object.entries(STATUS_MAP).map(([key, cfg]) => {
            const found = stats.by_status?.find((b) => b.status === key);
            const Icon = cfg.icon;
            return (
              <button
                key={key}
                onClick={() => { setStatus(key === status ? '' : key); setPage(1); }}
                className={`group flex flex-col gap-1.5 rounded-xl border p-4 text-left transition-all hover:scale-[1.02] cursor-pointer
                  ${status === key
                    ? 'border-indigo-500 bg-indigo-600/10 ring-1 ring-indigo-500/40'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`h-4 w-4 ${status === key ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span className={`text-xs font-bold ${status === key ? 'text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`}>
                    {found?.count || 0}
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-tight">{cfg.label}</p>
              </button>
            );
          })}
        </div>
      )}

      {/* ── Filters ─────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm mã phiếu, nhà cung cấp..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && applyFilter()}
            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        {/* From Date */}
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          title="Từ ngày"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          title="Đến ngày"
        />
        <button
          onClick={applyFilter}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
        >
          <Filter className="h-4 w-4" />
          Lọc
        </button>
        {(search || status || fromDate || toDate) && (
          <button
            onClick={() => { setSearch(''); setStatus(''); setFromDate(''); setToDate(''); setPage(1); }}
            className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Xoá lọc
          </button>
        )}
      </div>

      {/* ── Error ───────────────────────────────────────────── */}
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* ── Table ───────────────────────────────────────────── */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Mã phiếu</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Nhà cung cấp</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Ngày nhập</th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">SP</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Tổng tiền</th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Trạng thái</th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : receipts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <ArrowDownToLine className="mx-auto h-10 w-10 text-slate-300 dark:text-slate-700 mb-3" />
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Không có phiếu nhập nào</p>
                    <p className="text-xs text-slate-400 dark:text-slate-600 mt-1">Thử thay đổi bộ lọc hoặc tạo phiếu mới</p>
                  </td>
                </tr>
              ) : (
                receipts.map((r) => (
                  <tr
                    key={r.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                  >
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                        {r.receipt_code}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-slate-800 dark:text-slate-200">{r.supplier_name}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{r.import_date}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:text-slate-400">
                        {r.items_count}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-800 dark:text-slate-200">
                      {formatCurrency(r.total_amount)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/dashboard/imports/${r.id}`}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                          title="Xem chi tiết"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        {user?.role === 'admin' && ['IN_TRANSIT', 'CANCELLED'].includes(r.status) && (
                          <button
                            onClick={() => handleDelete(r.id, r.receipt_code)}
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-500 transition-colors"
                            title="Xoá phiếu"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ──────────────────────────────────────── */}
        {pagination.total_pages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 px-4 py-3">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Trang {pagination.page} / {pagination.total_pages} — {pagination.total} phiếu
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={pagination.page <= 1}
                className="rounded-lg border border-slate-200 dark:border-slate-700 p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(pagination.total_pages, p + 1))}
                disabled={pagination.page >= pagination.total_pages}
                className="rounded-lg border border-slate-200 dark:border-slate-700 p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
