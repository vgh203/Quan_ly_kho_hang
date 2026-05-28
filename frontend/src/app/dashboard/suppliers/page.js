'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  Plus, Search, Edit2, Trash2, X, AlertCircle, 
  Check, Loader2, Sparkles, MapPin, Phone, Mail, User, Info, Navigation
} from 'lucide-react';

// Dynamically import Leaflet Map to avoid Next.js SSR window errors
const SupplierMap = dynamic(() => import('@/components/SupplierMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[400px] w-full items-center justify-center bg-slate-950 border border-slate-900 rounded-xl text-slate-400">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-6 w-6 animate-spin text-violet-500" />
        <p className="text-xs">Đang tải bản đồ định vị...</p>
      </div>
    </div>
  ),
});

// Zod validation schema for Supplier form
const supplierFormSchema = z.object({
  name: z.string().min(3, 'Tên nhà cung cấp phải có ít nhất 3 ký tự'),
  contact_person: z.string().min(3, 'Tên người đại diện phải có ít nhất 3 ký tự'),
  phone: z.string().min(8, 'Số điện thoại không hợp lệ'),
  email: z.string().email('Địa chỉ email không đúng định dạng'),
  address: z.string().min(5, 'Địa chỉ chi tiết phải có ít nhất 5 ký tự'),
  distance_km: z.coerce.number().min(0, 'Khoảng cách phải lớn hơn hoặc bằng 0'),
  latitude: z.coerce.number().min(-90).max(90, 'Vĩ độ không hợp lệ (-90 đến 90)'),
  longitude: z.coerce.number().min(-180).max(180, 'Kinh độ không hợp lệ (-180 đến 180)'),
});

export default function SuppliersPage() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';

  // State
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selection
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  
  // Modal & Form States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [formErrorMsg, setFormErrorMsg] = useState('');
  
  // Temp coordinates for map selection during Add/Edit
  const [tempLat, setTempLat] = useState(10.762622);
  const [tempLng, setTempLng] = useState(106.660172);

  // Load suppliers
  const loadSuppliers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/suppliers');
      setSuppliers(res.data);
      if (res.data.length > 0) {
        setSelectedSupplier(res.data[0]);
      }
    } catch (err) {
      console.error('Failed to load suppliers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  // Form setup
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(supplierFormSchema),
    defaultValues: {
      name: '',
      contact_person: '',
      phone: '',
      email: '',
      address: '',
      distance_km: 0,
      latitude: 10.762622,
      longitude: 106.660172,
    },
  });

  // Add click
  const handleAddClick = () => {
    setEditingSupplier(null);
    setFormErrorMsg('');
    setTempLat(10.762622);
    setTempLng(106.660172);
    reset({
      name: '',
      contact_person: '',
      phone: '',
      email: '',
      address: '',
      distance_km: 0,
      latitude: 10.762622,
      longitude: 106.660172,
    });
    setIsFormOpen(true);
  };

  // Edit click
  const handleEditClick = (supplier) => {
    setEditingSupplier(supplier);
    setFormErrorMsg('');
    setIsFormOpen(true);
    
    // Set form values
    setValue('name', supplier.name);
    setValue('contact_person', supplier.contact_person || '');
    setValue('phone', supplier.phone || '');
    setValue('email', supplier.email || '');
    setValue('address', supplier.address || '');
    setValue('distance_km', supplier.distance_km || 0);
    
    const lat = supplier.latitude || 10.762622;
    const lng = supplier.longitude || 106.660172;
    setValue('latitude', lat);
    setValue('longitude', lng);
    setTempLat(lat);
    setTempLng(lng);
  };

  // Callback when user clicks on map during selection mode
  const handleMapPositionSelected = (lat, lng, distance) => {
    setValue('latitude', Number(lat.toFixed(6)));
    setValue('longitude', Number(lng.toFixed(6)));
    setValue('distance_km', distance);
    setTempLat(lat);
    setTempLng(lng);
  };

  // Form submit
  const onSubmit = async (data) => {
    setSubmitLoading(true);
    setFormErrorMsg('');
    try {
      if (editingSupplier) {
        await api.put(`/suppliers/${editingSupplier.id}`, data);
      } else {
        await api.post('/suppliers', data);
      }
      setIsFormOpen(false);
      loadSuppliers();
    } catch (err) {
      console.error(err);
      setFormErrorMsg(err.response?.data?.error || 'Có lỗi xảy ra khi lưu nhà cung cấp.');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Soft delete
  const handleDeleteClick = async (supplierId, name) => {
    if (confirm(`Bạn có chắc muốn ẩn nhà cung cấp "${name}"? Các bảng giá sản phẩm liên quan sẽ tạm ẩn.`)) {
      try {
        await api.delete(`/suppliers/${supplierId}`);
        loadSuppliers();
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.error || 'Không thể xóa nhà cung cấp.');
      }
    }
  };

  // Filter list
  const filteredSuppliers = suppliers.filter(s => {
    return (
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.contact_person?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.address?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-violet-400" />
            Định vị & Quản lý Nhà cung cấp
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Xem vị trí nhà cung cấp trên bản đồ, tính toán cự ly vận chuyển và cập nhật thông tin liên hệ.
          </p>
        </div>
        
        {isAdmin && (
          <button
            onClick={handleAddClick}
            className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:from-violet-500 hover:to-blue-500 hover:shadow-lg hover:shadow-violet-500/25 active:scale-[0.98]"
          >
            <Plus className="h-4.5 w-4.5" />
            Thêm nhà cung cấp
          </button>
        )}
      </div>

      {/* Main Split Screen Layout */}
      <div className="grid gap-6 lg:grid-cols-12">
        
        {/* Left Side: Supplier List (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Search bar */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Tìm theo tên nhà cung cấp, người đại diện..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-900/30 py-2 pr-3 pl-10 text-sm text-slate-200 placeholder-slate-600 focus:border-violet-500/80 focus:outline-none"
            />
          </div>

          {/* Suppliers Cards Panel */}
          {loading ? (
            <div className="flex h-80 flex-col items-center justify-center gap-2 rounded-xl border border-slate-900 bg-slate-900/10">
              <Loader2 className="h-7 w-7 animate-spin text-violet-500" />
              <span className="text-xs text-slate-500">Đang tải danh sách nhà cung cấp...</span>
            </div>
          ) : filteredSuppliers.length === 0 ? (
            <div className="flex h-80 flex-col items-center justify-center gap-2 rounded-xl border border-slate-900 bg-slate-900/10 text-center p-4">
              <Info className="h-6 w-6 text-slate-600" />
              <span className="text-xs text-slate-500">Không tìm thấy nhà cung cấp nào.</span>
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
              {filteredSuppliers.map((sup) => {
                const isSelected = selectedSupplier && selectedSupplier.id === sup.id;
                return (
                  <div
                    key={sup.id}
                    onClick={() => setSelectedSupplier(sup)}
                    className={`relative rounded-xl border p-4 cursor-pointer transition-all duration-200 hover:border-slate-700 ${
                      isSelected
                        ? 'border-violet-500/40 bg-violet-600/5 shadow-md shadow-violet-500/5'
                        : 'border-slate-800/80 bg-slate-900/10 hover:bg-slate-900/30'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="space-y-1">
                        <h3 className="text-sm font-semibold text-slate-100">{sup.name}</h3>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                          <User className="h-3 w-3 text-slate-500" />
                          Đại diện: {sup.contact_person || '—'}
                        </p>
                      </div>
                      
                      {sup.distance_km && (
                        <span className="inline-flex items-center gap-1 rounded bg-slate-900 border border-slate-800 px-2 py-0.5 text-[10px] font-semibold text-teal-400">
                          <Navigation className="h-2.5 w-2.5" />
                          {sup.distance_km} km
                        </span>
                      )}
                    </div>

                    <p className="mt-2.5 text-xs text-slate-500 line-clamp-1 flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 text-slate-600 shrink-0" />
                      {sup.address || '—'}
                    </p>

                    {/* Admin CRUD options inside list cards */}
                    {isAdmin && (
                      <div className="mt-4 flex items-center justify-end gap-2 border-t border-slate-800/40 pt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(sup);
                          }}
                          className="rounded p-1 text-slate-500 hover:bg-slate-800 hover:text-blue-400"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(sup.id, sup.name);
                          }}
                          className="rounded p-1 text-slate-500 hover:bg-slate-800 hover:text-red-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Supplier Details Card Panel */}
          {selectedSupplier && (
            <div className="rounded-xl border border-slate-800 bg-slate-900/20 p-4 space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Chi tiết nhà cung cấp
              </h4>
              
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex justify-between items-start border-b border-slate-800/60 pb-2">
                  <span className="text-slate-400">Tên đầy đủ:</span>
                  <span className="font-semibold text-right max-w-[200px]">{selectedSupplier.name}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
                  <span className="text-slate-400">Điện thoại:</span>
                  <span className="font-mono text-slate-200 flex items-center gap-1">
                    <Phone className="h-3 w-3 text-slate-500" />
                    {selectedSupplier.phone || '—'}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
                  <span className="text-slate-400">Email:</span>
                  <span className="text-slate-200 flex items-center gap-1">
                    <Mail className="h-3 w-3 text-slate-500" />
                    {selectedSupplier.email || '—'}
                  </span>
                </div>
                <div className="flex justify-between items-start border-b border-slate-800/60 pb-2">
                  <span className="text-slate-400">Địa chỉ:</span>
                  <span className="text-slate-200 text-right max-w-[200px]">{selectedSupplier.address || '—'}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Tọa độ:</span>
                  <span className="font-mono text-[10px] text-violet-400">
                    {selectedSupplier.latitude && selectedSupplier.longitude 
                      ? `${selectedSupplier.latitude.toFixed(5)}, ${selectedSupplier.longitude.toFixed(5)}` 
                      : 'Chưa có vị trí'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Leaflet Routing Map (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col h-[500px] lg:h-[650px]">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Bản đồ định vị & Tuyến đường Logistics
            </span>
            {selectedSupplier && selectedSupplier.latitude && (
              <span className="text-[11px] text-violet-400 flex items-center gap-1">
                <Navigation className="h-3 w-3 animate-pulse" />
                Vẽ tuyến đường: Kho $\rightarrow$ {selectedSupplier.name} ({selectedSupplier.distance_km} km)
              </span>
            )}
          </div>
          
          <SupplierMap
            mode="view"
            suppliers={suppliers}
            selectedSupplier={selectedSupplier}
          />
        </div>
      </div>

      {/* Add / Edit Supplier Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-4xl rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl my-8 relative">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white z-50"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-6">
              {editingSupplier ? 'Chỉnh sửa thông tin đối tác' : 'Đăng ký nhà cung cấp mới'}
            </h3>

            {formErrorMsg && (
              <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3.5 text-sm text-red-400">
                <AlertCircle className="h-5 w-5" />
                <p className="font-medium">{formErrorMsg}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-12">
                
                {/* Inputs Panel (5 Cols) */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Tên nhà cung cấp *
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      placeholder="Tên đối tác (ví dụ: CP Food)"
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2 px-3 text-sm text-slate-200 focus:border-violet-500/80 focus:outline-none"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-400">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Representative Person */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Người đại diện liên hệ *
                    </label>
                    <input
                      {...register('contact_person')}
                      type="text"
                      placeholder="Họ và tên người đại diện"
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2 px-3 text-sm text-slate-200 focus:border-violet-500/80 focus:outline-none"
                    />
                    {errors.contact_person && (
                      <p className="text-xs text-red-400">{errors.contact_person.message}</p>
                    )}
                  </div>

                  {/* Contact Number */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Số điện thoại liên lạc *
                    </label>
                    <input
                      {...register('phone')}
                      type="text"
                      placeholder="Số hotline hoặc di động"
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2 px-3 text-sm text-slate-200 focus:border-violet-500/80 focus:outline-none"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-400">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Địa chỉ Email *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="doitac@gmail.com"
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2 px-3 text-sm text-slate-200 focus:border-violet-500/80 focus:outline-none"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Physical Address */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Địa chỉ văn phòng/kho *
                    </label>
                    <input
                      {...register('address')}
                      type="text"
                      placeholder="Số nhà, Tên đường, Quận/Huyện"
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2 px-3 text-sm text-slate-200 focus:border-violet-500/80 focus:outline-none"
                    />
                    {errors.address && (
                      <p className="text-xs text-red-400">{errors.address.message}</p>
                    )}
                  </div>

                  {/* Distance KM & Coordinates */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Vĩ độ (Lat)
                      </label>
                      <input
                        {...register('latitude')}
                        type="number"
                        step="any"
                        readOnly
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2 px-3 text-xs text-slate-400 focus:outline-none select-all"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Kinh độ (Lng)
                      </label>
                      <input
                        {...register('longitude')}
                        type="number"
                        step="any"
                        readOnly
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2 px-3 text-xs text-slate-400 focus:outline-none select-all"
                      />
                    </div>
                  </div>

                  {/* Distance (Calculated) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Khoảng cách vận chuyển (km)
                    </label>
                    <input
                      {...register('distance_km')}
                      type="number"
                      step="any"
                      readOnly
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2 px-3 text-sm text-teal-400 font-semibold focus:outline-none"
                    />
                  </div>
                </div>

                {/* Map Selection Panel (7 Cols) */}
                <div className="lg:col-span-7 flex flex-col h-[400px] lg:h-[500px]">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                    Nhấp vào bản đồ để lấy tọa độ & khoảng cách
                  </span>
                  
                  <SupplierMap
                    mode="select"
                    selectedLat={tempLat}
                    selectedLng={tempLng}
                    onPositionSelected={handleMapPositionSelected}
                  />
                </div>

              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-3 border-t border-slate-800 pt-4">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-400 hover:bg-slate-900 hover:text-white"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2 text-sm font-semibold text-white hover:from-violet-500 hover:to-blue-500 disabled:opacity-50"
                >
                  {submitLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Đang lưu...</span>
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Lưu thông tin</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
