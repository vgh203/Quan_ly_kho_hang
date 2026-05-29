# WMS Logistics — Hệ thống Quản lý Kho hàng

Hệ thống quản lý kho hàng (Warehouse Management System) xây dựng với **Next.js** (frontend) và **Node.js + Express + Prisma** (backend), sử dụng cơ sở dữ liệu **PostgreSQL** trên Neon Cloud.

---

## Yêu cầu môi trường

Trước khi bắt đầu, đảm bảo máy tính đã cài đặt:

- [Node.js](https://nodejs.org/) **v18 trở lên**
- [Git](https://git-scm.com/)
- Terminal / PowerShell

---

## Hướng dẫn cài đặt và chạy

### Bước 1 — Clone repository

```bash
git clone https://github.com/n23dccn155-gif/Quan_ly_kho_hang.git
cd Quan_ly_kho_hang
```

---

### Bước 2 — Cấu hình Backend

```bash
cd backend
```

**Tạo file `.env`** bằng cách copy toàn bộ nội dung từ `.env.example`:

```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# Hoặc trên Git Bash / Linux / macOS
cp .env.example .env
```

>  File `.env.example` đã chứa sẵn đầy đủ thông tin kết nối database và JWT secret — bạn **không cần chỉnh sửa gì thêm**, chỉ cần copy là có thể chạy.

**Cài đặt dependencies:**

```bash
npm install
```

**Generate Prisma Client:**

```bash
npx prisma generate
```

**Seed dữ liệu mẫu vào database** (tài khoản admin, sản phẩm, nhà cung cấp...):

```bash
npx prisma db seed
```

---

### Bước 3 — Cấu hình Frontend

Mở terminal mới, từ thư mục gốc `Quan_ly_kho_hang`:

```bash
cd frontend
npm install
```

---

### Bước 4 — Chạy ứng dụng

**Mở 2 terminal riêng biệt:**

**Terminal 1 — Chạy Backend (port 5001):**

```bash
cd backend
npm run dev
```

**Terminal 2 — Chạy Frontend (port 3000):**

```bash
cd frontend
npm run dev
```

---

### Bước 5 — Truy cập ứng dụng

Mở trình duyệt và truy cập: **http://localhost:3000**

---

## Tài khoản đăng nhập mặc định

| Vai trò                  | Tên đăng nhập | Mật khẩu      |
| ------------------------- | ----------------- | --------------- |
| Quản trị viên (Admin)  | `admin`         | `admin123`    |
| Nhân viên kho (Staff)   | `nhanvien1`     | `nhanvien123` |
|  Nhân viên kho (Staff) | `nhanvien2`     | `nhanvien123` |

---

## Cấu trúc thư mục

```
Quan_ly_kho_hang/
├── backend/                  # Node.js + Express API
│   ├── controllers/          # Xử lý logic nghiệp vụ
│   ├── middlewares/          # Xác thực JWT, phân quyền
│   ├── routes/               # Định nghĩa API endpoints
│   ├── prisma/
│   │   ├── schema.prisma     # Cấu trúc database
│   │   └── seed.js           # Dữ liệu khởi tạo
│   ├── .env.example          # Mẫu cấu hình môi trường
│   └── server.js             # Entry point backend
│
└── frontend/                 # Next.js App Router
    └── src/
        └── app/
            ├── dashboard/    # Các trang trong hệ thống
            │   ├── page.js           # Trang tổng quan (Dashboard)
            │   ├── products/         # Quản lý sản phẩm & kệ hàng
            │   ├── suppliers/        # Nhà cung cấp & Bản đồ kho
            │   └── users/            # Phân quyền người dùng (Admin)
            └── login/
                └── page.js   # Trang đăng nhập
```

---

## Các tính năng chính hiện tại

- **Dashboard** — Thống kê tổng quan: tồn kho, nhập xuất, cảnh báo hạn sử dụng (FEFO)
- **Quản lý sản phẩm** — Danh sách sản phẩm và bản đồ sơ đồ kệ hàng trực quan
- **Nhà cung cấp & Bản đồ** — Quản lý nhà cung cấp và vị trí kho theo zone
- **Phân quyền** — Admin tạo tài khoản, quản lý vai trò nhân viên
-  **Dark / Light Mode** — Chuyển đổi giao diện sáng/tối, lưu tự động

---

## Tech Stack

| Thành phần | Công nghệ                           |
| ------------ | ------------------------------------- |
| Frontend     | Next.js 16, React 19, Tailwind CSS v4 |
| Backend      | Node.js, Express.js                   |
| ORM          | Prisma                                |
| Database     | PostgreSQL (Neon Cloud)               |
| Auth         | JWT (Access Token)                    |
| State        | Zustand                               |
| Charts       | Recharts                              |
| Icons        | Lucide React                          |

---

## Triển khai (Deploy)

| Thành phần | Nền tảng |
|------------|----------|
| Frontend | [Vercel](https://vercel.com) — root `frontend/` |
| Backend | [Render](https://render.com) — root `backend/` |
| Database | [Neon](https://neon.tech) PostgreSQL |

Chi tiết từng bước: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

**Biến môi trường quan trọng**

- Backend: `DATABASE_URL`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, `CORS_ORIGIN` (URL Vercel)
- Frontend: `NEXT_PUBLIC_API_URL` (ví dụ `https://your-api.onrender.com/api`)

Sau deploy, kiểm tra: `GET /api/health` trên backend và đăng nhập trên frontend.

---

## Lưu ý

- Database có thể host trên **Neon Cloud** — không bắt buộc cài PostgreSQL local.
- Copy `backend/.env.example` và `frontend/.env.example` thành `.env` — **không commit file `.env` thật**.
- Nếu gặp lỗi `prisma generate`, chạy `npx prisma generate` trong thư mục `backend` trước khi start.
- Backend mặc định cổng **5001**, frontend cổng **3000**.
