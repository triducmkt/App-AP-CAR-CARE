# (OFFICIAL) FILE 5: KIẾN TRÚC CÔNG NGHỆ (TECHNOLOGY ARCHITECTURE)

FILE 5. Kiến trúc Công nghệ (Technology Architecture)
File này là bản vẽ thi công tầng Hạ tầng (Infrastructure Layer), đặc tả môi trường thực thi, ngôn ngữ lập trình, chiến lược chuyển đổi và giao thức cho AI/Dev. Mô tả chi tiết và cụ thể vào phần thực thi cho từng chương ở file này so với các thông tin đã từng đề cập ở các file 1-2-3.
* Chương 0. AI Collaboration Protocol: Bộ quy tắc tương tác, Freeze Scope và các giới hạn bắt buộc (Prompt Rule) khi AI làm việc cùng hệ thống.
* Chương 1. Mục tiêu và phạm vi Technology Architecture: Vai trò của kiến trúc công nghệ, định hướng "Technology chỉ là implementation".
* Chương 2. Technology Strategy (Chiến lược Công nghệ): Lộ trình triển khai cụ thể tiến hóa từ Phase 1 (Google Apps Script/Sheets) sang Phase 2 (Next.js/Postgres). đề xuất cụ thể phương án cho phase 2, ưu tiên các công cụ chi phí thấp hoặc miễn phí nếu có phù hợp qui mô đối tượng công ty SME. 
* Chương 3. Frontend Stack (Công nghệ Giao diện): Đặc tả framework, môi trường Web Portals và Mobile-First Web Apps tĩnh cho Phase 1.
* Chương 4. Backend Stack (Công nghệ Máy chủ): Đặc tả môi trường Runtime Google Apps Script (Serverless), xử lý Timeout và Quota giới hạn.
* Chương 5. Database & Storage Stack (Công nghệ Lưu trữ): Đặc tả kỹ thuật tối ưu hóa hàng/cột trên Google Sheets và Google Drive API.
* Chương 6. CI/CD & Environment (Triển khai & Môi trường): Chiến lược SDLC thu gọn cho Phase 1 (Git, Clasp, GitHub Actions cơ bản) và phân tách môi trường Dev/Staging/Prod.




Chương 0
AI Collaboration Protocol ⭐⭐⭐⭐⭐ 


SME OS AI Collaboration Protocol v0.1
1. Project Goal
Mục tiêu hiện tại:


Build phiên bản SME OS đầu tiên.


Ưu tiên:


Working Product > Perfect Architecture.
________________


2. Freeze Scope
Architecture Version


v0.1


Freeze


Không mở rộng thêm tài liệu.


Chỉ tồn tại 5 tài liệu chính.
________________


3. Architecture Rule
Không đề xuất thêm:


- tài liệu mới
- framework mới
- pattern mới


trừ khi Product Owner yêu cầu.
________________


4. Working Principle
Ưu tiên


80% thực thi


20% tối ưu.


Không tối ưu sớm.
________________


5. AI Behaviour
AI phải:


Ưu tiên build được.


Không over-engineering.


Không enterprise hóa.


Không microservice hóa.


Không đề xuất SaaS-level nếu SME chưa cần.


Không đề xuất công nghệ mới nếu Apps Script vẫn đáp ứng.


Không tạo thêm tài liệu.


Mọi nội dung phải gom vào 5 tài liệu.
________________


6. Product Boundary
Đối tượng


SME Việt Nam


5~100 nhân sự


Không phải Enterprise.


Không phải SAP.


Không phải Salesforce.


Không phải Odoo.
Đây cực kỳ quan trọng.
________________


7. Technology Strategy
Phase 1


Google Apps Script


↓


Phase 2


Next.js


↓


Business Architecture


Không thay đổi.
________________


8. Prompt Rule
Mỗi lần AI trả lời


phải:


1 đọc Product Philosophy


2 đọc Business Architecture


3 đọc System Architecture


4 đọc Application Architecture


5 đọc Technology Architecture


sau đó mới đề xuất.


=========================== 
SME OS PROJECT CONSTITUTION 
=========================== 
Điều 1
Chỉ tồn tại 5 tài liệu chính.
________________


Điều 2
Business Architecture là tài sản.


Technology chỉ là implementation.
________________


Điều 3
Không đề xuất chia nhỏ tài liệu.
________________


Điều 4
Ưu tiên build app trước.


Không tối ưu sớm.
________________


Điều 5
Không enterprise hóa sản phẩm.
________________


Điều 6
Không tạo kiến trúc vượt quá nhu cầu SME.
________________


Điều 7
Nếu có nhiều cách làm


luôn ưu tiên


đơn giản hơn.
________________


Điều 8
Mọi module


đều phải tái sử dụng.
________________


Điều 9
AI chỉ được đề xuất thay đổi lớn


khi Product Owner yêu cầu.
________________


Điều 10
Không được tự mở rộng phạm vi dự án.