# 00-INDEX.md — HQ dự án App AP CAR CARE

## TRẠNG THÁI HIỆN TẠI
- **Trạng thái:** Hoàn tất tính năng SPA Chuyển trang & Trang Home Quản trị Đăng bài Đa kênh (Multi-Channel Cross-Posting Hub): Xác thực đăng nhập thành công với User ID `DUC` / Mật khẩu `1111` (và backend Google Apps Script); Lưu phiên làm việc an toàn qua `localStorage` theo chuẩn TDCM Team App; Chuyển mượt giữa Login và Home; Trang Home có Header Logo AP, thông tin User Tăng Trí Đức (Product Owner), nút Đăng xuất; Giao diện Đăng bài Đa kênh với ô Text Long (bộ đếm từ/ký tự, hashtag gợi ý), Uploader up 1 hoặc nhiều ảnh kèm lưới preview và xóa từng ảnh, danh sách checkbox kênh YouTube, Facebook, TikTok kèm icon trạng thái `v` (thành công) và `x` (chưa đăng/thất bại); Nút bấm 3D Đăng bài; Đã deploy demo lên GitHub Pages.
- **Vừa xong:** Chạy `.\backup.ps1` (snapshot `75bc0e2`), nâng cấp backend `src/Code.gs` (FIELD_MAP POST_FIELD_MAP, publishMultiChannelPost, xác thực DUC/1111), tạo `scratch/template_v12.html` và biên dịch `src/Index.html` (388.833 bytes), kiểm thử Edge headless chuyển trang và đăng bài (`pc_login_before_submit.png`, `pc_home_after_login.png`, `pc_home_published.png`, `mob_home_published.png`), deploy demo lên nhánh `gh-pages` (`fb14ae9`), cập nhật tài liệu HQ.
- **Bước tiếp theo:** Anh Đức trải nghiệm thực tế trên link demo trực tiếp và duyệt giao diện Home đăng bài đa kênh để tiếp tục tích hợp API Google Sheets hoặc kết nối các module tính năng tiếp theo.
- **Cập nhật lần cuối:** Lucy/Antigravity — 2026-10-05 22:25


## BỐI CẢNH DỰ ÁN & VAI TRÒ
- **Chủ đầu tư:** Công ty TNHH AP CAR CARE (Detailing, Phụ kiện, Đồ chơi xe, Âm thanh Focal... tại TPHCM & Toàn quốc).
- **Mục tiêu app:** Ứng dụng đa năng phục vụ 3 nhóm: Khách hàng, Nhân viên kỹ thuật/vận hành, Đối tác/Đại lý.
- **Phân công vai trò:**
  - **Lucy (AI Agent):** Kỹ sư phần mềm / kiến trúc sư giải pháp & lập trình viên chính, Trợ lý dự án kiêm phụ trách các vị trí chức năng chuyên môn, Business Analyst (BA), Kiểm thử chất lượng (QA) & Điều phối giải pháp.
  - **Anh Đức:** **Product Owner (PO)** duy nhất.

## Ghi chú
- Thư mục `D:\My Agents\Antigravity\App AP CAR CARE` và `D:\My Agents\Gemini\App AP CAR CARE` là liên kết tới thư mục này.
- Bản cũ (chỉ có 1 file AGENTS.md) được giữ làm backup: `D:\My Agents\Antigravity\App AP CAR CARE_BACKUP_20261004`.
