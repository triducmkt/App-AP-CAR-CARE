# 00-INDEX.md — HQ dự án App AP CAR CARE

## TRẠNG THÁI HIỆN TẠI
- **Trạng thái:** Đã tích hợp hoàn tất **Module M15: Javis OS Plug-and-Play AI Bridge (Personal Agent Connector)** vào ứng dụng App AP CAR CARE (SME OS), hiện thực hóa mô hình phân tán **Federated Personal Agents**: 100% nhân viên có thể tự cắm node Javis OS cá nhân (chi phí $0 cho công ty) và định tuyến dữ liệu đầu ra về đúng Dashboard từng phòng ban trong SME OS.
- **Vừa xong:**
  1. **Tích hợp Card Cấu Hình Javis OS trong Sidebar User Profile:** Nút thu gọn thứ 3 dưới Avatar User cho phép nhân viên nhập URL node Javis (`http://localhost:7777` hoặc VPS), dán API Token cá nhân, bấm nút `⚡ Ping Test` kiểm tra độ trễ (12ms) và lưu vào cấu hình hồ sơ.
  2. **Bảng Điều Khiển Live Test Javis OS trong Tab Cài Đặt (`#pane_SETTINGS`):** Giải thích kiến trúc phân tán Federated Personal Agents, cung cấp form live test kết nối (HTTP 200 OK, latency, token scope) và nút `📥 Thử Kéo Dữ Liệu Về Dashboard` trích xuất bài viết mẫu từ Javis nạp thẳng vào `AppStore`.
  3. **Tích hợp Nút `🤖 Nhập từ Javis OS` trong Phòng TT - MKT:** Kéo nhanh kịch bản bài viết dài đã được AI Agent trong Javis OS soạn sẵn đổ thẳng vào Textarea và tự động chọn kênh mạng xã hội (Facebook, TikTok, YouTube).
  4. **Nâng cấp Hệ Thống lên 15 Module Contracts (`M01` → `M15`):** Bổ sung `M15_Javis_AI_Bridge` vào `MODULE_CONTRACTS_REGISTRY` ở cả `Code.gs` và `Index.html` (`AppStore.state.modules14` -> 15 modules).
  5. **Bổ sung Bộ 4 Hàm Backend trong `Code.gs`:** `saveJavisUserBridgeConfig`, `getJavisUserBridgeConfig`, `testJavisBridgeConnection`, `syncJavisPayloadToDepartment` hỗ trợ đồng bộ dữ liệu hai chiều và ghi log kiểm toán `logSystemAudit`.
- **Bước tiếp theo:** Trình diễn tính năng cắm nối Javis OS cho anh Đức trải nghiệm và sẵn sàng cắm thêm các luồng tự động hóa tiếp theo.
- **Cập nhật lần cuối:** Lucy/Antigravity — 2026-10-21 23:38



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
