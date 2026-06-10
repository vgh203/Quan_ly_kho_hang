# CẨM NANG HƯỚNG DẪN CHI TIẾT SOẠN THẢO BÁO CÁO ĐỒ ÁN CUỐI KỲ
**MÔN HỌC: LẬP TRÌNH WEB (INT1334) — GIẢNG VIÊN: TS. LÊ NGỌC HIẾU**
*Đề tài số 6: Hệ thống Quản lý Kho thông minh WMS (Logistics & Chuỗi cung ứng)*

Tài liệu này được biên soạn để hướng dẫn chi tiết từ quy cách định dạng, kỹ thuật chụp ảnh màn hình, cách phân tích code tương ứng, đến checklist kiểm tra cuối cùng trước khi xuất file PDF nộp lên LMS.

---

## PHẦN 1: QUY CHUẨN ĐỊNH DẠNG & TRÌNH BÀY (PTIT STANDARD)

Để báo cáo nhìn chuyên nghiệp và không bị trừ điểm định dạng, hãy cấu hình tài liệu Word theo các thông số sau:

### 1. Định dạng trang (Page Setup)
* **Khổ giấy**: A4.
* **Lề trang (Margins)**:
  * Lề trên (Top): `2.0 cm`
  * Lề dưới (Bottom): `2.0 cm`
  * Lề trái (Left): `3.0 cm` (để chừa khoảng đóng gáy báo cáo)
  * Lề phải (Right): `2.0 cm`

### 2. Kiểu chữ & Giãn dòng (Typography)
* **Font chữ**: `Times New Roman` (chữ có chân, tiêu chuẩn học thuật).
* **Cỡ chữ nội dung (Body text)**: `13 pt`.
* **Màu chữ**: Đen hoàn toàn (`#000000`), không sử dụng màu xám hay xanh đậm cho nội dung text thông thường.
* **Giãn dòng (Line Spacing)**: `1.3 lines` đến `1.5 lines`.
* **Giãn đoạn (Paragraph Spacing)**: `Before: 0 pt`, `After: 6 pt`.
* **Canh lề văn bản**: Căn đều hai bên (`Justify`) cho toàn bộ các đoạn văn bản thông thường.

### 3. Cấp bậc Tiêu đề (Headings Hierarchy)
* **TIÊU ĐỀ CHƯƠNG (Heading 1)**: IN HOA, IN ĐẬM, cỡ chữ `15 pt` hoặc `16 pt`, nằm ở đầu trang mới (sử dụng Page Break).
  * *Ví dụ*: **CHƯƠNG 1. GIỚI THIỆU ĐỀ TÀI**
* **Tiêu đề mục lớn (Heading 2)**: Chữ thường, In đậm, cỡ chữ `14 pt`.
  * *Ví dụ*: **1.1. Bối cảnh hình thành đề tài**
* **Tiêu đề mục nhỏ (Heading 3)**: Chữ thường, In đậm, Nghiêng, cỡ chữ `13 pt`.
  * *Ví dụ*: ***1.1.1. Khó khăn của đại lý nhỏ***

### 4. Quy tắc đánh số Trang, Hình ảnh và Bảng biểu
* **Đánh số trang**: Ở giữa hoặc bên phải phía dưới trang. Trang bìa và trang mục lục không đánh số trang (hoặc đánh số La Mã i, ii, iii). Đánh số tự nhiên 1, 2, 3 từ trang Giới thiệu đề tài.
* **Đánh số hình ảnh**: Đặt phía **dưới** hình ảnh, căn giữa, cỡ chữ `12 pt`, in nghiêng. Định dạng: *Hình [Chương].[Số thứ tự hình] - Tên hình*.
  * *Ví dụ*: *Hình 3.1 - Sơ đồ kiến trúc tổng thể hệ thống*
* **Đánh số bảng**: Đặt phía **trên** bảng, căn trái hoặc căn giữa, cỡ chữ `12 pt`, in nghiêng. Định dạng: *Bảng [Chương].[Số thứ tự bảng] - Tên bảng*.
  * *Ví dụ*: *Bảng 4.1 - Thống kê các chiến lược kết xuất trang*

---

## PHẦN 2: KỸ THUẬT CHỤP VÀ TRÌNH BÀY HÌNH ẢNH MINH HỌA (WOW DESIGN)

Giảng viên sẽ đánh giá cao một ứng dụng đẹp nếu hình ảnh minh họa trong báo cáo rõ nét và chuyên nghiệp. Hãy tuân thủ các quy tắc sau:

### 1. Cách chụp ảnh màn hình chất lượng cao
* **Độ phân giải**: Nên chụp màn hình ở độ phân giải Full HD (1920x1080) hoặc cao hơn. Tránh chụp màn hình quá nhỏ rồi kéo giãn ra trong Word gây vỡ hạt.
* **Ẩn các yếu tố thừa**:
  * Ẩn thanh dấu trang (Bookmark bar) của trình duyệt.
  * Ẩn thanh công cụ Windows Taskbar nếu chụp toàn màn hình.
  * Không để con trỏ chuột xuất hiện trong ảnh chụp trừ khi muốn nhấn mạnh một hành động click cụ thể.
* **Sử dụng Chế độ Ẩn danh hoặc Profile sạch**: Để tránh hiển thị các tab cá nhân, avatar tài khoản Google cá nhân trên góc trình duyệt.

### 2. Định dạng hình ảnh trong Microsoft Word
* **Căn lề**: Luôn căn giữa hình ảnh.
* **Chế độ hiển thị**: Chọn chế độ `In Line with Text` (Nằm trên dòng văn bản) để tránh việc hình ảnh chạy lung tung khi bạn chỉnh sửa văn bản.
* **Viền ảnh**: Thêm một đường viền (Border) màu xám nhạt (`#D1D5DB`) dày `0.5 pt` bao quanh ảnh để phân biệt rõ ranh giới ảnh với nền trắng của trang giấy báo cáo.
* **Chú thích ảnh**: Luôn có ít nhất 1-2 câu văn giải thích nội dung bức ảnh ngay bên dưới hoặc bên trên chú thích hình.
  * *Ví dụ*: "Như được thể hiện tại *Hình 4.2*, khi người dùng bấm vào biểu tượng camera, hệ thống sẽ yêu cầu quyền truy cập và mở luồng quét mã QR Code thời gian thực..."

---

## PHẦN 3: BẢN ĐỒ ÁNH XẠ GIỮA BÁO CÁO & MÃ NGUỒN CỤ THỂ (CODE-TO-REPORT MAPPING)

Để viết báo cáo chính xác, đây là danh sách chỉ định các file mã nguồn tương ứng với từng phần mô tả kỹ thuật:

### 1. Kiến trúc JWT và Refresh Token lưu DB (Mục 3.3 của Báo cáo)
* **File mô tả Backend**:
  * Định nghĩa schema của token: [schema.prisma](file:///D:/Study/University/H%E1%BB%8Dc%20k%E1%BB%B3%202%20-%20N%C4%83m%20h%E1%BB%8Dc%202025%20-%202026/Web/Quan_ly_kho_hang/backend/prisma/schema.prisma) (xem model `RefreshToken`).
  * Logic cấp phát/xử lý token: [authController.js](file:///D:/Study/University/H%E1%BB%8Dc%20k%E1%BB%B3%202%20-%20N%C4%83m%20h%E1%BB%8Dc%202025%20-%202026/Web/Quan_ly_kho_hang/backend/controllers/authController.js) (hàm `login`, `refresh`, và `logout`).
* **File mô tả Frontend**:
  * Zustand store lưu token: [useAuthStore.js](file:///D:/Study/University/H%E1%BB%8Dc%20k%E1%BB%B3%202%20-%20N%C4%83m%20h%E1%BB%8Dc%202025%20-%202026/Web/Quan_ly_kho_hang/frontend/src/store/useAuthStore.js).
  * Đánh chặn Token hết hạn: [api.js](file:///D:/Study/University/H%E1%BB%8Dc%20k%E1%BB%B3%202%20-%20N%C4%83m%20h%E1%BB%8Dc%202025%20-%202026/Web/Quan_ly_kho_hang/frontend/src/lib/api.js).
  * Bảo vệ định tuyến phía server: [middleware.js](file:///D:/Study/University/H%E1%BB%8Dc%20k%E1%BB%B3%202%20-%20N%C4%83m%20h%E1%BB%8Dc%202025%20-%202026/Web/Quan_ly_kho_hang/frontend/src/middleware.js).

### 2. Thuật toán FEFO (Mục 3.4 của Báo cáo)
* **File mã nguồn Backend**:
  * Kiểm tra tồn khả dụng và phân bổ số lượng xuất bán: [exportController.js](file:///D:/Study/University/H%E1%BB%8Dc%20k%E1%BB%B3%202%20-%20N%C4%83m%20h%E1%BB%8Dc%202025%20-%202026/Web/Quan_ly_kho_hang/backend/controllers/exportController.js) (tìm hàm `createExport` và đoạn logic truy vấn sắp xếp theo ngày hết hạn `expiry_date asc`).

### 3. Tích hợp AI Gemini và Email Cảnh báo (Mục 3.5 của Báo cáo)
* **File AI Gợi ý Backend**:
  * [inventoryController.js](file:///D:/Study/University/H%E1%BB%8Dc%20k%E1%BB%B3%202%20-%20N%C4%83m%20h%E1%BB%8Dc%202025%20-%202026/Web/Quan_ly_kho_hang/backend/controllers/inventoryController.js) (tìm hàm `getAiReplenishmentSuggestions` - nơi cấu hình prompt gửi đi và parse JSON kết quả trả về từ Gemini).
* **File Email Alert Backend**:
  * [email.service.js](file:///D:/Study/University/H%E1%BB%8Dc%20k%E1%BB%B3%202%20-%20N%C4%83m%20h%E1%BB%8Dc%202025%20-%202026/Web/Quan_ly_kho_hang/backend/services/email.service.js) (logic tạo transporter và gửi mã HTML email).
  * [inventoryController.js](file:///D:/Study/University/H%E1%BB%8Dc%20k%E1%BB%B3%202%20-%20N%C4%83m%20h%E1%BB%8Dc%202025%20-%202026/Web/Quan_ly_kho_hang/backend/controllers/inventoryController.js) (tìm hàm `sendEmailAlert` - endpoint nhận lệnh gọi từ frontend).

### 4. Triển khai các Chiến lược Rendering Next.js (Mục 4.1 của Báo cáo)
* **SSG (Trang giới thiệu)**: [about/page.js](file:///D:/Study/University/H%E1%BB%8Dc%20k%E1%BB%B3%202%20-%20N%C4%83m%20h%E1%BB%8Dc%202025%20-%202026/Web/Quan_ly_kho_hang/frontend/src/app/about/page.js) (trang React thuần không fetch dữ liệu).
* **ISR (Trang Dashboard)**: [dashboard/page.js](file:///D:/Study/University/H%E1%BB%8Dc%20k%E1%BB%B3%202%20-%20N%C4%83m%20h%E1%BB%8Dc%202025%20-%202026/Web/Quan_ly_kho_hang/frontend/src/app/dashboard/page.js) (tìm dòng khai báo `export const revalidate = 60;`).
* **SSR (Trang Phiếu nhập)**: [dashboard/imports/page.js](file:///D:/Study/University/H%E1%BB%8Dc%20k%E1%BB%B3%202%20-%20N%C4%83m%20h%E1%BB%8Dc%202025%20-%202026/Web/Quan_ly_kho_hang/frontend/src/app/dashboard/imports/page.js) (tìm dòng khai báo `export const dynamic = 'force-dynamic';`).

---

## PHẦN 4: CHECKLIST KIỂM TRA CHẤT LƯỢNG TRƯỚC KHI NỘP BÀI (PDF)

Hãy tích dấu kiểm tra các mục này trực tiếp trên file Microsoft Word trước khi bạn tiến hành **File -> Save As -> PDF** để đăng tải lên LMS:

- [ ] **Trang Bìa**: Đã xóa toàn bộ khung viền hoa văn sặc sỡ (đồ án chính quy yêu cầu bìa tối giản, trang trọng).
- [ ] **Mục lục tự động**: Đã nhấn chuột phải vào mục lục và chọn **Update Field -> Update entire table** để đảm bảo số trang khớp 100% với thực tế.
- [ ] **Danh mục hình & Danh mục bảng**: Đã được cập nhật đầy đủ số hiệu hình tương thích với số hiệu chương.
- [ ] **Hình ảnh không bị tràn lề**: Kiểm tra xem có ảnh chụp màn hình nào bị tràn lề trái hoặc lề phải của khổ giấy A4 hay không. Nếu có, hãy thu nhỏ lại.
- [ ] **Không có chữ "Cursor" hay "AI" trong nội dung chính**: Rà soát lại toàn bộ báo cáo để đảm bảo không để lộ các câu lệnh trao đổi hoặc nội dung tự động viết lỗi.
- [ ] **Link GitHub & Link Live hoạt động**: Kiểm tra xem các liên kết URL Vercel và Render chèn ở chương 6 có thể click trực tiếp được không.
- [ ] **Các trang trống**: Xóa toàn bộ các dòng trống dư thừa ở cuối các chương để tránh việc xuất hiện trang trắng không có nội dung trong file PDF cuối cùng.
