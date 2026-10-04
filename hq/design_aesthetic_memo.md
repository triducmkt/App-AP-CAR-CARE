# Tài Liệu Định Chuẩn Thiết Kế Giao Diện & Trải Nghiệm (Design Aesthetic Memo)
**Dự án:** App AP CAR CARE  
**Áp dụng:** Xuyên suốt toàn bộ dự án (PC & Mobile)  
**Ngày ban hành:** 04/10/2026 — Phê duyệt bởi Product Owner: anh Đức  

---

## 1. TRIẾT LÝ THIẾT KẾ (DESIGN PHILOSOPHY)
- **Phong cách chủ đạo:** **Ultra-Luxury, Automotive Premium, Minimalist, High-Tech**.
- **Cảm hứng & Tinh thần:** Lấy cảm hứng từ không gian studio ánh sáng cao cấp của các dòng xe siêu sang (như Mercedes-Benz S-Class). Tôn vinh vẻ đẹp cơ khí tinh xảo, bề mặt sơn đen bóng gương (piano black clear-coat), các đường chỉ viền chrome sắc sảo và ánh sáng công nghệ tinh tế.
- **Tiêu chí thị giác:** Đơn giản, thoáng đãng, sang trọng, không rườm rà nhưng toát lên đẳng cấp của một trung tâm dịch vụ xe hơi chuyên nghiệp hàng đầu.

---

## 2. BẢNG MÀU CHỦ ĐẠO (CORE COLOR PALETTE)

| Màu sắc | Mã Hex | Ý nghĩa & Vị trí ứng dụng |
|---|---|---|
| **Đen tuyền (Deep Obsidian Black)** | `#000000` / `#08090B` | Màu nền chủ đạo toàn app, tạo chiều sâu vô tận, tương phản cực đại, phong cách phòng sơn/studio xe sang. |
| **Đen khói / Xám than (Charcoal / Card Surface)** | `#121418` / `#1A1D24` | Bề mặt các thẻ card, ô nhập liệu (inputs), hiệu ứng kính mờ (glassmorphism), viền tinh tế. |
| **Trắng tinh khôi (Pure White)** | `#FFFFFF` / `#F5F6FA` | Typography chính, logo, icon, text có độ tương phản cao, dễ đọc trong môi trường xưởng và ngoài trời. |
| **Xanh dương nhạt (Google Blue Accent)** | `#4285F4` (Phụ: `#8AB4F8`) | Điểm nhấn công nghệ (accent color): viền focus ô nhập, nút hành động chính (primary button), hiệu ứng phát sáng nhẹ (subtle cyan/blue glow), thanh trạng thái. |
| **Xám kim loại (Metallic Silver)** | `#70798C` / `#8E95A5` | Text phụ (subtext), viền mờ (subtle borders), placeholder input. |

---

## 3. TƯ LIỆU THƯƠNG HIỆU & LOGO AP CAR CARE
- **Tập tin logo gốc:** `business-docs/logo/Logo AP nen den chu trang.png` (và bản vector `business-docs/logo/Logo AP.ai`).
- **Quy chuẩn hiển thị:** Logo tròn AP với nền đen chữ trắng sắc nét, bao quanh bởi viền kim loại mảnh hoặc ánh sáng Google Blue nhẹ.
- **Slogan & Tên thương hiệu phụ bản:** `"AP CAR CARE AUDIO & ACCESSORIES"` (Chuyên sâu mảng âm thanh Focal, đồ chơi và phụ kiện ô tô cao cấp).

---

## 4. KỊCH BẢN CHUYỂN ĐỘNG & MOTION GRAPHIC (INTRO & LOGIN ANIMATION)
Kịch bản hiệu ứng chào mừng (Welcome Sequence) được chia làm 4 giai đoạn mượt mà (smooth easing cubic-bezier):

1. **Giai đoạn 1 (0.0s – 0.5s):** 
   - Màn hình đen tuyền tuyệt đối (`#000000`), không gian yên tĩnh, tạo cảm giác hồi hộp, sang trọng như khi bước vào showroom xe sang.
2. **Giai đoạn 2 (0.5s – 1.8s):** 
   - Logo tròn AP xuất hiện dần dần (Fade-in + 3D subtle tilt rotation + Soft scale up) với kích thước lớn ở chính giữa màn hình.
   - Hiệu ứng ánh sáng xanh Google (`#4285F4`) quét nhẹ qua viền tròn của logo như ánh đèn pha LED projector của Mercedes S-Class.
3. **Giai đoạn 3 (1.8s – 2.8s):** 
   - Logo tròn mượt mà zoom nhỏ lại (scale down từ `1.4` về `1.0`), dịch chuyển nhẹ về vị trí chuẩn.
   - Dòng chữ thương hiệu đẳng cấp `"AP CAR CARE AUDIO & ACCESSORIES"` trượt xuất hiện kế bên (trên PC) hoặc phía dưới logo (trên Mobile) với hiệu ứng dãn chữ (letter-spacing expansion).
4. **Giai đoạn 4 (2.8s – 3.8s):** 
   - Khung đăng nhập (Login Box) xuất hiện từ dưới lên (Slide up + Fade-in với hiệu ứng kính đen mờ glassmorphism).
   - Xuất hiện đồng bộ 2 ô nhập liệu: `"Tên đăng nhập"` và `"Mật khẩu"` với viền phát sáng khi focus.
   - Nút `"ĐĂNG NHẬP"` bo góc tinh tế, chuyển màu xanh Google ánh kim khi hover/active.

---

## 5. ĐỒNG BỘ ĐA THIẾT BỊ (RESPONSIVE PC & MOBILE)
- **Phiên bản PC / Laptop:**
  - Bố cục trung tâm cinematic tỷ lệ 16:9, card đăng nhập nằm gọn gàng với viền ánh sáng tinh tế, nền có thể tương tác với hiệu ứng 3D Parallax hoặc gradient studio sâu thẳm.
- **Phiên bản Mobile:**
  - Thiết kế Touch-first: nút bấm kích thước tối thiểu 48px, bàn phím số/chữ mở tự nhiên, khoảng cách lề chuẩn công thái học (ergonomic thumb zone), không bị vỡ bố cục khi xoay ngang/dọc.

---

## 6. NỀN TẢNG CÔNG NGHỆ & KHO DỮ LIỆU (PHASE 1)
- **Nền tảng App:** Google Apps Script (GAS) Web App + HTML5/CSS3/Modern Vanilla JavaScript (không phụ thuộc thư viện nặng, load tức thì).
- **Backend Data Source:** Google Sheet ID:
  👉 `1ziGRRq92AxX9BnDMYbHF-iES7XskALCaOK6LeUw_IS0`  
  Link: `https://docs.google.com/spreadsheets/d/1ziGRRq92AxX9BnDMYbHF-iES7XskALCaOK6LeUw_IS0/edit?usp=sharing`
- **FIELD_MAP Pattern:** Mọi thao tác đọc/ghi thông tin người dùng, mật khẩu, phân quyền và dữ liệu từ Sheet đều phải tuân thủ chuẩn FIELD_MAP.
