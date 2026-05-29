'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Clock,
  FilePlus,
  Lightbulb,
  Loader2,
  Phone,
  RefreshCw,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import api from '@/lib/api';

const formatCurrency = (value) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(value || 0));

export default function ReplenishmentPage() {
  const router = useRouter();
  const [suggestions, setSuggestions] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadSuggestions = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/inventory/replenishments/suggestions');
      const list = res.data.suggestions || [];
      setSuggestions(list);
      setExpanded(Object.fromEntries(list.map((item) => [item.supplier_id, true])));
    } catch (err) {
      console.error('Failed to load replenishment suggestions:', err);
      setError('Không thể tải đề xuất bổ sung hàng tự động. Vui lòng kiểm tra backend hoặc dữ liệu tồn kho.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuggestions();
  }, []);

  const createImportDraft = (supplier) => {
    const draft = {
      supplierId: supplier.supplier_id,
      supplierName: supplier.supplier_name,
      note: 'Phiếu nhập được khởi tạo từ đề xuất bổ sung hàng',
      estimatedDeliveryDays: supplier.max_lead_time_days || '',
      items: (supplier.items || []).map((item) => ({
        product_id: item.product_id,
        product_name: item.product_name,
        product_code: item.product_code,
        unit: item.unit,
        quantity: item.suggested_qty,
        unit_price: item.unit_price,
        category: item.category,
      })),
    };

    localStorage.setItem('replenishmentDraft', JSON.stringify(draft));
    router.push('/dashboard/imports/new?draft=replenishment');
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-cyan-500" />
          <p className="mt-4 font-medium text-slate-500">Đang phân tích tồn kho và lập bảng đề xuất tự động...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-slate-800 p-6 text-white shadow-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300">
                <Lightbulb className="h-6 w-6" />
              </span>
              <h1 className="text-2xl font-bold tracking-tight">Đề xuất bổ sung hàng tự động</h1>
            </div>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Hệ thống quét tồn kho thấp, chọn nhà cung cấp có giá hợp đồng tốt nhất, rồi gom đề xuất theo từng nhà cung cấp để lập phiếu nhập.
            </p>
          </div>
          <button
            onClick={loadSuggestions}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-600"
          >
            <RefreshCw className="h-4 w-4" />
            Quét lại kho hàng
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 shadow-sm">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {suggestions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center shadow-sm">
          <ShoppingBag className="mx-auto h-16 w-16 text-slate-300" />
          <h3 className="mt-4 text-lg font-bold text-slate-800">Kho hàng đang ở trạng thái an toàn</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            Không phát hiện sản phẩm nào có tồn kho thấp hơn ngưỡng tối thiểu. Chưa cần bổ sung lúc này.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg font-bold text-slate-800">
              Danh sách đề xuất ({suggestions.length} nhà cung cấp)
            </h2>
            <span className="text-xs font-medium text-slate-500">Nhấn vào đầu thẻ để thu gọn hoặc mở chi tiết.</span>
          </div>

          {suggestions.map((supplier) => {
            const isExpanded = !!expanded[supplier.supplier_id];
            return (
              <div key={supplier.supplier_id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                <button
                  type="button"
                  onClick={() => setExpanded((prev) => ({ ...prev, [supplier.supplier_id]: !prev[supplier.supplier_id] }))}
                  className="flex w-full flex-col gap-4 border-b border-slate-100 bg-slate-50/70 p-5 text-left lg:flex-row lg:items-center lg:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                      <Truck className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">{supplier.supplier_name}</h3>
                      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{supplier.supplier_phone || 'N/A'}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />Giao khoảng {supplier.max_lead_time_days || 0} ngày</span>
                        <span className="rounded-full bg-cyan-50 px-2 py-0.5 font-semibold text-cyan-700">{supplier.items.length} mặt hàng cần nhập</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-4">
                    <div className="text-right">
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Tổng giá ước tính</p>
                      <p className="text-xl font-extrabold text-cyan-600">{formatCurrency(supplier.total_estimated_amount)}</p>
                    </div>
                    {isExpanded ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-5">
                    <div className="mb-4 flex justify-end">
                      <button
                        onClick={() => createImportDraft(supplier)}
                        className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-200 transition hover:bg-cyan-600"
                      >
                        <FilePlus className="h-4 w-4" />
                        Lập phiếu nhập
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                          <tr>
                            <th className="rounded-l-xl px-4 py-3">Mã SP</th>
                            <th className="px-4 py-3">Tên sản phẩm</th>
                            <th className="px-4 py-3">Danh mục</th>
                            <th className="px-4 py-3 text-center">Tồn kho</th>
                            <th className="px-4 py-3 text-center">Tối thiểu</th>
                            <th className="px-4 py-3 text-center">Thiếu hụt</th>
                            <th className="px-4 py-3 text-center text-cyan-700">Đề xuất nhập</th>
                            <th className="px-4 py-3 text-right">Đơn giá hợp đồng</th>
                            <th className="rounded-r-xl px-4 py-3 text-right">Thành tiền</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {supplier.items.map((item) => (
                            <tr key={item.product_id} className="hover:bg-slate-50/70">
                              <td className="px-4 py-3.5 font-mono text-xs font-semibold text-cyan-700">{item.product_code}</td>
                              <td className="px-4 py-3.5 font-semibold text-slate-800">{item.product_name}</td>
                              <td className="px-4 py-3.5 text-slate-500">{item.category || '-'}</td>
                              <td className="px-4 py-3.5 text-center font-semibold text-red-500">{item.current_stock} {item.unit}</td>
                              <td className="px-4 py-3.5 text-center text-slate-500">{item.min_stock} {item.unit}</td>
                              <td className="px-4 py-3.5 text-center"><span className="rounded-md bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">-{item.shortage}</span></td>
                              <td className="px-4 py-3.5 text-center text-base font-extrabold text-cyan-700">{item.suggested_qty} {item.unit}</td>
                              <td className="px-4 py-3.5 text-right font-medium">{formatCurrency(item.unit_price)}</td>
                              <td className="px-4 py-3.5 text-right font-bold text-slate-900">{formatCurrency(item.estimated_amount)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
