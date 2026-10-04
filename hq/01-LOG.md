# 01-LOG.md — Nhật ký (append-only, không sửa/xoá mục cũ)

## 2026-10-04 19:50 — Lucy/Antigravity
- Yêu cầu của anh Đức (/global): dùng `D:\My Agents\Projects\` làm gốc chung vĩnh viễn, mỗi dự án nằm gọn 1 thư mục.
- Tạo dự án `App AP CAR CARE` tại `D:\My Agents\Projects\App AP CAR CARE\` gồm `AGENTS.md`, `CLAUDE.md`, `hq/`, `src/`, `backup/`, `backup.ps1`.
- Tạo junction `business-docs` → `D:\My Documents\KINH DOANH\All-in-one Business Plan\Cac kinh doanh TDC Media tu van\AP CAR CARE` để đồng bộ dữ liệu sẵn có (không copy).
- Quyền Modify (Everyone) trên 2 thư mục AP CAR CARE đã cấp trước đó bằng `icacls`.
- Đính chính: ghi chú phiên trước nói đã copy cấu hình TDCM sang AP CAR CARE là KHÔNG chính xác; lúc đó thư mục chỉ có AGENTS.md. Khung hq hiện tại mới được tạo thật.

## 2026-10-04 22:35 — Lucy/Antigravity
- Rà soát toàn diện và chuẩn hóa khung quy tắc làm việc cho bộ 3 file: hq/lesson.md, hq/schematic_map.md và hq/CODING_TASKS.json.
- lesson.md: Đã nạp đầy đủ 2 nguyên tắc debug cốt lõi (khoanh vùng code mới thêm từ commit trước, dừng khẩn cấp khi i=3) + Mẫu chuẩn format [ERR-xxx].
- schematic_map.md: Đã nạp quy tắc tự động cập nhật / bỏ qua + Khung sơ đồ Mermaid mẫu + 4 trụ cột kỹ thuật (SSOT, FIELD_MAP...) + Bảng phân chia Frontend/Backend.
- CODING_TASKS.json: Đã nạp đối tượng hướng dẫn _GUIDE (Mandatory Scan Workflow, quét dọn tàn dư Cấp độ 1 & 2, leo thang Escalation, Schema chuẩn).
- AGENTS.md: Bổ sung đồng bộ quy trình quét scan trước khi code và chuẩn FIELD_MAP. Commit: c990f51.