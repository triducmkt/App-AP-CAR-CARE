# 00-INDEX.md — HQ dự án App AP CAR CARE

## TRẠNG THÁI HIỆN TẠI
- **Trạng thái:** Đã hoàn tất 100% **`TASK-012` — Cập nhật Mục lục Tra cứu Nhanh đầu 5 File Hiến pháp SME OS + Quy trình Vòng lặp Kiểm tra Hiến pháp (Bước 0.A) & Overhaul Toàn diện Giao diện Frontend Ultra-Luxury AP CAR CARE (7 Nút Shortcut Phòng ban giữa Sidebar, Watermark Logo AP chìm mờ, 7 Giao diện con đồng nhất, Cài đặt Admin Toggle On/Off + Dropdown Multiselect Phân quyền Section)**.
- **Vừa xong (`TASK-012`):**
  1. **Cập nhật Mục lục Tra cứu Nhanh (`MỤC LỤC TRA CỨU NHANH HIẾN PHÁP`) & Quy trình Tổng Dự án (`Bước 0.A`):**
     - Bổ sung bảng Mục lục Tra cứu Nhanh kèm số dòng chính xác ở ngay đầu 5 file Hiến pháp: [`01-PRODUCT-PHILOSOPHY.md`](file:///D:/My%20Agents/Projects/App%20AP%20CAR%20CARE/hq/sme-os-core/01-PRODUCT-PHILOSOPHY.md), [`02-BUSINESS-ARCHITECTURE.md`](file:///D:/My%20Agents/Projects/App%20AP%20CAR%20CARE/hq/sme-os-core/02-BUSINESS-ARCHITECTURE.md), [`03-SYSTEM-ARCHITECTURE.md`](file:///D:/My%20Agents/Projects/App%20AP%20CAR%20CARE/hq/sme-os-core/03-SYSTEM-ARCHITECTURE.md), [`04-APPLICATION-ARCHITECTURE.md`](file:///D:/My%20Agents/Projects/App%20AP%20CAR%20CARE/hq/sme-os-core/04-APPLICATION-ARCHITECTURE.md), [`05-TECHNOLOGY-ARCHITECTURE.md`](file:///D:/My%20Agents/Projects/App%20AP%20CAR%20CARE/hq/sme-os-core/05-TECHNOLOGY-ARCHITECTURE.md).
     - Cập nhật [`AGENTS.md`](file:///D:/My%20Agents/Projects/App%20AP%20CAR%20CARE/AGENTS.md), [`00-CONTEXT-MASTER-PROMPT.md`](file:///D:/My%20Agents/Projects/App%20AP%20CAR%20CARE/hq/sme-os-core/00-CONTEXT-MASTER-PROMPT.md) và [`00-DIEU-LUAT-PROMPT-RULE.md`](file:///D:/My%20Agents/Projects/App%20AP%20CAR%20CARE/hq/sme-os-core/00-DIEU-LUAT-PROMPT-RULE.md) với quy trình **Bước 0.A**: Trước mỗi prompt đều quét Mục lục 5 file Hiến pháp và kích hoạt **Vòng lặp Kiểm tra Chi tiết 1 Chương Hiến pháp** khi có nghi vấn/dấu hiệu vi phạm.
  2. **Overhaul Toàn diện Giao diện Frontend (`src/Index.html`) & Backend (`src/Code.gs`) chuẩn Ultra-Luxury AP CAR CARE:**
     - **Watermark Logo AP Chìm Mờ (`#apWorkspaceWatermark`):** Đặt logo tròn AP CAR CARE chìm mờ sang trọng dưới nền toàn bộ các trang làm việc (`opacity: 0.055`, viền halo ánh sáng).
     - **Sidebar Đen Obsidian Gradient (`#apSidebar`) & 7 Nút Shortcut Phòng Ban ở giữa Sidebar (`#sidebarDeptNav`):** Nền đen sâu `linear-gradient(175deg, #03050A 0%, #091122 48%, #04070E 100%)`, các nút phòng ban (`.ap-dept-btn`) có hiệu ứng chuyển động gradient mượt mà + vệt sáng quét qua khi rê chuột (`hover`) và hiệu ứng xung sáng khi click (`active` / `@keyframes apBtnGradientPulse`).
     - **7 Giao diện Con Phòng Ban Đồng Nhất 100% (`#pane_DEPT_CEO`, `#pane_DEPT_MKT`, `#pane_DEPT_SALE`, `#pane_DEPT_TECH`, `#pane_DEPT_INV`, `#pane_DEPT_FIN`, `#pane_DEPT_OPS`):** Lược bỏ toàn bộ chữ giải thích rườm rà, đồng nhất cấu trúc 4 tầng: (1) Thanh Tiêu đề Phòng ban `.ap-dept-hero`, (2) Dải 4 Thẻ KPI `.ap-kpi-grid`, (3) Dải Đề xuất AI `.ap-ai-insight-strip` kèm nút `[✓ DUYỆT THỰC THI]`, (4) Bàn làm việc nghiệp vụ chuyên sâu.
     - **Nút Cài Đặt Admin (`#btnSidebarSettings`) & Quản trị Phân quyền Section (`#pane_SETTINGS`):** Chỉ hiển thị khi Role là `ADMIN_CEO` (tích hợp bộ chuyển đổi **Xem thử quyền (`#selRolePreviewSwitcher`)** trên Topbar để test trực tiếp). Trong Cài đặt có bảng **Bật/Tắt Toggle On/Off từng Section Phòng ban** (tắt là ẩn ngay nút shortcut trên Sidebar) và **Dropdown Multiselect chọn nhiều Role/User** được phép truy cập từng Section, đồng bộ lưu xuống Google Sheet (`Sys_Dept_Access`).
- **Bước tiếp theo:** Anh Đức trải nghiệm giao diện mới trên Live Demo / GAS, thử nghiệm bật/tắt Toggle On/Off phòng ban, Dropdown Multiselect phân quyền và bộ chuyển đổi Xem thử quyền (`#selRolePreviewSwitcher`) trên thanh Topbar.
- **Cập nhật lần cuối:** Lucy/Antigravity — 2026-10-24 19:00

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
