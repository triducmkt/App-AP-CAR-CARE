# 00E. SETTING ĐỂ ANTIGRAVITY IDE KHÔNG CODE QUÁ MỨC

1. Lớp kiểm soát toàn cục: Cấu hình System Prompt (Vòng kim cô)
Antigravity IDE (giống như các AI Code Editor khác) luôn có phần cài đặt Custom Instructions hoặc AI Rules (thường nằm trong Settings hoặc file cấu hình .antigravityrules ở thư mục gốc của dự án).
Anh hãy ném ngay đoạn Prompt Rule này vào đó để "khóa mõm" sự cồng kềnh của nó:
*"BẠN LÀ MỘT CODE ASSISTANT, KHÔNG PHẢI LÀ BẠN BÀN CHIẾN LƯỢC.
1. Khi tôi yêu cầu sửa code, CHỈ sửa chính xác dòng hoặc block code được chỉ định.
2. TUYỆT ĐỐI KHÔNG tự ý refactor (viết lại) toàn bộ file nếu tôi không yêu cầu.
3. TUYỆT ĐỐI KHÔNG tự động chạy các bài test hoặc kiểm tra toàn hệ thống.
4. Chỉ trả ra (output) đoạn code snippet bị thay đổi để tôi thay thế, không in lại cả file."*
2. Lớp kiểm soát cục bộ: Dùng tính năng "Inline Edit" thay vì "Global Chat"
Sai lầm của nhiều Dev khi dùng IDE tích hợp AI là lúc nào cũng mở khung Chat bên hông (Sidebar) để ra lệnh. Khung Chat đó là để "hỏi đáp kiến trúc". Khi anh làm "Thợ":
* Không: Mở chat và gõ "Sửa cho tôi hàm tính tổng trong file tính tiền". (Nó sẽ bới tung cả file lên).
* Nên: Bôi đen (Highlight) chính xác 3 dòng code bị sai -> Nhấn phím tắt Inline Edit (thường là Ctrl + I hoặc Ctrl + K tùy cấu hình) -> Gõ lệnh ngắn gọn: "Đổi biến X thành Y, giữ nguyên các dòng còn lại". Làm cách này, AI bị ép vào một phạm vi (context) cực nhỏ, nó sẽ sinh code chèn đúng vào chỗ anh bôi đen trong tích tắc.
3. Tắt chế độ "Auto-Execution" (Tự động thực thi)
Trong cài đặt của Antigravity IDE, anh hãy tìm và TẮT các tính năng có chữ như:
* Auto-run in terminal (Tự động chạy lệnh terminal).
* Agentic Loop / Multi-step reasoning (Vòng lặp suy luận nhiều bước).
* Auto-fix errors on save (Tự động sửa lỗi khi lưu).
Hãy chuyển nó về chế độ "Copilot Mode" (Chỉ đề xuất code khi anh gõ) hoặc "Manual Chat" (Chỉ làm đúng 1 lượt Request - Response). Anh phải là người nắm quyền quyết định cuối cùng (Nhấn nút Accept/Reject) cho từng dòng code nó sinh ra.
💡 Lời khuyên chốt lại cho anh: Vì anh muốn dùng chung 1 hệ sinh thái cho đỡ phân mảnh (đã dùng Antigravity CLI làm Sếp thì dùng luôn Antigravity IDE làm Thợ), anh hoàn toàn có thể làm được. Chỉ cần anh thiết lập file Rule nghiêm ngặt ở bước 1 và tập thói quen bôi đen sửa cục bộ ở bước 2.
Lúc này, Antigravity IDE sẽ trở thành một anh thợ phụ ngoan ngoãn, bảo đâu đ��nh đó, giúp anh hoàn thành 90% khối lượng code MVP Phase 1 một cách nhanh gọn nhất! Anh có muốn em viết sẵn cho anh nội dung file .antigravityrules chuẩn xác cho dự án SME OS này luôn không?