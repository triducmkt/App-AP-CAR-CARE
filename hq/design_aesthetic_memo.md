# Tài Liệu Định Chuẩn Thiết Kế Giao Diện & Trải Nghiệm (Design Aesthetic Memo)
**Dự án:** App AP CAR CARE  
**Áp dụng:** BẮT BUỘC XUYÊN SUỐT TOÀN BỘ DỰ ÁN (PC & Mobile)  
**Phê duyệt:** Product Owner: anh Đức  
**Cập nhật lần cuối:** 05/10/2026 (Lucy / Antigravity)  

---

## ⚠️ QUY TẮC BẮT BUỘC DÀNH CHO TOÀN BỘ AI AGENT (MANDATORY GATEWAY)
> **Mỗi khi nhận bất kỳ yêu cầu nào liên quan đến UI/UX, giao diện, chuyển động, typography, màu sắc hoặc tính năng mới:**  
> Agent **BẮT BUỘC** phải gọi `view_file` đọc toàn bộ file này **TRƯỚC KHI** suy nghĩ giải pháp, lập kế hoạch hoặc viết bất kỳ dòng code nào.  
> Mọi thiết kế mới phải đối chiếu nghiêm ngặt với các tiêu chuẩn bên dưới để đảm bảo tính nhất quán 100% thương hiệu.

---

## 1. TRIẾT LÝ THIẾT KẾ CỐT LÕI (CORE DESIGN PHILOSOPHY)
- **Phong cách chủ đạo:** **Ultra-Luxury, Automotive Premium, Minimalist, High-Tech**.
- **Cảm hứng:** Không gian studio ánh sáng cao cấp của các thương hiệu xe siêu sang (như Mercedes-Benz S-Class, Maybach, Porsche).
- **Tiêu chí tối thượng:** 
  - **Tối giản đỉnh cao (Extreme Minimalism):** Chỉ giữ lại các thành phần cốt lõi cần thiết nhất cho người dùng. Tuyệt đối không thêm text khẩu hiệu, badge phụ, chú thích kỹ thuật backend hay thông số thừa thãi.
  - **Sang trọng & Huyền bí:** Không gian nền đen tuyền obsidian kết hợp ánh sáng 3D quang học hắt góc tạo chiều sâu thị giác vô tận.

---

## 2. QUY CHUẨN TYPOGRAPHY (CHÍNH THỨC TỪ BẢN GỐC THƯƠNG HIỆU AP)
*(Được xác thực 100% từ tài liệu gốc `business-docs/logo/font logo AP.png` và file vector `business-docs/logo/Logo AP.pdf`)*

| Vai trò Typography | Tên Font chính thức | Trọng số (Weight) | Thay thế tương đương Web | Vị trí áp dụng |
|---|---|---|---|---|
| **Primary Brand (Chữ thương hiệu chính)** | **Roboto** | Bold (700) / Black (900) | `Roboto:wght@700` | Tiêu đề "CAR CARE", Nút hành động chính (Primary Button), Heading quan trọng |
| **Sub-brand & Slogan (Phụ bản)** | **Myriad Variable Concept SemiCondensed** | Light (300) / Regular (400) | `Roboto Condensed:wght@300;400` | Dòng "AUDIO AND ACCESSORIES", nhãn phụ, tag thể loại |
| **Giao diện người dùng (UI / Body / Input)** | **Roboto** | Regular (400) / Medium (500) | `Roboto:wght@400;500` | Ô nhập liệu (Inputs), placeholder, nội dung bảng biểu, text mô tả |
| **Liên kết & Điều hướng phụ** | **Roboto** | Regular (400) | `Roboto:wght@400` | Link "Quên mật khẩu?", breadcrumb, footer link |

---

## 3. BẢNG MÀU CHỦ ĐẠO (CORE COLOR PALETTE)

| Màu sắc | Mã Hex / CSS | Ý nghĩa & Vị trí ứng dụng |
|---|---|---|
| **Đen tuyền (Deep Obsidian Black)** | `#000000` | Màu nền chủ đạo toàn màn hình (Background). Nền đen thuần túy làm tôn trọn vẹn logo và ánh sáng quang học. |
| **Xanh Google (Google Blue Primary)** | `#4285F4` | Màu nhận diện công nghệ chủ đạo: Nút bấm chính, viền focus khi nhập liệu, thanh tiến trình. |
| **Xanh Google Nhạt (Google Blue Light / Glow)** | `#8AB4F8` | Điểm nhấn phát sáng (Glow), viền halo, tia sáng laser quang học, màu hover liên kết. |
| **Xanh Google Đậm (Google Blue Dark)** | `#1A5FD4` | Điểm chuyển màu gradient cho nút bấm sang trọng (`linear-gradient(135deg, #8AB4F8, #4285F4, #1A5FD4)`). |
| **Trắng tinh khôi (Pure White)** | `#FFFFFF` | Nền ô nhập liệu (Inputs), logo chữ trắng, icon nổi bật. |
| **Xám kim loại / Muted (Subtext & Placeholder)** | `#8E95A5` / `rgba(0,0,0,0.42)` | Placeholder trong ô nhập, text phụ, icon mờ. |

---

## 4. QUY CHUẨN ÁNH SÁNG 3D QUANG HỌC (3D OPTICAL & VOLUMETRIC LIGHTING)
Tuyệt đối không dùng các vệt mờ gradient phẳng giả tạo. Ánh sáng của AP CAR CARE phải sắc nét và có độ sâu 3D như quay phim studio xe hơi:
1. **Ánh sáng Studio 3D (Volumetric Light Beam):** Luồng sáng hắt từ góc trên-phải (`top-right`) chiếu xiên xuống tạo chiều sâu không gian phòng tối/showroom xe sang.
2. **Tia sáng quang học ngang (Anamorphic Laser Streak):** Tia laser siêu mảnh, sắc bén như lưỡi dao, lõi trắng rực rỡ và viền phát sáng xanh `#8AB4F8`.
3. **Tia nhiễu xạ quang học (Diffraction Spike):** Tia sáng dọc mảnh tâm giao với tia ngang tạo điểm nhấn ngôi sao quang học (optical starburst) trước khi logo xuất hiện.
4. **Vệt phản chiếu kim loại Chrome (Specular Glint Sweep):** Vệt sáng quét góc 35–45 độ lướt qua bề mặt logo AP tròn, tạo cảm giác logo bằng kim loại chrome thật bóng loáng.

---

## 5. KỊCH BẢN CHUYỂN ĐỘNG GỐI ĐẦU ĐỒNG BỘ (OVERLAPPING / CASCADED MOTION)
Các thành phần **BẮT BUỘC** chuyển động theo nguyên tắc gối đầu liên tục (overlapping/staggered sync), **không chờ thành phần trước dừng lại mới bắt đầu**:
1. **0.0s – 0.7s:** Màn đen tuyền tĩnh lặng (`#000000`).
2. **0.7s – 1.8s:** Chùm tia sáng quang học 3D bùng nở ở trung tâm màn hình (Anamorphic Streak + Star Core).
3. **1.25s – 2.4s:** Logo AP tròn hiện dần ra với hiệu ứng fade-in mượt mà từ tâm.
4. **1.8s – 2.8s:** Vệt sáng Chrome quét qua bề mặt logo; logo bắt đầu nổi bóng 3D tinh tế (subtle ambient shadow).
5. **2.9s – 4.1s:** Logo AP mượt mà thu nhỏ và dịch chuyển lên vị trí trên cao.
6. **3.3s – 4.4s:** **Khi logo đang dịch chuyển (chưa kết thúc)**, ảnh chữ thương hiệu ("CAR CARE / AUDIO AND ACCESSORIES") lập tức trượt từ trái sang (slide-right) lộ diện kế bên logo.
7. **3.65s – 4.6s:** **Khi chữ chưa kết thúc**, ô Tên đăng nhập lập tức trượt lên và hiện rõ.
8. **3.9s – 4.85s:** Ô Mật khẩu nối tiếp ngay sau.
9. **4.15s – 5.1s:** Nút Đăng nhập nối tiếp ngay sau kèm hiệu ứng tia sáng quét bề mặt.
10. **4.4s – 5.35s:** Link "Quên mật khẩu?" nhẹ nhàng hiện ra bên dưới.
11. **3.0s – 5.6s:** Luồng sáng Studio 3D hắt từ góc trên-phải dần định hình không gian hoàn thiện.

*Tốc độ: Toàn bộ animation phải đằm thắm (thời lượng 0.9s – 1.2s mỗi đối tượng), dùng đường cong cubic-bezier mượt mà (`cubic-bezier(0.22, 1, 0.36, 1)`).*

---

## 6. QUY CHUẨN FORM & GIAO DIỆN CHÍNH THỨC (GLASSMORPHISM CARD & CAPSULE SPEC - THEO MOCKUP ANH ĐỨC)
- **Khung thẻ kính mờ (Glassmorphism Central Card):**
  - Kích thước vừa vặn cân đối (rộng 384px trên PC, min(calc(100vw - 32px), 340px) trên Mobile), bo tròn góc lớn 26px (22px trên mobile).
  - Nền kính mờ tối màu sang trọng `rgba(26, 28, 35, 0.42)`, `backdrop-filter: blur(28px)`, viền nét mảnh màu kim loại `1px solid rgba(255, 255, 255, 0.16)`.
  - Đổ bóng sâu trầm `box-shadow: 0 30px 80px rgba(0, 0, 0, 0.95)`, viền sáng phản chiếu nhẹ cạnh trên (`inset 0 1px 1px rgba(255, 255, 255, 0.3)`).
- **Header trong Card:**
  - Logo AP tròn nền đen chữ trắng (đường kính 52px trên PC, 44px trên mobile) đặt cạnh cụm chữ thương hiệu vector gốc ("CAR CARE / AUDIO AND ACCESSORIES") theo tỉ lệ vàng.
- **Ô nhập liệu hình viên thuốc (Capsule Inputs):**
  - Bo tròn hoàn toàn hai đầu (`border-radius: 9999px`), chiều cao 46px (44px trên mobile), padding thoáng rộng 22px (`padding: 0 22px`).
  - Nền đen mờ siêu nhẹ `rgba(255, 255, 255, 0.035)`, viền mảnh `1px solid rgba(255, 255, 255, 0.14)`.
  - Placeholder bạc mờ `rgba(255, 255, 255, 0.42)`, khi gõ chữ hiển thị trắng tuyền `#FFFFFF`.
  - Khi focus: Viền sáng ánh kim `rgba(255, 255, 255, 0.85)` kèm tỏa sáng nhẹ dịu `box-shadow: 0 0 16px rgba(255, 255, 255, 0.22)`.
- **Nút Đăng nhập 3D hình viên thuốc (Capsule 3D Off-White Button):**
  - Bo tròn viên thuốc (`border-radius: 9999px`), chiều cao 48px (46px trên mobile), viền sắc sảo `1px solid rgba(255, 255, 255, 0.85)`.
  - Nền gradient trắng ngà 3D sang trọng: `linear-gradient(180deg, #FFFFFF 0%, #ECECF0 52%, #DBDCE2 100%)`.
  - Chữ màu đen than (`#0A0A0E`), font weight Semi-bold (600), chữ in hoa, khoảng cách ký tự (tracking) thoáng nhẹ `0.26em`.
  - Đổ bóng khối 3D mạnh mẽ: `box-shadow: 0 8px 24px rgba(0, 0, 0, 0.75), inset 0 1px 1px #FFFFFF, inset 0 -2px 3px rgba(0, 0, 0, 0.15)`.
  - Vệt sáng kim loại nhẹ nhàng lướt qua khi nút xuất hiện.
- **Họa tiết kéo nghiêng ở nền (Background Ribbon Pattern):**
  - Dải sóng uốn lượn vân kim loại/aerodynamic chéo từ góc dưới-trái lên góc trên-phải (stroke gradient xanh Google, trắng, bạc).
  - Xuất hiện **SAU CÙNG** trong chuỗi animation khi tải trang (delay ~4.3s) và **slide up**.
  - **Ngay thời điểm slide up, có tia sáng quang học quét xéo 45 độ** từ góc dưới bên trái sang góc trên bên phải, tốc độ êm ái sang trọng.
- **Ngôi sao quang học 4 cánh (Corner Optical Star):**
  - Đặt ở góc dưới bên phải màn hình, lấp lánh nhẹ nhàng tinh tế.
- **Liên kết "Quên mật khẩu?":** Đặt ngay bên dưới nút Đăng nhập, font Inter thanh mảnh, màu xám bạc mờ, hover sáng trắng nhẹ, click mở modal hỗ trợ.

---

## 7. QUY TRÌNH DUYỆT & REVIEW BẮT BUỘC TRƯỚC KHI CODE (CHECKLIST)
Mỗi Agent trước khi triển khai bất kỳ module nào tiếp theo phải tự kiểm tra 5 điều kiện:
- [ ] 1. Đã view_file đọc lại `hq/design_aesthetic_memo.md` chưa?
- [ ] 2. Font chữ đã dùng đúng Roboto (Bold/Regular) và Roboto Condensed chưa?
- [ ] 3. Bảng màu đã dùng đúng chuẩn Đen tuyền `#000000` + Xanh Google `#4285F4` + Trắng `#FFFFFF` chưa?
- [ ] 4. Giao diện có bị rườm rà thừa thãi không? Đã loại bỏ hết các badge/text kỹ thuật chưa?
- [ ] 5. Đã chạy script `.\backup.ps1` trước khi can thiệp code chưa?
