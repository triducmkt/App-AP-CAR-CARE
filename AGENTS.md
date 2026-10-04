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
