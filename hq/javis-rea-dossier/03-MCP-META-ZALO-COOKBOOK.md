# 03 — CẨM NANG KỸ THUẬT CHUYÊN SÂU: MCP HUB, META ADS/CHAT & ZALO USER/GROUP (ENGINEERING COOKBOOK)

> **Dự án:** SME OS / App AP CAR CARE  
> **Mã bằng chứng REA:** `ev_4028393e72aac241b12faf120c37d4052f9c30dac7435aea8fcb2e7977d57b9a`  
> **Dành cho:** AI Lead Engineer (Lucy) & Product Owner (Anh Tăng Trí Đức)  
> **Mục đích:** Bóc tách chi tiết từng dòng code "bí mật nghề nghiệp" bên trong Javis OS về **MCP Hub**, **Meta Ads/Chat**, **Zalo Cá Nhân/Nhóm**, **Zalo Official Bot** và cung cấp sẵn mẫu code chuyển đổi (Porting Recipes) sang **SME OS (`Code.gs` / Sidecar)**.

---

## PHẦN 1: GIẢI PHẪU CỔNG ĐẤU NỐI TRUNG TÂM `MCP HUB` (`server/mcp_hub.py`)

### 1.1. Kiến trúc "1 Điểm Đấu Duy Nhất" (Single-Entry JSON-RPC Hub)
Thay vì bắt các mô hình AI (Claude, ChatGPT Codex, Gemini) phải cấu hình hàng chục MCP Server rời rạc, [`server/mcp_hub.py`](file:///C:/Users/TANG%20KIM%20SON/.gemini/antigravity/brain/91625aa6-de56-4655-a1fe-4d426b1964c6/scratch/javis-os/server/mcp_hub.py#L1747-L1830) gom toàn bộ kết nối về một cổng HTTP JSON-RPC 2.0 duy nhất:
- **Endpoint:** `POST http://127.0.0.1:7777/hub/mcp`
- **Xác thực hằng thời gian (Constant-time Auth):** Dùng `_secrets.compare_digest(auth, f"Bearer {hub_token()}")` với token lưu tại `/data/.hub_token` (quyền `0o600`).
- **Bộ 4 Header Điều khiển Ngữ cảnh:**
  1. `Authorization: Bearer <hub_token>` — Chìa khóa bảo mật bắt buộc.
  2. `X-Javis-Mode: readonly | safe | full | gated` — Ép mức quyền cứng cho từng lượt gọi.
  3. `X-Javis-Vault: <đường_dẫn_brain>` — Chỉ định kho tri thức đang mở (mã hóa URL-percent bằng `ma_hoa_vault()` nếu tên thư mục có dấu tiếng Việt để không bị thư viện Rust `rmcp-client` của Codex từ chối).
  4. `X-Javis-Bot: 1` — Khi khách lạ chat qua Bot, header này lập tức ẩn toàn bộ `OWNER_ONLY_TOOLS` (`javis_reply_policy`, `javis_team`, `javis_memory`, `javis_watch`, `javis_login`, `javis_web_search`, `javis_web_fetch`) trước cả tầng Lazy Search.

### 1.2. Cơ chế Khóa Phân Quyền Cứng 3 Mức & Multiplexed Tool (`_guard` & `mcp_catalog.py`)
Trong [`server/mcp_hub.py`](file:///C:/Users/TANG%20KIM%20SON/.gemini/antigravity/brain/91625aa6-de56-4655-a1fe-4d426b1964c6/scratch/javis-os/server/mcp_hub.py#L222-L260) và [`system/mcp-catalog.json`](file:///C:/Users/TANG%20KIM%20SON/.gemini/antigravity/brain/91625aa6-de56-4655-a1fe-4d426b1964c6/scratch/javis-os/system/mcp-catalog.json), Javis phân loại mọi công cụ thành 3 nhóm tác động (`read`, `write`, `danger`) và kiểm soát qua hàm `_guard(ent, fn, mode)`:
- **3 Mức quyền của Kết nối:**
  - `readonly` (Chỉ đọc): Chỉ cho phép gọi các tool `read`.
  - `safe` (Ghi nháp): Cho phép `read` + `write` (tạo nháp, thêm ghi chú), chặn cứng `danger` (xóa dữ liệu, lên đơn thật, gửi tin nhắn ra ngoài, tiêu tiền).
  - `full` (Toàn quyền): Cho phép cả `read`, `write`, `danger`.
- **Xử lý Tool "2 trong 1" (`multiplexed` / `arg_rules`):** Ví dụ Pancake POS dùng chung 1 tool `pancake_orders` cho cả xem đơn (`action="list"`) lẫn tạo đơn (`action="create"`). Lúc liệt kê (`tools/list`), Hub tạm coi là `read` để AI nhìn thấy tool; nhưng lúc gọi thật (`tools/call`), `_guard` soi trực tiếp tham số `args["action"]` — nếu là `"create"` mà tài khoản đang ở `readonly` thì chặn đứng ngay tại chỗ!
- **Chống khóa tài khoản bằng Bộ đếm Tần suất (`_rate_ok`):** Dùng hàng đợi trượt `deque` 60 giây theo từng `conn_id`. Ví dụ connector `zalo-personal` bị khóa cứng ở mức `calls_per_min: 20` để chống Zalo quét spam khóa nick.

### 1.3. Cơ chế "Lazy Tool Search" Tiết kiệm 85% Token (`_lazy_tools_and_route`)
Khi doanh nghiệp bật nhiều kết nối (tổng số tool vượt ngưỡng 30), việc nhét toàn bộ schema của 100+ tools vào mỗi câu chat sẽ làm tràn context và tốn tiền API. Javis giải quyết tại [`server/mcp_hub.py`](file:///C:/Users/TANG%20KIM%20SON/.gemini/antigravity/brain/91625aa6-de56-4655-a1fe-4d426b1964c6/scratch/javis-os/server/mcp_hub.py#L1221-L1325):
- Giấu toàn bộ tool MCP vào một `pool` trong RAM, chỉ trả ra cho AI đúng **2 meta-tools**:
  1. `javis_search_tools(query)`: Tìm kiếm và xếp hạng top-K tools khớp với nhu cầu (trả mô tả đầy đủ 4.000 ký tự cho 3 kết quả đầu và 400 ký tự cho các kết quả sau).
  2. `javis_run_tool(name, args)`: Thực thi tool đã tìm được qua `mcp_client.call_route(full_route, name, args)` — vẫn đi qua đầy đủ lớp kiểm quyền `_guard` và ghi nhật ký `mcp_audit.jsonl`.

### 1.4. Mẫu Code Gọi Trực Tiếp MCP Hub của Javis từ SME OS (`Code.gs`)
```javascript
/**
 * Gọi bất kỳ công cụ MCP nào trong Javis OS từ Google Apps Script (SME OS)
 * @param {string} javisBaseUrl - URL Javis của user/công ty (vd: https://javis.apcarcare.vn)
 * @param {string} hubToken - Nội dung file /data/.hub_token
 * @param {string} toolName - Tên tool (vd: "meta_ads_insights", "zalo_send_message")
 * @param {Object} toolArgs - Tham số truyền vào tool
 * @param {string} mode - Mức quyền ép cứng: "readonly" | "safe" | "full"
 */
function callJavisMcpHubTool(javisBaseUrl, hubToken, toolName, toolArgs, mode) {
  var endpoint = javisBaseUrl.replace(/\/+$/, '') + '/hub/mcp';
  var payload = {
    jsonrpc: '2.0',
    id: Utilities.getUuid(),
    method: 'tools/call',
    params: {
      name: toolName,
      arguments: toolArgs || {}
    }
  };
  var options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Authorization': 'Bearer ' + hubToken,
      'X-Javis-Mode': mode || 'readonly'
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  var res = UrlFetchApp.fetch(endpoint, options);
  return JSON.parse(res.getContentText());
}
```

---

## PHẦN 2: GIẢI PHẪU KẾT NỐI META ADS, FACEBOOK PAGES & MESSENGER (`oauth_mcp.py`, `meta-ads-graph`, `meta-pages-graph`, `messenger_bot.py`)

### 2.1. Tại sao Javis kết nối được Meta Ads & Fanpage miễn phí mà không cần App Review hay Xác minh Doanh nghiệp?
Qua phân tích [`system/plugins/meta-ads-graph/plugin.py`](file:///C:/Users/TANG%20KIM%20SON/.gemini/antigravity/brain/91625aa6-de56-4655-a1fe-4d426b1964c6/scratch/javis-os/system/plugins/meta-ads-graph/plugin.py) và [`docs/09-mcp-va-so-lieu.md`](file:///C:/Users/TANG%20KIM%20SON/.gemini/antigravity/brain/91625aa6-de56-4655-a1fe-4d426b1964c6/scratch/javis-os/docs/09-mcp-va-so-lieu.md#L130-L167), Javis phát hiện ra rằng:
- Cổng MCP chính chủ của Meta (`https://mcp.facebook.com/ads`) đang khóa **Closed Beta** (chỉ mở cho vài đối tác lớn đã whitelist, chặn Dynamic Client Registration).
- **Lối đi thông minh của Javis (BYO Development App):** Hướng dẫn người dùng tự vào `developers.facebook.com/apps` tạo 1 App loại **Business**, giữ nguyên công tắc ở chế độ **"In Development" (Chế độ phát triển)**.
- **Bí quyết sống còn:** Khi App ở chế độ *In Development* và người đăng nhập chính là **Admin của App kiêm Admin của Tài khoản Quảng cáo / Fanpage**, Facebook **tự động cấp mọi quyền (`ads_read`, `business_management`, `pages_show_list`, `pages_read_engagement`, `pages_manage_posts`, `pages_manage_engagement`) ngay lập tức mà KHÔNG CẦN Xét duyệt ứng dụng (App Review) và KHÔNG CẦN Xác minh doanh nghiệp (Business Verification)!** Ngay cả khi màn hình đăng nhập hiện cảnh báo *"Invalid Scopes: ads_read..."* (chỉ hiển thị cho developer), chỉ cần bấm OK đi tiếp là lấy được đầy đủ dữ liệu.

### 2.2. Hai "Bẫy Kỹ Thuật" của Meta OAuth và Cách Xử Lý trong `server/oauth_mcp.py`
Trong [`server/oauth_mcp.py`](file:///C:/Users/TANG%20KIM%20SON/.gemini/antigravity/brain/91625aa6-de56-4655-a1fe-4d426b1964c6/scratch/javis-os/server/oauth_mcp.py#L510-L569), Javis xử lý 2 điểm dị biệt của Meta OAuth v25.0:
1. **Bẫy `localhost` vs `127.0.0.1` (`_meta_localhost`):** Khi Facebook App ở chế độ Development, Meta tự động cho phép redirect về `http://localhost:<port>/...` mà không cần khai báo trong *Valid OAuth Redirect URIs*, nhưng lại **chặn đứng `http://127.0.0.1`**. Do đó hàm `_meta_localhost()` tự động đổi host từ `127.0.0.1` sang `localhost`.
2. **Đổi Token Ngắn hạn (1–2 giờ) sang Token Dài hạn 60 Ngày (`_meta_longlive`):**
   - Khác chuẩn OAuth 2.0 thông thường (dùng `POST` + `refresh_token`), Meta đổi `code` bằng lệnh `GET https://graph.facebook.com/v25.0/oauth/access_token` và trả về một token ngắn hạn chỉ sống 1–2 giờ, không có `refresh_token`.
   - Ngay lập tức, hàm `_meta_longlive()` gọi thêm 1 lệnh `GET` thứ hai tới chính `token_url` đó với tham số:
     ```python
     params = {
         "grant_type": "fb_exchange_token",
         "client_id": client_id,
         "client_secret": client_secret,
         "fb_exchange_token": short_lived_token,
     }
     ```
   - Kết quả trả về là **Long-Lived User Access Token sống 60 ngày (`5.184.000` giây)**.

### 2.3. Cách Hoạt Động của 4 Công Cụ Meta Ads (`system/plugins/meta-ads-graph/plugin.py`)
Plugin [`meta-ads-graph/plugin.py`](file:///C:/Users/TANG%20KIM%20SON/.gemini/antigravity/brain/91625aa6-de56-4655-a1fe-4d426b1964c6/scratch/javis-os/system/plugins/meta-ads-graph/plugin.py#L83-L184) gọi thẳng `https://graph.facebook.com/v25.0` ở chế độ **100% Chỉ đọc (`min_mode="readonly"`)**:
1. `meta_ads_accounts`: Gọi `GET /me/adaccounts?fields=account_id,name,currency,account_status,amount_spent,balance&limit=100`.
2. `meta_ads_insights`: Tự động chuẩn hóa `act_<account_id>` (nếu bỏ trống thì tự lấy tài khoản đầu tiên qua `_resolve_act`), sau đó gọi:
   - `GET /act_<id>/insights?fields=spend,impressions,clicks,ctr,cpc,cpm,reach,frequency,actions,action_values&level=account|campaign|ad&date_preset=last_7d` (hoặc `time_range={"since":"YYYY-MM-DD","until":"YYYY-MM-DD"}`).
3. `meta_ads_campaigns`: Gọi `GET /act_<id>/campaigns?fields=name,status,effective_status,objective,daily_budget,lifetime_budget,start_time,stop_time`.
4. `meta_ads_get`: Cho phép truy vấn `GET` bất kỳ đường dẫn nào của Marketing API (ví dụ `act_123/adsets`).

### 2.4. Cách Quản Lý Fanpage & Đăng Video (`system/plugins/meta-pages-graph/plugin.py`)
Trong [`meta-pages-graph/plugin.py`](file:///C:/Users/TANG%20KIM%20SON/.gemini/antigravity/brain/91625aa6-de56-4655-a1fe-4d426b1964c6/scratch/javis-os/system/plugins/meta-pages-graph/plugin.py#L103-L300):
- **Bí quyết Token Trang Riêng Biệt (`_resolve_page`):** Không dùng User Token để đăng bài trực tiếp. Hệ thống gọi `GET /me/accounts?fields=id,name,category,access_token,tasks` để lấy **`access_token` riêng của từng Fanpage** (nhưng tuyệt đối ẩn trường `access_token` khi trả danh sách trang cho AI đọc ở hàm `_list` để tránh lộ token trong lịch sử chat!).
- **Tách Host khi Upload Video:** Ảnh và bài chữ gửi tới `https://graph.facebook.com/v25.0/{page_id}/photos` hoặc `/feed`, nhưng **Video bắt buộc phải gửi multipart tới host riêng `https://graph-video.facebook.com/v25.0/{page_id}/videos`** với `timeout=900` giây.

### 2.5. Cách Kết Nối Messenger Fanpage (`server/messenger_bot.py`)
Trong [`server/messenger_bot.py`](file:///C:/Users/TANG%20KIM%20SON/.gemini/antigravity/brain/91625aa6-de56-4655-a1fe-4d426b1964c6/scratch/javis-os/server/messenger_bot.py#L40-L150):
- **Cú pháp Gom 3 Khóa Trong 1 Ô Nhập (`parse_creds`):** Người dùng chỉ cần dán 1 chuỗi cách nhau bằng dấu cách `<page_id> <page_access_token> <app_secret>`, hàm `parse_creds()` tự nhận diện bằng hình dạng chuỗi:
  - Chuỗi toàn số dài 5–25 ký tự (`^\d{5,25}$`) $\rightarrow$ `page_id`.
  - Chuỗi hệ thập lục phân đúng 32 ký tự (`^[0-9a-fA-F]{32}$`) $\rightarrow$ `app_secret`.
  - Chuỗi dài $> 40$ ký tự (thường bắt đầu bằng `EAA...`) $\rightarrow$ `page_access_token`.
- **Xác thực Webhook & Gửi Tin Nhắn:**
  - Khi bật bot, tự động gọi `POST /v23.0/{page_id}/subscribed_apps` với `subscribed_fields="messages,messaging_postbacks"`.
  - Mọi gói tin `POST /messenger/webhook` đều được kiểm tra chữ ký HMAC-SHA256 tại header `X-Hub-Signature-256` bằng `app_secret`.
  - Tự động loại bỏ định dạng Markdown (`md_to_plain`), cắt nhỏ tin nhắn ở mốc `MAX_TIN = 1900` ký tự (giới hạn cứng của Messenger là 2.000 byte UTF-8) và gửi qua `POST /v23.0/me/messages` với `messaging_type: "RESPONSE"` (trong cửa sổ 24 giờ kể từ lúc khách nhắn).

### 2.6. Mẫu Code Tích Hợp Trực Tiếp Meta Ads Vào SME OS (`Code.gs` — Không Cần VPS!)
Vì Meta Graph API hoàn toàn là HTTP REST, SME OS có thể chạy trực tiếp đoạn code sau trong `Code.gs` để kéo chi phí quảng cáo về bảng `Mkt_Campaigns` hoặc `Javis_Sync_Logs` mỗi ngày:

```javascript
/**
 * Đọc trực tiếp hiệu suất Meta Ads (Spend, Impressions, Clicks, Leads) từ SME OS (Google Apps Script)
 * Không cần VPS hay cài đặt Javis OS!
 */
function smeFetchMetaAdsInsightsDirect(adAccountId, longLivedAccessToken, datePreset) {
  var cleanActId = 'act_' + String(adAccountId).replace(/^act_/, '').trim();
  var fields = 'spend,impressions,clicks,ctr,cpc,cpm,reach,actions,action_values';
  var url = 'https://graph.facebook.com/v25.0/' + cleanActId + '/insights'
          + '?fields=' + encodeURIComponent(fields)
          + '&level=account'
          + '&date_preset=' + encodeURIComponent(datePreset || 'today')
          + '&access_token=' + encodeURIComponent(longLivedAccessToken);

  var res = UrlFetchApp.fetch(url, { method: 'get', muteHttpExceptions: true });
  var json = JSON.parse(res.getContentText());
  if (json.error) {
    throw new Error('Meta Marketing API Error: ' + json.error.message);
  }
  return (json.data && json.data[0]) ? json.data[0] : null;
}
```

---

## PHẦN 3: GIẢI PHẪU KẾT NỐI ZALO CÁ NHÂN (USER QR) & ZALO NHÓM (`zalo_login.py`, `zalo_personal_channel.py`, `channels/zalo_personal.py`)

### 3.1. Cơ Chế Hạ Tầng: `javis-zalo` (Bản Fork từ `zalo-agent-cli` & `zca-js`)
Zalo **không cung cấp API chính thống cho tài khoản Zalo cá nhân (User)** để đọc/gửi tin nhắn hay quản lý nhóm. Do đó, tại [`system/mcp-catalog.json`](file:///C:/Users/TANG%20KIM%20SON/.gemini/antigravity/brain/91625aa6-de56-4655-a1fe-4d426b1964c6/scratch/javis-os/system/mcp-catalog.json#L28-L55) và [`server/zalo_login.py`](file:///C:/Users/TANG%20KIM%20SON/.gemini/antigravity/brain/91625aa6-de56-4655-a1fe-4d426b1964c6/scratch/javis-os/server/zalo_login.py#L22-L26), Javis sử dụng gói Node.js CLI do chính tác giả fork và đóng gói:
- **Gói thực thi:** `npx -y --prefer-offline https://codeload.github.com/blogminhquy/javis-zalo/tar.gz/refs/tags/v1.6.1 mcp start`
- **Bản chất bên dưới:** Sử dụng thư viện `zca-js` giả lập giao thức WebSocket/HTTP mã hóa của **Zalo Web (`chat.zalo.me`)** thông qua cookie và khóa `zpw_enk` sinh ra khi người dùng quét mã QR trên điện thoại.

### 3.2. Bí Quyết Cô Lập Đa Tài Khoản Zalo Cá Nhân Bằng Biến Môi Trường `HOME` (`zalo_login.py`)
Mặc định, `zalo-agent-cli` lưu thông tin đăng nhập vào thư mục cố định `~/.zalo-agent-cli`. Nếu công ty có 3 nhân viên Sale cùng quét QR trên 1 máy chủ, người thứ 2 quét sẽ xóa mất phiên của người thứ 1.
Tại [`server/zalo_login.py`](file:///C:/Users/TANG%20KIM%20SON/.gemini/antigravity/brain/91625aa6-de56-4655-a1fe-4d426b1964c6/scratch/javis-os/server/zalo_login.py#L43-L61), Javis giải quyết bằng cách **tạo thư mục `HOME` giả lập riêng cho từng tài khoản**:

```python
_HOME_ROOT = STATE_DIR / "connector-home"

def zalo_home(conn_id: str, label: str = "") -> str:
    """Mỗi kết nối Zalo có 1 HOME riêng để chạy nhiều tài khoản song song."""
    slug = _slug(label) if label else "acc"
    short = conn_id[:6] if conn_id else "000000"
    p = _HOME_ROOT / f"zalo-{slug}-{short}"
    p.mkdir(parents=True, exist_ok=True)
    return str(p)
```
Khi gọi `npx javis-zalo login --json` (để lấy ảnh QR Base64 từ `stdout`) và khi chạy MCP server (`mcp start`), Javis gán cứng `env["HOME"] = home` và `env["USERPROFILE"] = home`. Nhờ đó 10 tài khoản Zalo cá nhân có thể chạy song song trong 10 thư mục cô lập mà không bao giờ đụng nhau!

### 3.3. Danh Sách 13 Công Cụ MCP của Zalo Cá Nhân & Nhóm
Khi kết nối thành công, `javis-zalo` cung cấp **13 công cụ MCP** (được giới hạn cứng `calls_per_min: 20` để chống khóa nick):
- **9 Công cụ Đọc (`read`):**
  1. `zalo_get_messages`: Lấy tin nhắn mới đến từ mọi cuộc trò chuyện (cá nhân & nhóm).
  2. `zalo_get_history`: Đọc lịch sử tin nhắn của một `thread_id`.
  3. `zalo_search_history`: Tìm kiếm tin nhắn theo từ khóa.
  4. `zalo_list_threads`: Liệt kê danh sách hội thoại / nhóm Zalo.
  5. `zalo_search_threads`: Tìm kiếm bạn bè hoặc nhóm theo tên.
  6. `zalo_get_group_joins`: Phát hiện sự kiện thành viên mới vừa vào nhóm Zalo.
  7. `zalo_list_join_requests`: Xem danh sách người đang xin duyệt vào nhóm Zalo.
  8. `zalo_view_media`: Tải/xem ảnh, file đính kèm trong tin nhắn.
  9. `zalo_get_labels`: Đọc danh sách thẻ phân loại khách hàng (Labels) trên Zalo.
- **1 Công cụ Ghi nhẹ (`write`):**
  10. `zalo_mark_read`: Đánh dấu đã đọc tin nhắn.
- **3 Công cụ Toàn quyền (`danger`):**
  11. `zalo_send_message`: Gửi tin nhắn văn bản tới cá nhân hoặc nhóm (`thread_id`, `is_group`).
  12. `zalo_send_file`: Gửi ảnh/tài liệu/báo giá PDF tới khách hoặc nhóm.
  13. `zalo_review_join_requests`: Tự động **Duyệt (Approve)** hoặc **Từ chối (Reject)** người xin vào nhóm Zalo!

### 3.4. Bí Quyết Quét Tin Nhắn Tốc Độ Kép (20s / 2s) & Tag `@Mention` UTF-16LE Trong Nhóm Zalo
Trong [`server/zalo_personal_channel.py`](file:///C:/Users/TANG%20KIM%20SON/.gemini/antigravity/brain/91625aa6-de56-4655-a1fe-4d426b1964c6/scratch/javis-os/server/zalo_personal_channel.py#L46-L155) và [`server/channels/zalo_personal.py`](file:///C:/Users/TANG%20KIM%20SON/.gemini/antigravity/brain/91625aa6-de56-4655-a1fe-4d426b1964c6/scratch/javis-os/server/channels/zalo_personal.py#L40-L150), Javis giải quyết 2 bài toán cực khó của Zalo:

1. **Nhịp Quét Tốc Độ Kép (`NHIP = 20s` vs `NHIP_NHANH = 2s`):**
   - Bình thường, vòng lặp gọi `zalo_get_messages(limit=20)` mỗi **20 giây** (tức 3 lần/phút, rất an toàn dưới ngưỡng 20 lần/phút). Đặc biệt, nó gọi thẳng qua `mcp_client.pool` chứ không đi qua `mcp_hub` để không làm rác file nhật ký `mcp_audit.jsonl`.
   - Nhưng ngay khi có 1 khách hàng nhắn tin riêng (`not is_group`), Javis ghi dấu thời gian `_chat_rieng_nong[conn_id] = time.time()` và **tăng tốc nhịp quét lên 2 giây/lần trong vòng 60 giây tiếp theo**! Nhờ vậy khách hàng đang chat cảm giác AI trả lời tức thì như WebSocket, mà lúc rảnh thì hoàn toàn không tốn quota.
2. **Thuật Toán Tính Offset UTF-16LE Để Tag `@Tên` Thật Trong Nhóm Zalo (`tim_mention_nhom`):**
   - Trong nhóm Zalo, nếu chỉ gõ chữ `@Nguyễn Văn A` thì đó chỉ là chữ thuần, người kia **không nhận được thông báo rung chuông được nhắc tên**.
   - Giao thức `zca-js` của Zalo tính vị trí tag (`offset` và `length`) theo **đơn vị mã UTF-16 (UTF-16 code units)** giống chuỗi JavaScript, chứ không phải số ký tự Unicode của Python (ví dụ 1 emoji 4-byte chiếm `len = 1` trong Python nhưng chiếm `2` UTF-16 code units trong Zalo!).
   - Hàm [`_utf16_len(s)`](file:///C:/Users/TANG%20KIM%20SON/.gemini/antigravity/brain/91625aa6-de56-4655-a1fe-4d426b1964c6/scratch/javis-os/server/channels/zalo_personal.py#L37-L49) và [`tim_mention_nhom()`](file:///C:/Users/TANG%20KIM%20SON/.gemini/antigravity/brain/91625aa6-de56-4655-a1fe-4d426b1964c6/scratch/javis-os/server/channels/zalo_personal.py#L52-L108) chuẩn hóa NFC, bỏ dấu tiếng Việt (`_bo_dau`) để tìm đúng vị trí `@Tên` mà AI vừa viết, quy đổi ra offset UTF-16LE (`len(s.encode("utf-16-le")) // 2`), rồi gọi CLI:
     ```bash
     npx javis-zalo msg send <thread_id> "<nội_dung>" -t group --mention "<utf16_offset>:<utf16_len>:<sender_uid>" --json
     ```

---

## PHẦN 4: GIẢI PHẪU ZALO OFFICIAL BOT PLATFORM (`server/zalo_bot.py`)

Bên cạnh Zalo cá nhân (không chính thức), [`server/zalo_bot.py`](file:///C:/Users/TANG%20KIM%20SON/.gemini/antigravity/brain/91625aa6-de56-4655-a1fe-4d426b1964c6/scratch/javis-os/server/zalo_bot.py#L1-L150) tiết lộ cách kết nối với **Zalo Bot Platform chính chủ (`https://bot-api.zaloplatforms.com`)** — cực kỳ phù hợp để tích hợp trực tiếp vào **SME OS (`Code.gs`)** mà không sợ khóa tài khoản và không cần VPS:

### 4.1. Cấu Trúc API & 5 "Điểm Dị Biệt" Cần Lưu Ý
- **URL Gốc:** `https://bot-api.zaloplatforms.com/bot{token}/{method}`
- **Các phương thức chính:** `getMe`, `getUpdates`, `sendMessage`, `sendChatAction` (`action: "typing"`).
- **5 Điểm Dị Biệt của Zalo Bot so với Telegram Bot (được bóc tách từ `zalo_bot.py`):**
  1. **Không có API sửa hoặc xóa tin nhắn đã gửi:** Do đó không thể gửi tin `"Đang suy nghĩ..."` rồi sửa lại như Telegram, mà phải gọi `sendChatAction` với `action="typing"` mỗi 4 giây rồi chỉ gọi `sendMessage` 1 lần khi đã có câu trả lời cuối cùng.
  2. **Không có nút bấm Inline Keyboard / Callback Query:** Mọi xác nhận trong chat phải thực hiện bằng tin nhắn văn bản.
  3. **Giới hạn 2.000 ký tự/tin (`MAX_TIN = 1900`):** Tin nhắn dài hơn phải chia nhỏ bằng hàm `chia_tin(text, 1900)`.
  4. **`getUpdates` trả về `ok: false, description: "Request timeout"` khi không có tin nhắn mới:** Đây là hành vi bình thường khi hết 30 giây chờ long-polling, **tuyệt đối không được coi là lỗi mạng**.
  5. **Phân biệt Chat Nhóm và Chat Riêng:** Khi Zalo không trả trường `chat_type`, kiểm tra bằng điều kiện `chat_id != sender_id` (nếu khác nhau tức là tin nhắn trong Nhóm).

### 4.2. Mẫu Code Gửi Thông Báo Zalo Official Bot Trực Tiếp Từ SME OS (`Code.gs`)
```javascript
/**
 * Gửi thông báo vận hành / phiếu dịch vụ từ SME OS (Google Apps Script) qua Zalo Official Bot
 * @param {string} zaloBotToken - Token của Zalo Bot
 * @param {string} chatId - ID người nhận hoặc nhóm nhận
 * @param {string} plainMessage - Nội dung tin nhắn (tự động cắt mỗi 1.900 ký tự)
 */
function smeSendZaloBotMessageDirect(zaloBotToken, chatId, plainMessage) {
  var baseUrl = 'https://bot-api.zaloplatforms.com/bot' + zaloBotToken + '/sendMessage';
  var text = String(plainMessage || '').trim();
  if (!text) return [];

  // Chia nhỏ theo mốc 1900 ký tự giống hàm chia_tin() của Javis OS
  var chunks = [];
  while (text.length > 1900) {
    var cutIdx = text.lastIndexOf('\n', 1900);
    if (cutIdx < 950) cutIdx = 1900;
    chunks.push(text.substring(0, cutIdx));
    text = text.substring(cutIdx).trim();
  }
  if (text) chunks.push(text);

  var results = [];
  for (var i = 0; i < chunks.length; i++) {
    var res = UrlFetchApp.fetch(baseUrl, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({
        chat_id: String(chatId),
        text: chunks[i]
      }),
      muteHttpExceptions: true
    });
    results.push(JSON.parse(res.getContentText()));
  }
  return results;
}
```
