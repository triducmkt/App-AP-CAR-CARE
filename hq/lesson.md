# Nhật ký lỗi & Bài học kinh nghiệm (Lessons Learned) — App AP CAR CARE

> 📌 **Quy tắc bắt buộc:** Mọi agent khi gặp bug trong dự án phải **ƯU TIÊN đọc file này trước** để tránh đi vào vết xe đổ. Sau mỗi lần fix thành công một lỗi khó hoặc lỗi đặc thù, BẮT BUỘC ghi lại bài học vào file này theo mẫu bên dưới kèm Bug ID (`ERR-xxx`).

---

## 🛠️ NGUYÊN TẮC DEBUG CỐT LÕI (DÀNH CHO MỌI AGENT)

### 1. Quy tắc khoanh vùng lỗi dựa trên mốc Confirm / Commit gần nhất
- Khi code mới phát sinh lỗi, **90% nguyên nhân xuất phát từ những dòng code vừa thêm/sửa/xóa** kể từ commit ổn định gần nhất.
- **Hành động:** Ngay lập tức khoanh vùng vào phần thay đổi mới (dùng `git diff` hoặc đối chiếu thư mục `backup/<ID>/`). Tuyệt đối KHÔNG sửa lan man sang các hàm, file khác không liên quan.

### 2. Quy trình dừng khẩn cấp khi i = 3 (`/fix-stuck3`)
- Nếu sửa cùng một lỗi đến lần thứ 3 (`i = 3`) mà vẫn thất bại: **DỪNG SỬA NGAY LẬP TỨC**.
- Đối chiếu bản backup gần nhất trước khi lỗi xuất hiện.
- Mở `hq/schematic_map.md` và `hq/lesson.md` để brainstorm trace ngược root-cause.
- Chuyển sang **hướng tiếp cận hoàn toàn khác**, tuyệt đối không lặp lại logic cũ.
- Sau khi fix thành công, ghi ngay bài học mới vào danh sách bên dưới.

---

## 📋 MẪU GHI BÀI HỌC (TEMPLATE CHUẨN)

```markdown
## [ERR-001] Tên ngắn gọn mô tả lỗi
- **Triệu chứng (Symptom):** Báo lỗi gì trên console/terminal/UI? Trong hoàn cảnh nào?
- **Nguyên nhân gốc rễ (Root Cause):** Do đâu bị lỗi (lệch kiểu dữ liệu, xung đột CSS, bất đồng bộ, lỗi logic...)?
- **Giải pháp xử lý (Solution):** Đã sửa như thế nào? Đoạn code trước và sau khi fix?
- **Bài học rút ra (Lesson / Rule of Thumb):** Cần chú ý điều gì để không lặp lại trong tương lai?
```

---

## 📚 DANH SÁCH BÀI HỌC ĐÃ GHI NHẬN

*(Chưa có bài học nào được ghi nhận. Agent sẽ tự động ghi bài học đầu tiên khi xử lý bug thành công.)*
