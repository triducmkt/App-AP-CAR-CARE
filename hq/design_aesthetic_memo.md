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
- **Khung thẻ kính mờ (Glassmorphism Central Card - Theo sát hình mẫu 2):**
  - Kích thước vừa vặn cân đối (rộng 384px trên PC, min(calc(100vw - 32px), 340px) trên Mobile), bo tròn góc lớn 26px (22px trên mobile).
  - Nền kính bắt sáng từ luồng đèn góc trên-phải: `linear-gradient(142deg, rgba(255,255,255,0.15) 0%, rgba(36,44,58,0.46) 38%, rgba(14,18,26,0.72) 100%)`, `backdrop-filter: blur(28px)`.
  - Viền kính sắc nét: Cạnh trên và cạnh phải bắt sáng mạnh (`border-top: 1px solid rgba(255,255,255,0.52); border-right: 1px solid rgba(255,255,255,0.3)`), cạnh trái và dưới mờ dịu (`1px solid rgba(255,255,255,0.16)`).
  - Đổ bóng sâu trầm: `box-shadow: 0 35px 85px rgba(0,0,0,0.96), inset 0 1px 1px rgba(255,255,255,0.42)`.
- **RÀNG BUỘC CỐ ĐỊNH LOGO VÀ CHỮ THƯƠNG HIỆU (BẮT BUỘC VĨNH VIỄN):**
  - Logo AP tròn và chữ CAR CARE AUDIO AND ACCESSORIES **BẮT BUỘC nằm chung trong một container flexbox duy nhất: `.card-brand-header`**.
  - Tuyệt đối không dùng toạ độ pixel bay độc lập để tránh sai lệch trên các thiết bị/độ phân giải khác nhau.
  - Logo và chữ luôn cố định đứng kế bên nhau chuẩn xác trên mọi màn hình từ 320px đến 4K.
- **BỐ CỤC ÁNH SÁNG GRADIENT NỀN (THEO SÁT HÌNH MẪU 2 - NÂNG CẤP V9 RÕ HƠN 15-20%):**
  - **Nền gốc:** Đen sâu tuyền `#020408`.
  - **Góc trên-phải (Top-Right):** Nguồn sáng studio rõ ràng, gồm quầng sáng xanh sapphire (`rgba(48,105,185,0.58)` lan sang `rgba(25,62,115,0.42)`), kết hợp dải wash xiên 220 độ (`rgba(36,85,160,0.25)`) chiếu xiên sắc nét từ trên-phải xuống dưới-trái (rõ hơn 15-20% so với trước).
  - **Góc dưới-trái (Bottom-Left):** Quầng sáng xanh đen studio huyền bí `rgba(30,68,126,0.70)` hắt lên tôn vinh dải lụa (rõ hơn 15-20% so với trước).
  - **BỎ HẲN NGÔI SAO MÀU TRẮNG:** Tuyệt đối không để ngôi sao trắng ở góc dưới bên phải.
- **Ô nhập liệu hình viên thuốc (Capsule Inputs):**
  - Bo tròn hoàn toàn hai đầu (`border-radius: 9999px`), chiều cao 46px (44px trên mobile), padding thoáng rộng 22px (`padding: 0 22px`).
  - Nền đen mờ siêu nhẹ `rgba(255, 255, 255, 0.035)`, viền mảnh `1px solid rgba(255, 255, 255, 0.15)`.
  - Placeholder bạc mờ `rgba(255, 255, 255, 0.42)`, khi gõ chữ hiển thị trắng tuyền `#FFFFFF`.
  - Khi focus: Viền sáng ánh kim `rgba(255, 255, 255, 0.85)` kèm tỏa sáng nhẹ dịu `box-shadow: 0 0 16px rgba(255, 255, 255, 0.25)`.
- **Nút Đăng nhập 3D hình viên thuốc (Capsule 3D Off-White Button):**
  - Bo tròn viên thuốc (`border-radius: 9999px`), chiều cao 48px (46px trên mobile), viền sắc sảo `1px solid rgba(255, 255, 255, 0.85)`.
  - Nền gradient trắng ngà 3D sang trọng: `linear-gradient(180deg, #FFFFFF 0%, #ECECF0 52%, #DBDCE2 100%)`.
  - Chữ màu đen than (`#0A0A0E`), font weight Semi-bold (600), chữ in hoa, khoảng cách ký tự (tracking) thoáng nhẹ `0.26em`.
  - Đổ bóng khối 3D mạnh mẽ: `box-shadow: 0 8px 24px rgba(0, 0, 0, 0.75), inset 0 1px 1px #FFFFFF, inset 0 -2px 3px rgba(0, 0, 0, 0.15)`.
- **Họa tiết kéo nghiêng ở nền (Background Silk Ribbon Stream - Chuẩn v10 theo sát hình mẫu):**
  - Dải họa tiết **vuốt thon nhọn ở góc dưới bên phải** và **xòe rộng mềm mại lên góc trên bên trái** theo hình mẫu tham chiếu (`hq/brand_assets/reference_ribbon_flow.png`).
  - Các đường line trắng trong dải lụa: **nhiều, nhuyễn, thanh mảnh (0.9px - 1.5px)**, độ mờ nhẹ dịu (opacity 0.4 - 0.75), không trắng đậm quá, tạo cảm giác dải lụa phát quang siêu thực.
  - **Dải ánh sáng gradient trắng nền (White Glow Underlay):** Nằm fix trực tiếp phía sau và uốn lượn ôm sát theo dải lụa, làm nền sáng phát quang mờ dịu (`stroke-width: 160px`, `filter: blur(38px)`), co giãn bám theo dải lụa đồng bộ 100% ở mọi kích cỡ màn hình thiết bị.
  - **Chùm ánh sáng quang học di chuyển chéo (Cinematic Optical Lens Flare - Chuẩn v11 giống 100% hình mẫu tham chiếu):**
    - **Tâm chùm sáng (Supernova Radiant Core):** Lõi ánh sáng trắng cực đại với quầng hào quang phát quang mềm mại bao quanh tâm (cx=0, cy=0).
    - **Bộ 3 tia laser ngang Anamorphic (Triple Anamorphic Streaks):** 1 tia laser chính kéo dài xuyên suốt ngang qua tâm chùm sáng + 2 tia laser song song thanh mảnh chạy lệch ở phía trên và dưới, mô phỏng thấu kính Anamorphic cao cấp trong điện ảnh Hollywood.
    - **Vòng tròn Halo Lens (Circular Halo Ring):** Vòng hào quang tròn bao bọc đồng tâm quanh lõi thấu kính.
    - **Hệ gai nhiễu xạ (Diffraction Spikes):** Các tia nhọn thanh mảnh vuốt dài theo phương thẳng đứng và phương chéo nghiêng (~-30°).
    - **Hệ thống bóng mờ quang học & hạt Bokeh (Multi-element Lens Ghosts & Bokeh Discs):** Các đốm sáng quang học và đĩa bokeh tròn xếp dọc theo trục chéo thấu kính (đốm sáng nhỏ ở góc trên-trái; đốm lấp lánh và đĩa bokeh mờ ở góc dưới-phải).
    - **Màu sắc & Glow:** Toàn bộ ánh sáng là màu trắng tinh khiết (`#FFFFFF`) với hiệu ứng glow phát quang dịu mắt, hòa trộn mềm mại với dải lụa qua chế độ `mix-blend-mode: screen`.
    - **Thời điểm khởi động & Quỹ đạo:** Animate di chuyển gối đầu ở thời điểm 2.2s (ngay khi logo AP tròn lớn vừa xuất hiện xong), lướt chậm dần (`decelerating ease-out: 0.12 0.75 0.22 1`) từ góc dưới-phải chéo lên góc trên-trái theo đúng đường line bám sát dải lụa.
- **Liên kết "Quên mật khẩu?" & Thông báo trạng thái:**
  - Link "Quên mật khẩu?" đặt ngay bên dưới nút Đăng nhập, click mở modal hỗ trợ.
  - Thông báo lỗi/trạng thái màu đỏ mềm mại (`#FF6B6B`), font 11.5px hiển thị dưới link (như trong hình mẫu 2).

---

## 7. QUY TRÌNH DUYỆT & REVIEW BẮT BUỘC TRƯỚC KHI CODE (CHECKLIST)
Mỗi Agent trước khi triển khai bất kỳ module nào tiếp theo phải tự kiểm tra 5 điều kiện:
- [ ] 1. Đã view_file đọc lại `hq/design_aesthetic_memo.md` chưa?
- [ ] 2. Font chữ đã dùng đúng Roboto (Bold/Regular) và Roboto Condensed chưa?
- [ ] 3. Bảng màu đã dùng đúng chuẩn Đen tuyền `#000000` + Xanh Google `#4285F4` + Trắng `#FFFFFF` chưa?
- [ ] 4. Giao diện có bị rườm rà thừa thãi không? Đã loại bỏ hết các badge/text kỹ thuật chưa?
- [ ] 5. Đã chạy script `.\backup.ps1` trước khi can thiệp code chưa?
