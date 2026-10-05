# 00-INDEX.md — HQ dự án App AP CAR CARE

## TRẠNG THÁI HIỆN TẠI
- **Trạng thái:** Welcome & Login v7 hoàn thiện điện ảnh: Dải ánh sáng gradient trắng nền nằm fix trực tiếp theo dải họa tiết làm nền phát quang mờ dịu, co giãn bám sát 100% trên mọi kích cỡ thiết bị; Dải họa tiết vuốt nhọn từ góc dưới-trái và mở rộng xòe vút lên góc trên-phải theo chuẩn khí động học; Chùm ánh sáng ngôi sao 4 cánh quang học di chuyển chéo uốn lượn dọc theo đường spline từ dưới lên trên đồng thời với hiệu ứng slide up; Logo AP và chữ CAR CARE luôn fix cố định cạnh nhau; Đã deploy demo lên GitHub Pages.
- **Vừa xong:** Chạy `.\backup.ps1`, lưu ảnh mẫu `reference_ribbon_flow.png`, tạo template v7 (`scratch/template_v7.html`), biên dịch `src/Index.html` (139.196 bytes), kiểm thử render Edge headless thành công, deploy demo lên nhánh `gh-pages` (`b12b382`), cập nhật `hq/design_aesthetic_memo.md`, `hq/00-INDEX.md`, `hq/01-LOG.md`, `hq/CODING_TASKS.json`, `backup/backup_log.md`.
- **Bước tiếp theo:** Anh Đức kiểm tra trải nghiệm thực tế trên link demo trực tiếp và duyệt giao diện Welcome & Login để chuyển sang tích hợp phân quyền tài khoản Google Sheet và các module quản lý.
- **Cập nhật lần cuối:** Lucy/Antigravity — 2026-10-05 15:12


## BỐI CẢNH DỰ ÁN & VAI TRÒ
- **Chủ đầu tư:** Công ty TNHH AP CAR CARE (Detailing, Phụ kiện, Đồ chơi xe, Âm thanh Focal... tại TPHCM & Toàn quốc).
- **Mục tiêu app:** Ứng dụng đa năng phục vụ 3 nhóm: Khách hàng, Nhân viên kỹ thuật/vận hành, Đối tác/Đại lý.
- **Phân công vai trò:**
  - **Lucy (AI Agent):** Kỹ sư phần mềm / kiến trúc sư giải pháp & lập trình viên chính, Trợ lý dự án kiêm phụ trách các vị trí chức năng chuyên môn, Business Analyst (BA), Kiểm thử chất lượng (QA) & Điều phối giải pháp.
  - **Anh Đức:** **Product Owner (PO)** duy nhất.

## Ghi chú
- Thư mục `D:\My Agents\Antigravity\App AP CAR CARE` và `D:\My Agents\Gemini\App AP CAR CARE` là liên kết tới thư mục này.
- Bản cũ (chỉ có 1 file AGENTS.md) được giữ làm backup: `D:\My Agents\Antigravity\App AP CAR CARE_BACKUP_20261004`.
