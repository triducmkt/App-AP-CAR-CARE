# 00-INDEX.md — HQ dự án App AP CAR CARE

## TRẠNG THÁI HIỆN TẠI
- **Trạng thái:** Đã chuẩn hóa toàn diện 100% mã nguồn `src/Code.gs` và `src/Index.html` theo quy hoạch của **5 File Cốt Lõi SME OS (`hq/sme-os-core/01` → `05`)** và tinh hoa kỹ thuật **TDCM Team App**. Toàn bộ hạ tầng cốt lõi đã được quy hoạch và code sẵn ngay từ đầu (Ma trận 4 chiều `GLOBAL_SCHEMA_MATRIX` $1D \rightarrow 2D \rightarrow 3D \rightarrow 4D$, 14 Module Contracts `M01` → `M14`, Event Bus, `OptiSync V5` Central `AppStore` với Chuyến xe tải 8s + Ghost RAM 15s, 4 Cổng RPC hợp nhất, Single-Read Snapshot, Rolling 3,000-Row Audit Log).
- **Vừa xong:**
  1. **Workspace Đa Phòng Ban theo Sơ đồ Tổ chức 6 Tầng AP CAR CARE 2026 (`#viewHome`):** Thiết kế Sidebar Trái hiệu ứng Đen Obsidian Gradient Glassmorphism chứa 6 Tab Phòng Ban (`Ban Giám Đốc & HĐQT`, `Phòng TT - MKT`, `Khối Dịch Vụ & Kỹ Thuật [Tân Phú & Q7]`, `Phòng Nhân Sự [HR]`, `Phòng Đào Tạo [AP Education]`, `Phòng Kế Toán - Hành Chính & KTNB`) và **Tab `⚙️ Cài Đặt Hệ Thống` nằm ở dưới cùng của Sidebar bên trái**.
  2. **Chuyển trang Đăng Bài Đa Kênh vào `Phòng TT - MKT`:** Giữ nguyên toàn bộ tính năng soạn thảo Text Long, hashtag nhanh, kéo thả 1 hoặc nhiều ảnh, chọn kênh YouTube/Facebook/TikTok với huy hiệu trạng thái `v` / `x` và kết nối trực tiếp vào `AppStore.dispatchAction` + `GLOBAL_DB_MAP["MKT_Posts"]`.
  3. **Tích hợp cụm Logo Công ty, Avatar User Đa Năng & Hồ sơ từ TDCM Team App:** Đỉnh Sidebar hiển thị Logo Công ty White-Label; ngay bên dưới là thẻ User với `buildUniversalAvatar` có viền glow theo màu yêu thích, nút `📷` tải ảnh đại diện tự động nén `<canvas>` xuống `< 300KB` (`ERR-003` Guard), thanh thu gọn chọn 9 màu sắc yêu thích và đổi SĐT/Mật khẩu.
  4. **Hệ thống Khoác Áo Theme (On/Off) & Lưu trữ Backend 6 Vị trí Thay Logo White-Label:** Cho phép bật/tắt (On/Off) các bộ Theme giao diện (`AP Signature Obsidian Glass`, `TDCM Enterprise Blue`, `Focal Audio Gold`) như thay một bộ quần áo và chỉnh sửa/tải ảnh trực tiếp cho 6 vị trí Logo/Thương hiệu lưu xuống Sheet `System_Settings` để tái sử dụng cho dự án khác.
  5. **Chuẩn màu sắc & thẩm mỹ AP CAR CARE:** Nền làm việc chính màu **Trắng xám nhạt (`#F2F4F8`)** kết hợp thẻ trắng tinh khiết dễ nhìn; Sidebar và các nút bấm dùng màu **Đen Obsidian Gradient hiệu ứng Glass**; các đường line trang trí màu **Xanh Google Blue có Glow phát sáng** tạo điểm nhấn.
- **Bước tiếp theo:** Chờ anh Đức trải nghiệm thực tế trên bản Live Demo và chỉ đạo mở rộng chi tiết nghiệp vụ cho từng phòng ban tiếp theo.
- **Cập nhật lần cuối:** Lucy/Antigravity — 2026-10-11 20:06



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
