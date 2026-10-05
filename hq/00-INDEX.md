# 00-INDEX.md — HQ dự án App AP CAR CARE

## TRẠNG THÁI HIỆN TẠI
- **Trạng thái:** Welcome & Login v10 nâng cấp chùm sáng ngôi sao quang học chuẩn điện ảnh: Tia ngang 90px (sải 180px), tia dọc dài 120px (sải 240px) vuốt nhọn mịn quang học anamorphic sắc sảo; 4 tia chéo 45 độ (52px); Bổ sung 8 tia phụ phân bố đều tại góc 22.5 độ và 67.5 độ (34px); Điểm sáng tâm lớn hơn và rực rỡ (lõi kim cương 15px, điểm sáng 5.5px, hào quang trắng r=38px); Ánh sáng xanh studio rõ nét hoàn hảo; Đã deploy demo lên GitHub Pages.
- **Vừa xong:** Chạy `.\backup.ps1` (snapshot `d5468c3`), tạo template v10 (`scratch/template_v10.html`), biên dịch `src/Index.html` (142.220 bytes), kiểm thử render Edge headless trên PC (`pc_star_v10.png`, `pc_final_v10.png`) & Mobile (`mob_final_v10.png`), deploy demo lên nhánh `gh-pages` (`818de05`), cập nhật `hq/design_aesthetic_memo.md`, `hq/00-INDEX.md`, `hq/01-LOG.md`, `hq/CODING_TASKS.json`, `backup/backup_log.md`.
- **Bước tiếp theo:** Anh Đức trải nghiệm thực tế trên link demo trực tiếp và duyệt giao diện Welcome & Login để chuyển sang tích hợp phân quyền tài khoản Google Sheet và các module quản lý.
- **Cập nhật lần cuối:** Lucy/Antigravity — 2026-10-05 16:17


## BỐI CẢNH DỰ ÁN & VAI TRÒ
- **Chủ đầu tư:** Công ty TNHH AP CAR CARE (Detailing, Phụ kiện, Đồ chơi xe, Âm thanh Focal... tại TPHCM & Toàn quốc).
- **Mục tiêu app:** Ứng dụng đa năng phục vụ 3 nhóm: Khách hàng, Nhân viên kỹ thuật/vận hành, Đối tác/Đại lý.
- **Phân công vai trò:**
  - **Lucy (AI Agent):** Kỹ sư phần mềm / kiến trúc sư giải pháp & lập trình viên chính, Trợ lý dự án kiêm phụ trách các vị trí chức năng chuyên môn, Business Analyst (BA), Kiểm thử chất lượng (QA) & Điều phối giải pháp.
  - **Anh Đức:** **Product Owner (PO)** duy nhất.

## Ghi chú
- Thư mục `D:\My Agents\Antigravity\App AP CAR CARE` và `D:\My Agents\Gemini\App AP CAR CARE` là liên kết tới thư mục này.
- Bản cũ (chỉ có 1 file AGENTS.md) được giữ làm backup: `D:\My Agents\Antigravity\App AP CAR CARE_BACKUP_20261004`.
