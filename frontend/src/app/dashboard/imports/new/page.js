'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import {
  ArrowDownToLine, ArrowLeft, Plus, Trash2, Save,
  Package, Building2, Calendar, FileText, AlertCircle,
  Search, ChevronDown, X
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
  unit_price: '',
  mfg_date: '',
  expiry_date: '',
  location_id: '',
});

// ─── Product Search Dropdown ──────────────────────────────────
function ProductSearch({ onSelect, supplierId }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const search = async (q) => {
    setQuery(q);
    setLoading(true);
    try {
      const res = await api.get(`/products?search=${encodeURIComponent(q)}&limit=100${supplierId ? `&supplier_id=${supplierId}` : ''}`);
      const data = res.data;
      const list = Array.isArray(data) ? data : (data.data || []);
      setResults(list);
      setOpen(true);
    } catch (_) {}
    setLoading(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
        <input
          className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-8 pr-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Tìm sản phẩm..."
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
              onMouseDown={() => {
                onSelect(p);
                setQuery(p.name);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors"
            >
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{p.name}</p>
                <p className="text-xs text-slate-400">{p.product_code} · {p.unit}</p>
              </div>
              <span className="text-xs text-indigo-500 dark:text-indigo-400 font-medium">Chọn</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────
export default function NewImportPage() {
  const router = useRouter();
  const { token, user } = useAuthStore();

  const [suppliers, setSuppliers]   = useState([]);
  const [locations, setLocations]   = useState([]);
  const [loading, setLoading]       = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState('');

  // Form fields
  const [supplierId, setSupplierId]           = useState('');
  const [importDate, setImportDate]           = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote]                       = useState('');
  const [transportNote, setTransportNote]     = useState('');
  const [estDays, setEstDays]                 = useState('');
  const [details, setDetails]                 = useState([blankDetail()]);

  // ── Load suppliers & locations ──────────────────────────────
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [sRes, lRes] = await Promise.all([
          api.get(`/suppliers?limit=200`),
          api.get(`/locations`),
        ]);
        const sd = sRes.data;
        setSuppliers(Array.isArray(sd) ? sd : (sd.data || []));
        const ld = lRes.data;
        setLocations(Array.isArray(ld) ? ld : (ld.data || []));
      } catch (_) {}
      setLoading(false);
    };
    load();
  }, [token]);

  // ── Detail row helpers ──────────────────────────────────────
  const addRow   = () => setDetails((d) => [...d, blankDetail()]);
  const removeRow = (key) => setDetails((d) => d.filter((r) => r._key !== key));
  const updateRow = (key, field, val) =>
    setDetails((d) => d.map((r) => (r._key === key ? { ...r, [field]: val } : r)));
  const setProduct = (key, product) =>
    setDetails((d) =>
      d.map((r) =>
        r._key === key
          ? {
              ...r,
              product_id: product.id,
              product_name: product.name,
              product_code: product.product_code,
              unit: product.unit || '',
              unit_price: product.unit_price ? String(product.unit_price) : '',
            }
          : r
      )
    );

  // ── Computed total ──────────────────────────────────────────
  const totalAmount = details.reduce(
    (s, d) => s + (parseFloat(d.unit_price) || 0) * (parseInt(d.quantity) || 0),
    0
  );

  // ── Submit ──────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!supplierId) { setError('Vui lòng chọn nhà cung cấp.'); return; }
    const validDetails = details.filter((d) => d.product_id && d.quantity);
    if (validDetails.length === 0) { setError('Phải có ít nhất 1 sản phẩm hợp lệ.'); return; }

    setSubmitting(true);
    try {
      const res = await api.post(`/imports`, {
        supplier_id: parseInt(supplierId),
        import_date: importDate,
        note,
        transport_note: transportNote,
        estimated_delivery_days: estDays ? parseInt(estDays) : undefined,
        details: validDetails.map((d) => ({
          product_id: d.product_id,
          quantity: parseInt(d.quantity),
          unit_price: parseFloat(d.unit_price) || 0,
          mfg_date: d.mfg_date || null,
          expiry_date: d.expiry_date || null,
          location_id: d.location_id ? parseInt(d.location_id) : null,
        })),
      });

      const created = res.data;
      router.push(`/dashboard/imports/${created.id}`);
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
          href="/dashboard/imports"
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-600/30">
            <ArrowDownToLine className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Tạo phiếu nhập kho</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Điền thông tin và danh sách sản phẩm</p>
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
              <Building2 className="h-4 w-4 text-indigo-400" />
              Thông tin chung
            </h2>

            {/* Supplier */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                Nhà cung cấp <span className="text-red-400">*</span>
              </label>
              <select
                value={supplierId}
                onChange={(e) => setSupplierId(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">-- Chọn nhà cung cấp --</option>
                {suppliers.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* Import Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                Ngày nhập <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                value={importDate}
                onChange={(e) => setImportDate(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Estimated delivery days */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                Thời gian vận chuyển (ngày)
              </label>
              <input
                type="number"
                min="1"
                value={estDays}
                onChange={(e) => setEstDays(e.target.value)}
                placeholder="VD: 3"
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Transport note */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                Ghi chú vận chuyển
              </label>
              <textarea
                rows={2}
                value={transportNote}
                onChange={(e) => setTransportNote(e.target.value)}
                placeholder="Thông tin xe, đơn vị vận chuyển..."
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>

            {/* Note */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                Ghi chú phiếu nhập
              </label>
              <textarea
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ghi chú thêm..."
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>
          </div>

          {/* ── Summary Card ──────────────────────────────────────── */}
          <div className="rounded-xl border border-indigo-500/30 bg-indigo-600/5 p-5 space-y-3">
            <h2 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Tóm tắt</h2>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Số dòng sản phẩm</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{details.filter(d => d.product_id).length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Tổng số lượng</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {details.reduce((s, d) => s + (parseInt(d.quantity) || 0), 0)}
              </span>
            </div>
            <div className="border-t border-indigo-500/20 pt-3 flex justify-between">
              <span className="font-semibold text-slate-600 dark:text-slate-300">Tổng tiền</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Product Details Table ──────────────────────── */}
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
                Thêm sản phẩm
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

                  {/* Product search */}
                  <div>
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                      Sản phẩm <span className="text-red-400">*</span>
                    </label>
                    <ProductSearch
                      supplierId={supplierId}
                      onSelect={(p) => setProduct(row._key, p)}
                    />
                    {row.product_name && (
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1 font-medium">{row.product_name}</p>
                    )}
                    {row.product_code && (
                      <p className="text-xs text-slate-400">{row.product_code} · {row.unit}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Quantity */}
                    <div>
                      <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                        Số lượng <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="number" min="1"
                        value={row.quantity}
                        onChange={(e) => updateRow(row._key, 'quantity', e.target.value)}
                        placeholder="0"
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    {/* Unit price */}
                    <div>
                      <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Đơn giá (VNĐ)</label>
                      <input
                        type="number" min="0"
                        value={row.unit_price}
                        onChange={(e) => updateRow(row._key, 'unit_price', e.target.value)}
                        placeholder="0"
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    {/* Location */}
                    <div>
                      <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Vị trí kho</label>
                      <select
                        value={row.location_id}
                        onChange={(e) => updateRow(row._key, 'location_id', e.target.value)}
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="">-- Chọn vị trí --</option>
                        {locations.map((l) => (
                          <option key={l.id} value={l.id}>{l.location_code} - {l.name}</option>
                        ))}
                      </select>
                    </div>
                    {/* MFG date */}
                    <div>
                      <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Ngày sản xuất</label>
                      <input
                        type="date"
                        value={row.mfg_date}
                        onChange={(e) => updateRow(row._key, 'mfg_date', e.target.value)}
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    {/* Expiry date */}
                    <div>
                      <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Hạn sử dụng</label>
                      <input
                        type="date"
                        value={row.expiry_date}
                        onChange={(e) => updateRow(row._key, 'expiry_date', e.target.value)}
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Row subtotal */}
                  {row.quantity && row.unit_price && (
                    <div className="flex justify-end">
                      <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                        Thành tiền: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                          (parseInt(row.quantity) || 0) * (parseFloat(row.unit_price) || 0)
                        )}
                      </span>
                    </div>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addRow}
                className="w-full rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 py-3 text-sm text-slate-400 hover:border-indigo-400 hover:text-indigo-500 dark:hover:border-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Thêm sản phẩm
              </button>
            </div>
          </div>

          {/* ── Action Buttons ────────────────────────────────────── */}
          <div className="flex gap-3 justify-end">
            <Link
              href="/dashboard/imports"
              className="rounded-lg border border-slate-200 dark:border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Huỷ
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {submitting ? 'Đang tạo...' : 'Tạo phiếu nhập'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
