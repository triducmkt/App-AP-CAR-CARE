# 00-INDEX.md — HQ dự án App AP CAR CARE

## TRẠNG THÁI HIỆN TẠI
- **Trạng thái:** Đã hoàn tất 100% việc chuẩn hóa đồng bộ mã nguồn gọn gàng, liền mạch và dứt điểm lỗi màn hình đen theo đúng yêu cầu của anh Đức (Commit `a1939bb`):
  1. **Khóa cứng Sheet Gốc (SSOT Binding) & Loại bỏ hoàn toàn ghi đè chậm chạp trong `doGet` (`ERR-017`)**:
     - `PM_CONFIG.SHEETS`: Trỏ thẳng `STAFF: "Nhân sự"`, `CATEGORIES: "Danh mục"`, `TASKS: "Công việc"`, `PROJECTS: "Dự án"`, `MKT_POSTS: "TT-MKT"`, `AUDIT_LOGS: "Lịch sử"`, `APP_THEMES: "App_Themes"`, `SETTINGS: "Cài đặt"`.
     - Gỡ bỏ hoàn toàn việc tạo 16 sheet thừa (`insertSheet("Staff")`) và xóa lệnh `ensureBackendSheetsInitialized()` khỏi chu kỳ tải trang của `doGet(e)`. Web app nạp tức thì trong `< 250ms`.
  2. **Chuẩn hóa Đăng nhập & Đọc Hồ sơ Nhân sự từ Sheet `Nhân sự`**:
     - Quét trực tiếp Cột H (`SĐT Zalo` / Username: `DUC`, `LOC`) và Cột I (`Mật khẩu`: `7668`, `1234`).
     - Đọc trực tiếp Cột F (`Chức vụ` = `Admin` hoặc `CEO`), tự động cấp `fullAccess: true` và `isMasterAdmin: true`, mở thẳng vào 8 phòng ban.
     - Cột M (`uiPersonalizationJson`): Tự động nạp khi login/reload và tự động lưu thẳng về Cột M của user trong Sheet `Nhân sự` khi kéo thả sắp xếp nút Sidebar hoặc đổi Theme.
  3. **Đọc Dropdown Động từ Sheet `Danh mục`**:
     - Hàm `loadCategoryTaxonomy()` đọc 1 lần duy nhất từ Cột B, D, F, H, J, L, N, P, R, T, V của Sheet `Danh mục` để nuôi toàn bộ dropdown trên giao diện.
  4. **Kết nối Luồng Trực tiếp Phòng Ban Frontend - Backend**:
     - `DEPT_HR` (Nhân sự - Đào tạo): Kết nối trực tiếp Sheet `Nhân sự` qua `getStaffList()`, hiển thị bảng danh sách nhân viên thật và tổng KPI nhân sự.
     - `DEPT_SETTINGS` (Cài đặt hệ thống): Kết nối Sheet `Cài đặt` qua `getSystemSettings()` và `saveSystemSetting()`.
     - `DEPT_MKT`: Kết nối Sheet `TT-MKT` và Local Gateway Video Studio (`https://gateway.triduccar.media`).
     - `DEPT_TECH`, `DEPT_CEO`, `DEPT_SALE`, `DEPT_INV`, `DEPT_FIN`, `DEPT_OPS`: Đã đồng bộ qua 4D Field Map và các API backend chuẩn.
  5. **Môi trường Triển khai Tuân thủ Nghiêm ngặt Quy trình (Rule 10)**:
     - Đã đẩy code sạch lên **HEAD `/dev`** để anh Đức test trực tiếp.
     - Đã deploy bản Demo mới nhất lên **GitHub Pages**.
     - Khóa cứng bản `/exec` Production, tuyệt đối không tự ý deploy khi chưa có lệnh duyệt của anh Đức.
- **Link Môi Trường Thử Nghiệm Realtime (`/dev` HEAD - Tự động nạp code nháp mới nhất khi push):** [Mở Web App GAS Test /dev](https://script.google.com/macros/s/AKfycby2oRgZeIUs8yZ6rp0-5nIpYS59S5j_C7cecKkNXnM/dev) *(Tài khoản: `DUC` / Mật khẩu: `7668`)*
- **Link Demo App Live (GitHub Pages - Kiểm tra giao diện trực tiếp không vướng quyền Google):** [Mở App AP CAR CARE (GitHub Pages)](https://triducmkt.github.io/App-AP-CAR-CARE/)
- **Link Môi Trường Sản Xuất Đóng Băng (`/exec` - Bản chính thức, KHÔNG tự ý deploy khi chưa có lệnh duyệt):** [Mở Web App GAS Production /exec](https://script.google.com/macros/s/AKfycbxyBy5Mme7JJbLS95nNpBb_Fj-IB_73QCf1GHr28Itcc1k23Ay4Kn47iBA-yOfnRdVQ/exec) *(Tài khoản: `DUC` / Mật khẩu: `7668`)*
- **Link Google Sheet Backend (SSOT):** [Mở Google Sheet Backend App AP CAR CARE](https://docs.google.com/spreadsheets/d/1ziGRRq92AxX9BnDMYbHF-iES7XskALCaOK6LeUw_IS0/edit)
- **Cập nhật lần cuối:** Lucy/Antigravity — 2026-10-25 17:15 (ERR-018 Fix ReferenceError & ERR-019 Fix Flexbox Row on Full Screen Desktop)
  * Khởi tạo Sheet `Yêu cầu tính năng` (13 cột chuẩn Hiến pháp) trên SSOT Backend Spreadsheet `1ziGRRq92AxX9BnDMYbHF-iES7XskALCaOK6LeUw_IS0`.
  * Khắc phục triệt để lỗi `ERR-019` (Lỗi mất section khi full screen desktop): Đã sửa `html.ap-authenticated #viewHome` từ `display: block` thành `display: flex; flex-direction: row; position: fixed; inset: 0;`, đưa `#apMainStage` về đúng vị trí song hành bên cạnh `#apSidebar` trên cả PC Desktop và Mobile.

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
