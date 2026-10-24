# Bản Đồ Kiến Trúc & Schematic (App AP CAR CARE)

> 📍 **Mục đích:** File này là kim chỉ nam về kiến trúc tổng thể, luồng dữ liệu và tọa độ hàm của app. Phục vụ đắc lực cho quy trình **Chống lặp lại sửa sai (Debugging Protocol)**. Bất cứ khi nào Agent gặp bế tắc (i = 3), BẮT BUỘC phải mở file này ra đối chiếu luồng dữ liệu để tìm hướng tiếp cận rẽ nhánh.

---

## 🧭 QUY TẮC CẬP NHẬT FILE NÀY

- **Tự động cập nhật KHI:** Task yêu cầu thay đổi cấu trúc hệ thống, thay đổi luồng giao tiếp dữ liệu giữa Frontend - Backend / Database, hoặc thêm module/tính năng lớn mới. Agent BẮT BUỘC phải cập nhật file này sau khi hoàn tất task.
- **BỎ QUA cập nhật KHI:** Task chỉ liên quan đến sửa đổi UI/UX lặt vặt, fix bug hiển thị frontend, chỉnh sửa text/css không làm ảnh hưởng đến logic luồng dữ liệu cốt lõi.

---

## 1. MÔ HÌNH KIẾN TRÚC GIAI ĐOẠN 1 (GAS + GOOGLE SHEETS + MCP HUB)

```mermaid
flowchart TD
    subgraph CLIENT [Giao diện Client Ultra-Luxury AP CAR CARE (PC & Mobile)]
        WELCOME[Màn hình Welcome Chào Mừng v11\nMotion Graphic & 3D Logo Sequence] --> LOGIN[Form Đăng Nhập\nTên đăng nhập + Mật khẩu]
        LOGIN -->|Thao tác Click Đăng Nhập| DISPATCHER[Client Action Controller]
        SPA_ROUTER[SPA View Router + Role Preview Switcher] --> SIDEBAR[Sidebar Đen Gradient #apSidebar\n7 Nút Shortcut Phòng Ban + Nút Cài Đặt Admin]
        SIDEBAR --> PANES[7 Giao diện con đồng nhất #pane_DEPT_CEO..OPS\n+ Watermark Logo AP Chìm Mờ #apWorkspaceWatermark]
    end

    subgraph BACKEND [Google Apps Script Backend — Code.gs]
        DISPATCHER -->|google.script.run| API_AUTH[checkLogin / getWhiteLabelAndSystemBundle]
        PANES -->|AppStore.dispatchAction| API_SYNC[saveDepartmentAccessConfig / testMcpConnector / ingestCanonicalEnvelope]
        API_AUTH --> FIELD_MAP[GLOBAL_SCHEMA_MATRIX 4D & DEFAULT_DEPT_ACCESS_CONFIG]
        API_SYNC --> FIELD_MAP
    end

    subgraph DATABASE [Google Sheet Database Central]
        FIELD_MAP -->|SpreadsheetApp.openById| GSHEET[(Google Sheet\nID: 1ziGRRq92AxX9BnDMYbHF-iES7XskALCaOK6LeUw_IS0)]
    end

    API_AUTH -->|JSON Payload {status, user, deptAccessConfig}| SPA_ROUTER
```

---

## 2. CÁC TRỤ CỘT KỸ THUẬT & NGUYÊN TẮC THIẾT KẾ (CHUẨN SME OS & TDCM TEAM APP)

1. **Single Source of Truth (SSOT) & Chuẩn Dòng Vật Lý (`PM_CONFIG`):**
   - Dữ liệu lưu trữ tập trung tại Google Sheet Master ID `1ziGRRq92AxX9BnDMYbHF-iES7XskALCaOK6LeUw_IS0` (Phase 1) và tiến hóa lên **Next.js + Cloudflare Pages + Supabase PostgreSQL + Cloudflare R2** (Phase 2).
   - Chuẩn bố cục dòng vật lý cho các bảng nghiệp vụ lớn: Dòng 1–9 (Summary/Config), **Dòng 10 (`HEADER_ROW = 10`)**, Dòng 11 (Hướng dẫn), **Từ Dòng 12 (`MIN_DATA_ROW = 12`)** là dữ liệu bản ghi thực tế.
2. **Ma trận Ánh xạ Đa chiều `GLOBAL_SCHEMA_MATRIX` ($1D \rightarrow 2D \rightarrow 3D \rightarrow 4D$ — Bắt buộc 100%):**
   - **1D Vector (`FIELD_MAP`):** Ánh xạ trường trong 1 bảng `{ sheetHeader, col, idx: letterToColIndex(col), frontendKey, type, visible, width, defaultVal }`. Tuyệt đối không hardcode `row[2]`.
   - **2D Matrix ($n \times m$ — `GLOBAL_DB_MAP[Table][Field]` & `PROJECT_PRICING[BranchOrTier][ServiceCode]`):** Quản lý tập trung toàn bộ **10 Bảng Core Business Objects** (`Lead`, `Customer`, `Order`, `Task`, `Product_Asset`, `Staff`, `Partner`, `Inventory_Item`, `Financial_Transaction`, `Warranty_Care`) và **4 Bảng System Tables** (`Sys_Config_Matrix`, `Sys_Automation_Queue`, `Audit_Logs`, `Sys_Sequence_Counter`).
   - **3D Matrix ($n \times m \times k$ — `ROLE_MATRIX[Role] × PERMISSION_GROUPS × FIELD_MAP` + `DEFAULT_DEPT_ACCESS_CONFIG`):** Kiểm soát quyền hạn theo 3 chiều `(Bảng/Section × Trường/Hành động × Vai trò)` qua `canPerformAction()` và `canUserAccessDepartment(deptId, role)`.
   - **4D Tensor ($n \times m \times k \times t$ — `TASK_AUTOMATION_RULES` & `getLockedStatuses()`):** Kiểm soát tự động hóa & khóa ô theo 4 chiều `(Bảng × Trường × Vai trò × Trạng thái/Sự kiện)` — tự động khóa trường khi đơn/task chuyển trạng thái (`locks`) và tự động điền ngày/chuyển bước (`autoFill`).
3. **Cơ chế Đồng bộ 5 Trụ cột `OptiSync V5` (Client-Server Logistics):**
   - **Trụ cột 1 — Central `AppStore`:** Mọi thay đổi trên UI phải đi qua `AppStore.dispatchAction(payload)`.
   - **Trụ cột 2 — Optimistic UI & Ghost RAM (`recentEdits` 15s):** Phản hồi giao diện trong `0.001s` + lá chắn 15 giây chống ghi đè ngược.
   - **Trụ cột 3 — Debounce Batching (8s Truck):** Gom lô các thao tác sửa liên tiếp trong 8 giây rồi đẩy 1 lần qua `api_batch_sync`.
   - **Trụ cột 4 — Smart Polling & Traffic Yielding:** Tự động nhường đường khi người dùng đang gõ phím hoặc mở Modal.
   - **Trụ cột 5 — Data Mixer, Hash Diffing & Navigation Guard:** Trộn `Server Data + recentEdits + pendingQueue`, phân trang 100–150 dòng/trang không giật cuộn, chặn đóng tab (`beforeunload`) khi còn hàng đợi chưa lưu.
4. **4 Cổng Giao tiếp RPC Hợp nhất & Bảo vệ Hạ tầng Backend:**
   - **4 Cổng chuẩn:** `api_query(requestJson)`, `api_mutate(requestJson)`, `api_batch_sync(batchJson)`, `doPost(e)` (Website Sensor Webhook + `ingestCanonicalEnvelope`).
   - **An toàn Backend:** Khóa đồng thời `LockService.getScriptLock()`, đọc 1 lần vào RAM (`getDatabaseSnapshot` + Dual-Update Sheet & RAM), ngắt an toàn ở phút 4.5 (`< 270.000ms`), và **Rolling 3.000-Row Audit Log** (chèn tại dòng 12, cắt ở dòng 3.000).
5. **SPA View Architecture & Optimistic Multi-Channel Feedback:**
   - Chuyển đổi giữa `#viewLogin`, `#viewHome` và các phân hệ nghiệp vụ không reload trang; quản lý phiên qua `localStorage.getItem('apUserSession')`.

---

## 3. BẢN ĐỒ MODULE & TỌA ĐỘ FILE CODE HIỆN TẠI (`src/`)

### 3.1. Frontend Modules (`src/Index.html` — TASK-012 Ultra-Luxury AP Overhaul)
| File / Component | Chức năng chính | Hàm / Biến quan trọng |
|---|---|---|
| `Index.html` (`#viewLogin`) | Màn hình Welcome chào mừng v11 + Form Đăng nhập PC & Mobile (Bảo toàn 100%) | `setFeedback()`, `loginForm submit (DUC/1111)`, `switchSpaView()` |
| `Index.html` (`#apSidebar`) | Sidebar Đen Obsidian Gradient (`#03050A -> #091122 -> #04070E`): Logo Công ty + Card Hồ sơ Nhân sự + **7 Nút Shortcut Phòng Ban ở giữa Sidebar (`#sidebarDeptNav`)** có hiệu ứng chuyển động gradient khi hover/click (`.ap-dept-btn`) + **Nút Cài Đặt Admin (`#btnSidebarSettings`)** ở đáy | `renderSidebarDepartmentShortcuts()`, `canUserAccessDepartment()`, `AppStore.switchDepartment()` |
| `Index.html` (`#apWorkspaceWatermark`) | Logo tròn AP CAR CARE chìm mờ sang trọng dưới nền tất cả các trang làm việc (`#workspaceWatermarkLogoImg`) | `applyAllLogoSlotsToDOM()` |
| `Index.html` (`#pane_DEPT_CEO`) | Section 1 — **Ban Giám Đốc (`DEPT_CEO`)**: 4 KPI điều hành + AI Insight phê duyệt 1-click + Sơ đồ 6 Tầng AP CAR CARE + Nhật ký Kiểm toán | `renderAuditLogTable()`, `approveAiAction()` |
| `Index.html` (`#pane_DEPT_MKT`) | Section 2 — **Phòng Marketing (`DEPT_MKT`)**: 4 KPI ROAS/CPL + AI Insight + Trạm Đăng Bài Đa Kênh (YouTube, Facebook, TikTok) + Bảng Chiến dịch/Leads | `btnPublish click`, `btnImportFromJavis`, `renderDynamicMatrixTable('Leads')` |
| `Index.html` (`#pane_DEPT_SALE`) | Section 3 — **Kinh Doanh & CSKH (`DEPT_SALE`)**: 4 KPI Tỷ lệ chốt/Lịch hẹn + AI Insight + Phễu Khách hàng 360° (Haravan + Getfly + Zalo) | `renderDynamicMatrixTable('Leads')`, `approveAiAction()` |
| `Index.html` (`#pane_DEPT_TECH`) | Section 4 — **Kỹ Thuật & Xưởng (`DEPT_TECH`)**: 4 KPI Khoang dịch vụ + AI Insight + Điều phối Lệnh sửa chữa RO (`Orders` khóa 4D) | `renderDynamicMatrixTable('Orders')`, `toggleRowStatus4D()` |
| `Index.html` (`#pane_DEPT_INV`) | Section 5 — **Kho & Mua Hàng (`DEPT_INV`)**: 4 KPI Vật tư/Focal + AI Insight + Bảng Tồn kho & Cảnh báo Đặt hàng (`Inventory_SKU`) | `renderDynamicMatrixTable('Inventory_SKU')` |
| `Index.html` (`#pane_DEPT_FIN`) | Section 6 — **Kế Toán & Tài Chính (`DEPT_FIN`)**: 4 KPI Dòng tiền/Đối soát + AI Insight + Sổ quỹ Thu - Chi (`Finance_Transactions`) + Bảng Giá 2D (`PROJECT_PRICING`) | `renderDynamicMatrixTable('Finance_Transactions')`, `renderPricing2DTable()` |
| `Index.html` (`#pane_DEPT_OPS`) | Section 7 — **Bảo Vệ & Ca Trực (`DEPT_OPS`)**: 4 KPI Cổng xe + AI Insight + Giao diện Cổng xe 10 Giây (`< 10s`) + Danh bạ Nhân sự (`Staff`) & Học viên (`Tasks`) | `btnGateQuickCheckIn`, `renderDynamicMatrixTable('Staff')`, `renderDynamicMatrixTable('Tasks')` |
| `Index.html` (`#pane_SETTINGS`) | **Trang Cài Đặt (Phân quyền `ADMIN_CEO`)**: (1) Danh sách Bật/Tắt Toggle On/Off 7 Section Phòng Ban (ẩn/hiện nút shortcut trên Sidebar) + **Dropdown Multiselect phân quyền Role/User cho từng Section** (`#settingsDeptAccessContainer`); (2) Trạm Test Kết Nối Thực Tế MCP Hub (Haravan MCP, Getfly CRM MCP, Javis OS Bridge); (3) Khoác Áo Theme On/Off + 6 Vị Trí Thay Logo White-Label + 16 Module Contracts (`M01` → `M16`) | `renderSettingsDeptAccessMatrix()`, `toggleDeptVisibilitySwitch()`, `toggleRoleInDeptAccess()`, `saveDeptAccessMatrixToServer()`, `runLiveMcpConnectorTest()` |

### 3.2. Backend / API / Database (`src/`)
| Module / File | Vai trò | Điểm kết nối dữ liệu |
|---|---|---|
| `Code.gs` | Hạ tầng 5 File Cốt Lõi SME OS: `PM_CONFIG`, Ma trận 4D (`GLOBAL_DB_MAP`, `PROJECT_PRICING`, `ROLE_MATRIX`, `TASK_AUTOMATION_RULES`), `DEFAULT_DEPT_ACCESS_CONFIG` (7 phòng ban), `MODULE_CONTRACTS_REGISTRY` (`M01` → `M16`), `saveDepartmentAccessConfig()`, `testMcpConnector()`, `ingestCanonicalEnvelope()` | `checkLogin()`, `getWhiteLabelAndSystemBundle()`, `saveDepartmentAccessConfig()`, `testMcpConnector()`, `ingestCanonicalEnvelope()`, `getDatabaseSnapshot()`, `logSystemAudit()` |
| `appsscript.json` | Cấu hình manifest Apps Script (timezone `Asia/Ho_Chi_Minh`, runtime V8) | V8 Runtime |

---

## 4. TỌA ĐỘ MA TRẬN CẤU HÌNH WHITE-LABEL & SƠ ĐỒ 7 PHÒNG BAN CHUẨN SME OS
- **7 Section Phòng Ban Chuẩn SME OS (`DEFAULT_DEPT_ACCESS_CONFIG`):**
  1. `DEPT_CEO` — Ban Giám Đốc (`👑` • Quyền mặc định: `ADMIN_CEO`)
  2. `DEPT_MKT` — Phòng Marketing (`📢` • Quyền mặc định: `ADMIN_CEO`, `MKT`)
  3. `DEPT_SALE` — Kinh Doanh & CSKH (`🤝` • Quyền mặc định: `ADMIN_CEO`, `SALE`, `MKT`)
  4. `DEPT_TECH` — Kỹ Thuật & Xưởng (`🛠️` • Quyền mặc định: `ADMIN_CEO`, `TECH`, `SALE`)
  5. `DEPT_INV` — Kho & Mua Hàng (`📦` • Quyền mặc định: `ADMIN_CEO`, `INV`, `TECH`, `FIN`)
  6. `DEPT_FIN` — Kế Toán & Tài Chính (`💰` • Quyền mặc định: `ADMIN_CEO`, `FIN`)
  7. `DEPT_OPS` — Bảo Vệ & Ca Trực (`🛡️` • Quyền mặc định: `ADMIN_CEO`, `OPS`, `TECH`, `SALE`)
- **`LOGO_SLOT_FIELD_MAP` & `DEFAULT_BRAND_LOGO_SLOTS` (6 Vị trí thay Logo/Thương hiệu):**
  1. `SLOT_SIDEBAR_COMPANY_LOGO` -> `#sidebarCompanyLogoImg` & `#workspaceWatermarkLogoImg` (Logo Công ty trên đỉnh Sidebar Trái + Watermark Chìm Mờ dưới nền tất cả trang)
  2. `SLOT_LOGIN_HERO_EMBLEM` -> `.hero-intro-img, .brand-logo-img` (Logo Tròn màn hình Login)
  3. `SLOT_LOGIN_BRAND_TITLE` -> `#sidebarBrandTitle`
  4. `SLOT_LOGIN_BRAND_SLOGAN` -> `#sidebarBrandSub`
  5. `SLOT_WORKSPACE_HEADER_BADGE` -> `#workspaceHeaderBadgeText`
  6. `SLOT_COMPANY_HOTLINE_WEB` -> `#sidebarFooterHotline`

---

## 5. LIÊN KẾT BỘ 5 FILE KIẾN TRÚC CỐT LÕI SME OS (`hq/sme-os-core/` — ĐÃ TÍCH HỢP MỤC LỤC TRA CỨU NHANH ĐẦU MỖI FILE)
- `hq/sme-os-core/00-CONTEXT-MASTER-PROMPT.md`: Hiến pháp 10 Điều, 8 Nguyên tắc Thiết kế, Chiến lược Ngôn ngữ 4 Tầng & Quy trình Bước 0.A (Tra cứu nhanh Mục lục + Vòng lặp Kiểm tra Chi tiết 1 Chương).
- `hq/sme-os-core/01-PRODUCT-PHILOSOPHY.md`: Mục lục Tra cứu Nhanh (`L1–L30`) + 17 Chương Triết lý Thiết kế Sản phẩm + Phụ lục A.
- `hq/sme-os-core/02-BUSINESS-ARCHITECTURE.md`: Mục lục Tra cứu Nhanh (`L1–L26`) + 15 Chương Kiến trúc Kinh doanh SME.
- `hq/sme-os-core/03-SYSTEM-ARCHITECTURE.md`: Mục lục Tra cứu Nhanh (`L1–L26`) + 15 Chương Kiến trúc Hệ thống 7 Lớp & Event-Driven.
- `hq/sme-os-core/04-APPLICATION-ARCHITECTURE.md`: Mục lục Tra cứu Nhanh (`L1–L18`) + 6 Chương Kiến trúc Ứng dụng, 10 Core Schemas, Ma trận 4D & Module Contracts.
- `hq/sme-os-core/05-TECHNOLOGY-ARCHITECTURE.md`: Mục lục Tra cứu Nhanh (`L1–L18`) + Chương 0 + 6 Chương Kiến trúc Công nghệ & SDLC 6 Bước.
