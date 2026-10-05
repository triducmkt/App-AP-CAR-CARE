# 01-LOG.md — Nhật ký (append-only, không sửa/xoá mục cũ)

## 2026-10-04 19:50 — Lucy/Antigravity
- Yêu cầu của anh Đức (/global): dùng `D:\My Agents\Projects\` làm gốc chung vĩnh viễn, mỗi dự án nằm gọn 1 thư mục.
- Tạo dự án `App AP CAR CARE` tại `D:\My Agents\Projects\App AP CAR CARE\` gồm `AGENTS.md`, `CLAUDE.md`, `hq/`, `src/`, `backup/`, `backup.ps1`.
- Tạo junction `business-docs` → `D:\My Documents\KINH DOANH\All-in-one Business Plan\Cac kinh doanh TDC Media tu van\AP CAR CARE` để đồng bộ dữ liệu sẵn có (không copy).
- Quyền Modify (Everyone) trên 2 thư mục AP CAR CARE đã cấp trước đó bằng `icacls`.
- Đính chính: ghi chú phiên trước nói đã copy cấu hình TDCM sang AP CAR CARE là KHÔNG chính xác; lúc đó thư mục chỉ có AGENTS.md. Khung hq hiện tại mới được tạo thật.

## 2026-10-04 22:35 — Lucy/Antigravity
- Rà soát toàn diện và chuẩn hóa khung quy tắc làm việc cho bộ 3 file: hq/lesson.md, hq/schematic_map.md và hq/CODING_TASKS.json.
- lesson.md: Đã nạp đầy đủ 2 nguyên tắc debug cốt lõi (khoanh vùng code mới thêm từ commit trước, dừng khẩn cấp khi i=3) + Mẫu chuẩn format [ERR-xxx].
- schematic_map.md: Đã nạp quy tắc tự động cập nhật / bỏ qua + Khung sơ đồ Mermaid mẫu + 4 trụ cột kỹ thuật (SSOT, FIELD_MAP...) + Bảng phân chia Frontend/Backend.
- CODING_TASKS.json: Đã nạp đối tượng hướng dẫn _GUIDE (Mandatory Scan Workflow, quét dọn tàn dư Cấp độ 1 & 2, leo thang Escalation, Schema chuẩn).
- AGENTS.md: Bổ sung đồng bộ quy trình quét scan trước khi code và chuẩn FIELD_MAP. Commit: c990f51.
## 2026-10-04 22:42 — Lucy/Antigravity
- Thực hiện yêu cầu của anh Đức: Nạp nguyên bản 100% nội dung file lesson.md từ dự án Project TDCM Team App sang hq/lesson.md của App AP CAR CARE (dung lượng: 17.624 bytes, khớp hash 100%).
- Toàn bộ kinh nghiệm xử lý lỗi (lỗi lồng nháy template literal, lỗi bộ lọc Caja HtmlService, lỗi render state machine, khoanh vùng lỗi theo confirm mốc...) đã được tích hợp đầy đủ.
## 2026-10-04 22:50 — Lucy/Antigravity
- Bổ sung bối cảnh dự án cốt lõi: Ứng dụng đa năng phục vụ Khách hàng, Nhân viên, Đối tác của Công ty TNHH AP CAR CARE (Detailing, Phụ kiện, Đồ chơi xe, Âm thanh Focal... tại TPHCM & Toàn quốc).
- Xác lập cơ chế phân vai phối hợp: Lucy (Kỹ sư phần mềm / lập trình chính), anh Đức (Trợ lý dự án kiêm phụ trách chức năng nghiệp vụ).
- Khởi tạo 8 câu hỏi khảo sát nghiệp vụ để làm rõ phạm vi chức năng, kiến trúc kỹ thuật và luồng dữ liệu đầu vào.
## 2026-10-04 22:57 — Lucy/Antigravity
- Đính chính phân vai nhân sự chuẩn xác theo chỉ đạo của anh Đức:
  + **Lucy (AI Agent):** Đảm nhiệm toàn diện: AI kỹ sư phần mềm / kiến trúc sư giải pháp & lập trình viên chính, Trợ lý dự án kiêm phụ trách các vị trí chức năng chuyên môn, Business Analyst (BA), Kiểm thử chất lượng (QA) & Điều phối giải pháp.
  + **Anh Đức:** Đóng 1 vai trò duy nhất là **Product Owner (PO)** — Định hướng tầm nhìn sản phẩm, phê duyệt tính năng, ra quyết định nghiệm thu và mục tiêu kinh doanh.
## 2026-10-04 23:10 — Lucy/Antigravity
- Ghi nhận yêu cầu phong cách thiết kế từ Product Owner (anh Đức):
  + Tinh thần: Ultra-luxury, automotive premium, minimalist, studio lighting (tham chiếu ảnh Mercedes S-Class đen tuyền bóng gương).
  + 3 Màu chủ đạo: Đen tuyền (#000000, #08090B), Trắng tinh khôi (#FFFFFF), Xanh dương nhạt (Google Blue #4285F4 / #8AB4F8).
  + Kịch bản Motion Graphic: Load đen tuyền -> 0.5s hiện dần logo tròn AP lớn giữa màn hình (tilt 3D) -> Logo zoom nhỏ lại và hiện chữ "AP CAR CARE AUDIO & ACCESSORIES" kế bên -> Xuất hiện form đăng nhập gồm 2 ô "Tên đăng nhập" và "Mật khẩu" + nút đăng nhập đồng bộ.
  + Tech Stack Giai đoạn 1: Google Apps Script Web App.
  + Backend Database: Google Sheet ID 1ziGRRq92AxX9BnDMYbHF-iES7XskALCaOK6LeUw_IS0.
- Ban hành file quy chuẩn thiết kế vĩnh viễn: hq/design_aesthetic_memo.md.
- Trích xuất logo tròn AP (usiness-docs/logo/Logo AP nen den chu trang.png) sang base64 lưu tại hq/logo_b64.txt.
- Cập nhật kiến trúc hệ thống vào hq/schematic_map.md và tạo TASK-001 trong hq/CODING_TASKS.json.
## 2026-10-04 23:11 — Lucy/Antigravity
- Được sự đồng ý và phê duyệt từ Product Owner (anh Đức):
- Đã thực hiện chạy .\backup.ps1 trước khi đưa code vào src/ (Mã backup snapshot: 84bf45f).
- Tạo thành công bộ 3 file mã nguồn cốt lõi trong src/:
  1. src/appsscript.json: Cấu hình manifest V8 runtime và múi giờ Việt Nam.
  2. src/Code.gs: Bộ điều phối backend xử lý doGet(), xác thực tài khoản checkLogin() qua Google Sheet ID 1ziGRRq92AxX9BnDMYbHF-iES7XskALCaOK6LeUw_IS0 theo chuẩn FIELD_MAP Pattern.
  3. src/Index.html: Giao diện Welcome & Login siêu sang (Motion Graphic logo AP 3D, responsive PC và Mobile, màu Đen/Trắng/Google Blue).
## 2026-10-04 23:22 — Lucy/Antigravity
- Khắc phục sự cố màn hình đen theo phản hồi của Product Owner:
  + Dừng khẩn cấp và loại bỏ hoàn toàn tiến trình nền 
ode serve.js để giải phóng máy, không để tác vụ nền chạy ngầm gây lag.
  + Phân tích nguyên nhân root-cause màn hình đen: Do chuỗi HTML trong innerHTML bị PowerShell nuốt mất dấu backtick khi sinh file, tạo thành lỗi cú pháp SyntaxError: Unexpected token '<'.
  + Đã sửa triệt để lỗi cú pháp trong cả 2 file src/Index.html và hq/demo_welcome_login.html, chạy xác minh cú pháp 
ode -e "new Function(...)" đạt chuẩn 100%.
  + Ghi nhận bài học kinh nghiệm mã [ERR-005] vào hq/lesson.md.
- Kết nối remote và đẩy mã nguồn lên GitHub:
  + Remote: https://github.com/triducmkt/App-AP-CAR-CARE.git.
  + Đã push thành công toàn bộ branch main lên GitHub repo.
## 2026-10-05 06:53 — Lucy/Antigravity
- Tiếp nhận chỉ đạo toàn cục /global: Bổ sung quy định cung cấp link demo trải nghiệm (VĨNH VIỄN).
  + Mỗi khi cung cấp demo cho anh Đức, Agent BẮT BUỘC chỉ đưa link truy cập nhanh (bấm click trực tiếp mở cửa sổ trình duyệt tương tác ngay).
  + Tuyệt đối không đưa file code HTML hoặc các dạng file mã nguồn khác trừ khi anh Đức yêu cầu cụ thể.
- Đã cập nhật vào D:\My Agents\Global\GLOBAL-RULES.md và chạy script sync-rules.ps1 đồng bộ sang toàn bộ Claude, Codex, Gemini và AI-HQ.
- **Lucy** – 2026-10-05 08:38 – Thực hiện redesign giao diện Welcome & Login: blackout 0.5s → light streak → logo fade+glint → shadow → scale‑up + translate → brand text slide‑right → form inputs staggered (username → password → button). Đồng nhất PC & mobile.

## 2026-10-05 11:20 — Lucy/Antigravity — Rebuild Welcome & Login v2
- Yêu cầu anh Đức: đổi logo AP đơn (ảnh 1), bỏ viền xanh, đổ bóng tinh tế; chữ bên cạnh = ảnh 2 (CAR CARE / AUDIO AND ACCESSORIES) + animation slide-right; bỏ mọi text thừa; Tên đăng nhập/Mật khẩu làm placeholder.
- Làm: viết lại hoàn toàn `src/Index.html` theo kịch bản 7 bước (đen 0.5s → tia sáng loé → logo fade + tia ngang → đổ bóng → logo thu nhỏ & lên cao → chữ slide-right → ô user → ô pass → nút). Ánh sáng hắt góc trên-phải, nền #000. Ô nhập trắng, placeholder đen mờ; nút gradient xanh. Font Helvetica/Arial đồng bộ chữ logo.
- Ảnh gốc lưu ở `hq/brand_assets/`. Logo cắt tròn trong suốt; chữ chuyển nền đen → trong suốt (chữ trắng); nhúng base64 vào Index.html (GAS 1 file).
- Backend: submit gọi `google.script.run.checkLogin` nếu chạy trong GAS, ngoài GAS thì chế độ demo.
- Đã kiểm thử bằng Edge headless (PC final + giữa animation + mobile).
- Tồn đọng trước đó: commit d6b5ef0 (bản sai, trỏ tới ảnh không tồn tại) chưa push → đã thay bằng bản này.

## 2026-10-05 12:12 — Lucy/Antigravity — Nâng cấp Welcome & Login v3 & Thiết lập Quy trình Chuẩn hóa Thiết kế
- **Research Font từ tư liệu gốc:**
  - Khám phá file `business-docs/logo/font logo AP.png` và vector `business-docs/logo/Logo AP.pdf`: Dòng chính "CAR CARE" sử dụng **Roboto Bold (700)**; dòng phụ "AUDIO AND ACCESSORIES" sử dụng **Myriad Variable Concept SemiCondensed** / **Roboto Condensed (300; 400)**.
  - Đã nạp Google Fonts Roboto & Roboto Condensed cho toàn bộ typography (ô input, placeholder, nút đăng nhập, link phụ).
- **Nâng cấp Hệ thống Ánh sáng 3D Quang học (Optical & Volumetric Studio Lighting):**
  - Bổ sung Anamorphic Laser Streak sắc nét với lõi trắng và viền xanh phát sáng 3 lớp.
  - Thêm tia nhiễu xạ quang học dọc (Vertical Diffraction Spike) 90 độ tạo điểm nhấn ngôi sao quang học.
  - Thêm vệt sáng Chrome kim loại (Specular Glint Sweep) quét 35 độ qua mặt logo AP tròn.
  - Thêm luồng sáng Studio 3D (Volumetric Light Cone) hắt xiên từ góc trên-phải (`top-right`) xuống tạo chiều sâu không gian phòng tối/showroom xe sang.
- **Tối ưu Nhịp chuyển động Gối đầu Đồng bộ (Overlapping / Cascaded Sync Motion):**
  - Tốc độ đằm hơn, thời lượng 0.9s - 1.2s mỗi đối tượng.
  - Chuyển động liên tục gối đầu: Logo vừa di chuyển -> Chữ lập tức trượt từ trái sang -> Ô Username trượt lên -> Ô Password nối tiếp -> Nút Đăng nhập nối tiếp -> Link Quên mật khẩu hiện ra.
- **Bổ sung Tính năng Quên mật khẩu:**
  - Thêm link `Quên mật khẩu?` bên dưới nút Đăng nhập với hiệu ứng hover xanh Google.
  - Khi click hiển thị Modal kính mờ Glassmorphism sang trọng hướng dẫn người dùng liên hệ quản trị viên/hotline.
- **Thiết lập Quy trình Bắt buộc (Mandatory Design Review Gateway):**
  - Cập nhật toàn diện `hq/design_aesthetic_memo.md` với đầy đủ chuẩn Font, Màu sắc, Ánh sáng 3D, Kịch bản Overlapping Motion, Tiêu chí tối giản và Checklist 5 bước.
  - Bổ sung **BƯỚC 0 (TIÊU CHUẨN THIẾT KẾ & BRAND IDENTITY)** vào `AGENTS.md` (ở gốc dự án): Bắt buộc mọi Agent trước khi viết code bất kỳ thành phần giao diện nào đều phải `view_file` đọc lại `hq/design_aesthetic_memo.md` để đối chiếu chuẩn.
  - Cập nhật `hq/00-INDEX.md` và `hq/CODING_TASKS.json`.
- **Triển khai:**
  - Biên dịch `src/Index.html` (101,490 byte).
  - Deploy lên nhánh `gh-pages` bằng `.\deploy-demo.ps1`.

## 2026-10-05 13:52 — Lucy/Antigravity — Tinh chỉnh Giao diện Welcome & Login v4 (Extreme Minimalist Luxury)
- **Nâng cấp Ô Nhập liệu (Inputs):**
  - Loại bỏ hoàn toàn khối màu trắng đặc gây chói mắt.
  - Chuyển sang dạng Border thanh lịch: nền trong suốt mờ nhẹ (`rgba(255, 255, 255, 0.025)`), viền xám khói nét mảnh (`1px solid rgba(255, 255, 255, 0.15)`), bo góc 12px.
  - Tăng độ rộng padding thoáng đãng (`padding: 0 24px`, cao 54px) tạo không gian "thở" (whitespace) chuẩn tối giản.
  - Chữ gõ vào màu trắng `#FFFFFF`, placeholder xám khói (`rgba(255, 255, 255, 0.38)`).
  - Khi focus: viền chuyển sang màu trắng sáng ánh kim (`rgba(255, 255, 255, 0.75)`), tỏa sáng nhẹ.
- **Nâng cấp Nút Đăng nhập (Login Button):**
  - Chuyển sang màu trắng ngà cao cấp (Off-White `#F4F4F6`), chữ đen tuyền (`#0A0A0D`).
  - Giảm độ dày chữ xuống mức **Medium (500)** tạo cảm giác nhẹ nhàng, thanh thoát.
  - Tăng khoảng cách ký tự (tracking) thoáng nhẹ (`0.28em`), canh giữa hoàn hảo (`text-indent: 0.28em`).
  - Khi hover/active: sáng nhẹ lên (`#FFFFFF`, box-shadow trắng dịu), lướt tia sáng sheen tinh tế.
- **Typography:**
  - Áp dụng font **Inter** hiện đại, sắc nét và thanh lịch cho toàn bộ UI body, inputs, button và link.
- **Triển khai & Kiểm thử:**
  - Biên dịch `src/Index.html` (101,370 byte).
  - Kiểm thử render Edge headless trên cả PC (1440x900) và Mobile (390x844).
  - Deploy lên nhánh `gh-pages` bằng `.\deploy-demo.ps1`.

## 2026-10-05 14:38 — Lucy/Antigravity — Nâng cấp Welcome & Login v5 (Glassmorphism Card, Capsule inputs & Button 3D, Background Ribbon 45deg Sweep)
- **Tiếp nhận yêu cầu từ Product Owner (anh Đức):**
  - Tái thiết kế toàn bộ bố cục theo sát hình mockup đính kèm (`hq/brand_assets/mockup_reference.png`).
  - Khung thẻ kính mờ Glassmorphism Card đặt ở trung tâm, bo tròn góc lớn 26px, viền kim loại mảnh, đổ bóng sâu 3D.
  - 2 ô input và nút Đăng nhập đều có hình viên thuốc (Capsule) bo tròn hoàn toàn 2 đầu.
  - Nút Đăng nhập 3D màu trắng ngà Off-White với viền sắc sảo và đổ bóng khối.
  - Họa tiết dải sóng kim loại ở nền (Ribbon SVG) xuất hiện SAU CÙNG trong chuỗi animation khi tải trang và slide up.
  - Ngay thời điểm slide up có tia sáng quang học quét xéo 45 độ từ góc dưới-trái sang góc trên-phải.
  - Ngôi sao quang học 4 cánh lấp lánh ở góc dưới bên phải.
- **Triển khai:**
  - Chạy `.\backup.ps1` lưu bản trước khi sửa vào `backup/ba3a3f5/`.
  - Biên dịch `src/Index.html` (108,909 byte).
  - Deploy thành công demo lên nhánh `gh-pages` (`b112fad`).
  - Cập nhật `hq/design_aesthetic_memo.md`, `hq/00-INDEX.md`, `hq/CODING_TASKS.json`, `backup/backup_log.md`.

## 2026-10-05 14:57 — Lucy/Antigravity — Nâng cấp Welcome & Login v6 (Fixed Brand Header, True Reference Lighting, Remove White Star)
- **Tiếp nhận phản hồi chi tiết từ Product Owner (anh Đức):**
  - Khắc phục triệt để lỗi logo AP bị lệch vị trí trên Mobile (đè lên ô Tên đăng nhập): Ràng buộc vĩnh viễn Logo AP và chữ CAR CARE AUDIO AND ACCESSORIES cùng nằm trong container flexbox `.card-brand-header`, luôn cố định đứng kế bên nhau chuẩn xác trên mọi thiết bị và độ phân giải.
  - Bỏ hẳn ngôi sao màu trắng ở góc dưới bên phải màn hình.
  - Phân tích và tái tạo chính xác 100% bố cục ánh sáng gradient trong nền theo hình mẫu 2 (`hq/brand_assets/lighting_reference.png`):
    + Luồng chùm sáng Studio Volumetric Beam chiếu xiên từ góc trên-phải xuống dưới-trái (kết hợp màu trắng dịu và xanh đen).
    + Quầng sáng xanh đen sâu thẳm ở góc dưới bên trái hắt lên tôn vinh dải sóng kim loại.
    + Thẻ Card kính mờ đón ánh sáng đèn: Cạnh trên và cạnh phải có viền sáng ánh kim sắc sảo, bề mặt kính gradient phản chiếu từ trên-phải xuống.
    + Bổ sung dòng thông báo trạng thái/lỗi màu đỏ mềm mại (`#FF6B6B`) hiển thị tinh tế dưới link Quên mật khẩu.
- **Triển khai & Kiểm thử:**
  - Chạy `.\backup.ps1` lưu bản trước khi sửa vào `backup/3cdc821/`.
  - Biên dịch `src/Index.html` (136.690 bytes).
  - Kiểm thử render Edge headless trên PC (1440x900) và Mobile (390x844) đều cân đối, logo và chữ đứng cạnh nhau hoàn hảo 100%.
  - Deploy thành công demo lên nhánh `gh-pages` (`89aef79`).
  - Cập nhật `hq/design_aesthetic_memo.md`, `hq/00-INDEX.md`, `hq/CODING_TASKS.json`, `backup/backup_log.md`.