# 00-INDEX.md — HQ dự án App AP CAR CARE

## TRẠNG THÁI HIỆN TẠI
- **Trạng thái:** Đã hoàn tất 100% việc sửa lỗi màn hình đen frontend và kết nối luồng render video thật về Local Gateway:
  1. **Khắc phục triệt để Lỗi Màn Hình Đen Toàn Phần & Biến Mất 8 Nút Phòng Ban (`ERR-016`)**:
     - *Nguyên nhân gốc rễ:* `ScriptProperties` trên GAS và `localStorage` tồn dư cấu hình phân quyền cũ thiếu role `ADMIN_CEO`, khiến hàm `renderSidebarDepartmentShortcuts()` đánh giá `hasAccess = false` cho 100% phòng ban. Biến `firstVisibleDept` bị `null`, không có lệnh chuyển tab, toàn bộ `.ap-dept-pane` đều bị ẩn (`display: none`), làm cho màn hình làm việc chính bị đen tuyền.
     - *Giải pháp triệt để 3 lớp:*
       * (1) Hàm khử khuẩn `sanitizeDeptAccessConfig`: Chuẩn hóa 100% mảng cấu hình về đúng 8 phòng ban chuẩn, tự động chèn `ADMIN_CEO` vào `allowedRoles` của tất cả phòng ban.
       * (2) Quyền tối thượng Master Admin Bypass: Nếu `roleCode === 'ADMIN_CEO' || roleCode === 'CEO_FOUNDER'`, quyền truy cập luôn là `d.enabled !== false`, không bao giờ bị khóa.
       * (3) Cơ chế Fail-Safe Active Stage: Sau khi render sidebar, luôn tự động gọi `switchDepartment(curDept || 'DEPT_MKT')`, đảm bảo luôn có 1 pane active hiển thị trên màn hình.
  2. **Kết nối Luồng Thực Thi Thật Video Studio với Local Gateway (`gateway.triduccar.media`) & Google Drive (`1C8HcDHdZ_N8QABe2BP7bXRjFhZrd0qcT`)**:
     - Nâng cấp Local Gateway server (`server.js` v1.2) hỗ trợ đầy đủ các endpoint:
       * `POST /v1/video/render`: Tiếp nhận yêu cầu, chạy CLI `node index.js clip-tiktok` trong `D:\My Agents\Tools\ai-video-editor`.
       * `GET /v1/video/download?file=...`: Phục vụ stream và tải trực tiếp file video thành phẩm MP4.
       * `GET /v1/video/outputs`: Trả về danh sách toàn bộ video đã render theo quy ước đặt tên local.
     - Tích hợp 2 hàm Backend trong `Code.gs`:
       * `triggerLocalVideoRender(payload)`: Gọi Local Gateway qua Cloudflare Tunnel, kéo file MP4 về và tự động tạo file trong Google Drive folder `1C8HcDHdZ_N8QABe2BP7bXRjFhZrd0qcT`, cấp quyền xem công khai và trả về link Google Drive chuẩn.
       * `getApDriveFolderFiles(folderId)`: Quét và hiển thị toàn bộ video raw sẵn có trong thư mục Drive AP CAR CARE.
     - Bổ sung nút **"📁 Drive AP"** tại ô Video Raw để mở danh sách chọn video từ Drive `1C8HcDHdZ_N8QABe2BP7bXRjFhZrd0qcT`.
     - Tự động nạp link Drive vào Node cuối cùng (`NODE_OUTPUT_VIDEO`) và mở nút **"TRUY CẬP DRIVE XEM VIDEO ↗"**.
- **Link Môi Trường Thử Nghiệm Realtime (`/dev` HEAD - Tự động nạp code nháp mới nhất khi push):** [Mở Web App GAS Test /dev](https://script.google.com/macros/s/AKfycby2oRgZeIUs8yZ6rp0-5nIpYS59S5j_C7cecKkNXnM/dev) *(Tài khoản: `DUC` / Mật khẩu: `7668`)*
- **Link Demo App Live (GitHub Pages - Kiểm tra giao diện trực tiếp không vướng quyền Google):** [Mở App AP CAR CARE (GitHub Pages)](https://triducmkt.github.io/App-AP-CAR-CARE/)
- **Link Môi Trường Sản Xuất Đóng Băng (`/exec` - Bản chính thức, KHÔNG tự ý deploy khi chưa có lệnh duyệt):** [Mở Web App GAS Production /exec](https://script.google.com/macros/s/AKfycbxyBy5Mme7JJbLS95nNpBb_Fj-IB_73QCf1GHr28Itcc1k23Ay4Kn47iBA-yOfnRdVQ/exec) *(Tài khoản: `DUC` / Mật khẩu: `7668`)*
- **Link Google Sheet Backend (SSOT):** [Mở Google Sheet Backend App AP CAR CARE](https://docs.google.com/spreadsheets/d/1ziGRRq92AxX9BnDMYbHF-iES7XskALCaOK6LeUw_IS0/edit)
- **Cập nhật lần cuối:** Lucy/Antigravity — 2026-10-25 14:30 (ERR-016 Fix & Real Local Gateway Integration)

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
