# 00-INDEX.md — HQ dự án App AP CAR CARE

## TRẠNG THÁI HIỆN TẠI
- **Trạng thái:** Đã hoàn tất 100% các nâng cấp kiến trúc cốt lõi (Commit: `8af129a`):
  1. **Khắc phục triệt để lỗi reload F5 mất session (Zero-Flash Session Retention - Học hỏi từ TDCM Team App)**:
     - Gỡ bỏ hardcode class `active` ở màn hình `#viewLogin`.
     - Nhúng Micro-Script đồng bộ ngay đầu `<body>` + Session Guard CSS: Tự động kích hoạt class `ap-authenticated` lên `<html>` trong 0.0001s nếu phát hiện session, triệt tiêu 100% chớp màn hình Login.
     - **Server-Assisted Session Injection**: Backend `doGet(e)` tự động nhận diện danh tính qua `Session.getActiveUser().getEmail()` (`triduccarmedia@gmail.com`) hoặc URL param `?u=DUC`, inject trực tiếp thông tin phiên vào HTML template để Client tự phục hồi kể cả khi GAS iframe ở `/dev` đổi origin sandbox.
     - Đồng bộ 100% SSOT khóa session `apUserSession` xuyên suốt toàn bộ hệ thống (xóa bỏ phân mảnh với `apUserProfileV5`).
  2. **Tự động Khởi tạo & Đồng bộ 16 Bảng dữ liệu Chuẩn SME OS ở Backend (`PM_CONFIG.SHEETS`)**:
     - Mở rộng hàm `ensureBackendSheetsInitialized()` ở `Code.gs` để tự động tạo toàn bộ 16 sheets nếu chưa tồn tại: 10 Bảng nghiệp vụ (`Staff`, `Leads`, `Customers`, `Orders`, `Tasks`, `Products_Assets`, `Partners`, `Inventory`, `Finance_Transactions`, `Warranty_Care`) + 6 Bảng hạ tầng & tự động hóa (`MKT_Posts`, `TT-MKT`, `Audit_Logs`, `App_Themes`, `Brand_Logo_Slots`, `Sys_Automation_Queue`).
     - Tự động điền Dòng 10 Tiêu đề cột `HEADER_ROW = 10`, Dòng 11 Hướng dẫn kiểu dữ liệu, và chèn dòng mẫu khởi tạo từ Dòng 12.
  3. **Kết nối luồng dữ liệu 2 chiều Backend - Frontend qua OptiSync V5**:
     - Chiều Đọc (Fetch): `getWhiteLabelAndSystemBundle()` + `api_query({ tableName })` qua `DataMapper.rowToObject` nạp vào `AppStore`.
     - Chiều Ghi (Batch Sync): `AppStore.dispatchAction` -> Optimistic UI tức thì 0.001s -> Debounce 8s ("Chuyến xe tải") -> `api_batch_sync` ghi hàng loạt và log kiểm toán `Audit_Logs`.
- **Link Môi Trường Thử Nghiệm Realtime (`/dev` HEAD - Tự động nạp code nháp mới nhất khi push):** [Mở Web App GAS Test /dev](https://script.google.com/macros/s/AKfycby2oRgZeIUs8yZ6rp0-5nIpYS59S5j_C7cecKkNXnM/dev) *(Tài khoản: `DUC` / Mật khẩu: `7668`)*
- **Link Demo App Live (GitHub Pages - Kiểm tra giao diện trực tiếp không vướng quyền Google):** [Mở App AP CAR CARE (GitHub Pages)](https://triducmkt.github.io/App-AP-CAR-CARE/)
- **Link Môi Trường Sản Xuất Đóng Băng (`/exec` - Bản chính thức, KHÔNG tự ý deploy khi chưa có lệnh duyệt):** [Mở Web App GAS Production /exec](https://script.google.com/macros/s/AKfycbxyBy5Mme7JJbLS95nNpBb_Fj-IB_73QCf1GHr28Itcc1k23Ay4Kn47iBA-yOfnRdVQ/exec) *(Tài khoản: `DUC` / Mật khẩu: `7668`)*
- **Link Google Sheet Backend (SSOT):** [Mở Google Sheet Backend App AP CAR CARE](https://docs.google.com/spreadsheets/d/1ziGRRq92AxX9BnDMYbHF-iES7XskALCaOK6LeUw_IS0/edit)
- **Cập nhật lần cuối:** Lucy/Antigravity — 2026-10-25 13:00 (Commit: `8af129a`)

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
