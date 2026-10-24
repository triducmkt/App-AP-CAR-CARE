# 00-INDEX.md — HQ dự án App AP CAR CARE

## TRẠNG THÁI HIỆN TẠI
- **Trạng thái:** Đã hoàn tất 100% **Kế hoạch 3 Bước Giải Phẫu Ngược (Reverse-Engineer-Anything — REA) Toàn Bộ Hệ Sinh Thái Javis OS (`blogminhquy/javis-os` & `javis-store`)** bằng **Gemini 4 Argon (High)** và xuất bản trọn bộ **Hồ Sơ Tri Thức 5 Tầng (`hq/javis-rea-dossier/01..05`)** phục vụ tích hợp vào **SME OS / App AP CAR CARE** và nhân bản cho khách hàng B2B.
- **Vừa xong:**
  1. **Bước 1 (Clone & Kiểm toán Kho nguồn):** Clone toàn bộ 2.066 file của `javis-os` và quét danh mục `javis-store`.
  2. **Bước 2 (Thực thi Công cụ REA & Giải phẫu Lõi):** Chạy `rea:analyze_javascript_application` (Evidence ID: `ev_4028393e72aac241b12faf120c37d4052f9c30dac7435aea8fcb2e7977d57b9a` — 111 JS files, 575.200 AST nodes, 11.008 call-flow, 40.029 data-flow relations) kết hợp giải phẫu sâu `mcp_hub.py`, `oauth_mcp.py`, `meta-ads-graph/plugin.py`, `meta-pages-graph/plugin.py`, `messenger_bot.py`, `zalo_login.py`, `zalo_personal_channel.py`, `channels/zalo_personal.py`, `zalo_bot.py`, `Dockerfile`, và `docker-compose.yml`.
  3. **Bước 3 (Xuất bản Bộ Hồ Sơ 5 Tầng tại `hq/javis-rea-dossier/`):**
     - `01-EXECUTIVE-BLUEPRINT.md`: Đánh giá tương thích hạ tầng, giải phẫu Docker/VPS, chiến lược nhân bản Single-Tenant B2B qua GitHub Master Template và lộ trình 4 giai đoạn.
     - `02-SCHEMATIC-ARCHITECTURE.md`: 5 sơ đồ Mermaid kiến trúc & luồng dữ liệu.
     - `03-MCP-META-ZALO-COOKBOOK.md`: Cẩm nang kỹ thuật chuyên sâu kèm mẫu code Google Apps Script (`Code.gs`) kết nối trực tiếp Meta Ads (Token 60 ngày) và Zalo Official Bot không cần VPS.
     - `04-SLIDE-PRESENTATION.html`: Slide thuyết trình tương tác 8 trang chuẩn Obsidian Luxury Glass & Google Blue.
     - `05-SME-OS-RECONSTRUCTION-PACK.json`: Gói đặc tả JSON kèm Sổ cái Nghĩa vụ Tái cấu trúc (Obligation Ledger) cho AI Models.
- **Bước tiếp theo:** Sẵn sàng triển khai **Giai đoạn 2 (Tích hợp trực tiếp Meta Ads Graph API Token 60 ngày & Messenger Lead Webhook vào `src/Code.gs`)** và **Giai đoạn 3 (Zalo Official Bot)** ngay khi anh Đức phê duyệt.
- **Cập nhật lần cuối:** Lucy/Antigravity — 2026-10-24 17:30



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
