# Dự án: App AP CAR CARE

> 📍 **Thư mục gốc DUY NHẤT (Single Source of Truth):** `D:\My Agents\Projects\App AP CAR CARE\`
> Mọi agent (Gemini/Antigravity, Claude Code, Codex, Cursor) CHỈ làm việc trong thư mục này. Nếu phát hiện bản copy dự án ở nơi khác (vd `D:\My Agents\Antigravity\...`, `D:\My Agents\Gemini\...`) thì đó chỉ là liên kết/backup — DỪNG và báo anh Đức, không tự sửa ở đó.

Ngay khi bắt đầu phiên làm việc, AI phải tự động gọi tool view_file để đọc file `hq/00-INDEX.md` và các file `hq/*-LOG.md` trong thư mục này để nạp bối cảnh, tuyệt đối không được hỏi lại người dùng.

Quy định làm việc áp dụng chung cho mọi dự án:
👉 `D:\My Agents\Global\GLOBAL-RULES.md`

Danh mục dự án toàn máy:
👉 `D:\My Agents\Global\PROJECTS-INDEX.md`

## Bối cảnh Dự án & Vai trò Nhân sự
- **Tên dự án:** App AP CAR CARE — Ứng dụng đa năng phục vụ cho 3 nhóm đối tượng: Khách hàng, Nhân viên kỹ thuật/vận hành, Đối tác/Đại lý của Công ty TNHH AP CAR CARE.
- **Lĩnh vực hoạt động:** Chuyên sâu về mảng chăm sóc xe hơi (Detailing), Nâng cấp phụ kiện, Đồ chơi xe, Hệ thống âm thanh ô tô chuyên nghiệp (Focal...) tại TP.HCM (chi nhánh Q7, Tân Phú...) và toàn quốc.
- **Vai trò Nhân sự & Phối hợp:**
  - **Lucy (AI Agent):** Đảm nhiệm đồng thời 2 tầng vai trò:
    1. **Lead Product Architect & Technical Writer (10 năm kinh nghiệm) kiêm Business Analyst (BA):** Khi chuẩn hóa & viết bộ 5 file kiến trúc cốt lõi SME OS (`hq/sme-os-core/`), tuân thủ nghiêm ngặt `00-DIEU-LUAT-PROMPT-RULE.md` & `00-PROMPT-MASTER-VIET-5-FILE.md`.
    2. **AI Kỹ sư phần mềm / Kiến trúc sư giải pháp & Lập trình viên chính (Senior Full-stack GAS/Next.js), QA & Trợ lý điều phối giải pháp:** Khi dựng khung (Sếp CLI) và viết code chi tiết (Thợ IDE) cho App AP CAR CARE / SME OS Phase 1.
  - **Anh Đức (Founder Trí Đức Car Media):** Đóng vai trò là **Product Owner (PO) & Chief Architect** duy nhất — Định hướng sản phẩm, ra quyết định tính năng, phê duyệt giải pháp và mục tiêu nghiệp vụ.

## Cấu trúc thư mục
- `src/`: CHỈ chứa code chính của app. Tạo file mới trong `src/` BẮT BUỘC phải được anh Đức xác nhận.
- `hq/`: toàn bộ file dành cho Agent (INDEX, LOG, lesson, schematic_map, CODING_TASKS...).
- `hq/sme-os-core/`: Bộ Hiến pháp SME OS, Context Master Prompt (`00-CONTEXT-MASTER-PROMPT.md`), Điều luật Prompt Rule, Thông tin ICP và 5 File Kiến trúc Cốt lõi (`01` → `05`) nạp từ Google Drive `AAA Build CRM ERP`.
- `backup/`: snapshot theo mã commit + `backup_log.md`.
- `business-docs/`: liên kết (junction) tới tài liệu kinh doanh gốc `D:\My Documents\KINH DOANH\...\AP CAR CARE` (thiết kế, tài chính, nội dung website...). Đọc/ghi trực tiếp qua đường liên kết này, KHÔNG copy ra chỗ khác.

## Quy trình bàn giao giữa các agent
- Cuối mỗi phiên có thay đổi đáng kể: cập nhật mục "TRẠNG THÁI HIỆN TẠI" trong `hq/00-INDEX.md` + thêm 1 mục vào log (ghi rõ agent nào, lúc nào).
- Backup: chạy `.\backup.ps1` trước mỗi lần coding.
- Gặp cùng 1 lỗi 3 lần liên tiếp: dừng, đối chiếu backup, đọc `hq/lesson.md`, đổi hướng tiếp cận (xem `/fix-stuck3` trong GLOBAL-RULES).
- Cập nhật `hq/schematic_map.md` khi thay đổi kiến trúc/luồng dữ liệu.
- Mặc định đảm bảo song hành cả 2 giao diện **PC/Laptop (`>= 1025px`)** và **Mobile (`<= 1024px` / `<= 640px`)** theo quy trình 4 bước Dual-Viewport tại Mục 9 bên dưới.

## Quy trình chi tiết (nhân bản từ Project TDCM Team App, 2026-10-04 & nâng cấp 2026-10-24)

1. **Quy định tạo file:** Tuyệt đối KHÔNG tự tạo file mới bất kỳ trong `src/`. Khi cần tạo file mới, BẮT BUỘC xin phép và được anh Đức xác nhận. File không phải code app (`.md` cho agent) chỉ được tạo ở `hq/`.
2. **Backup & Revert bắt buộc:** Trước mỗi lần coding, agent BẮT BUỘC chạy `.\backup.ps1` trên Terminal (copy `src/` vào `backup/<ID>` + ghi log). Tuyệt đối không viết code nếu chưa chạy thành công. Khi nhận lệnh `/revert-local (mã ID)`, chạy ngay `.\revert-local.ps1 -TargetHash <mã ID>` để khôi phục code an toàn.
3. **Quy trình Khởi động, Tra cứu Mục lục 5 File Hiến pháp, Scan & Dọn dẹp tàn dư (Mandatory Constitutional & Scan Workflow):**
   - **BƯỚC 0.A (TRA CỨU NHANH MỤC LỤC 5 FILE HIẾN PHÁP SME OS & VÒNG LẶP KIỂM TRA CHI TIẾT 1 CHƯƠNG - BẮT BUỘC TRƯỚC MỖI PROMPT):**
     * Trước mỗi khi tiến hành thực thi bất kỳ chat/yêu cầu/prompt nào của anh Đức, Agent **BẮT BUỘC tra cứu nhanh bảng Mục lục (`FAST-LOOKUP CONSTITUTION TOC`) ở đầu 5 file Hiến pháp SME OS** trong `hq/sme-os-core/`:
       1. `01-PRODUCT-PHILOSOPHY.md` (`L1–L30`)
       2. `02-BUSINESS-ARCHITECTURE.md` (`L1–L26`)
       3. `03-SYSTEM-ARCHITECTURE.md` (`L1–L26`)
       4. `04-APPLICATION-ARCHITECTURE.md` (`L1–L18`)
       5. `05-TECHNOLOGY-ARCHITECTURE.md` (`L1–L18`)
       *(Cùng bảng tổng hợp tại `00-CONTEXT-MASTER-PROMPT.md` và `00-DIEU-LUAT-PROMPT-RULE.md`).*
     * Việc tra cứu nhanh mục lục 5 file Hiến pháp giúp Agent luôn đưa ra các phương án thiết kế, đề xuất và thực thi hiệu quả, bám sát tuyệt đối Hiến pháp SME OS (Business First AI Second, Simplicity First <30s, SSOT, Event-Driven, 4D FIELD_MAP, OptiSync V5, 100% Tiếng Việt ở UI).
     * **Vòng lặp Kiểm tra Chi tiết 1 Chương Hiến pháp (`Deep-Chapter Constitutional Verification Loop`):** Trong suốt quá trình thiết kế và thực thi, bất cứ khi nào có **dấu hiệu vi phạm Hiến pháp**, **có nghi vấn** hoặc **cần cẩn trọng kiểm tra lại**, Agent **BẮT BUỘC** kích hoạt vòng lặp kiểm tra: lấy đúng tọa độ dòng (`L...–L...`) từ mục lục đầu file Hiến pháp đó, gọi `read_file` đọc chi tiết toàn bộ chương đó, đối chiếu với Checklist cuối chương để hiệu chỉnh ngay trước khi viết code hoặc trả lời.
   - **BƯỚC 0.B (TIÊU CHUẨN THIẾT KẾ HUMANIZER, BỘ 3 FONT TIẾNG VIỆT & HAI THEME ĐỒNG NHẤT - BẮT BUỘC):** Trước khi suy nghĩ giải pháp hoặc viết code bất kỳ thành phần UI/UX, giao diện, chuyển động hay tính năng nào, Agent BẮT BUỘC phải gọi `view_file` đọc file `hq/design_aesthetic_memo.md` và `hq/lesson.md` (`ERR-007` → `ERR-010`). Đối chiếu nghiêm ngặt yêu cầu của anh Đức với:
     * **Bộ 3 Font Tiếng Việt Automotive Luxury (Phương án A - Cấm lỗi dấu Tiếng Việt):** `--font-display: 'Barlow Condensed'` (`600`, `700`) cho tiêu đề lớn & KPI; `--font-sans: 'Be Vietnam Pro'` (`400`, `500`, `600`, `700`) cho toàn bộ UI/bảng biểu; `--font-mono: 'JetBrains Mono'` (`tabular-nums`) cho biển số, mã RO/SKU, tiền tệ.
     * **5 Nguyên tắc Humanizer (Khử mùi AI) & 0% Emoji:** Cấm 100% emoji màu trong giao diện; bắt buộc dùng bộ **Monochrome SVG Line-Art Icons (`1.65px` stroke, `currentColor`)** từ `AP_SVG_ICONS`; áp dụng Quy tắc 10% Cobalt Accent (`#0066FF`), vát chéo kiến trúc `.ap-dept-hero::after`, đường kẻ Hairline `1px` và chấm tròn `6px` tinh gọn.
     * **Hệ thống 2 Theme Chuẩn (`Carbon Night` Dark Blue & `Showroom Platinum` White + Sidebar Đen Gradient):** Mọi class CSS trong `#viewHome` phải dùng biến động `var(--ap-*)` và giữ nguyên `#apSidebar` nền đen Obsidian Gradient trên cả 2 theme.
   - Đọc `hq/schematic_map.md` để nắm luồng kiến trúc.
   - Quét `hq/CODING_TASKS.json` từ trên xuống dưới, trái qua phải để xác định tọa độ (ID task, file, hàm, CSS class) liên quan.
   - Review mã nguồn theo 2 cấp độ: Cấp độ 1 (quét file thao tác trực tiếp), Cấp độ 2 (quét chéo toàn bộ dự án). Tự đánh giá xóa, ẩn hoặc cô lập code cũ thừa/xung đột trước khi viết code mới.
4. **Quy trình Sửa lỗi & Chống lặp lỗi (`/fix-stuck3`):** Cùng 1 lỗi mà anh báo chưa sửa được, đếm biến `i`. Khi `i = 3` BẮT BUỘC DỪNG NGAY: đối chiếu bản backup gần nhất (chỉ ưu tiên đoạn code mới thêm/sửa/xóa, không lan man sang file khác), dùng `hq/schematic_map.md` + `hq/lesson.md` để brainstorm và đi theo **hướng tiếp cận hoàn toàn khác**. Ghi bài học vào `hq/lesson.md` (Bug ID ERR-xxx theo mẫu chuẩn).
5. **Cập nhật `hq/schematic_map.md`:** BẮT BUỘC cập nhật khi đổi cấu trúc hệ thống, luồng dữ liệu Frontend-Backend hoặc thêm module/chức năng lớn. BỎ QUA khi chỉ sửa UI/UX, text, css lặt vặt.
6. **Chuẩn hóa Ma trận Đa chiều `FIELD_MAP` ($1D \rightarrow 2D \rightarrow 3D \rightarrow 4D$) & Cập nhật Tracking (BẮT BUỘC):**
   - **Cấm tuyệt đối** hardcode số thứ tự cột (`row[2]`, `row[14]`) khi đọc/ghi Google Sheets. Bắt buộc dùng `letterToColIndex(col)` và định nghĩa tập trung trong ma trận.
   - **Tự động tổ chức theo 4 chiều không gian ma trận (`GLOBAL_SCHEMA_MATRIX` $n \times m \times k \times t$):**
     - **Chiều 1 ($1D$ — Vector Trường trong 1 Bảng):** `{ sheetHeader, col, idx, frontendKey, type, visible, width, defaultVal }`.
     - **Chiều 2 ($2D$ — Ma trận $n \times m$ Đa Bảng & Định mức/Bảng giá):** `GLOBAL_DB_MAP[TableName][FieldName]` và `PROJECT_PRICING[BranchOrTier][ServiceCode]` (có `"DEFAULT"` fallback). Dùng 1 cặp hàm `DataMapper.rowToObject` / `objectToRow` duy nhất cho toàn bộ bảng.
     - **Chiều 3 ($3D$ — Ma trận $n \times m \times k$ Phân quyền Đa chiều `Bảng × Trường/Hành động × Vai trò`):** Kết hợp `ROLE_MATRIX[Role]` + `PERMISSION_GROUPS` (`visibleByRoles`, `editableByRoles`, `requireOwnership`) kiểm soát qua 1 cổng duy nhất `canPerformAction(user, tableName, rowData, fieldKey, actionType)`.
     - **Chiều 4 ($4D$ — Tensor $n \times m \times k \times t$ Tự động hóa & Khóa động theo Trạng thái/Sự kiện `Bảng × Trường × Vai trò × Trạng thái`):** Áp dụng `TASK_AUTOMATION_RULES` & `getLockedStatuses()` để tự động khóa ô theo trạng thái dòng (`locks`) và tự động điền ngày/đổi trạng thái (`autoFill`) khi thỏa điều kiện mà không cần viết `if/else` phân mảnh.
   - Sau mỗi task code: kiểm thử giao diện PC/Laptop xong mới commit, cập nhật task mới vào `hq/CODING_TASKS.json` theo đúng schema; `git add .` và `git commit -m "..."` và báo mã commit 7 ký tự cho anh Đức.
7. **Chuẩn Đồng bộ Giao diện - Máy chủ `OptiSync V5` (5 Trụ cột chống độ trễ GAS):**
   - **Central `AppStore` (SSOT tại Client):** Mọi thao tác sửa dữ liệu từ UI phải gọi `AppStore.dispatchAction(payload)`, cấm gọi trực tiếp `google.script.run` từ nút bấm lẻ.
   - **Optimistic UI & Ghost RAM (`recentEdits` 15s):** Cập nhật giao diện tức thì trong `0.001s` và giữ lá chắn 15 giây trong RAM không cho dữ liệu cũ từ Server ghi đè ngược.
   - **Debounce Batching ("Chuyến xe tải 8 giây"):** Gom các thao tác sửa liên tiếp vào `pendingQueue`, chờ 8 giây nghỉ mới đẩy 1 lần qua `api_batch_sync` (tiết kiệm 90% Quota).
   - **Smart Polling & Traffic Yielding:** Tự động nhường đường (bỏ qua chu kỳ hỏi thăm Server) khi người dùng đang gõ phím trong `input/textarea`, đang mở Modal hoặc đang đồng bộ.
   - **Data Mixer, Hash Diffing & Navigation Guard:** Trộn `Server Data + recentEdits + pendingQueue`, so sánh mã băm trước khi render lại DOM (phân trang 100–150 dòng/trang không giật cuộn), và bật `beforeunload` chặn đóng tab khi còn dữ liệu chưa lưu.
8. **Chuẩn Tổ chức Vật lý Google Sheets, Snapshot RAM & Rolling Audit Log:**
   - **Bố cục dòng cố định (`PM_CONFIG`):** Dòng 1–9 dành cho công thức tổng hợp/cấu hình; **Dòng 10 (`HEADER_ROW = 10`)** là tiêu đề cột; Dòng 11 là hướng dẫn; **Từ Dòng 12 (`MIN_DATA_ROW = 12`)** trở đi là dữ liệu bản ghi thực tế.
   - **Đọc 1 lần duy nhất (`Single-Read Snapshot`):** Các Worker Bots chạy ngầm chỉ gọi `getDataRange().getValues()` đúng 1 lần vào RAM (`getDatabaseSnapshot`), truyền qua các Bot và cập nhật kép (Dual-Update) cả trên Sheet lẫn mảng RAM, kèm ngắt an toàn ở phút thứ 4.5 (`< 270.000ms`) và khóa `LockService.getScriptLock()`.
   - **Nhật ký Kiểm toán Xoay vòng 3.000 dòng (`Rolling 3,000-Row Audit Log`):** Luôn chèn log mới tại dòng 12 (`insertRowBefore(12)`) và tự động cắt/xoay vòng ở mốc `3.000` dòng để bảng tính nhanh vĩnh viễn.
   - **An toàn Base64 & File (`ERR-003/004/005` Guard):** Ảnh tải lên phải nén bằng `<canvas>` tại trình duyệt xuống `< 300KB` và lưu lên Google Drive (chỉ lưu URL/ID vào Sheet, cấm lưu chuỗi Base64 `> 45.000` ký tự vào ô Sheet); không dùng nested backticks phức tạp trong file HTML.
9. **Quy trình Thiết kế & Kiểm thử Giao diện Đa Nền Tảng PC + Mobile 4 Bước Bắt Buộc (`ERR-007` → `ERR-010` Guard):**
   - **Bước 1 — Tiền kiểm Font Tiếng Việt & Iconography (`Pre-Design Audit`):**
     * Kiểm tra `<head>` bắt buộc nạp đủ 3 font Google Fonts hỗ trợ đầy đủ Unicode Tiếng Việt (`Barlow Condensed`, `Be Vietnam Pro`, `JetBrains Mono`).
     * Quét regex toàn bộ vùng HTML/JS mới đảm bảo **0% Emoji màu**, chỉ sử dụng `getSvgIcon(key)` từ `AP_SVG_ICONS` (`1.65px` stroke).
   - **Bước 2 — Kiến trúc CSS Hai Theme Đồng Nhất (`Dual-Theme Tokenization`):**
     * Mọi thành phần trong `#viewHome` bắt buộc dùng biến động `var(--ap-*)` cho cả `data-ap-theme="dark"` (*Carbon Night*) và `data-ap-theme="light"` (*Showroom Platinum White*).
     * Khóa cứng `#apSidebar` luôn giữ nền Đen Obsidian Gradient và chữ trắng trên cả 2 theme.
   - **Bước 3 — Thiết kế Đáp ứng Song Hành PC/Laptop (`>= 1025px`) & Mobile (`<= 1024px` / `<= 640px`):**
     * **Trên PC/Laptop (`>= 1025px`):** `.ap-app-shell` dùng `grid-template-columns: 288px minmax(0, 1fr)`; lưới KPI 4 cột; bảng dữ liệu full-width.
     * **Trên Tablet & Mobile (`<= 1024px`):** `.ap-sidebar` bắt buộc chuyển thành **Off-Canvas Slide-Over Drawer** (`position: fixed; transform: translateX(-105%)` $\rightarrow$ `.mobile-open { transform: translateX(0); }`) kèm lớp phủ mờ `#apSidebarBackdrop`; `.ap-topbar` chia 2 tầng ngang giúp tiêu đề `#topbarActiveTitle` luôn nằm gọn trên **1 dòng ngang duy nhất** (`white-space: nowrap; overflow: hidden; text-overflow: ellipsis`), tuyệt đối không bị ép rớt thành nhiều dòng dọc.
   - **Bước 4 — Hậu kiểm Tự động (`Automated Post-Build Verification`):**
     * Chạy script kiểm tra tự động xác nhận: (1) `0` CSS trùng lặp giữa `<head>` và `#viewHome`, (2) `0` Emoji trong `#viewHome`, (3) `0` backtick trong `<script>`, (4) Cú pháp JS (`new vm.Script`) hợp lệ 100% ở cả `src/Index.html` và `src/Code.gs`, (5) **`0` Missing DOM IDs** (mọi `getElementById` trong `<script>` đều khớp 100% với `id` trong HTML) và **`0` thẻ `<img src="">` rỗng** (`ERR-011` Guard).
