# 00-INDEX.md — HQ dự án App AP CAR CARE

## TRẠNG THÁI HIỆN TẠI
- **Trạng thái:** Đã hoàn tất 100% việc **Triển khai sạch toàn bộ mã nguồn từ GitHub / Local sang Google Apps Script ID `1WVoxU20yqSYltl881Y9_Xm8oDjXBKLdh4Y3UQnlrTIYGcZJhtwG1qovD`, Xóa Sạch 16 File Code Cũ Tồn Đọng của TDCM Team App, Cập Nhật 3 File Cốt Lõi (`appsscript`, `Code`, `Index`) và Phát Hành Bản Triển Khai Web App Production Mới**.
- **Link Web App Google Apps Script Chính Thức:** [Mở Web App GAS Production](https://script.google.com/macros/s/AKfycbxyBy5Mme7JJbLS95nNpBb_Fj-IB_73QCf1GHr28Itcc1k23Ay4Kn47iBA-yOfnRdVQ/exec) *(Tài khoản: `DUC` / Mật khẩu: `1111`)*
- **Link Demo App Live (GitHub Pages):** [Mở App AP CAR CARE (GitHub Pages)](https://triducmkt.github.io/App-AP-CAR-CARE/)
- **Link Google Sheet Backend (SSOT):** [Mở Google Sheet Backend App AP CAR CARE](https://docs.google.com/spreadsheets/d/1ziGRRq92AxX9BnDMYbHF-iES7XskALCaOK6LeUw_IS0/edit)
- **Vừa xong:**
  1. **Kết nối trực tiếp qua Google Apps Script REST API với Script ID `1WVoxU20yqSYltl881Y9_Xm8oDjXBKLdh4Y3UQnlrTIYGcZJhtwG1qovD`:**
     - Quét và phát hiện 19 file remote trên Apps Script (trong đó có 16 file cũ tồn đọng của TDCM như `AA_ReadMe`, `AuditLog`, `Automation`, `Dashboard`, `Task_list`...).
     - Thực hiện cập nhật đè toàn diện (Atomic Replace): Xóa bỏ sạch sẽ 100% các file cũ của TDCM.
     - Thay thế bằng đúng **3 file chuẩn SSOT của App AP CAR CARE**: `appsscript.json`, `Code.gs` (109KB), `Index.html` (642KB).
  2. **Tạo Version 1 & Xuất Bản Web App Production Mới:**
     - Version: `1` (*App AP CAR CARE - SME OS Core v2.0 Clean SSOT*).
     - Deployment ID: `AKfycbxyBy5Mme7JJbLS95nNpBb_Fj-IB_73QCf1GHr28Itcc1k23Ay4Kn47iBA-yOfnRdVQ`.
     - Web App URL: `https://script.google.com/macros/s/AKfycbxyBy5Mme7JJbLS95nNpBb_Fj-IB_73QCf1GHr28Itcc1k23Ay4Kn47iBA-yOfnRdVQ/exec`.
- **Bước tiếp theo:** Anh Đức mở trực tiếp link Web App trên hoặc vào Apps Script chạy hàm `initAllBackendSheets` để tự động khởi tạo Sheet `TT-MKT` và Cột `M` trên Sheet `Nhân sự`.
- **Cập nhật lần cuối:** Lucy/Antigravity — 2026-10-25 07:56

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
