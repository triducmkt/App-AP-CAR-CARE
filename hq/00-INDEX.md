# 00-INDEX.md — HQ dự án App AP CAR CARE

## TRẠNG THÁI HIỆN TẠI
- **Trạng thái:** Đã hoàn tất 100% **`TASK-013` — Nâng cấp Bộ 3 Font Tiếng Việt Automotive Luxury (Phương án A: `Barlow Condensed` + `Be Vietnam Pro` + `JetBrains Mono`), Hệ thống Monochrome SVG Line-Art Icons (`0% Emoji`), Hai Theme Cao Cấp (`Carbon Night` Dark Blue & `Showroom Platinum` White + Sidebar Đen Gradient), Khắc phục Triệt để Giao diện Mobile & Laptop, Cập nhật `hq/lesson.md` & Quy trình Thiết kế Đa Nền Tảng (PC + Mobile)**.
- **Vừa xong (`TASK-013`):**
  1. **Bộ 3 Font Tiếng Việt Automotive Luxury (Phương án A — Chống lỗi dấu Tiếng Việt 100%):**
     - Nạp trực tiếp từ Google Fonts (`subset=vietnamese`) bộ 3 font: **`Barlow Condensed`** (`600`, `700` cho tiêu đề phòng ban lớn & số KPI, đồng điệu với banner Porsche 911 của CEO anh Lộc), **`Be Vietnam Pro`** (`400`, `500`, `600`, `700` cho toàn bộ điều hướng, thẻ, bảng dữ liệu) và **`JetBrains Mono`** (`500`, `600`, `tabular-nums` cho biển số xe, mã `RO`/`SKU` và tiền tệ).
  2. **5 Nguyên tắc Humanizer (Khử cảm giác AI) & Bộ Monochrome SVG Line-Art Icons (`AP_SVG_ICONS`):**
     - Xóa bỏ **100% emoji màu** trong `#viewHome` và `src/Code.gs`, thay thế toàn diện bằng hệ thống **Vector Line-Art Icons nét mảnh `1.65px` (`currentColor`)** lấy cảm hứng từ bộ icon kỹ thuật trên banner của CEO anh Lộc.
     - Áp dụng **Quy tắc 10% Cobalt Accent (`#0066FF` / `#0A6CFF`)**, vát chéo kiến trúc đặc trưng (`.ap-dept-hero::after`), đường kẻ khung Hairline `1px` và chấm tròn trạng thái `6px` tinh tế.
  3. **Hệ thống Dual Flagship Themes (`Carbon Night` Dark Blue & `Showroom Platinum` White + Sidebar Đen Gradient):**
     - **Theme 1 (`data-ap-theme="dark"` / `THEME_AP_SIGNATURE_GLASS`):** *AP Carbon Night & Cobalt Studio (Dark Blue & Piano Black cải tiến)*.
     - **Theme 2 (`data-ap-theme="light"` / `THEME_AP_SHOWROOM_WHITE`):** *AP Showroom Platinum White (Nền sáng `#F4F6F9`, thẻ trắng `#FFFFFF`, chữ `#0A0E17` sắc nét + Sidebar Đen Obsidian Gradient cố định)*.
     - Tích hợp nút chuyển đổi nhanh 1 chạm (`#btnQuickThemeToggle`) ngay trên thanh Topbar đồng bộ tức thì với Tab Cài đặt (`#pane_SETTINGS`).
  4. **Khắc phục Triệt để 100% Lỗi Giao diện Mobile & Laptop (`ERR-009` & `ERR-010`):**
     - Dọn sạch hoàn toàn khối CSS cũ trùng lặp trong `<head>` (`L785–L2333` cũ) từng gây xung đột bố cục.
     - Trên Mobile & Tablet (`<= 1024px`), chuyển `#apSidebar` thành **Off-Canvas Slide-Over Drawer** (`transform: translateX(-105%)` $\rightarrow$ `translateX(0)`) kèm lớp phủ mờ `#apSidebarBackdrop`, nút mở menu `#btnMobileMenuToggle` và nút đóng `#btnCloseMobileSidebar`.
     - Tái cấu trúc `.ap-topbar` trên Mobile thành **2 tầng ngang (2-Tier Layout)** giúp tiêu đề `#topbarActiveTitle` luôn nằm gọn trên **1 dòng ngang duy nhất** (`white-space: nowrap; overflow: hidden; text-overflow: ellipsis`), chấm dứt hoàn toàn lỗi rớt chữ thành 9 dòng dọc.
  5. **Cập nhật Sổ tay Bài học [`hq/lesson.md`](file:///D:/My%20Agents/Projects/App%20AP%20CAR%20CARE/hq/lesson.md) (`ERR-007` → `ERR-010`) & Quy trình Thiết kế Đa Nền Tảng (PC + Mobile):**
     - Ghi nhận đầy đủ 4 bài học mới (`ERR-007`, `ERR-008`, `ERR-009`, `ERR-010`) kèm Bảng Tra Cứu Nhanh ở đầu [`hq/lesson.md`](file:///D:/My%20Agents/Projects/App%20AP%20CAR%20CARE/hq/lesson.md) và cập nhật Quy trình 4 bước Thiết kế & Kiểm thử Song Hành PC + Mobile vào [`hq/design_aesthetic_memo.md`](file:///D:/My%20Agents/Projects/App%20AP%20CAR%20CARE/hq/design_aesthetic_memo.md), [`AGENTS.md`](file:///D:/My%20Agents/Projects/App%20AP%20CAR%20CARE/AGENTS.md) và [`00-DIEU-LUAT-PROMPT-RULE.md`](file:///D:/My%20Agents/Projects/App%20AP%20CAR%20CARE/hq/sme-os-core/00-DIEU-LUAT-PROMPT-RULE.md).
- **Bước tiếp theo:** Anh Đức trải nghiệm cả 2 Theme (*Carbon Night Dark Blue* & *Showroom Platinum White*) bằng nút chuyển nhanh trên Topbar, kiểm tra hiển thị font chữ Tiếng Việt, bộ SVG Line-Art Icons và thao tác ngăn kéo Sidebar trên cả Laptop lẫn Điện thoại.
- **Cập nhật lần cuối:** Lucy/Antigravity — 2026-10-24 20:32

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
