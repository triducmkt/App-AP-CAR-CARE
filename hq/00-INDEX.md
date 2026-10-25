# 00-INDEX.md — HQ dự án App AP CAR CARE

## TRẠNG THÁI HIỆN TẠI
- **Trạng thái:** Đã hoàn tất 100% các nâng cấp kiến trúc cốt lõi (Commit: `1ad4153`):
  1. **Khắc phục triệt để lỗi SyntaxError tại Dòng 1132 Code.gs (`template.evaluate()`)**:
     - Nguyên nhân gốc rễ: Bộ tiền xử lý Template của Google Apps Script hiểu nhầm chuỗi JavaScript `indexOf('<?')` trong thẻ `<script>` là thẻ mở Scriptlet mới `<?`, gây crash trình biên dịch template với lỗi `Invalid or unexpected token`.
     - Giải pháp triệt để: Đóng gói chuỗi session phía server sang chuẩn **`Utilities.base64Encode()`**, loại bỏ hoàn toàn ký tự nháy kép `"` và chuỗi `<?`. Client giải mã bằng `window.atob()` an toàn 100%.
  2. **Kết nối Luồng Thực Thi Thật trên Canvas Edit Video (7 Skills) & Link Google Drive Node Output**:
     - Hỗ trợ dán trực tiếp đường link Google Drive (hoặc URL video raw) vào ô **"File Video Raw"**.
     - Khi bấm **TẠO VIDEO (RUN 7 SKILL)**: Sau khi chạy qua luồng 7 skill và lưu vào Sheet `TT-MKT`, Node cuối cùng (`NODE_OUTPUT_VIDEO`) tự động cập nhật link Google Drive sống kèm nút bấm nổi bật **"TRUY CẬP DRIVE XEM VIDEO ↗"** để mở xem file video trực tiếp trên Google Drive.
  3. **Khắc phục triệt để lỗi reload F5 mất session (Zero-Flash Session Retention)**:
     - Gỡ bỏ hardcode class `active` ở màn hình `#viewLogin`.
     - Nhúng Micro-Script đồng bộ ngay đầu `<body>` + Session Guard CSS: Tự động kích hoạt class `ap-authenticated` lên `<html>` trong 0.0001s nếu phát hiện session, triệt tiêu 100% chớp màn hình Login.
  4. **Tự động Khởi tạo & Đồng bộ 16 Bảng dữ liệu Chuẩn SME OS ở Backend (`PM_CONFIG.SHEETS`)**:
     - Đã nâng cấp `ensureBackendSheetsInitialized()` ở `Code.gs` để tự động tạo toàn bộ 16 sheets nếu chưa tồn tại.
- **Link Môi Trường Thử Nghiệm Realtime (`/dev` HEAD - Tự động nạp code nháp mới nhất khi push):** [Mở Web App GAS Test /dev](https://script.google.com/macros/s/AKfycby2oRgZeIUs8yZ6rp0-5nIpYS59S5j_C7cecKkNXnM/dev) *(Tài khoản: `DUC` / Mật khẩu: `7668`)*
- **Link Demo App Live (GitHub Pages - Kiểm tra giao diện trực tiếp không vướng quyền Google):** [Mở App AP CAR CARE (GitHub Pages)](https://triducmkt.github.io/App-AP-CAR-CARE/)
- **Link Môi Trường Sản Xuất Đóng Băng (`/exec` - Bản chính thức, KHÔNG tự ý deploy khi chưa có lệnh duyệt):** [Mở Web App GAS Production /exec](https://script.google.com/macros/s/AKfycbxyBy5Mme7JJbLS95nNpBb_Fj-IB_73QCf1GHr28Itcc1k23Ay4Kn47iBA-yOfnRdVQ/exec) *(Tài khoản: `DUC` / Mật khẩu: `7668`)*
- **Link Google Sheet Backend (SSOT):** [Mở Google Sheet Backend App AP CAR CARE](https://docs.google.com/spreadsheets/d/1ziGRRq92AxX9BnDMYbHF-iES7XskALCaOK6LeUw_IS0/edit)
- **Cập nhật lần cuối:** Lucy/Antigravity — 2026-10-25 13:38 (Commit: `1ad4153`)

## BỐI CẢNH DỰ ÁN & VAI TRÒ
- **Chủ đầu tư / Nền tảng:** Hệ điều hành Doanh nghiệp SME OS ứng dụng thực chiến cho Công ty TNHH AP CAR CARE (Detailing, Phụ kiện, Đồ chơi xe, Âm thanh Focal... tại TPHCM & Toàn quốc).
- **Mục tiêu app:** Ứng dụng đa năng phục vụ 3 nhóm: Khách hàng, Nhân viên kỹ thuật/vận hành, Đối tác/Đại lý theo chuẩn kiến trúc SME OS (Business First, AI Second; Simplicity First; Event-Driven; SSOT).
- **Kho tài liệu cốt lõi SME OS (`hq/sme-os-core/`):**
  - `00-CONTEXT-MASTER-PROMPT.md`: Tổng hợp Hiến pháp 10 Điều, 8 Nguyên tắc Sản phẩm, Chiến lược Ngôn ngữ 4 tầng và Vai trò của Lucy.
  - `01-PRODUCT-PHILOSOPHY.md` (17 chương), `02-BUSINESS-ARCHITECTURE.md` (15 chương), `03-SYSTEM-ARCHITECTURE.md` (15 chương), `04-APPLICATION-ARCHITECTURE.md` (6 chương), `05-TECHNOLOGY-ARCHITECTURE.md` (Chương 0 + 6 chương).
- **Phân công vai trò:**
  - **Lucy (AI Agent):** (1) Lead Product Architect & Technical Writer (10 năm kinh nghiệm) kiêm Business Analyst (BA) khi thiết kế/viết 5 file cốt lõi; (2) Kỹ sư phần mềm / kiến trúc sư giải pháp & lập trình viên chính (Senior Full-stack GAS/Next.js), QA & Trợ lý điều phối giải pháp khi code app.
  - **Anh Đức:** **Product Owner (PO) & Chief Architect** duy nhất.

## Ghi chú
- Thư mục `D:\My Agents\Antigravity\App AP CAR CARE` và `D:\My Agents\Gemini\App AP CAR CARE` là liên kết tới thư mục này.
- Bản cũ (chỉ có 1 file AGENTS.md) được giữ làm backup: `D:\My Agents\Antigravity\App AP CAR CARE_BACKUP_20261004`.
