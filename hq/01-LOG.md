# 01-LOG.md — Nhật ký (append-only, không sửa/xoá mục cũ)

## 2026-10-04 19:50 — Lucy/Antigravity
- Yêu cầu của anh Đức (/global): dùng `D:\My Agents\Projects\` làm gốc chung vĩnh viễn, mỗi dự án nằm gọn 1 thư mục.
- Tạo dự án `App AP CAR CARE` tại `D:\My Agents\Projects\App AP CAR CARE\` gồm `AGENTS.md`, `CLAUDE.md`, `hq/`, `src/`, `backup/`, `backup.ps1`.
- Tạo junction `business-docs` → `D:\My Documents\KINH DOANH\All-in-one Business Plan\Cac kinh doanh TDC Media tu van\AP CAR CARE` để đồng bộ dữ liệu sẵn có (không copy).
- Quyền Modify (Everyone) trên 2 thư mục AP CAR CARE đã cấp trước đó bằng `icacls`.
- Đính chính: ghi chú phiên trước nói đã copy cấu hình TDCM sang AP CAR CARE là KHÔNG chính xác; lúc đó thư mục chỉ có AGENTS.md. Khung hq hiện tại mới được tạo thật.

## 2026-10-04 22:35 — Lucy/Antigravity
- Rà soát toàn diện và chuẩn hóa khung quy tắc làm việc cho bộ 3 file: hq/lesson.md, hq/schematic_map.md và hq/CODING_TASKS.json.
- lesson.md: Đã nạp đầy đủ 2 nguyên tắc debug cốt lõi (khoanh vùng code mới thêm từ commit trước, dừng khẩn cấp khi i=3) + Mẫu chuẩn format [ERR-xxx].
- schematic_map.md: Đã nạp quy tắc tự động cập nhật / bỏ qua + Khung sơ đồ Mermaid mẫu + 4 trụ cột kỹ thuật (SSOT, FIELD_MAP...) + Bảng phân chia Frontend/Backend.
- CODING_TASKS.json: Đã nạp đối tượng hướng dẫn _GUIDE (Mandatory Scan Workflow, quét dọn tàn dư Cấp độ 1 & 2, leo thang Escalation, Schema chuẩn).
- AGENTS.md: Bổ sung đồng bộ quy trình quét scan trước khi code và chuẩn FIELD_MAP. Commit: c990f51.
## 2026-10-04 22:42 — Lucy/Antigravity
- Thực hiện yêu cầu của anh Đức: Nạp nguyên bản 100% nội dung file lesson.md từ dự án Project TDCM Team App sang hq/lesson.md của App AP CAR CARE (dung lượng: 17.624 bytes, khớp hash 100%).
- Toàn bộ kinh nghiệm xử lý lỗi (lỗi lồng nháy template literal, lỗi bộ lọc Caja HtmlService, lỗi render state machine, khoanh vùng lỗi theo confirm mốc...) đã được tích hợp đầy đủ.
## 2026-10-04 22:50 — Lucy/Antigravity
- Bổ sung bối cảnh dự án cốt lõi: Ứng dụng đa năng phục vụ Khách hàng, Nhân viên, Đối tác của Công ty TNHH AP CAR CARE (Detailing, Phụ kiện, Đồ chơi xe, Âm thanh Focal... tại TPHCM & Toàn quốc).
- Xác lập cơ chế phân vai phối hợp: Lucy (Kỹ sư phần mềm / lập trình chính), anh Đức (Trợ lý dự án kiêm phụ trách chức năng nghiệp vụ).
- Khởi tạo 8 câu hỏi khảo sát nghiệp vụ để làm rõ phạm vi chức năng, kiến trúc kỹ thuật và luồng dữ liệu đầu vào.
## 2026-10-04 22:57 — Lucy/Antigravity
- Đính chính phân vai nhân sự chuẩn xác theo chỉ đạo của anh Đức:
  + **Lucy (AI Agent):** Đảm nhiệm toàn diện: AI kỹ sư phần mềm / kiến trúc sư giải pháp & lập trình viên chính, Trợ lý dự án kiêm phụ trách các vị trí chức năng chuyên môn, Business Analyst (BA), Kiểm thử chất lượng (QA) & Điều phối giải pháp.
  + **Anh Đức:** Đóng 1 vai trò duy nhất là **Product Owner (PO)** — Định hướng tầm nhìn sản phẩm, phê duyệt tính năng, ra quyết định nghiệm thu và mục tiêu kinh doanh.
## 2026-10-04 23:10 — Lucy/Antigravity
- Ghi nhận yêu cầu phong cách thiết kế từ Product Owner (anh Đức):
  + Tinh thần: Ultra-luxury, automotive premium, minimalist, studio lighting (tham chiếu ảnh Mercedes S-Class đen tuyền bóng gương).
  + 3 Màu chủ đạo: Đen tuyền (#000000, #08090B), Trắng tinh khôi (#FFFFFF), Xanh dương nhạt (Google Blue #4285F4 / #8AB4F8).
  + Kịch bản Motion Graphic: Load đen tuyền -> 0.5s hiện dần logo tròn AP lớn giữa màn hình (tilt 3D) -> Logo zoom nhỏ lại và hiện chữ "AP CAR CARE AUDIO & ACCESSORIES" kế bên -> Xuất hiện form đăng nhập gồm 2 ô "Tên đăng nhập" và "Mật khẩu" + nút đăng nhập đồng bộ.
  + Tech Stack Giai đoạn 1: Google Apps Script Web App.
  + Backend Database: Google Sheet ID 1ziGRRq92AxX9BnDMYbHF-iES7XskALCaOK6LeUw_IS0.
- Ban hành file quy chuẩn thiết kế vĩnh viễn: hq/design_aesthetic_memo.md.
- Trích xuất logo tròn AP (usiness-docs/logo/Logo AP nen den chu trang.png) sang base64 lưu tại hq/logo_b64.txt.
- Cập nhật kiến trúc hệ thống vào hq/schematic_map.md và tạo TASK-001 trong hq/CODING_TASKS.json.
## 2026-10-04 23:11 — Lucy/Antigravity
- Được sự đồng ý và phê duyệt từ Product Owner (anh Đức):
- Đã thực hiện chạy .\backup.ps1 trước khi đưa code vào src/ (Mã backup snapshot: 84bf45f).
- Tạo thành công bộ 3 file mã nguồn cốt lõi trong src/:
  1. src/appsscript.json: Cấu hình manifest V8 runtime và múi giờ Việt Nam.
  2. src/Code.gs: Bộ điều phối backend xử lý doGet(), xác thực tài khoản checkLogin() qua Google Sheet ID 1ziGRRq92AxX9BnDMYbHF-iES7XskALCaOK6LeUw_IS0 theo chuẩn FIELD_MAP Pattern.
  3. src/Index.html: Giao diện Welcome & Login siêu sang (Motion Graphic logo AP 3D, responsive PC và Mobile, màu Đen/Trắng/Google Blue).