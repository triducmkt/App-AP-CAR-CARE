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
- Mặc định chỉ code giao diện PC/Laptop, trừ khi anh Đức yêu cầu Mobile.

## Quy trình chi tiết (nhân bản từ Project TDCM Team App, 2026-10-04)

1. **Quy định tạo file:** Tuyệt đối KHÔNG tự tạo file mới bất kỳ trong `src/`. Khi cần tạo file mới, BẮT BUỘC xin phép và được anh Đức xác nhận. File không phải code app (`.md` cho agent) chỉ được tạo ở `hq/`.
2. **Backup & Revert bắt buộc:** Trước mỗi lần coding, agent BẮT BUỘC chạy `.\backup.ps1` trên Terminal (copy `src/` vào `backup/<ID>` + ghi log). Tuyệt đối không viết code nếu chưa chạy thành công. Khi nhận lệnh `/revert-local (mã ID)`, chạy ngay `.\revert-local.ps1 -TargetHash <mã ID>` để khôi phục code an toàn.
3. **Quy trình Khởi động, Scan & Dọn dẹp tàn dư (Mandatory Scan Workflow):**
   - **BƯỚC 0 (TIÊU CHUẨN THIẾT KẾ & BRAND IDENTITY - BẮT BUỘC):** Trước khi suy nghĩ giải pháp hoặc viết code bất kỳ thành phần UI/UX, giao diện, chuyển động hay tính năng nào, Agent BẮT BUỘC phải gọi `view_file` đọc file `hq/design_aesthetic_memo.md`. Đối chiếu nghiêm ngặt yêu cầu của anh Đức với bảng chuẩn Font (Roboto, Roboto Condensed), Hệ màu (Obsidian Black, Google Blue, Pure White), Chuẩn ánh sáng 3D và Phong cách tối giản trước khi triển khai.
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