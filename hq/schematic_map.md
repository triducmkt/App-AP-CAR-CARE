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
| `Index.html` (`#viewLogin`) | Màn hình Welcome chào mừng + Form Đăng nhập PC & Mobile | `setFeedback()`, `loginForm submit (DUC/1111)`, `switchSpaView()` |
| `Index.html` (`#viewHome`) | Trang Home Đăng bài đa kênh (YouTube, Facebook, TikTok) | `initUserSession()`, `handleFiles()`, `setChannelStatus()`, `btnPublish click`, `addPostToHistory()` |

### 3.2. Backend / API / Database (`src/`)
| Module / File | Vai trò | Điểm kết nối dữ liệu |
|---|---|---|
| `Code.gs` | Điều phối Web App (`doGet`), API xác thực tài khoản & Đăng bài | `checkLogin(credentials)`, `publishMultiChannelPost(postData)`, `getAppConfig()` |
| `appsscript.json` | Cấu hình manifest Apps Script (timezone, runtime V8) | V8 Runtime |

---

## 4. TỌA ĐỘ HÀM VÀ TRẠNG THÁI HIỆN CÓ (STATE MAP)
- **`USER_FIELD_MAP`**:
  - `username` -> Cột Tên Đăng Nhập
  - `password` -> Cột Mật Khẩu
  - `fullName` -> Cột Họ và Tên
  - `role` -> Cột Phân Quyền (Product Owner / Quản trị viên / Khách hàng / Kỹ thuật / Đại lý)
  - `branch` -> Cột Chi Nhánh (Q7 / Tân Phú / Toàn quốc)
- **`POST_FIELD_MAP`**:
  - `id` -> Mã bài viết
  - `content` -> Nội dung bài viết (Text Long)
  - `imageCount` -> Số lượng ảnh đính kèm
  - `channels` -> Danh sách kênh xuất bản (YouTube, Facebook, TikTok)
  - `status` -> Trạng thái (Đã đăng `v` / Thất bại `x`)
  - `author` -> Tác giả bài viết (`Tăng Trí Đức (DUC)`)
  - `createdAt` -> Thời gian đăng bài

---

## 5. LIÊN KẾT BỘ 5 FILE KIẾN TRÚC CỐT LÕI SME OS (`hq/sme-os-core/`)
- `hq/sme-os-core/00-CONTEXT-MASTER-PROMPT.md`: Hiến pháp 10 Điều, 8 Nguyên tắc Thiết kế, Chiến lược Ngôn ngữ 4 Tầng.
- `hq/sme-os-core/01-PRODUCT-PHILOSOPHY.md`: Triết lý Thiết kế Sản phẩm (17 Chương + Phụ lục A).
- `hq/sme-os-core/02-BUSINESS-ARCHITECTURE.md`: Kiến trúc Kinh doanh SME (15 Chương).
- `hq/sme-os-core/03-SYSTEM-ARCHITECTURE.md`: Kiến trúc Hệ thống 7 Lớp & Event-Driven (15 Chương).
- `hq/sme-os-core/04-APPLICATION-ARCHITECTURE.md`: Kiến trúc Ứng dụng, 10 Core Schemas, Ma trận 4D `GLOBAL_SCHEMA_MATRIX` & 14 Module Contracts (6 Chương).
- `hq/sme-os-core/05-TECHNOLOGY-ARCHITECTURE.md`: Kiến trúc Công nghệ Phase 1 (GAS/Sheets) $\rightarrow$ Phase 2 (Next.js/Supabase/R2) & SDLC 6 Bước (Chương 0 + 6 Chương).


