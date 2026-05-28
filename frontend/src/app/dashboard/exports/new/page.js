'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import {
  ArrowUpFromLine, ArrowLeft, Plus, Trash2, Save,
  Package, Building2, Calendar, FileText, AlertCircle,
  Search, ChevronDown, X, User, MapPin, Loader2
} from 'lucide-react';

import api from '@/lib/api';
// ─── Blank detail row ─────────────────────────────────────────
const blankDetail = () => ({
  _key: Math.random(),
  product_id: '',
  product_name: '',
  product_code: '',
  unit: '',
  quantity: '',
  selling_price: '',
  import_detail_id: '',
  max_qty: 0,
});

// ─── Product Search (SELL/DISPOSE/INTERNAL) ───────────────────
function SellableProductSearch({ value, onSelect, supplierId }) {
  const { token } = useAuthStore();
  const [query, setQuery]     = useState(value?.name || '');
  const [results, setResults] = useState([]);
  const [open, setOpen]       = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (value?.name) setQuery(value.name);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const search = async (q) => {
    setQuery(q);
    setLoading(true);
    try {
      let url = `/products?search=${encodeURIComponent(q)}&limit=8`;
      if (supplierId) url += `&supplier_id=${supplierId}`;
      const res = await api.get(url);
      const data = res.data;
      const list = Array.isArray(data) ? data : (data.data || []);
      setResults(list);
      setOpen(true);
    } catch (_) {}
    setLoading(false);
  };

  const handleSelect = async (p) => {
    setQuery(p.name);
    setOpen(false);
    // Fetch sellable stock
    try {
      const stRes = await api.get(`/exports/sellable-stock/${p.id}`);
      const stData = stRes.data;
      onSelect({ ...p, max_qty: stData.sellable_stock });
      return;
    } catch (e) {}
    onSelect({ ...p, max_qty: 0 });
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
        <input
          className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-8 pr-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Tìm sản phẩm (còn tồn kho)..."
          value={query}
          onChange={(e) => search(e.target.value)}
          onFocus={() => { if (results.length === 0) search(''); else setOpen(true); }}
        />
      </div>
      {open && results.length > 0 && (
        <div className="absolute z-30 mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl overflow-y-auto max-h-60">
          {results.map((p) => (
            <button
              key={p.id}
              type="button"
              onMouseDown={() => handleSelect(p)}
              className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors"
            >
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{p.name}</p>
                <p className="text-xs text-slate-400">{p.product_code} · Giá: {p.unit_price}</p>
              </div>
              <span className="text-xs text-indigo-500 dark:text-indigo-400 font-medium">Chọn</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Supplier Search Dropdown ─────────────────────────────────
function SupplierSearch({ onSelect, onClear, initialSupplierName }) {
  const [query, setQuery] = useState(initialSupplierName || '');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (initialSupplierName) setQuery(initialSupplierName);
  }, [initialSupplierName]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const search = async (q) => {
    setQuery(q);
    try {
      const res = await api.get(`/suppliers?search=${encodeURIComponent(q)}&limit=100`);
      const data = res.data;
      const list = Array.isArray(data) ? data : (data.data || []);
      setResults(list);
      setOpen(true);
    } catch (_) {}
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative">
        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          placeholder="Tìm hoặc nhập tên nhà cung cấp..."
          value={query}
          onChange={(e) => {
            const val = e.target.value;
            search(val);
            if (val === '' && onClear) onClear();
          }}
          onFocus={() => { if (results.length === 0) search(''); else setOpen(true); }}
        />
      </div>
      {open && results.length > 0 && (
        <div className="absolute z-40 mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl overflow-y-auto max-h-60">
          {results.map((s) => (
            <button
              key={s.id}
              type="button"
              onMouseDown={() => {
                onSelect(s);
                setQuery(s.name);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0"
            >
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{s.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{s.phone} · {s.contact_person}</p>
              </div>
              <span className="text-xs text-indigo-500 dark:text-indigo-400 font-medium">Chọn</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function NewExportPage() {
  const router = useRouter();

  const [loading, setLoading]       = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState('');
  const [suppliers, setSuppliers]   = useState([]);

  // Form fields
  const [reason, setReason]                   = useState('SELL');
  const [exportDate, setExportDate]           = useState(new Date().toISOString().split('T')[0]);
  const [customerName, setCustomerName]       = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [supplierId, setSupplierId]           = useState('');
  const [note, setNote]                       = useState('');
  const [details, setDetails]                 = useState([blankDetail()]);

  // Load suppliers if RETURN
  useEffect(() => {
    if (reason === 'RETURN' && suppliers.length === 0) {
      const load = async () => {
        try {
          const res = await api.get(`/suppliers?limit=200`);
          const data = res.data;
          setSuppliers(Array.isArray(data) ? data : (data.data || []));
        } catch (e) {}
      };
      load();
    }
  }, [reason, suppliers.length]);

  // ── Detail helpers ──────────────────────────────────────────
  const addRow = () => setDetails((d) => [...d, blankDetail()]);
  const removeRow = (key) => setDetails((d) => d.filter((r) => r._key !== key));
  const updateRow = (key, field, val) =>
    setDetails((d) => d.map((r) => (r._key === key ? { ...r, [field]: val } : r)));
  const setProduct = (key, product) => {
    setDetails((d) =>
      d.map((r) =>
        r._key === key
          ? {
              ...r,
              product_id: product.id,
              product_name: product.name,
              product_code: product.product_code,
              unit: product.unit || '',
              selling_price: product.unit_price ? String(product.unit_price) : '',
              max_qty: product.max_qty || 0,
            }
          : r
      )
    );
    if (reason === 'RETURN' && !supplierId && product.supplier_ids && product.supplier_ids.length > 0) {
      setSupplierId(String(product.supplier_ids[0]));
    }
  };

  const totalAmount = details.reduce(
    (s, d) => s + (parseFloat(d.selling_price) || 0) * (parseInt(d.quantity) || 0),
    0
  );

  // ── Handle Submit ───────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (reason === 'RETURN' && !supplierId) {
      setError('Vui lòng chọn nhà cung cấp.'); return;
    }
    const validDetails = details.filter((d) => d.product_id && d.quantity);
    if (validDetails.length === 0) {
      setError('Phải có ít nhất 1 sản phẩm hợp lệ.'); return;
    }

    setSubmitting(true);
    try {
      const res = await api.post(`/exports`, {
        reason: reason,
        export_date: exportDate,
        customer_name: customerName,
        note: note,
        details: validDetails.map((d) => ({
          product_id: d.product_id,
          quantity: parseInt(d.quantity),
          unit_price: parseFloat(d.selling_price) || 0,
        })),
      });

      const created = res.data;
      router.push(`/dashboard/exports/${created.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/exports"
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-600/30">
            <ArrowUpFromLine className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Tạo phiếu xuất kho</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Xuất bán, trả nhà CC, hoặc xuất huỷ</p>
          </div>
        </div>
      </div>

      {/* ── Error Banner ────────────────────────────────────────── */}
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ── LEFT: General Info ────────────────────────────────── */}
        <div className="lg:col-span-1 space-y-5">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
            <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <FileText className="h-4 w-4 text-indigo-400" />
              Thông tin chung
            </h2>

            {/* Reason */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                Mục đích xuất <span className="text-red-400">*</span>
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="SELL">Xuất bán hàng (FEFO)</option>
                <option value="RETURN">Trả hàng nhà cung cấp</option>
                <option value="INTERNAL">Xuất sử dụng nội bộ (FEFO)</option>
                <option value="DISPOSE">Xuất huỷ (FEFO)</option>
              </select>
            </div>

            {/* Export Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                Ngày xuất <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                value={exportDate}
                onChange={(e) => setExportDate(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {reason === 'SELL' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Khách hàng</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Tên khách hàng..."
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Địa chỉ giao</label>
                  <textarea
                    rows={2}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Nhập địa chỉ..."
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </>
            )}

            {reason === 'RETURN' && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Nhà cung cấp <span className="text-red-400">*</span>
                </label>
                <SupplierSearch
                  initialSupplierName={suppliers.find((s) => String(s.id) === String(supplierId))?.name || ''}
                  onSelect={(s) => setSupplierId(String(s.id))}
                  onClear={() => setSupplierId('')}
                />
                <p className="text-xs text-amber-500 mt-2">
                  Lưu ý: Chỉ hỗ trợ lấy lô thông qua FEFO tạm thời hoặc bạn cần chọn lô trong backend. Hiện tại FEFO sẽ dùng cho mọi SP.
                </p>
              </div>
            )}

            {/* Note */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Ghi chú</label>
              <textarea
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Lý do, ghi chú thêm..."
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* ── RIGHT: Product Details ────────────────────────────── */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Package className="h-4 w-4 text-indigo-400" />
                Danh sách sản phẩm
              </h2>
              <button
                type="button"
                onClick={addRow}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600/10 border border-indigo-500/30 px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600/20 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                Thêm dòng
              </button>
            </div>

            <div className="p-4 space-y-4">
              {details.map((row, idx) => (
                <div
                  key={row._key}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      Sản phẩm #{idx + 1}
                    </span>
                    {details.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRow(row._key)}
                        className="rounded-lg p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                      Sản phẩm <span className="text-red-400">*</span>
                    </label>
                    <SellableProductSearch
                      value={{ name: row.product_name }}
                      supplierId={reason === 'RETURN' ? supplierId : undefined}
                      onSelect={(p) => setProduct(row._key, p)}
                    />
                    {row.product_code && (
                      <p className="text-xs mt-1 font-medium">
                        <span className="text-slate-400">{row.product_code} · {row.unit} </span>
                        | Tồn khả dụng: <span className={row.max_qty > 0 ? 'text-emerald-500' : 'text-red-400'}>{row.max_qty}</span>
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                        Số lượng xuất <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="number" min="1" max={row.max_qty || undefined}
                        value={row.quantity}
                        onChange={(e) => updateRow(row._key, 'quantity', e.target.value)}
                        placeholder="0"
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                        Đơn giá (VNĐ)
                      </label>
                      <input
                        type="number" min="0"
                        value={row.selling_price}
                        onChange={(e) => updateRow(row._key, 'selling_price', e.target.value)}
                        placeholder="0"
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="rounded-lg bg-indigo-50 dark:bg-indigo-950/20 p-4 border border-indigo-100 dark:border-indigo-900 flex justify-between items-center">
                <span className="text-sm font-semibold text-indigo-900 dark:text-indigo-300">Tổng tiền dự kiến</span>
                <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* ── Actions ───────────────────────────────────────────── */}
          <div className="flex gap-3 justify-end">
            <Link
              href="/dashboard/exports"
              className="rounded-lg border border-slate-200 dark:border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Huỷ
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 disabled:opacity-50 transition-colors"
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {submitting ? 'Đang tạo...' : 'Tạo phiếu xuất'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
