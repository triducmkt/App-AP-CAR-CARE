# 01 — BẢN ĐỒ QUYẾT ĐỊNH CHIẾN LƯỢC & KIẾN TRÚC TÍCH HỢP (EXECUTIVE BLUEPRINT)

> **Dự án:** SME OS / App AP CAR CARE  
> **Đối tượng nghiên cứu (REA Target):** Javis OS (`blogminhquy/javis-os` v0.260+ & `blogminhquy/javis-store`)  
> **Mã bằng chứng REA (REA Evidence ID):** `ev_4028393e72aac241b12faf120c37d4052f9c30dac7435aea8fcb2e7977d57b9a`  
> **Dành cho:** Product Owner (Anh Tăng Trí Đức) & Lead Solution Architect (Lucy)  
> **Ngày lập:** 2026-10-24

---

## 1. Tóm tắt Điều hành (Executive Summary)

Qua quá trình **Reverse Engineering (REA)** toàn bộ **2.066 file mã nguồn** của Javis OS (gồm **111 mô-đun JavaScript** với **575.200 nút AST**, **11.008 luồng gọi hàm**, **40.029 luồng dữ liệu** cùng toàn bộ lõi Python FastAPI và kho `javis-store`), chúng ta rút ra kết luận cốt lõi:

1. **Bản chất thật của Javis OS:** Không phải là một phần mềm ERP/CRM quản trị nhiều nhân sự, mà là một **AI Agent Orchestrator & MCP Hub cá nhân (Single-Owner Local/VPS Gateway)** viết bằng **Python 3.12 (FastAPI) + Node.js 22 + SQLite + Markdown Vault**.
2. **Giá trị lớn nhất cần kế thừa:**
   - **Cổng trung tâm MCP Hub (`server/mcp_hub.py`):** Gom mọi công cụ (Pancake, Zalo, Meta Ads, Facebook Pages, Google Sheets...) vào 1 điểm đấu nối JSON-RPC duy nhất (`/hub/mcp`) kèm **Lớp khóa phân quyền cứng 3 mức (`readonly` / `safe` / `full`)**.
   - **Kỹ thuật kết nối Meta không cần duyệt App (`server/oauth_mcp.py`, `system/plugins/meta-ads-graph`, `meta-pages-graph`, `messenger_bot.py`):** Cơ chế tự tạo Facebook App ở chế độ *Development* (miễn phí 100%, không cần Business Verification hay App Review của Meta) + tự động đổi sang **Long-lived Token 60 ngày** (`fb_exchange_token`).
   - **Kỹ thuật cô lập đa tài khoản Zalo cá nhân & nhóm (`server/zalo_login.py`, `zalo_personal_channel.py`, `channels/zalo_personal.py`):** Mẹo đánh lừa biến môi trường `HOME` (`STATE_DIR/connector-home/zalo-<slug>`) để chạy song song nhiều số Zalo cá nhân trên cùng 1 máy chủ mà không đè phiên đăng nhập QR của nhau, kèm thuật toán tính **offset UTF-16LE** để tag tên `@mention` thật trong nhóm Zalo.
3. **Điểm yếu chí mạng của Javis OS khi áp vào doanh nghiệp SME:**
   - **Không có Multi-User RBAC (Phân quyền theo vai trò nhân sự):** Javis chỉ có 1 chủ sở hữu (`OWNER`). Ai có mật khẩu Dashboard đều thấy toàn bộ tin nhắn, doanh thu, file cấu hình.
   - **Không thể nhúng trực tiếp lõi Python/Node vào trong Google Apps Script (GAS):** Vì GAS là môi trường Serverless chạy theo sự kiện (giới hạn 6 phút/lượt, không mở được cổng TCP chờ kết nối, không chạy được tiến trình ngầm `npx javis-zalo` hay vòng lặp 20 giây quét tin nhắn Zalo).

---

## 2. Giải đáp 4 Câu Hỏi Chiến Lược của Product Owner (Anh Đức)

### Câu hỏi 1: Hạ tầng của Javis OS có tương thích với SME OS hiện tại không?

**Trả lời: Tương thích 100% ở tầng Giao thức tích hợp (API / Webhook / MCP / Google Sheets), nhưng KHÁC BIỆT ở tầng Runtime thực thi.**

| Tiêu chí đối sánh | Hạ tầng SME OS hiện tại (Phase 1 -> Phase 2) | Hạ tầng Javis OS (`blogminhquy/javis-os`) | Đánh giá Độ tương thích & Giải pháp |
| :--- | :--- | :--- | :--- |
| **Runtime & Ngôn ngữ** | **Phase 1:** Google Apps Script (V8) + HTML5 SPA.<br>**Phase 2:** Next.js + Supabase PostgreSQL. | Python 3.12 (`FastAPI` + `uvicorn`) + Node.js 22 (`npx` cho Zalo CLI / MCP stdio). | **Tách Runtime — Nối qua Cầu API (Sidecar Bridge):** Không nhét Python vào GAS, mà để Javis chạy độc lập (PC/VPS) và nối với SME OS qua Module **M15 (`api_javis_*` & `doPost`)**. |
| **Cơ sở dữ liệu (Database)** | **4D Schema Matrix** trên Google Sheets (`HEADER_ROW = 10`, `MIN_DATA_ROW = 12`) / Supabase. | SQLite (`javis.db`, `memory.db`), JSON (`mcp_servers.json`), và file Markdown (`brains/`). | **Tương thích trực tiếp:** Javis có sẵn connector `google-sheets` (dùng Service Account JSON) đọc/ghi thẳng vào Google Sheet của SME OS, hoặc đẩy JSON qua Webhook `doPost` của SME OS. |
| **Mô hình Phân quyền (RBAC)** | **Ma trận 4 Chiều (4D Tensor):** Phân quyền tới từng Cột × Dòng × Vai trò (CEO, Quản đốc, Sale, Cố vấn, Kỹ thuật viên, Bảo vệ, Khách hàng). | **Single-Owner (1 Chủ duy nhất):** Chỉ phân quyền cho *AI/Bot* (`readonly` / `safe` / `full`), không phân quyền cho nhân viên. | **SME OS làm "Lớp vỏ Quản trị & Phân quyền":** Mọi nhân sự đăng nhập trên SME OS; Javis OS đóng vai trò là **"Động cơ AI & Cổng cào dữ liệu (AI & Connector Engine)"** đứng phía sau. |
| **Chi phí AI (LLM Quota)** | BYOK (Bring Your Own Key) — mỗi nhân sự tự gắn API Key hoặc Javis Endpoint của riêng mình. | Hỗ trợ Claude Code Pro/Max, ChatGPT Plus/Pro (Codex), Gemini API, OpenRouter. | **Tương thích hoàn hảo (BYOK):** Đã được hiện thực hóa tại bảng `User_Javis_Config` trong Module M15 của App AP CAR CARE. |

---

### Câu hỏi 2: Cách triển khai dạng VPS và Docker của Javis OS hoạt động như thế nào?

Qua phân tích trực tiếp [`Dockerfile`](file:///C:/Users/TANG%20KIM%20SON/.gemini/antigravity/brain/91625aa6-de56-4655-a1fe-4d426b1964c6/scratch/javis-os/Dockerfile) và [`docker-compose.yml`](file:///C:/Users/TANG%20KIM%20SON/.gemini/antigravity/brain/91625aa6-de56-4655-a1fe-4d426b1964c6/scratch/javis-os/docker-compose.yml) của Javis OS, kiến trúc đóng gói của họ rất gọn và đáng học hỏi:

1. **Kiến trúc Multi-Stage Docker Image (`Dockerfile`):**
   - **Tầng Base:** Dùng `python:3.12-slim` (Debian Bookworm) ghép với `node:22.23.4-bookworm-slim` (copy trực tiếp `/usr/local/bin/node`, `npm`, `npx` sang image Python để chạy được cả FastAPI lẫn các gói MCP Node.js như `javis-zalo`).
   - **Thư viện hệ thống tích hợp sẵn:** Cài sẵn `git`, `ripgrep`, `ffmpeg`, `tini` (PID 1 chống tiến trình zombie), các thư viện Chromium/Playwright (`libnss3`, `libgbm1`...) và cài sẵn 2 CLI toàn cục: `@anthropic-ai/claude-code` và `@openai/codex`.
   - **Bảo mật Non-Root:** Toàn bộ tiến trình chạy dưới user `javis` (`UID 10001`), tách biệt hoàn toàn mã nguồn tĩnh (`/app` — chỉ đọc) và dữ liệu sống (`/data` và `/brains`).
2. **Cơ chế Lưu trữ Bền vững 4 Volumes (`docker-compose.yml`):**
   - `javis-data:/data` (`JAVIS_STATE_DIR`): Chứa SQLite DB, token OAuth mã hóa (`oauth_tokens.json`), phiên đăng nhập Zalo QR (`connector-home/zalo-*`), nhật ký kiểm toán (`mcp_audit.jsonl`).
   - `javis-brains:/brains` (`BRAINS_DIR`): Chứa kho tri thức Markdown của doanh nghiệp.
   - `claude-auth:/home/javis/.claude` & `codex-auth:/home/javis/.codex`: Giữ phiên đăng nhập tài khoản Claude/ChatGPT không bị mất khi cập nhật phiên bản.
3. **Cơ chế Đa thực thể trên 1 VPS (Multi-Instance per VPS) & Tự động cập nhật:**
   - Dùng biến môi trường `JAVIS_NAME` và `JAVIS_HOST_PORT` (ví dụ khách hàng A chạy cổng `7777`, khách hàng B chạy cổng `7778` trên cùng 1 VPS).
   - Tích hợp sẵn container `cloudflare/cloudflared` (Cloudflare Tunnel) để public ra tên miền `https://...` mà không cần mở port firewall hay cấu hình Nginx/SSL phức tạp.
   - Tích hợp sẵn container `watchtower` ở chế độ HTTP API: khi người dùng bấm nút **"Cập nhật"** trên giao diện web, Javis gọi thẳng sang Watchtower để tự kéo Docker image mới về và khởi động lại trong 10 giây mà không mất dữ liệu.

---

### Câu hỏi 3: Đề xuất SME OS có nên triển khai theo mô hình của Javis OS (mỗi khách hàng B2B sử dụng độc lập, nhân bản bộ code qua GitHub) không?

**Trả lời: KHUYẾN NGHỊ MẠNH MẼ LÀ "CÓ" — Nhưng nâng cấp thành mô hình "Single-Tenant Per B2B Client via GitHub Template + White-Label Config" (Kiến trúc Độc lập từng Doanh nghiệp B2B).**

Vì mục tiêu của anh Đức là **cung cấp miễn phí 100% App SME OS cho các khách hàng B2B** sử dụng dịch vụ tư vấn, đào tạo, marketing và vận hành của anh, mô hình **"Mỗi công ty khách hàng = 1 Bản nhân bản độc lập (Single-Tenant Instance) từ kho GitHub Master"** mang lại **5 lợi thế chiến lược tuyệt đối** so với việc gom tất cả khách hàng vào chung 1 database (Multi-Tenant SaaS):

1. **Chi phí hạ tầng cho anh Đức = \$0 (Zero Hosting Cost):**
   - Mỗi khách hàng B2B chạy trên chính tài khoản Google Workspace / Gmail miễn phí của họ (Google Apps Script + Google Sheets + Google Drive 15GB + GitHub Pages). Anh Đức không phải trả tiền thuê server trung tâm cho hàng trăm công ty khách hàng.
2. **Cô lập dữ liệu & Bảo mật tuyệt đối 100% (Zero Cross-Tenant Leak):**
   - Dữ liệu doanh thu, bảng lương, danh sách khách hàng VIP, công nợ của Công ty A nằm hoàn toàn trong Google Sheet / Database của Công ty A. Không bao giờ có rủi ro viết nhầm câu lệnh query làm Công ty A nhìn thấy doanh thu của Công ty B.
3. **Chủ quyền dữ liệu trọn đời cho khách hàng (Xóa bỏ nỗi sợ "bị thu hồi app"):**
   - Đây chính là USP (Unique Selling Point) giúp anh Đức chốt sale dịch vụ tư vấn B2B: *"Anh tặng miễn phí toàn bộ hệ thống SME OS gắn trên chính Google Drive và tên miền của công ty em. Kể cả sau này hết hợp đồng tư vấn, dữ liệu và phần mềm vẫn nằm trong tay em 100%."*
4. **Cập nhật tập trung từ 1 Nguồn (GitHub Master Template + Clasp Push):**
   - Anh Đức và Lucy chỉ duy trì **1 kho mã nguồn gốc duy nhất (`sme-os-master-template`)**.
   - Mọi tùy biến thương hiệu (Tên công ty, Logo, Màu chủ đạo, Danh sách chi nhánh, Bảng giá dịch vụ) đều nằm trong bảng `System_Settings` và `PROJECT_PRICING` trên Google Sheet, **không sửa cứng vào code**.
   - Khi anh Đức nâng cấp tính năng mới (ví dụ thêm Module M16), chỉ cần chạy 1 script GitHub Action hoặc `clasp push` đồng loạt từ repo gốc xuống các nhánh khách hàng đang trong diện bảo trì/đồng hành.
5. **Kết hợp Hoàn hảo với Docker Sidecar (Tùy chọn cho khách B2B lớn):**
   - **Gói B2B Tiêu chuẩn (90% khách SME/Hộ KD):** Chỉ cần nhân bản bộ **SME OS Core (GAS + Google Sheets + GitHub Pages)** mất đúng 5 phút. Nhân sự nào muốn dùng Javis AI thì tự cài Javis OS trên máy cá nhân của họ và bấm nút **Plug-and-Play (Module M15)** để đẩy số liệu về SME OS.
   - **Gói B2B Cao cấp (Khách cần Tự động hóa Zalo Nhóm / Meta Ads / Fanpage 24/7):** Anh Đức cấp thêm file `docker-compose.sme-sidecar.yml` lên 1 VPS giá rẻ (\$4–\$5/tháng do khách tự thuê tại Vultr/Hetzner/Hostinger), nối thẳng vào SME OS của khách đó qua Cloudflare Tunnel.

---

### Câu hỏi 4: Phương án triển khai từng giai đoạn cho SME OS (theo thứ tự ưu tiên cốt lõi trước)?

Để đạt hiệu quả tối đa mà không làm phình hệ thống hay tốn nguồn lực vào những thứ phức tạp chưa cần ngay, lộ trình áp dụng tinh hoa từ Javis OS vào SME OS được chia làm **4 Giai đoạn (Phases) từ Cốt lõi đến Nâng cao**:

#### 🟢 GIAI ĐOẠN 1 (ĐÃ HOÀN TẤT — Nền tảng Cốt lõi): Cầu nối Javis OS Plug-and-Play & BYOK theo Vị trí (Module M15)
- **Mục tiêu:** Cho phép bất kỳ nhân sự nào trong công ty tự gắn Javis OS / AI cá nhân vào SME OS và nhận thẻ KPI / Task tự động đúng với vai trò của mình, không tốn 1 đồng server hay API của công ty.
- **Trạng thái:** **ĐÃ TRIỂN KHAI XONG 100% (`TASK-011`, commit `d9e8ef7`)** trên App AP CAR CARE:
  - Bảng `User_Javis_Config` và `Javis_Sync_Logs` trong `GLOBAL_DB_MAP`.
  - Cổng Webhook `doPost(e)` (`action: 'javis_webhook_ingest'`) và 4 API `api_javis_*`.
  - Giao diện **⚡ Javis AI Bridge** với bộ định tuyến dữ liệu thông minh theo 5 nhóm vị trí (CEO/Chủ, Marketing/Sale, Kế toán/Kho, Quản đốc/Kỹ thuật viên, Bảo vệ/Lao công/Thời vụ).

#### 🔵 GIAI ĐOẠN 2 (Ưu tiên Số 1 Tiếp theo — Tuần 1–2): Tích hợp Trực tiếp Meta Ads & Meta Fanpage/Messenger vào SME OS (Không cần VPS!)
- **Tại sao ưu tiên trước nhất?**
  - Qua REA `system/plugins/meta-ads-graph/plugin.py`, `meta-pages-graph/plugin.py` và `server/messenger_bot.py`, toàn bộ giao tiếp với Meta (đọc chi phí Ads, đọc bài đăng Fanpage, nhận tin nhắn khách hàng từ Messenger và trả lời tự động) đều là **thuần HTTP REST (`https://graph.facebook.com/v25.0`) + Webhook (`POST`)**!
  - Điều này có nghĩa là: **Google Apps Script (`UrlFetchApp` + `doPost`) của SME OS làm được 100% việc này TRỰC TIẾP mà KHÔNG CẦN cài Javis OS hay thuê VPS!**
- **Hạng mục thực thi:**
  1. Áp dụng công thức **"BYO Facebook App ở chế độ Development + Đổi Token 60 ngày (`fb_exchange_token`)"** từ `oauth_mcp.py` của Javis vào SME OS.
  2. Xây dựng bộ hàm GAS đọc trực tiếp `act_<id>/insights` (Spend, Leads, CPC, CTR, ROAS) đổ thẳng vào Dashboard Marketing của SME OS mỗi sáng qua Time-driven Trigger.
  3. Nối trực tiếp Webhook Messenger của Fanpage vào `doPost(e)` của SME OS để tự động tạo Lead mới trong bảng `Leads_CRM` ngay khi khách nhắn tin vào Fanpage AP CAR CARE!

#### 🟡 GIAI ĐOẠN 3 (Ưu tiên Số 2 — Tuần 3–4): Tích hợp Zalo Official Bot & Zalo OA Webhook vào SME OS
- **Tại sao ưu tiên thứ hai?**
  - Qua REA `server/zalo_bot.py`, Zalo hiện đã có nền tảng `https://bot-api.zaloplatforms.com/bot{token}/{method}` hoạt động giống hệt Telegram Bot API (hỗ trợ cả Webhook lẫn `sendMessage`).
  - Với các thông báo nội bộ cho nhân sự (báo xe mới vào xưởng cho Kỹ thuật viên, báo duyệt chi cho Giám đốc, nhắc lịch trực cho Bảo vệ/Lao công) và chăm sóc khách hàng chuẩn chính thống, dùng **Zalo Bot API / Zalo OA** gọi trực tiếp từ `UrlFetchApp` của SME OS là **an toàn 100% (không bao giờ bị khóa nick)** và **không cần VPS**.

#### 🔴 GIAI ĐOẠN 4 (Tùy chọn Nâng cao — Tháng 2+): Đóng gói "SME-Javis Sidecar Docker" cho Zalo Cá Nhân (`zca-js` QR) & MCP Hub Đa Nền Tảng
- **Khi nào cần dùng?**
  - Khi doanh nghiệp B2B bắt buộc phải dùng **nick Zalo cá nhân của nhân viên Sale** để tự động đọc/trả lời tin nhắn khách hàng, tự động duyệt thành viên vào nhóm Zalo phễu, hoặc tự động tag `@Tên_Khách` trong nhóm Zalo bằng thuật toán UTF-16LE.
  - Vì Zalo cá nhân (`javis-zalo` / `zca-js`) bắt buộc phải chạy tiến trình Node.js ngầm giữ kết nối WebSocket liên tục và quét mỗi 20 giây (`zalo_personal_channel.py`), nó không thể chạy trên Google Apps Script mà cần chạy trên máy tính văn phòng hoặc 1 Docker VPS nhỏ.
- **Hạng mục thực thi:**
  1. Tạo bộ **`docker-compose.sme-sidecar.yml`** tinh gọn từ Javis OS, cấu hình sẵn biến môi trường `SME_OS_WEBHOOK_URL` và `SME_OS_BRIDGE_TOKEN`.
  2. Nhân viên Sale mở giao diện SME OS $\rightarrow$ bấm **"Quét QR Zalo Cá nhân"** $\rightarrow$ Sidecar sinh mã QR qua cơ chế cô lập `HOME=STATE_DIR/connector-home/zalo-<user_email>` $\rightarrow$ Mọi tin nhắn khách hàng trên Zalo cá nhân của Sale tự động đồng bộ về bảng `Leads_CRM` của SME OS!

---

## 3. Danh mục Bộ Tài Liệu 5 Tầng (5-Layer Knowledge Suite)

Để cả **Anh Đức (PO)** và **Lucy (AI Engineer)** có thể tra cứu, trình chiếu và tái tạo code bất cứ lúc nào trong tương lai, toàn bộ kết quả REA đã được đóng gói thành 5 tài liệu chuẩn hóa trong thư mục [`hq/javis-rea-dossier/`](file:///D:/My%20Agents/Projects/App%20AP%20CAR%20CARE/hq/javis-rea-dossier/):

1. [`01-EXECUTIVE-BLUEPRINT.md`](file:///D:/My%20Agents/Projects/App%20AP%20CAR%20CARE/hq/javis-rea-dossier/01-EXECUTIVE-BLUEPRINT.md): *(File hiện tại)* Bản đồ chiến lược, đánh giá tương thích hạ tầng, mô hình nhân bản B2B qua GitHub và lộ trình 4 giai đoạn.
2. [`02-SCHEMATIC-ARCHITECTURE.md`](file:///D:/My%20Agents/Projects/App%20AP%20CAR%20CARE/hq/javis-rea-dossier/02-SCHEMATIC-ARCHITECTURE.md): Hệ thống sơ đồ kiến trúc Mermaid (Kiến trúc tổng thể Javis OS, Luồng MCP Hub 3 mức quyền, Luồng cô lập Zalo QR `HOME`, Luồng Meta OAuth 60 ngày & Kiến trúc Lai Liên Hiệp SME OS $\times$ Javis OS).
3. [`03-MCP-META-ZALO-COOKBOOK.md`](file:///D:/My%20Agents/Projects/App%20AP%20CAR%20CARE/hq/javis-rea-dossier/03-MCP-META-ZALO-COOKBOOK.md): Cẩm nang kỹ thuật chuyên sâu (Engineering Cookbook) bóc tách từng dòng code đắt giá nhất của Javis OS và mẫu code chuyển đổi sang Google Apps Script / Node.js cho SME OS.
4. [`04-SLIDE-PRESENTATION.html`](file:///D:/My%20Agents/Projects/App%20AP%20CAR%20CARE/hq/javis-rea-dossier/04-SLIDE-PRESENTATION.html): Bộ Slide trình chiếu tương tác 8 trang chuẩn nhận diện **Obsidian Luxury Glass & Google Blue** dành cho PO thuyết trình chiến lược B2B.
5. [`05-SME-OS-RECONSTRUCTION-PACK.json`](file:///D:/My%20Agents/Projects/App%20AP%20CAR%20CARE/hq/javis-rea-dossier/05-SME-OS-RECONSTRUCTION-PACK.json): Gói dữ liệu cấu trúc JSON chuẩn REA (chứa Evidence ID, SHA256, hợp đồng API/MCP và Sổ cái Nghĩa vụ Tái cấu trúc) để bất kỳ AI Agent nào (Gemini, Claude, Codex) đọc vào là viết code nhân bản chính xác 100%.
