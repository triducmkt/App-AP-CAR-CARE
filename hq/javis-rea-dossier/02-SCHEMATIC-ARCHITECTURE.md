# 02 — BẢN ĐỒ KIẾN TRÚC & LUỒNG DỮ LIỆU (SCHEMATIC ARCHITECTURE)

> **Dự án:** SME OS / App AP CAR CARE  
> **Mã bằng chứng REA:** `ev_4028393e72aac241b12faf120c37d4052f9c30dac7435aea8fcb2e7977d57b9a`  
> **Thống kê AST REA (`dashboard/`):** 111 JS Files | 575.200 AST Nodes | 11.008 Call-Flow Relations | 40.029 Data-Flow Relations  
> **Mục đích:** Trực quan hóa toàn bộ cấu trúc nội tại của Javis OS và kiến trúc liên hợp với SME OS bằng hệ thống sơ đồ Mermaid chuẩn hóa.

---

## 1. Kiến trúc 4 Tầng Nội Tại của Javis OS (Internal 4-Layer Topology)

Sơ đồ dưới đây thể hiện chính xác cách Javis OS vận hành bên trong 1 container Docker hoặc máy chủ Local (cổng mặc định `7777`):

```mermaid
flowchart TB
    subgraph L1["TẦNG 1: GIAO DIỆN & KÊNH GIAO TIẾP (UI & CHANNELS)"]
        UI["Dashboard SPA (111 JS Modules)\napp.js + store.js + ws_hub.js"]
        TG["Telegram Bot\n(telegram_bot.py)"]
        MSG["Facebook Messenger Bot\n(messenger_bot.py - Graph v23.0)"]
        ZB["Zalo Official Bot\n(zalo_bot.py - bot-api.zaloplatforms.com)"]
        ZP["Zalo Cá Nhân & Nhóm\n(zalo_personal_channel.py - Chu kỳ 20s/2s)"]
    end

    subgraph L2["TẦNG 2: ĐIỀU PHỐI LÕI & ĐỘNG CƠ AI (FASTAPI & AI ENGINES)"]
        MAIN["FastAPI Server (main.py :7777)\nREST API + WebSocket /ws + OAuth Callback"]
        ENG_CLAUDE["Claude Code CLI / SDK\n(@anthropic-ai/claude-code)"]
        ENG_CODEX["ChatGPT Codex CLI\n(@openai/codex)"]
        ENG_API["API Engines In-Process\n(Gemini / OpenAI / OpenRouter)"]
    end

    subgraph L3["TẦNG 3: CỔNG ĐẤU NỐI TRUNG TÂM — JAVIS MCP HUB (mcp_hub.py)"]
        HUB["POST /hub/mcp (JSON-RPC 2.0)\nBearer .hub_token + X-Javis-Mode + X-Javis-Vault"]
        GUARD["Lớp Khóa Phân Quyền Cứng (_guard)\n3 Mức: readonly | safe | full + Rate Limit"]
        LAZY["Cơ chế Lazy Tool Search\n(javis_search_tools & javis_run_tool)"]
        PLUG["Plugins Host (plugins_host.py)\nmeta-ads-graph | meta-pages-graph | javis-schedule"]
        POOL["MCP Client Pool (mcp_client.py)\nQuản lý tiến trình con stdio & HTTP/SSE"]
    end

    subgraph L4["TẦNG 4: LƯU TRỮ BỀN VỮNG & CONNECTORS NGOÀI (STATE & EXTERNAL)"]
        DATA["Volume /data (JAVIS_STATE_DIR)\njavis.db | mcp_servers.json | oauth_tokens.json"]
        ZHOME["Cô lập Đa tài khoản Zalo\n/data/connector-home/zalo-<slug>-<sid>/"]
        BRAIN["Volume /brains (BRAINS_DIR)\nKho tri thức Markdown + 05 - Data Cache"]
        EXT["Dịch vụ Ngoài\nMeta Graph API | Zalo Web/Bot | Pancake POS | Google Sheets"]
    end

    UI <-->|"HTTP / WebSocket"| MAIN
    TG <--> MAIN
    MSG <-->|"POST /messenger/webhook"| MAIN
    ZB <-->|"Long-Polling getUpdates"| MAIN
    ZP <-->|"Poll 20s qua MCP Pool"| POOL

    MAIN --> ENG_CLAUDE
    MAIN --> ENG_CODEX
    MAIN --> ENG_API

    ENG_CLAUDE -->|"HTTP POST /hub/mcp"| HUB
    ENG_CODEX -->|"HTTP POST /hub/mcp"| HUB
    ENG_API -->|"In-Process discover_all()"| HUB

    HUB --> GUARD
    GUARD --> LAZY
    LAZY --> PLUG
    LAZY --> POOL

    PLUG -->|"httpx Async"| EXT
    POOL -->|"npx javis-zalo (env HOME riêng)"| ZHOME
    ZHOME --> EXT
    MAIN --> DATA
    MAIN --> BRAIN
```

---

## 2. Luồng Thực Thi MCP Hub & Khóa Phân Quyền Cứng 3 Mức (`mcp_hub.py`)

Điểm sáng giá nhất của `server/mcp_hub.py` là **mọi Engine AI (Claude, Codex, Gemini) chỉ nhìn thấy đúng 1 MCP Server duy nhất tên là `javis`**. Khi có hơn 30 công cụ, Hub tự động bật chế độ **Lazy Loading** (chỉ nạp 2 meta-tools `javis_search_tools` và `javis_run_tool` để tiết kiệm 85% token ngữ cảnh):

```mermaid
sequenceDiagram
    autonumber
    participant AI as Engine AI (Claude / Codex / Gemini)
    participant Hub as Javis MCP Hub (/hub/mcp)
    participant Cat as MCP Catalog & Guard (mcp_catalog.py)
    participant Pool as MCP Client Pool / Plugin Host
    participant Audit as Nhật ký Kiểm toán (mcp_audit.jsonl)

    AI->>Hub: POST /hub/mcp {"method": "tools/list"}<br/>Headers: Authorization: Bearer <token>, X-Javis-Mode: safe
    Hub->>Cat: Kiểm tra tổng số tools & lọc theo effective_perm(conn_perm, mode)
    Note over Hub,Cat: Ẩn toàn bộ tools 'danger' nếu đang ở mức 'safe' hoặc 'readonly'<br/>Ẩn OWNER_ONLY_TOOLS nếu X-Javis-Bot = 1
    Hub-->>AI: Trả danh sách Core Tools + 2 Meta-Tools (javis_search_tools, javis_run_tool)

    AI->>Hub: tools/call: javis_search_tools(query="chi phí quảng cáo meta tuần này")
    Hub-->>AI: Trả top-K schema đầy đủ: meta_ads_accounts, meta_ads_insights

    AI->>Hub: tools/call: javis_run_tool(name="meta_ads_insights", args={"date_preset": "last_7d"})
    Hub->>Cat: _guard(): Kiểm tra classify() + allowed() + _rate_ok(calls_per_min)
    alt Bị chặn bởi Quyền hoặc Vượt Rate Limit (vd Zalo > 20 lệnh/phút)
        Cat-->>Audit: Ghi dòng log {"allowed": false, "reason": "..."}
        Cat-->>AI: Trả lỗi tiếng Việt: "ERROR: Đang ở mức quyền Chỉ đọc / Vượt giới hạn tần suất"
    else Hợp lệ (Allowed = True)
        Cat->>Pool: Thực thi plugin meta-ads-graph hoặc MCP stdio/HTTP
        Pool-->>Hub: Kết quả JSON từ Meta Graph API v25.0
        Hub->>Audit: Ghi dòng log {"allowed": true, "conn_id": "...", "tool": "meta_ads_insights"}
        Hub-->>AI: Trả JSON kết quả + Chú thích Brain đang mở
    end
```

---

## 3. Cơ Chế Cô Lập Đa Tài Khoản Zalo Cá Nhân & Tag `@Mention` Nhóm (`zalo_login.py` & `zalo_personal_channel.py`)

Công cụ gốc `zalo-agent-cli` (dựa trên thư viện `zca-js`) vốn chỉ lưu 1 phiên đăng nhập duy nhất tại `~/.zalo-agent-cli`, dẫn đến việc đăng nhập số Zalo thứ 2 sẽ ghi đè số thứ nhất. Javis OS đã giải quyết triệt để bài toán này bằng **Mẹo đánh lừa biến môi trường `HOME`** kết hợp **Bộ đếm vị trí UTF-16LE cho lệnh `@mention` trong nhóm**:

```mermaid
sequenceDiagram
    autonumber
    participant User as Nhân sự (Trình duyệt + App Zalo ĐT)
    participant Fast as Javis Server (zalo_login.py)
    participant CLI as Tiến trình npx javis-zalo
    participant FS as Thư mục Cô lập (STATE_DIR/connector-home/)
    participant Loop as Vòng lặp Quét ngầm (zalo_personal_channel.py)

    User->>Fast: Bấm "Kết nối Zalo QR" (POST /connect/zalo/start)
    Fast->>FS: Tạo thư mục riêng: /data/connector-home/zalo-<slug>-<sid>/
    Fast->>CLI: Spawn: npx javis-zalo login --json<br/>Ghi đè env: HOME = USERPROFILE = /data/connector-home/zalo-<slug>-<sid>
    CLI-->>Fast: Stdout JSON: {"event": "qr", "dataUrl": "data:image/png;base64,..."}
    Fast-->>User: Hiển thị ảnh mã QR trên Modal (Timeout 180s)
    User->>CLI: Mở Zalo trên điện thoại -> Quét mã QR & Bấm Xác nhận
    CLI->>FS: Lưu cookie & secret key zca-js vào $HOME/.zalo-agent-cli
    CLI-->>Fast: Stdout JSON: {"event": "login_success", "displayName": "Sale Minh", "ownId": "849..."}
    Fast->>Fast: Lưu cấu hình vào mcp_servers.json (HOME cố định theo tài khoản)

    loop Mỗi 20 giây (hoặc 2 giây khi có khách đang chat riêng trong 60s gần nhất)
        Loop->>CLI: Gọi trực tiếp qua mcp_client.pool: zalo_get_messages(limit=20)
        CLI-->>Loop: Danh sách tin nhắn mới (isGroup, threadId, senderName, content, mentions)
        alt Tin nhắn trong Nhóm (isGroup = true)
            Loop->>Loop: Kiểm tra: Có tag @Bot? Có reply Bot? Hoặc có thành viên mới vào nhóm?
            Loop->>Loop: Tính vị trí UTF-16 code units: len(prefix.encode("utf-16-le")) // 2
            Loop->>CLI: Gọi zalo-agent-cli msg send <threadId> -t group --mention "<offset>:<len>:<uid>"
        else Tin nhắn Riêng (isGroup = false)
            Loop->>CLI: Gọi zalo_send_message(thread_id, message)
        end
    end
```

---

## 4. Luồng Kết Nối Meta Ads & Fanpage Không Cần Duyệt App (`oauth_mcp.py` & `meta-ads-graph`)

```mermaid
sequenceDiagram
    autonumber
    participant Admin as Chủ tài khoản Ads / Fanpage
    participant App as Hệ thống (Javis OS / SME OS)
    participant FB_Dialog as Facebook OAuth Dialog (v25.0)
    participant FB_Graph as Meta Graph API (graph.facebook.com/v25.0)

    Note over Admin,FB_Dialog: Bước chuẩn bị 1 lần: Tạo App loại Business trên developers.facebook.com<br/>Giữ ở chế độ "In Development" (Tự cấp quyền ads_read, pages_manage_posts mà KHÔNG cần App Review)
    Admin->>App: Nhập App ID (client_id) + App Secret (client_secret)
    App->>FB_Dialog: Redirect tới /v25.0/dialog/oauth?scope=ads_read,business_management,pages_show_list...
    Admin->>FB_Dialog: Bấm Đồng ý & Tick chọn các Trang Fanpage / Tài khoản Ads
    FB_Dialog-->>App: Callback GET /connect/oauth/callback?code=<auth_code>

    App->>FB_Graph: 1. Đổi code lấy Short-lived Token (1-2 giờ)<br/>GET /v25.0/oauth/access_token?client_id=...&client_secret=...&code=...
    FB_Graph-->>App: Trả short_lived_access_token

    App->>FB_Graph: 2. Đổi ngay sang Long-lived Token (60 ngày) (_meta_longlive)<br/>GET /v25.0/oauth/access_token?grant_type=fb_exchange_token&fb_exchange_token=<short_token>
    FB_Graph-->>App: Trả access_token sống 60 ngày (expires_in ~ 5.184.000s)

    alt Gọi Công cụ Đọc Meta Ads (meta-ads-graph)
        App->>FB_Graph: GET /v25.0/act_<id>/insights?fields=spend,impressions,clicks,ctr,cpc,actions
        FB_Graph-->>App: Số liệu chi phí & chuyển đổi realtime
    else Gọi Công cụ Quản lý Fanpage (meta-pages-graph)
        App->>FB_Graph: GET /v25.0/me/accounts?fields=id,name,access_token (Lấy Page Token riêng)
        App->>FB_Graph: POST /v25.0/<page_id>/feed (Đăng bài bằng Page Token)
    end
```

---

## 5. Kiến Trúc Lai Liên Hiệp SME OS $\times$ Javis OS & Nhân Bản B2B Qua GitHub (Target Architecture)

Sơ đồ tổng thể mô hình triển khai cho hệ sinh thái B2B của anh Đức:

```mermaid
flowchart LR
    subgraph MASTER["KHO MÃ NGUỒN GỐC CỦA ANH ĐỨC (GITHUB MASTER)"]
        REPO["GitHub Template Repository\n(sme-os-master-template)\nCode.gs + Index.html + Sidecar Docker"]
    end

    subgraph CLIENT_A["KHÁCH HÀNG B2B #1 (VD: AP CAR CARE — GÓI FULL SIDECAR)"]
        direction TB
        GAS_A["SME OS Core (Google Apps Script)\n4D Schema Matrix + OptiSync V5\nPhân quyền toàn bộ nhân sự (CEO -> Bảo vệ)"]
        SHEET_A[("Google Sheets DB Riêng\n(12 Bảng + User_Javis_Config)")]
        VPS_A["Javis Sidecar Docker (VPS \$5/tháng)\nQuét Zalo Cá Nhân/Nhóm 24/7 + MCP Hub"]
        BYOK_A["Máy tính Nhân viên MKT/Sale\n(Tự chạy Javis Local + Claude/ChatGPT riêng)"]

        GAS_A <--> SHEET_A
        VPS_A -->|"POST Webhook doPost(e)\n(javis_webhook_ingest)"| GAS_A
        BYOK_A -->|"Đẩy KPI cá nhân qua M15 Bridge"| GAS_A
        GAS_A -->|"UrlFetchApp trực tiếp\n(Không cần VPS)"| META_A["Meta Graph API v25.0\n& Zalo Official Bot API"]
    end

    subgraph CLIENT_B["KHÁCH HÀNG B2B #2 (VD: HỘ KINH DOANH / SME NHỎ — GÓI \$0 SERVER)"]
        direction TB
        GAS_B["SME OS Core (Google Apps Script)\nWhite-Label Logo & Màu sắc riêng"]
        SHEET_B[("Google Sheets DB Riêng\n(Cô lập 100% với Công ty #1)")]
        BYOK_B["Nhân sự tự bấm nút Plug-and-Play\n(Module M15 Javis Bridge)"]

        GAS_B <--> SHEET_B
        BYOK_B -->|"Sync KPI theo vị trí"| GAS_B
        GAS_B -->|"UrlFetchApp trực tiếp"| META_B["Meta Ads / Fanpage\n& Zalo Official Bot"]
    end

    REPO ==>|"1-Click Fork / Clasp Push\n(Chỉ đổi System_Settings)"| CLIENT_A
    REPO ==>|"1-Click Fork / Clasp Push\n(Chi phí hạ tầng = \$0)"| CLIENT_B
```
