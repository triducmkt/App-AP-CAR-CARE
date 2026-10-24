# 00-INDEX.md — HQ dự án App AP CAR CARE

## TRẠNG THÁI HIỆN TẠI
- **Trạng thái:** Đã hoàn tất 100% **`TASK-014` — Bổ sung `Phòng HR - Đào Tạo` (`DEPT_HR`) vào giữa các phòng ban (8 Phòng ban), Kéo Thả Sắp Xếp Nút Sidebar & Tự Động Lưu JSON Cá Nhân Hóa Vào Cột `M` Sheet `Nhân sự` (`Staff`), Bổ Sung `Bảng Edit Video AI` (7-Skill Pipeline Inputs + Mind-Map/Schematic Node Canvas Kéo Thả + Mouse Wheel Zoom) Trong `Phòng TT - MKT` & Tạo `FIELD_MAP` Mới + Sheet Mới `TT-MKT` Ở Backend**.
- **Link Google Sheet Backend (SSOT):** [Mở Google Sheet Backend App AP CAR CARE](https://docs.google.com/spreadsheets/d/1ziGRRq92AxX9BnDMYbHF-iES7XskALCaOK6LeUw_IS0/edit)
- **Vừa xong (`TASK-014`):**
  1. **Bổ sung `Phòng HR - Đào Tạo` (`DEPT_HR`) vào giữa Sidebar (`#sidebarDeptNav`):**
     - Nâng cấp hệ thống từ 7 lên **8 Phòng ban** (`DEPT_CEO`, `DEPT_MKT`, `DEPT_SALE`, `DEPT_TECH`, **`DEPT_HR`**, `DEPT_INV`, `DEPT_FIN`, `DEPT_OPS`), tích hợp giao diện con `#pane_DEPT_HR` đồng nhất 4 tầng (KPI Nhân sự & Đào tạo + AI Insight + Bảng Hồ sơ Nhân sự kèm cột `M` JSON cá nhân hóa + Bảng Lộ trình Đào tạo Tay nghề) và đồng bộ trong bảng Phân quyền Admin (`#pane_SETTINGS`).
  2. **Kéo Thả Sắp Xếp Nút Sidebar (`Drag-and-Drop`) & Tự Động Lưu JSON Cá Nhân Hóa Vào Cột `M` Sheet `Nhân sự` (`Staff`):**
     - Cho phép kéo thả trực tiếp các nút phòng ban trên `#sidebarDeptNav` để đổi vị trí tùy ý.
     - Tự động lưu cấu hình JSON cá nhân hóa (`sidebarOrder`, `themeMode`, `activeDepartment`, `updatedAt`) vào `localStorage`, cập nhật trực tiếp vào **Cột `M` (`Cá nhân hóa UI (JSON)` / `uiPersonalizationJson`)** của từng nhân sự trong bảng `Staff` và đồng bộ về Google Sheet `Nhân sự` qua hàm backend `saveUserUiPersonalization()`.
  3. **Bảng Edit Video AI (`#apVideoEditStudioPanel`) Trong `Phòng TT - MKT` + `FIELD_MAP` Mới (`TT_MKT_VIDEO_FIELD_MAP`) & Sheet Mới `TT-MKT`:**
     - **Cột trái (`#veLeftConfigPanel`):** Tích hợp đầy đủ tất cả các trường input mặc định từ luồng 7-Skill Video Pipeline mấy ngày qua: `File Video Raw (URL/Local)`, `File Video Mẫu Benchmark (URL/Local)`, `File Video Output 9:16`, `Ngành hàng`, `Loại Clip / Mục tiêu`, `Chân dung Khán giả`, `Cờ --apply-style`, `Preset Tone Màu Showroom`, `Contrast / Saturation / Brightness / Luma Sharpness / 3D Denoise`, `Thời lượng & Nhịp cắt ASL / Silence Cut`, `Hook 3s & Vi biểu cảm FACS / Zoom 118%`, `Phụ đề Khít 1px & Hộp Tiêu đề H1-H3 / Safe Zone`, `B-Roll 45% & Deictic Guard`, `Nhạc nền BGM Ducking -22dB & 4 Nhóm SFX HD`, `Offer & Banner CTA`, cùng ô **Mã JSON Thiết Lập (`#veFullConfigJsonTextarea`)** đồng bộ 2 chiều theo thời gian thực.
     - **Cột phải (`#veSchematicCanvasViewport`):** Canvas sơ đồ tư duy / Schematic Map với **Node `FILE VIDEO OUTPUT (9:16 FULL HD)` đặt ở ngoài cùng bên trái**, kết nối bằng đường cong SVG Bezier động tới toàn bộ chuỗi Node `Skill #0` → `Skill #7`, hỗ trợ **kéo thả di chuyển từng Node**, **kéo thả hoặc bấm thêm mới các Node vào luồng** (`+ Node B-Roll Cận Cảnh`, `+ Node Hiệu Ứng SFX`, `+ Node Hook / Slow-Mo`, `+ Node Tone Màu LUT`, `+ Node Tùy Chỉnh`), kéo giữ chuột di chuyển mặt bàn (Pan) và **lăn con lăn chuột (`Mouse Wheel`) để Zoom In / Zoom Out toàn bộ Canvas (`40% – 220%`)**.
     - **Backend (`src/Code.gs`):** Thiết lập `GLOBAL_DB_MAP["TT-MKT"]` (`TT_MKT_VIDEO_FIELD_MAP`, Cột `B` → `W`) và hàm `saveTtMktVideoProject()`, `getTtMktVideoProjects()`, `ensureBackendSheetsInitialized()` tự động khởi tạo Sheet `TT-MKT` và cột `M` trên Sheet `Nhân sự`.
- **Bước tiếp theo:** Anh Đức trải nghiệm kéo thả sắp xếp các phòng ban trên Sidebar (xem JSON cập nhật ở `Phòng HR - Đào Tạo`) và tương tác với `Bảng Edit Video AI` + Schematic Canvas trong `Phòng TT - MKT`.
- **Cập nhật lần cuối:** Lucy/Antigravity — 2026-10-24 22:32

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
