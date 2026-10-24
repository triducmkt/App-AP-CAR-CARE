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
| **UI-GEN** | `L156–L165` | `[Tất cả / Chung]` | Tổ hợp quy tắc UI/UX cơ bản: đứt đoạn Hover Tooltip, chặn `<input type="file">`, sai tên biến Global & thiếu map cột GET/POST | Dùng `<label for="...">` mở hộp thoại file; kiểm tra đồng bộ cả 2 chiều `GET` và `POST` trong `FIELD_MAP`; kiểm thử cú pháp AST trước khi commit. |

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

### [UI-GEN] Tổ hợp Quy tắc Xử lý Sự kiện UI, Biến Global & Đồng bộ 2 Chiều `FIELD_MAP`
- **Scope / Dự án:** `[Tất cả / Chung]`
1. **Chống đứt đoạn Hover Tooltip:** Thêm `padding` trong suốt làm cầu nối giữa nút kích hoạt và menu nổi; dùng `visibility` kết hợp `opacity` thay vì `pointer-events: none` khi cần `transition-delay`.
2. **Mở hộp thoại chọn File an toàn trên mọi WebView:** Dùng thẻ `<label for="inputId">` bọc ngoài nút bấm thay vì gọi `inputElement.click()` bằng JS để không bị trình duyệt chặn popup.
3. **Đồng bộ 2 chiều `GET` và `POST` trong `FIELD_MAP`:** Khi thêm bất kỳ trường dữ liệu mới nào, bắt buộc kiểm tra cả hàm ghi (`POST`/`api_batch_sync`) lẫn hàm đọc (`GET`/`getWhiteLabelAndSystemBundle`) để giao diện không bị reset sau khi tải lại trang.
