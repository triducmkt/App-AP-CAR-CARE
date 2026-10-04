# Dự án: App AP CAR CARE

> 📍 **Thư mục gốc DUY NHẤT (Single Source of Truth):** `D:\My Agents\Projects\App AP CAR CARE\`
> Mọi agent (Gemini/Antigravity, Claude Code, Codex, Cursor) CHỈ làm việc trong thư mục này. Nếu phát hiện bản copy dự án ở nơi khác (vd `D:\My Agents\Antigravity\...`, `D:\My Agents\Gemini\...`) thì đó chỉ là liên kết/backup — DỪNG và báo anh Đức, không tự sửa ở đó.

Ngay khi bắt đầu phiên làm việc, AI phải tự động gọi tool view_file để đọc file `hq/00-INDEX.md` và các file `hq/*-LOG.md` trong thư mục này để nạp bối cảnh, tuyệt đối không được hỏi lại người dùng.

Quy định làm việc áp dụng chung cho mọi dự án:
👉 `D:\My Agents\Global\GLOBAL-RULES.md`

Danh mục dự án toàn máy:
👉 `D:\My Agents\Global\PROJECTS-INDEX.md`

## Cấu trúc thư mục
- `src/`: CHỈ chứa code chính của app. Tạo file mới trong `src/` BẮT BUỘC phải được anh Đức xác nhận.
- `hq/`: toàn bộ file dành cho Agent (INDEX, LOG, lesson, schematic_map, CODING_TASKS...).
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
2. **Backup bắt buộc:** Trước mỗi lần coding, agent BẮT BUỘC chạy `.\backup.ps1` trên Terminal (copy `src/` vào `backup/<ID>` + ghi log). Tuyệt đối không viết code nếu chưa chạy thành công.
3. **Quy trình sửa lỗi & chống lặp lỗi:** Cùng 1 lỗi mà anh báo chưa sửa được, đếm biến `i`. Khi `i = 3` BẮT BUỘC DỪNG NGAY: đối chiếu bản backup gần nhất (chỉ ưu tiên đoạn code mới thêm/sửa/xóa, không lan man sang file khác), dùng `hq/schematic_map.md` + `hq/lesson.md` để brainstorm và đi theo **hướng tiếp cận hoàn toàn khác**. Ghi bài học vào `hq/lesson.md` (Bug ID ERR-xxx).
4. **Cập nhật `hq/schematic_map.md`:** BẮT BUỘC cập nhật khi đổi cấu trúc hệ thống, luồng dữ liệu Frontend-Backend hoặc thêm module/chức năng lớn. BỎ QUA khi chỉ sửa UI/UX, text, css lặt vặt.
5. **Tracking:** sau mỗi task code, cập nhật `hq/CODING_TASKS.json` theo mẫu trong GLOBAL-RULES; git add/commit và báo mã commit 7 ký tự.