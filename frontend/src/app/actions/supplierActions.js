'use server';

import { cookies } from 'next/headers';

export async function createSupplierAction(formData) {
  try {
    const cookieStore = cookies();
    const authStore = cookieStore.get('auth-storage');
    
    let token = '';
    if (authStore && authStore.value) {
      try {
        const parsed = JSON.parse(decodeURIComponent(authStore.value));
        token = parsed?.state?.token || '';
      } catch (e) {}
    }
    
    const payload = {
      name: formData.get('name'),
      contact_person: formData.get('contact_person'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      address: formData.get('address'),
      tax_code: formData.get('tax_code'),
    };

    const res = await fetch('http://localhost:5001/api/suppliers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, error: errorData.error || 'Lỗi tạo nhà cung cấp' };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error('Server Action Error:', error);
    return { success: false, error: 'Lỗi máy chủ khi gọi API' };
  }
}
