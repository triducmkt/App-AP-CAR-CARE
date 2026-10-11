# 00D. HƯỚNG DẪN TẠO KHUNG & CODE CƠ BẢN APP SME OS VỚI ANTIGRAVITY CLI & IDE

Chào anh, anh hiểu luồng tư duy như vậy là chính xác 100%. Anh dùng CLI để làm "Não bộ định hình kiến trúc", sau đó dùng IDE để "chạm khắc chi tiết".
Trước khi đi vào từng bước, em xin trả lời ngay câu hỏi quan trọng nhất của anh để anh yên tâm:
👉 Anh KHÔNG CẦN phải copy/paste thủ công từng file lên Google Apps Script!
Làm như vậy là "nông dân" và đi ngược lại triết lý tối ưu tự động hóa. Trong giới lập trình Google Apps Script, Google có cung cấp một công cụ tên là clasp (Command Line Apps Script Projects).
Antigravity CLI (và IDE) sẽ gõ code tạo thành các file trên máy tính của anh. Khi muốn đưa code lên Google, anh chỉ cần gõ đúng 1 lệnh clasp push, lập tức toàn bộ mã nguồn trên máy anh sẽ "bay" thẳng lên dự án Google Apps Script trên trình duyệt.
Dưới đây là Quy trình thực chiến từng bước cho anh (Solo Founder) từ lúc cầm 5 file Word cho đến khi code chạy trên Google:
GIAI ĐOẠN 1: DÙNG ANTIGRAVITY CLI ĐỂ DỰNG KHUNG (LÀM SẾP)
Bước 1: Chuẩn bị Workspace & Tài liệu
1. Trên máy tính, anh tạo một thư mục trống tên là SME_OS_Phase1.
2. Bên trong thư mục này, tạo một thư mục con tên là Docs.
3. Bỏ 5 file tài liệu kiến trúc của anh vào thư mục Docs. (Mẹo nhỏ: AI đọc file Word .docx được, nhưng để nó đọc nhanh và chính xác nhất, anh nên Save As 5 file Word đó ra định dạng PDF hoặc Markdown).
Bước 2: Đánh thức CLI và "Nhồi" Context
1. Mở Terminal (PowerShell) tại thư mục SME_OS_Phase1 và gọi Antigravity CLI lên.
2. Gõ câu lệnh (Prompt) đầu tiên để nạp Hiến pháp (File 5 - Technology Architecture):"Tôi có 5 file tài liệu trong thư mục Docs. Hãy đọc toàn bộ 5 file này: (1) Product Philosophy, (2) Business Architecture, (3) System Architecture, (4) Application Architecture, (5) Technology Architecture. Sau khi đọc xong, hãy xác nhận bạn đã hiểu nguyên tắc 'Business First, AI Second' và 'Không over-engineering' bằng một câu tóm tắt ngắn."
Bước 3: Khởi tạo Cầu nối Google Apps Script (Clasp)
Thay vì tự làm, anh ra lệnh cho CLI cài đặt hệ thống để đồng bộ lên Google:
"Hãy chạy lệnh để cài đặt công cụ @google/clasp trên máy tôi. Sau đó, hướng dẫn tôi đăng nhập tài khoản Google (clasp login) và tạo một dự án Google Apps Script mới (clasp create) ngay tại thư mục này."
(CLI sẽ tự động gõ lệnh cài đặt. Nó sẽ mở trình duyệt để anh đăng nhập tài khoản Google. Từ lúc này, thư mục dưới máy anh đã được kết nối với dự án trên mây của Google).
Bước 4: Ra lệnh tạo cấu trúc thư mục và Base Code (Scaffolding)
Bây giờ, anh bắt đầu tạo bộ khung dựa trên File 3 (System Architecture - Naming Convention):
"Dựa vào tài liệu System Architecture (chuẩn Naming Convention) và Business Architecture, hãy tạo cho tôi các thư mục và các file .js trống cho toàn bộ các module: CRM, WEB, ERP, EVENT. Nhớ tuân thủ quy tắc tiền tố (ví dụ: CRM_Customer.js, WEB_Event.js). Tuyệt đối chưa viết logic nghiệp vụ, chỉ tạo khung file và comment giải thích chức năng ở đầu mỗi file."
(CLI sẽ tự động chạy rẹt rẹt, tạo ra hàng loạt file và thư mục chuẩn chỉnh theo đúng ý đồ của anh).
GIAI ĐOẠN 2: CHUYỂN SANG ANTIGRAVITY IDE ĐỂ CODE CHI TIẾT (LÀM THỢ)
Sau khi CLI đã tạo xong hàng chục file trống (bộ khung xương), vai trò của CLI tạm dừng. Anh bắt đầu chuyển sang Antigravity IDE (giao diện giống VS Code).
Bước 5: Viết Logic Nghiệp Vụ bằng IDE
1. Mở Antigravity IDE, trỏ vào thư mục SME_OS_Phase1. Ở cột bên trái, anh sẽ thấy toàn bộ cây thư mục và các file code mà CLI vừa tạo ban nãy.
2. Anh mở file CRM_Customer.js lên.
3. Dùng tính năng Chat hoặc Code Inline (bôi đen) của IDE và ra lệnh:"Dựa vào Chương 11 (Business Rules) trong file Business Architecture, hãy viết hàm tạo mới khách hàng (Create Customer) cho file này. Lưu ý dữ liệu lưu vào Master Database."
4. AI của IDE sẽ tự động gõ mã code vào file cho anh. Anh ngồi review (kiểm tra duyệt code).
Bước 6: Bắn code lên Google và Chạy thử (Push & Test)
1. Khi anh đã ưng ý với đoạn code vừa viết, anh mở Terminal ngay bên trong màn hình IDE (dưới đáy màn hình).
2. Anh gõ lệnh: clasp push
3. Vài giây sau, toàn bộ code dưới máy tính của anh đã được đồng bộ lên trình duyệt Google Apps Script.
4. Anh mở trình duyệt (Google Sheets/Apps Script) lên để chạy thử hàm (Run/Debug).
Bước 7: Vòng lặp Sửa lỗi (Debug Loop)
* Chạy thử trên Google báo lỗi? Anh copy dòng lỗi báo đỏ đó.
* Quay lại IDE, ném lỗi đó vào khung Chat: "Nó báo lỗi này khi chạy, hãy sửa lại code ở file CRM_Customer.js".
* IDE sửa xong -> Anh lại gõ clasp push -> Lên Google chạy lại.
* Lặp lại cho đến khi tính năng hoàn thiện.
Tóm lại luồng làm việc của anh:
1. Sếp (CLI): Setup môi trường, đọc 5 file kiến trúc, tự động cài clasp, tạo hàng loạt file .js trống theo quy chuẩn.
2. Thợ (IDE): Vào từng file .js trống, bảo AI viết chi tiết logic nghiệp vụ, sửa lỗi.
3. Đồng bộ: Gõ clasp push để đẩy code lên Google -> Chạy thử.
Phương án này đảm bảo anh code Google Apps Script (Cloud) nhưng trải nghiệm viết code lại sướng và nhanh như đang làm việc dưới máy tính cá nhân (Local) có AI hỗ trợ tận răng! Anh thấy luồng này đã đủ "thông" để anh bắt đầu chưa?