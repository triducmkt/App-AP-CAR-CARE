# 00-INDEX.md — HQ dự án App AP CAR CARE

## TRẠNG THÁI HIỆN TẠI
- **Trạng thái:** Welcome & Login v11 nâng cấp chùm ánh sáng quang học Cinematic Optical Lens Flare giống 100% hình mẫu tham chiếu: Lõi sáng Supernova rực rỡ với quầng sáng mềm mại; Bộ 3 tia laser ngang Anamorphic (1 tia chính xuyên tâm + 2 tia song song lệch); Vòng tròn Halo Lens bao quanh thấu kính; Hệ gai nhiễu xạ thẳng đứng và xiên chéo; Hệ thống bóng mờ quang học đa lớp và hạt Bokeh tròn dọc theo trục chéo thấu kính; Ánh sáng màu trắng tinh khiết có glow phát quang dịu mắt; Lướt chậm dần dọc theo dải lụa phát quang gối đầu ngay sau khi logo AP hoàn tất xuất hiện; Đã deploy demo lên GitHub Pages.
- **Vừa xong:** Chạy `.\backup.ps1` (snapshot `809f7ec`), trích xuất và tinh chỉnh quang học chùm sáng từ hình mẫu tham chiếu (`scratch/flare_clean4.png`), tạo template v11 (`scratch/template_v11.html`), biên dịch `src/Index.html` (317.091 bytes), kiểm thử render Edge headless trên PC (`pc_star_v11.png`, `pc_star_mid_v11.png`, `pc_final_v11.png`) & Mobile (`mob_final_v11.png`), deploy demo lên nhánh `gh-pages` (`3b17659`), cập nhật `hq/design_aesthetic_memo.md`, `hq/00-INDEX.md`, `hq/01-LOG.md`, `hq/CODING_TASKS.json`, `backup/backup_log.md`.
- **Bước tiếp theo:** Anh Đức trải nghiệm thực tế trên link demo trực tiếp và duyệt giao diện Welcome & Login để chuyển sang tích hợp phân quyền tài khoản Google Sheet và các module quản lý.
- **Cập nhật lần cuối:** Lucy/Antigravity — 2026-10-05 19:18


## BỐI CẢNH DỰ ÁN & VAI TRÒ
- **Chủ đầu tư:** Công ty TNHH AP CAR CARE (Detailing, Phụ kiện, Đồ chơi xe, Âm thanh Focal... tại TPHCM & Toàn quốc).
- **Mục tiêu app:** Ứng dụng đa năng phục vụ 3 nhóm: Khách hàng, Nhân viên kỹ thuật/vận hành, Đối tác/Đại lý.
- **Phân công vai trò:**
  - **Lucy (AI Agent):** Kỹ sư phần mềm / kiến trúc sư giải pháp & lập trình viên chính, Trợ lý dự án kiêm phụ trách các vị trí chức năng chuyên môn, Business Analyst (BA), Kiểm thử chất lượng (QA) & Điều phối giải pháp.
  - **Anh Đức:** **Product Owner (PO)** duy nhất.

## Ghi chú
- Thư mục `D:\My Agents\Antigravity\App AP CAR CARE` và `D:\My Agents\Gemini\App AP CAR CARE` là liên kết tới thư mục này.
- Bản cũ (chỉ có 1 file AGENTS.md) được giữ làm backup: `D:\My Agents\Antigravity\App AP CAR CARE_BACKUP_20261004`.
