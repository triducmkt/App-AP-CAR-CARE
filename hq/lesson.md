# Nhật Ký Lỗi & Bài Học Kinh Nghiệm (Lessons Learned — App AP CAR CARE / SME OS)

> **Quy tắc Bắt buộc (Mandatory Fast-Lookup Rule):**
> Khi bắt đầu trả lời mỗi chat hoặc trước khi sửa lỗi / thiết kế giao diện / viết code, AI Agent **BẮT BUỘC** đọc danh sách mục lục của **2 Scope** dưới đây: **Scope Chung (`[Tất cả / Chung]`)** và **Scope Dự Án (`[SME OS]`)** để tích hợp ngay các quy tắc phòng tránh (`Fast Rule`) vào code chuẩn bị viết, chặn đứng 100% lỗi tái diễn.

---

## ⚡ BẢNG TRA CỨU NHANH (FAST-LOOKUP MASTER MATRIX — MỤC LỤC BÀI HỌC)

| Bug ID | Tọa độ Dòng | Scope / Dự án | Tên Lỗi & Triệu chứng Cốt lõi | Quy tắc Phòng tránh Nhanh (`Fast Rule`) |
| :--- | :---: | :---: | :--- | :--- |
| **ERR-001** | `L40–L52` | `[Tất cả / Chung]` | Lỗi cú pháp Here-String trong PowerShell (`backup.ps1`) do escape `\"` | Không escape `\"` trong PowerShell Here-String; `@"` phải ở cuối dòng mở và `"@` ở sát lề trái dòng đóng. |
| **ERR-002** | `L54–L67` | `[Tất cả / Chung]` | Lỗi Caja Sanitizer crash khi parse `style="..."` inline chứa `animation` & lỗi ghi đè mất code cũ | Cấm dùng `animation` trong inline `style`; luôn khoanh vùng đúng đoạn CSS/HTML cần thay thế thay vì ghi đè mù. |
| **ERR-003** | `L69–L81` | `[SME OS]` | Lỗi biến String JS quá lớn (Base64 > 45.000 ký tự) bị GAS `HtmlService` từ chối & lỗi Info Center chạy vô hạn | Nhúng Base64 lớn vào thuộc tính `src` của thẻ `<img style="display:none">` trong HTML; nén ảnh `<canvas>` xuống `< 300KB`. |
| **ERR-004** | `L83–L96` | `[SME OS]` | Lỗi tính năng hiện ở `/dev` nhưng mất ở `/exec` (Cache GAS) & lỗi mất trạng thái sau khi F5 | Luôn lưu trạng thái tức thời vào `localStorage` (Local-First State) kết hợp đồng bộ Backend; nhắc Hard Refresh `Ctrl + F5`. |
| **ERR-005** | `L98–L111` | `[Tất cả / Chung]` | Lỗi màn hình đen toàn phần do PowerShell nuốt dấu Backtick (`` ` ``) hoặc lồng Template Literal trong `<script>` | **Cấm 100% dùng dấu backtick (`` ` ``) bên trong khối `<script>` của file HTML GAS**; dùng nối chuỗi `'...' + '...'` và kiểm tra bằng `new Function(code)`. |
| **ERR-006** | `L113–L126` | `[Tất cả / Chung]` | Lỗi Demo hiện bản cũ (quên push `gh-pages`), ảnh URL không tồn tại & chạy `backup.ps1` sai thời điểm | Luôn chạy `.\backup.ps1` **TRƯỚC** khi sửa code; chạy `.\deploy-demo.ps1` để đồng bộ `gh-pages`; viết script `.js`/`.ps1` vào `scratch/` thay vì chạy one-liner có dấu `$` hoặc `"`. |
| **ERR-007** | `L128–L151` | `[SME OS]` | **Lỗi Font Tiếng Việt bị vỡ/lệch dấu ở Tiêu đề lớn & Số KPI** do thiếu `subset=vietnamese` và sót CSS cũ trong `<head>` | Bắt buộc nhúng Google Fonts **`Barlow Condensed` + `Be Vietnam Pro` + `JetBrains Mono` (`&subset=vietnamese`)** ở `<head>`; xóa sạch CSS cũ trùng lặp trong `<head><style>` trước khi nạp CSS mới. |
| **ERR-008** | `L153–L178` | `[SME OS]` | **Lỗi giao diện mang "cảm giác AI / rẻ tiền"** do lạm dụng Emoji đa sắc và viền xanh phát sáng tràn lan | **Cấm 100% Emoji màu hệ thống trên UI (`0` emoji)** -> Thay bằng **Icon Vector Line-Art Đơn sắc (`1.65px` SVG)**; áp dụng **Quy tắc 10% Accent (`#0066FF`)** và đường cắt chéo kiến trúc AP. |
| **ERR-009** | `L180–L209` | `[SME OS]` | **Lỗi vỡ bố cục Giao diện Mobile** (Tiêu đề Topbar bị ép thành 9 dòng chữ dọc & lộ đầu Sidebar phía sau Topbar) | Ở `<= 1024px`: (1) Chuyển Sidebar thành **Off-Canvas Drawer (`position: fixed; transform: translateX(-105%)`)** + Backdrop; (2) Chuyển Topbar thành **2 tầng ngang**, tiêu đề có `flex: 1; min-width: 0; white-space: nowrap; text-overflow: ellipsis`. |
| **ERR-010** | `L131–L138` | `[SME OS]` | **Lỗi xung đột màu khi hỗ trợ 2 Theme** (`Dark Blue Carbon Night` & `Showroom Trắng + Sidebar Đen Gradient`) | Mọi màu nền/chữ/viền khu vực làm việc phải dùng biến ngữ nghĩa (`var(--ap-card-bg)`, `var(--ap-text-heading)`...) theo `data-ap-theme="dark|light"`, giữ nguyên Sidebar Đen Gradient ở cả 2 theme. |
| **ERR-011** | `L140–L154` | `[SME OS]` | **Lỗi không Login được & Console báo 404 (`Failed to load resource: 404`)** do lệch ID input (`username` vs `txtUsername`) và thẻ `<img src="">` rỗng | Bắt buộc chạy script đối soát 100% `getElementById(...)` khớp với `id="..."` trong HTML (`Missing IDs: []`); cấm để `<img src="">` rỗng và luôn gắn `<link rel="icon" href="data:...">`. |
| **ERR-012** | `L156–L185` | `[SME OS]` | **Lỗi mất Session đăng nhập khi Reload/F5 trên Google Apps Script iframe** do Sandbox Hash ngẫu nhiên & Storage Partitioning | Phục hồi phiên 4 tầng: `sessionStorage` + `localStorage` + URL Query State (`?u=...` qua `google.script.history.replaceState` & `getLocation`); tự động nạp phiên tức thì không bắt login lại. |
| **ERR-013** | `L187–L215` | `[SME OS]` | **Lỗi Lệch Schema Phân Quyền & Mã Phòng Ban giữa Backend (`Code.gs`) và Frontend (`Index.html`)** khiến toàn bộ nút biến mất và hiện `0/8` | Bắt buộc đồng bộ 100% SSOT `DEFAULT_DEPT_ACCESS_CONFIG` khớp chính xác với `DEFAULT_DEPT_ACCESS_MATRIX`; bổ sung `ADMIN_CEO` vào `allowedRoles`; dùng `CACHE_SCHEMA_VERSION` tự dọn cache trình duyệt. |
| **ERR-014** | `L217–L255` | `[SME OS]` | **Lỗi Reload F5 bị văng về màn hình Login trên GAS `/dev`** do hardcode `#viewLogin active`, check session trễ dòng 7861 và Sandbox Ephemeral Hash | (1) Bỏ `active` ở Login, nhúng Micro-Script đầu `<body>` + CSS `html.ap-authenticated`; (2) Server-Assisted Session: `doGet(e)` inject `serverSession` qua Google Email / `?u=DUC`; (3) Đồng bộ SSOT 1 key `apUserSession`. |
| **ERR-015** | `L257–L285` | `[SME OS]` | **`SyntaxError: Invalid or unexpected token (tệp Code, template.evaluate)`** do chuỗi JS chứa literal `'<?'` bị hiểu nhầm là scriptlet | Cấm viết chuỗi tĩnh chứa `'<?'` trong file HTML GAS; dùng `Utilities.base64Encode()` truyền object từ Server sang Client và giải mã bằng `window.atob()`. |
| **ERR-016** | `L287–L320` | `[SME OS]` | **Lỗi màn hình đen toàn phần & Biến mất 8 nút Phòng Ban ở Sidebar** do dữ liệu cũ trong ScriptProperties thiếu role `ADMIN_CEO` và thiếu Fail-Safe Active Stage | Dùng `sanitizeDeptAccessConfig` đối soát và tự bổ sung `ADMIN_CEO` cho 100% phòng ban; áp dụng Master Admin Bypass (`isMasterAdmin ? d.enabled !== false : ...`); tự động gọi `switchDepartment(curDept || 'DEPT_MKT')` kích hoạt màn hình. |
| **ERR-017** | `L322–L360` | `[SME OS]` | **Lỗi trỏ sai Sheet nguồn (`Staff` ảo vs `Nhân sự` thật) & nghẽn hàm ghi đè `ensureBackendSheetsInitialized` trong `doGet`** khiến màn hình đen, mất dữ liệu và timeout | (1) Khóa cứng SSOT `STAFF: "Nhân sự"`, `CATEGORIES: "Danh mục"`; (2) Bỏ hoàn toàn logic `insertSheet("Staff")` và gỡ `ensureBackendSheetsInitialized()` khỏi `doGet`; (3) Quét đăng nhập trực tiếp Cột H/I/F của Sheet `Nhân sự`; (4) Nuôi dropdown từ Sheet `Danh mục`. |
| **UI-GEN** | `L362–L371` | `[Tất cả / Chung]` | Tổ hợp quy tắc UI/UX cơ bản: đứt đoạn Hover Tooltip, chặn `<input type="file">`, sai tên biến Global & thiếu map cột GET/POST | Dùng `<label for="...">` mở hộp thoại file; kiểm tra đồng bộ cả 2 chiều `GET` và `POST` trong `FIELD_MAP`; kiểm thử cú pháp AST trước khi commit. |

---

## CHI TIẾT CÁC BÀI HỌC KINH NGHIỆM & CÁCH KHẮC PHỤC TRIỆT ĐỂ

### [ERR-001] Lỗi cú pháp Here-String trong PowerShell (`backup.ps1`)
- **Scope / Dự án:** `[Tất cả / Chung]`
- **Triệu chứng:** Chạy `.\backup.ps1` báo lỗi `The string is missing the terminator: "@"` và `Missing closing '}'`, script thoát với code 1.
- **Nguyên nhân gốc:** PowerShell yêu cầu cú pháp Here-String nghiêm ngặt: dấu `@"` phải là ký tự cuối cùng của dòng mở; dấu `"@` phải đứng sát lề trái đầu dòng đóng (không có tab/space trước). Việc dùng `\"` bên trong làm hỏng trình phân tích cú pháp.
- **Cách giải quyết:**
  1. Không bao giờ escape dấu nháy `\"` tại dòng mở/đóng của PowerShell Here-String.
  2. Luôn chạy `.\backup.ps1` đầu tiên trước khi thực hiện bất kỳ thao tác sửa code nào trong `src/`.

### [ERR-002] Lỗi Caja Sanitizer crash khi parse thuộc tính inline style chứa `animation` & Lỗi ghi đè mất code cũ
- **Scope / Dự án:** `[Tất cả / Chung]`
- **Triệu chứng:** Báo lỗi ở Client Console (F12): `Uncaught SyntaxError: Failed to execute 'appendChild' on 'Node': Invalid or unexpected token` khi gán `innerHTML` có chứa `style="animation: ..."`.
- **Nguyên nhân gốc:** Bộ lọc bảo mật Caja của Google Apps Script (`HtmlService`) bị lỗi parser khi gặp thuộc tính `animation` viết trực tiếp trong inline `style="..."`. Ngoài ra, việc ghi đè toàn bộ file mà không kiểm tra ranh giới các khối (`#viewLogin` vs `#viewHome`) dễ làm mất hiệu ứng gốc.
- **Cách giải quyết:**
  1. Tuyệt đối không dùng thuộc tính `animation` trực tiếp trong inline `style`. Hãy định nghĩa trong thẻ `<style>` tĩnh bằng class CSS rồi gán class cho phần tử.
  2. Khi nâng cấp giao diện `#viewHome`, phải xác định chính xác tọa độ dòng bắt đầu và kết thúc của `#viewLogin` để bảo toàn 100% màn hình Login v11.

### [ERR-003] Lỗi biến String quá lớn (Base64) bị Google Apps Script `HtmlService` từ chối
- **Scope / Dự án:** `[SME OS]`
- **Triệu chứng:** Nhúng một chuỗi Base64 ảnh rất dài (`> 45.000` ký tự) vào biến JS (`var img = "data:image/..."`) hoặc lưu thẳng vào 1 ô Google Sheet khiến trình biên dịch nghẽn hoặc báo lỗi vượt giới hạn 50.000 ký tự/ô của Google Sheets.
- **Nguyên nhân gốc:** Parser JS của `HtmlService` và giới hạn vật lý của ô Google Sheets không cho phép chứa chuỗi Base64 nguyên bản quá lớn.
- **Cách giải quyết:**
  1. Với ảnh tĩnh thương hiệu (như Logo tròn AP CAR CARE): nhúng vào thuộc tính `src` của thẻ `<img class="hero-intro-img">` trong HTML, sau đó dùng JS đọc lại qua `.getAttribute('src')` để tái sử dụng cho Logo đỉnh Sidebar và Watermark chìm dưới nền.
  2. Với ảnh người dùng tải lên: dùng `<canvas>` nén xuống `< 300KB` và lưu lên Google Drive (chỉ lưu URL/ID vào Sheet).

### [ERR-004] Lỗi tính năng hiển thị ở bản `/dev` nhưng biến mất ở bản `/exec` & Lỗi mất State khi F5
- **Scope / Dự án:** `[SME OS]`
- **Triệu chứng:** Sau khi đổi cấu hình (như bật/tắt Section phòng ban hoặc đổi Theme), người dùng nhấn F5 thấy giao diện quay về trạng thái cũ nếu Backend xử lý bất đồng bộ chưa xong.
- **Nguyên nhân gốc:** Phụ thuộc 100% vào phản hồi từ Backend mà thiếu lớp lưu trữ tức thời tại trình duyệt (`Local-First State`).
- **Cách giải quyết:**
  1. Mọi thay đổi cấu hình quan trọng (Phân quyền `apDeptAccessMatrixV5`, Chế độ giao diện `apActiveThemeModeV5`, Hồ sơ `apUserProfileV5`) đều phải lưu tức thời vào `localStorage` ngay khi người dùng thao tác (`0.001s`), song song với việc đẩy xuống `Code.gs`.
  2. Khi khởi động ứng dụng (`AppStore.init()`), đọc ngay cấu hình từ `localStorage` để render giao diện tức thì không độ trễ.

### [ERR-005] Lỗi màn hình đen toàn phần do PowerShell nuốt dấu Backtick (`` ` ``) hoặc lỗi Template Literal trong `<script>`
- **Scope / Dự án:** `[Tất cả / Chung]`
- **Triệu chứng:** Trang web bị đơ hoặc không chạy sự kiện JS do lỗi `SyntaxError: Unexpected identifier` hoặc `Unexpected token '<'`.
- **Nguyên nhân gốc:** Dấu backtick (`` ` ``) trong JavaScript rất dễ bị PowerShell nuốt mất khi chạy script hoặc bị lỗi khi lồng biểu thức phức tạp trong `HtmlService`.
- **Cách giải quyết:**
  1. **Quy tắc Bất khả xâm phạm:** Bên trong cặp thẻ `<script>...</script>` của `src/Index.html`, giữ số lượng ký tự backtick bằng **`0` tuyệt đối**. Luôn dùng phép nối chuỗi chuẩn `'...' + '...'`.
  2. Trước khi hoàn tất mỗi task sửa `Index.html` hoặc `Code.gs`, bắt buộc chạy kiểm thử cú pháp tự động bằng Node.js (`new Function(scriptContent)`).

### [ERR-006] Lỗi Demo hiện bản cũ / Ảnh không tồn tại / Chạy `backup.ps1` sai thời điểm
- **Scope / Dự án:** `[Tất cả / Chung]`
- **Triệu chứng:** Mở link GitHub Pages vẫn thấy giao diện cũ hoặc lệnh `node -e "..."` trong PowerShell bị lỗi mất dấu nháy kép.
- **Nguyên nhân gốc:** (1) Chỉ push nhánh `main` mà quên chạy `.\deploy-demo.ps1` để cập nhật nhánh `gh-pages`; (2) PowerShell 5.1 tự động tước bỏ dấu nháy kép bên trong chuỗi đối số truyền cho `node -e`.
- **Cách giải quyết:**
  1. Luôn chạy `.\backup.ps1` **trước** khi sửa code; sau khi commit xong trên `main`, chạy `.\deploy-demo.ps1` để đồng bộ ngay lên `gh-pages`.
  2. Mọi script lắp ráp hoặc kiểm thử bằng Node.js đều phải ghi thành file `.js` trong thư mục `scratch/` rồi gọi `node "path/to/script.js"`.

---

### [ERR-007] Lỗi Font Tiếng Việt bị vỡ/lệch dấu ở Tiêu đề lớn & Số KPI do thiếu `subset=vietnamese` và sót CSS cũ trong `<head>` (2026-10-24)
- **Scope / Dự án:** `[SME OS]`
- **Triệu chứng:** Các dòng tiêu đề lớn (`"BAN GIÁM ĐỐC & PHÊ DUYỆT CHIẾN LƯỢC"`, `"PHÒNG KỸ THUẬT, KHOANG XE & LỆNH RO"`) và các con số KPI (`"2.480.000.000 đ"`, `"03 Lệnh"`) bị lỗi font rõ rệt: chữ cái không dấu thì dày thô, còn chữ cái có dấu Tiếng Việt (`Đ`, `Ố`, `Ệ`, `ƯỢ`, `Ỹ`, `Ậ`, `Ữ`) bị biến dạng, lệch nét sang font hệ thống khác, làm mất hoàn toàn vẻ cao cấp (Hình đính kèm 1 & 2 của anh Đức).
- **Nguyên nhân gốc rễ:**
  1. Trong CSS khai báo font tiêu đề chưa được nhúng đầy đủ bộ ký tự Tiếng Việt (`subset=vietnamese`) trong thẻ `<link>` Google Fonts ở `<head>`, hoặc dùng độ đậm `weight: 900` của các font thiếu hỗ trợ dấu Tiếng Việt kép (`ƯỢ`, `Ệ`, `Ậ`).
  2. Khi overhaul giao diện `#viewHome`, khối CSS cũ của `#viewHome` nằm trong `<head><style>` (`L785–L2333`) vẫn còn tồn tại và xung đột trực tiếp với các quy tắc CSS mới.
- **Cách giải quyết & Quy tắc Phòng tránh (`Fast Rule`):**
  1. **Chuẩn hóa Cặp Font Tiếng Việt Cao Cấp Ngành Ô Tô (Phương án A — Đã được PO anh Đức phê duyệt):**
     - Nhúng trực tiếp tại `<head>` bộ 3 font chuẩn hỗ trợ 100% Tiếng Việt (`&display=swap&subset=vietnamese`):
       * `--font-display: 'Barlow Condensed', 'Be Vietnam Pro', sans-serif` (Weights `600`, `700`): Dùng cho Tiêu đề lớn và Con số KPI — dáng chữ cao ráo, góc cạnh cơ khí chuẩn phong cách Banner Porsche của CEO anh Lộc, dấu Tiếng Việt gọn và cân đối tuyệt đối.
       * `--font-sans: 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif` (Weights `400`, `500`, `600`, `700`): Bộ font thiết kế chuyên biệt cho Tiếng Việt, dùng cho toàn bộ Menu Sidebar, Nút bấm, Bảng dữ liệu và Nội dung.
       * `--font-mono: 'JetBrains Mono', monospace` (`tabular-nums`): Dùng cho Biển số xe, Mã lệnh `RO`/`SKU` và Tiền tệ.
  2. **Dọn sạch 100% CSS tàn dư trong `<head>`:** Khi nâng cấp CSS của `#viewHome`, bắt buộc thay thế trực tiếp đúng phân đoạn CSS của `#viewHome` trong `<head><style>`, tuyệt đối không để tồn tại 2 khối CSS `#viewHome` song song trong cùng 1 file.

---

### [ERR-008] Lỗi giao diện mang "cảm giác AI / rẻ tiền" do lạm dụng Emoji đa sắc hệ thống và viền xanh phát sáng tràn lan (2026-10-24)
- **Scope / Dự án:** `[SME OS]`
- **Triệu chứng:** Dù đã có nền tối và hiệu ứng hover, tổng thể giao diện vẫn mang cảm giác "do AI tự sinh ra (AI-generated template)" và kém sang trọng vì chứa hàng chục icon emoji màu mè cùng viền xanh neon phát sáng lặp lại ở mọi khung thẻ.
- **Nguyên nhân gốc rễ:**
  1. Trình duyệt trên Windows render các ký tự Emoji Unicode bằng bộ màu hoạt hình sặc sỡ (vàng chóe, hồng, đỏ, xanh lá), hoàn toàn đối lập với ngôn ngữ thiết kế tối giản, nam tính của ngành Detailing & Độ xe siêu sang.
  2. Lạm dụng hiệu ứng phát sáng (`box-shadow` glow) và khung viền viên thuốc (`border-radius: 999px`) cho tất cả các thành phần phụ khiến màn hình bị nhiễu thị giác.
- **Cách giải quyết & 5 Quy tắc Thiết kế "Humanizer" (`Fast Rule`):**
  1. **Cấm tuyệt đối Emoji màu hệ thống (`Zero-Emoji Policy`):** Kiểm tra bằng Regex `/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu` đảm bảo **0 emoji** trong toàn bộ HTML/JS của `#viewHome`.
  2. **Hệ thống Icon Vector Line-Art Đơn sắc (`1.65px` Monochrome SVG):** Sử dụng bộ icon nét mảnh `1.65px` (`stroke="currentColor" fill="none"`) đồng nhất 100% với bộ icon trên Banner chuẩn của CEO anh Lộc (Hình 3).
  3. **Quy tắc Điểm nhấn 10% (`10% Cobalt Accent Rule`):** Dùng đường viền cấu trúc mảnh như sợi tóc (`1px solid var(--ap-border-subtle)`), loại bỏ viền neon phát sáng tràn lan; chỉ dùng màu **Xanh AP Cobalt (`#0066FF` / `#0A6CFF`)** tại đúng các điểm nhấn chiến lược (nút đang chọn, thanh vạch đứng `4px` bên trái Hero, gạch chân `36px` dưới thẻ KPI và nút CTA chính).
  4. **Dấu ấn Đường cắt chéo Kiến trúc AP (`.ap-dept-hero::after`):** Đưa họa tiết **dải cắt chéo kép Đen Tuyền + Xanh Cobalt góc `-28deg`** (lấy từ Banner Porsche 911 của CEO anh Lộc) vào thanh tiêu đề phòng ban để tạo cá tính thiết kế độc bản của AP CAR CARE.
  5. **Tinh giản dòng phụ KPI:** Thay các icon emoji ở dòng phụ KPI bằng chấm tròn tín hiệu `6px` (`border-radius: 50%; background: var(--ap-accent)`) tinh tế.

---

### [ERR-009] Lỗi vỡ bố cục nghiêm trọng trên Giao diện Mobile: Tiêu đề Topbar bị ép thành 9 dòng chữ dọc & lộ đầu Sidebar (2026-10-24)
- **Scope / Dự án:** `[SME OS]`
- **Triệu chứng:** Trên màn hình điện thoại (Hình đính kèm 2 của anh Đức):
  1. Tiêu đề phòng ban trên Topbar (`"PHÒNG KỸ THUẬT, KHOANG XE & LỆNH RO"`) bị ép vào một cột hẹp ~80px bên trái và gãy xuống thành **9 dòng chữ dọc** rất xấu.
  2. Cụm 3 nút bên phải (`Góc nhìn Admin`, `OptiSync`, `Cài đặt Admin`) chiếm hết diện tích làm Topbar phình to chiếm 1/3 màn hình.
  3. Phần đầu của Sidebar (`AP CAR CARE`) bị lộ cắt ngang nửa chữ ở mép trên phía sau Topbar.
- **Nguyên nhân gốc rễ:**
  1. `.ap-topbar` chưa có bố cục riêng cho Mobile mà dùng chung `display: flex; justify-content: space-between` của Desktop; khi màn hình hẹp, khối `.ap-topbar-right` không co lại được nên ép `.ap-topbar-left` về bề ngang tối thiểu.
  2. Trong `@media (max-width: 1024px)`, `.ap-sidebar` chỉ được đặt `position: relative; height: auto` thay vì tách thành ngăn kéo trượt (Off-Canvas Drawer), gây chồng lấn với vùng cuộn của trang.
- **Cách giải quyết & Quy tắc Thiết kế Responsive Mobile + PC (`Fast Rule`):**
  1. **Bắt buộc dùng Off-Canvas Sidebar Drawer trên Mobile/Tablet (`<= 1024px`):**
     - Đặt `.ap-sidebar { position: fixed; top: 0; left: 0; bottom: 0; width: 286px; transform: translateX(-105%); z-index: 1250; }` kèm lớp nền mờ `.ap-sidebar-backdrop`.
     - Hiển thị nút Hamburger `#btnMobileMenuToggle` (`38x38px`) ở góc trái Topbar để mở Drawer và tự động đóng Drawer ngay khi người dùng chọn bất kỳ phòng ban nào.
  2. **Cấu trúc Topbar Mobile 2 Tầng chống gãy chữ dọc 100%:**
     - Ở `@media (max-width: 1024px)`, `.ap-topbar` chuyển sang `flex-direction: column; align-items: stretch`:
       * **Tầng 1 (`.ap-topbar-left`):** Chiếm trọn `width: 100%`, gồm `[#btnMobileMenuToggle]` + `[#topbarActiveTitle]` với ràng buộc cứng `flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: clamp(16px, 4.2vw, 20px)` -> Đảm bảo tiêu đề luôn nằm gọn trên **1 dòng ngang duy nhất** ở mọi kích thước điện thoại.
       * **Tầng 2 (`.ap-topbar-right`):** Nằm gọn bên dưới với đường kẻ mảnh phân cách, chứa bộ chọn `Role Preview` (`flex: 1`), nút đổi nhanh Theme (`#btnQuickThemeToggle`) và nút Cài đặt thu gọn.
  3. **Ràng buộc Responsive cho Hero, AI Strip & Bảng dữ liệu:**
     - Ở `<= 1024px`, `.ap-dept-hero` và `.ap-ai-insight-strip` chuyển sang `flex-direction: column`, các nút bấm hành động tự động mở rộng `width: 100%` vừa tầm ngón tay chạm.

---

### [ERR-010] Lỗi xung đột màu sắc khi triển khai song song Theme Tối (`Carbon Night`) và Theme Trắng (`Showroom Platinum`) (2026-10-24)
- **Scope / Dự án:** `[SME OS]`
- **Triệu chứng:** Khi bổ sung thêm Theme Trắng (`AP Showroom Platinum White` với Sidebar Đen Gradient Premium) bên cạnh Theme Tối (`AP Carbon Night`), nếu các thẻ hoặc bảng dùng mã màu tĩnh (`color: #FFFFFF` hoặc `background: rgba(6,10,20,0.8)`) thì khi chuyển sang nền trắng chữ sẽ bị mờ hoặc biến mất.
- **Nguyên nhân gốc rễ:** Gán cứng mã màu cho từng thành phần thay vì sử dụng hệ thống biến CSS ngữ nghĩa (Semantic Design Tokens) phân tách giữa Sidebar (luôn tối) và Main Stage (đổi theo Theme).
- **Cách giải quyết & Quy tắc Phòng tránh (`Fast Rule`):**
  1. **Cô lập màu Sidebar cố định:** Toàn bộ các class bên trong `.ap-sidebar` luôn giữ tông màu sáng trên nền **Đen Obsidian Gradient (`--ap-sidebar-bg`)** cố định ở cả 2 theme để tạo độ tương phản sang trọng như thiết kế Showroom AP CAR CARE của CEO anh Lộc.
  2. **Biến hóa 100% vùng làm việc (`#apMainStage`) qua `data-ap-theme="dark" | "light"`:** Toàn bộ các thành phần trong `.ap-main-stage` bắt buộc dùng biến CSS ngữ nghĩa (`var(--ap-stage-bg)`, `var(--ap-card-bg)`, `var(--ap-card-alt-bg)`, `var(--ap-text-heading)`, `var(--ap-text-main)`, `var(--ap-text-muted)`, `var(--ap-border-subtle)`, `var(--ap-accent)`).

---

### [ERR-011] Lỗi không Đăng nhập được & Console báo `Failed to load resource: the server responded with a status of 404 ()` (2026-10-24)
- **Scope / Dự án:** `[SME OS]`
- **Triệu chứng:** Khi mở ứng dụng và bấm nút `ĐĂNG NHẬP` tại `#viewLogin`, hệ thống đứng yên không chuyển sang `#viewHome` và không hiện thông báo lỗi, đồng thời Console trình duyệt báo `Failed to load resource: the server responded with a status of 404 ()`.
- **Nguyên nhân gốc rễ:**
  1. **Lệch ID phần tử DOM giữa HTML và JS:** Trong HTML của `#viewLogin`, các ô nhập liệu có ID là `txtUsername`, `txtPassword`, `btnLogin`, nhưng khi viết lại khối `<script>` mới lại gọi `getElementById('username')`, `getElementById('password')`, `getElementById('btnSubmit')` (trả về `null`). Đồng thời hàm `setFeedback()` thiếu class `.active` nên dòng báo lỗi bị ẩn (`opacity: 0`).
  2. **Thuộc tính `<img src="">` rỗng và thiếu inline Favicon:** Các thẻ `<img id="sidebarCompanyLogoImg" src="">` và `<img id="workspaceWatermarkLogoImg" src="">` để `src=""` rỗng trước khi JS gán Base64 khiến trình duyệt gọi request tải tài nguyên rỗng (cùng request `/favicon.ico` mặc định) dẫn tới lỗi `404`.
- **Cách giải quyết & Quy tắc Phòng tránh (`Fast Rule`):**
  1. **Kiểm toán Tự động 100% ID DOM (`Zero Missing IDs Audit`):** Trước khi commit bất kỳ thay đổi nào ở `src/Index.html`, bắt buộc chạy lệnh kiểm tra đối chiếu toàn bộ `getElementById('...')` trong `<script>` với tập hợp `id="..."` trong HTML, đảm bảo `Missing IDs: []`.
  2. **Cấm để `<img src="">` rỗng & Bắt buộc nhúng Inline SVG Favicon:** Luôn khởi tạo `<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">` cho các thẻ ảnh chờ nạp Base64, gọi `applyLogoSlotsToDOM()` ngay khi khởi động script, và gắn `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,...">` trong `<head>`.

---

### [ERR-012] Lỗi mất Session đăng nhập khi Reload / F5 trên Google Apps Script iframe (2026-10-25)
- **Scope / Dự án:** `[SME OS]`
- **Triệu chứng:** Người dùng đăng nhập thành công vào app (`#viewHome`), nhưng mỗi khi nhấn F5 hoặc tải lại trang web app (`script.google.com/macros/s/.../exec`) thì toàn bộ trạng thái session biến mất, ứng dụng lập tức văng về màn hình đăng nhập `#viewLogin` yêu cầu nhập lại mật khẩu từ đầu.
- **Nguyên nhân gốc rễ:**
  1. Google Apps Script Web App được nhúng trong một thẻ `iframe` với domain ngẫu nhiên `https://n-<hash>-script.googleusercontent.com/userCodeAppPanel`. Mỗi lần người dùng F5 hoặc reload trang, Google Apps Script tạo ra một mã băm hash prefix ngẫu nhiên mới (`n-<hash1>` -> `n-<hash2>`).
  2. Dưới cơ chế **Third-Party Storage Partitioning** của trình duyệt hiện đại (Chrome 115+), `localStorage` và `sessionStorage` bị cô lập theo từng origin iframe riêng biệt. Khi hash prefix đổi, origin cũ bị hủy và dữ liệu `localStorage` không thể đọc chéo sang origin mới, dẫn đến `localStorage.getItem('apUserSession')` trả về `null`.
  3. Chỉ lưu session vào `localStorage` cục bộ mà không đồng bộ lên URL thanh địa chỉ của cửa sổ mẹ (`script.google.com`).
- **Cách giải quyết & Quy tắc Phòng tránh (`Fast Rule`):**
  1. **Áp dụng Cơ chế Khôi phục Phiên Đa Tầng 4 Lớp (4-Tier Resilient Session):**
     * **Tầng 1 (URL State qua `google.script.history.replaceState`):** Ngay khi đăng nhập thành công, gọi `google.script.history.replaceState({ u: username }, null, '?u=' + encodeURIComponent(username))`. Điều này gắn tham số `?u=DUC` trực tiếp lên thanh URL của trình duyệt mẹ `script.google.com`. Khi F5, URL này vẫn được bảo toàn 100%.
     * **Tầng 2 (`google.script.url.getLocation`):** Khi app khởi động trong iframe, gọi `google.script.url.getLocation(function(loc) { if (loc.parameter.u) { ... } })` để trích xuất ngay username được truyền từ URL cửa sổ mẹ.
     * **Tầng 3 (`URLSearchParams(window.location.search)`):** Hỗ trợ môi trường web tĩnh hoặc GitHub Pages đọc query parameter `?u=...` tự động.
     * **Tầng 4 (`sessionStorage` & `localStorage`):** Lưu trữ song song trong bộ nhớ trình duyệt cho các phiên chuyển view nội bộ.
  2. **Hàm `restoreUserSession()` Tự Động Khôi Phục:** Đặt ở cuối `<script>`, kiểm tra tuần tự 4 tầng trên. Nếu tìm thấy session hoặc URL parameter hợp lệ thì tự động chuyển sang `#viewHome` tức thì trong `0.01s`, loại bỏ hoàn toàn việc bị văng về màn hình Login.

---

### [ERR-013] Lỗi Lệch Schema Phân Quyền & Mã Phòng Ban giữa Backend (`Code.gs`) và Frontend (`Index.html`) (2026-10-25)
- **Scope / Dự án:** `[SME OS]`
- **Triệu chứng:** Người dùng đăng nhập tài khoản Admin/CEO (`DUC`), nhưng toàn bộ 8 nút shortcut phòng ban trên Sidebar biến mất sạch sẽ, huy hiệu hiện `0/8` hoặc khu vực phòng ban trống trơn, không thể kéo thả sắp xếp nút.
- **Nguyên nhân gốc rễ:**
  1. Frontend định nghĩa 8 phòng ban chuẩn hóa (`DEPT_CEO`, `DEPT_MKT`, `DEPT_SALE`, `DEPT_TECH`, `DEPT_HR`, `DEPT_INV`, `DEPT_FIN`, `DEPT_OPS`) và vai trò của user là `ADMIN_CEO`.
  2. Backend `Code.gs` vẫn còn giữ cấu hình cũ từ giai đoạn dựng khung (`DEPT_EXEC`, `DEPT_WORKSHOP`, `DEPT_PARTS`...) và danh sách quyền `allowedRoles: ["CEO_FOUNDER", "ADMIN_GĐ"]` (**hoàn toàn không có `ADMIN_CEO`**).
  3. Khi app vừa nạp xong, `getWhiteLabelAndSystemBundle()` trả về dữ liệu cũ đè lên Client, hàm `renderSidebarDepartmentShortcuts()` đối soát vai trò `ADMIN_CEO` với từng phòng ban đều trả về `false` $\rightarrow$ biến toàn bộ nút thành 0.
  4. Trình duyệt client lưu cache `localStorage.setItem('apDeptAccessMatrixV5', ...)` mảng 0 phòng ban này khiến các lần F5 tiếp theo tiếp tục bị kẹt.
- **Cách giải quyết & Quy tắc Phòng tránh (`Fast Rule`):**
  1. **Đồng bộ 100% SSOT `DEFAULT_DEPT_ACCESS_CONFIG` với `DEFAULT_DEPT_ACCESS_MATRIX`:** Đảm bảo toàn bộ 8 mã `deptId` và danh sách `allowedRoles` (bắt buộc luôn có `ADMIN_CEO`) khớp từng ký tự giữa Backend và Frontend.
  2. **Cơ chế Tự Thanh Lọc Cache Trình Duyệt (`AP_CACHE_SCHEMA_VERSION` Guard):** Bổ sung biến phiên bản cache (ví dụ `v2.2_clean_20261025`). Khi phát hiện phiên bản cache cũ hơn, app tự động xóa sạch `apDeptAccessMatrixV5` và nạp lại từ SSOT mặc định chuẩn.

---

### [ERR-014] Lỗi Reload F5 bị văng về màn hình Login trên Google Apps Script iframe (`/dev`) (2026-10-25)
- **Scope / Dự án:** `[SME OS]`
- **Triệu chứng:** Người dùng đăng nhập thành công vào app trên link test `/dev` hoặc `/exec`. Khi nhấn F5 reload hoặc mở tab mới, hệ thống lập tức đá văng người dùng về màn hình đăng nhập v11 và bắt nhập lại mật khẩu từ đầu, không tự động giữ phiên.
- **Nguyên nhân gốc rễ (Bài học đối chứng từ TDCM Team App):**
  1. **Đảo ngược quyền hiển thị ban đầu (Inversion of View Control):** Ở TDCM Team App, khung App Shell luôn được vẽ sẵn ngay lập tức, modal đăng nhập chỉ là popup nhỏ `#loginMiniModal` (`display: none`). Nhưng ở AP CAR CARE, màn hình Login toàn trang bị hardcode class `active` (`<div class="spa-view spa-view-login active" id="viewLogin">`), view Home bị ẩn. Trình duyệt bắt buộc phải render Login trước.
  2. **Thời điểm kiểm tra Session quá trễ:** Hàm `restoreUserSession()` đặt ở dòng 7861 (cuối cùng của file sau 150KB script!). Trong suốt thời gian trình duyệt tải 7860 dòng code, người dùng luôn thấy màn hình Đăng nhập chắn trước mắt.
  3. **Phân mảnh khóa Session trong Client:** Lúc Login thì lưu vào `apUserSession`, nhưng trong hàm `AppStore.init()` lại đọc từ `apUserProfileV5` (vốn chỉ lưu khi đổi màu yêu thích), dẫn đến xung đột và ghi đè session rỗng.
  4. **Cơ chế Sandbox Ephemeral Hash của Google Apps Script ở môi trường `/dev`:** Khi reload trên `/dev`, GAS có thể sinh ra origin sandbox iframe mới (`n-token...`), trình duyệt cô lập `localStorage` của origin cũ. Trong khi đó, Backend `doGet(e)` hoàn toàn không inject thông tin phiên của Google Account (`Session.getActiveUser().getEmail()`) hay URL param `?u=DUC` xuống HTML template để Client tự phục hồi.
- **Cách giải quyết & Quy tắc Phòng tránh (`Fast Rule`):**
  1. **Zero-Flash Session Guard:** Bỏ class `active` ở `#viewLogin`. Nhúng một đoạn Micro-Script đồng bộ siêu tốc nằm ngay đầu `<body>` (dòng 1) kiểm tra `localStorage`/`sessionStorage` và `serverSessionData`. Nếu có phiên, lập tức gắn class `ap-authenticated` lên `<html>` trong 0.0001s kết hợp CSS `html.ap-authenticated #viewHome { display: block !important; }`, triệt tiêu 100% hiện tượng chớp màn hình Login.
  2. **Server-Assisted Session Injection:** Trong `Code.gs` hàm `doGet(e)`, tự động nhận diện người dùng qua `Session.getActiveUser().getEmail()` (khớp `triduccarmedia@gmail.com`) hoặc URL param `?u=DUC`, inject thẳng vào `template.serverSession = JSON.stringify(serverUser)`. Dù Client có bị đổi sandbox origin hay mất `localStorage`, Client vẫn lấy được session từ Server và tự động đăng nhập thẳng.
  3. **Đồng bộ 100% SSOT khóa `apUserSession`:** Thống nhất dùng duy nhất một khóa `apUserSession` xuyên suốt toàn bộ app từ Client đến Server.
  4. **Tự động Khởi tạo 16 Bảng dữ liệu SME OS:** Nâng cấp `ensureBackendSheetsInitialized()` tự động tạo toàn bộ 16 sheets trong `PM_CONFIG.SHEETS` với Dòng 10 Tiêu đề cột chuẩn, Dòng 11 Hướng dẫn, và Dòng 12 Dữ liệu mẫu.

---

### [ERR-015] Lỗi SyntaxError: Invalid or unexpected token tại template.evaluate() do chuỗi JS chứa literal `'<?'` (2026-10-25)
- **Scope / Dự án:** `[SME OS]`
- **Triệu chứng:** Khi mở link web app Google Apps Script (bản `/dev` hoặc `/exec`), màn hình báo lỗi sập toàn bộ: `SyntaxError: Invalid or unexpected token (dòng 1132, tệp "Code")`. Dòng 1132 trong `Code.gs` là lệnh `return template.evaluate()`.
- **Nguyên nhân gốc rễ:**
  1. Trình xử lý mẫu (HTML Template Compiler) của Google Apps Script quét toàn bộ file HTML để tìm các thẻ Scriptlet mở (`<?`, `<?=`, `<?!=`).
  2. Nếu bên trong một khối `<script>` của file HTML có chứa chuỗi literal `'<?'` (ví dụ: `sRaw.indexOf('<?') === -1`), trình biên dịch của Google Apps Script hiểu nhầm đó là mở đầu của một server-side scriptlet mới.
  3. Đoạn mã JS nằm sau dấu `'<?'` (như `') === -1) {`) bị gom vào mã thực thi server-side mà không có thẻ đóng `?>` tương ứng, dẫn đến lỗi cú pháp nghiêm trọng `SyntaxError: Invalid or unexpected token`.
  4. Ngoài ra, việc nhúng thẳng chuỗi JSON chưa escape vào thuộc tính HTML `data-session="<?!= JSON.stringify(...) ?>"` sẽ làm vỡ dấu ngoặc kép `"` của thuộc tính HTML.
- **Cách giải quyết & Quy tắc Phòng tránh (`Fast Rule`):**
  1. **Cấm tuyệt đối viết chuỗi `'<?'` trong file HTML GAS:** Khi cần so sánh chuỗi, sử dụng `indexOf('<')` hoặc tách chuỗi `'<' + '?'` để parser của Google không bị kích hoạt nhầm.
  2. **Chuẩn hóa Server-to-Client Data qua Base64:** Phía Server `Code.gs`, luôn mã hóa dữ liệu thành Base64 trước khi truyền vào Template:
     `template.serverSessionBase64 = serverUser ? Utilities.base64Encode(JSON.stringify(serverUser), Utilities.Charset.UTF_8) : "";`
  3. Thuộc tính HTML nhận giá trị sạch: `<div id="serverSessionData" data-session="<?!= serverSessionBase64 ?>"></div>` (chuỗi Base64 100% không chứa nháy kép, không chứa ký tự đặc biệt).
  4. Phía Client giải mã an toàn qua:
     `var sJson = decodeURIComponent(escape(window.atob(sB64))); var sObj = JSON.parse(sJson);`

---

### [ERR-016] Lỗi màn hình đen toàn phần & Biến mất 8 nút Phòng Ban ở Sidebar do dữ liệu cũ thiếu role `ADMIN_CEO` & Thiếu Fail-Safe Stage Activation (2026-10-25)
- **Scope / Dự án:** `[SME OS]`
- **Triệu chứng:** Người dùng đăng nhập thành công vào app với tài khoản `DUC` (Role: Admin • Ban Giám Đốc), tuy nhiên khu vực "PHÂN HỆ PHÒNG BAN" dưới Sidebar hoàn toàn trống trơn (không có bất kỳ nút nào), và toàn bộ khu vực làm việc chính bên phải (`.ap-main-stage`) bị đen tuyền/trống rỗng, không hiển thị bất kỳ nội dung nào.
- **Nguyên nhân gốc rễ:**
  1. **Tồn dư dữ liệu phân quyền cũ trên ScriptProperties & LocalStorage:** `ScriptProperties` trên Google Apps Script (và `localStorage.apDeptAccessMatrixV5`) lưu cấu hình từ phiên trước đó, trong đó mảng `allowedRoles` của các phòng ban chỉ có `["CEO_FOUNDER", "ADMIN_GD"]` mà hoàn toàn thiếu mã định danh `ADMIN_CEO`.
  2. **Kiểm tra quyền cứng nhắc ở Frontend:** Hàm `renderSidebarDepartmentShortcuts()` kiểm tra `var hasAccess = d.enabled && (d.allowedRoles || []).indexOf(roleCode) !== -1;`. Với user `ADMIN_CEO`, toàn bộ 8 phòng ban đều trả về `false`, dẫn tới biến `html = ''` và 0 nút nào được render.
  3. **Không có phòng ban đầu tiên (`firstVisibleDept = null`):** Khi không có phòng ban nào khả dụng, biến `firstVisibleDept` bị `null`, hàm `AppStore.switchDepartment(...)` hoàn toàn không được gọi.
  4. **Thiếu cơ chế kích hoạt màn hình an toàn (No Fail-Safe Active Stage):** Toàn bộ các thẻ `.ap-dept-pane` đều có CSS mặc định `display: none`. Vì không có phòng ban nào được kích hoạt (không có pane nào mang class `.active`), toàn bộ màn hình làm việc chính biến thành một màu đen trống rỗng.
- **Cách giải quyết & Quy tắc Phòng tránh (`Fast Rule`):**
  1. **Khử khuẩn và Chuẩn hóa Dữ liệu Phân quyền (`sanitizeDeptAccessConfig`):**
     - Tại cả Backend (`Code.gs`) và Frontend (`Index.html`), mọi dữ liệu cấu hình phòng ban đọc từ `ScriptProperties` hoặc `localStorage` đều phải chạy qua hàm kiểm định: đối soát đủ 8 phòng ban chuẩn (`DEPT_CEO`, `DEPT_MKT`, `DEPT_SALE`, `DEPT_TECH`, `DEPT_HR`, `DEPT_INV`, `DEPT_FIN`, `DEPT_OPS`), loại bỏ các mã phòng ban cũ lỗi thời (`DEPT_EXEC`), và tự động chèn `ADMIN_CEO` vào `allowedRoles` của 100% phòng ban.
  2. **Quyền Tối Thượng Master Admin Bypass (`ADMIN_CEO` / `CEO_FOUNDER`):**
     - Tại tất cả các hàm kiểm tra quyền truy cập phòng ban (`canUserAccessDepartment`, `renderSidebarDepartmentShortcuts`, `applySavedSidebarOrderToConfig`), nếu `roleCode === 'ADMIN_CEO' || roleCode === 'CEO_FOUNDER'` thì quyền truy cập luôn được đảm bảo: `hasAccess = (d.enabled !== false)`. Admin/CEO không bao giờ bị khóa ngoài chỉ vì sơ suất thiếu tên role trong ma trận.
  3. **Cơ chế Kích hoạt Màn hình An toàn (Fail-Safe Active Stage):**
     - Trong `AppStore.init()` và `renderSidebarDepartmentShortcuts()`, sau khi vẽ xong các nút, hệ thống luôn kiểm tra và ép kích hoạt một phòng ban hợp lệ:
       `var curDept = AppStore.state.activeDepartment || firstVisibleDept || 'DEPT_MKT';`
       `AppStore.switchDepartment(curDept);`
     - Đảm bảo ít nhất một pane (mặc định là `DEPT_MKT`) luôn luôn mang class `.active`, triệt tiêu 100% khả năng bị màn hình đen trống rỗng.

---

### [ERR-017] Lỗi Trỏ Sai Sheet Nguồn (`Staff` ảo vs `Nhân sự` thật) & Nghẽn Hàm Ghi Đè `ensureBackendSheetsInitialized` Trong `doGet`
- **Scope / Dự án:** `[SME OS]`
- **Triệu chứng:** Người dùng đăng nhập tài khoản `DUC` / `7668` hoặc `LOC` / `1234` bị lỗi hoặc mất session; mở web app bị tải rất chậm (Execution Timeout); khu vực làm việc bên phải biến thành màn hình đen và các dropdown không có dữ liệu thật.
- **Nguyên nhân gốc:**
  1. `PM_CONFIG.SHEETS.STAFF` bị gán nhầm thành `"Staff"` (sheet tiếng Anh rỗng tự tạo) thay vì trỏ vào sheet **`Nhân sự`** (vốn đã có 2.991 dòng dữ liệu thật).
  2. Hàm `ensureBackendSheetsInitialized()` được gọi đồng bộ trong `doGet(e)` và `getWhiteLabelAndSystemBundle()`. Mỗi khi user mở trang, hệ thống lại cố gắng tạo mới 16 sheet và chạy hàng trăm lệnh `getRange().setValue()`, làm nghẽn quota thời gian của Apps Script.
  3. Lệch vị trí cột trong `GLOBAL_DB_MAP`: Trong Sheet `Nhân sự`, Cột H là `SĐT Zalo` (Username), Cột I là `Mật khẩu`, Cột F là `Chức vụ` (`Admin`, `CEO`), Cột M là `uiPersonalizationJson`. Code cũ dùng hàm `normalizeVNPhone` biến chuỗi chữ `"DUC"` thành rỗng `""`, dẫn đến không khớp được user từ Sheet và rơi vào lỗi.
- **Cách khắc phục triệt để:**
  1. **Khóa cứng Sheet gốc SSOT:** `STAFF: "Nhân sự"`, `CATEGORIES: "Danh mục"`, `TASKS: "Công việc"`, `PROJECTS: "Dự án"`, `AUDIT_LOGS: "Lịch sử"`, `APP_THEMES: "App_Themes"`, `SETTINGS: "Cài đặt"`.
  2. **Gỡ bỏ hoàn toàn việc ghi đè trong `doGet`:** Tuyệt đối không gọi `ensureBackendSheetsInitialized()` khi render trang. Trả lại tốc độ phản hồi `< 250ms` cho `doGet(e)`.
  3. **Quét trực tiếp Cột H/I/F của Sheet `Nhân sự`:** So sánh trực tiếp chuỗi chữ hoa (`DUC`, `LOC`), kiểm tra mật khẩu Cột I (`7668`, `1234`), gán vai trò Cột F (`Admin`, `CEO`) và tự động cấp `fullAccess: true`, `isMasterAdmin: true`.
  4. **Đọc Dropdown Động từ Sheet `Danh mục`:** Viết hàm `loadCategoryTaxonomy()` đọc 1 lần duy nhất các cột B, D, F, H, J, L, N, P, R, T, V từ Sheet `Danh mục` để nuôi các dropdown trên giao diện.
  5. **Kết nối luồng trực tiếp cho các phòng ban:** `DEPT_HR` gọi `getStaffList()`, `DEPT_SETTINGS` kết nối Sheet `Cài đặt`, `DEPT_TECH` kết nối Sheet `Công việc`.

---

### [UI-GEN] Tổ hợp Quy tắc Xử lý Sự kiện UI, Biến Global & Đồng bộ 2 Chiều `FIELD_MAP`
- **Scope / Dự án:** `[Tất cả / Chung]`
1. **Chống đứt đoạn Hover Tooltip:** Thêm `padding` trong suốt làm cầu nối giữa nút kích hoạt và menu nổi; dùng `visibility` kết hợp `opacity` thay vì `pointer-events: none` khi cần `transition-delay`.
2. **Mở hộp thoại chọn File an toàn trên mọi WebView:** Dùng thẻ `<label for="inputId">` bọc ngoài nút bấm thay vì gọi `inputElement.click()` bằng JS để không bị trình duyệt chặn popup.
3. **Đồng bộ 2 chiều `GET` và `POST` trong `FIELD_MAP`:** Khi thêm bất kỳ trường dữ liệu mới nào, bắt buộc kiểm tra cả hàm ghi (`POST`/`api_batch_sync`) lẫn hàm đọc (`GET`/`getWhiteLabelAndSystemBundle`) để giao diện không bị reset sau khi tải lại trang.
