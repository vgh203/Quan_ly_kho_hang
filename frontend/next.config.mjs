/** @type {import('next').NextConfig} */
const BACKEND_PROD_URL = 'https://wms-backend-fsyd.onrender.com';

const nextConfig = {
  env: {
    // Biến này sẽ được bake vào code khi build trên Vercel.
    // Nếu Vercel đã cấu hình NEXT_PUBLIC_API_URL thì giá trị đó sẽ được dùng,
    // ngược lại fallback về URL Render thật thay vì localhost.
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || `${BACKEND_PROD_URL}/api`,
    // Biến này chỉ dùng phía Server (Server Actions), không lộ ra browser.
    BACKEND_URL:
      process.env.BACKEND_URL || BACKEND_PROD_URL,
  },
};

export default nextConfig;
