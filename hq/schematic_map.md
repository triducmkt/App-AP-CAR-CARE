# Bản Đồ Kiến Trúc & Schematic (App AP CAR CARE)

> 📍 **Mục đích:** File này là kim chỉ nam về kiến trúc tổng thể, luồng dữ liệu và tọa độ hàm của app. Phục vụ đắc lực cho quy trình **Chống lặp lại sửa sai (Debugging Protocol)**. Bất cứ khi nào Agent gặp bế tắc (i = 3), BẮT BUỘC phải mở file này ra đối chiếu luồng dữ liệu để tìm hướng tiếp cận rẽ nhánh.

---

## 🧭 QUY TẮC CẬP NHẬT FILE NÀY

- **Tự động cập nhật KHI:** Task yêu cầu thay đổi cấu trúc hệ thống, thay đổi luồng giao tiếp dữ liệu giữa Frontend - Backend / Database, hoặc thêm module/tính năng lớn mới. Agent BẮT BUỘC phải cập nhật file này sau khi hoàn tất task.
- **BỎ QUA cập nhật KHI:** Task chỉ liên quan đến sửa đổi UI/UX lặt vặt, fix bug hiển thị frontend, chỉnh sửa text/css không làm ảnh hưởng đến logic luồng dữ liệu cốt lõi.

---

## 1. MÔ HÌNH KIẾN TRÚC GIAI ĐOẠN 1 (GAS + GOOGLE SHEETS)

```mermaid
flowchart TD
    subgraph CLIENT [Giao diện Client (Responsive PC & Mobile)]
        WELCOME[Màn hình Welcome Chào Mừng\nMotion Graphic & 3D Logo Sequence] --> LOGIN[Form Đăng Nhập\nTên đăng nhập + Mật khẩu]
        LOGIN -->|Thao tác Click Đăng Nhập| DISPATCHER[Client Action Controller\n(Xử lý Validation & Hiệu ứng Chờ)]
    end

    subgraph BACKEND [Google Apps Script Backend]
        DISPATCHER -->|google.script.run| API_AUTH[Hàm checkLogin(username, password)]
        API_AUTH --> FIELD_MAP[FIELD_MAP Chuyển Đổi Dữ Liệu]
    end

    subgraph DATABASE [Google Sheet Database Central]
        FIELD_MAP -->|SpreadsheetApp.openById| GSHEET[(Google Sheet\nID: 1ziGRRq92AxX9BnDMYbHF-iES7XskALCaOK6LeUw_IS0)]
        GSHEET -->|Trả về thông tin User & Quyền| API_AUTH
    end

    API_AUTH -->|Trả về JSON Payload {status, user, role}| CLIENT
    CLIENT -->|Đăng nhập thành công (DUC/1111)| SPA_ROUTER[SPA View Router / Session Manager]
    SPA_ROUTER -->|switchSpaView('home')| HOME_VIEW[Trang Chủ Home - Multi-Channel Publisher]
    HOME_VIEW -->|Đăng bài đa kênh| API_PUBLISH[Hàm publishMultiChannelPost()]
    API_PUBLISH --> POST_MAP[POST_FIELD_MAP]
    POST_MAP --> GSHEET
```

---

## 2. CÁC TRỤ CỘT KỸ THUẬT & NGUYÊN TẮC THIẾT KẾ (CHUẨN SME OS & TDCM TEAM APP)

1. **Single Source of Truth (SSOT) & Chuẩn Dòng Vật Lý (`PM_CONFIG`):**
   - Dữ liệu lưu trữ tập trung tại Google Sheet Master ID `1ziGRRq92AxX9BnDMYbHF-iES7XskALCaOK6LeUw_IS0` (Phase 1) và tiến hóa lên **Next.js + Cloudflare Pages + Supabase PostgreSQL + Cloudflare R2** (Phase 2).
   - Chuẩn bố cục dòng vật lý cho các bảng nghiệp vụ lớn: Dòng 1–9 (Summary/Config), **Dòng 10 (`HEADER_ROW = 10`)**, Dòng 11 (Hướng dẫn), **Từ Dòng 12 (`MIN_DATA_ROW = 12`)** là dữ liệu bản ghi thực tế.
2. **Ma trận Ánh xạ Đa chiều `GLOBAL_SCHEMA_MATRIX` ($1D \rightarrow 2D \rightarrow 3D \rightarrow 4D$ — Bắt buộc 100%):**
   - **1D Vector (`FIELD_MAP`):** Ánh xạ trường trong 1 bảng `{ sheetHeader, col, idx: letterToColIndex(col), frontendKey, type, visible, width, defaultVal }`. Tuyệt đối không hardcode `row[2]`.
   - **2D Matrix ($n \times m$ — `GLOBAL_DB_MAP[Table][Field]` & `PROJECT_PRICING[BranchOrTier][ServiceCode]`):** Quản lý tập trung toàn bộ **10 Bảng Core Business Objects** (`Lead`, `Customer`, `Order`, `Task`, `Product_Asset`, `Staff`, `Partner`, `Inventory_Item`, `Financial_Transaction`, `Warranty_Care`) và **4 Bảng System Tables** (`Sys_Config_Matrix`, `Sys_Automation_Queue`, `Audit_Logs`, `Sys_Sequence_Counter`).
   - **3D Matrix ($n \times m \times k$ — `ROLE_MATRIX[Role] × PERMISSION_GROUPS × FIELD_MAP`):** Kiểm soát quyền hạn theo 3 chiều `(Bảng × Trường/Hành động × Vai trò)` qua hàm cổng duy nhất `canPerformAction(user, tableName, rowData, fieldKey, actionType)`.
   - **4D Tensor ($n \times m \times k \times t$ — `TASK_AUTOMATION_RULES` & `getLockedStatuses()`):** Kiểm soát tự động hóa & khóa ô theo 4 chiều `(Bảng × Trường × Vai trò × Trạng thái/Sự kiện)` — tự động khóa trường khi đơn/task chuyển trạng thái (`locks`) và tự động điền ngày/chuyển bước (`autoFill`).
3. **Cơ chế Đồng bộ 5 Trụ cột `OptiSync V5` (Client-Server Logistics):**
   - **Trụ cột 1 — Central `AppStore`:** Mọi thay đổi trên UI phải đi qua `AppStore.dispatchAction(payload)`.
   - **Trụ cột 2 — Optimistic UI & Ghost RAM (`recentEdits` 15s):** Phản hồi giao diện trong `0.001s` + lá chắn 15 giây chống ghi đè ngược.
   - **Trụ cột 3 — Debounce Batching (8s Truck):** Gom lô các thao tác sửa liên tiếp trong 8 giây rồi đẩy 1 lần qua `api_batch_sync`.
   - **Trụ cột 4 — Smart Polling & Traffic Yielding:** Tự động nhường đường khi người dùng đang gõ phím hoặc mở Modal.
   - **Trụ cột 5 — Data Mixer, Hash Diffing & Navigation Guard:** Trộn `Server Data + recentEdits + pendingQueue`, phân trang 100–150 dòng/trang không giật cuộn, chặn đóng tab (`beforeunload`) khi còn hàng đợi chưa lưu.
4. **4 Cổng Giao tiếp RPC Hợp nhất & Bảo vệ Hạ tầng Backend:**
   - **4 Cổng chuẩn:** `api_query(requestJson)`, `api_mutate(requestJson)`, `api_batch_sync(batchJson)`, `doPost(e)` (Website Sensor Webhook).
   - **An toàn Backend:** Khóa đồng thời `LockService.getScriptLock()`, đọc 1 lần vào RAM (`getDatabaseSnapshot` + Dual-Update Sheet & RAM), ngắt an toàn ở phút 4.5 (`< 270.000ms`), và **Rolling 3.000-Row Audit Log** (chèn tại dòng 12, cắt ở dòng 3.000).
5. **SPA View Architecture & Optimistic Multi-Channel Feedback:**
   - Chuyển đổi giữa `#viewLogin`, `#viewHome` và các phân hệ nghiệp vụ không reload trang; quản lý phiên qua `localStorage.getItem('apUserSession')`.

---

## 3. BẢN ĐỒ MODULE & TỌA ĐỘ FILE CODE HIỆN TẠI (`src/`)

### 3.1. Frontend Modules (`src/Index.html`)
| File / Component | Chức năng chính | Hàm / Biến quan trọng |
|---|---|---|
| `Index.html` (`#viewLogin`) | Màn hình Welcome chào mừng v11 + Form Đăng nhập PC & Mobile | `setFeedback()`, `loginForm submit (DUC/1111)`, `switchSpaView()` |
| `Index.html` (`#apSidebar`) | Sidebar Trái Obsidian Glass: Logo Công ty White-Label + Avatar User đa năng (9 màu yêu thích, nén Canvas, đổi SĐT/MK) + 6 Tab Phòng Ban AP CAR CARE 2026 + Tab Cài Đặt dưới cùng | `buildUniversalAvatar()`, `compressImageToBase64()`, `renderSidebarUserCard()`, `AppStore.switchDepartment()` |
| `Index.html` (`#pane_DEPT_EXEC`) | Tab 1 — Ban Giám Đốc & HĐQT: 4 Thẻ KPI + Sơ đồ Tổ chức 6 Tầng AP CAR CARE 2026 tương tác + Bảng Kiểm toán Xoay vòng | `renderAuditLogTable()`, `AppStore.switchDepartment()` |
| `Index.html` (`#pane_DEPT_MKT`) | Tab 2 (Active mặc định) — Phòng TT-MKT: Trạm Đăng Bài Đa Kênh (YouTube, Facebook, TikTok với dấu `v`/`x`) + Phễu Leads Đa Kênh (`GLOBAL_DB_MAP["Leads"]`) | `btnPublish click`, `handleFiles()`, `setChannelStatus()`, `renderDynamicMatrixTable('Leads')` |
| `Index.html` (`#pane_DEPT_SERVICE`) | Tab 3 — Khối Dịch Vụ & Kỹ Thuật (Tân Phú & Q7): Điều phối Lệnh sửa chữa RO (`Orders` kèm khóa tự động 4D) + Kho Phụ kiện & Âm thanh Focal (`Inventory_SKU`) | `renderDynamicMatrixTable('Orders')`, `toggleRowStatus4D()`, `renderDynamicMatrixTable('Inventory_SKU')` |
| `Index.html` (`#pane_DEPT_HR`) | Tab 4 — Phòng Nhân Sự (HR): Danh bạ Nhân sự 6 Tầng (`Staff`) & Phân quyền 3D | `renderDynamicMatrixTable('Staff')` |
| `Index.html` (`#pane_DEPT_ACADEMY`) | Tab 5 — Phòng Đào Tạo (AP Education): Quản lý Học viên Detailing Tầng 1 (`Tasks`) | `renderDynamicMatrixTable('Tasks')` |
| `Index.html` (`#pane_DEPT_FINANCE`) | Tab 6 — Phòng Kế Toán - Hành Chính & KTNB: Sổ quỹ Thu - Chi (`Finance_Transactions`) + Ma trận Giá 2D (`PROJECT_PRICING`) | `renderDynamicMatrixTable('Finance_Transactions')`, `renderPricing2DTable()` |
| `Index.html` (`#pane_SETTINGS`) | Tab Cài Đặt (Dưới cùng Sidebar): Khoác Áo Theme Giao Diện (On/Off) + Quản lý 6 Vị Trí Thay Logo White-Label + Module M15 Cắm Nối Javis OS AI Bridge (Plug & Play) + Giám sát 15 Module Contracts (`M01` → `M15`) | `applyThemeSkinToDOM()`, `applyAllLogoSlotsToDOM()`, `renderSettingsThemeCards()`, `renderSettingsLogoSlots()`, `btnTestJavisLive`, `btnPullJavisSample`, `renderModules14Table()` |
| `Index.html` (`#bodyJavisSection`) | Card Cấu Hình Javis Cá Nhân trong Sidebar: Nút thu gọn thứ 3 dưới Avatar User cho phép ping test và lưu URL/Token node Javis OS cá nhân | `bindSidebarCollapse('btnToggleJavisSection')`, `btnSidebarTestJavis`, `btnSidebarSaveJavis` |
| `Index.html` (`#btnImportFromJavis`) | Nút Nhập Kịch Bản Nhanh từ Javis OS trong Phòng TT - MKT: Tự động kéo draft content từ node Javis OS đổ thẳng vào Textarea và kênh đăng | `btnImportFromJavis click`, `postContent.value`, `showToast()` |

### 3.2. Backend / API / Database (`src/`)
| Module / File | Vai trò | Điểm kết nối dữ liệu |
|---|---|---|
| `Code.gs` | Hạ tầng 5 File Cốt Lõi SME OS: `PM_CONFIG` (Header dòng 10, Data dòng 12), Ma trận 4D (`GLOBAL_DB_MAP`, `PROJECT_PRICING`, `ROLE_MATRIX`, `TASK_AUTOMATION_RULES`), `DataMapper`, `MODULE_CONTRACTS_REGISTRY` (`M01` → `M14`), `EVENT_BUS`, 4 Cổng RPC (`doGet`, `doPost`, `api_query`, `api_batch_sync`), White-Label & Theme APIs | `checkLogin()`, `updateUserProfile()`, `publishMultiChannelPost()`, `getWhiteLabelAndSystemBundle()`, `saveBrandLogoSlot()`, `toggleThemeSkin()`, `getDatabaseSnapshot()`, `logSystemAudit()` |
| `appsscript.json` | Cấu hình manifest Apps Script (timezone `Asia/Ho_Chi_Minh`, runtime V8) | V8 Runtime |

---

## 4. TỌA ĐỘ MA TRẬN CẤU HÌNH WHITE-LABEL & SƠ ĐỒ PHÒNG BAN
- **`LOGO_SLOT_FIELD_MAP` & `DEFAULT_BRAND_LOGO_SLOTS` (6 Vị trí thay Logo/Thương hiệu cho dự án khác):**
  1. `SLOT_SIDEBAR_COMPANY_LOGO` -> `#sidebarCompanyLogoImg` (Logo Công ty trên đỉnh Sidebar Trái)
  2. `SLOT_LOGIN_HERO_EMBLEM` -> `.hero-intro-img, .brand-logo-img` (Logo Tròn màn hình Login)
  3. `SLOT_LOGIN_BRAND_TITLE` -> `#sidebarBrandTitle` (Tên thương hiệu chính)
  4. `SLOT_LOGIN_BRAND_SLOGAN` -> `#sidebarBrandSub` (Slogan / Phân hệ dưới tên thương hiệu)
  5. `SLOT_WORKSPACE_HEADER_BADGE` -> `#workspaceHeaderBadgeText` (Badge thương hiệu góc phải Topbar)
  6. `SLOT_COMPANY_HOTLINE_WEB` -> `#sidebarFooterHotline` (Thông tin Hotline & Website chân Sidebar)
- **`THEME_FIELD_MAP` & `DEFAULT_THEME_SKINS` (Bộ Khoác Áo Giao Diện On/Off):**
  1. `THEME_AP_SIGNATURE_GLASS` (Default **ON**): Nền làm việc Trắng Xám Nhạt `#F2F4F8`, Sidebar & Nút Đen Obsidian Gradient Glass, Đường Line Xanh Google Blue `#4285F4` / Glow `#8AB4F8`.
  2. `THEME_TDCM_ENTERPRISE_BLUE` (**OFF**): Giao diện Deep Navy Glass & Ice White cho dự án tư vấn SME.
  3. `THEME_FOCAL_AUDIO_GOLD` (**OFF**): Giao diện Hắc Kim Carbon Black Glass & Focal Gold.

---

## 5. LIÊN KẾT BỘ 5 FILE KIẾN TRÚC CỐT LÕI SME OS (`hq/sme-os-core/`)
- `hq/sme-os-core/00-CONTEXT-MASTER-PROMPT.md`: Hiến pháp 10 Điều, 8 Nguyên tắc Thiết kế, Chiến lược Ngôn ngữ 4 Tầng.
- `hq/sme-os-core/01-PRODUCT-PHILOSOPHY.md`: Triết lý Thiết kế Sản phẩm (17 Chương + Phụ lục A).
- `hq/sme-os-core/02-BUSINESS-ARCHITECTURE.md`: Kiến trúc Kinh doanh SME (15 Chương).
- `hq/sme-os-core/03-SYSTEM-ARCHITECTURE.md`: Kiến trúc Hệ thống 7 Lớp & Event-Driven (15 Chương).
- `hq/sme-os-core/04-APPLICATION-ARCHITECTURE.md`: Kiến trúc Ứng dụng, 10 Core Schemas, Ma trận 4D `GLOBAL_SCHEMA_MATRIX` & 14 Module Contracts (6 Chương).
- `hq/sme-os-core/05-TECHNOLOGY-ARCHITECTURE.md`: Kiến trúc Công nghệ Phase 1 (GAS/Sheets) $\rightarrow$ Phase 2 (Next.js/Supabase/R2) & SDLC 6 Bước (Chương 0 + 6 Chương).


