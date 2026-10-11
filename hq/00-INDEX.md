# 00-INDEX.md — HQ dự án App AP CAR CARE

## TRẠNG THÁI HIỆN TẠI
- **Trạng thái:** Đã hoàn tất 100% việc viết chi tiết toàn bộ 6 chương của **File 4 (`hq/sme-os-core/04-APPLICATION-ARCHITECTURE.md`)** và Chương 0 + 6 chương của **File 5 (`hq/sme-os-core/05-TECHNOLOGY-ARCHITECTURE.md`)** theo phương thức 2 (hoàn thiện trọn bộ 1 lần), tuân thủ nghiêm ngặt cấu trúc 7 mục PRD của `00-PROMPT-MASTER-VIET-5-FILE.md` và `00-DIEU-LUAT-PROMPT-RULE.md`. Đồng thời đã quét toàn diện bộ quy trình, rules và kiến trúc kỹ thuật của dự án **Project TDCM Team App** (đặc biệt là kiến trúc Ma trận đa chiều `FIELD_MAP` $1D \rightarrow 2D \rightarrow 3D \rightarrow 4D$ và cơ chế đồng bộ **OptiSync V5**) để trình anh Đức (PO) phê duyệt áp dụng chính thức cho dự án.
- **Vừa xong:**
  1. Hoàn thành bản đặc tả PRD đầy đủ cho `hq/sme-os-core/04-APPLICATION-ARCHITECTURE.md` (6 chương: Mục tiêu & 3-Layer Architecture, 10 Core Object Schemas + 4 System Tables + Ma trận đa chiều `GLOBAL_SCHEMA_MATRIX` $n \times m \times k \times t$, 14 Module Contracts, Website Sensor Architecture, UI Architecture & OptiSync V5, 4 cổng Unified RPC Gateway).
  2. Hoàn thành bản đặc tả PRD đầy đủ cho `hq/sme-os-core/05-TECHNOLOGY-ARCHITECTURE.md` (Giữ nguyên 100% Chương 0 & 10 Điều Hiến pháp SME OS + viết trọn vẹn 6 chương: Mục tiêu hạ tầng Zero-Cost, Lộ trình tiến hóa Phase 1 GAS/Sheets sang Phase 2 Low-cost/Free SME Stack Next.js/Cloudflare Pages/Supabase/Cloudflare R2 kèm 5 chỉ số kích hoạt, Frontend Stack, Backend Stack chống Timeout 6 phút & `LockService`, Database & Storage Stack với `HEADER_ROW=10 / MIN_DATA_ROW=12` & Rolling Audit Log 3.000 dòng, CI/CD & SDLC 6 bước).
  3. Tổng hợp danh mục 6 nhóm Quy trình & Rules tinh hoa từ **TDCM Team App** trình anh Đức duyệt.
- **Bước tiếp theo:** Chờ anh Đức (PO) duyệt danh sách Rules & Kiến trúc Ma trận `FIELD_MAP` đa chiều ($1D \rightarrow 4D$) từ TDCM Team App để chuẩn hóa vào bộ khung vận hành và bắt đầu giai đoạn thiết kế/triển khai các module nghiệp vụ của App AP CAR CARE / SME OS.
- **Cập nhật lần cuối:** Lucy/Antigravity — 2026-10-11 15:32


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
