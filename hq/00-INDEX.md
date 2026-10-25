# 00-INDEX.md — HQ dự án App AP CAR CARE

## TRẠNG THÁI HIỆN TẠI
- **Trạng thái:** Đã hoàn tất 100% các tính năng:
  1. **Khắc phục triệt để lỗi reload F5 mất session**: Áp dụng cơ chế Phục hồi phiên 4 tầng (`sessionStorage` + `localStorage` + `google.script.history.replaceState` + `google.script.url.getLocation`), khi F5 app tự động giữ session và nạp thẳng vào `#viewHome` trong 0.01s.
  2. **Tự động lưu JSON Cá nhân hóa vào Cột M (Sheet Nhân sự)**: Kéo thả các nút Sidebar tự động lưu backend riêng cho từng user không cần nhấn nút Save. Đã fix logic khớp username `DUC` / `NV-401` / `TĂNG TRÍ ĐỨC` để ghi chuẩn xác vào ô Sheet Cột M.
  3. **Ưu tiên phân quyền Admin/CEO trước Cá nhân hóa**: Xóa bỏ hoàn toàn huy hiệu `0/8` hay `8/8`. Khi Admin/CEO tắt đi hoặc tước quyền phòng ban nào của user, khi load app sẽ tự động loại bỏ (prune) nút đó khỏi cấu hình cá nhân hóa và tự động lưu mã JSON sạch mới về backend.
  4. **Nâng cấp Cổng `doPost(e)` tiếp nhận dữ liệu từ Javis OS (Canonical Ingestion Envelope)**: Tự động phân loại, kiểm toán và ghi vào Sheet backend theo từng phòng ban (`Leads`, `TT-MKT`, `Kho-VT`).
- **Link Môi Trường Thử Nghiệm Realtime (`/dev` - Cập nhật liên tục khi push):** [Mở Web App GAS Test /dev](https://script.google.com/macros/s/AKfycbxyBy5Mme7JJbLS95nNpBb_Fj-IB_73QCf1GHr28Itcc1k23Ay4Kn47iBA-yOfnRdVQ/dev) *(Tài khoản: `DUC` / Mật khẩu: `7668`)*
- **Link Môi Trường Sản Xuất Đóng Băng (`/exec` - Chỉ deploy khi anh Đức duyệt):** [Mở Web App GAS Production /exec](https://script.google.com/macros/s/AKfycbxyBy5Mme7JJbLS95nNpBb_Fj-IB_73QCf1GHr28Itcc1k23Ay4Kn47iBA-yOfnRdVQ/exec) *(Tài khoản: `DUC` / Mật khẩu: `7668`)*
- **Link Demo App Live (GitHub Pages):** [Mở App AP CAR CARE (GitHub Pages)](https://triducmkt.github.io/App-AP-CAR-CARE/)
- **Link Google Sheet Backend (SSOT):** [Mở Google Sheet Backend App AP CAR CARE](https://docs.google.com/spreadsheets/d/1ziGRRq92AxX9BnDMYbHF-iES7XskALCaOK6LeUw_IS0/edit)
- **Cập nhật lần cuối:** Lucy/Antigravity — 2026-10-25 11:42

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
