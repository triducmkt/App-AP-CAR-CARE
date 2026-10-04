# Nhật ký lỗi & Bài học kinh nghiệm (Lessons Learned)

File này lưu trữ danh sách các lỗi đặc thù thường gặp khi lập trình Google Apps Script (GAS) và HTML/JS trên trình duyệt, đặc biệt là các lỗi liên quan đến bộ lọc Caja/HtmlService của Google. Toàn bộ Agent phải đọc file này trước khi fix bug.

## 1. Lỗi lồng dấu ngoặc và nháy trong Template Literal (Backtick)
- **Triệu chứng:** `SyntaxError: Unexpected identifier` hoặc lỗi tương tự báo từ trình biên dịch của Apps Script.
- **Mô tả:** Trong các file HTML được tải qua HtmlService (như `Income_Modal.html`), việc lồng biểu thức điều kiện tam phân chứa dấu nháy đơn `'` và backtick kép ` \` ` inside `${ condition ? \`...\` : '...' }` khiến trình biên dịch JavaScript của Apps Script / Trình duyệt bị nhầm lẫn ranh giới dấu ngoặc và chuỗi string.
- **Cách fix:** Tránh lồng backtick trong backtick hoặc dùng nháy đơn/nháy kép lộn xộn trong các template literal quá phức tạp. Hãy tách biểu thức điều kiện ra thành một biến riêng trước khi đưa vào template literal:
  ```javascript
  // LỖI (Dễ gây nhầm lẫn):
  let html = `<div class="${isActive ? \`active\` : 'inactive'}"></div>`;
  
  // FIX:
  let cls = isActive ? "active" : "inactive";
  let html = `<div class="${cls}"></div>`;
  ```

## 2. Lỗi Caja Sanitizer crash khi parse thuộc tính inline style chứa 'animation'
- **Triệu chứng:** Báo lỗi ở client console (F12): `Uncaught SyntaxError: Failed to execute 'appendChild' on 'Node': Invalid or unexpected token` với Stack trace đi qua file `...mae_html_user_bin_i18n_mae_html_user__vi.js` (Thư viện Caja của Google).
- **Mô tả:** Khi inject toàn bộ HTML của một trang (ví dụ `Task_list.html`) vào một thẻ `div` bằng `innerHTML = htmlString`, bộ lọc bảo mật Caja ở Client-side sẽ parse string này để loại bỏ các mã độc. Tuy nhiên, Caja có một lỗi (bug) nội bộ: Nếu nó gặp thuộc tính `style="..."` inline có chứa thuộc tính `animation` (ví dụ: `style="animation: blink 1s infinite;"`), CSS parser của Caja sẽ crash hoàn toàn và ném ra `SyntaxError`, làm cho toàn bộ đoạn code gán `innerHTML` thất bại, trang sẽ không thể render hoặc load bị treo trắng.
- **Cách fix:** Tuyệt đối không dùng thuộc tính `animation` trực tiếp trong thẻ `style` inline khi render chuỗi HTML. Hãy chuyển khai báo `animation` đó vào một class CSS trong cặp thẻ `<style>` tĩnh, rồi gán class đó cho thẻ.
  ```html
  <!-- LỖI (Caja sẽ crash): -->
  <div style="color: red; animation: blink 1s infinite;"></div>
  
  <!-- FIX: -->
  <style> .my-blink { animation: blink 1s infinite; } </style>
  <div class="my-blink" style="color: red;"></div>
  ```

### Quy tắc Debug: Khoanh vùng lỗi dựa trên mốc Confirm của người dùng
- **Mô tả:** Sau mỗi lần clasp push và người dùng chạy test báo lại "ok", "đã chạy được", nghĩa là phiên bản tại thời điểm đó là ổn định.
- **Bài học:** Nếu hành động viết code tiếp theo và push lên gặp lỗi, 90% nguyên nhân xuất phát từ **những đoạn code mới được thêm vào** kể từ sau mốc confirm đó. 
- **Hành động:** Khi gặp lỗi, NGAY LẬP TỨC khoanh vùng và chỉ tập trung kiểm tra, sửa chữa các phần code mới thêm vào. Tuyệt đối không đi lan man kiểm tra lại toàn bộ kiến trúc hoặc các file không liên quan / không bị sửa đổi trong lần push gần nhất.

### Quy tắc Debug: Chống lặp lại sửa sai (Vòng lặp lỗi)
- **Mô tả:** Có những lúc Agent sửa đi sửa lại cùng một lỗi mà người dùng vẫn báo chưa thành công. Nếu cứ tiếp tục đâm đầu vào một hướng suy nghĩ cũ, sẽ gây hỏng logic của app.
- **Hành động:** BẮT BUỘC khởi tạo biến đếm nội bộ `i`. Nếu nhận thông báo sửa lỗi KHÔNG THÀNH CÔNG liên tiếp **3 lần (i = 3)** cho cùng 1 lỗi, hãy THỰC HIỆN NGAY:
  1. Dừng ngay việc cố gắng vá víu lỗi theo hướng cũ.
  2. Quay về tra cứu, đối chiếu file code hiện tại với bản backup ở local gần nhất (thời điểm trước khi gây ra lỗi này). CHỈ ưu tiên đối chiếu các đoạn code mới thêm/sửa/xóa, tuyệt đối không kiểm tra lan man sang các file không liên quan logic.
  3. Sau khi đối chiếu, sử dụng schematic app và bộ bản đồ các hàm lớn trong hệ thống.
  4. Thực hiện brainstorm (động não) bằng các phương pháp luận, rẽ nhánh tư duy và chọn **một hướng tiếp cận code hoàn toàn mới/khác biệt** để giải quyết bài toán, phá vỡ lối mòn cũ.

### Quy tắc Debug: Cẩn trọng với tệp script nội bộ bị đẩy nhầm lên Google Apps Script
- **Mô tả lỗi:** Trong quá trình dùng một đoạn script Node.js tạm thời (lưu tên ix.js) để hỗ trợ xử lý text cục bộ, Agent đã chạy lệnh hàng loạt đổi tên toàn bộ .js thành .gs (để đồng bộ cho Apps Script). Việc này vô tình biến ix.js thành ix.gs và đẩy (push) nhầm tệp rác này lên server. Môi trường Google Apps Script không hỗ trợ hàm equire('fs') của Node.js, dẫn tới sập toàn bộ Web App ngay khi khởi động (ReferenceError: require is not defined).
- **Cách khắc phục & Tránh lặp lại:** 
  1. **Tuyệt đối không lưu** các file script dùng một lần (như thao tác regex, thao tác file) vào chung thư mục chứa mã nguồn chính của Google Apps Script.
  2. Nên chạy script trực tiếp trên terminal bằng tham số -e (ví dụ: 
ode -e "Mã code"), hoặc nếu phải tạo file thì đưa vào thư mục tạm scratch/ nằm ngoài luồng commit/push.
  3. Trước khi chạy lệnh clasp push, phải kiểm tra cẩn thận trạng thái git status hoặc dùng clasp status để đảm bảo không đẩy nhầm tệp rác lên server.

## [2026-09-29] Bài học xử lý sự kiện UI & Biến Global (Tính năng Cờ Ưu Tiên)
1. **Lỗi đứt đoạn Hover Tooltip (Menu nổi):** 
   - *Triệu chứng:* Khi menu tooltip (popup) cách nút kích hoạt một khoảng trống (ví dụ ottom: 52px so với nút cao 42px, hở 10px), rê chuột từ nút lên menu sẽ làm mất :hover, dẫn đến menu ẩn bất ngờ. 
   - *Khắc phục:* Thêm padding-bottom (trong suốt) bằng đúng hoặc lớn hơn khoảng hở để tạo cầu nối liền mạch.
   - *Bài học CSS Delay:* Hạn chế dùng pointer-events: none vì nó không nhận 	ransition-delay đồng bộ khi chuột rời đi (khiến UI chưa mờ nhưng đã mất khả năng click). Thay vào đó, hãy dùng isibility kết hợp opacity, ví dụ: 	ransition: opacity 0.3s 2s, visibility 0s 2.3s để menu vừa hiện rõ vừa có thể click trong suốt 2 giây chờ.

2. **Lỗi trigger Input File bị trình duyệt cản:**
   - *Triệu chứng:* Nút Gửi Ảnh/File dùng <button onclick="document.getElementById('inputId').click()"> có thể bị trình duyệt (hoặc WebView) chặn không mở hộp thoại chọn file vì cho là automated popup.
   - *Khắc phục:* Đổi thẻ bọc thành <label for="inputId"> và giữ nguyên CSS. Trình duyệt sẽ tự động kích hoạt input file một cách hợp lệ mà không cần viết lệnh JS.

3. **Lỗi Undefined do dùng sai tên Biến Toàn Cục:**
   - *Triệu chứng:* Lỗi Cannot read properties of undefined (reading 'find'). Do giả định biến lưu trữ là window.currentData hoặc biến dòng là currentChatRow. 
   - *Khắc phục:* Trong TDCM Team App, biến lưu data danh sách Task là globalTasksData. Biến lưu vị trí dòng khi mở modal chat là ChatStateManager.currentRow.
   - *Bài học:* LUÔN LUÔN dùng Select-String (hoặc grep) tìm kiếm xem biến có thực sự được khởi tạo (let/var = ) và gán giá trị hay không trước khi gọi nó trong code mới. Đừng giả định từ ngữ cảnh.

4. **Lỗi UI Reset do thiếu trường Data khi Fetch (API Endpoint):**
   - *Triệu chứng:* Người dùng click nút đổi trạng thái (Optimistic UI hiển thị ngay lập tức), dữ liệu gửi lên Backend (Google Sheets) thành công. Nhưng vài giây sau UI tự động reset về mặc định, hoặc refresh lại trang thì UI không hiển thị trạng thái đã lưu.
   - *Nguyên nhân:* Mặc dù Backend lưu vào database thành công, nhưng hàm lấy data (GET) từ Database trả về cho Client (ví dụ getTasksList()) đã QUÊN KHÔNG MAP cái CỘT DỮ LIỆU ĐÓ (bỏ quên biến priority: row[15]). Dẫn đến data trả về bị undefined, đè lên RAM Frontend và xóa sạch UI ảo.
   - *Bài học:* Khi thêm một tính năng làm thay đổi một cột trong Backend, LUÔN LUÔN phải kiểm tra 2 chiều: (1) Chiều POST (có map đúng cột, đúng tên biến/field_name, đúng ma trận phân quyền không) và (2) Chiều GET (hàm đọc data có parse cột đó gán vào Object trả về cho Frontend không).

---

## [2026-09-29] ERR-001 — Lỗi cú pháp Here-String trong PowerShell (backup.ps1)

- **Bug ID:** ERR-001
- **Triệu chứng:** Chạy `.\backup.ps1` báo lỗi `The string is missing the terminator: "@"` và `Missing closing '}'`, script thoát với code 1.
- **Nguyên nhân gốc:** PowerShell yêu cầu cú pháp here-string nghiêm ngặt: dấu `@"` phải là ký tự cuối cùng của dòng mở; dấu `"@` phải đứng đầu dòng đóng (không có tab/space trước). File cũ có `$logEntry = @\"` (backslash escape không hợp lệ) khiến parser fail.
- **Cách fix đúng:**
  ```powershell
  $logEntry = @"
  Nội dung nhiều dòng ở đây
  "@
  Add-Content -Path $logFile -Value $logEntry
  ```
- **Quy trình tự hồi phục:** Script dùng file `.backup_fail_counter` để đếm lỗi. Nếu lỗi lien tiếp >= 3 lần, tự `Remove-Item` bản thân để agent viết lại.
- **Bài học:** Không escape dấu nháy (`\"`) trong PowerShell here-string. Khi viết chuỗi nhiều dòng, luôn dùng here-string đúng cú pháp trên. Nếu script backup lỗi 3 lần không fix được, xóa file và viết lại script mới hoàn toàn.

### ERR-002: Lỗi ghi đè toàn bộ code (Full File Replace) khi nâng cấp tính năng động
- **Mô tả:** Khi cập nhật phiên bản Halloween V3, thay vì append (chèn thêm) hoặc modify khéo léo các block cụ thể, thao tác ghi đè toàn bộ file Theme_Halloween.html đã xóa mất các cấu hình tĩnh và cấu trúc giao diện đã được tinh chỉnh trước đó (làm mất decor).
- **Nguyên nhân:** Thiếu cẩn trọng trong việc sử dụng script thay thế toàn bộ file thay vì nhắm mục tiêu (target) các vùng DOM/CSS cụ thể, dẫn đến mất mát logic cũ.
- **Cách giải quyết:** Khi thêm tính năng mới (enhancement) hoặc đắp thêm theme, ưu tiên inject (chèn) các đoạn HTML/CSS mới vào cuối file (APPEND block) hoặc sử dụng JavaScript để tạo DOM động (có gắn data-enhanced hoặc class riêng như .hw-inserted-home-b để dễ dàng track và gỡ bỏ). Tuyệt đối không thay thế trắng toàn bộ file nếu không nắm chắc 100% nội dung gốc.

### ERR-003: L?i Info Center kh�ng t? d?ng ?n (Infinite Animation)
- **M� t?:** Kh?i th�ng b�o Info Center c? ch?y m�i kh�ng t? t?t, khi?n user l?m tu?ng l� n�t ?n b? l?i ho?c t�nh nang b? k?t. User y�u c?u "ch? ch?y 1 l?n r?i ?n".
- **Nguy�n nh�n:** CSS animation c?a thanh ticker du?c set l� 100s infinite (ch?y v� h?n v?i m?i v�ng l?p t?n 100 gi�y), v� JS s? d?ng s? ki?n onanimationiteration d? b?t k?t th�c v�ng l?p. Th?i gian 100 gi�y qu� d�i khi?n user kh�ng bao gi? d?i d?n l�c n� t? trigger s? ki?n t?t, v� v� n� l� infinite n�n n� kh�ng bao gi? th?c s? k?t th�c.
- **C�ch kh?c ph?c:** 
  1. �?i CSS th�nh 15s forwards d? n� ch? ch?y d�ng 1 l?n trong 15 gi�y r?i d?ng.
  2. �p d?ng chu?n Marquee padding-left: 100% k?t h?p 	ransform: translateX(0) to translateX(-100%) d? ch? ch?y mu?t m� t? ngo�i l? ph?i sang ngo�i l? tr�i.
  3. �?i h�m JS t? onanimationiteration sang onanimationend d? ngay khi ch?y qua h?t m�n h�nh (h?t 15s) l� t? d?ng k�ch ho?t markComponentAsRead() v� bi?n m?t ho�n to�n.

### ERR-004: Th�ng b�o xu?t hi?n l?i sau khi F5 (V�ng l?p do Backend kh�ng luu State)
- **M� t?:** User b�o c�o d� xem xong v� th�ng b�o d� ?n, nhung khi F5 (t?i l?i trang), kh?i block th�ng b�o l?i xu?t hi?n. User ph?i t? soi DOM v� y�u c?u th�m "c? tr?ng th�i 0 v� 1".
- **Nguy�n nh�n:** H�m markComponentAsRead ch? g?i l?nh POST READ_ALERT l�n Backend. N?u Backend x? l� ch?m, b? l?i, ho?c chua k?p luu v�o DB, th� khi F5, h�m GET syncGlobalNotifications s? k�o l?i data cu (chua d?c), d?n d?n vi?c th�ng b�o l?i hi?n th?.
- **C�ch gi?i quy?t:** Thi?t l?p co ch? **Local-First State** (C? tr?ng th�i luu t?i tr�nh duy?t).
  1. D�ng localStorage.setItem('ic_alert_state_' + alertId, '0') ngay khi th�ng b�o ch?y xong.
  2. B? sung check ? d?u h�m enderInfoCenterUI: N?u localStorage b�o state 0 -> Return ngay l?p t?c, kh�ng v? HTML, set data-state="0" cho c�c wrapper.
  3. �p d?ng CSS tri?t d? cho [data-state="0"]: display: none !important; z-index: -1 !important; bottom: 0 !important; opacity: 0; d? d?m b?o n� n?m du?i c�ng v� v� h�nh.
- **B�i h?c:** Kh�ng bao gi? ph? thu?c 100% v�o t?c d?/d? tin c?y c?a Backend d? quy?t d?nh vi?c ?n/hi?n UI t?c th?i tr�n Frontend (d?c bi?t l� c�c t�nh nang nhu �� d?c/Chua d?c). Lu�n ph?i c� Local State (c? c?c b?) l�m phuong �n d? ph�ng.

### ERR-005 (Workflow Violation): Quên chạy script .\backup.ps1 khi bị cuốn vào fix bug
*   **Triệu chứng:** Trong lúc tập trung fix lỗi SyntaxError (của file Code.gs) và xử lý Regex xóa code phức tạp (ở file Index.html), AI đã quên thực hiện thủ tục bắt buộc là chạy .\backup.ps1 trước khi sửa code, dẫn đến mất dấu lịch sử backup cục bộ từ 10:19 AM.
*   **Nguyên nhân (Root Cause):** Áp lực của chuỗi lỗi liên hoàn khiến Agent chuyển sang trạng thái "chữa cháy" (hotfix) mà bỏ qua checklist "Pre-flight" (chuẩn bị trước khi bay). Agent đã tự ý backup thủ công (Index.html.bak) thay vì dùng công cụ chuẩn hóa của dự án.
*   **Cách giải quyết (Bài học):** 
    1. KHÔNG CÓ TRƯỜNG HỢP NGOẠI LỆ. Dù lỗi nhỏ đến đâu, dù chỉ là gõ lại 1 dòng hay sửa 1 dấu phẩy, **LỆNH ĐẦU TIÊN KHI MỞ TERMINAL LUÔN PHẢI LÀ .\backup.ps1**.
    2. Phải coi việc chạy script này như phản xạ không điều kiện trước bất kỳ hành động Write-Host, Replace hay sửa file nào.

### [ERR-003] Lỗi biến String quá lớn (Base64) bị Google Apps Script HtmlService từ chối
- **Triệu chứng:** Nhúng một chuỗi Base64 ảnh rất dài (~76.000 ký tự) vào biến JS (window.HW_JUMPSCARE_B64 = "...") ở file .html (Template). Code đúng cú pháp hoàn toàn nhưng khi chạy thực tế, trình duyệt báo biến undefined hoặc không tồn tại.
- **Nguyên nhân:** Cơ chế parser của HtmlService (Google Apps Script) gặp giới hạn hoặc lỗi ngầm khi xử lý chuỗi Literal String của Javascript quá dài. Các chuỗi text siêu khủng làm parser bị "nghẹn", dẫn tới việc bỏ qua block <script> đó hoặc không khởi tạo biến.
- **Cách giải quyết:** Không dùng Javascript để lưu trữ dữ liệu Media lớn. Chuyển sang tận dụng thẻ HTML bẩm sinh: Nhúng chuỗi Base64 vào thẳng thuộc tính src của một thẻ <img id="..." style="display:none">. Khi cần dùng, dùng JS query selector trỏ tới thẻ img đó và gọi .src. Trình duyệt parse HTML rất trâu bò và không bị giới hạn này.

### [ERR-004] Lỗi tính năng hiển thị ở bản /dev nhưng biến mất ở bản /exec (Lỗi Cache Google)
- **Triệu chứng:** Sau khi code xong, user test ở link /dev thấy tính năng hoạt động hoàn hảo đầy đủ. Agent tiến hành chạy lệnh clasp deploy để đẩy lên Production. Nhưng khi user test link /exec lại thấy thiếu tính năng vừa cập nhật.
- **Nguyên nhân:** Cơ chế Cache (lưu trữ tạm) CDN của Google Apps Script đối với link /exec rất nặng, hoặc bộ nhớ đệm trình duyệt của user giữ lại file HTML cũ. clasp deploy đã thành công nhưng user vẫn nhìn thấy giao diện của version trước.
- **Cách giải quyết:** 
  1. Agent: Mỗi khi thực hiện lệnh clasp deploy, BẮT BUỘC phải luôn nhắc nhở user: *"Hãy ấn Ctrl + F5 (Hard Refresh) hoặc mở bằng tab Ẩn danh để xem bản /exec mới nhất, tránh bị dính cache trình duyệt"*.
  2. Xử lý triệt để: Đảm bảo chạy clasp push thành công 100% trước khi chạy clasp deploy. Nếu user vẫn báo thiếu, hãy ép push lại và deploy version mới, sau đó dặn user clear cache ngay và luôn.
