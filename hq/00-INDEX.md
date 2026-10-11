# 00-INDEX.md — HQ dự án App AP CAR CARE

## TRẠNG THÁI HIỆN TẠI
- **Trạng thái:** Đã hoàn tất 100% trọn bộ **5 File Kiến trúc Cốt lõi SME OS (`01` → `05`)** tại `hq/sme-os-core/` (trong đó File 4 `04-APPLICATION-ARCHITECTURE.md` dài 388 dòng / 50.371 bytes và File 5 `05-TECHNOLOGY-ARCHITECTURE.md` dài 466 dòng / 30.892 bytes đã được viết đầy đủ tất cả các chương theo chuẩn 7 mục PRD). Đồng thời, theo phê duyệt của anh Đức (PO), đã chính thức ban hành và tích hợp toàn bộ **6 Nhóm Quy Chuẩn Kỹ Thuật từ TDCM Team App** (Ma trận đa chiều `FIELD_MAP` $1D \rightarrow 2D \rightarrow 3D \rightarrow 4D$, cơ chế đồng bộ 5 trụ cột **OptiSync V5**, chuẩn dòng `HEADER_ROW=10 / MIN_DATA_ROW=12`, Single-Read Snapshot và Rolling 3.000-Row Audit Log) vào `AGENTS.md` và `hq/schematic_map.md`.
- **Vừa xong:**
  1. Hoàn thiện 100% nội dung chi tiết 6 chương của `hq/sme-os-core/04-APPLICATION-ARCHITECTURE.md` và Chương 0 + 6 chương của `hq/sme-os-core/05-TECHNOLOGY-ARCHITECTURE.md`.
  2. Cập nhật chính thức bộ quy tắc Ma trận `GLOBAL_SCHEMA_MATRIX` ($1D \rightarrow 4D$), `OptiSync V5` và chuẩn hạ tầng Google Sheets/GAS từ TDCM Team App vào `AGENTS.md` và `hq/schematic_map.md`.
- **Bước tiếp theo:** Sẵn sàng bước vào giai đoạn khởi tạo cấu trúc bảng dữ liệu thực tế (Master Database Sheets) và code các phân hệ nghiệp vụ V1 của **App AP CAR CARE / SME OS** theo chỉ đạo tiếp theo của anh Đức.
- **Cập nhật lần cuối:** Lucy/Antigravity — 2026-10-11 16:35


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
