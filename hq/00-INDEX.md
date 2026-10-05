# 00-INDEX.md — HQ dự án App AP CAR CARE

## TRẠNG THÁI HIỆN TẠI
- **Trạng thái:** Welcome & Login v8 hoàn thiện điện ảnh theo sát 100% hình mẫu: Dải họa tiết lụa vuốt thon nhọn ở góc dưới-phải và xòe rộng lên góc trên-trái; Các đường line trắng nhiều, nhuyễn, mảnh (0.9px - 1.5px), mờ nhẹ tinh tế không bị đậm; Dải ánh sáng gradient trắng nằm fix bám làm nền phát sáng (glow underlay) theo dải lụa; Chùm ánh sáng ngôi sao 4 cánh màu trắng glow bắt đầu di chuyển gối đầu ở thời điểm logo AP vừa xuất hiện xong (2.2s), lướt chậm dần (decelerating ease-out) từ góc dưới-phải lên góc trên-trái dọc theo dải lụa; Giữ nguyên vùng ánh sáng xanh studio hoàn hảo; Đã deploy demo lên GitHub Pages.
- **Vừa xong:** Chạy `.\backup.ps1` (snapshot `21ae0fa`), tạo template v8 (`scratch/template_v8.html`), biên dịch `src/Index.html` (139.213 bytes), kiểm thử render Edge headless thành công trên PC (`pc_final_v8.png`, `pc_star_v8.png`) & Mobile (`mob_final_v8.png`), deploy demo lên nhánh `gh-pages` (`fe2f08a`), cập nhật `hq/design_aesthetic_memo.md`, `hq/00-INDEX.md`, `hq/01-LOG.md`, `hq/CODING_TASKS.json`, `backup/backup_log.md`.
- **Bước tiếp theo:** Anh Đức trải nghiệm thực tế trên link demo trực tiếp và duyệt giao diện Welcome & Login để chuyển sang tích hợp phân quyền tài khoản Google Sheet và các module quản lý.
- **Cập nhật lần cuối:** Lucy/Antigravity — 2026-10-05 15:26


## BỐI CẢNH DỰ ÁN & VAI TRÒ
- **Chủ đầu tư:** Công ty TNHH AP CAR CARE (Detailing, Phụ kiện, Đồ chơi xe, Âm thanh Focal... tại TPHCM & Toàn quốc).
- **Mục tiêu app:** Ứng dụng đa năng phục vụ 3 nhóm: Khách hàng, Nhân viên kỹ thuật/vận hành, Đối tác/Đại lý.
- **Phân công vai trò:**
  - **Lucy (AI Agent):** Kỹ sư phần mềm / kiến trúc sư giải pháp & lập trình viên chính, Trợ lý dự án kiêm phụ trách các vị trí chức năng chuyên môn, Business Analyst (BA), Kiểm thử chất lượng (QA) & Điều phối giải pháp.
  - **Anh Đức:** **Product Owner (PO)** duy nhất.

## Ghi chú
- Thư mục `D:\My Agents\Antigravity\App AP CAR CARE` và `D:\My Agents\Gemini\App AP CAR CARE` là liên kết tới thư mục này.
- Bản cũ (chỉ có 1 file AGENTS.md) được giữ làm backup: `D:\My Agents\Antigravity\App AP CAR CARE_BACKUP_20261004`.
