# Tài Liệu Định Chuẩn Thiết Kế Giao Diện & Trải Nghiệm (Design Aesthetic Memo)
**Dự án:** App AP CAR CARE (SME OS)  
**Áp dụng:** BẮT BUỘC XUYÊN SUỐT TOÀN BỘ DỰ ÁN (Cả PC/Laptop & Mobile)  
**Phê duyệt:** Product Owner: anh Đức  
**Cập nhật lần cuối:** 24/10/2026 (Lucy / Antigravity — Bổ sung Chuẩn Font Tiếng Việt Phương án A, 5 Nguyên tắc Humanizer, Dual-Theme theo Banner CEO anh Lộc & Quy trình Kiểm thử Kép PC + Mobile từ bài học `ERR-007..010`)  

---

## ⚠️ QUY TẮC BẮT BUỘC DÀNH CHO TOÀN BỘ AI AGENT (MANDATORY GATEWAY)
> **Mỗi khi nhận bất kỳ yêu cầu nào liên quan đến UI/UX, giao diện, chuyển động, typography, màu sắc hoặc tính năng mới:**  
> Agent **BẮT BUỘC** phải gọi `view_file` đọc toàn bộ file này + Bảng Tra Cứu Nhanh trong [`hq/lesson.md`](file:///D:/My%20Agents/Projects/App%20AP%20CAR%20CARE/hq/lesson.md) **TRƯỚC KHI** suy nghĩ giải pháp, lập kế hoạch hoặc viết bất kỳ dòng code nào.  
> Mọi thiết kế mới phải đối chiếu nghiêm ngặt với các tiêu chuẩn bên dưới để đảm bảo tính nhất quán 100% thương hiệu trên cả **PC/Laptop (`> 1024px`)** lẫn **Mobile/Tablet (`<= 1024px`)**.

---

## 1. TRIẾT LÝ THIẾT KẾ CỐT LÕI (CORE DESIGN PHILOSOPHY)
- **Phong cách chủ đạo:** **Ultra-Luxury, Automotive Showroom Precision, Human-Crafted Editorial, Minimalist**.
- **Cảm hứng thực tế:**
  1. **Màn hình Welcome/Login (`#viewLogin`):** Không gian phòng tối studio ánh sáng quang học 3D cao cấp.
  2. **Không gian Điều hành SME OS (`#viewHome`):** Lấy cảm hứng trực tiếp từ **Banner chuẩn của Giám đốc CEO AP — anh Lộc** (*"CHẤT LƯỢNG KHÔNG ĐẾN TỪ MAY MẮN"* — Chiếc Porsche 911 GT3 Đen Piano bóng gương đặt trong Phòng Lab Detailing Trắng Bạch Kim với đường cắt chéo kép Đen Tuyền + Xanh Cobalt `#0066FF`).
- **Tiêu chí tối thượng:**
  - **Tối giản đỉnh cao (`Simplicity First < 30s`):** Loại bỏ hoàn toàn các dòng giải thích nhỏ rườm rà và thuật ngữ kỹ thuật backend.
  - **Khử mùi AI (`100% Humanizer — De-AI-fying`):** Cấm tuyệt đối việc dùng Emoji màu hệ thống (`👑 📢 🛠️ 💰 ✨...`) và cấm bọc viền xanh neon phát sáng tràn lan ở mọi phần tử.

---

## 2. QUY CHUẨN TYPOGRAPHY TIẾNG VIỆT (PHƯƠNG ÁN A — CHUẨN NGÀNH Ô TÔ CAO CẤP, 100% KHÔNG LỖI DẤU)
*(Cập nhật ngày 24/10/2026 từ bài học `[ERR-007]` để triệt tiêu hoàn toàn lỗi biến dạng dấu Tiếng Việt `Đ`, `Ố`, `Ệ`, `ƯỢ`, `Ỹ`, `Ậ`, `Ữ`)*

Bắt buộc nhúng tại `<head>` đầy đủ bộ ký tự Tiếng Việt (`&display=swap&subset=vietnamese`):
```html
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,500;0,600;0,700;1,600&family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap&subset=vietnamese" rel="stylesheet">
```

| Vai trò Typography | Biến CSS | Tên Font Chính Thức | Trọng số (Weight) | Vị trí áp dụng |
|---|---|---|---|---|
| **1. Tiêu đề lớn & Con số KPI (`Display`)** | `--font-display` | **`Barlow Condensed`** | SemiBold (`600`), Bold (`700`) | Tiêu đề Phòng ban (`.home-title`), Tiêu đề Topbar (`.ap-topbar-title`), Con số KPI lớn (`.ap-kpi-value`), Tên thương hiệu `AP CAR CARE`. Dáng chữ cao khỏe khoắn y hệt tiêu đề *"CHẤT LƯỢNG KHÔNG ĐẾN TỪ MAY MẮN"* trên Banner CEO anh Lộc. |
| **2. Giao diện, Menu, Bảng biểu & Nội dung (`UI Sans`)** | `--font-sans` | **`Be Vietnam Pro`** | Regular (`400`), Medium (`500`), SemiBold (`600`), Bold (`700`) | Toàn bộ nút bấm Sidebar, Nhãn phụ, Bảng dữ liệu 4D, Ô nhập liệu, Dropdown phân quyền. Bộ font thiết kế chuyên biệt cho Tiếng Việt, khoảng cách dấu thanh/mũ thoáng và sắc nét tuyệt đối. |
| **3. Mã lệnh, Biển số xe & Tiền tệ (`Monospace`)** | `--font-mono` | **`JetBrains Mono`** | Medium (`500`), SemiBold (`600`) + `tabular-nums` | Biển số xe (`51K-888.99`), Mã lệnh `RO-2610-01`, Mã `SKU`, Badge phần trăm độ tin cậy AI. |

---

## 3. HỆ THỐNG 2 THEME CHỦ ĐẠO (THEO GU THẨM MỸ CEO ANH LỘC) & BẢNG MÀU CHUẨN (`[ERR-010]`)

Hệ thống hỗ trợ song song **2 Theme chủ lực** chuyển đổi tức thì qua thuộc tính `data-ap-theme="dark" | "light"` trên `#viewHome` (kèm nút chuyển đổi 1-click `#btnQuickThemeToggle` ngay trên Topbar):

| Thành phần | 🌑 THEME 1 (`data-ap-theme="dark"`): **AP CARBON NIGHT (Dark Blue & Piano Black)** | ☀️ THEME 2 (`data-ap-theme="light"`): **AP SHOWROOM PLATINUM (Theme Trắng + Sidebar Đen Gradient)** |
| :--- | :--- | :--- |
| **Sidebar Trái (`#apSidebar`)** | **Đen Obsidian Gradient:** `linear-gradient(175deg, #04060B 0%, #091120 52%, #04070D 100%)` | **Giữ nguyên Đen Obsidian Gradient:** `linear-gradient(175deg, #05080F 0%, #0B1324 52%, #04070D 100%)` tạo độ tương phản sang trọng với nền trắng. |
| **Nền Khu vực Làm việc (`--ap-stage-bg`)** | Đen Carbon & Midnight (`#070A10` → `#0A101B`) | Trắng Bạch Kim Showroom (`#F4F6F9` → `#EBEEF4` — chuẩn phòng Lab Detailing trong Banner Hình 3) |
| **Nền Thẻ KPI & Bảng (`--ap-card-bg`)** | Kính tối Carbon (`rgba(15, 22, 36, 0.94)`), viền mảnh `rgba(255,255,255,0.075)` | Trắng Tinh Khôi (`#FFFFFF`), viền mảnh `#E2E8F0`, bóng đổ studio `0 8px 24px rgba(15,23,42,0.045)` |
| **Màu Tiêu đề & Số KPI (`--ap-text-heading`)** | Trắng tinh khiết `#FFFFFF` | **Đen Piano `#0A0E17`** (y hệt màu chữ *"CHẤT LƯỢNG"* trên Banner Hình 3) |
| **Màu Điểm nhấn Chiến lược (`--ap-accent`)** | **Xanh AP Cobalt `#0A6CFF` / `#388BFF`** | **Xanh AP Electric Cobalt `#0066FF`** (y hệt màu chữ *"KHÔNG ĐẾN TỪ MAY MẮN"* và số `50%`, `20%` trên Hình 3) |

---

## 4. NĂM NGUYÊN TẮC THIẾT KẾ "HUMANIZER" (CHỐNG CẢM GIÁC AI RẺ TIỀN — `[ERR-008]`)
1. **Chính sách 0% Emoji màu hệ thống (`Zero-Emoji Policy`):** Tuyệt đối không dùng bất kỳ ký tự Emoji Unicode màu mè nào trong HTML hoặc JS của `#viewHome`.
2. **Hệ thống Icon Vector Line-Art Đơn sắc (`1.65px` Monochrome SVG):** Mọi icon trên Sidebar, Topbar, Dải AI và Tiêu đề bảng đều phải dùng SVG nét mảnh `stroke-width="1.65" - "1.8"` đồng màu (`stroke="currentColor" fill="none"`), mô phỏng chính xác phong cách icon kỹ thuật trên Banner của CEO anh Lộc.
3. **Quy tắc Điểm nhấn 10% (`10% Cobalt Accent Rule`):** Không bọc viền phát sáng neon quanh mọi phần tử. Các thẻ dùng viền cấu trúc mảnh (`1px solid var(--ap-border-subtle)`), chỉ đặt màu nhấn **Xanh AP Cobalt (`#0066FF`)** tại nút đang chọn, vạch đứng `4px` cạnh trái Hero, gạch chân `36px` dưới thẻ KPI và nút CTA chính.
4. **Họa tiết Đường cắt chéo Kiến trúc AP (`.ap-dept-hero::after`):** Mỗi thanh tiêu đề phòng ban có họa tiết **2 dải cắt chéo song song Đen Tuyền + Xanh Cobalt nghiêng `-28deg`** lấy trực tiếp từ thiết kế Banner Porsche 911 của CEO anh Lộc.
5. **Dòng phụ KPI tinh gọn:** Dùng chấm tròn tín hiệu `6px` (`.ap-kpi-sub::before`) thay cho icon emoji.

---

## 5. QUY CHUẨN MÀN HÌNH LOGIN V11 (`#viewLogin` — BẢO TOÀN BẤT BIẾN 100%)
- Toàn bộ quy chuẩn Ánh sáng 3D Quang học (Volumetric Light Beam, Anamorphic Laser Streak, Diffraction Spike, Specular Glint Sweep), Kịch bản chuyển động gối đầu 11 bước (`0.0s – 5.6s`), Khung thẻ kính mờ Glassmorphism (`.glass-card`), Ràng buộc cố định `.card-brand-header` và Dải lụa phát quang nền (`#starComet`) của `#viewLogin` (`L1–L784` & `L2334–L2562` trong `src/Index.html`) **được khóa bảo toàn 100%**, tuyệt đối không tự ý thay đổi khi nâng cấp `#viewHome`.

---

## 6. QUY TRÌNH THIẾT KẾ & KIỂM THỬ KÉP BẮT BUỘC TRÊN CẢ PC/LAPTOP VÀ MOBILE (`[ERR-009]`)
*(Cập nhật bắt buộc từ bài học lỗi vỡ giao diện Mobile ở Hình 2 — Áp dụng cho mọi task UI/UX)*

Bất kỳ khi nào thiết kế mới hoặc chỉnh sửa giao diện trong `src/Index.html`, Agent **BẮT BUỘC thực hiện quy trình 4 Bước Kiểm soát Kép (PC + Mobile Dual-Viewport Protocol)**:

1. **Bước 1 — Dọn dẹp CSS Tàn dư 1 Nguồn Duy Nhất (`Single CSS Block Guard`):**
   - Kiểm tra toàn bộ file `src/Index.html` để đảm bảo chỉ có **1 khối CSS duy nhất** định nghĩa cho `#viewHome`. Tuyệt đối không để sót CSS cũ trong `<head>` gây ghi đè ngược font chữ hoặc `@media` query.
2. **Bước 2 — Thiết kế Kiến trúc Đáp ứng Kép (`PC Fixed Sidebar` + `Mobile Off-Canvas Drawer`):**
   - **Trên PC/Laptop (`> 1024px`):** Sidebar Đen Gradient (`width: 282px`) cố định bên trái; Topbar nằm trên 1 hàng ngang; lưới KPI hiển thị 4 cột (`repeat(4, minmax(0, 1fr))`).
   - **Trên Mobile & Tablet (`<= 1024px`):**
     * **Sidebar:** Bắt buộc chuyển thành **Off-Canvas Slide-Over Drawer** (`position: fixed; left: 0; top: 0; bottom: 0; transform: translateX(-105%); z-index: 1250`) kèm lớp mờ `#apSidebarBackdrop`, nút mở `#btnMobileMenuToggle` trên Topbar và tự động đóng lại khi chọn phòng ban. **Cấm tuyệt đối** dùng `.ap-sidebar { position: relative; height: auto }` trên Mobile.
     * **Topbar Mobile 2 Tầng (Chống gãy chữ dọc):** `.ap-topbar` phải đặt `flex-direction: column`:
       - **Tầng 1 (`.ap-topbar-left`):** `width: 100%` chứa `[Nút Menu ☰]` + `[#topbarActiveTitle]` với `flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: clamp(16px, 4.2vw, 20px)` để tiêu đề **luôn nằm trên 1 dòng ngang duy nhất**, không bao giờ bị ép thành cột chữ dọc.
       - **Tầng 2 (`.ap-topbar-right`):** `width: 100%` chứa bộ chọn `Role Preview`, nút đổi nhanh Theme (`#btnQuickThemeToggle`) và nút Cài đặt.
     * **Hero, AI Strip & Bảng biểu trên Mobile:** `.ap-dept-hero` và `.ap-ai-insight-strip` tự động chuyển sang `flex-direction: column`, nút bấm rộng `100%`; lưới KPI chuyển về 2 cột (`<= 1180px`) và 1 cột (`<= 560px`); mọi bảng dữ liệu bọc trong `.ap-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }`.
3. **Bước 3 — Kiểm thử Tự động bằng Script (`Automated Pre-Commit Gate`):**
   - Chạy script kiểm tra tự động bằng Node.js xác nhận 5 tiêu chí đạt `TRUE` 100%:
     - [x] `zeroBackticksInScript === true` (Không có dấu `` ` `` trong `<script>` — `[ERR-005]`).
     - [x] `zeroEmojisInHome === true` (Không có bất kỳ emoji màu nào trong `#viewHome` — `[ERR-008]`).
     - [x] `hasBarlowCondensed && hasBeVietnamPro === true` (Đã nạp đủ Google Fonts Tiếng Việt — `[ERR-007]`).
     - [x] `hasDarkAndLightThemes === true` (Đầy đủ biến CSS cho cả Theme Dark Blue & Theme Trắng — `[ERR-010]`).
     - [x] `hasMobileOffCanvasDrawer === true` (Đầy đủ Off-Canvas Drawer & Topbar 2 tầng cho Mobile — `[ERR-009]`).
4. **Bước 4 — Chạy Backup trước khi code & Deploy đồng bộ `gh-pages`:**
   - Luôn chạy `.\backup.ps1` trước khi sửa code, và chạy `.\deploy-demo.ps1` sau khi commit để bản Live Demo cập nhật tức thì trên cả máy tính và điện thoại của anh Đức.
