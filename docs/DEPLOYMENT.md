# Hướng dẫn Deploy — WMS INT1334

## Kiến trúc

```
Trình duyệt → Vercel (Next.js) → Render (Express API) → Neon (PostgreSQL)
```

## 1. Backend trên Render

1. Đăng nhập [render.com](https://render.com) → **New Web Service** → kết nối repo GitHub.
2. **Root Directory:** `backend`
3. **Build Command:** `npm install && npm run build`
4. **Start Command:** `npm start`
5. **Health Check Path:** `/api/health`
6. Thêm biến môi trường (Settings → Environment):

| Biến | Giá trị |
|------|---------|
| `DATABASE_URL` | Connection string Neon |
| `JWT_SECRET` | Chuỗi random (≥32 ký tự) |
| `JWT_REFRESH_SECRET` | Chuỗi random khác |
| `CORS_ORIGIN` | URL Vercel, ví dụ `https://ten-app.vercel.app` |
| `NODE_ENV` | `production` |

7. Sau deploy lần đầu, mở **Shell** trên Render:

```bash
npx prisma db push
npx prisma db seed
```

8. Kiểm tra: `https://<ten-service>.onrender.com/api/health`

## 2. Frontend trên Vercel

1. [vercel.com](https://vercel.com) → Import repo GitHub.
2. **Root Directory:** `frontend`
3. Framework: Next.js (tự nhận).
4. Environment Variables:

| Biến | Giá trị |
|------|---------|
| `NEXT_PUBLIC_API_URL` | `https://<render-host>/api` |
| `BACKEND_URL` | `https://<render-host>` |

5. Deploy → mở URL Vercel → đăng nhập `admin` / `admin123`.

## 3. Cập nhật CORS sau khi có URL Vercel

Trên Render, sửa `CORS_ORIGIN` = URL Vercel chính xác (không dấu `/` cuối).

## 4. Chạy local trước khi deploy

```bash
# Terminal 1
cd backend && npm install && npx prisma generate && npm run dev

# Terminal 2
cd frontend && npm install && npm run dev
```

Copy `backend/.env.example` → `backend/.env` và điền `DATABASE_URL`.
