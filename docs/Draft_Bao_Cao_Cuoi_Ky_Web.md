TÀI LIỆU HỢP NHẤT: HƯỚNG DẪN TRÌNH BÀY & BẢN THẢO BÁO CÁO ĐỒ ÁN
MÔN HỌC: LẬP TRÌNH WEB (INT1334) — GIẢNG VIÊN: TS. LÊ NGỌC HIẾU
Đề tài số 6: Hệ thống Quản lý Kho thông minh WMS (Logistics & Chuỗi cung ứng)

---

PHẦN I: HƯỚNG DẪN QUY CHUẨN TRÌNH BÀY & CHỤP ẢNH MINH HỌA

1. Quy chuẩn định dạng văn bản (PTIT Standard)
Khổ giấy: A4.
Lề trang: Lề trên: 2.0 cm, Lề dưới: 2.0 cm, Lề trái: 3.0 cm (đóng gáy), Lề phải: 2.0 cm.
Font chữ & Giãn dòng: Font chữ Times New Roman, cỡ chữ nội dung 13 pt, màu đen hoàn toàn, giãn dòng 1.3 lines đến 1.5 lines, giãn đoạn After: 6 pt. Căn đều hai bên (Justify). Thụt lề đầu dòng (First Line Indent) của mỗi đoạn văn là 1.27 cm.
Tiêu đề:
    TIÊU ĐỀ CHƯƠNG (Heading 1): IN HOA, Cỡ chữ 15 pt hoặc 16 pt, ngắt trang mới.
    Tiêu đề mục lớn (Heading 2): Chữ thường, Cỡ chữ 14 pt.
    Tiêu đề mục nhỏ (Heading 3): Chữ thường, Cỡ chữ 13 pt.
Chú thích:
    Hình ảnh: Đặt phía dưới hình ảnh, căn giữa, cỡ chữ 12 pt. Định dạng: Hình [Chương].[Số thứ tự hình] - Tên hình.
    Bảng biểu: Đặt phía trên bảng, căn trái hoặc căn giữa, cỡ chữ 12 pt. Định dạng: Bảng [Chương].[Số thứ tự bảng] - Tên bảng.

2. Kỹ thuật chụp ảnh giao diện
Chụp ảnh màn hình ở độ phân giải tốt (khuyên dùng Full HD 1080p).
Ẩn thanh công cụ Taskbar, thanh dấu trang trình duyệt, sử dụng tab ẩn danh để giao diện sạch sẽ.
Trong Microsoft Word, đặt chế độ hiển thị ảnh là In Line with Text và thêm một đường viền xám nhạt (#D1D5DB) dày 0.5 pt bao quanh ảnh để phân định biên giới rõ ràng.

---

PHẦN II: BẢN THẢO CHI TIẾT BÁO CÁO ĐỒ ÁN CUỐI KỲ

(Sinh viên sao chép từ đây sang tệp Word)

---

[TRANG 1: TRANG BÌA CHUẨN]

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
                  (LOGISTICS & CHUỒI CUNG ỨNG)




             Giảng viên hướng dẫn: TS. LÊ NGỌC HIẾU
             Sinh viên thực hiện : 
               1. Đặng Văn Hiệp  - MSSV: N23DCCN155
               2. Võ Gia Huy     - MSSV: N23DCCN163
             Lớp                 : D23CQCN03-N
             Học kỳ              : II - Năm học 2025-2026
             Trọng số            : 50% điểm học phần





                    TP. HỒ CHÍ MINH, THÁNG 06 NĂM 2026

---

[TRANG 2: MỤC LỤC & DANH MỤC]

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

---

[TRANG 3: NỘI DUNG CHÍNH]

TÓM TẮT ĐỀ TÀI
    Đề tài xây dựng một ứng dụng web quản lý kho thông minh WMS hỗ trợ quản lý kho hàng cho mô hình đại lý nhỏ, tập trung vào các mặt hàng được nhập theo lô và có hạn sử dụng. Xuất phát từ các tình huống thường gặp như khó theo dõi lô cận hạn, nhầm lẫn khi nhập - xuất và thiếu căn cứ xử lý hàng cần trả nhà cung cấp, nhóm thiết kế hệ thống với hai vai trò sử dụng là quản trị viên và nhân viên kho.
    Ứng dụng được hiện thực theo cấu trúc tách bịêt frontend, backend và cơ sở dữ liệu. Frontend sử dụng Next.js 14 App Router và Tailwind CSS kết hợp thư viện shadcn/ui; backend sử dụng Express.js, Prisma ORM và JWT; dữ liệu được lưu trữ trên PostgreSQL triển khai qua Neon Cloud. Nghiệp vụ chính gồm quản lý sản phẩm, nhà cung cấp, vị trí kệ; nhập kho theo quy trình đặt hàng - vận chuyển - kiểm hàng - phê duyệt; quản lý tồn theo lô khả dụng; xuất bán theo nguyên tắc FEFO kết hợp điều kiện hạn dùng; trả hàng nhà cung cấp có phê duyệt; cảnh báo tồn thấp, cận hạn, hết hạn, tồn lâu; và đề xuất bổ sung hàng bằng trí tuệ nhân tạo Gemini AI kết hợp Resend API email alert tự động.
    Kết quả của đề tài là một phiên bản ứng dụng web có thể minh họa trọn vẹn dòng dữ liệu từ nhập liệu, xử lý nghiệp vụ đến kết quả tồn kho và cảnh báo. Báo cáo đồng thời trình bày lý do lựa chọn công nghệ, khả năng duy trì/mở rộng và các giới hạn cần cải tiến khi triển khai trong môi trường thực tế.

CHƯƠNG 1. GIỚI THIỆU ĐỀ TÀI

1.1. Bối cảnh hình thành đề tài
    Trong hoạt động của đại lý bán lẻ quy mô nhỏ, hàng hóa được nhập từ nhiều nhà cung cấp và thường được lưu giữ trong kho trước khi bán. Đối với các mặt hàng có hạn sử dụng như thực phẩm đóng gói, sữa, đồ uống hoặc hóa mỹ phẩm, việc chỉ biết tổng số lượng tồn là chưa đủ. Người quản lý cần biết sản phẩm thuộc lô nào, còn bao nhiêu, hết hạn khi nào, đang nằm ở vị trí nào và có đủ điều kiện để bán hay không.
    Khi việc quản lý dựa nhiều vào ghi chép thủ công hoặc bảng tính, người sử dụng có thể gặp khó khăn khi lượng sản phẩm và số giao dịch tăng lên: dữ liệu tồn kho phải tổng hợp lại bằng tay; hàng cận hạn không được phát hiện kịp thời; lô hàng mới dễ được lấy trước lô gần hết hạn; và việc trả lại nhà cung cấp không có luồng theo dõi rõ ràng. Đây là bối cảnh thực tế đặt ra nhu cầu xây dựng một công cụ hỗ trợ quản lý kho tập trung, có quy tắc và dễ sử dụng.

1.2. Bài toán đặt ra
    Bài toán của đề tài là xây dựng một ứng dụng web hỗ trợ đại lý quản lý hàng hóa theo sản phẩm và theo lô, bảo đảm các giao dịch nhập - xuất - trả hàng được ghi nhận nhất quán và hỗ trợ ra quyết định xử lý hàng hóa theo hạn sử dụng. Ứng dụng cần phản ánh được luồng công việc thực tế: hàng đặt nhập chưa làm tăng tồn kho; hàng chỉ được nhập tồn sau khi kiểm tra và phê duyệt; khi bán phải ưu tiên lô phù hợp theo FEFO; hàng không đủ điều kiện bán cần được đưa vào luồng trả nhà cung cấp.

1.3. Mục tiêu đề tài
    Mục tiêu tổng quát của đề tài là xây dựng một ứng dụng web quản lý kho hàng theo lô và hạn sử dụng cho đại lý nhỏ, từ đó hỗ trợ người dùng thực hiện nghiệp vụ kho có kiểm soát và giảm sai sót so với cách quản lý phân tán.
    Hệ thống hỗ trợ quản lý tài khoản và phân quyền cho quản trị viên, nhân viên kho thông qua cơ chế JWT Refresh Token lưu cơ sở dữ liệu.
    Hệ thống hỗ trợ quản lý danh mục sản phẩm, nhà cung cấp, giá nhập hợp đồng và vị trí lưu trữ kệ hàng.
    Hệ thống hỗ trợ quản lý phiếu nhập qua các giai đoạn đặt hàng, vận chuyển, kiểm hàng và phê duyệt từ admin.
    Hệ thống hỗ trợ theo dõi tồn kho theo sản phẩm và theo lô hàng thực tế bao gồm hạn sử dụng và vị trí kệ kho.
    Hệ thống hỗ trợ xuất bán theo nguyên tắc FEFO trên các lô còn đủ điều kiện hạn dùng tối thiểu được bán.
    Hệ thống hỗ trợ lập phiếu trả lại nhà cung cấp đối với các lô cần xử lý, có bước phê duyệt giữ chỗ của admin.
    Hệ thống hỗ trợ cảnh báo tự động gửi email và đề xuất đặt hàng thông minh bằng AI Gemini.

1.4. Phạm vi thực hiện và giả định nghiệp vụ
    Bảng 1.2 - Phạm vi thực hiện của đề tài
    Nội dung                    Phạm vi/giả định của đề tài
    Mô hình kho                 Quản lý một kho của đại lý; chưa mở rộng sang nhiều kho/chi nhánh.
    Người sử dụng               Admin và nhân viên kho; NCC/khách hàng chỉ xuất hiện trong dữ liệu nghiệp vụ.
    Nhập kho                    Quản lý đặt hàng, vận chuyển dự kiến, kiểm hàng và duyệt trước khi tăng tồn.
    Xuất kho                    Gồm xuất bán (SELL) và trả nhà cung cấp (RETURN).
    Hàng cần xử lý              Trong phạm vi đề tài, giả định nhà cung cấp chấp nhận nhận lại hàng cận hạn hoặc hết hạn cần xử lý.
    Giao hàng khách hàng        Không quản lý giao nhận đến địa chỉ khách; thông tin người nhận chỉ là dữ liệu phiếu bán nếu cần.
    Công nghệ bản đồ/Môi trường Bản đồ logistics Leaflet.js để định vị nhà cung cấp. Đóng gói qua Docker Compose và deploy trực tuyến trên Vercel và Render.

1.5. Đối tượng sử dụng và giá trị thực tiễn
    Hệ thống phục vụ hai vai trò nội bộ. Nhân viên kho thực hiện các thao tác vận hành như lập phiếu nhập, xác nhận hàng đến, kiểm hàng, lập phiếu bán hoặc lập phiếu trả. Admin quản lý dữ liệu nền, theo dõi cảnh báo, duyệt kết quả kiểm hàng, duyệt phiếu trả nhà cung cấp và theo dõi dashboard tổng hợp.
    Giá trị thực tiễn của sản phẩm nằm ở việc chuyển các công việc rời rạc thành một luồng dữ liệu tập trung: thông tin lô nhập được sử dụng lại khi tính tồn, chọn lô bán, cảnh báo hạn dùng và trả hàng; các quyết định làm thay đổi tồn kho được ghi nhận bằng phiếu và trạng thái; người quản lý có cơ sở kiểm tra trước khi phê duyệt.

CHƯƠNG 2. NỀN TẢNG LÝ THUYẾT VÀ LỰA CHỌN CÔNG NGHỆ

2.1. Quản lý kho theo lô và hạn sử dụng
    Trong hệ thống kho có hàng hóa theo hạn sử dụng, một sản phẩm có thể xuất hiện trong nhiều lần nhập khác nhau. Mỗi lần nhập có thể có giá mua, mã lô, ngày sản xuất, hạn sử dụng và vị trí lưu trữ riêng. Vì vậy, mô hình dữ liệu của đề tài sử dụng chi tiết phiếu nhập như bản ghi đại diện cho lô hàng. Tồn kho không chỉ được xem theo sản phẩm mà còn được phân tích theo từng lô.
    Cách tổ chức theo lô giúp hệ thống trả lời các câu hỏi quan trọng: lô nào sắp hết hạn, lô nào còn đủ điều kiện bán, số lượng nào đang chờ trả nhà cung cấp và số lượng nào còn khả dụng để bán. Đây là nền tảng để xây dựng cảnh báo và thuật toán xuất kho.

2.2. Nguyên tắc FEFO và kiểm soát thời hạn được bán
    FEFO (First Expired, First Out) là nguyên tắc ưu tiên các lô có thời điểm hết hạn sớm hơn khi phân bổ hàng xuất. Tài liệu của Oracle NetSuite mô tả việc phân bổ lô theo FEFO đối với hàng được kiểm soát hạn sử dụng, đồng thời có thể xét yêu cầu về số ngày hạn sử dụng tối thiểu khi hàng đến tay khách hàng [1]. Đề tài vận dụng nguyên tắc này cho nghiệp vụ xuất bán với phạm vi gọn hơn, phù hợp mô hình đại lý nhỏ.
    Hệ thống không hiểu FEFO theo nghĩa cứ lô sắp hết hạn là được bán. Trước khi phân bổ, backend lọc các lô còn đủ số ngày sử dụng tối thiểu theo thuộc tính min_days_to_sell của sản phẩm. Các lô còn ít hạn hơn ngưỡng hoặc đã hết hạn không được dùng cho phiếu bán; chúng được đưa vào luồng cảnh báo và trả nhà cung cấp.
    Lô được phép bán nếu expiry_date không có giá trị hoặc (expiry_date - ngày hiện tại) >= min_days_to_sell. Trong các lô được phép bán: Sắp xếp expiry_date tăng dần, phân bổ số lượng theo FEFO.

2.3. Mô hình trạng thái của phiếu nhập kho
    Phiếu nhập trong thực tế không làm tăng tồn kho ngay tại thời điểm lập đơn. Hàng có thể đang đặt, đang vận chuyển, giao trễ, được kiểm nhận với số lượng thực tế khác số lượng đặt, hoặc chưa được người quản lý phê duyệt. Vì vậy, đề tài sử dụng chuỗi trạng thái để mô tả vòng đời phiếu nhập và chỉ tính tồn khi phiếu hoàn tất.
    Trạng thái ORDERED: Phiếu đã được lập để đặt hàng từ nhà cung cấp; chưa tính vào tồn.
    Trạng thái IN_TRANSIT: Hàng bắt đầu vận chuyển; hệ thống tính ngày nhận dự kiến dựa trên khoảng cách địa lý của NCC.
    Trạng thái WAITING_ARRIVAL_CONFIRMATION: Đã đến ngày dự kiến nhận; chờ nhân viên xác nhận thực tế.
    Trạng thái DELAYED: Đến hạn nhưng hàng chưa tới kho.
    Trạng thái INSPECTING: Nhân viên kiểm đếm, nhập lô, hạn sử dụng và kệ lưu trữ.
    Trạng thái PENDING_APPROVAL: Kết quả kiểm hàng đã gửi chờ admin phê duyệt.
    Trạng thái COMPLETED: Phiếu được duyệt; số lượng đạt yêu cầu được tính vào tồn.
    Trạng thái CANCELLED: Phiếu bị hủy và không làm thay đổi tồn kho.

2.4. Tiêu chí lựa chọn công nghệ
    Theo yêu cầu của đề tài, công nghệ không chỉ cần giúp xây dựng được sản phẩm demo mà còn phải phù hợp với bản chất dữ liệu, có tài liệu tham khảo chính thống, có khả năng sửa chữa và mở rộng về sau. Nhóm sử dụng các tiêu chí sau để lựa chọn công nghệ.
    Tính phù hợp nghiệp vụ: Hỗ trợ dữ liệu quan hệ, phiếu nghiệp vụ, lô hàng, hạn sử dụng và truy vấn tổng hợp.
    Tính toàn vẹn dữ liệu: Hỗ trợ khóa, ràng buộc, transaction và kiểm soát trạng thái giao dịch.
    Khả năng bảo trì/mở rộng: Có thể tổ chức theo module, bổ sung nghiệp vụ mà không viết lại toàn bộ hệ thống.

2.5. Lựa chọn PostgreSQL trên Neon
    PostgreSQL là nền tảng dữ liệu cốt lõi của đề tài vì bài toán kho có quan hệ chặt giữa sản phẩm, nhà cung cấp, phiếu nhập, chi tiết lô, phiếu xuất và người dùng. Tài liệu chính thức PostgreSQL mô tả khóa ngoại dùng để duy trì quan hệ hợp lệ giữa các bảng và hỗ trợ mô hình quan hệ nhiều-nhiều; đây là nhu cầu trực tiếp của dữ liệu sản phẩm - nhà cung cấp và chứng từ - chi tiết chứng từ.
    Nhóm triển khai PostgreSQL trên Neon. Theo tài liệu Neon, ứng dụng kết nối tới Neon thông qua chuỗi kết nối PostgreSQL tiêu chuẩn thông qua Prisma ORM, giúp backend Express tương tác với database cloud ổn định. Việc sử dụng database cloud cũng giúp các thành viên trong nhóm làm việc chung dữ liệu trong quá trình kiểm thử và demo thực tế.

2.6. Lựa chọn Express.js, Prisma ORM và JWT cho backend
    Express.js (Node.js) được lựa chọn làm framework backend nhờ cơ chế phi đồng bộ (Non-blocking I/O) giúp xử lý các truy vấn và request API với độ trễ thấp nhất. Hệ thống tổ chức theo mô hình MVC tách biệt phân hệ routes và controllers.
    Prisma ORM được sử dụng thay thế SQLAlchemy của Python. Prisma giúp ánh xạ các bảng PostgreSQL thành các kiểu dữ liệu an toàn trong TypeScript (Type-safety), hỗ trợ tạo migration dễ dàng và tự động đồng bộ hóa cấu trúc cơ sở dữ liệu qua lệnh prisma db push.
    Xác thực hệ thống sử dụng JWT kép bao gồm Access Token và Refresh Token lưu trữ trực tiếp trong cơ sở dữ liệu bảng RefreshToken giúp tối ưu độ bảo mật phiên làm việc và kiểm soát quyền admin/staff ở backend.

2.6.1. So sánh Express với các lựa chọn backend khác
    Express.js, Django và Spring Boot đều có thể xây dựng API cho một hệ thống quản lý kho. Nhóm so sánh theo các tiêu chí gắn với phạm vi đề tài: khả năng tổ chức module nghiệp vụ, mức độ cấu hình ban đầu, khả năng bảo trì và sự phù hợp với thời gian thực hiện.
    Về mức độ khởi tạo ban đầu, Express gọn nhẹ và chủ động chọn thư viện, phù hợp tiến độ và quy mô hiện tại. Django tích hợp quá nhiều cấu hình mặc định dư thừa. Spring Boot có hệ sinh thái Java đồ sộ đòi hỏi thời gian cấu hình lâu hơn.
    Về tổ chức phân hệ API, Express hỗ trợ chia router cực kỳ tường minh theo từng module nhập, xuất, tồn, cảnh báo. Django quản lý theo kiến trúc app khép kín. Spring Boot chia theo mô hình Controller-Service-Repository nghiêm ngặt.
    Về tương tác CSDL, Express sử dụng Prisma ORM giúp đảm bảo an toàn kiểu dữ liệu cao và đồng bộ nhanh. Django dùng ORM tích hợp sẵn. Spring Boot dựa vào Spring Data JPA.
    Kết luận lựa chọn: Nhóm quyết định sử dụng Express.js và Prisma ORM vì tính linh hoạt, gọn nhẹ, tối ưu hóa hiệu năng phi đồng bộ và đáp ứng hoàn hảo quy mô quản lý một kho của đồ án.

2.6.2. Lựa chọn JWT Refresh Token lưu DB cho xác thực và phân quyền API
    Frontend Next.js của hệ thống gọi các REST API ở backend. Nhóm sử dụng JWT để mang thông tin xác thực trong các request API và kiểm tra vai trò admin/staff tại backend.
    Về cơ chế xác thực, client gửi Access Token trong header mỗi request, backend tiến hành xác minh chữ ký số. Đối với Refresh Token, hệ thống lưu trực tiếp trong DB bảng RefreshToken và truyền dưới dạng HttpOnly Cookie để tránh rò rỉ token qua các lỗ hổng XSS phía client.
    Về tính phù hợp kiến trúc, JWT hoàn toàn tương thích với mô hình REST API tách biệt giữa Next.js và Express, giúp loại bỏ việc lưu trữ session cồng kềnh phía máy chủ.
    Về khả năng thu hồi phiên, việc lưu trữ Refresh Token trong cơ sở dữ liệu cho phép quản trị viên chủ động xóa bản ghi token phía server để bắt buộc tài khoản nhân viên đăng xuất ngay lập tức khi phát hiện nghi vấn bảo mật.

2.7. Lựa chọn Next.js 14 App Router cho frontend
    Next.js 14 App Router cung cấp một giải pháp toàn diện để xây dựng giao diện người dùng. Đặc điểm này phù hợp với hệ thống có nhiều trang dữ liệu và thao tác lặp lại như bảng sản phẩm, phiếu nhập, phiếu xuất, cảnh báo và dashboard.
    Nhóm không khẳng định Next.js tốt hơn tuyệt đối các lựa chọn khác. Next.js được chọn vì phù hợp kỹ năng triển khai của nhóm, hỗ trợ chia giao diện theo component và đáp ứng nhu cầu tương tác nhiều trạng thái trong phạm vi đề tài.

2.7.1. So sánh Next.js App Router với React Vite SPA
    Next.js 14 App Router nâng cấp so với React Vite nhờ tích hợp các Rendering Strategies:
    Về cách kết xuất giao diện UI, Next.js hỗ trợ React Server Components (RSC) kết xuất dữ liệu trên server giúp tối ưu hóa SEO và bảo mật thông tin. React Vite là SPA kết xuất hoàn toàn ở client.
    Về mức độ tích hợp tính năng, Next.js có sẵn File-based Routing, API Routes, Image Optimization và Server Actions. React Vite cần cấu hình thủ công react-router-dom và các thư viện bên ngoài.
    Về làm việc với State, Next.js kết hợp Zustand quản lý token toàn cục và React Hook Form + Zod để kiểm tra lỗi nhập liệu tại form.
    Kết luận lựa chọn: Next.js được chọn vì hỗ trợ các phương pháp render SSR, SSG, ISR và tính năng Server Actions giúp gọi dữ liệu trực tiếp tại máy chủ, giảm dung lượng JavaScript tải về client.

2.8. Khả năng duy trì và mở rộng lâu dài
    Việc lựa chọn công nghệ không chỉ nhằm hoàn thành bản demo mà còn phải hỗ trợ sửa chữa và phát triển tiếp theo. Các công nghệ được dùng trong đề tài đều có tài liệu chính thức và được tổ chức theo các tầng độc lập: giao diện Next.js, API Express, Prisma ORM và Neon PostgreSQL. Nhờ đó, nhóm có thể cải tiến từng phần như thêm báo cáo, kiểm kê hoặc cơ chế đồng thời nâng cao mà không phải viết lại toàn bộ hệ thống.

CHƯƠNG 3. PHƯƠNG PHÁP THỰC HIỆN VÀ GIẢI PHÁP

3.1. Phương pháp thực hiện
    Nhóm thực hiện đề tài theo hướng phát triển tăng dần: xác định bối cảnh và nhu cầu; phân tích tác nhân và nghiệp vụ; thiết kế dữ liệu quan hệ; xây dựng API và giao diện; chạy thử theo kịch bản nghiệp vụ; sau đó điều chỉnh thiết kế theo các tình huống phát hiện trong quá trình kiểm thử.
    Khảo sát bài toán: xác định các tình huống nhập, xuất, cảnh báo và trả nhà cung cấp cần hỗ trợ.
    Thiết kế dữ liệu: xác định các thực thể, thuộc tính, khóa và mối quan hệ; dùng view để tính tồn.
    Thiết kế xử lý: mô tả luồng trạng thái phiếu nhập, FEFO và phê duyệt phiếu trả.
    Cài đặt theo module: backend chia Router-Controller-Service; frontend chia trang, component và zustand store gọi API.
    Kiểm thử tự động: Sử dụng Jest viết các test cases kiểm tra nghiệp vụ kho.

3.2. Kiến trúc tổng thể
    Ứng dụng sử dụng mô hình web gồm ba tầng logic: giao diện người dùng trên trình duyệt (Next.js 14 App Router), dịch vụ xử lý nghiệp vụ REST API (Express) và cơ sở dữ liệu PostgreSQL. Người dùng thao tác trên frontend; frontend gửi yêu cầu JSON kèm token xác thực tới backend; backend kiểm tra quyền, xử lý quy tắc nghiệp vụ, truy vấn hoặc cập nhật PostgreSQL và trả kết quả về giao diện.
    (Hình 3.1. Sơ đồ kiến trúc 3 tầng của hệ thống WMS)
    [Chèn ảnh sơ đồ kiến trúc 3 tầng Next.js - Express - Neon DB tại đây, thụt lề 1.27 cm]

3.3. Tác nhân và yêu cầu chức năng
    Tác nhân Admin: Quản lý người dùng; quản lý sản phẩm/NCC; xem cảnh báo và dashboard; duyệt kiểm hàng nhập; duyệt hoặc từ chối phiếu trả NCC; sử dụng đề xuất bổ sung hàng bằng AI.
    Tác nhân Nhân viên kho: Lập phiếu nhập; cập nhật quá trình vận chuyển và kiểm hàng; xem tồn; lập phiếu bán; lập phiếu trả NCC.
    Nhà cung cấp: Đối tượng dữ liệu của phiếu nhập, bảng giá và phiếu trả.
    Các yêu cầu chức năng gồm: F01 Xác thực, F02 Sản phẩm, F03 Nhà cung cấp, F04 Người dùng, F05 Vị trí kệ, F06 Nhập kho đa trạng thái, F07 Tồn kho theo lô, F08 Xuất bán FEFO, F09 Trả NCC, F10 Cảnh báo tồn, F11 Đề xuất nhập AI, F12 Dashboard.

3.4. Giải pháp nghiệp vụ nhập kho đa trạng thái
    Khi lập phiếu nhập, người dùng chọn một nhà cung cấp và chỉ chọn các sản phẩm do nhà cung cấp đó cung ứng. Phiếu được tạo ở trạng thái ORDERED. Khi người dùng xác nhận bắt đầu vận chuyển (IN_TRANSIT), hệ thống sử dụng khoảng cách để tính số ngày giao dự kiến. Khi đến kho, phiếu chuyển sang INSPECTING, nhân viên kho kiểm đếm thực tế nhập số lượng đạt, lỗi, mã lô, hạn dùng và vị trí kệ. Chỉ sau khi admin duyệt (COMPLETED), số lượng đạt yêu cầu mới được cộng vào tồn kho chính thức.
    (Hình 3.2. Luồng trạng thái nghiệp vụ nhập kho)
    [Chèn ảnh sơ đồ luồng trạng thái nhập kho từ Ordered đến Completed tại đây, thụt lề 1.27 cm]

3.5. Giải pháp xuất bán FEFO và trả nhà cung cấp
    Với phiếu SELL (Xuất bán): Nhân viên chọn sản phẩm và số lượng cần bán; backend kiểm tra lượng tồn khả dụng trên view v_lot_stock, tự động lọc bỏ các lô cận hạn hoặc hết hạn, sắp xếp lô theo hạn sử dụng tăng dần (expiry_date asc) và tự động trừ tồn theo lô theo nguyên tắc FEFO.
    Với phiếu RETURN (Trả nhà cung cấp): Nhân viên chọn nhà cung cấp và chọn trực tiếp lô hàng thuộc nhà cung cấp đó cần trả lại. Phiếu ở trạng thái chờ duyệt; số lượng trả được giữ chỗ thông qua view v_lot_stock để không bị bán nhầm. Khi admin duyệt, số lượng được trừ khỏi tồn và kệ kho được giải phóng.
    (Hình 3.3. Luồng xử lý xuất bán và trả nhà cung cấp)
    [Chèn ảnh sơ đồ luồng FEFO và duyệt trả NCC tại đây, thụt lề 1.27 cm]

3.6. Giải pháp AI đề xuất đặt hàng và email cảnh báo tự động
    Hệ thống gọi API Gemini Pro bằng cách truyền danh sách sản phẩm tồn thấp (dưới min_stock) và lịch sử giao dịch nhập kho 3 tháng gần nhất có trạng thái COMPLETED. Mô hình AI phân tích và đưa ra phản hồi dưới dạng JSON chứa số lượng đề xuất đặt thêm và nhà cung cấp ưu tiên kèm giá tốt nhất từ bảng giá hợp đồng.
    Đồng thời, hệ thống tích hợp Resend API. Khi phát hiện sản phẩm thiếu hụt dưới ngưỡng an toàn, Admin chỉ cần bấm nút để gửi email HTML chứa danh sách sản phẩm tồn thấp về email quản trị viên.

3.8. Thiết kế cơ sở dữ liệu và Schema Prisma
    Cơ sở dữ liệu được thiết kế theo mô hình quan hệ, gồm 10 bảng vật lý chính được khai báo trong schema.prisma (User, RefreshToken, Product, Supplier, SupplierProductPrice, Location, ImportReceipt, ImportDetail, ExportReceipt, ExportDetail) và 2 SQL Views (v_stock_balance, v_lot_stock). Các bảng được liên kết chặt chẽ qua khóa ngoại nhằm đảm bảo tính toàn vẹn dữ liệu.

3.9. Cách tính tồn kho bằng PostgreSQL View
    View v_stock_balance tổng hợp tồn kho theo sản phẩm từ các phiếu nhập đã hoàn tất và các phiếu xuất đã hoàn tất. View v_lot_stock tính tồn chi tiết cho từng lô hàng:
    current_lot_stock = import_quantity - exported_completed_quantity
    available_lot_stock = current_lot_stock - pending_return_qty (số lượng đang chờ duyệt trả nhà cung cấp).
    Việc sử dụng view giúp tập trung công thức tính tồn kho, tránh việc phải duy trì cột tồn kho cập nhật thủ công ở nhiều bảng.

3.10. Tổ chức mã nguồn và bảo mật
    Backend tổ chức theo các thư mục Router, Controller, Service. Frontend tổ chức theo Next.js App Router (app/), components/, store/. Mật khẩu người dùng được băm bằng bcryptjs. Khóa bí mật JWT và API Key được bảo mật trong tệp .env. Route bảo vệ được thiết lập ở cả backend API middleware và frontend Next.js middleware.

CHƯƠNG 4. KẾT QUẢ THỰC HIỆN

4.1. Các phân hệ đã hiện thực và Chiến lược Rendering
    Nhóm đã xây dựng hoàn tất 10 phân hệ chức năng: Xác thực (Zustand + JWT), Sản phẩm, Nhà cung cấp (Bản đồ Leaflet), Nhập kho (QR scanner), Xuất bán (FEFO), Trả NCC, Cảnh báo (Resend API email), Đề xuất bổ sung (AI Gemini), Dashboard (biểu đồ Recharts), Người dùng.
    Next.js áp dụng các chiến lược kết xuất: SSG cho trang giới thiệu /about; ISR cho trang /dashboard; SSR cho danh sách phiếu nhập /dashboard/imports; CSR cho các form nhập liệu tương tác.

4.2. Kịch bản minh họa kết quả
    1. Admin đăng nhập, cấu hình sản phẩm và giá hợp đồng nhà cung cấp.
    2. Nhân viên tạo phiếu nhập, xác nhận vận chuyển, kiểm hàng bằng QR code.
    3. Admin duyệt phiếu nhập, tồn kho tự động tăng trên hệ thống.
    4. Nhân viên tạo phiếu xuất bán, hệ thống tự chọn lô xuất theo FEFO.
    5. Admin theo dõi cảnh báo tồn kho và bấm gửi email thông báo tự động.
    6. Admin gọi AI Gemini để lấy đề xuất nhập hàng và duyệt tạo phiếu nháp.

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

4.4. Kết quả kiểm thử tự động Jest
    Dự án tích hợp Jest kiểm thử tự động 7 test cases backend. 100% test cases đều vượt qua thành công, đảm bảo các hàm tính toán tồn kho, kiểm nhận số lượng và xác định cảnh báo hết hạn chạy hoàn toàn chính xác.

4.5. Đánh giá mức độ đạt mục tiêu
    Hệ thống đáp ứng xuất sắc các mục tiêu đề ra: quản lý kho chi tiết theo lô, tự động phân bổ FEFO, quét mã QR kiểm hàng, bản đồ logistics, tự động hóa cảnh báo qua Email và gợi ý đặt hàng thông minh bằng AI.

CHƯƠNG 5. HẠN CHẾ VÀ HƯỚNG CẢI TIẾN

5.1. Hạn chế hiện tại
    Hệ thống triển khai trên máy chủ Render.com miễn phí nên ứng dụng backend tự động tạm ngưng hoạt động sau 15 phút không có request, gây trễ khoảng 30 giây khi truy cập lần đầu.
    Hạn chế khác: Chưa có tính năng kiểm kê thực tế tại chỗ và điều chỉnh số lượng tồn lô trực tiếp.

5.2. Khả năng phát triển lâu dài
    Hệ thống Next.js - Express - Prisma - PostgreSQL có độ mở rộng tốt, sẵn sàng cho việc nâng cấp gói cloud trả phí, tích hợp WebSockets để cập nhật tồn kho real-time và xây dựng mobile app quét barcode chuyên nghiệp.

CHƯƠNG 6. KẾT LUẬN
    Nhóm đã hoàn thành xuất sắc đồ án môn Lập trình Web với đề tài Hệ thống Quản lý Kho thông minh WMS. Việc áp dụng các công nghệ Next.js 14 App Router, Express MVC và Prisma ORM giúp tạo ra một sản phẩm web hoàn chỉnh, an toàn và tối ưu hiệu năng.

PHỤ LỤC A. HƯỚNG DẪN CÀI ĐẶT LOCAL
    Cách 1: Sử dụng Docker Compose:
    Gõ lệnh: docker-compose up --build

    Cách 2: Chạy thủ công (Chế độ Rút gọn - Tối ưu và tiết kiệm RAM):
    Cấu hình tệp .env: Tạo tệp backend/.env và điền đầy đủ các biến liên kết cơ sở dữ liệu (DATABASE_URL), API khóa AI (GEMINI_API_KEY) và API gửi thư (RESEND_API_KEY).
    Khởi chạy Backend: cd backend; npm install; npx prisma db push; node prisma/seed.js; node server.js
    Khởi chạy Frontend: cd ../frontend; npm install; npm run build; npm start

PHỤ LỤC B. BẢNG PHÂN CÔNG CÔNG VIỆC NHÓM
    Đặng Văn Hiệp (N23DCCN155): Phát triển Frontend UI, tích hợp bản đồ Leaflet, Camera QR Scanner, xuất file Excel client. Đóng góp 50%.
    Võ Gia Huy (N23DCCN163): Thiết kế CSDL PostgreSQL, viết API Express MVC, Prisma ORM, Resend Email API, Gemini AI API, viết Jest test cases, Deploy. Đóng góp 50%.

---

PHẦN III: BẢN ĐỒ ÁNH XẠ MÃ NGUỒN CỤ THỂ CHO BÁO CÁO

Để dễ viết và kiểm chứng, đây là danh sách chỉ định các file mã nguồn tương ứng với từng phần mô tả kỹ thuật:

1. Kiến trúc JWT và Refresh Token lưu DB (Mục 3.3)
Backend:
    schema: backend/prisma/schema.prisma (model RefreshToken)
    controller: backend/controllers/authController.js (hàm login, refresh, logout)
Frontend:
    store: frontend/src/store/useAuthStore.js
    interceptor: frontend/src/lib/api.js
    middleware: frontend/src/middleware.js

2. Thuật toán FEFO (Mục 3.4)
Backend:
    logic phân bổ: backend/controllers/exportController.js (hàm createExport và sắp xếp ngày hết hạn expiry_date asc)

3. Tích hợp AI Gemini và Email Cảnh báo (Mục 3.5)
AI Backend:
    backend/controllers/inventoryController.js (hàm getAiReplenishmentSuggestions)
Email Backend:
    backend/services/email.service.js
    backend/controllers/inventoryController.js (hàm sendEmailAlert)

---

PHẦN IV: CHECKLIST TRƯỚC KHI NỘP BÀI (PDF)

[ ] Trang Bìa: Đã điền đầy đủ thông tin giảng viên TS. Lê Ngọc Hiếu, thông tin sinh viên Hiệp và Huy.
[ ] Mục lục: Đã cập nhật mục lục và danh mục hình tự động trong Word để trùng khớp số trang.
[ ] Hình ảnh giao diện: Đã chèn đầy đủ ảnh chụp thực tế vào các placeholder từ Hình 4.1 đến Hình 4.6.
[ ] Báo cáo phân công: Đảm bảo số lượng commit hiển thị giống với biểu đồ thực tế trên trang GitHub của repository.
[ ] Xuất file PDF: Đảm bảo không có lỗi nhảy dòng, lệch lề trước khi nộp lên hệ thống LMS.
