# CẨM NANG DUY NHẤT: HƯỚNG DẪN COPY-PASTE & CHỈNH SỬA BÁO CÁO CỦA BẠN

(Chuyển đổi từ Báo cáo TTCS sang Báo cáo Lập trình Web - Nhóm Hiệp & Huy - GV TS. Lê Ngọc Hiếu)


Tài liệu này là bản duy nhất bạn cần mở để sửa báo cáo. Mỗi phần đều ghi rõ [GIỮ NGUYÊN] hoặc [THAY THẾ] của phần văn bản, bảng biểu, hình ảnh tương ứng.

Khi dán văn bản mới, hãy chọn chế độ Paste Option là "Keep Text Only" hoặc "Merge Formatting" để không bị mất định dạng font Times New Roman và cỡ chữ 13pt trong file Word gốc của bạn.


---

## 1. TRANG BÌA (Trang 1)

[THAY THẾ TRANG BÌA] - Hãy xóa trang bìa cũ và dán đè nội dung bìa mới sau đây:


                     BỘ GIÁO DỤC VÀ ĐÀO TẠO

             HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG

             KHOA CÔNG NGHỆ THÔNG TIN 2 - TP. HỒ CHÍ MINH

                          --------------


                       BÁO CÁO ĐỒ ÁN CUỐI KỲ

                      MÔN HỌC: LẬP TRÌNH WEB

                            (INT1334)

                               NHÓM 8


                               ĐỀ TÀI:

               HỆ THỐNG QUẢN LÝ KHO THÔNG MINH WMS

                  (LOGISTICS & CHUỖI CUNG ỨNG)


             Giảng viên hướng dẫn: TS. LÊ NGỌC HIẾU

             Sinh viên thực hiện : 

               1. Đặng Văn Hiệp  - MSSV: N23DCCN155

               2. Võ Gia Huy     - MSSV: N23DCCN163

             Lớp                 : D23CQCN03-N

             Học kỳ              : II - Năm học 2025-2026

             Trọng số            : 50% điểm học phần


                     TP. HỒ CHÍ MINH, THÁNG 06 NĂM 2026


---

## 2. MỤC LỤC & CÁC DANH MỤC (Trang 2-4)

[THAY THẾ MỤC LỤC & DANH MỤC] - Thay thế mục lục tĩnh và danh mục cũ thành danh sách liệt kê trơn (sau khi chỉnh sửa xong toàn bộ báo cáo, bạn chỉ cần nhấn chuột phải vào Mục lục tự động trong Word và chọn "Update Field -> Update entire table" để Word tự điền số trang chính xác):


MỤC LỤC

TÓM TẮT ĐỀ TÀI

CHƯƠNG 1. GIỚI THIỆU ĐỀ TÀI
    1.1. Bối cảnh hình thành đề tài
    1.2. Bài toán đặt ra
    1.3. Mục tiêu đề tài
    1.4. Phạm vi thực hiện và giả định nghiệp vụ
    1.5. Đối tượng sử dụng và giá trị thực tiễn

CHƯƠNG 2. NỀN TẢNG LÝ THUYẾT VÀ LỰA CHỌN CÔNG NGHỆ
    2.1. Quản lý kho theo lô và hạn sử dụng
    2.2. Nguyên tắc FEFO và kiểm soát thời hạn được bán
    2.3. Mô hình trạng thái của phiếu nhập kho
    2.4. Tiêu chí lựa chọn công nghệ
    2.5. Lựa chọn PostgreSQL trên Neon
    2.6. Lựa chọn Express.js, Prisma ORM và JWT cho backend
        2.6.1. So sánh Express với các lựa chọn backend khác
        2.6.2. Lựa chọn JWT Refresh Token lưu DB cho xác thực và phân quyền API
    2.7. Lựa chọn Next.js 14 App Router cho frontend
        2.7.1. So sánh Next.js App Router với React Vite SPA
    2.8. Khả năng duy trì và mở rộng lâu dài

CHƯƠNG 3. PHƯƠNG PHÁP THỰC HIỆN VÀ GIẢI PHÁP
    3.1. Phương pháp thực hiện
    3.2. Kiến trúc tổng thể
    3.3. Tác nhân và yêu cầu chức năng
    3.4. Giải pháp nghiệp vụ nhập kho đa trạng thái
    3.5. Giải pháp xuất bán FEFO và trả nhà cung cấp
    3.6. Giải pháp AI đề xuất đặt hàng và email cảnh báo tự động
    3.7. Mô hình đầu vào - xử lý - đầu ra
    3.8. Thiết kế cơ sở dữ liệu và Schema Prisma
    3.9. Cách tính tồn kho bằng PostgreSQL View
    3.10. Tổ chức mã nguồn và bảo mật

CHƯƠNG 4. KẾT QUẢ THỰC HIỆN
    4.1. Các phân hệ đã hiện thực và Chiến lược Rendering
    4.2. Kịch bản minh họa kết quả
    4.3. Kết quả giao diện thực tế
    4.4. Kết quả kiểm thử tự động Jest
    4.5. Đánh giá mức độ đạt mục tiêu

CHƯƠNG 5. HẠN CHẾ VÀ HƯỚNG CẢI TIẾN
    5.1. Hạn chế hiện tại
    5.2. Khả năng phát triển lâu dài

CHƯƠNG 6. KẾT LUẬN

TÀI LIỆU THAM KHẢO

PHỤ LỤC A. CÁC API CHÍNH CỦA HỆ THỐNG
PHỤ LỤC B. TRẠNG THÁI NGHIỆP VỤ CHÍNH
PHỤ LỤC C. KỊCH BẢN KIỂM THỬ/DEMO ĐỀ XUẤT


DANH MỤC HÌNH

Hình 3.1 - Sơ đồ kiến trúc 3 tầng của hệ thống WMS

Hình 3.2 - Luồng trạng thái nghiệp vụ nhập kho

Hình 3.3 - Luồng xử lý xuất bán FEFO và trả nhà cung cấp

Hình 4.1 - Giao diện trang chủ Dashboard quản lý và biểu đồ Recharts

Hình 4.2 - Biểu mẫu tạo mới phiếu nhập tích hợp Camera quét mã QR

Hình 4.3 - Chi tiết phiếu nhập kho hiển thị Stepper và nút Phê duyệt của Admin

Hình 4.4 - Màn hình kết quả gợi ý đặt hàng do AI Gemini tính toán

Hình 4.5 - Giao diện Cảnh báo và Hộp thư Gmail nhận thông báo gửi qua Resend API

Hình 4.6 - Bản đồ định vị nhà cung cấp tích hợp Leaflet.js


DANH MỤC BẢNG

Bảng 1.1 - Vấn đề thực tế và giải pháp đề xuất

Bảng 1.2 - Phạm vi thực hiện của đề tài

Bảng 2.1 - Tiêu chí lựa chọn công nghệ

Bảng 2.2 - So sánh lựa chọn cơ sở dữ liệu

Bảng 2.3 - So sánh lựa chọn framework backend

Bảng 2.4 - So sánh phương án xác thực API

Bảng 2.5 - So sánh lựa chọn công nghệ frontend

Bảng 2.6 - Vai trò và khả năng duy trì của công nghệ sử dụng

Bảng 3.1 - Tác nhân và quyền sử dụng

Bảng 3.2 - Danh sách yêu cầu chức năng

Bảng 3.3 - Mô hình đầu vào - xử lý - đầu ra

Bảng 3.4 - Danh sách bảng vật lý và view

Bảng 4.1 - Kết quả hiện thực các phân hệ và Chiến lược Rendering tương ứng

Bảng 5.1 - Hạn chế và hướng cải tiến

Bảng Phụ lục B.1 - Phân công công việc của từng thành viên


DANH MỤC TỪ VIẾT TẮT

Từ viết tắt    Ý nghĩa

API    Application Programming Interface - Giao diện lập trình ứng dụng

CSDL    Cơ sở dữ liệu

FEFO    First Expired, First Out - Lô hết hạn sớm được ưu tiên xuất trước

JWT    JSON Web Token

NCC    Nhà cung cấp

ORM    Object Relational Mapping

RBAC    Role-Based Access Control - Phân quyền theo vai trò

REST    Representational State Transfer

SPA    Single Page Application - Ứng dụng đơn trang

RSC    React Server Component

SSR    Server-Side Rendering

SSG    Static Site Generation

ISR    Incremental Static Regeneration

CSR    Client-Side Rendering


---

## 3. TÓM TẮT ĐỀ TÀI (Trang 5)

[THAY THẾ TÓM TẮT ĐỀ TÀI] - Thay thế bằng đoạn văn mới dưới đây:


TÓM TẮT ĐỀ TÀI

    Đề tài xây dựng một ứng dụng web quản lý kho thông minh WMS hỗ trợ quản lý kho hàng cho mô hình đại lý nhỏ, tập trung vào các mặt hàng được nhập theo lô và có hạn sử dụng. Xuất phát từ các tình huống thường gặp như khó theo dõi lô cận hạn, nhầm lẫn khi nhập - xuất và thiếu căn cứ xử lý hàng cần trả nhà cung cấp, nhóm thiết kế hệ thống với hai vai trò sử dụng là quản trị viên và nhân viên kho.

    Ứng dụng được hiện thực theo cấu trúc tách biệt frontend, backend và cơ sở dữ liệu. Frontend sử dụng Next.js 14 App Router và Tailwind CSS kết hợp thư viện shadcn/ui; backend sử dụng Express.js, Prisma ORM và JWT; dữ liệu được lưu trữ trên PostgreSQL triển khai qua Neon Cloud. Nghiệp vụ chính gồm quản lý sản phẩm, nhà cung cấp, vị trí kệ; nhập kho theo quy trình đặt hàng - vận chuyển - kiểm hàng - phê duyệt; quản lý tồn theo lô khả dụng; xuất bán theo nguyên tắc FEFO kết hợp điều kiện hạn dùng; trả hàng nhà cung cấp có phê duyệt; cảnh báo tồn thấp, cận hạn, hết hạn, tồn lâu; và đề xuất bổ sung hàng bằng trí tuệ nhân tạo Gemini AI kết hợp Resend API email alert tự động.

    Kết quả của đề tài là một phiên bản ứng dụng web có thể minh họa trọn vẹn dòng dữ liệu từ nhập liệu, xử lý nghiệp vụ đến kết quả tồn kho và cảnh báo. Báo cáo đồng thời trình bày lý do lựa chọn công nghệ, khả năng duy trì/mở rộng và các giới hạn cần cải tiến khi triển khai trong môi trường thực tế.


---

## 4. CHƯƠNG 1. GIỚI THIỆU ĐỀ TÀI

* **1.1. Bối cảnh hình thành đề tài** -> **[GIỮ NGUYÊN VĂN BẢN]**
* **Bảng 1.1 - Vấn đề thực tế và giải pháp đề xuất** -> **[GIỮ NGUYÊN BẢNG]** (Nghiệp vụ kho theo lô và FEFO vẫn giữ nguyên).

* **1.2. Bài toán đặt ra** -> **[GIỮ NGUYÊN VĂN BẢN]**

* **1.3. Mục tiêu đề tài** -> **[THAY THẾ VĂN BẢN]** - Dán đè đoạn văn sau để bổ sung mục tiêu về công nghệ Web hiện đại:


1.3. Mục tiêu đề tài

    Mục tiêu tổng quát của đề tài là xây dựng một ứng dụng web quản lý kho hàng theo lô và hạn sử dụng cho đại lý nhỏ, từ đó hỗ trợ người dùng thực hiện nghiệp vụ kho có kiểm soát và giảm sai sót so với cách quản lý phân tán.

    Hệ thống hỗ trợ quản lý tài khoản và phân quyền cho quản trị viên, nhân viên kho thông qua cơ chế JWT Refresh Token lưu cơ sở dữ liệu.

    Hệ thống hỗ trợ quản lý danh mục sản phẩm, nhà cung cấp, giá nhập hợp đồng và vị trí lưu trữ kệ hàng.

    Hệ thống hỗ trợ quản lý phiếu nhập qua các giai đoạn đặt hàng, vận chuyển, kiểm hàng và phê duyệt từ admin.

    Hệ thống hỗ trợ theo dõi tồn kho theo sản phẩm và theo lô hàng thực tế bao gồm hạn sử dụng và vị trí kệ kho.

    Hệ thống hỗ trợ xuất bán theo nguyên tắc FEFO trên các lô còn đủ điều kiện hạn dùng tối thiểu được bán.

    Hệ thống hỗ trợ lập phiếu trả lại nhà cung cấp đối với các lô cần xử lý, có bước phê duyệt giữ chỗ của admin.

    Hệ thống hỗ trợ cảnh báo tự động gửi email và đề xuất đặt hàng thông minh bằng AI Gemini.


* **1.4. Phạm vi thực hiện và giả định nghiệp vụ** (Bảng 1.2) -> **[THAY THẾ BẢNG]** - Hãy điền dữ liệu vào bảng hiện tại trong Word của bạn theo dòng và ô như dưới đây:


Bảng 1.2 - Phạm vi thực hiện của đề tài

Hàng 1:
- Cột 1 (Nội dung): Mô hình kho
- Cột 2 (Phạm vi/giả định của đề tài): Quản lý một kho của đại lý; chưa mở rộng sang nhiều kho/chi nhánh.

Hàng 2:
- Cột 1 (Nội dung): Người sử dụng
- Cột 2 (Phạm vi/giả định của đề tài): Admin và nhân viên kho; NCC/khách hàng chỉ xuất hiện trong dữ liệu nghiệp vụ.

Hàng 3:
- Cột 1 (Nội dung): Nhập kho
- Cột 2 (Phạm vi/giả định của đề tài): Quản lý đặt hàng, vận chuyển dự kiến, kiểm hàng và duyệt trước khi tăng tồn.

Hàng 4:
- Cột 1 (Nội dung): Xuất kho
- Cột 2 (Phạm vi/giả định của đề tài): Gồm xuất bán (SELL) và trả nhà cung cấp (RETURN).

Hàng 5:
- Cột 1 (Nội dung): Hàng cần xử lý
- Cột 2 (Phạm vi/giả định của đề tài): Trong phạm vi đề tài, giả định nhà cung cấp chấp nhận nhận lại hàng cận hạn hoặc hết hạn cần xử lý.

Hàng 6:
- Cột 1 (Nội dung): Giao hàng khách hàng
- Cột 2 (Phạm vi/giả định của đề tài): Không quản lý giao nhận đến địa chỉ khách; thông tin người nhận chỉ là dữ liệu phiếu bán nếu cần.

Hàng 7:
- Cột 1 (Nội dung): Công nghệ bản đồ/Môi trường
- Cột 2 (Phạm vi/giả định của đề tài): Bản đồ logistics Leaflet.js để định vị nhà cung cấp. Đóng gói qua Docker Compose và deploy trực tuyến trên Vercel và Render.


* **1.5. Đối tượng sử dụng và giá trị thực tiễn** -> **[GIỮ NGUYÊN VĂN BẢN]**


---

## 5. CHƯƠNG 2. NỀN TẢNG LÝ THUYẾT VÀ LỰA CHỌN CÔNG NGHỆ

* **2.1. Quản lý kho theo lô và hạn sử dụng** -> **[GIỮ NGUYÊN VĂN BẢN]**

* **2.2. Nguyên tắc FEFO và kiểm soát thời hạn được bán** -> **[GIỮ NGUYÊN VĂN BẢN]**

* **2.3. Mô hình trạng thái của phiếu nhập kho** -> **[GIỮ NGUYÊN VĂN BẢN]**

* **2.4. Tiêu chí lựa chọn công nghệ** -> **[GIỮ NGUYÊN VĂN BẢN]**
* **Bảng 2.1 - Tiêu chí lựa chọn công nghệ** -> **[GIỮ NGUYÊN BẢNG]**
* **Bảng 2.2 - So sánh lựa chọn cơ sở dữ liệu** -> **[GIỮ NGUYÊN BẢNG]**

* **2.5. Lựa chọn PostgreSQL trên Neon** -> **[THAY THẾ VĂN BẢN]** - Thay thế cho phần database SQLite/MySQL cũ:


2.5. Lựa chọn PostgreSQL trên Neon

    PostgreSQL là nền tảng dữ liệu cốt lõi của đề tài vì bài toán kho có quan hệ chặt giữa sản phẩm, nhà cung cấp, phiếu nhập, chi tiết lô, phiếu xuất và người dùng. Tài liệu chính thức PostgreSQL mô tả khóa ngoại dùng để duy trì quan hệ hợp lệ giữa các bảng và hỗ trợ mô hình quan hệ nhiều-nhiều; đây là nhu cầu trực tiếp của dữ liệu sản phẩm - nhà cung cấp và chứng từ - chi tiết chứng từ.

    Nhóm triển khai PostgreSQL trên Neon. Theo tài liệu Neon, ứng dụng kết nối tới Neon thông qua chuỗi kết nối PostgreSQL tiêu chuẩn thông qua Prisma ORM, giúp backend Express tương tác với database cloud ổn định. Việc sử dụng database cloud cũng giúp các thành viên trong nhóm làm việc chung dữ liệu trong quá trình kiểm thử và demo thực tế.


* **2.6. Lựa chọn Express.js, Prisma ORM và JWT cho backend** -> **[THAY THẾ VĂN BẢN]** - Dán đè nội dung sau (nâng cấp từ Flask):


2.6. Lựa chọn Express.js, Prisma ORM và JWT cho backend

    Express.js (Node.js) được lựa chọn làm framework backend nhờ cơ chế phi đồng bộ (Non-blocking I/O) giúp xử lý các truy vấn và request API với độ trễ thấp nhất. Hệ thống tổ chức theo mô hình MVC tách biệt phân hệ routes và controllers.

    Prisma ORM được sử dụng thay thế SQLAlchemy của Python. Prisma giúp ánh xạ các bảng PostgreSQL thành các kiểu dữ liệu an toàn trong TypeScript (Type-safety), hỗ trợ tạo migration dễ dàng và tự động đồng bộ hóa cấu trúc cơ sở dữ liệu qua lệnh prisma db push.

    Xác thực hệ thống sử dụng JWT kép bao gồm Access Token và Refresh Token lưu trữ trực tiếp trong cơ sở dữ liệu bảng RefreshToken giúp tối ưu độ bảo mật phiên làm việc và kiểm soát quyền admin/staff ở backend.


* **2.6.1. So sánh Express với các lựa chọn backend khác** -> **[THAY THẾ VĂN BẢN]**
* **Bảng 2.3 - So sánh lựa chọn framework backend** -> **[THAY THẾ BẢNG]** - Hãy sửa nội dung từng ô của Bảng 2.3 cũ trong file Word theo thông tin ô dưới đây:


2.6.1. So sánh Express với các lựa chọn backend khác

    Express.js, Django và Spring Boot đều có thể xây dựng API cho một hệ thống quản lý kho. Nhóm so sánh theo các tiêu chí gắn với phạm vi đề tài: khả năng tổ chức module nghiệp vụ, mức độ cấu hình ban đầu, khả năng bảo trì và sự phù hợp với thời gian thực hiện.

    Về mức độ khởi tạo ban đầu, Express gọn nhẹ và chủ động chọn thư viện, phù hợp tiến độ và quy mô hiện tại. Django tích hợp quá nhiều cấu hình mặc định dư thừa. Spring Boot có hệ sinh thái Java đồ sộ đòi hỏi thời gian cấu hình lâu hơn.

    Về tổ chức phân hệ API, Express hỗ trợ chia router cực kỳ tường minh theo từng module nhập, xuất, tồn, cảnh báo. Django quản lý theo kiến trúc app khép kín. Spring Boot chia theo mô hình Controller-Service-Repository nghiêm ngặt.

    Về tương tác CSDL, Express sử dụng Prisma ORM giúp đảm bảo an toàn kiểu dữ liệu cao và đồng bộ nhanh. Django dùng ORM tích hợp sẳn. Spring Boot dựa vào Spring Data JPA.

    Kết luận lựa chọn: Nhóm quyết định sử dụng Express.js và Prisma ORM vì tính linh hoạt, gọn nhẹ, tối ưu hóa hiệu năng phi đồng bộ và đáp ứng hoàn hảo quy mô quản lý một kho của đồ án.


Bảng 2.3 - So sánh lựa chọn framework backend

Hàng Tiêu đề:
- Cột 1: Tiêu chí
- Cột 2: Express.js
- Cột 3: Django
- Cột 4: Spring Boot
- Cột 5: Đánh giá cho đề tài

Hàng 1:
- Cột 1: Mức độ khởi tạo
- Cột 2: Gọn nhẹ, linh hoạt
- Cột 3: Nhiều file sẵn
- Cột 4: Cấu hình phức tạp
- Cột 5: Express phù hợp tiến độ và quy mô

Hàng 2:
- Cột 1: Tổ chức API
- Cột 2: Chia Router rõ ràng
- Cột 3: Cấu trúc app
- Cột 4: Controller/Service
- Cột 5: Router của Express đủ để tách biệt

Hàng 3:
- Cột 1: CSDL
- Cột 2: Prisma ORM
- Cột 3: ORM mặc định
- Cột 4: JPA / Hibernate
- Cột 5: Prisma giúp an toàn kiểu dữ liệu

Hàng 4:
- Cột 1: Bảo trì
- Cột 2: Linh hoạt, dễ đọc
- Cột 3: Quy ước chặt
- Cột 4: Rất cao, doanh nghiệp
- Cột 5: Express đáp ứng tốt hệ thống hiện tại

Hàng 5:
- Cột 1: Quyết định
- Cột 2: Được chọn
- Cột 3: Phương án phụ
- Cột 4: Phương án phụ
- Cột 5: Lựa chọn tối ưu nhất cho nhóm


* **2.6.2. Lựa chọn JWT Refresh Token lưu DB cho xác thực và phân quyền API** -> **[THÊM MỚI HOÀN TOÀN MỤC NÀY]**
* **Bảng 2.4 - So sánh phương án xác thực API** -> **[THAY THẾ BẢNG]** - Hãy thay thế dữ liệu từng ô trong bảng xác thực cũ bằng các ô sau:


2.6.2. Lựa chọn JWT Refresh Token lưu DB cho xác thực và phân quyền API

    Frontend Next.js của hệ thống gọi các REST API ở backend. Nhóm sử dụng JWT để mang thông tin xác thực trong các request API và kiểm tra vai trò admin/staff tại backend.

    Về cơ chế xác thực, client gửi Access Token trong header mỗi request, backend tiến hành xác minh chữ ký số. Đối với Refresh Token, hệ thống lưu trực tiếp trong DB bảng RefreshToken và truyền dưới dạng HttpOnly Cookie để tránh rò rỉ token qua các lỗ hổng XSS phía client.

    Về tính phù hợp kiến trúc, JWT hoàn toàn tương thích với mô hình REST API tách biệt giữa Next.js và Express, giúp loại bỏ việc lưu trữ session cồng kềnh phía máy chủ.

    Về khả năng thu hồi phiên, việc lưu trữ Refresh Token trong cơ sở dữ liệu cho phép quản trị viên chủ động xóa bản ghi token phía server để bắt buộc tài khoản nhân viên đăng xuất ngay lập tức khi phát hiện nghi vấn bảo mật.


Bảng 2.4 - So sánh phương án xác thực API

Hàng Tiêu đề:
- Cột 1: Tiêu chí
- Cột 2: JWT dùng trong đề tài
- Cột 3: Session cookie phía máy chủ
- Cột 4: Đánh giá cho đề tài

Hàng 1:
- Cột 1: Cách xác thực
- Cột 2: Client gửi token; backend xác minh claim/chữ ký
- Cột 3: Client gửi cookie; server quản lý/xác minh session
- Cột 4: Cả hai có thể an toàn nếu cấu hình đúng

Hàng 2:
- Cột 1: Phù hợp REST
- Cột 2: Thuận tiện cho frontend gọi API tách biệt
- Cột 3: Phù hợp cao với web cùng miền, phiên truyền thống
- Cột 4: JWT phù hợp kiến trúc REST API hiện tại

Hàng 3:
- Cột 1: Thu hồi phiên
- Cột 2: Xóa bản ghi Refresh Token trong DB phía máy chủ
- Cột 3: Có thể hủy session phía server trực tiếp
- Cột 4: Hoạt động tốt khi cần quản lý phiên từ xa

Hàng 4:
- Cột 1: Quyết định
- Cột 2: Được chọn
- Cột 3: Phương án phụ
- Cột 4: Phù hợp cách frontend gọi API tách biệt


* **2.7. Lựa chọn Next.js 14 App Router cho frontend** -> **[THAY THẾ VĂN BẢN]** (thay cho React Vite cũ):


2.7. Lựa chọn Next.js 14 App Router cho frontend

    Next.js 14 App Router cung cấp một giải pháp toàn diện để xây dựng giao diện người dùng. Đặc điểm này phù hợp với hệ thống có nhiều trang dữ liệu và thao tác lặp lại như bảng sản phẩm, phiếu nhập, phiếu xuất, cảnh báo và dashboard.

    Nhóm không khẳng định Next.js tốt hơn tuyệt đối các lựa chọn khác. Next.js được chọn vì phù hợp kỹ năng triển khai của nhóm, hỗ trợ chia giao diện theo component và đáp ứng nhu cầu tương tác nhiều trạng thái trong phạm vi đề tài.


* **2.7.1. So sánh Next.js App Router với React Vite SPA** -> **[THAY THẾ VĂN BẢN]**
* **Bảng 2.5 - So sánh lựa chọn công nghệ frontend** -> **[THAY THẾ BẢNG]** - Hãy điền dữ liệu mới vào bảng frontend cũ:


2.7.1. So sánh Next.js App Router với React Vite SPA

    Next.js 14 App Router nâng cấp so với React Vite nhờ tích hợp các Rendering Strategies:

    Về cách kết xuất giao diện UI, Next.js hỗ trợ React Server Components (RSC) kết xuất dữ liệu trên server giúp tối ưu hóa SEO và bảo mật thông tin. React Vite là SPA kết xuất hoàn toàn ở client.

    Về mức độ tích hợp tính năng, Next.js có sẵn File-based Routing, API Routes, Image Optimization và Server Actions. React Vite cần cấu hình thủ công react-router-dom và các thư viện bên ngoài.

    Về làm việc với State, Next.js kết hợp Zustand quản lý token toàn cục và React Hook Form + Zod để kiểm tra lỗi nhập liệu tại form.

    Kết luận lựa chọn: Next.js được chọn vì hỗ trợ các phương pháp render SSR, SSG, ISR và tính năng Server Actions giúp gọi dữ liệu trực tiếp tại máy chủ, giảm dung lượng JavaScript tải về client.


Bảng 2.5 - So sánh lựa chọn công nghệ frontend

Hàng Tiêu đề:
- Cột 1: Tiêu chí
- Cột 2: Next.js App Router
- Cột 3: React Vite SPA
- Cột 4: Angular Framework
- Cột 5: Đánh giá cho đề tài

Hàng 1:
- Cột 1: Cách tổ chức UI
- Cột 2: Server Components
- Cột 3: Client Render
- Cột 4: Component & Modules
- Cột 5: Next.js tối ưu tốc độ tải trang

Hàng 2:
- Cột 1: Tích hợp sẵn
- Cột 2: Routing, Server Actions
- Cột 3: Cần cài thêm
- Cột 4: Đầy đủ nhưng nặng
- Cột 5: Next.js cho phép phát triển nhanh

Hàng 3:
- Cột 1: SEO
- Cột 2: Rất tốt (Meta động)
- Cột 3: Kém (Single Page)
- Cột 4: Rất tốt
- Cột 5: Phù hợp tiêu chí SEO điểm cộng

Hàng 4:
- Cột 1: State & Form
- Cột 2: Zustand & Zod Form
- Cột 3: Context API
- Cột 4: Form Modules
- Cột 5: Zustand gọn nhẹ và hiệu năng cao

Hàng 5:
- Cột 1: Quyết định
- Cột 2: Được chọn
- Cột 3: Phương án phụ
- Cột 4: Phương án phụ
- Cột 5: Next.js 14 là bắt buộc theo đề bài


* **2.8. Khả năng duy trì và mở rộng lâu dài** -> **[THAY THẾ VĂN BẢN]**
* **Bảng 2.6 - Vai trò và khả năng duy trì của công nghệ sử dụng** -> **[THAY THẾ BẢNG]** - Hãy điền dữ liệu mới vào các ô:


Bảng 2.6 - Vai trò và khả năng duy trì của công nghệ sử dụng

Hàng Tiêu đề:
- Cột 1: Thành phần
- Cột 2: Giá trị sử dụng hiện tại
- Cột 3: Khả năng cải tiến

Hàng 1:
- Cột 1: Neon PostgreSQL
- Cột 2: Lưu trữ quan hệ và View tính tồn
- Cột 3: Thêm index, backup tự động

Hàng 2:
- Cột 1: Express.js
- Cột 2: REST API xử lý nghiệp vụ kho
- Cột 3: Bổ sung WebSockets, module kế toán

Hàng 3:
- Cột 1: Prisma ORM
- Cột 2: An toàn kiểu dữ liệu khi truy vấn
- Cột 3: Cập nhật schema migrations

Hàng 4:
- Cột 1: Next.js 14
- Cột 2: Dựng UI, tối ưu render và routing
- Cột 3: Tối ưu hóa Lighthouse Core Web Vitals

Hàng 5:
- Cột 1: Zustand
- Cột 2: Quản lý token đăng nhập toàn cục
- Cột 3: Lưu trữ trạng thái các thiết lập UI khác


---

## 6. CHƯƠNG 3. PHƯƠNG PHÁP THỰC HIỆN VÀ GIẢI PHÁP

* **3.1. Phương pháp thực hiện** -> **[GIỮ NGUYÊN VĂN BẢN]**

* **3.2. Kiến trúc tổng thể** -> **[THAY THẾ VĂN BẢN]**
* **Hình 3.1 - Sơ đồ kiến trúc 3 tầng của hệ thống WMS** -> **[THAY THẾ SƠ ĐỒ/ẢNH]** (vẽ lại sơ đồ 3 tầng Next.js - Express - Postgres):


3.2. Kiến trúc tổng thể

    Ứng dụng sử dụng mô hình web gồm ba tầng logic: giao diện người dùng trên trình duyệt (Next.js 14 App Router), dịch vụ xử lý nghiệp vụ REST API (Express) và cơ sở dữ liệu PostgreSQL. Người dùng thao tác trên frontend; frontend gửi yêu cầu JSON kèm token xác thực tới backend; backend kiểm tra quyền, xử lý quy tắc nghiệp vụ, truy vấn hoặc cập nhật PostgreSQL và trả kết quả về giao diện.

    (Hình 3.1 - Sơ đồ kiến trúc 3 tầng của hệ thống WMS)

    [Chèn ảnh sơ đồ kiến trúc 3 tầng: "docs/so_do_kien_truc_3_tang_wms.png" tại đây, thụt lề 1.27 cm]


* **3.3. Tác nhân và yêu cầu chức năng** -> **[THAY THẾ VĂN BẢN]**
* **Bảng 3.1 - Tác nhân và quyền sử dụng** -> **[GIỮ NGUYÊN BẢNG]**
* **Bảng 3.2 - Danh sách yêu cầu chức năng** -> **[THAY THẾ BẢNG]** - Hãy điền dữ liệu sau vào các hàng trong bảng yêu cầu chức năng của bạn (bổ sung QR, AI, Email):


Bảng 3.2 - Danh sách yêu cầu chức năng

Hàng 1:
- Cột 1 (Mã): F01
- Cột 2 (Tên yêu cầu): Xác thực & Phân quyền
- Cột 3 (Mô tả): Người dùng đăng nhập qua JWT (Access và Refresh Token) để xác định vai trò Admin/Staff.

Hàng 2:
- Cột 1 (Mã): F02
- Cột 2 (Tên yêu cầu): Quản lý Sản phẩm
- Cột 3 (Mô tả): Quản lý thông tin hàng hóa, min_stock và số ngày hạn sử dụng tối thiểu được bán.

Hàng 3:
- Cột 1 (Mã): F03
- Cột 2 (Tên yêu cầu): Quản lý Nhà cung cấp
- Cột 3 (Mô tả): Quản lý danh mục nhà cung cấp, khoảng cách địa lý và lead-time giao hàng.

Hàng 4:
- Cột 1 (Mã): F04
- Cột 2 (Tên yêu cầu): Quản lý Vị trí kệ
- Cột 3 (Mô tả): Cấu hình sức chứa và vị trí kệ kho thực tế phục vụ sắp xếp lô hàng.

Hàng 5:
- Cột 1 (Mã): F05
- Cột 2 (Tên yêu cầu): Nhập kho đa trạng thái
- Cột 3 (Mô tả): Luồng phiếu nhập từ lúc đặt hàng (Ordered), vận chuyển (In Transit) đến kiểm hàng (Inspecting) và duyệt.

Hàng 6:
- Cột 1 (Mã): F06
- Cột 2 (Tên yêu cầu): Kiểm kho bằng QR
- Cột 3 (Mô tả): Sử dụng camera/webcam quét mã QR Code để kiểm tra và đối chiếu nhanh số lượng đạt/lỗi khi nhận hàng.

Hàng 7:
- Cột 1 (Mã): F07
- Cột 2 (Tên yêu cầu): Tồn kho lô & Kệ
- Cột 3 (Mô tả): Hiển thị chi tiết số lượng sản phẩm tồn, hạn sử dụng và vị trí kệ chứa của từng lô hàng thực tế.

Hàng 8:
- Cột 1 (Mã): F08
- Cột 2 (Tên yêu cầu): Xuất bán FEFO
- Cột 3 (Mô tả): Tự động tính toán phân bổ lô xuất ưu tiên sản phẩm hết hạn trước và lọc bỏ hàng không đủ ngày bán.

Hàng 9:
- Cột 1 (Mã): F09
- Cột 2 (Tên yêu cầu): Trả NCC chờ duyệt
- Cột 3 (Mô tả): Tạo phiếu trả các lô lỗi, cận hạn về nhà cung cấp và tự động giữ chỗ (reserve) số lượng tồn.

Hàng 10:
- Cột 1 (Mã): F10
- Cột 2 (Tên yêu cầu): Cảnh báo tồn
- Cột 3 (Mô tả): Tự động phát hiện và cảnh báo tồn thấp, hàng cận hạn, hết hạn và tồn đọng lâu ngày trên giao diện.

Hàng 11:
- Cột 1 (Mã): F11
- Cột 2 (Tên yêu cầu): Resend Email API
- Cột 3 (Mô tả): Cho phép bấm nút gửi email danh sách hàng thiếu hụt tự động về hòm thư Gmail của Admin.

Hàng 12:
- Cột 1 (Mã): F12
- Cột 2 (Tên yêu cầu): AI Gemini gợi ý
- Cột 3 (Mô tả): Tích hợp AI Gemini để phân tích lịch sử nhập kho và tồn kho, từ đó đưa ra đề xuất số lượng đặt hàng tối ưu.


* **3.4. Giải pháp nghiệp vụ nhập kho đa trạng thái** -> **[GIỮ NGUYÊN VĂN BẢN]**
* **Hình 3.2 - Luồng trạng thái nghiệp vụ nhập kho** -> **[GIỮ NGUYÊN SƠ ĐỒ]**

* **3.5. Giải pháp xuất bán FEFO và trả nhà cung cấp** -> **[GIỮ NGUYÊN VĂN BẢN]**
* **Hình 3.3 - Luồng xử lý xuất bán FEFO và trả nhà cung cấp** -> **[GIỮ NGUYÊN SƠ ĐỒ]**

* **3.6. Giải pháp AI đề xuất đặt hàng và email cảnh báo tự động** -> **[THAY THẾ VĂN BẢN]**:


3.6. Giải pháp AI đề xuất đặt hàng và email cảnh báo tự động

    Hệ thống gọi API Gemini Pro bằng cách truyền danh sách sản phẩm tồn thấp (dưới min_stock) và lịch sử giao dịch nhập kho 3 tháng gần nhất có trạng thái COMPLETED. Mô hình AI phân tích và đưa ra phản hồi dưới dạng JSON chứa số lượng đề xuất đặt thêm và nhà cung cấp ưu tiên kèm giá tốt nhất từ bảng giá hợp đồng.

    Đồng thời, hệ thống tích hợp Resend API. Khi phát hiện sản phẩm thiếu hụt dưới ngưỡng an toàn, Admin chỉ cần bấm nút để gửi email HTML chứa danh sách sản phẩm tồn thấp về email quản trị viên.


* **3.7. Mô hình đầu vào - xử lý - đầu ra** -> **[GIỮ NGUYÊN VĂN BẢN]**
* **Bảng 3.3 - Mô hình đầu vào - xử lý - đầu ra** -> **[GIỮ NGUYÊN BẢNG]**

* **3.8. Thiết kế cơ sở dữ liệu và Schema Prisma** -> **[THAY THẾ VĂN BẢN]**
* **Bảng 3.4 - Danh sách bảng vật lý và view** -> **[THAY THẾ BẢNG]** - Hãy thay thế dữ liệu bảng CSDL cũ bằng các thông tin ô dưới đây (bổ sung Refresh Token):


3.8. Thiết kế cơ sở dữ liệu và Schema Prisma

    Cơ sở dữ liệu được thiết kế theo mô hình quan hệ, gồm 10 bảng vật lý chính được khai báo trong schema.prisma (User, RefreshToken, Product, Supplier, SupplierProductPrice, Location, ImportReceipt, ImportDetail, ExportReceipt, ExportDetail) và 2 SQL Views (v_stock_balance, v_lot_stock). Các bảng được liên kết chặt chẽ qua khóa ngoại nhằm đảm bảo tính toàn vẹn dữ liệu.


Bảng 3.4 - Danh sách bảng vật lý và view

Hàng Tiêu đề:
- Cột 1: STT
- Cột 2: Bảng/View
- Cột 3: Nội dung chính
- Cột 4: Vai trò nghiệp vụ

Hàng 1:
- Cột 1: 1
- Cột 2: users
- Cột 3: Tài khoản, mật khẩu băm, role
- Cột 4: Xác thực và phân quyền

Hàng 2:
- Cột 1: 2
- Cột 2: refresh_tokens
- Cột 3: Lưu Refresh Token gắn với User
- Cột 4: Bảo mật và duy trì đăng nhập

Hàng 3:
- Cột 1: 3
- Cột 2: products
- Cột 3: Sản phẩm, min_stock, min_days_sell
- Cột 4: Danh mục và cấu hình cảnh báo

Hàng 4:
- Cột 1: 4
- Cột 2: suppliers
- Cột 3: NCC, liên hệ, distance_km
- Cột 4: Tính lịch và khoảng cách giao hàng

Hàng 5:
- Cột 1: 5
- Cột 2: supplier_prices
- Cột 3: Đơn giá hợp đồng, lead time
- Cột 4: Giá nhập và đề xuất của AI

Hàng 6:
- Cột 1: 6
- Cột 2: locations
- Cột 3: Kệ, hàng, cột, sức chứa
- Cột 4: Vị trí kệ hàng lưu trữ

Hàng 7:
- Cột 1: 7
- Cột 2: import_receipts
- Cột 3: Phiếu nhập và trạng thái
- Cột 4: Vòng đời nhập kho

Hàng 8:
- Cột 1: 8
- Cột 2: import_details
- Cột 3: Chi tiết lô hàng nhập, HSD, kệ
- Cột 4: Dữ liệu lô hàng tồn

Hàng 9:
- Cột 1: 9
- Cột 2: export_receipts
- Cột 3: Phiếu SELL/RETURN, duyệt trả
- Cột 4: Giao dịch xuất kho

Hàng 10:
- Cột 1: 10
- Cột 2: export_details
- Cột 3: Lô xuất, số lượng, giá bán
- Cột 4: Truy vết xuất theo lô

Hàng 11:
- Cột 1: 11
- Cột 2: v_stock_balance
- Cột 3: Tồn tổng theo sản phẩm
- Cột 4: Cảnh báo tồn thấp và đề xuất

Hàng 12:
- Cột 1: 12
- Cột 2: v_lot_stock
- Cột 3: Tồn theo lô, chờ trả, khả dụng
- Cột 4: FEFO, cảnh báo hạn và trả NCC


* **3.9. Cách tính tồn kho bằng PostgreSQL View** -> **[GIỮ NGUYÊN VĂN BẢN]**

* **3.10. Tổ chức mã nguồn và bảo mật** -> **[THAY THẾ VĂN BẢN]** (MVC Next.js/Express thay cho Flask):


3.10. Tổ chức mã nguồn và bảo mật

    Backend tổ chức theo các thư mục Router, Controller, Service. Frontend tổ chức theo Next.js App Router (app/), components/, store/. Mật khẩu người dùng được băm bằng bcryptjs. Khóa bí mật JWT và API Key được bảo mật trong tệp .env. Route bảo vệ được thiết lập ở cả backend API middleware và frontend Next.js middleware.


---

## 7. CHƯƠNG 4. KẾT QUẢ THỰC HIỆN

* **4.1. Các phân hệ đã hiện thực và Chiến lược Rendering** -> **[THAY THẾ VĂN BẢN]**
* **Bảng 4.1 - Kết quả hiện thực các phân hệ và Chiến lược Rendering tương ứng** -> **[THÊM MỚI BẢNG]** - Hãy tạo thêm một bảng mới trong Word với thông tin các ô dưới đây:


4.1. Các phân hệ đã hiện thực và Chiến lược Rendering

    Nhóm đã xây dựng hoàn tất 10 phân hệ chức năng: Xác thực (Zustand + JWT), Sản phẩm, Nhà cung cấp (Bản đồ Leaflet), Nhập kho (QR scanner), Xuất bán (FEFO), Trả NCC, Cảnh báo (Resend API email), Đề xuất bổ sung (AI Gemini), Dashboard (biểu đồ Recharts), Người dùng.

    Next.js áp dụng các chiến lược kết xuất: SSG cho trang giới thiệu /about; ISR cho trang /dashboard; SSR cho danh sách phiếu nhập /dashboard/imports; CSR cho các form nhập liệu tương tác.


Bảng 4.1 - Kết quả hiện thực các phân hệ và Chiến lược Rendering tương ứng

Hàng Tiêu đề:
- Cột 1: Tuyến đường (Route)
- Cột 2: Chiến lược Render
- Cột 3: Triển khai trong Code
- Cột 4: Lý do

Hàng 1:
- Cột 1: /about
- Cột 2: SSG
- Cột 3: Trang React component tĩnh
- Cột 4: Không thay đổi dữ liệu, dựng sẵn lúc build.

Hàng 2:
- Cột 1: /dashboard
- Cột 2: ISR
- Cột 3: export const revalidate = 60
- Cột 4: Cập nhật thống kê định kỳ sau mỗi 60 giây.

Hàng 3:
- Cột 1: /dashboard/imports
- Cột 2: SSR
- Cột 3: export const dynamic = 'force-dynamic'
- Cột 4: Luôn hiển thị danh sách phiếu nhập mới nhất.

Hàng 4:
- Cột 1: /dashboard/imports/new
- Cột 2: CSR
- Cột 3: 'use client'
- Cột 4: Phục vụ các thao tác quét mã QR, form động.


* **4.2. Kịch bản minh họa kết quả** -> **[THAY THẾ VĂN BẢN]** (kịch bản chạy demo mới):


4.2. Kịch bản minh họa kết quả

    1. Admin đăng nhập, cấu hình sản phẩm và giá hợp đồng nhà cung cấp.

    2. Nhân viên tạo phiếu nhập, xác nhận vận chuyển, kiểm hàng bằng QR code.

    3. Admin duyệt phiếu nhập, tồn kho tự động tăng trên hệ thống.

    4. Nhân viên tạo phiếu xuất bán, hệ thống tự chọn lô xuất theo FEFO.

    5. Admin theo dõi cảnh báo tồn kho và bấm gửi email thông báo tự động.

    6. Admin gọi AI Gemini để lấy đề xuất nhập hàng và duyệt tạo phiếu nháp.


* **4.3. Kết quả giao diện thực tế** -> **[THAY THẾ CHÚ THÍCH & HÌNH ẢNH]** (Tất cả hình từ 4.1 đến 4.3 là thay ảnh chụp màn hình Web mới, hình từ 4.4 đến 4.6 là thêm mới hoàn toàn):


4.3. Kết quả giao diện thực tế

    Hình 4.1 - Giao diện trang chủ Dashboard quản lý và biểu đồ Recharts
    [Chèn ảnh chụp màn hình trang chủ Dashboard WMS có chứa các thẻ KPI và biểu đồ Recharts tại đây, thụt lề 1.27 cm]

    Hình 4.2 - Biểu mẫu tạo mới phiếu nhập tích hợp Camera quét mã QR
    [Chèn ảnh chụp màn hình form Tạo phiếu nhập kho mới, hiển thị khung quét mã QR qua webcam/camera tại đây, thụt lề 1.27 cm]

    Hình 4.3 - Chi tiết phiếu nhập kho hiển thị Stepper và nút Phê duyệt của Admin
    [Chèn ảnh chụp màn hình trang Chi tiết phiếu nhập hiển thị Stepper quy trình và nút Phê duyệt của Admin tại đây, thụt lề 1.27 cm]

    Hình 4.4 - Màn hình kết quả gợi ý đặt hàng do AI Gemini tính toán
    [Chèn ảnh chụp màn hình giao diện kết quả AI gợi ý đặt hàng kèm nhà cung cấp và số lượng tối ưu tại đây, thụt lề 1.27 cm]

    Hình 4.5 - Giao diện Cảnh báo và Hộp thư Gmail nhận thông báo gửi qua Resend API
    [Chèn ảnh chụp màn hình giao diện Cảnh báo tồn kho và ảnh hộp thư Gmail nhận được thông báo tại đây, thụt lề 1.27 cm]

    Hình 4.6 - Bản đồ định vị nhà cung cấp tích hợp Leaflet.js
    [Chèn ảnh chụp màn hình bản đồ vị trí logistics nhà cung cấp tại đây, thụt lề 1.27 cm]


* **4.4. Kết quả kiểm thử tự động Jest** -> **[THÊM MỚI HOÀN TOÀN MỤC NÀY]**:


4.4. Kết quả kiểm thử tự động Jest

    Dự án tích hợp Jest kiểm thử tự động 7 test cases backend. 100% test cases đều vượt qua thành công, đảm bảo các hàm tính toán tồn kho, kiểm nhận số lượng và xác định cảnh báo hết hạn chạy hoàn toàn chính xác.


* **4.5. Đánh giá mức độ đạt mục tiêu** -> **[GIỮ NGUYÊN VĂN BẢN]**


---

## 8. CHƯƠNG 5. HẠN CHẾ VÀ HƯỚNG CẢI TIẾN

* **5.1. Hạn chế hiện tại** -> **[THAY THẾ VĂN BẢN]**
* **Bảng 5.1 - Hạn chế và hướng cải tiến** -> **[THAY THẾ BẢNG]** - Hãy điền dữ liệu sau vào các ô của Bảng 5.1:


5.1. Hạn chế hiện tại

    Hệ thống triển khai trên máy chủ Render.com miễn phí nên ứng dụng backend tự động tạm ngưng hoạt động sau 15 phút không có request, gây trễ khoảng 30 giây khi truy cập lần đầu.

    Hạn chế khác: Chưa có tính năng kiểm kê thực tế tại chỗ và điều chỉnh số lượng tồn lô trực tiếp.


Bảng 5.1 - Hạn chế và hướng cải tiến

Hàng Tiêu đề:
- Cột 1: Hạn chế
- Cột 2: Ảnh hưởng
- Cột 3: Hướng xử lý tiếp theo

Hàng 1:
- Cột 1: Triển khai cloud free
- Cột 2: Request đầu tiên trễ 30 giây
- Cột 3: Nâng cấp gói Render trả phí

Hàng 2:
- Cột 1: Chưa hỗ trợ real-time
- Cột 2: Tồn kho không đồng bộ ngay lập tức
- Cột 3: Tích hợp Socket.io để cập nhật

Hàng 3:
- Cột 1: Chưa có kiểm kê kho
- Cột 2: Chưa xử lý được chênh lệch thực tế
- Cột 3: Thiết kế thêm phiếu kiểm kê lô


* **5.2. Khả năng phát triển lâu dài** -> **[GIỮ NGUYÊN VĂN BẢN]**


---

## 9. CHƯƠNG 6. KẾT LUẬN & TÀI LIỆU THAM KHẢO

* **CHƯƠNG 6. KẾT LUẬN** -> **[THAY THẾ VĂN BẢN]**:


CHƯƠNG 6. KẾT LUẬN

    Nhóm đã hoàn thành xuất sắc đồ án môn Lập trình Web với đề tài Hệ thống Quản lý Kho thông minh WMS. Việc áp dụng các công nghệ Next.js 14 App Router, Express MVC và Prisma ORM giúp tạo ra một sản phẩm web hoàn chỉnh, an toàn và tối ưu hiệu năng.


* **TÀI LIỆU THAM KHẢO** -> **[GIỮ NGUYÊN VĂN BẢN]**


---

## 10. PHỤ LỤC (Cuối báo cáo)

* **PHỤ LỤC A. HƯỚNG DẪN CÀI ĐẶT LOCAL** -> **[THAY THẾ NỘI DUNG]**
* **PHỤ LỤC B. BẢNG PHÂN CÔNG CÔNG VIỆC NHÓM** (Bảng Phụ lục B.1) -> **[THAY THẾ BẢNG/NỘI DUNG]** - Hãy điền phân công công việc vào các ô tương ứng:


PHỤ LỤC A. HƯỚNG DẪN CÀI ĐẶT LOCAL

    Cách 1: Sử dụng Docker Compose: docker-compose up --build

    Cách 2: Chạy Node thông thường:

    Backend: cd backend; npm install; npx prisma db push; node prisma/seed.js; npm start

    Frontend: cd ../frontend; npm install; npm run dev


PHỤ LỤC B. BẢNG PHÂN CÔNG CÔNG VIỆC NHÓM

Hàng Tiêu đề:
- Cột 1: Thành viên thực hiện
- Cột 2: Nhiệm vụ phân công cụ thể
- Cột 3: Tỷ lệ đóng góp

Hàng 1:
- Cột 1: Đặng Văn Hiệp (N23DCCN155)
- Cột 2: Phát triển Frontend UI, tích hợp bản đồ Leaflet, Camera QR Scanner, xuất file Excel client
- Cột 3: 50%

Hàng 2:
- Cột 1: Võ Gia Huy (N23DCCN163)
- Cột 2: Thiết kế CSDL PostgreSQL, viết API Express MVC, Prisma ORM, Resend Email API, Gemini AI API, viết Jest test cases, Deploy
- Cột 3: 50%
