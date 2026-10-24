# 00-INDEX.md — HQ dự án App AP CAR CARE

## TRẠNG THÁI HIỆN TẠI
- **Trạng thái:** Đã hoàn tất 100% **`TASK-015` — Nhân Bản Module Cài Đặt API Key (TDCM Team App), Sub-Tabs Trong Cài Đặt Hệ Thống, Line Mũi Tên Đen Carbon Nét Liền Curve & Nút Tạo Video Liên Kết API Key Kèm Animation Dòng Chảy Tiến Độ Realtime Trên Canvas**.
- **Link Demo App Live:** [Mở App AP CAR CARE (GitHub Pages)](https://triducmkt.github.io/App-AP-CAR-CARE/) *(Tài khoản: `DUC` / Mật khẩu: `1111`)*
- **Link Google Sheet Backend (SSOT):** [Mở Google Sheet Backend App AP CAR CARE](https://docs.google.com/spreadsheets/d/1ziGRRq92AxX9BnDMYbHF-iES7XskALCaOK6LeUw_IS0/edit)
- **Vừa xong (`TASK-015`):**
  1. **Nhân bản Module Quản lý Khóa API từ Project TDCM Team App sang Cài đặt (`#pane_SETTINGS`):**
     - Thiết lập hệ thống 4 Sub-Tabs tinh gọn: `1. Phân Quyền & Bật Tắt 8 Phòng Ban`, `2. Quản Lý Khóa API & AI Engines (Chuẩn TDCM)`, `3. Trạm Kết Nối MCP Hub (Haravan • Getfly • Javis)`, `4. Giao Diện Theme & White-Label Logo`.
     - Xây dựng Bảng danh sách Khóa API đầy đủ tính năng: STT, Loại API (Gemini, Claude, OpenAI, Vbee, Runway, ElevenLabs...), Tên gợi nhớ, App ID, Masked Key (`••••••••`) kèm nút con mắt 👁️ xem/ẩn token, Model mặc định, Trạng thái (Kích hoạt/Tắt), Thao tác (Sửa, Bật/Tắt, Xóa).
     - Form Thêm/Chỉnh sửa Khóa API tự động đồng bộ 2 chiều với `localStorage` (`AP_CAR_CARE_API_KEYS`) và Backend ScriptProperties/Sheet.
  2. **Đổi Đường Line Nối Các Node Canvas Thành Nét Liền Mảnh Đen Carbon Curve:**
     - Thay thế hoàn toàn đường đứt nét neon cũ bằng **đường cong Cubic Bezier nét liền mảnh (`stroke-width: 1.6px`)**, màu đen Carbon sang trọng (`var(--ap-ve-line-idle, #2B3342)`), kết thúc bằng **đầu mũi tên chỉ hướng tam giác sắc nét** (`<marker id="veCarbonArrow" ...>`).
  3. **Nút "TẠO VIDEO MỚI" Liên Kết Khóa API & Hiệu Ứng Dòng Chảy Realtime Animation:**
     - Tích hợp nút **`TẠO VIDEO MỚI (RUN 7 SKILL)`** tại tiêu đề bảng và thanh công cụ Canvas.
     - Khi bấm Tạo, hệ thống tự động kiểm tra Khóa API hợp lệ (tương tự cơ chế Tạo AI Voice bên TDCM Team App): nếu chưa có API key nào được kích hoạt, hệ thống sẽ bung cảnh báo và dẫn người dùng sang Tab Cài Đặt Khóa API; nếu đã có khóa, kích hoạt ngay **dòng chảy ánh sáng xung mạch (animated flow runner)** dọc theo các line từ node đầu tới node cuối.
     - Từng Node lần lượt chuyển trạng thái từ `WAITING` $\rightarrow$ `RUNNING` (viền Cobalt phát sáng, xoay nhịp nhàng) $\rightarrow$ `COMPLETED` (tick xanh), kèm dải tiến độ 0% $\rightarrow$ 100% và log chi tiết từng skill, kết thúc bằng file video 1080x1920 Full HD lưu trữ vào Google Drive & Sheet `TT-MKT`.
  4. **Giải mã kiến trúc Backend Google Sheet, Hybrid Video Rendering & Javis OS MCP Bridge:**
     - Phân tích rõ nguyên nhân static demo GitHub Pages không tự động ghi vào Sheet nếu chưa deploy Apps Script Web App.
     - Phân tích giải pháp Hybrid: GAS làm Orchestrator (quản trị, prompt Gemini, cấp quyền), còn render video nặng bằng FFmpeg chuyển cho Worker/Javis OS/Antigravity xử lý và upload lên Drive.
     - Hướng dẫn chi tiết luồng trao đổi dữ liệu 2 chiều Javis $\leftrightarrow$ SME OS qua Canonical Data Envelope và phân phối dữ liệu theo Ma trận Phân quyền 4D.
- **Bước tiếp theo:** Anh Đức trải nghiệm Tab Cài Đặt API Key và bấm nút "TẠO VIDEO MỚI" trên Canvas Edit Video để xem trực tiếp hiệu ứng dòng chảy tiến độ thời gian thực.
- **Cập nhật lần cuối:** Lucy/Antigravity — 2026-10-24 23:25

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
