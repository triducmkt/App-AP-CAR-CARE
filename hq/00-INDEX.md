# 00-INDEX.md — HQ dự án App AP CAR CARE

## TRẠNG THÁI HIỆN TẠI
- **Trạng thái:** Welcome & Login v9 hoàn thiện tinh xảo theo chỉ đạo của anh Đức: Vùng ánh sáng xanh đen studio (Bottom-Left & Top-Right) được tăng độ rõ nét 15-20%, tạo chiều sâu studio showroom xe sang nổi bật; Ngôi sao ánh sáng trên dải lụa được thu nhỏ 50% (lõi kim cương 9px, điểm sáng 2.2px, quầng hào quang 23px) cực kỳ nhỏ gọn tinh tế; Các tia sáng của ngôi sao được kéo dài vuốt nhọn mịn như mũi kim (tapered needle horizontal 58px & vertical 46px), sắc sảo và điện ảnh; Đã deploy demo lên GitHub Pages.
- **Vừa xong:** Chạy `.\backup.ps1` (snapshot `09bd7dd`), tạo template v9 (`scratch/template_v9.html`), biên dịch `src/Index.html` (140.237 bytes), kiểm thử render Edge headless trên PC (`pc_star_v9.png`, `pc_final_v9.png`) & Mobile (`mob_final_v9.png`), deploy demo lên nhánh `gh-pages` (`a01c618`), cập nhật `hq/design_aesthetic_memo.md`, `hq/00-INDEX.md`, `hq/01-LOG.md`, `hq/CODING_TASKS.json`, `backup/backup_log.md`.
- **Bước tiếp theo:** Anh Đức trải nghiệm thực tế trên link demo trực tiếp và duyệt giao diện Welcome & Login để chuyển sang tích hợp phân quyền tài khoản Google Sheet và các module quản lý.
- **Cập nhật lần cuối:** Lucy/Antigravity — 2026-10-05 16:05


## BỐI CẢNH DỰ ÁN & VAI TRÒ
- **Chủ đầu tư:** Công ty TNHH AP CAR CARE (Detailing, Phụ kiện, Đồ chơi xe, Âm thanh Focal... tại TPHCM & Toàn quốc).
- **Mục tiêu app:** Ứng dụng đa năng phục vụ 3 nhóm: Khách hàng, Nhân viên kỹ thuật/vận hành, Đối tác/Đại lý.
- **Phân công vai trò:**
  - **Lucy (AI Agent):** Kỹ sư phần mềm / kiến trúc sư giải pháp & lập trình viên chính, Trợ lý dự án kiêm phụ trách các vị trí chức năng chuyên môn, Business Analyst (BA), Kiểm thử chất lượng (QA) & Điều phối giải pháp.
  - **Anh Đức:** **Product Owner (PO)** duy nhất.

## Ghi chú
- Thư mục `D:\My Agents\Antigravity\App AP CAR CARE` và `D:\My Agents\Gemini\App AP CAR CARE` là liên kết tới thư mục này.
- Bản cũ (chỉ có 1 file AGENTS.md) được giữ làm backup: `D:\My Agents\Antigravity\App AP CAR CARE_BACKUP_20261004`.
