# (OFFICIAL) FILE 2: KIẾN TRÚC KINH DOANH (BUSINESS ARCHITECTURE)

File 2. Kiến trúc Kinh doanh (Business Architecture )
Chương 1.
Mục tiêu và phạm vi Business Architecture
1. Mục tiêu chương
Chương này nhằm xác lập định hướng và tư tưởng cốt lõi của toàn bộ hệ thống SME OS, với nguyên tắc tối thượng: Business trước Technology. Mục tiêu chính là định hình rõ ràng rằng nghiệp vụ kinh doanh (Business) là tài sản lâu dài của doanh nghiệp, trong khi công nghệ (Technology) là công cụ và có thể thay đổi theo thời gian.
2. Vai trò trong hệ thống
Business Architecture đóng vai trò là Blueprint cao nhất của nghiệp vụ. Đây chính là gốc rễ, định hướng trực tiếp cho các thiết kế kỹ thuật, đồng thời là nền tảng cho mọi tài liệu sau. Bất kỳ thay đổi nào ở tầng dưới đều phải đối chiếu ngược lại với Blueprint này để đảm bảo không sai lệch nghiệp vụ.
Tài liệu này sẽ cung cấp đầu vào chuẩn xác để thiết kế các kiến trúc tiếp theo bao gồm:
* Process (Quy trình nghiệp vụ)
* Event (Sự kiện trong hệ thống)
* AI (Kiến trúc trí tuệ nhân tạo)
* Data (Mô hình dữ liệu)
* UI (Giao diện người dùng)
* API (Giao thức kết nối)
3. Giải thích chi tiết
Để đảm bảo tính bền vững cho SME OS, kiến trúc kinh doanh (Business Architecture) được thiết kế dựa trên các giới hạn phạm vi (Scope) rất nghiêm ngặt và bao quát:
* Bao phủ toàn bộ doanh nghiệp: Kiến trúc này mô hình hóa tất cả các phòng ban, luồng tiền, luồng hàng và luồng nhân sự, đảm bảo không một hoạt động cốt lõi nào nằm ngoài hệ thống.
* Không phụ thuộc ngành nghề (Industry-agnostic): Cấu trúc nghiệp vụ được trừu tượng hóa (abstraction) để hệ thống giữ được tính linh hoạt, có thể áp dụng cho bán lẻ, dịch vụ, hay sản xuất mà không cần đập đi xây lại.
* Có khả năng Template hóa: Từ một cấu trúc lõi (Core Business Architecture), hệ thống cho phép đóng gói thành các Template chuyên biệt cho từng mô hình doanh nghiệp, giúp quá trình triển khai (Onboarding) diễn ra nhanh chóng. Đặc biệt, theo chỉ định từ Product Owner, bản Template thử nghiệm đầu tiên (Phase 1) sẽ tập trung vào mảng Ngành Dịch vụ (Service Industry).
Thiết kế này hoàn toàn tương thích với triết lý "Business First, AI Second" – nghiệp vụ phải chuẩn chỉnh để ngay cả khi tắt AI, hệ thống vẫn vận hành trơn tru 100%.
4. Ví dụ minh họa
Ví dụ về nguyên lý "Business là tài sản lâu dài, Technology có thể thay đổi":
Theo chiến lược kỹ thuật của dự án, ở Phase 1 chúng ta bắt buộc sử dụng Google Apps Script để ưu tiên ra mắt sản phẩm nhanh (Working Product). Sau đó, Phase 2 mới tiến hành nâng cấp lên Next.js. Trong quá trình "thay máu" công nghệ nền tảng này, toàn bộ Business Architecture (như cách vận hành luồng CRM, cách phân quyền nhân sự, cấu trúc Invoice) sẽ được giữ nguyên vẹn 100%. Công nghệ thay đổi nhưng nghiệp vụ (Business) là bất biến.
5. Best Practice
* Bám sát thuật ngữ gốc: Giữ nguyên các Tech Jargon (như Process, Event, UI, API) bằng tiếng Anh để đồng bộ với đội ngũ kỹ thuật.
* Tuyệt đối không Over-engineering: Ở tầng kiến trúc nghiệp vụ này, không được phép phức tạp hóa hoặc cố gắng "Enterprise hóa" (bắt chước SAP, Odoo). Phải tập trung vào sự tối giản để đảm bảo người dùng học được cách sử dụng dưới 30 giây.
* One Source of Truth: Mọi định nghĩa nghiệp vụ trong chương này là chuẩn mực duy nhất (Master). Các tài liệu thiết kế Data, API sau này nếu có xung đột, phải quay về đối chiếu và ưu tiên dựa trên Blueprint nghiệp vụ này.
6. Checklist
* Đã khẳng định rõ nguyên lý Business trước Technology chưa? (Done)
* Kiến trúc này đã đảm bảo tính "Không phụ thuộc ngành nghề" chưa? (Done)
* Có khả năng chuyển đổi trực tiếp thành cấu trúc của Process, Event, Data và AI không? (Done)
* Đã loại bỏ hoàn toàn các yếu tố phụ thuộc (Lock-in) vào một công nghệ cụ thể trong định nghĩa nghiệp vụ chưa? (Done)
7. Các điểm cần quyết định
* Quyết định đã chốt (Decisions Made): Product Owner (PO) đã quyết định chọn Ngành Dịch vụ (Service Industry) làm trọng tâm để đóng gói bản Template thử nghiệm đầu tiên, nhằm chứng minh khả năng Template hóa của hệ thống.
________________


Chương 2.
Business Model
1. Mục tiêu chương
Chương này nhằm định nghĩa rõ ràng mô hình kinh doanh (Business Model) mà hệ thống SME OS hướng tới. Việc xác định chính xác tệp khách hàng mục tiêu (ICP), các bên liên quan (Stakeholder) và mục tiêu kinh doanh (Business Goals) sẽ làm kim chỉ nam để không đi lệch hướng trong suốt quá trình phát triển, bám sát nguyên tắc cốt lõi: Business trước Technology.
2. Vai trò trong hệ thống
Business Model định hình ranh giới (Boundaries) của dự án. Tài liệu này đóng vai trò:
* Giới hạn phạm vi tính năng để tránh Over-engineering và Enterprise hóa hệ thống (không bắt chước SAP, Odoo).
* Cung cấp bối cảnh cho các thiết kế UI/UX để đảm bảo chuẩn Simplicity First (người dùng Non-tech học sử dụng dưới 30 giây).
* Định hướng cho AI Brain trong việc tối ưu hóa các Business Goals cốt lõi của doanh nghiệp.
3. Giải thích chi tiết
2.1 SME OS phục vụ ai?
* ICP (Ideal Customer Profile): Các doanh nghiệp SME đang tìm kiếm giải pháp chuyển đổi số toàn diện nhưng thiếu đội ngũ IT nội bộ. Theo quyết định ở Phase 1, trọng tâm ưu tiên là các doanh nghiệp trong Ngành Dịch vụ (Service Industry).
* Quy mô doanh nghiệp: Doanh nghiệp vừa và nhỏ, quy mô nhân sự từ 1 đến dưới 200 người. Không hướng tới phục vụ các tập đoàn đa quốc gia cần kiến trúc vi mô phức tạp (Microservices).
* Điều kiện sử dụng: Ở Phase 1, hệ thống sẽ cung cấp một "Standard Template" cực kỳ cứng và ép doanh nghiệp tuân thủ theo mẫu chuẩn này, không cho phép tùy biến tự do ban đầu để đảm bảo thời gian Onboarding < 7 ngày. Tuy nhiên, hệ thống tích hợp AI Brain có khả năng đọc dữ liệu định kỳ (hàng tuần, tháng, quý, năm) và tiến hóa (evolve) theo thời gian. Về sau, AI sẽ đưa ra các đề xuất (Recommend) từ nhỏ đến lớn để giúp SME tự động xây dựng và tối ưu quy trình.
2.2 Các Stakeholder
Stakeholder
	Mối quan tâm & Tương tác chính
 
	Founder
	Bảo mật tài sản dữ liệu, tầm nhìn hệ thống lâu dài, sự bền vững của kiến trúc Business.
	CEO
	Kiểm soát các chỉ số tổng quan (Dashboards), ra quyết định nhanh, tham gia vào các Điểm chốt phê duyệt (Approval Node) của AI.
	Manager
	Quản lý luồng Process, giám sát hiệu suất (Productivity), điều phối vận hành thực tế hàng ngày.
	Staff
	Thao tác trực tiếp. Cần UI/UX tối giản tuyệt đối (học dưới 30s), nhập liệu một lần, loại bỏ tác vụ lặp lại.
	Customer
	Tận hưởng trải nghiệm xuất sắc (Customer Experience) qua các điểm chạm (Touchpoints) xuyên suốt.
	Partner
	Nhà cung cấp/đối tác tích hợp dễ dàng với luồng mua hàng hoặc dịch vụ thông qua nghiệp vụ chuẩn hóa.
	2.3 Business Goals
Hệ thống SME OS phải trực tiếp đóng góp vào 5 mục tiêu lớn yếu của doanh nghiệp:
* Revenue (Doanh thu): Tối ưu luồng Sales, Marketing (Campaign, Booking) trơn tru để tăng tỷ lệ chuyển đổi.
* Profit (Lợi nhuận): Kiểm soát tốt Inventory, Supplier và tối ưu chi phí (Finance) thông qua hệ thống cảnh báo, cắt giảm lãng phí.
* Productivity (Năng suất): Nâng cao hiệu suất nhờ tự động hóa qua trục Event Center và quy trình AI 5 tầng (đề xuất/thực thi).
* Customer Experience (Trải nghiệm khách hàng): Phản hồi nhanh chóng (Response Time), loại bỏ sai sót nhờ dữ liệu xuyên suốt (One Source of Truth).
* Employee Experience (Trải nghiệm nhân viên): Giao diện 100% tiếng Việt thuần túy, ẩn độ phức tạp công nghệ. Cam kết điểm SUS > 80, giải phóng nhân sự khỏi thao tác rườm rà.
4. Ví dụ minh họa
Cơ chế Template hóa và AI tiến hóa:
Khi một doanh nghiệp Dịch vụ mới Onboarding, họ bắt buộc dùng luồng "Standard Template" của SME OS mà không được tự ý đổi cấu trúc phòng ban. Trong 3 tháng đầu, AI Brain âm thầm đọc dữ liệu (Observe) và phát hiện luồng duyệt hợp đồng của công ty này thường bị tắc ở bước báo giá. AI sẽ phân tích định kỳ và đề xuất (Recommend): "Nên kích hoạt thêm một Approval Node phụ cho Manager thay vì đẩy hết cho CEO". Từ đó, doanh nghiệp từng bước chuẩn hóa và tiến hóa (evolve) quy trình mà không cần đập đi xây lại.
5. Best Practice
* Tuyệt đối tuân thủ Scope: Nếu có yêu cầu thêm tính năng (Feature), bắt buộc phải đối chiếu xem nó phục vụ Stakeholder nào và giải quyết Business Goal nào ở trên. Nếu không rõ ràng hoặc mang tính chất "Enterprise quá mức", CẤM đưa vào.
* Measurable (Đo lường được): Các Business Goals (Revenue, Profit...) phải được thiết kế để sau này đo lường bằng số liệu thực tại các KPI Architecture (Chương 10).
6. Checklist
* Đã giới hạn rõ quy mô và tệp khách hàng (SME - Service Industry) chưa? (Done)
* Các Stakeholder đã được xác định cụ thể vai trò nghiệp vụ chưa? (Done)
* 5 Business Goals có liên kết chặt chẽ với nguyên lý thiết kế sản phẩm không? (Done)
* Đã làm rõ chiến lược áp đặt Template chuẩn và vai trò tiến hóa quy trình của AI chưa? (Done)
7. Các điểm cần quyết định
* Quyết định đã chốt (Decisions Made): PO đã thống nhất Phase 1 sẽ dùng "Standard Template" cứng để ép doanh nghiệp làm theo. Không cho phép tùy biến tự do nhằm tối ưu Onboarding. AI Brain sẽ đảm nhận vai trò phân tích dữ liệu định kỳ (tuần/tháng/quý/năm) để đề xuất cải tiến và xây dựng quy trình dần về sau.
________________


Chương 3.
Business Capability Map
3.1 Marketing
1. Mục tiêu chương
Chương này nhằm định nghĩa bản đồ năng lực nghiệp vụ (Business Capability Map) cốt lõi của SME OS. Mục tiêu là phân rã các hoạt động kinh doanh phức tạp thành các khối năng lực (Capabilities) độc lập nhưng có thể giao tiếp mượt mà với nhau. Trong tài liệu này, chúng ta tập trung thiết kế năng lực Marketing để đảm bảo hệ thống có khả năng thu hút, quản lý và nuôi dưỡng phễu khách hàng một cách tự động, tuân thủ nguyên tắc Business trước Technology.
2. Vai trò trong hệ thống
Business Capability Map là bộ xương sống của sản phẩm. Đối với phân hệ Marketing, tài liệu này có vai trò:
* Xác định chính xác các Module sẽ được xây dựng ở tầng Application.
* Làm đầu vào để thiết kế các Event (ví dụ: LeadCreated, CampaignStarted) phục vụ kiến trúc Event-Driven.
* Định hướng ranh giới dữ liệu để thiết kế Master Database (chỉ lưu 1 bản duy nhất).
* Ngăn chặn tính trạng Over-engineering bằng cách giới hạn chức năng Marketing vừa đủ dùng cho quy mô SME, không biến hệ thống thành một công cụ MarTech quá phức tạp.
3. Giải thích chi tiết 
Phân hệ Marketing được cấu thành từ 5 năng lực cốt lõi, hoạt động xoay quanh nguyên lý "Simplicity First" để người dùng không chuyên (Non-tech) cũng có thể vận hành dễ dàng:
* Lead (Khách hàng tiềm năng): Năng lực thu thập, phân loại và chấm điểm (Scoring) các cơ hội kinh doanh. Đảm bảo mọi Lead từ mọi nguồn đều đổ về một One Source of Truth trước khi phân bổ cho Sales. (Hỗ trợ nạp dữ liệu đa luồng: Tự động qua API hoặc Import/Nhập liệu thủ công).
* Campaign (Chiến dịch): Năng lực thiết kế và thực thi các chiến dịch tiếp thị. Quản lý ngân sách, timeline và các mốc chuyển đổi của một chiến dịch cụ thể.
* Content (Nội dung): Kho lưu trữ và quản lý tài sản nội dung (bài viết, kịch bản email/Zalo, hình ảnh) phục vụ cho Campaign và luồng tự động hóa.
* Ads (Quảng cáo): Năng lực quản lý hiệu suất quảng cáo đa kênh (Facebook, Google, Tiktok). Trọng tâm là theo dõi chỉ số ROI (Return on Investment) và chi phí trên mỗi Lead (CPL). (Hỗ trợ đồng bộ dữ liệu chi phí và hiệu suất trực tiếp qua API từ nền tảng, hoặc Import thủ công).
* SEO (Tối ưu hóa tìm kiếm): Năng lực quản lý từ khóa, thứ hạng và lưu lượng truy cập tự nhiên (Organic Traffic). Liên kết chặt chẽ với phân hệ Website (sẽ định nghĩa ở mục 3.8).
4. Ví dụ minh họa
Ví dụ về sự kết nối nghiệp vụ thông qua Event Center:
Khi một khách hàng điền Form từ SEO bài viết hoặc Ads, hệ thống tự động sinh ra một Lead mới (Event: Lead_Captured). Dựa trên nguồn của Lead, hệ thống đưa họ vào một Campaign chăm sóc bằng Content (gửi email chào mừng). Trong suốt quá trình này, AI Brain ở chế độ ẩn sẽ Observe (Quan sát) tỷ lệ mở email. Nếu tỷ lệ thấp, AI sẽ Diagnose (Chẩn đoán) và đưa ra Recommend (Đề xuất) cho Manager: "Nên thay đổi Content B cho Campaign này vì Content A đang có tỷ lệ chuyển đổi dưới 10%".
5. Best Practice
* Giữ nguyên thuật ngữ: Các Keyword Lead, Campaign, Content, Ads, SEO bắt buộc giữ nguyên bằng tiếng Anh trong cả giao tiếp kỹ thuật và tài liệu. Tầng UI cho user sẽ được dịch thuật thuần Việt sau.
* Không bắt chước Enterprise: Không cố gắng xây dựng các công cụ thiết kế Ads hay Builder quá phức tạp như HubSpot hay Salesforce. SME OS chỉ quản lý luồng dữ liệu (Data Flow) và hiệu suất (Performance).
6. Checklist
* Các năng lực Marketing đã phủ kín luồng thu thập và nuôi dưỡng khách hàng chưa? (Done)
* Giới hạn tính năng đã được thiết lập để tránh làm hệ thống quá cồng kềnh chưa? (Done)
* Sự tương tác với AI 5 tầng (Observe -> Recommend) đã được định nghĩa trong nghiệp vụ Marketing chưa? (Done)
* Đã làm rõ cơ chế nạp dữ liệu (Ads/Lead) theo yêu cầu thực tế chưa? (Done)
7. Các điểm cần quyết định
* Quyết định đã chốt (Decisions Made): PO đã thống nhất đối với dữ liệu Ads & Lead ở Phase 1, hệ thống sẽ hỗ trợ cả hai phương thức: (1) Tích hợp kéo tự động qua API từ Facebook/Google và (2) Cho phép Import File / nhập liệu thủ công. Doanh nghiệp SME có thể linh hoạt sử dụng 1 trong 2 hoặc chạy song song cả hai luồng để đảm bảo Working Product ra mắt trơn tru nhất.
________________


3.2 Phân hệ Sales
1. Mục tiêu chương
Chương này nhằm định nghĩa bản đồ năng lực nghiệp vụ (Business Capability Map) cho phân hệ Sales (Bán hàng) của SME OS. Mục tiêu là thiết kế một luồng chuyển đổi khách hàng từ giai đoạn tiềm năng (Lead) sang chốt sale (Won) một cách tinh gọn, tự động và minh bạch, tuân thủ chặt chẽ nguyên lý One Source of Truth để giảm thiểu tối đa các thao tác lặp lại cho đội ngũ nhân sự.
2. Vai trò trong hệ thống
Phân hệ Sales đóng vai trò là "mũi nhọn" tạo ra doanh thu (Revenue - Business Goal số 1) cho doanh nghiệp. Trong kiến trúc tổng thể, tài liệu này có vai trò:
* Tiếp nhận dữ liệu trực tiếp từ phân hệ Marketing (các Lead đã được thẩm định).
* Kích hoạt các luồng phê duyệt (Approval Rules) cho báo giá và hợp đồng thông qua Business Kernel.
* Cung cấp dữ liệu đầu vào cho phân hệ Finance (Tài chính) và Service (Dịch vụ) sau khi hợp đồng được ký kết.
* Cung cấp tín hiệu (Event) liên tục để AI Brain học hỏi tỷ lệ chốt sale, từ đó đưa ra các đề xuất tối ưu.
3. Giải thích chi tiết (3.2 Sales)
Phân hệ Sales được thiết kế bao gồm 4 khối năng lực (Capabilities) cốt lõi, loại bỏ hoàn toàn các tính năng cồng kềnh không cần thiết đối với doanh nghiệp SME:
* Opportunity (Cơ hội bán hàng): Năng lực quản lý và đánh giá xác suất thành công của một thương vụ. Mỗi Opportunity sẽ chứa thông tin về ngân sách dự kiến, người ra quyết định, và các rào cản tiềm ẩn. Lưu ý: Lead sau khi được xác nhận có nhu cầu thực tế mới chuyển thành Opportunity.
* Pipeline (Phễu bán hàng): Năng lực trực quan hóa các giai đoạn bán hàng (Stages) dưới dạng Kanban board. Giúp Manager và CEO theo dõi dòng chảy doanh thu một cách toàn cảnh. Hệ thống cho phép thiết lập các hành động tự động (Automation) khi kéo thả Opportunity qua từng giai đoạn.
* Quotation (Báo giá): Năng lực tạo, quản lý và gửi báo giá cho khách hàng trực tiếp từ hệ thống. Dữ liệu báo giá được liên kết thẳng với danh mục sản phẩm/dịch vụ chuẩn (Master Data) để tránh sai sót về giá, đồng thời kích hoạt các luồng phê duyệt (Approval Node) nếu có chiết khấu vượt mức quy định.
* Contract (Hợp đồng): Năng lực quản lý vòng đời hợp đồng, từ khâu soạn thảo (dựa trên Template có sẵn), đến quản lý trạng thái. Theo quyết định ở Phase 1, hệ thống chỉ đóng vai trò lưu trữ trạng thái và đính kèm file (PDF/Hình ảnh hợp đồng đã ký ngoài đời thực) thay vì tích hợp chữ ký điện tử. Hợp đồng sau khi chốt (Won) sẽ tự động tạo tín hiệu chuyển giao cho bộ phận Finance để xuất hóa đơn và bộ phận Service để thực hiện dịch vụ.
4. Ví dụ minh họa
Cơ chế tự động hóa và hỗ trợ chốt Sale qua Event Center:
Khi Staff chuyển một thẻ Opportunity từ cột "Thương lượng" sang "Chờ báo giá" trên Pipeline, hệ thống (thông qua Event: Opportunity_Stage_Changed) sẽ tự động sinh ra một bản nháp Quotation dựa trên dữ liệu nhu cầu đã nhập. Nếu Staff áp dụng mức giảm giá 15% (vượt mức cho phép 10%), hệ thống tự động đẩy Quotation này vào trạng thái "Chờ duyệt" và gửi noti cho Manager. Sau khi khách hàng đồng ý và ký Contract ngoài đời, Staff upload file PDF lên hệ thống và đổi trạng thái thành "Won". Hệ thống tự động gửi Email/Zalo cảm ơn (năng lực Marketing) mà không cần thao tác tay.
5. Best Practice
* Giữ nguyên thuật ngữ: Các Keyword Opportunity, Pipeline, Quotation, Contract bắt buộc giữ nguyên bằng tiếng Anh trong cả giao tiếp kỹ thuật và tài liệu.
* Tối giản thao tác (Simplicity First): Tránh việc bắt Staff nhập lại cùng một thông tin từ Lead sang Opportunity, Quotation và Contract. Dữ liệu phải được kế thừa (Inheritance) liên tục để đảm bảo chuẩn "One Source of Truth".
6. Checklist
* Các năng lực Sales đã đảm bảo tính kế thừa dữ liệu từ phân hệ Marketing chưa? (Done)
* Sự phân tách giữa Lead (Marketing) và Opportunity (Sales) đã rõ ràng chưa? (Done)
* Quotation và Contract đã được gắn kết với các quy tắc phê duyệt (Approval Rules) chưa? (Done)
* Đã làm rõ quy trình quản lý Hợp đồng (chỉ lưu trữ file đính kèm) cho Phase 1 chưa? (Done)
7. Các điểm cần quyết định
* Quyết định đã chốt (Decisions Made): PO đã chốt đối với bản "Standard Template" ở Phase 1, Contract (Hợp đồng) trên hệ thống chỉ đóng vai trò lưu trữ trạng thái và là nơi đính kèm file (PDF/Hình ảnh hợp đồng đã ký tay ngoài đời). Việc này giúp tối giản hệ thống và ra mắt sản phẩm nhanh chóng, chưa cần phức tạp hóa bằng việc tích hợp e-Signature ngay từ đầu.
________________


3.3 Phân hệ CRM (Quản lý Quan hệ Khách hàng)
1. Mục tiêu chương
Chương này nhằm định nghĩa năng lực nghiệp vụ cho phân hệ CRM (Customer Relationship Management) của SME OS. Mục tiêu là thiết lập một hệ thống quản trị dữ liệu khách hàng tập trung 360 độ, kết nối mượt mà mô hình B2B và B2C. Phân hệ này tuân thủ nguyên tắc One Source of Truth, đảm bảo "tài sản lâu dài" quan trọng nhất của doanh nghiệp là tệp khách hàng được lưu trữ minh bạch, được kiểm soát chặt chẽ và dễ dàng khai thác.
2. Vai trò trong hệ thống
Phân hệ CRM đóng vai trò là trái tim dữ liệu (Data Hub) của toàn bộ hệ thống SME OS:
* Tiếp nhận dữ liệu kế thừa xuyên suốt từ phân hệ Marketing (Lead) và Sales (Opportunity/Contract) để hình thành hồ sơ khách hàng hoàn chỉnh.
* Cung cấp điểm chạm (Touchpoint) lịch sử duy nhất để các bộ phận Service (Dịch vụ) và Finance (Tài chính) tra cứu khi phục vụ hoặc thu hồi công nợ.
* Là nguồn dữ liệu gốc để AI Brain thực hiện quá trình Observe (Quan sát) nhằm đánh giá mức độ trung thành, dự đoán rủi ro rời bỏ (Churn Rate) và đề xuất (Recommend) các chiến dịch chăm sóc lại (Re-marketing).
3. Giải thích chi tiết (3.3 CRM)
Phân hệ CRM được cấu thành từ 4 năng lực quản lý lõi, tối ưu hóa cho sự đơn giản của doanh nghiệp SME:
* Customer (Khách hàng): Năng lực quản lý thực thể định danh cốt lõi đã có giao dịch thực tế với doanh nghiệp. Một Customer là đại diện cao nhất của một vòng đời mua hàng, bao gồm lịch sử mua sắm, trạng thái công nợ và hạng thẻ thành viên.
* Company (Công ty/Tổ chức): Năng lực quản lý hồ sơ doanh nghiệp (dành cho mô hình B2B). Lưu trữ các thông tin vĩ mô như Mã số thuế, Ngành nghề, Địa chỉ trụ sở và Quy mô. Một Company có thể chứa nhiều Contact bên trong.
* Contact (Người liên hệ): Năng lực quản lý thông tin cá nhân (Tên, Số điện thoại, Email, Chức vụ). Đối với mô hình B2C, Contact thường đồng nhất với Customer. Đối với B2B, Contact là các cá nhân cụ thể làm việc tại Company (ví dụ: Kế toán, Giám đốc mua hàng).
* Relationship (Mối quan hệ): Năng lực bản đồ hóa các liên kết phức tạp. Ví dụ: Định nghĩa vai trò của một Contact đối với một Company (Ai là người ra quyết định?), hoặc theo dõi nguồn giới thiệu (Referral - Customer A giới thiệu Customer B) để hệ thống tự động tính hoa hồng/điểm thưởng.
4. Ví dụ minh họa
Cơ chế quản lý Relationship và One Source of Truth:
Khi một thương vụ B2B được chốt (Won) từ phân hệ Sales, hệ thống thông qua Event Center sẽ tự động chuyển đổi Lead thành Company (Công ty TNHH ABC). Hệ thống cũng tự động tạo 2 Contact: Anh Nguyễn Văn A (Giám đốc) và Chị Trần Thị B (Kế toán). Thông qua năng lực Relationship, anh A được gắn mác "Decision Maker" (Người ra quyết định), còn chị B là "Billing Contact" (Người nhận hóa đơn). Sau này, khi phân hệ Finance gửi báo giá tự động, hệ thống chỉ gửi trực tiếp cho chị B, giảm thiểu hoàn toàn thao tác thủ công của nhân viên.
5. Best Practice
* Giữ nguyên thuật ngữ: Các Keyword Customer, Company, Contact, Relationship bắt buộc phải được giữ nguyên bằng tiếng Anh trong thiết kế CSDL (Master Database) và API.
* Kiểm soát trùng lặp linh hoạt (Flexible De-duplication): Sử dụng Số điện thoại/Email làm khóa nhận diện (Identifier). Cho phép tạo bản sao để duy trì tốc độ nhập liệu của Sales/nhân viên, nhưng phải đi kèm hệ thống Log và Cảnh báo nghiêm ngặt (như quy định ở mục 7) để quản lý làm sạch dữ liệu sau đó.
* Simplicity First: Không xây dựng các ma trận phân quyền vùng miền (Territory Management) phức tạp như Salesforce. Với quy mô SME, dữ liệu CRM cần được thiết kế phẳng và chia sẻ dễ dàng giữa các phòng ban.
6. Checklist
* Đã phủ kín luồng quản lý thực thể cho cả mô hình B2B và B2C chưa? (Done)
* Cơ chế liên kết giữa Company và Contact (Relationship) đã rõ ràng chưa? (Done)
* Mối liên hệ giữa CRM và các phân hệ khác (Marketing, Sales, Finance) đã được thiết lập chưa? (Done)
* Đã làm rõ quy tắc xử lý trùng lặp dữ liệu Contact chưa? (Done)
7. Các điểm cần quyết định
* Quyết định đã chốt (Decisions Made): PO đã chốt quy tắc xử lý trùng lặp (Duplicate Resolution). Khi phát hiện nhập Contact mới có số điện thoại/email trùng với hệ thống, SME OS sẽ tự tạo 1 Contact dạng bản sao (clone) của Contact đang có để không làm gián đoạn thao tác của nhân viên. Đồng thời, hệ thống sẽ tự động gửi cảnh báo (Alert) đến các vị trí liên quan gồm: Nhân viên, Quản lý trực tiếp và Giám đốc bộ phận; và ghi nhận Log ở mức độ Critical để đội ngũ có thể rà soát và gộp (merge) dữ liệu thủ công định kỳ.
________________


3.4 Phân hệ Operation (Vận hành)
1. Mục tiêu chương
Chương này định nghĩa năng lực thực thi và vận hành kinh doanh (Operation) cho SME OS sau khi giao dịch đã được chốt (Won) tại phân hệ Sales. Mục tiêu là số hóa toàn bộ luồng cung cấp dịch vụ, từ khâu xếp lịch, thực thi, bàn giao đến hậu mãi. Thiết kế phải đảm bảo quá trình vận hành diễn ra trơn tru, đúng cam kết, giúp doanh nghiệp tối ưu hóa năng suất (Productivity) và nâng tầm trải nghiệm khách hàng (Customer Experience).
2. Vai trò trong hệ thống
Operation là phân hệ "thực chiến", nơi tiêu hao tài nguyên (vật tư, nhân sự, thời gian) và tạo ra giá trị thực tế cho khách hàng. Tài liệu này đóng vai trò:
* Chuyển hóa cam kết trên Contract/Quotation thành các nhiệm vụ (Task) vận hành cụ thể.
* Ghi nhận dữ liệu thực tế (chi phí, thời gian) để cung cấp cho phân hệ Finance tính toán biên lợi nhuận (Profit Margin).
* Liên kết chặt chẽ với CRM để làm giàu dữ liệu lịch sử khách hàng (đã dùng dịch vụ gì, có bảo hành không).
* Cung cấp điểm mù dữ liệu để AI Brain phân tích nút thắt cổ chai (bottleneck) trong quy trình vận hành.
3. Giải thích chi tiết (3.4 Operation)
Dựa trên đặc thù của Ngành Dịch vụ ở Phase 1, phân hệ Operation được chia thành 4 khối năng lực cốt lõi:
* Booking (Đặt lịch): Năng lực tiếp nhận, sắp xếp và quản lý lịch hẹn. Ở Phase 1, hệ thống tập trung quản lý lịch hẹn theo khung thời gian đơn giản của khách hàng (Timeline-based), ưu tiên sự linh hoạt và nhanh chóng khi thao tác thay vì khóa cứng tài nguyên.
* Service (Dịch vụ): Năng lực quản lý và theo dõi quá trình thực thi dịch vụ. Ghi nhận các bước thực hiện (Checklist), vật tư tiêu hao thực tế so với định mức, và nhân sự/kỹ thuật viên trực tiếp phụ trách để phục vụ việc tính lương/KPI sau này.
* Delivery (Bàn giao): Năng lực quản lý quá trình nghiệm thu và trả kết quả/sản phẩm cho khách hàng. Bao gồm việc ký biên bản bàn giao (điện tử/giấy), xác nhận hoàn thành quy trình và thu thập đánh giá hài lòng (CSAT - Customer Satisfaction Score).
* Warranty (Bảo hành): Năng lực quản lý vòng đời hậu mãi. Kích hoạt chính sách bảo hành ngay khi Delivery thành công. Theo dõi thời hạn, điều kiện bảo hành và xử lý các yêu cầu khiếu nại (Claim) hoặc sửa chữa định kỳ một cách tự động, minh bạch.
4. Ví dụ minh họa
Cơ chế tự động hóa quy trình vận hành liên tục (Seamless Operation):
Khách hàng liên hệ qua CRM để dán phim bảo vệ sơn (PPF) cho ô tô. Nhân viên tạo một Booking trên hệ thống cho khung giờ sáng thứ Bảy theo yêu cầu của khách (Timeline-based). Khi khách mang xe đến, trạng thái chuyển sang Service; quản đốc phân bổ thợ và cập nhật tiến độ qua từng bước (rửa xe, hiệu chỉnh sơn, dán phim). Sau khi hoàn thiện, quản đốc thực hiện Delivery với biên bản nghiệm thu tình trạng xe. Ngay lập tức, thẻ Warranty (Bảo hành 5 năm cho màng PPF) được hệ thống tự động kích hoạt và gửi thông báo điện tử qua Zalo khách hàng. Trong quá trình này, nếu thời gian Service thực tế kéo dài hơn 20% so với dự kiến, AI Brain sẽ ghi nhận log để chẩn đoán (Diagnose) vấn đề năng suất của nhóm thợ.
5. Best Practice
* Giữ nguyên thuật ngữ: Các Keyword Booking, Service, Delivery, Warranty phải được sử dụng thống nhất (không dịch ra tiếng Việt trong mã nguồn và thiết kế API).
* Trải nghiệm khách hàng là trên hết (CX First): Luôn tận dụng Event-Driven để tự động hóa các điểm chạm. Ví dụ: Sự kiện Booking_Created tự động gửi SMS nhắc lịch; Sự kiện Delivery_Completed tự động gửi phiếu Warranty và link đánh giá sao.
* Tránh phức tạp hóa kho bãi: Ở Phase 1, khi Service tiêu hao vật tư, chỉ ghi nhận dạng "Sử dụng trực tiếp" (Direct Consume) thay vì xây dựng một hệ thống quản trị sản xuất (MRP) hay luồng xuất nhập tồn đa kho (Multi-warehouse) quá phức tạp.
6. Checklist
* Quy trình từ lúc đặt lịch (Booking) đến khi hậu mãi (Warranty) đã xuyên suốt chưa? (Done)
* Khả năng đo lường hiệu suất (thời gian, vật tư) tại bước Service đã được định nghĩa chưa? (Done)
* Cơ chế kích hoạt bảo hành tự động sau bàn giao đã được thiết lập chưa? (Done)
* Đã làm rõ cơ chế quản lý Booking (Timeline-based) cho Phase 1 chưa? (Done)
7. Các điểm cần quyết định
* Quyết định đã chốt (Decisions Made): PO đã chốt đối với bản "Standard Template" Phase 1, module Booking sẽ chỉ quản lý lịch hẹn theo khung thời gian đơn giản của khách hàng (Timeline-based). Chưa cần thiết lập cơ chế khóa/phân bổ tài nguyên khắt khe (khóa 1-1 với Kỹ thuật viên/Khoang dịch vụ) nhằm giữ cho luồng thao tác của nhân viên diễn ra nhanh chóng, linh hoạt, tránh gây cảm giác cồng kềnh quá mức khi Onboarding.
________________


3.5 Phân hệ Finance (Tài chính)
1. Mục tiêu chương
Chương này nhằm thiết lập năng lực quản trị tài chính cốt lõi cho phân hệ Finance của SME OS. Khác với các hệ thống Kế toán (Accounting) phức tạp chuẩn mực, mục tiêu của Finance trong SME OS là quản trị Dòng tiền (Cashflow) và Hiệu quả kinh doanh (Profitability) một cách tinh gọn, trực quan, giúp CEO/Founder nắm bắt "sức khỏe tài chính" của doanh nghiệp theo thời gian thực (Real-time) mà không cần có chuyên môn sâu về kế toán.
2. Vai trò trong hệ thống
Phân hệ Finance là điểm hội tụ cuối cùng của dữ liệu giao dịch trong hệ thống:
* Kế thừa trực tiếp dữ liệu từ phân hệ Sales (Contract/Quotation) và Operation (Service/Delivery) để tự động hóa quá trình ghi nhận doanh thu.
* Kiểm soát toàn diện bức tranh công nợ hai chiều: Công nợ khách hàng (Receivables) và Công nợ nhà cung cấp (Payables), đảm bảo an toàn dòng tiền - yếu tố sống còn của SME.
* Cung cấp số liệu gốc cho AI Brain để Observe (Quan sát) xu hướng thu chi, từ đó Diagnose (Chẩn đoán) các rủi ro thâm hụt vốn và Recommend (Đề xuất) thời điểm cần cắt giảm chi phí hoặc đẩy mạnh thu h��i công nợ.
3. Giải thích chi tiết (3.5 Finance)
Phân hệ Finance tập trung vào 5 khối năng lực thực dụng nhất, cắt bỏ hoàn toàn các nghiệp vụ bút toán sổ cái (General Ledger) rườm rà của Enterprise ERP:
* Income (Doanh thu/Thu nhập): Năng lực quản lý và phân loại các nguồn thu của doanh nghiệp. Income được ghi nhận tự động từ các giao dịch thành công hoặc có thể nhập thủ công cho các khoản thu ngoài hệ thống.
* Expense (Chi phí): Năng lực kiểm soát dòng tiền chảy ra. Bao gồm chi phí trực tiếp (COGS) như vật tư tiêu hao cho dịch vụ, và chi phí vận hành (OPEX) như tiền thuê mặt bằng, điện nước, lương nhân viên.
* Invoice (Hóa đơn/Phiếu thu): Năng lực tạo, gửi và quản lý trạng thái thanh toán. Hệ thống cung cấp cả 2 Option để doanh nghiệp linh hoạt lựa chọn: (1) Xuất "Phiếu thu nội bộ" (Internal Invoice) để quản lý thanh toán nhanh chóng; hoặc (2) Tích hợp trực tiếp qua API với các nhà cung cấp Hóa đơn điện tử (như VNPT, Viettel, MISA) để xuất hóa đơn hợp lệ theo quy định của Tổng cục Thuế.
* Debt Management (Quản lý Công nợ): Năng lực theo dõi sát sao vòng quay tiền tệ, đặc biệt là Công nợ nhà cung cấp (Account Payables). Quản lý hạn mức nợ, thời hạn thanh toán cho đối tác (vật tư, thiết bị) để tối ưu hóa vốn lưu động, tránh tình trạng "doanh thu cao nhưng không có tiền mặt".
* Cashflow (Dòng tiền): Năng lực tổng hợp và trực quan hóa bức tranh toàn cảnh về dòng tiền thực tế vào/ra. Cashflow Dashboard giúp lãnh đạo trả lời ngay lập tức câu hỏi: "Hiện tại công ty đang có bao nhiêu tiền mặt để duy trì vận hành trong tháng tới?".
4. Ví dụ minh họa
Sự kết nối mạch lạc từ Operation, quản lý Công nợ sang Cashflow:
Khi quản đốc hoàn tất dịch vụ ở phân hệ Operation (Delivery), hệ thống tự động sinh ra một bản nháp Invoice gửi đến khách hàng với biểu giá chuẩn (ví dụ: Rửa xe chi tiết 250.000 VNĐ, Thay gạt mưa 500.000 VNĐ). Khi khách chuyển khoản, số tiền này được ghi nhận vào Income và làm tăng Cashflow trong ngày. Ngược lại, lô hàng gạt mưa và dung dịch nhập từ đối tác AP Car Care đang nằm trong danh sách Debt Management (Công nợ nh�� cung cấp) với hạn chót thanh toán là ngày 15 hàng tháng. Dựa trên số tiền vừa thu được từ khách, hệ thống AI tính toán và gửi thông báo khuyên CEO nên thanh toán khoản nợ này sớm để nhận chiết khấu 2%, giúp tối ưu dòng tiền hiệu quả.
5. Best Practice
* Giữ nguyên thuật ngữ: Bắt buộc dùng các từ khóa Income, Expense, Invoice, Debt, Cashflow trong thiết kế Master Database và API.
* Phân biệt Rạch ròi giữa Income và Cashflow: Một hợp đồng ký 1 tỷ (Income) nhưng khách mới trả 200 triệu (Cash Inflow). Hệ thống phải tách bạch rõ ràng để CEO không bị ảo tưởng về số dư tiền mặt.
* Nguyên tắc Không được Xóa (No Deletion): Để đảm bảo tính minh bạch, các Invoice đã phát hành không được phép xóa. Nếu sai sót, chỉ được phép "Hủy" (Cancel) và hệ thống phải lưu Log người thực hiện.
6. Checklist
* Đã giới hạn rõ phạm vi là quản trị dòng tiền thay vì kế toán sổ sách phức tạp chưa? (Done)
* Các năng lực đã phủ đủ 2 chiều dòng tiền (Thu - Chi) và tích hợp hóa đơn chưa? (Done)
* Đã bổ sung năng lực quản trị công nợ nhà cung cấp (Debt Management) chưa? (Done)
7. Các điểm cần quyết định
* Quyết định đã chốt (Decisions Made):
   * Về Invoice: PO đã quyết định cung cấp song song cả 2 tùy chọn ngay từ Phase 1: xuất Phiếu thu nội bộ và tích hợp API Hóa đơn điện tử (VNPT, Viettel, MISA) để khách hàng tự do lựa chọn tùy theo mô hình.
   * Về Công nợ: Bổ sung thêm Module Debt Management chuyên sâu để quản lý cả công nợ phải thu (khách hàng) và phải trả (nhà cung cấp), vì điều này ảnh hưởng cực kỳ mạnh mẽ đến mạch máu dòng tiền của doanh nghiệp SME.
________________


3.6 Phân hệ Inventory (Quản lý Kho/Tồn kho)
1. Mục tiêu chương
Chương này định nghĩa năng lực quản trị hàng hóa và vật tư tồn kho (Inventory) của hệ thống SME OS. Do Phase 1 tập trung vào Ngành Dịch vụ (Service), mục tiêu của Inventory không phải là xây dựng một hệ thống Quản trị Sản xuất (MRP) hay Chuỗi cung ứng (Supply Chain) khổng lồ, mà là quản lý vòng đời của vật tư tiêu hao và hàng hóa bán kèm một cách tinh gọn, đảm bảo luôn có đủ nguồn lực để thực thi dịch vụ mà không bị giam vốn quá nhiều.
2. Vai trò trong hệ thống
Phân hệ Inventory là trạm trung chuyển vật chất của doanh nghiệp, liên kết chặt chẽ với các phân hệ khác:
* Cung cấp Master Data về danh mục sản phẩm/vật tư để phân hệ Sales làm Báo giá (Quotation) và Hợp đồng.
* Tiếp nhận yêu cầu trừ kho (Xuất tiêu hao trực tiếp) từ phân hệ Operation khi Kỹ thuật viên thi công xong dịch vụ (Service).
* Kết nối tự động với phân hệ Finance: Ghi nhận Giá vốn hàng bán (COGS) vào Expense khi xuất kho và tạo Công nợ nhà cung cấp (Debt) khi nhập hàng.
* Cung cấp số liệu cho AI Brain chẩn đoán tình trạng kẹt vốn do tồn kho quá hạn (Dead stock) hoặc rủi ro thiếu hụt (Stockout).
3. Giải thích chi tiết (3.6 Inventory)
Phân hệ Inventory bao gồm 4 năng lực cốt lõi, loại bỏ hoàn toàn các nghiệp vụ phức tạp của ngành sản xuất chuyên sâu:
* Product (Sản phẩm/Vật tư): Năng lực quản lý danh mục từ điển hàng hóa. Mỗi Product chứa mã SKU, Đơn vị tính, Giá nhập định mức, Giá bán và Mức tồn kho tối thiểu (Min-stock). Với ngành dịch vụ, Product có thể là vật tư tiêu hao (dung dịch rửa xe, keo dán) hoặc hàng bán lẻ (gạt mưa, tinh dầu).
* Stock (Tồn kho): Năng lực kiểm soát số lượng vật lý thực tế. Bao gồm các nghiệp vụ Nhập kho (In), Xuất kho (Out) và Kiểm kê điều chỉnh (Stock Adjustment). Đảm bảo số liệu trên hệ thống luôn khớp 100% với thực tế ngoài đời.
* Purchase (Mua hàng): Năng lực quản lý quy trình bổ sung hàng hóa. Cho phép tạo các Đơn đặt hàng (Purchase Order - PO), theo dõi tiến độ giao hàng từ nhà cung cấp và xử lý nhập kho khi hàng về.
* Supplier (Nhà cung cấp): Năng lực quản trị hồ sơ đối tác cung cấp hàng hóa/dịch vụ (B2B). Lưu trữ lịch sử giao dịch, bảng giá thương lượng và liên kết trực tiếp với Debt Management (Quản lý công nợ) bên Finance để theo dõi thời hạn thanh toán.
4. Ví dụ minh họa
Cơ chế cảnh báo Min-stock và Đặt hàng tự động:
Trong quá trình vận hành, nhân viên tại phân hệ Operation liên tục sử dụng "Phim cách nhiệt 3M" (Product) để thi công cho khách. Hệ thống tự động trừ Stock. Khi AI Brain phát hiện số lượng cuộn phim trong kho tụt xuống dưới mức an toàn (ví dụ: < 5 cuộn), nó sẽ Observe (Quan sát) và kích hoạt Event cảnh báo. AI ngay lập tức tạo một bản nháp Purchase Order đề xuất mua thêm 20 cuộn từ Supplier "Công ty phân phối 3M Việt Nam". Quản lý chỉ cần bấm 1 nút [Duyệt], hệ thống sẽ tự động gửi PO cho nhà cung cấp. Khi hàng về, kế toán kho bấm nhận, hệ thống cộng số lượng vào Stock và ghi nhận tự động một khoản Công nợ phải trả vào Finance.
5. Best Practice
* Giữ nguyên thuật ngữ: Các Keyword Product, Stock, Purchase, Supplier bắt buộc giữ nguyên bằng tiếng Anh trong Database và cấu trúc API.
* Tự động hóa Giá vốn (Auto COGS): Bắt buộc áp dụng phương pháp Bình quân gia quyền (Weighted Average) để tính giá trị tồn kho xuất ra một cách tự động, giúp CEO nhìn thấy lợi nhuận thực tế (Profit Margin) lập tức mà không chờ cuối tháng kế toán chốt sổ.
* Simplicity First: Bỏ qua các nghiệp vụ đóng gói/tháo dỡ (Assembly/Disassembly) phức tạp của ngành Sản xuất để giữ cho luồng thao tác của nhân viên thật đơn giản.
6. Checklist
* Đã phân định rõ Product (Danh mục) và Stock (Số lượng vật lý) chưa? (Done)
* Luồng Mua hàng (Purchase) có liên kết chặt chẽ với Nhà cung cấp (Supplier) chưa? (Done)
* Cơ chế kế thừa dữ liệu để phục vụ cho Finance (Chi phí/Công nợ) và Operation (Tiêu hao) đã rõ ràng chưa? (Done)
* Đã làm rõ cơ chế quản lý kho trung tâm và phân vùng con chưa? (Done)
7. Các điểm cần quyết định
* Quyết định đã chốt (Decisions Made): PO đã chốt ở Phase 1, hệ thống sẽ quản lý 1 Kho trung tâm duy nhất để đảm bảo sự tối giản và dễ Onboarding. Tuy nhiên, hệ thống cho phép tùy chọn tạo thêm 2-3 phân vùng con (Sub-zones) bên trong kho trung tâm này (ví dụ: Khu vực vật tư tiêu hao, Khu vực hàng bán lẻ, Khu vực hàng lỗi/phế phẩm) để doanh nghiệp kiểm soát và sắp xếp hàng hóa vật lý dễ dàng hơn mà không làm phức tạp hóa luồng xuất/nhập tồn.
________________


Chương 3. Business Capability Map
3.7 Phân hệ HR (Quản trị Nhân sự)
1. Mục tiêu chương
Chương này nhằm định nghĩa bản đồ năng lực nghiệp vụ cho phân hệ HR (Human Resources) của SME OS. Với định hướng tinh gọn dành cho các doanh nghiệp vừa và nhỏ (SME), mục tiêu của HR trong SME OS không phải là xây dựng một hệ thống quản trị nhân sự cồng kềnh chuẩn Enterprise (với ma trận đánh giá đa chiều hay luồng quy hoạch cán bộ phức tạp), mà là giải quyết bài toán cốt lõi: Số hóa thông tin nhân sự, chấm công minh bạch, tính lương chính xác và đo lường hiệu suất thực tế. Qua đó, giúp doanh nghiệp nâng cao Năng suất (Productivity - Business Goal số 3) và tối ưu hóa Trải nghiệm nhân viên (Employee Experience - Business Goal số 5).
2. Vai trò trong hệ thống
Phân hệ HR đóng vai trò là điểm chốt quản lý yếu tố con người (Human Resource Hub) trong hệ thống:
* Cung cấp danh mục định danh nhân sự (Employee Identifiers) làm căn cứ phân quyền (Role/Permission) trên toàn hệ thống.
* Kết nối dữ liệu thực thi từ phân hệ Operation (kỹ thuật viên phụ trách dịch vụ) và Sales (doanh số chốt hợp đồng) để tự động tính thưởng/kpi vào lương.
* Kết nối trực tiếp với phân hệ Finance: Chuyển dữ liệu tổng chi phí lương (Payroll Expense) sang làm khoản chi vận hành (OPEX).
* Cung cấp số liệu để AI Brain ở tầng Observe (Quan sát) đánh giá biến động năng suất nhân sự và đề xuất Recommend điều chỉnh định mức thưởng/KPI phù hợp.
3. Giải thích chi tiết (3.7 HR)
Phân hệ HR được cấu thành từ 4 khối năng lực cốt lõi:
* Employee (Nhân sự): Năng lực quản lý hồ sơ nhân viên tập trung. Lưu trữ các thông tin định danh (Tên, Mã nhân viên, CCCD, Ngày bắt đầu làm việc, Chức vụ, Phòng ban), thông tin liên hệ và hợp đồng lao động. Đồng thời, đây là nơi lưu trữ cấu trúc lương cơ bản và phụ cấp định mức của từng nhân sự.
* Attendance (Chấm công & Nghỉ phép): Năng lực ghi nhận thời gian làm việc thực tế và quản lý đơn từ nghỉ phép. Ở Phase 1, hệ thống hỗ trợ linh hoạt hai phương thức: (1) Điểm danh/Import file Excel thủ công và (2) Tích hợp chấm công theo vị trí GPS/Wifi trên ứng dụng Mobile. Quản lý quỹ phép năm, đơn xin nghỉ phép/đi trễ/về sớm với luồng phê duyệt (Approval Rules) đơn giản.
* Payroll (Bảng lương & Chi trả): Năng lực tự động tính toán tổng thu nhập thực nhận của nhân sự theo kỳ lương. Công thức tính lương kết hợp giữa: Lương cứng + Phụ cấp + Thưởng doanh số (từ Sales) + Thưởng năng suất thi công (từ Operation) - Các khoản gi���m trừ (chấm công Attendance, phạt). Xuất phiếu lương điện tử (Pay Slip) và tạo dữ liệu chi lương cho Finance.
* Performance (Hiệu suất & Đánh giá): Năng lực đo lường và ghi nhận kết quả làm việc thực tế của nhân sự dựa trên số liệu giao dịch thay vì đánh giá cảm tính. Quản lý các chỉ số KPI/OKRs cốt lõi (Doanh số chốt được, số lượng đơn dịch vụ hoàn thành, điểm CSAT từ khách hàng).
4. Ví dụ minh họa
Cơ chế tính lương tự động liên phân hệ (Cross-module Payroll):
Trong tháng, Kỹ thuật viên Nguyễn Văn C thực hiện chấm công hàng ngày qua Attendance (đủ 26 công). Tại phân hệ Operation, anh C hoàn thành 40 lượt thi công Service dán phim bảo vệ sơn PPF cho khách hàng. Cuối tháng, hệ thống tự động tổng hợp dữ liệu tại phân hệ HR: Employee xác định mức lương cứng của anh C là 8.000.000 VNĐ; Performance ghi nhận tiền thưởng năng suất 100.000 VNĐ/xe từ Operation (tổng cộng 4.000.000 VNĐ). Module Payroll tự động cộng hai khoản thành tổng thu nhập 12.000.000 VNĐ, xuất phiếu lương qua Zalo/Email cá nhân và tạo bản nháp Expense chi trả lương gửi sang phân hệ Finance cho CEO duyệt.
5. Best Practice
* Giữ nguyên thuật ngữ: Các Keyword Employee, Attendance, Payroll, Performance bắt buộc giữ nguyên bằng tiếng Anh trong cả thiết kế CSDL (Master Database) và API.
* Tự động hóa dựa trên dữ liệu thực (Data-driven Performance): Đánh giá Performance phải dựa trên số liệu phát sinh thực tế từ các phân hệ vận hành (Sales, Operation), tuyệt đối tránh các form đánh giá rườm rà làm tốn thời gian của Manager.
* Tối giản luồng duyệt (Simplicity First): Các đơn từ thuộc Attendance (nghỉ phép, đi trễ) chỉ cần luồng duyệt 1 cấp (Trưởng bộ phận/Manager) để đảm bảo tốc độ xử lý dưới 30 giây.
6. Checklist
* Đã phủ kín luồng quản lý nhân sự từ hồ sơ, chấm công, tính lương đến hiệu suất chưa? (Done)
* Khả năng liên kết tính lương (Payroll) với dữ liệu từ Sales và Operation đã được định ngh��a chưa? (Done)
* Mối liên hệ giữa HR và Finance (ghi nhận chi phí lương) đã được thiết lập chưa? (Done)
* Đã làm rõ phương thức chấm công hỗ trợ trong Phase 1 chưa? (Done)
7. Các điểm cần quyết định
* Quyết định đã chốt (Decisions Made): PO đã chốt ở Phase 1, hệ thống sẽ hỗ trợ doanh nghiệp lựa chọn một trong hai phương thức chấm công (hoặc dùng song song): Option A (Điểm danh / Import file Excel thủ công) hoặc Option B (Tích hợp chấm công theo vị trí GPS / Wifi trên ứng dụng Mobile). Điều này giúp mang lại sự linh hoạt tối đa cho các mô hình dịch vụ khác nhau mà chưa cần tích hợp với máy chấm công vật lý.
________________


3.8 Phân hệ Website (Cổng Thông tin & Giao tiếp)
1. Mục tiêu chương
Chương này định nghĩa năng lực quản lý và vận hành Cổng thông tin trực tuyến (Website) cho doanh nghiệp SME. Mục tiêu của phân hệ Website không phải là tạo ra một hệ thống CMS đồ sộ phức tạp, mà là xây dựng các điểm chạm (Touchpoints) trực tuyến tối ưu chuyển đổi. Website đóng vai trò như một "cửa hàng số", giúp doanh nghiệp thu hút lưu lượng truy cập (Traffic) và biến chúng thành cơ hội kinh doanh thực tế một cách tự động.
2. Vai trò trong hệ thống
Website là mặt tiền kỹ thuật số và là "phễu hứng" dữ liệu đầu vào cho toàn bộ SME OS:
* Là nguồn cấp Lead tự động cho phân hệ Marketing và CRM.
* Kích hoạt trực tiếp luồng công việc cho phân hệ Operation thông qua các yêu cầu đặt lịch.
* Hỗ trợ đắc lực cho mục tiêu Revenue (Tăng trưởng doanh thu) và Customer Experience (Trải nghiệm khách hàng tiện lợi 24/7).
3. Giải thích chi tiết (3.8 Website)
Phân hệ Website được cấu thành từ 4 năng lực cốt lõi, tập trung tối đa vào tính thực dụng:
* Landing Page (Trang đích) & Blog (Bài viết): Ở Phase 1, SME OS không đóng vai trò là một Website Builder (không tự phát triển công cụ kéo thả). Thay vào đó, hệ thống tập trung vào việc quản lý dữ liệu chuyển đổi (Conversion) đến từ các Landing Page và Blog mà doanh nghiệp đã xây dựng sẵn trên các nền tảng khác.
* Form (Biểu mẫu): Năng lực thiết kế các biểu mẫu linh hoạt để thu thập thông tin (ví dụ: Form nhận báo giá, Form đăng ký tư vấn). SME OS cung cấp các Mã nhúng (Embed Code/Widget) của Form để doanh nghiệp dán trực tiếp vào Landing Page/Website có sẵn. Mỗi khi khách hàng nhấn "Submit", dữ liệu lập tức được chuẩn hóa và đẩy về Master Database thành một bản ghi Lead mới.
* Booking (Đặt lịch trực tuyến): Tương tự như Form, SME OS cung cấp Booking Widget cho phép khách hàng tự chọn dịch vụ, chi nhánh và khung giờ trống. Booking Widget này có thể gắn lên bất kỳ nền tảng website nào và giao tiếp trực tiếp với tính năng Booking của phân hệ Operation để kiểm tra lịch trống theo thời gian thực (Real-time).
4. Ví dụ minh họa
Luồng chuyển đổi tự động từ Website đến Operation:
Doanh nghiệp sử dụng Ladipage (bên thứ 3) để tạo một Landing Page giới thiệu dịch vụ "Dán phim bảo vệ sơn PPF". Quản lý chỉ cần copy đoạn Embed Code của Form và Booking Widget từ SME OS rồi dán vào Ladipage. Khi có khách hàng điền Form kèm yêu cầu Booking vào 9h sáng Chủ nhật, SME OS tự động ghi nhận một Lead trong CRM (được gắn tag nguồn từ Ladipage) và đồng thời đẩy một lịch hẹn vào phân hệ Operation để quản đốc xưởng dịch vụ nắm thông tin.
5. Best Practice
* Giữ nguyên thuật ngữ: Các Keyword Landing Page, Blog, Form, Booking bắt buộc giữ nguyên bằng tiếng Anh.
* Mobile First: Giao diện hiển thị của các Widget (Form/Booking) khi nhúng vào website phải được tối ưu Responsive, đảm bảo thao tác mượt mà trên thiết bị di động.
* Performance Optimization: Mã nhúng Embed Code phải được thiết kế tối giản, tải không đồng bộ (Asynchronous) để tuyệt đối không làm chậm tốc độ tải trang (Page Speed) của Website gốc.
6. Checklist
* Luồng dữ liệu từ Form/Booking có đổ trực tiếp về CRM và Operation (One Source of Truth) chưa? (Done)
* Trải nghiệm khách hàng (CX) khi đặt lịch trực tuyến qua Widget đã được thiết kế tinh gọn chưa? (Done)
* Đã làm rõ chiến lược sử dụng Mã nhúng (Embed Code) để tích hợp thay vì tự xây Builder chưa? (Done)
7. Các điểm cần quyết định
* Quyết định đã chốt (Decisions Made): PO đã chốt chiến lược phát triển Phase 1: SME OS sẽ không tự phát triển trình dựng Landing Page/Blog (Drag & Drop Builder) để tránh sa lầy vào kỹ thuật cồng kềnh. Thay vào đó, hệ thống tập trung cung cấp Mã nhúng (Embed Code/Widget) cực kỳ mạnh mẽ của Form và Booking. Doanh nghiệp chỉ cần copy/paste đoạn mã này vào nền tảng website có sẵn (như WordPress, Haravan, Ladipage...) là có thể tự động hóa toàn bộ luồng thu thập Lead và Đặt lịch.
________________


3.9 Phân hệ Knowledge (Quản trị Tri thức)
1. Mục tiêu chương
Chương này định nghĩa năng lực quản trị tri thức (Knowledge) của hệ thống SME OS. Mục tiêu cốt lõi là biến các kinh nghiệm, quy chuẩn phân t��n trong đầu nhân sự thành tài sản số hóa tập trung của doanh nghiệp. Phân hệ này giúp chuẩn hóa chất lượng dịch vụ, rút ngắn thời gian đào tạo (Onboarding) nhân viên mới và cung cấp nguồn dữ liệu chuẩn xác để hỗ trợ khách hàng tự phục vụ (Self-service).
2. Vai trò trong hệ thống
Knowledge đóng vai trò là "bộ não thứ hai" (Internal Wiki) lưu trữ toàn bộ chất xám của tổ chức:
* Cung cấp tài liệu hướng dẫn (Guideline) cho nhân sự mới tại phân hệ HR.
* Tham chiếu trực tiếp vào các tác vụ (Task) tại phân hệ Operation để đảm bảo kỹ thuật viên làm đúng quy chuẩn.
* Cấp nguồn dữ liệu đầu vào (Knowledge Base) để bộ phận Sales/CSKH tư vấn đồng nhất, không sai lệch thông tin.
* Là nguồn dữ liệu cấu trúc cực kỳ quan trọng để AI Brain học hỏi và thực hiện chức năng hỏi đáp (Copilot) trong tương lai.
3. Giải thích chi tiết (3.9 Knowledge)
Phân hệ Knowledge được thiết kế với 3 năng lực cốt lõi, đảm bảo tiêu chí d�� đóng góp, dễ tìm kiếm:
* SOP (Standard Operating Procedure - Quy trình thao tác chuẩn): Năng lực số hóa các bước thực thi công việc cụ thể. Mỗi SOP là một bộ hướng dẫn từng bước (Step-by-step), thường kèm theo hình ảnh/video minh họa và Checklist. Ví dụ: SOP Rửa xe chi tiết 12 bước, SOP Tiếp nhận xe dịch vụ.
* FAQ (Frequently Asked Questions - Câu hỏi thường gặp): Năng lực lưu trữ bộ câu hỏi và câu trả lời đã được chuẩn hóa. FAQ được chia làm 2 loại: Internal FAQ (Dùng nội bộ cho Sales xử lý từ chối) và Public FAQ (Có thể nhúng ra Website để khách hàng tự tra cứu).
* Document (Tài liệu/Hồ sơ): Năng lực lưu trữ và phân loại các tài liệu chung của doanh nghiệp. Nơi đây đóng vai trò như một thư viện số (Cloud Drive) nội bộ chứa: Chính sách công ty, Biểu mẫu hợp đồng/hành chính, Catalog sản phẩm từ nhà cung cấp, hoặc Tài liệu kỹ thuật.
4. Ví dụ minh họa
Cơ chế tra cứu và ứng dụng Knowledge liên phân hệ:
Khi một nhân viên Sales mới được tuyển (HR), họ được yêu cầu đọc các Document về chính sách bán hàng. Khi khách hàng hỏi: "Dán phim cách nhiệt này có bị lóa mắt vào ban đêm không?", nhân viên Sales tra cứu nhanh trong FAQ và trả lời theo đúng kịch bản công ty đã duyệt. Sau khi chốt đơn, xe được đưa xuống xưởng (Operation). Quản đốc mở SOP "Quy trình thi công phim cách nhiệt" trực tiếp trên màn hình iPad tại khoang dịch vụ để kỹ thuật viên mới nhìn theo thực hiện, đảm bảo không bỏ sót bước vệ sinh kính. Trong quá trình vận hành, nếu AI Brain Observe thấy một câu hỏi từ khách hàng lặp lại nhiều lần mà chưa có trong dữ liệu, nó sẽ Recommend Quản lý tạo thêm một FAQ mới.
5. Best Practice
* Giữ nguyên thuật ngữ: Các Keyword SOP, FAQ, Document bắt buộc giữ nguyên bằng tiếng Anh để đồng bộ hệ thống.
* Tối ưu hóa Tìm kiếm (Fast Retrieval): Sức mạnh của Knowledge nằm ở thanh công cụ Tìm kiếm (Search). Dữ liệu phải được thiết kế để có thể truy xu��t nội dung theo từ khóa dưới 3 giây.
* Quản trị Quyền truy cập (Access Control): Áp dụng "One Source of Truth" nhưng phải có cơ chế phân quyền (Permission) rõ ràng. Tài liệu nào là Public (Khách hàng xem được), tài liệu nào là Internal (Chỉ nhân viên xem), và tài liệu nào là Confidential (Chỉ cấp Quản lý/CEO xem).
6. Checklist
* Đã phân định rõ các loại tri thức (SOP, FAQ, Document) chưa? (Done)
* Sự liên kết giữa Knowledge và các phân hệ vận hành, đào tạo có rõ ràng không? (Done)
* Cơ chế phân quyền nội bộ vs. công khai (Internal/Public) đã được tính đến chưa? (Done)
* Đã làm rõ phương thức tìm kiếm và tra cứu tài liệu ở Phase 1 chưa? (Done)
7. Các điểm cần quyết định
* Quyết định đã chốt (Decisions Made): PO đã chốt ở Phase 1, hệ thống Knowledge sẽ chỉ sử dụng thanh Tìm kiếm (Search) từ khóa truyền thống để tra cứu tài liệu. Việc tích hợp AI Copilot đọc hiểu và trả lời ngôn ngữ tự nhiên sẽ được dời sang các Phase tiếp theo nhằm tập trung nguồn lực và đảm bảo sản phẩm ra mắt nhanh nhất (Time-to-market).
________________


3.10 Phân hệ Automation (Tự động hóa)
1. Mục tiêu chương
Chương này định nghĩa năng lực Tự động hóa (Automation) của hệ thống SME OS. Mục tiêu cốt lõi là tạo ra một "hệ thần kinh" kết nối tất cả các phân hệ rời rạc (Marketing, Sales, Operation, Finance) thành một luồng chảy dữ liệu liên tục. Phân hệ này giúp giải phóng nhân sự khỏi các tác vụ lặp đi lặp lại, giảm thiểu sai sót do con người (Human Error), và đảm bảo doanh nghiệp vận hành trơn tru ngay cả khi người quản lý không trực tiếp có mặt.
2. Vai trò trong hệ thống
Automation là "động cơ ngầm" thúc đẩy Năng suất (Productivity) của toàn bộ hệ thống:
* Là công cụ thực thi (Execution Engine) cho trục Event Center. Khi một Event xảy ra, Automation sẽ quyết định hành động tiếp theo là gì.
* Thay thế các thao tác thủ công: Từ việc gửi email, nhắc nợ, đến việc chuyển trạng thái Lead.
* Đóng vai trò như "cánh tay phải" của AI Brain: AI sẽ Recommend (Đề xuất) một kịch bản, và nếu CEO đồng ý phê duyệt, phân hệ Automation sẽ đảm nhận việc tự động chạy kịch bản đó.
3. Giải thích chi tiết (3.10 Automation)
Phân hệ Automation được xây dựng dựa trên 3 khối năng lực nền tảng, thiết kế theo chuẩn tư duy No-code để người dùng phổ thông cũng có thể hiểu và thiết lập:
* Trigger (Trình kích hoạt): Năng lực nhận diện sự kiện "châm ngòi" cho một chuỗi tự động hóa. Trigger luôn bắt đầu bằng chữ "Khi..." (When). Trình kích hoạt có thể là một hành động của người dùng (Ví dụ: Khi một Lead mới được tạo, Khi một Invoice được thanh toán) hoặc một thay đổi trạng thái trong hệ thống (Ví dụ: Khi Opportunity chuyển sang Won).
* Schedule (Lên lịch/Định kỳ): Một dạng Trigger đặc biệt dựa trên yếu tố thời gian thay vì hành động. Năng lực này cho phép hệ thống tự động chạy các tác vụ theo một mốc thời gian cố định (Ví dụ: 8h00 sáng mỗi thứ Hai) hoặc một khoảng thời gian tương đối (Ví dụ: 6 tháng sau khi hoàn thành Service).
* Workflow (Luồng công việc): Năng lực thiết kế và quản lý chuỗi các hành động (Actions) sẽ diễn ra sau khi Trigger hoặc Schedule được kích hoạt. Một Workflow có thể bao gồm nhiều bước nối tiếp nhau, có thể chứa các điều kiện rẽ nhánh (If/Else).
4. Ví dụ minh họa
Cơ chế tự động hóa quy trình chăm sóc hậu mãi (After-sales Care):
Giả sử xưởng dịch vụ vừa hoàn tất thi công dán PPF và phủ Ceramic cho một khách hàng (chuyển trạng thái Delivery thành công tại phân hệ Operation). Thay vì nhân viên CSKH phải ghi sổ để nhớ lịch gọi điện, hệ thống thiết lập một Schedule tự động: Đúng 6 tháng sau ngày giao xe, một Trigger được kích hoạt.
Hệ thống sẽ chạy một Workflow bao gồm các bước:
1. Tự động gửi một tin nhắn Zalo ZNS (Marketing) đến khách hàng để nhắc lịch kiểm tra độ bóng và bảo dưỡng màng phim.
2. Tự động sinh ra một Task "Gọi điện chăm sóc khách hàng" gán cho nhân viên Sales phụ trách trên CRM.
3. Nếu khách hàng phản hồi đồng ý qua Zalo, Workflow tiếp tục tự động tạo một Booking nháp (Operation) để giữ chỗ khoang dịch vụ.
Mọi thứ diễn ra xuyên suốt giữa Operation, CRM và Marketing mà không cần một thao tác nhập liệu thủ công nào.
5. Best Practice
* Giữ nguyên thuật ngữ: Các Keyword Workflow, Trigger, Schedule, Action bắt buộc giữ nguyên bằng tiếng Anh để đồng nhất với các nền tảng tự động hóa quốc tế.
* Fail-safe & Logging (Lưu vết lỗi): Bất kỳ Workflow nào khi chạy thất bại (Ví dụ: Gửi email lỗi do sai địa chỉ) đều phải được ghi Log và báo đỏ cho Quản trị viên. Không được để tình trạng tự động hóa "chết ngầm" mà người dùng không biết.
* Tránh Lặp vòng vô tận (Infinite Loop): Thiết kế hệ thống phải có cơ chế chặn các Trigger tự kích hoạt lẫn nhau.
6. Checklist
* Đã định nghĩa rõ sự khác biệt giữa Trigger (hành động) và Schedule (thời gian) chưa? (Done)
* Năng lực Workflow có khả năng liên kết chéo (Cross-module) các phân hệ khác chưa? (Done)
* Đã đề cập đến cơ chế lưu vết (Logging) để kiểm soát lỗi tự động hóa chưa? (Done)
* Đã làm rõ chiến lược tiếp cận Workflow cho Phase 1 chưa? (Done)
7. Các điểm cần quyết định
* Quyết định đã chốt (Decisions Made): PO đã chốt ở Phase 1, hệ thống sẽ chỉ cung cấp sẵn các bộ Workflow mẫu (Pre-built Templates) được code cứng (Ví dụ: Mẫu "Nhắc nợ tự động", Mẫu "Chúc mừng sinh nhật", Mẫu "Gửi email cảm ơn sau mua hàng"). Người dùng chỉ việc thao tác Bật/Tắt (ON/OFF) hoặc điền một số tham số đơn giản để sử dụng ngay lập tức. Chiến lược này giúp doanh nghiệp có thể vận hành được tự động hóa ngay từ ngày đầu Onboarding mà không cần học cách thiết kế (Drag & Drop Builder) phức tạp, đồng thời giảm tải khối lượng phát triển kỹ thuật cho đội ngũ Dev ở giai đoạn đầu.
________________


3.11 Phân hệ AI (Trí tuệ Nhân tạo)
1. Mục tiêu chương
Chương này định nghĩa năng lực Trí tuệ Nhân tạo (AI) của hệ thống SME OS. Khác với việc chỉ gắn một khung chat đơn giản vào phần mềm, mục tiêu của phân hệ AI trong SME OS là tạo ra một "Bộ não trung tâm" (AI Brain) được nhúng liền mạch vào các luồng nghiệp vụ. Phân hệ này giúp doanh nghiệp SME thu hẹp khoảng cách về năng lực phân tích dữ liệu, tự động hóa các quyết định phức tạp và gia tăng năng suất vận hành mà không yêu cầu nhân sự phải có kỹ năng Prompt Engineering.
2. Vai trò trong hệ thống
Phân hệ AI đóng vai trò là "Cố vấn chiến lược" và "Người thực thi xuất sắc" xuyên suốt hệ thống:
* Khai thác kho dữ liệu Master Data (từ CRM, Finance, Operation) và phân hệ Knowledge để phân tích, học hỏi.
* Tương tác trực tiếp với người dùng cuối (Staff, Manager, CEO) để hỗ trợ các tác vụ hàng ngày.
* Giao tiếp với phân hệ Automation để kích hoạt các Workflow tự động dựa trên suy luận logic thay vì chỉ dựa trên các quy tắc tĩnh (If/Else).
3. Giải thích chi tiết (3.11 AI)
Phân hệ AI được cấu trúc thành 3 lớp năng lực từ cơ bản đến nâng cao. Tuy nhiên, ở Phase 1, hệ thống sẽ tập trung triển khai Assistant và Insight:
* AI Assistant (Trợ lý AI - Triển khai Phase 1): Năng lực hỗ trợ tương tác trực tiếp (Copilot). Trợ lý này giúp nhân viên soạn thảo nội dung (Content Marketing), tóm tắt lịch sử giao tiếp với khách hàng, hoặc trả lời các câu hỏi nội bộ dựa trên dữ liệu từ phân hệ Knowledge (SOP, FAQ). Đặc điểm của Assistant là "phục vụ theo yêu cầu" (On-demand) và luôn cần con người xác nhận trước khi thực hiện.
* AI Insight (Trí tuệ Phân tích - Triển khai Phase 1): Năng lực phân tích dữ liệu chuyên sâu và dự báo (Predictive Analytics). AI Insight âm thầm Observe (Quan sát) toàn bộ dòng chảy dữ liệu của doanh nghiệp để phát hiện các điểm bất thường (Anomaly Detection). Nó có thể dự báo rủi ro cạn kiệt dòng tiền (Cashflow), tính toán tỷ lệ rời bỏ của khách hàng (Churn Rate), và Recommend (Đề xuất) các giải pháp chiến lược cho CEO.
* AI Agent (Tác tử AI tự trị - Dời sang Phase 2): Năng lực thực thi độc lập. Cao cấp hơn Assistant, AI Agent được giao một "Mục tiêu" (Goal) và tự động suy luận các bước để hoàn thành mục tiêu đó mà không cần sự can thiệp của con người. Ví dụ: Một AI Agent đóng vai trò Nhân viên CSKH có thể tự động nhắn tin Zalo với Lead mới, tư vấn, báo giá và chốt lịch Booking trực tiếp vào hệ thống.
4. Ví dụ minh họa
Cơ chế phối hợp AI trong việc cứu vãn doanh thu (Theo Scope Phase 1):
Vào tuần thứ 3 của tháng, AI Insight phát hiện doanh thu mảng "Dán màng PPF" đang giảm 30% so với tháng trước v�� dự báo Cashflow tháng tới sẽ bị thâm hụt. AI Insight ngay lập tức gửi cảnh báo và đề xuất CEO tung chương trình khuyến mãi. CEO đồng ý và yêu cầu AI Assistant: "Hãy viết cho tôi một kịch bản Zalo ưu đãi 15% PPF cho khách hàng cũ". Sau khi AI Assistant soạn xong và CEO duyệt nội dung, nhân viên có thể sử dụng mẫu này để gửi thông qua luồng Automation thông thường (chưa giao toàn quyền tự trị cho AI Agent thực hiện từ A-Z ở Phase 1).
5. Best Practice
* Giữ nguyên thuật ngữ: Các Keyword AI Assistant, AI Agent, AI Insight bắt buộc giữ nguyên bằng tiếng Anh để đồng nhất với xu hướng công nghệ toàn cầu.
* Invisible AI (AI Vô hình): Tránh việc tách AI thành một công cụ độc lập. AI phải được nhúng trực tiếp vào nơi người dùng làm việc (Ví dụ: Nút "Tóm tắt" ngay trong hồ sơ Customer, hoặc Nút "Dự báo" ngay trong bảng Cashflow).
* Human-in-the-loop (Con người là chốt chặn): Đối với các quyết định liên quan đến Dòng tiền (Finance) hoặc Giao dịch giá trị lớn, AI chỉ được quyền Đề xuất (Recommend), bắt buộc phải có sự phê duyệt của Quản lý/CEO trước khi thực thi.
6. Checklist
* Đã phân định rõ sự khác biệt giữa Assistant (hỗ trợ), Agent (tự trị) và Insight (phân tích) chưa? (Done)
* Mối liên kết giữa AI với Knowledge, Automation và các Data Hub đã được làm rõ chưa? (Done)
* Đã thiết lập nguyên tắc bảo mật và chốt chặn phê duyệt của con người chưa? (Done)
* Đã làm rõ phạm vi triển khai năng lực AI ở Phase 1 chưa? (Done)
7. Các điểm cần quyết định
* Quyết định đã chốt (Decisions Made): PO đã chốt chiến lược phát triển Phase 1: Hệ thống sẽ tập trung ưu tiên phát triển 2 năng lực là AI Assistant (hỗ trợ tạo nội dung/tìm kiếm cơ bản) và AI Insight (báo cáo phân tích). Việc phát triển AI Agent (Tự động giao tiếp khách hàng/chốt lịch hoàn toàn) sẽ được dời sang Phase 2 để đảm bảo tính an toàn hệ thống, kiểm soát tốt rủi ro về "ảo giác AI" (Hallucination) và rút ngắn thời gian ra mắt (Working Product) cho giai đoạn đầu.
________________


Chương 4.
Organization Architecture
1. Mục tiêu chương
Chương này nhằm thiết lập nền tảng Kiến trúc Tổ chức (Organization Architecture) cho SME OS. Mục tiêu là số hóa cấu trúc phân cấp vật lý của doanh nghiệp thành một mô hình quản trị kỹ thuật số tinh gọn. Việc này giúp phân định rõ ràng ai làm việc gì, ai được thấy dữ liệu gì và ai có quyền ra quyết định, từ đó đảm bảo tính bảo mật, minh bạch và loại bỏ các nút thắt cổ chai (bottleneck) trong quá trình vận hành của doanh nghiệp SME.
2. Vai trò trong hệ thống
Organization Architecture là "xương sống bảo mật và điều phối" của toàn bộ hệ thống:
* Cung cấp cơ sở dữ liệu nền tảng cho phân hệ HR (Employee, Payroll) và Operation (phân bổ Task).
* Quyết định mức độ hiển thị dữ liệu (Data Visibility): Nhân viên chỉ thấy khách hàng của mình, Quản lý thấy toàn bộ phòng ban, CEO thấy toàn công ty.
* Định tuyến luồng công việc tự động (Routing) trong phân hệ Automation và cung cấp cấu trúc cho Approval Matrix (Ma trận phê duyệt).
3. Giải thích chi tiết (Kiến trúc Tổ chức)
Kiến trúc Tổ chức của SME OS được thiết kế dựa trên 7 yếu tố cốt lõi, tuân thủ nguyên tắc "Simplicity First" (Tối giản) nhưng vẫn đủ linh hoạt cho mọi doanh nghiệp Dịch vụ:
* 4.1 Sơ đồ tổ chức (Org Chart): Năng lực trực quan hóa cấu trúc báo cáo của công ty theo dạng cây (Tree-view). Xác định rõ mối quan hệ cấp trên - cấp dưới (Line Manager) để hệ thống biết chính xác cần gửi thông báo hoặc luồng duyệt cho ai.
* 4.2 Department (Phòng ban): Các khối chức năng lõi của doanh nghiệp (ví dụ: Sales, Marketing, Operation, Finance, HR). Một Department có thể có nhiều phân vùng con (Team/Nhóm) nhưng luôn quy về một chức năng nghiệp vụ thống nhất.
* 4.3 Position (Chức danh): Chức danh nghề nghiệp chính thức của nhân sự (Ví dụ: Kỹ thuật viên trưởng, Nhân viên CSKH, K�� toán tổng hợp). Position gắn liền với cơ cấu lương, hợp đồng và đánh giá Performance ở phân hệ HR.
* 4.4 Role (Vai trò hệ thống): Quyền hạn tương tác với phần mềm (Phân quyền RBAC - Role-Based Access Control). Ví dụ: Admin, Manager, Staff, Viewer. Lưu ý quan trọng: Position và Role được tách bạch. Một nhân viên "Kế toán" (Position) có thể mang Role "Manager" trong phân hệ Finance nhưng chỉ mang Role "Viewer" trong phân hệ Marketing.
* 4.5 Responsibility (Trách nhiệm): Năng lực phân định trách nhiệm dựa trên mô hình RACI (Responsible, Accountable, Consulted, Informed) đối với từng thực thể dữ liệu (Lead, Ticket, Invoice). Ai là người tạo, ai là người chịu trách nhiệm cuối cùng.
* 4.6 Approval Matrix (Ma trận phê duyệt): Bộ quy tắc (Rules) thiết lập sẵn xác định các điểm nghẽn cần sự đồng ý của cấp quản lý. Kết hợp với AI và Automation để tự động định tuyến. Ví dụ: Duyệt nghỉ phép, duyệt giảm giá (Quotation), duyệt chi tiền (Expense).
* 4.7 Delegation (Ủy quyền phê duyệt): Năng lực ủy quyền xử lý công việc dành riêng cho nhân sự cấp Quản lý (Manager) trở lên. Quản lý có thể thao tác ngay trên Dashboard của mình, chọn người thay thế từ danh sách thả xuống (dropdown list) để ủy quyền duyệt tạm thời. Cơ chế xác nhận kép: Hệ thống yêu cầu người được trao quyền bắt buộc phải nhấn "Xác nhận đồng ý nhận" trước khi có quyền phê duyệt các tác vụ thay thế. Trạng thái ủy quyền sẽ duy trì cho đến khi người trao quyền chủ động tắt (Turn off).
4. Ví dụ minh họa
Cơ chế hoạt động của Approval Matrix và tính năng Delegation:
Nhân viên Nguyễn Văn A tạo một Quotation (Báo giá) cho dịch vụ phủ Ceramic với mức chiết khấu 15%. Theo Approval Matrix, chiết khấu > 10% cần duyệt. Hệ thống đối chiếu Org Chart và gửi thông báo phê duyệt đến app của anh B (Trưởng phòng Sales).


Tuy nhiên, anh B đang đi công tác và đã bật tính năng Delegation cho chị C (Phó phòng) trên Dashboard. Sau khi chị C bấm "Đồng ý nhận ủy quyền", toàn bộ các yêu cầu duyệt của phòng Sales (bao gồm báo giá của A) sẽ đổ về app của chị C để duyệt thay, giúp luồng công việc không bị tắc nghẽn. Khi anh B đi công tác về và tắt tính năng này, quyền duyệt lại trở về như cũ.
5. Best Practice
* Tách bạch Position và Role: Đảm bảo hệ thống mềm dẻo. Khi nhân sự thăng chức (đổi Position), quản trị viên chỉ cần cập nhật Role tương ứng mà không làm gãy luồng dữ liệu cũ.
* Bảo mật hiển thị (Data Segregation): Mặc định Role "Staff" chỉ được xem/sửa dữ liệu do chính mình tạo ra (hoặc được Assign). Không cho phép Staff phòng Marketing xem trộm Data của phòng Finance trừ khi được cấp quyền.
* Chuẩn hóa Unicode: Toàn bộ dữ liệu hiển thị chức danh, phòng ban và tên nhân sự phải tuân thủ nghiêm ngặt chuẩn Unicode tiếng Việt để đảm bảo tính đồng bộ khi xuất báo cáo (Report/Invoice).
* Lưu vết ủy quyền (Delegation Audit Trail): Các tác vụ được duy���t bởi người được ủy quyền phải ghi rõ log: "Được duyệt bởi C (đại diện cho B)" để minh bạch trách nhiệm.
6. Checklist
* Sơ đồ tổ chức đã làm rõ được mối quan hệ báo cáo trực tiếp (Line Manager) chưa? (Done)
* Đã định nghĩa rõ ràng sự khác biệt giữa Position (Chức danh) và Role (Vai trò hệ thống) chưa? (Done)
* Ma trận phê duyệt (Approval Matrix) đã liên kết chặt chẽ với các phân hệ khác chưa? (Done)
* Đã bổ sung tính năng ủy quyền duyệt (Delegation) với cơ chế xác nhận kép chưa? (Done)
7. Các điểm cần quyết định
* Quyết định đã chốt (Decisions Made):
   * Về luồng duyệt: PO đã chốt ở Phase 1, hệ thống sẽ sử dụng Luồng duyệt phẳng Cố định (Hard-coded Flat Approval) đi từ Staff lên Line Manager và chốt cuối cùng ở CEO để đảm bảo dễ Onboarding.
   * Về ủy quyền: Bổ sung tính năng Delegation (Ủy quyền phê duyệt) cho cấp Quản lý trở lên kèm cơ chế xác nhận đồng ý nhận từ người được ủy quyền. Việc n��y giúp luồng duyệt phẳng cố định không bị tắc nghẽn khi quản lý đi vắng, giải quyết triệt để bài toán vận hành mà không cần lập trình luồng duyệt đa cấp phức tạp.
________________


Chương 5.
Business Service Catalog
Chương 5. Kiến trúc Danh mục Dịch vụ (Business Service Catalog)
1. Mục tiêu chương
Chương này nhằm định nghĩa Kiến trúc Danh mục Dịch vụ (Business Service Catalog) cho SME OS. Mục tiêu cốt lõi là tiêu chuẩn hóa và phân loại toàn bộ các dịch vụ mà doanh nghiệp cung cấp, từ những dịch vụ tạo ra doanh thu trực tiếp đến các dịch vụ hỗ trợ vận hành ngầm. Việc xây dựng một Service Catalog chuẩn chỉnh giúp doanh nghiệp kiểm soát chất lượng, tối ưu hóa nguồn lực và đóng gói sản phẩm một cách chuyên nghiệp.
2. Vai trò trong hệ thống
Business Service Catalog là "thực đơn" định hình các hoạt động sinh công của hệ thống:
* Là nguồn dữ liệu gốc (Master Data) để phân hệ Operation tạo các Task thi công và phân bổ nhân sự.
* Cung cấp hạng mục để phân hệ Sales xây dựng Báo giá (Quotation) và Hợp đồng (Contract).
* Giúp phân hệ Finance bóc tách được biên lợi nhuận (Profit Margin) chi tiết cho từng nhóm dịch vụ thay vì chỉ nhìn vào tổng doanh thu.
* Đóng vai trò nền tảng để AI Insight phân tích xem dịch vụ nào đang "gánh" doanh thu, dịch vụ nào đang tiêu tốn quá nhiều thời gian nhưng biên lợi nhuận thấp.
3. Giải thích chi tiết (Kiến trúc Danh mục Dịch vụ)
Kiến trúc này phân rã toàn bộ hoạt động của doanh nghiệp thành 4 nhóm dịch vụ cốt lõi:
* 5.1 Core Service (Dịch vụ Lõi): Đây là các dịch vụ trực tiếp tạo ra doanh thu và giá trị cốt lõi cho khách hàng bên ngoài (External Customers). Đây là lý do chính mà khách hàng tìm đến doanh nghiệp. Mỗi Core Service cần có bảng giá (Pricing), thời gian hoàn thành tiêu chuẩn (Standard Time) và định mức vật tư đi kèm. (Ví dụ: Phủ Ceramic 9H, Dán phim bảo vệ sơn PPF, Vệ sinh khoang máy chi tiết).
* 5.2 Supporting Service (Dịch vụ Hỗ trợ): Các dịch vụ không trực tiếp tạo ra doanh thu nhưng bắt buộc phải có để nâng cao Trải nghiệm khách hàng (CX) và duy trì sự hài lòng. Các dịch vụ này thường đi kèm với Core Service hoặc phát sinh sau khi bán hàng. (Ví dụ: Tư vấn giải pháp qua tổng đài, Xử lý khiếu nại bảo hành màng phim, Dịch vụ rửa xe miễn phí sau bảo dưỡng).
* 5.3 Internal Service (Dịch vụ Nội bộ): Các dịch vụ do một phòng ban trong công ty cung cấp cho các phòng ban khác (Internal Customers) nhằm đảm bảo cỗ máy doanh nghiệp vận hành trơn tru. Các dịch vụ này thường được quản lý thông qua luồng Ticket nội bộ. (Ví dụ: Phòng HR tính lương và cấp phát đồng phục cho Kỹ thuật viên; Quản đốc đào tạo SOP mới cho thợ học việc).
* 5.4 Shared Service (Dịch vụ Chia sẻ): Mô hình tập trung hóa một số nghiệp vụ chung để phục vụ cho nhiều chi nhánh (Branches) hoặc nhiều nhóm (Teams) khác nhau, nhằm tối ưu chi phí và chuẩn hóa quy trình. (Ví dụ: Bộ phận Marketing trung tâm chạy Ads để đẩy Lead về cho 3 xưởng dịch vụ khác nhau; Kho trung tâm thực hiện nhập khẩu dung dịch và phân phối vật tư cho các chi nhánh).
4. Ví dụ minh họa
Sự tương tác giữa các Service trong một vòng đời khách hàng:
Một khách hàng mang xe ô tô đến trung tâm dịch vụ. Đầu tiên, bộ phận Marketing (đang vận hành theo mô hình Shared Service cho toàn hệ thống) đã chạy quảng cáo thu hút vị khách này. Khách hàng lựa chọn gói dán PPF toàn thân xe, đây chính là Core Service tạo ra doanh thu 30 triệu đồng, được phân hệ Operation ghi nhận với thời gian thi công tiêu chuẩn là 48 giờ.
Trong quá trình thợ thi công, máy sấy màng phim bị hỏng, quản đốc ngay lập tức tạo một Ticket yêu cầu sửa chữa gửi cho bộ phận Kỹ thuật nội bộ (Internal Service). Tuần sau khi xe đã được giao, màng phim bị phồng nhẹ ở mép cửa, khách hàng quay lại và được kiểm tra, bảo hành xử lý lỗi hoàn toàn miễn phí. Đây là Supporting Service, tuy không thu thêm tiền nhưng giúp giữ chân khách hàng (Retention) và được hệ thống ghi nhận vào chi phí bảo hành.
5. Best Practice
* Định lượng mọi dịch vụ: Bất kỳ Core Service hay Supporting Service nào cũng phải được định lượng bằng thông số: Thời gian (Duration) và Chi phí (Cost). Nếu không định lượng được, AI sẽ không thể đo lường năng suất (Performance).
* Nguyên tắc Simplicity First cho SME: Tránh việc "Vẽ" ra quá nhiều Internal Service rườm rà. Ở quy mô SME, các dịch vụ nội bộ nên được tối giản thành các Task (Nhiệm vụ) giao việc trực tiếp để không làm nặng hệ thống.
* Quản trị kỳ vọng (SLA - Service Level Agreement): Mọi dịch vụ cung cấp ra bên ngoài (Core & Supporting) nên có một cam kết chất lượng chuẩn để thiết lập Trigger cho phân hệ Automation (Ví dụ: Nếu Supporting Service "Xử lý khiếu nại" quá 24h chưa đóng Ticket, tự động báo đỏ cho CEO).
6. Checklist
* Đã phân tách rõ ràng giữa dịch vụ tạo doanh thu (Core) và dịch vụ hỗ trợ (Supporting) chưa? (Done)
* Đã định mức thời gian và chi phí cho các Core Service cốt lõi chưa? (Done)
* Mô hình Shared Service có thực sự phù hợp để áp dụng ngay, hay chỉ áp dụng khi doanh nghiệp mở chi nhánh thứ 2? (Done)
* Đã làm rõ phương thức kiểm soát thời gian thi công (SLA) ở Phase 1 chưa? (Done)
7. Các điểm cần quyết định
* Quyết định đã chốt (Decisions Made): PO đã thống nhất phương án kiểm soát SLA ở Phase 1 là sử dụng cơ chế Cảnh báo mềm (Soft Warning). Hệ thống sẽ không khóa cứng hay chặn tác vụ để tránh gây áp lực tâm lý cho nhân sự khi mới Onboarding. Thay vào đó, hệ thống sẽ âm thầm ghi nhận thời gian thực tế, báo cáo chi tiết các thông số và thống kê KPI. Trong trường hợp KPI đạt mức thấp hoặc vi phạm tiêu chuẩn chất lượng nghiêm trọng, hệ thống sẽ tự động kích hoạt Cảnh báo đỏ (Red Alert) và gửi thông báo trực tiếp đến các nhân viên và các cấp quản lý có liên quan để kịp thời rà soát và điều chỉnh.
________________


Chương 6.
Customer Architecture
1. Mục tiêu chương
Chương này thiết lập nền tảng Kiến trúc Khách hàng (Customer Architecture) cho SME OS. Mục tiêu không chỉ dừng lại ở việc lưu trữ danh bạ liên hệ (Contact Management) một cách thụ động, mà là số hóa toàn diện cách doanh nghiệp thấu hiểu, tương tác và khai thác giá trị từ khách hàng. Một kiến trúc chuẩn sẽ giúp doanh nghiệp chuyển đổi từ việc "bán hàng một lần" sang việc "xây dựng mối quan hệ trọn đời", từ đó tối ưu hóa chi phí marketing và tăng trưởng doanh thu bền vững.
2. Vai trò trong hệ thống
Customer Architecture là trái tim của hệ thống CRM và là kim chỉ nam cho các hoạt động tiếp thị:
* Là nguồn dữ liệu đầu vào cho phân hệ Marketing để chạy các chiến dịch (Campaign) nhắm trúng đích. Việc phác họa Customer Segment và Customer Value tại đây chính là bước cụ thể hóa các khối Khách hàng mục tiêu trong mô hình quản trị Business Model Canvas (BMC) lên hệ thống phần mềm.
* Cung cấp bức tranh toàn cảnh (360-degree view) cho phân hệ Sales nhằm tăng tỷ lệ chốt sale.
* Định hướng tiêu chuẩn phục vụ cho phân hệ Operation (Ví dụ: Khách VIP sẽ có SLA ưu tiên).
* Cấp dữ liệu lịch sử giao dịch để AI Insight dự báo tỷ lệ rời bỏ (Churn Rate) và đề xuất kịch bản chăm sóc (Retention).
3. Giải thích chi tiết (Kiến trúc Khách hàng)
Kiến trúc này được xây dựng dựa trên 5 trụ cột phân tích và quản trị:
* 6.1 Customer Segment (Phân khúc khách hàng): Năng lực chia nhỏ tệp khách hàng thành các nhóm có chung đặc điểm (Nhân khẩu học, Hành vi, Phân khúc sản phẩm).
* 6.2 Customer Persona (Chân dung khách hàng): Việc phác họa chi tiết đặc điểm tâm lý, nỗi đau (Pain points), và kỳ vọng của một đại diện tiêu biểu trong phân khúc.
* 6.3 Customer Journey (Hành trình khách hàng): Bản đồ hóa các bước khách hàng trải qua khi tương tác với doanh nghiệp.
* 6.4 Customer Lifecycle (Vòng đời khách hàng): Trạng thái mối quan hệ giữa khách hàng và doanh nghiệp theo thời gian thực.
* 6.5 Customer Value (Giá trị khách hàng): Năng lực đo lường hiệu quả tài chính mang lại từ khách hàng, bao gồm LTV (Lifetime Value) và CAC (Customer Acquisition Cost).
Bảng Phân tích Hành trình Khách hàng (6.3 Customer Journey)
Giai đoạn (Stage)
	Hành vi của Khách hàng
	Điểm chạm (Touchpoints) trên SME OS
	Mục tiêu hệ thống (System Goal)
 
	Awareness (Nhận thức)
	Tìm kiếm giải pháp làm đẹp, bảo vệ bề mặt hoặc phụ kiện nâng cấp.
	Landing Page, Blog, Bài viết Social.
	Thu thập thông tin (Lead Generation) qua Form/Widget.
	Consideration (Cân nhắc)
	So sánh giá cả, đọc đánh giá, hỏi tư vấn chi tiết về độ bền, kỹ thuật.
	Zalo ZNS, Email Marketing, Kịch bản tư vấn FAQ.
	Nuôi dưỡng (Nurturing) và đánh giá độ "nóng" của Lead.
	Purchase (Mua hàng)
	Chốt dịch vụ, đặt lịch thi công và tiến hành thanh toán.
	Booking, Quotation, Contract, Invoice.
	Chuyển đổi trạng thái từ Lead sang Won (Khách hàng thực tế).
	Retention (Giữ chân)
	Quay lại sử dụng các dịch vụ chăm sóc, bảo dưỡng định kỳ (ví dụ: rửa xe detailing tiêu chuẩn, thay gạt mưa, thay lọc gió máy lạnh).
	After-sales Automation, Nhắc lịch hẹn (Schedule Trigger).
	Tăng tần suất mua lặp lại, tối đa hóa chỉ số LTV.
	Referral (Giới thiệu)
	Hài lòng và giới thiệu bạn bè hoặc người trong các hội nhóm cùng sử dụng.
	Ticket (Hỗ trợ CSKH), Điểm thưởng (Loyalty Program).
	Biến khách hàng thành Đại sứ thương hiệu, giảm CAC.
	

4. Ví dụ minh họa
Ứng dụng Customer Architecture tại một Trung tâm Dịch vụ Chăm sóc xe (Detailing Center):
Trung tâm thiết lập một Customer Segment là "Chủ xe SUV, khu vực Quận 7". Hệ thống ghi nhận hành trình (Customer Journey): Khách hàng điền Form tư vấn (Awareness). Sales chốt lịch dán PPF (Purchase). Sau đó, trong giai đoạn Retention, khách hàng thường xuyên quay lại sử dụng các dịch vụ duy trì như rửa xe detailing chuyên sâu, thay chổi gạt mưa và kiểm tra lọc gió định kỳ. Nhờ tự động nhắc lịch, khách hàng liên tục quay lại. Hệ thống sau 1 năm đo lường Customer Value dựa trên cả giá trị mua hàng ban đầu và tần suất sử dụng dịch vụ duy trì, đồng thời nhân viên CSKH có thể ưu tiên chủ động gắn thẻ VIP để cung cấp chế độ chăm sóc đặc biệt theo đúng quyết định đã phân quyền.
5. Best Practice
* One Source of Truth: Toàn bộ dữ liệu từ Segment, Persona đến Hành trình phải được lưu trữ tập trung tại 1 Hồ sơ Khách hàng (Customer Profile 360) duy nhất.
* Tập trung vào Retention: Chi phí tìm khách mới (CAC) luôn cao hơn gấp 5-7 lần chi phí giữ chân khách cũ. Do đó, chuỗi tự động hóa (Automation) tại giai đoạn Retention và Referral phải được ưu tiên cấu hình trước nhất.
6. Checklist
* Đã vạch rõ 5 giai đoạn của Customer Journey chưa? (Done)
* Sự khác biệt giữa Customer Segment (nhóm tĩnh) và Customer Lifecycle (trạng thái động) đã được định nghĩa rõ ràng chưa? (Done)
* Đã quyết định phương án kết hợp giữa Gắn thẻ thủ công và phân tích RFM chưa? (Done)
7. Các điểm cần quyết định
* Quyết định đã chốt (Decisions Made): PO đã thống nhất ở Phase 1, hệ thống sẽ sử dụng Kết hợp cả 2 phương pháp (Hybrid Tiering) để phân hạng khách hàng. Cụ thể:
   * Ưu tiên vận hành thực tế: Trao quyền tối cao cho phương pháp Gắn thẻ thủ công (Manual Tagging). Nhân viên khi tiếp xúc và tương tác trực tiếp với khách hàng có quyền chủ động gắn các thẻ tag (Ví dụ: VIP, Tiềm năng) để kích hoạt ngay lập tức các luồng chăm sóc đặc biệt, đảm bảo sự linh hoạt tối đa của con người trong luồng dịch vụ.
   * Chấm điểm ngầm & Báo cáo (RFM Background): Song song với đó, hệ thống vẫn tích hợp bộ công thức RFM Model (Recency, Frequency, Monetary) chạy ngầm. Các báo cáo phân tích RFM sẽ liên tục được cập nhật đầy đủ và gửi đến nhân viên cùng các cấp Quản lý. Nếu dữ liệu RFM phát hiện một khách hàng có giá trị cao nhưng đang có nguy cơ rời bỏ (điểm Recency thấp), hệ thống sẽ gửi cảnh báo kịp thời để quản lý đôn đốc nhân viên chủ động hành động.
________________


Chương 7.
Employee Architecture
1. Mục tiêu chương
Chương này định nghĩa Kiến trúc Nhân viên (Employee Architecture) cho SME OS. Nếu Chương 6 tập trung vào trải nghiệm khách hàng (CX), thì Chương 7 đặt trọng tâm vào Trải nghiệm Nhân viên (EX - Employee Experience). Mục tiêu là xây dựng một môi trường làm việc số minh bạch, nơi nhân sự nắm rõ lộ trình công việc, thấu hiểu mục tiêu chung của tổ chức và được đo lường hiệu suất một cách công bằng, từ đó tối đa hóa năng suất và lòng trung thành.
2. Vai trò trong hệ thống
Employee Architecture là khung xương định hình cách thức làm việc hàng ngày của con người trên hệ thống:
* Cung cấp cấu trúc dữ liệu để phân hệ HR đánh giá năng lực và tính lương (Payroll).
* Định hướng thiết kế giao diện (UI/UX) cho phân hệ Operation và Sales, đảm bảo công cụ phục vụ đúng luồng công việc thực tế của nhân viên.
* Đóng vai trò nền tảng để triển khai các mô hình quản trị chiến lược liên kết từ cấp công ty xuống cấp cá nhân.
3. Giải thích chi tiết (Kiến trúc Nhân viên)
Kiến trúc này được phân rã thành 5 thành tố cốt lõi, bao phủ từ lúc nhân sự bắt đầu ngày làm việc đến khi đánh giá kết quả cuối kỳ:
* 7.1 Employee Journey (Hành trình nhân viên): Vòng đời của nhân sự từ khi Onboarding (học SOP, văn hóa công ty qua phân hệ Knowledge), giai đoạn Thực thi (Execution), đến Phát triển (Development) và Offboarding. Số hóa hành trình này giúp giảm thời gian đào tạo hội nhập.
* 7.2 Daily Workflow (Luồng công việc hàng ngày): Thiết kế chuỗi hành động chuẩn trong một ngày của nhân sự. Ví dụ: Đối với nhân viên Sales, thay vì phải thực hiện các cuộc gọi lạnh (cold call) hay gặp mặt trực tiếp khách lạ - vốn gây áp lực tâm lý rất lớn - luồng Daily Workflow sẽ tập trung vào việc tiếp nhận Warm Lead tự động từ Marketing, xử lý kịch bản Zalo và nuôi dưỡng khách hàng trên CRM.
* 7.3 KPI (Chỉ số đo lường hiệu suất): Các chỉ số định lượng đo lường kết quả công việc mang tính lặp đi lặp lại. (Ví dụ: Số lượng xe thi công hoàn thành, Tỷ lệ chốt sale, Điểm đánh giá CSAT). KPI liên kết trực tiếp với hệ thống tính lương và thưởng.
* 7.4 OKR (Mục tiêu và Kết quả then chốt): Ứng dụng triết lý quản trị chiến lược Hoshin Kanri, phân hệ OKR giúp liên kết chặt chẽ (cascade) mục tiêu dài hạn của toàn công ty xuống từng phòng ban và cá nhân. Khác với KPI dùng để đo lường vận hành tĩnh, OKR thúc đẩy những mục tiêu mang tính đột phá và đổi mới.
* 7.5 Pain Point (Điểm nghẽn/Nỗi đau): Năng lực nhận diện và số hóa các vướng mắc của nhân viên trong quá trình làm việc (Ví dụ: Thao tác nhập liệu quá nhiều, quy trình duyệt bị tắc nghẽn, thiếu vật tư thi công). Hệ thống cần có cơ chế (như Ticket nội bộ) để nhân sự báo cáo Pain Point và quản lý có thể giải quyết nhanh chóng.
4. Ví dụ minh họa
Trải nghiệm xuyên suốt của Kỹ thuật viên Dịch vụ:
Bắt đầu ngày mới (Daily Workflow), kỹ thuật viên mở ứng dụng trên điện thoại, check-in định vị tại xưởng và nhận danh sách Task được phân bổ tự động. Task đầu tiên là bảo dưỡng cho một chiếc SUV hạng sang với các hạng mục rõ ràng: Vệ sinh chi tiết (Detailing wash), thay chổi gạt mưa và thay lọc gió máy lạnh. Mọi định mức vật tư và bảng hướng dẫn SOP đều hiển thị sẵn trên màn hình, giúp nhân sự mới (Employee Journey) không bị bỡ ngỡ.


Khi hoàn thành, hệ thống tự động ghi nhận 1 điểm KPI thi công. Kỹ thuật viên không cần phải báo cáo sổ sách cuối ngày (giải quyết Pain Point báo cáo thủ công). Đồng thời, việc hoàn thành xuất sắc các ca dịch vụ khó giúp đội xưởng đóng góp vào một Key Result chung của công ty là "Nâng cao chất lượng dịch vụ hạng sang" (OKR).
5. Best Practice
* Minh bạch hiệu suất (Real-time Feedback): Nhân viên cần nhìn thấy KPI và thu nhập dự kiến của mình thay đổi theo thời gian thực (Real-time) trên Dashboard cá nhân. Điều này tạo động lực lớn hơn bất kỳ hình thức nhắc nhở nào từ quản lý.
* Tách bạch KPI và OKR: KPI dùng để duy trì nhịp đập vận hành (Business as usual) và tính lương. OKR dùng để định hướng chiến lược (Hoshin Kanri) và không nên gắn trực tiếp vào việc phạt lương để khuyến khích tinh thần dám đặt mục tiêu lớn.
* Mobile-First cho khối Operation: Daily Workflow của nhân sự trực tiếp thi công hoặc làm việc tại xưởng phải được thiết kế 100% trên thiết bị di động/Tablet, với nút bấm to và chuẩn font Unicode tiếng Việt, hạn chế tối đa việc phải gõ văn bản dài.
6. Checklist
* Đã mô tả rõ các điểm chạm trong Hành trình nhân viên (Employee Journey) chưa? (Done)
* Luồng công việc hàng ngày (Daily Workflow) đã giải quyết được các tác vụ thủ công gây áp lực cho nhân sự chưa? (Done)
* Đã phân định rõ vai trò của KPI (đo lường vận hành) và OKR (quản trị chiến lược) chưa? (Done)
* Đã chốt phương án triển khai KPI và OKR ở Phase 1 chưa? (Done)
7. Các điểm cần quyết định
* Quyết định đã chốt (Decisions Made): PO đã thống nhất triển khai trọn bộ cả KPI và OKR ngay trong Phase 1. Hệ thống sẽ cung cấp các báo cáo hiệu suất chi tiết (Dashboards/Reports) được tự động xuất và gửi đến từng nhân viên cũng như các cấp quản lý liên quan. Quyết định này giúp doanh nghiệp duy trì nhịp điệu vận hành thực tế (KPI) để tính lương thưởng minh bạch, đồng thời đảm bảo đội ngũ luôn bám sát chiến lược dài hạn (OKR) nhằm phát triển một cách hệ thống và đồng bộ.
________________


Chương 8.
Business Process Landscape
chương 8 đã viết xong như sau "
Chương 8. Cảnh quan Quy trình Kinh doanh (Business Process Landscape)
1. Mục tiêu chương
Chương này phác họa bức tranh toàn cảnh (Landscape) về hệ thống quy trình vận hành của SME OS. Mục tiêu là kết nối các Năng lực (Capabilities) đã định nghĩa ở Chương 3 thành các chuỗi hành động liên hoàn. Lưu ý quan trọng: Chương này chỉ đóng vai trò mô tả tổng quan (High-level Overview) để xác ��ịnh ranh giới và sự giao tiếp giữa các phòng ban. Các lưu đồ chi tiết (Flowcharts/BPMN) từng bước thực thi sẽ được tách riêng vào Tài liệu số 3: Process Map.
2. Vai trò trong hệ thống
Business Process Landscape đóng vai trò như "bản đồ giao thông" của doanh nghiệp:
Cho phép CEO nhìn thấy luồng chảy của Dữ liệu (Data), Tiền (Money) và Giá trị (Value) xuyên suốt toàn công ty.
Chỉ ra các điểm giao tiếp (Hand-over points) giữa các phòng ban để tránh tình trạng "silo" (đùn đẩy trách nhiệm).
Làm cơ sở nền tảng để viết Use Case và thiết kế luồng Automation.
3. Giải thích chi tiết (Cảnh quan Quy trình)
Hệ sinh thái quy trình của SME OS được cấu thành từ 8 chuỗi quy trình chính, vận hành song song và tương tác liên tục với nhau:
8.1 Marketing Process (Quy trình Tiếp thị): Chuỗi hoạt động thu hút sự chú ý. Bắt đầu từ việc lập kế hoạch chiến dịch, xuất bản nội dung, chạy quảng cáo, cho đến việc thu thập và chấm điểm Lead. Đầu ra c��a quy trình này là các Warm Lead chất lượng.
8.2 Sales Process (Quy trình Bán hàng): Chuỗi hoạt động chuyển đổi. Tiếp nhận Lead từ Marketing, tiến hành tư vấn, khảo sát nhu cầu, lên báo giá (Quotation), đàm phán chốt sale và ký kết Hợp đồng. Đầu ra là một Deal (Won) sẵn sàng để thi công.
8.3 CRM Process (Quy trình Quản trị Quan hệ Khách hàng): Chuỗi hoạt động nuôi dưỡng và giữ chân. Bao gồm việc chăm sóc hậu mãi (After-sales), xử lý khiếu nại (Ticket), nhắc lịch bảo dưỡng định kỳ và các chương trình khách hàng thân thiết (Loyalty/Referral).
8.4 Operation Process (Quy trình Vận hành/Thi công): Chuỗi hoạt động tạo ra giá trị lõi. Bắt đầu từ việc tiếp nhận Yêu cầu dịch vụ (Booking/Order), điều phối nhân sự, thực thi các Task theo chuẩn SOP (Ví dụ: thi công dán màng phim, vệ sinh chi tiết), kiểm tra chất lượng (QA) và bàn giao cho khách hàng (Delivery).
8.5 HR Process (Quy trình Nhân sự): Chuỗi hoạt động quản trị vòng đời nhân viên. Bao gồm tuy���n dụng, đào tạo hội nhập (Onboarding), phân ca làm việc, chấm công, tính lương và đánh giá hiệu suất (KPI/OKR).
8.6 Inventory Process (Quy trình Kho & Vật tư): Chuỗi hoạt động cung ứng. Đảm bảo vật tư luôn sẵn sàng cho Operation. Bao gồm quy trình tạo Yêu cầu mua hàng (PR), nhập kho, xuất kho tiêu hao theo định mức dịch vụ và kiểm kê định kỳ.
8.7 Finance Process (Quy trình Tài chính): Chuỗi hoạt động quản trị dòng tiền. Bao gồm quy trình xuất hóa đơn (Invoicing), ghi nhận doanh thu, theo dõi công nợ (AR/AP), thanh toán chi phí và lập báo cáo kết quả kinh doanh (P&L).
8.8 Website Process (Quy trình Tương tác Số): Chuỗi hoạt động trên cổng thông tin số. Quản lý việc cập nhật Landing Page, luồng khách hàng tự phục vụ (Self-service Booking) và cơ chế đẩy dữ liệu tự động (Form Submit) về hệ thống lõi.
4. Ví dụ minh họa
Chuỗi giá trị liên hoàn (Value Chain Flow):
Một khách hàng truy cập trực tuyến và đặt lịch qua Website Process. Dữ liệu lập tức kích hoạt Marketing Process để ghi nhận nguồn Lead. Nhân viên tiếp nhận qua Sales Process, gọi điện chốt gói dịch vụ phủ Ceramic và tạo Order. Lệnh này được chuyển sang Operation Process để quản đốc xưởng phân việc cho kỹ thuật viên. Để thi công, hệ thống tự động trừ dung dịch phủ trong Inventory Process. Sau khi hoàn thiện và giao xe, Finance Process ghi nhận khoản thu, tính hoa hồng cho nhân viên Sales. Cuối cùng, CRM Process thiết lập luồng tự động để 6 tháng sau nhắc khách hàng quay lại bảo dưỡng mặt phủ.
5. Best Practice
Focus on Handoffs (Tập trung vào điểm chuyển giao): Các lỗi vận hành lớn nhất thường xảy ra khi chuyển giao từ quy trình này sang quy trình khác (ví dụ: Sales chốt xong nhưng quên báo cho Operation). Cần xác định rõ Input/Output của từng quy trình.
Keep it High-level: Ở giai đoạn kiến trúc (Architecture), không đi sâu vào từng nút bấm (Click). Chỉ tập trung vào dòng chảy của nghiệp vụ.
6. Checklist
Đã liệt kê đầy đủ 8 nhóm quy trình lõi của hệ thống chưa? (Done)
Ranh giới giữa các quy trình (Ví dụ: Marketing vs. Sales) có rõ ràng không? (Done)
Đã làm rõ việc chi tiết hóa quy trình sẽ được thực hiện ở Tài liệu số 3 chưa? (Done)
7. Các điểm cần quyết định
[CẦN LÀM RÕ] - Mức độ ưu tiên chi tiết hóa cho Tài liệu số 3 (Process Map): Để tối ưu thời gian ra mắt Phase 1, Product Owner cần chốt: Khi chuyển sang bước vẽ luồng chi tiết (Tài liệu 3), chúng ta sẽ vẽ trọn vẹn cả 8 quy trình này, hay chỉ tập trung "Đánh tỉa" 4 quy trình xương sống (Sales, Operation, CRM, Finance) mang lại dòng tiền trực tiếp, và tạm thời dùng chuẩn ngành (Industry Standard) có sẵn cho các quy trình hỗ trợ (như HR, Inventory)? vẽ trọn vẹn cả 8 quy trình này nhưng note rõ các phần thiết kế gói về sau, 4 quy trình sinh tiền trực tiếp có sẵn từ gói standard và gói pro còn 4 quy trình còn lại sẽ nằm trong gói premium và gói vip


________________


Chương 9. Business Object Model (Mô hình Đối tượng Kinh doanh)
1. Mục tiêu chương
* Định nghĩa các Thực thể Nghiệp vụ lõi: Chương này xác định và mô hình hóa 10 Đối tượng Kinh doanh (Business Objects) đại diện cho tất cả các thực thể thực tế cấu thành nên hoạt động vận hành của doanh nghiệp SME.
* Phân định ranh giới kiến trúc: Khẳng định rõ ràng đây là lớp nghiệp vụ (Business Layer) – tập trung định nghĩa bản chất, ý nghĩa kinh doanh, mối quan hệ và vòng đời vận hành của thực thể. Đây KHÔNG PHẢI là Data Model hay Database Schema (tầng kỹ thuật lưu trữ dữ liệu sẽ được thiết kế ở File 3: System Architecture).
2. Vai trò trong hệ thống
* Ngôn ngữ chung (Ubiquitous Language): Đóng vai trò là bộ từ vựng thống nhất giữa CEO/Product Owner và đội ngũ Kỹ thuật (Architect/Developer), đảm bảo mọi thành viên hiểu đúng bản chất của từng đối tượng kinh doanh.
* Trung tâm kết nối xuyên phân hệ: Giúp các Module (Website, CRM, ERP, Marketing, HR) có cùng một góc nhìn duy nhất về các đối tượng theo nguyên tắc One Source of Truth.
* Đầu vào trực tiếp cho các tầng tiếp theo: Là cơ sở để định nghĩa các Business Rules (Chương 11 - Quy tắc nghiệp vụ tác động lên đối tượng), Business Events (Chương 12 - Sự kiện thay đổi trạng thái đối tượng) và thiết kế Data Model / API ở tầng ứng dụng.
3. Giải thích chi tiết (10 Business Objects Lõi)
Mô hình đối tượng kinh doanh của SME OS gồm 10 thực thể cốt lõi sau:
9.1 Customer (Khách hàng)
* Bản chất nghiệp vụ: Đối tượng nhận giá trị và trả tiền cho doanh nghiệp. Đại diện cho toàn bộ mối quan hệ kinh doanh, lịch sử tương tác và giá trị tích lũy (Lifetime Value).
* Phạm vi nghiệp vụ: Bao phủ cả hai mô hình B2C (Cá nhân - Contact) và B2B (Tổ chức/Doanh nghiệp - Company).
* Vòng đời nghiệp vụ (Lifecycle): Lead (Tiềm năng) → Prospect (Đang tiếp cận) → Active Customer (Khách hàng mua lần đầu) → Loyal Customer (Khách hàng trung thành) → Churned / Inactive (Khách hàng rời bỏ/Ngưng hoạt động).
9.2 Employee (Nhân sự)
* Bản chất nghiệp vụ: Thực thể thực thi công việc, chịu trách nhiệm vận hành, được phân quyền truy cập hệ thống và gắn với chỉ số hiệu suất (KPI/OKR).
* Phạm vi nghiệp vụ: Quản lý vòng đời nhân viên từ khi vào công ty đến khi nghỉ việc, bao gồm vai trò (Role), chức danh (Position) và phòng ban (Department).
* Vòng đời nghiệp vụ: Candidate (Ứng viên) → Onboarding (Thử việc/Hội nhập) → Official (Chính thức) → Suspended (Tạm ngưng) → Resigned (Đã nghỉ việc).
9.3 Product (Sản phẩm / Vật tư)
* Bản chất nghiệp vụ: Thực thể hàng hóa hữu hình có tính chất kiểm kê, lưu kho, nhập/xuất tiêu hao hoặc mua bán kinh doanh.
* Phạm vi nghiệp vụ: Bao gồm hàng bán thương mại, nguyên vật liệu đầu vào, hóa chất/phụ tùng tiêu hao phục vụ dịch vụ.
* Trạng thái nghiệp vụ: Draft (Nháp) → Active (Đang kinh doanh/sử dụng) → OutOfStock (Tạm hết hàng) → Discontinued (Ngừng kinh doanh).
9.4 Service (Dịch vụ)
* Bản chất nghiệp vụ: Thực thể giá trị vô hình mà doanh nghiệp cung cấp cho khách hàng. Gắn liền với định mức thời gian thực thi, quy trình chuẩn (SOP) và năng lực phục vụ.
* Phạm vi nghiệp vụ: Danh mục dịch vụ lẻ, gói dịch vụ combo, gói bảo dưỡng định kỳ (ví dụ: Phủ Ceramic, Dán phim cách nhiệt, Vệ sinh khoang máy).
* Trạng thái nghiệp vụ: Draft (Khởi tạo) → Active (Đang cung cấp) → Inactive (Ngừng cung cấp).
9.5 Supplier (Nhà cung cấp)
* Bản chất nghiệp vụ: Đối tượng đối tác bên ngoài cung ứng vật tư, hàng hóa, thiết bị hoặc dịch vụ đầu vào cho doanh nghiệp.
* Phạm vi nghiệp vụ: Lịch sử mua hàng, theo dõi công nợ phải trả (AP), đánh giá chất lượng cung ứng và quản lý hợp đồng nhà cung cấp.
* Trạng thái nghiệp vụ: Potential (Tiềm năng) → Active (Đang hợp tác) → Blacklisted / Inactive (Ngừng hợp tác/Ngừng giao dịch).
9.6 Invoice (Hóa đơn / Chứng từ Tài chính)
* Bản chất nghiệp vụ: Đối tượng xác nhận ghi nhận cam kết tài chính, giá trị giao dịch dòng tiền và nghĩa vụ thanh toán giữa Doanh nghiệp với Khách hàng hoặc Nhà cung cấp.
* Phạm vi nghiệp vụ: Bao gồm Hóa đơn bán hàng (AR) và Hóa đơn mua hàng/Chi phí (AP).
* Vòng đời nghiệp vụ: Draft (Bản nháp) → Issued (Đã xuất/Gửi đi) → Partially Paid (Thanh toán một phần) → Paid (Đã thanh toán đủ) → Overdue (Quá hạn) → Cancelled / Void (Hủy bỏ).
9.7 Booking (Lịch hẹn / Yêu cầu Dịch vụ)
* Bản chất nghiệp vụ: Đối tượng đại diện cho cam kết về mặt thời gian, nhân sự và tài nguyên giữa Khách hàng và Doanh nghiệp để thực hiện một hoặc nhiều Dịch vụ.
* Phạm vi nghiệp vụ: Đặt lịch trực tuyến qua Website, đặt lịch trực tiếp qua điện thoại/Sales, xếp lịch tại xưởng/cơ sở dịch vụ.
* Vòng đời nghiệp vụ: Created (Mới tạo) → Confirmed (Đã xác nhận) → In-Progress (Đang thực hiện) → Completed (Hoàn thành) → Cancelled (Đã hủy) → No-Show (Khách không đến).
9.8 Campaign (Chiến dịch)
* Bản chất nghiệp vụ: Đối tượng gom nhóm các hoạt động Tiếp thị (Marketing) hoặc Bán hàng (Sales) được thực hiện trong một khoảng thời gian nhất định nhằm đạt mục tiêu kinh doanh cụ thể.
* Phạm vi nghiệp vụ: Quản lý ngân sách (Budget), kênh triển khai (Channel), đo lường chi phí thu đắc khách hàng (CAC) và doanh thu mang lại (ROI).
* Vòng đời nghiệp vụ: Planned (Lập kế hoạch) → Active (Đang chạy) → Paused (Tạm dừng) → Completed (Kết thúc) → Archived (Lưu trữ).
9.9 Task (Công việc / Nhiệm vụ)
* Bản chất nghiệp vụ: Đơn vị hành động nhỏ nhất được giao cho Nhân sự (Employee) hoặc Hệ thống tự động xử lý nhằm hoàn thành một bước trong quy trình vận hành.
* Phạm vi nghiệp vụ: Task chăm sóc khách hàng (Sales/CRM), Task thi công dịch vụ (Operation), Task phê duyệt (Approval).
* Vòng đời nghiệp vụ: Pending (Chờ xử lý) → Assigned (Đã giao) → In-Progress (Đang làm) → Reviewing (Đang kiểm tra/QA) → Done (Hoàn thành) → Overdue (Trễ hạn).
9.10 Asset (Tài sản Doanh nghiệp)
* Bản chất nghiệp vụ: Thực thể tài nguyên vật chất hoặc công cụ phục vụ hoạt động vận hành dài hạn của doanh nghiệp, có giá trị kinh tế và chịu sự khấu hao/bảo trì.
* Phạm vi nghiệp vụ: Máy móc thi công (máy đánh bóng, cầu nâng), trang thiết bị văn phòng, phương tiện vận chuyển, mặt bằng xưởng.
* Trạng thái nghiệp vụ: In-Use (Đang sử dụng) → Under-Maintenance (Đang bảo trì/sửa chữa) → Broken (Hỏng hóc) → Liquidated (Đã thanh lý).
4. Ví dụ minh họa
Chuỗi liên kết các Business Object trong luồng vận hành thực tế:
Một Khách hàng (Customer) đặt lịch hẹn (Booking) dịch vụ Phủ Ceramic (Service) trên Website. Lịch hẹn này gắn liền với Chiến dịch Marketing Mùa hè (Campaign).
Khi lịch hẹn được xác nhận, hệ thống tự động sinh ra một Công việc (Task) thi công giao cho Nhân viên kỹ thuật (Employee). Để thực thi công việc, nhân viên xuất kho 2 chai dung dịch phủ Ceramic (Product) và sử dụng Máy đánh bóng chuyên dụng (Asset).
Sau khi thi công xong và kiểm tra chất lượng, Quản đốc nghiệm thu Task. Hệ thống khởi tạo Hóa đơn (Invoice) thu tiền khách hàng. Mọi giao dịch và dữ liệu tài chính được ghi nhận, hoàn tất một vòng lặp tương tác giữa 10 Business Objects mà không làm đứt gãy dữ liệu.
5. Best Practice
* Nghiệp vụ trước, Dữ liệu sau (Business-Driven, Not Table-Driven): Định nghĩa Business Object tuyệt đối không quan tâm đến việc tạo bao nhiêu bảng (Table), đặt khóa chính (Primary Key) hay khóa ngoại (Foreign Key) như thế nào. Hãy tập trung vào: "Thực thể này đại diện cho cái gì trong thực tế và nó có những trạng thái nghiệp vụ nào?".
* Quản lý Trạng thái & Vòng đời (State Machine): Mọi sự thay đổi của Business Object phải diễn ra thông qua sự chuyển đổi trạng thái (State Transition) rõ ràng, không được nhảy trạng thái bất hợp lệ (ví dụ: Booking không thể nhảy trực tiếp từ Created sang Completed mà bỏ qua In-Progress).
* Đại diện duy nhất (Single Real-world Representation): Một đối tượng ngoài đời thực chỉ được đại diện bởi duy nhất 1 Business Object trong toàn bộ kiến trúc (Ví dụ: Employee vừa là tài khoản đăng nhập, vừa là người thực thi công việc, vừa là người nhận hoa hồng – không tách thành các đối tượng rời rạc).
6. Checklist
* Đã liệt kê đủ 10 Business Objects cốt lõi của hệ thống SME OS chưa? (Done)
* Đã phân biệt rõ ràng giữa Business Object Model (Nghiệp vụ) và Data Model (Kỹ thuật) chưa? (Done)
* Mỗi Business Object đều có định nghĩa phạm vi và Vòng đời trạng thái (Lifecycle) rõ ràng chưa? (Done)
7. Các điểm cần quyết định
[ĐÃ CHỐT] Cấu trúc Customer Object (B2B vs B2C): Ở tầng Business Object Model, Customer được quản lý dưới dạng 1 Business Object duy nhất có thuộc tính định danh phân loại (Individual hoặc Corporate). Việc tách bảng dữ liệu chi tiết (Contact & Company) sẽ do tầng Data Model ở File 3 (System Architecture) đảm nhiệm nhằm giữ cho tầng Business Architecture tối giản và tinh gọn nhất.


________________


Chương 10. KPI Architecture (Kiến trúc Chỉ số Hiệu suất Kinh doanh)
1. Mục tiêu chương
* Định hình khung chỉ số đo lường chuẩn hóa: Xây dựng hệ thống chỉ số đo lường hiệu suất (KPI/Metric Architecture) xuyên suốt 7 phân hệ vận hành lõi của doanh nghiệp SME.
* Chuẩn hóa công thức và nguồn dữ liệu: Đảm bảo mọi chỉ số đều được tính toán tự động từ một nguồn dữ liệu duy nhất (Single Source of Truth), loại bỏ hoàn toàn tình trạng báo cáo thủ công hoặc sai lệch số liệu giữa các phòng ban.
* Biến mục tiêu chiến lược thành hành động định lượng: Giúp CEO và cấp quản lý theo dõi "sức khỏe" doanh nghiệp theo thời gian thực (Real-time Tracking), từ đó đưa ra quyết định dựa trên dữ liệu (Data-driven Decisions).
2. Vai trò trong toàn hệ thống
* Đầu vào cho Dashboard & Command Center: Cung cấp bộ công thức và logic hiển thị cho màn hình điều hành (Dashboard) của từng vai trò (CEO, Marketing Lead, Sales Manager, Chief Accountant, Warehouse Manager, HR Lead).
* Nền tảng quan sát cho AI Brain: Các chỉ số KPI đóng vai trò là "điểm đo" (Observation Points). Hệ thống AI sẽ liên tục giám sát các chỉ số này để thực hiện luồng xử lý: Observe (Quan sát KPI) → Detect (Phát hiện bất thường/Sụt giảm) → Diagnose (Chẩn đoán nguyên nhân) → Recommend (Đề xuất giải pháp).
* Đồng bộ mục tiêu (Business Alignment): Kết nối trực tiếp mục tiêu cấp cao của CEO (Tài chính & Dòng tiền) xuống các chỉ số vận hành hàng ngày của nhân viên (Lead, Deal, Task, Inventory).
3. Giải thích chi tiết (Khung Chỉ số Hiệu suất 7 Phân hệ)
Khung KPI Architecture của SME OS được tổ chức thành 7 nhóm chỉ số tương ứng với các vai trò và phòng ban chính:
10.1 CEO KPI (Tổng quan Điều hành & Sức khỏe Doanh nghiệp)
Tập trung vào bức tranh tài chính tổng thể, hiệu quả sử dụng vốn và sự phát triển bền vững của doanh nghiệp.
* Gross/Net Revenue (Doanh thu Gộp / Doanh thu Thuần): Tổng giá trị giao dịch thực tế đã ghi nhận sau khi trừ giảm giá/hoàn tiền.
* Net Profit Margin (Tỷ suất Lợi nhuận Ròng): Tỷ lệ phần trăm lợi nhuận còn lại sau khi trừ toàn bộ chi phí vận hành (COGS, OPEX, Thuế).
* Operating Cash Flow (Dòng tiền Vận hành): Lượng tiền mặt thực tế thu vào và chi ra từ hoạt động kinh doanh cốt lõi.
* LTV / CAC Ratio (Tỷ lệ Giá trị Vòng đời Khách hàng / Chi phí Thu đắc Khách hàng): Đo lường hiệu quả thương mại dài hạn. Chỉ số lý tưởng cho SME là ≥ 3:1.
* Revenue per Employee (Doanh thu Bình quân trên Nhân sự): Hiệu suất tạo ra giá trị của toàn bộ bộ máy nhân sự.
10.2 Marketing KPI (Hiệu quả Phễu Thu hút & Chiến dịch)
Đo lường năng lực tạo ra nhu cầu và tối ưu chi phí tiếp thị.
* Total Leads / Qualified Leads (Số lượng Lead / Lead Chất lượng - MQL): Tổng số lượng liên hệ thu thập được và số Lead đạt tiêu chuẩn chuyển giao cho Sales.
* Cost Per Lead (CPL) & Cost Per Acquisition (CPA): Chi phí trung bình để mang về 1 Lead và chi phí để có 1 Khách hàng mới trả tiền.
* ROAS (Return on Ad Spend) / Campaign ROI: Tỷ lệ doanh thu mang lại trên mỗi đồng chi phí quảng cáo trực tiếp.
* Conversion Rate (Tỷ lệ Chuyển đổi Phễu Marketing): Tỷ lệ phần trăm lượt truy cập Website/Landing Page chuyển thành Lead.
10.3 Sales KPI (Hiệu quả Bán hàng & Chuyển đổi Doanh số)
Đo lường năng lực chốt đơn, tốc độ xử lý cơ hội và giá trị hợp đồng.
* Win Rate / Close Rate (Tỷ lệ Chốt Deal Thành công): Tỷ lệ phần trăm số Lead/Prospect chuyển thành Deal thành công (Won).
* Average Deal Size / AOV (Giá trị Đơn hàng Trung bình): Giá trị tiền trung bình trên mỗi hợp đồng/đơn hàng được ký kết.
* Sales Cycle Length (Thời gian Chu kỳ Bán hàng): Số ngày trung bình từ lúc tiếp nhận Lead đến khi chốt đơn thành công.
* Sales Quota Attainment (Tỷ lệ Hoàn thành Tờ khai Doanh số): % Mức độ đạt chỉ tiêu doanh số cá nhân/đội nhóm so với mục tiêu đề ra.
10.4 Finance KPI (D��ng tiền & Quản trị Công nợ)
Đo lường sự an toàn tài chính, khả năng thanh khoản và hiệu quả thu hồi nợ.
* Days Sales Outstanding (DSO - Số ngày Thu hồi Công nợ Trung bình): Thời gian trung bình để thu tiền mặt sau khi đã xuất hóa đơn cho khách hàng.
* Days Payable Outstanding (DPO - Số ngày Thanh toán Nợ Nhà cung cấp): Thời gian trung bình doanh nghiệp giữ tiền trước khi thanh toán cho NCC.
* Cash Burn Rate & Runway (Tốc độ Đốt tiền & Thời gian Sống còn): Mức chi tiêu ròng hàng tháng và số tháng doanh nghiệp có thể hoạt động mà không cần thêm doanh thu mới.
* EBITDA / Operating Margin (Lợi nhuận Vận hành trước Thuế và Khấu hao): Đo lường hiệu quả kinh doanh thuần túy không tính các yếu tố tài chính/thuế.
10.5 Inventory KPI (Quản trị Kho & Cung ứng Vật tư)
Đo lường tối ưu vốn lưu động dồn vào hàng hóa và tốc độ luôn sẵn sàng vật tư phục vụ thi công.
* Inventory Turnover Ratio (Vòng quay Hàng tồn kho): Số lần hàng tồn kho được bán hoặc sử dụng hết trong một khoảng thời gian (tháng/năm).
* Stock-out Rate (Tỷ lệ Đứt hàng / Thiếu vật tư): Tỷ lệ phần trăm các đơn hàng/lịch hẹn bị trễ hoặc ngưng trệ do thiếu hàng trong kho.
* Deadstock Ratio (Tỷ lệ Hàng Tồn đọng / Hết hạn): Tỷ lệ phần trăm giá trị kho bị đọng quá 90 ngày hoặc hết hạn sử dụng.
* Inventory Accuracy Rate (Độ Chính xác Kiểm kê): Tỷ lệ khớp giữa số lượng vật tư trên hệ thống phần mềm và số lượng thực tế trong xưởng/kho.
10.6 HR KPI (Hiệu suất & Vòng đời Nhân sự)
Đo lường sự ổn định tổ chức, năng lực sản xuất và chi phí sử dụng lao động.
* Employee Turnover Rate (Tỷ lệ Biến động / Nghỉ việc của Nhân sự): Tỷ lệ % nhân sự nghỉ việc trong một khoảng thời gian.
* Time-to-Hire & Onboarding Time (Thời gian Tuyển dụng & Hòa nhập): Số ngày trung bình để tuyển 1 vị trí và thời gian để nhân viên mới đạt 100% năng suất.
* Labor Cost Ratio (Tỷ lệ Chi phí Nhân sự trên Doanh thu): Chi phí tiền lương + phụ cấp trên tổng doanh thu tạo ra.
* KPI / OKR Attainment Rate (Tỷ lệ Hoàn thành Mục tiêu Cá nhân): Mức độ hoàn thành các chỉ số công việc được giao của nhân viên.
10.7 Service KPI (Chất lượng Thi công & Hậu mãi / Operation)
Đo lường năng lực thực thi dịch vụ thực tế, mức độ hài lòng và tỷ lệ quay lại của khách hàng.
* On-Time Delivery Rate (Tỷ lệ Bàn giao Đúng hẹn): Tỷ lệ % lịch hẹn/đơn hàng dịch vụ hoàn thành đúng mốc thời gian cam kết.
* QA Pass Rate (Tỷ lệ Đạt Chuẩn Kiểm tra Chất lượng): Tỷ lệ % sản phẩm/dịch vụ hoàn thành vượt qua khâu kiểm tra chất lượng lần đầu không cần làm lại (First-Time Right).
* CSAT (Customer Satisfaction Score) & NPS (Net Promoter Score): Điểm số hài lòng tức thì sau dịch vụ và chỉ số sẵn sàng giới thiệu cho người khác.
* Retention / Re-visit Rate (Tỷ lệ Khách hàng Quay lại Bảo dưỡng): Tỷ lệ khách hàng cũ sử dụng lại dịch vụ hoặc tái bảo trì định kỳ.
4. Ví dụ minh họa
Chuỗi Cảnh báo & Tương tác Chỉ số KPI thời gian thực:
1. Sự kiện Kích hoạt: Chi phí chạy quảng cáo Facebook Mùa Hè tăng cao, đẩy chỉ số Cost Per Lead (CPL) của phòng Marketing tăng 45%.
2. AI Brain Quan sát (Observe): Hệ thống AI quét chỉ số CPL vượt ngưỡng trần cảnh báo (Threshold Limit).
3. Phát hiện & Chẩn đoán (Detect & Diagnose): AI kết nối dữ liệu sang Sales KPI và nhận thấy Win Rate của đội Sales giảm từ 25% xuống 10%. AI chẩn đoán: "Lead mang về từ Chiến dịch Facebook không đúng Chân dung Khách hàng (Wrong Targeting), dẫn đến Sales không chốt được đơn dù chi phí quảng cáo tăng".
4. Tác động Tài chính: AI tính toán chỉ số CAC tăng gấp đôi, làm giảm Net Profit Margin của gói dịch vụ xuống dưới mức tối thiểu 15%.
5. Đề xuất Hành động (Recommend): AI gửi cảnh báo trực tiếp lên CEO Dashboard và Marketing Dashboard với đề xuất: "Tạm dừng Chiến dịch Facebook Mùa Hè; Điều chỉnh lại Tiêu chí Chấm điểm Lead (Lead Scoring Rules) trước khi bật lại quảng cáo".
5. Best Practice
* Less is More (Tập trung chỉ số cốt lõi): Mỗi vai trò/vị trí chỉ nên theo dõi tối đa 3-5 chỉ số KPI cốt lõi (North Star Metrics). Việc theo dõi quá nhiều chỉ số sẽ gây nhiễu và làm mất tập trung điều hành.
* Phân biệt Leading Metrics & Lagging Metrics:
   * Lagging Metrics (Chỉ số kết quả): Doanh thu, Lợi nhuận (Chỉ biết kết quả khi sự việc đã xảy ra).
   * Leading Metrics (Chỉ số dẫn dắt): Số cuộc gọi Sales, Số Lead mới, Tỷ lệ đứt hàng (Dự báo trước kết quả tương lai). Hệ thống SME OS ưu tiên hiển thị các Leading Metrics để can thiệp kịp thời.
* Tính toán Tự động (Automated Calculation): KPI phải được tính tự động từ dữ liệu giao dịch thực tế (Invoices, Tasks, Bookings). Cấm hoàn toàn cơ chế cho phép nhân viên tự gõ nhập tay chỉ số KPI.
6. Checklist
* Đã phủ đủ bộ chỉ số đo lường cho 7 phân hệ vận hành lõi chưa? (Done)
* Mỗi chỉ số đều có định nghĩa, ý nghĩa nghiệp vụ và logic nguồn dữ liệu rõ ràng chưa? (Done)
* Đã làm rõ mối liên kết giữa KPI Architecture với màn hình Dashboard và bộ não AI chưa? (Done)
7. Các điểm cần quyết định
[ĐÃ CHỐT] Tần suất Tính toán Chỉ số (Computation Frequency):
* Các chỉ số Vận hành & Bán hàng (Leads, Bookings, On-Time Rate, Win Rate): Tính toán và cập nhật theo thời gian thực (Real-time).
* Các chỉ số Tài chính & Quản trị cấp cao (Profit Margin, DSO, DPO, Inventory Turnover, Labor Cost Ratio): Hệ thống tự động tổng hợp và chốt số liệu theo chu kỳ cuối ngày (Daily Batch Processing) để đảm bảo tốc độ truy vấn của hệ thống.
________________


Chương 11. Business Rules (Quy tắc Nghiệp vụ)
1. Mục tiêu chương
* Định nghĩa hàng rào bảo vệ hệ thống: Xây dựng bộ quy tắc logic nghiệp vụ (Business Logic/Constraints) bắt buộc phải tuân thủ trong quá trình vận hành để bảo vệ tính chính xác, toàn vẹn của Dữ liệu, Tiền và Hàng hóa.
* Cung cấp đầu vào tuyệt đối cho Lập trình viên (Developer): Đây là tài liệu gốc để lập trình viên viết các đoạn code kiểm tra điều kiện (Validation/If-Else) tại tầng Backend / Business Kernel.
* Cung cấp ngữ cảnh (Context) cho AI Brain: Trí tuệ nhân tạo sẽ học thuộc các bộ luật này để (1) Không bao giờ đưa ra các đề xuất vi phạm nguyên tắc công ty và (2) Cảnh báo khi phát hiện nhân sự cố tình "lách luật".
2. Vai trò trong toàn hệ thống
* Nằm tại Business Kernel (Tủy sống): Theo giải phẫu hệ thống SME OS, mọi tác vụ từ giao diện (Dashboard) gửi xuống Master Database đều phải đi qua tủy sống và bị rà soát bởi bộ luật Business Rules này.
* Ngăn chặn rủi ro vận hành: Giảm thiểu tối đa lỗi con người (Human Error), trục lợi cá nhân (Fraud) và thất thoát tài sản (Loss) mà không cần người quản lý phải giám sát 24/7.
* One Source of Truth cho Logic: Không code cứng (hardcode) các luật này rải rác trên màn hình giao diện Website hay CRM, mà gom tập trung tại một "Bộ máy Quy tắc" (Rule Engine) duy nhất.
3. Giải thích chi tiết (8 Bộ quy tắc Cốt lõi)
11.1 Customer Rules (Quy tắc Khách hàng)
* Quy tắc Chống trùng lặp (Duplicate Prevention): Số điện thoại (Phone) và Email là định danh duy nhất (Unique ID). Không cho phép tạo 2 Khách hàng có cùng Số điện thoại.
* Quy tắc Xóa (Deletion Rule): KHÔNG BAO GIỜ cho phép xóa cứng (Hard Delete) hồ sơ Khách hàng đã có lịch sử giao dịch (Hóa đơn, Booking). Chỉ được chuyển trạng thái sang ngưng hoạt động (Inactive/Archived).
* Quy tắc Sở hữu (Ownership Rule): Khách hàng mới sinh ra từ Website mặc định thuộc về hệ thống (System) cho đến khi được gán (Assigned) cho một nhân viên Sales chăm sóc.
11.2 Sales Rules (Quy tắc Bán hàng)
* Quy tắc Giảm giá (Discount Limit): Nhân viên Sales chỉ được phép nhập mức giảm giá tối đa X% (Ví dụ: 10%) trên tổng đơn. Nếu nhập > X%, hệ thống chặn lại và yêu cầu trình duyệt (Approval).
* Quy tắc Chuyển trạng thái Deal (Deal State Transition): Một Cơ hội bán hàng (Deal) không thể chuyển sang trạng thái Thắng (Won) nếu chưa có Báo giá (Quotation) hoặc Hợp đồng (Contract) đính kèm.
* Quy tắc Phân bổ Lead (Lead Routing): Lead nóng (Hot Lead) nếu sau 24h không có nhân viên Sales nào tiếp nhận xử lý, hệ thống sẽ tự động thu hồi và phân bổ cho nhân viên khác.
11.3 Finance Rules (Quy tắc Tài chính)
* Quy tắc B��t biến của Hóa đơn (Invoice Immutability): Hóa đơn (Invoice) khi đã xuất/chốt (Issued) thì KHÔNG ĐƯỢC PHÉP sửa đổi (Edit) hoặc xóa. Nếu sai, bắt buộc phải Hủy (Void) và xuất hóa đơn mới, hoặc làm phiếu giảm trừ (Credit Note).
* Quy tắc Thanh toán (Payment Rule): Số tiền ghi nhận thanh toán (Receipt) không được vượt quá số tiền còn phải thu (Balance Due) của Hóa đơn đó.
* Quy tắc Ghi nhận Doanh thu (Revenue Recognition): Doanh thu chỉ được ghi nhận vào Báo cáo (P&L) khi dịch vụ đã chuyển trạng thái Hoàn thành (Completed), không tính dựa trên thời điểm khách đặt cọc (Deposit).
11.4 Inventory Rules (Quy tắc Kho & Vật tư)
* Quy tắc Chống âm kho (Negative Stock Prevention): Tuyệt đối không cho phép xuất kho (Export) nếu số lượng tồn kho thực tế (Quantity on Hand) nhỏ hơn số lượng yêu cầu.
* Quy tắc Xuất tiêu hao Dịch vụ (SOP Consumption): Khi một Task dịch vụ hoàn thành, hệ thống tự động trừ kho vật tư theo Định mức Tiêu hao (Bill of Materials - BOM) đã c���u hình sẵn cho dịch vụ đó.
* Quy tắc Kiểm kê (Stocktake Rule): Chỉ Quản đốc / Thủ kho mới có quyền tạo phiếu chênh lệch kiểm kê (Inventory Adjustment), và mọi khoản chênh lệch âm/dương đều phải ghi nhận log lịch sử rõ ràng.
11.5 Booking Rules (Quy tắc Đặt lịch / Dịch vụ)
* Quy tắc Chống trùng lịch (Overlapping Slot): Hệ thống không cho phép xếp 2 Booking vào cùng một khung giờ đối với cùng một nguồn lực có giới hạn (Ví dụ: Cùng 1 kỹ thuật viên hoặc cùng 1 cầu nâng không thể làm 2 xe cùng lúc).
* Quy tắc Hủy lịch (Cancellation Rule): Khách hàng/Nhân viên chỉ được phép Hủy (Cancel) Booking trước thời gian bắt đầu ít nhất Y giờ (Ví dụ: 2 giờ). Quá thời hạn này, chỉ có Quản lý mới có quyền hủy.
* Quy tắc Check-in: Trạng thái Booking chỉ chuyển sang "Đang thực hiện" (In-Progress) khi nhân viên bấm Check-in (Xác nhận khách đã có mặt tại xưởng).
11.6 Permission Rules (Quy tắc Phân quyền)
* Quy tắc Phân mảnh Dữ liệu (Data Segregation): Trừ cấp Quản lý (Manager/Admin), nhân sự cấp chuyên viên (Staff) chỉ được xem và tương tác với các Dữ liệu (Lead, Deal, Task, Customer) do chính mình phụ trách (Assigned to Me).
* Quy tắc Quyền hạn (RBAC - Role-Based Access Control): Quyền được gắn vào Vai trò (Role), không gắn vào Cá nhân (User). Khi nhân sự thăng chức hoặc chuyển bộ phận, chỉ cần đổi Role.
11.7 Approval Rules (Quy tắc Phê duyệt)
* Quy tắc Ngưỡng chênh lệch (Threshold-based Routing): Bất kỳ tác vụ nào vượt ngưỡng ủy quyền đều kích hoạt luồng duyệt (Ví dụ: Phiếu chi < 2 triệu duyệt tự động; từ 2 - 10 triệu Quản lý duyệt; > 10 triệu CEO duyệt).
* Quy tắc Ủy quyền (Delegation): Người phê duyệt có quyền thiết lập ủy quyền tạm thời (Auto-delegate) cho người khác trong trường hợp nghỉ phép/vắng mặt.
11.8 Notification Rules (Quy tắc Thông báo)
* Quy tắc Đúng Kênh (Right Channel): Cảnh báo hệ thống / Lỗi khẩn cấp (Error/Urgent) đẩy qua Push Notification trên App / Zalo / SMS. Báo cáo định kỳ / Thông tin cần lưu trữ (Report/Summary) gửi qua Email.
* Quy tắc Chống Spam (Anti-Spam): Gom cụm (Batching) các thông báo không khẩn cấp. Thay vì gửi 10 thông báo lẻ tẻ cho 10 Task mới giao, hệ thống gửi 1 thông báo tổng hợp (Summary) vào đầu ca làm việc.
4. Ví dụ minh họa
Luồng thực thi phối hợp các Rules tại Business Kernel:
1. Nhân viên Sales tiếp nhận 1 Lead và tạo Deal mua gói Phủ Ceramic.
2. Khách hàng mặc cả, nhân viên Sales nhập mức Giảm giá 20% vào báo giá.
3. Nhấn "Gửi báo giá". Business Kernel chặn lại vì vi phạm Sales Rule (Vượt ngưỡng giảm giá tối đa 10% của cấp Staff).
4. Kernel lập tức gọi Approval Rule, nhận diện mức 20% cần chữ ký của Sales Manager.
5. Kernel gọi Notification Rule, tự động gửi một Zalo Message đến Quản lý: "Có 1 báo giá giảm 20% từ Sales A chờ duyệt".
6. Quản lý duyệt xong. Khi hóa đơn được sinh ra, Finance Rule khóa cứng hóa đơn này, không cho phép Sales A tự ý vào đổi số tiền thanh toán.
7. T���ng bước một, luật vận hành tự động và loại bỏ hoàn toàn việc xin xỏ qua miệng hay chat cá nhân.
5. Best Practice
* Hard Rules vs. Soft Rules:
   * Hard Rules (Luật cứng): Hệ thống chặn đứng 100%, không có ngoại lệ (VD: Không được xuất âm kho). Viết cứng ở tầng Code (Kernel).
   * Soft Rules (Luật mềm): Hệ thống cảnh báo nhưng vẫn cho phép đi tiếp nếu người dùng ghi chú lý do (VD: Cảnh báo số điện thoại có vẻ không hợp lệ nhưng vẫn cho lưu). Có thể giao cho AI giám sát.
* Mô tả tường minh (Human-Readable): Mọi Business Rule khi bị vi phạm phải ném ra một thông báo lỗi (Error Message) rõ ràng cho người dùng biết họ sai ở đâu, tránh thông báo chung chung kiểu "Lỗi hệ thống 500".
6. Checklist
* Đã phủ đủ 8 khía cạnh quy tắc điều hành lõi của SME OS chưa? (Done)
* Logic luật đã đủ rõ ràng để làm đề bài cho Developer lập trình (If/Else) chưa? (Done)
* Đã tuân thủ triết lý Single Source of Truth (Gom luật về 1 chỗ thay vì phân tán) chưa? (Done)
7. Các điểm cần quyết định
[ĐÃ CHỐT] Quy tắc Xử lý Khách hàng Trùng lặp (Duplicate Resolution): Product Owner đã chốt chọn Option A (Tự động gộp - Auto-Merge). Khi khách hàng tự nhập form từ Website mà trùng Số điện thoại với Data đã có trong CRM, hệ thống tự động cập nhật/ghi đè thông tin mới nhất vào hồ sơ khách hàng cũ. Đồng thời, hệ thống phát sự kiện gửi thông báo trực tiếp đến các bộ phận liên quan (Sales/CRM/Dịch vụ) ghi nhận hành vi tương tác mới và trạng thái mới nhất của khách hàng để kịp thời theo dõi và chăm sóc.


________________


Chương 12. Business Event Overview (Tổng quan Sự kiện Kinh doanh)
1. Mục tiêu chương
* Xác lập khái niệm Sự kiện Kinh doanh (Business Event): Định hình bản chất của Business Event – "nhịp đập" điều khiển toàn bộ luồng thông tin, hành động và sự tương tác giữa các phân hệ trong hệ thống SME OS.
* Phân loại bức tranh tổng quan (Event Categories): Phân nhóm các sự ki���n thành 6 danh mục chính tương ứng với các hoạt động vận hành cốt lõi của doanh nghiệp.
* Xác định ranh giới tài liệu: Khẳng định chương này chỉ đóng vai trò giới thiệu tổng quan và định hướng khung phân loại ở tầng Kiến trúc Kinh doanh (Business Architecture). Toàn bộ danh mục và định nghĩa chi tiết cho từng Event (Trigger, Payload, Publisher, Subscriber...) sẽ được tách riêng và quy hoạch tập trung tại Tài liệu 5D: Event Map Specification (thuộc File 3: System Architecture).
2. Vai trò trong toàn hệ thống
* Tín hiệu điều khiển Hệ thần kinh (Event Center): Mọi hành vi hoặc sự thay đổi trạng thái xảy ra trong các Module (Website, CRM, ERP, Marketing...) đều phát ra các sự kiện (Events). Hệ thần kinh trung ương (Event Center) sẽ tiếp nhận và điều phối các sự kiện này đến đúng nơi cần xử lý.
* Nguồn dữ liệu quan sát thời gian thực cho AI Brain: Để tránh việc AI phải liên tục truy vấn (Polling) làm chậm Master Database, bộ não AI (AI Brain) sẽ lắng nghe (Listen) các Business Events theo thời gian thực để kích hoạt luồng xử lý: Observe → Detect → Diagnose → Recommend.
* Giải phong tỏa sự phụ thuộc giữa các Module (Decoupling): Đảm bảo các Module hoạt động hoàn toàn độc lập, không gọi trực tiếp lẫn nhau mà giao tiếp gián tiếp qua Event. Nhờ đó, việc thêm mới hay nâng cấp một Module sẽ không làm đứt gãy các Module khác.
3. Giải thích chi tiết
12.1 Event là gì? (Khái niệm & Bản chất)
* Định nghĩa: Một Business Event (Sự kiện Kinh doanh) là sự ghi nhận một hành động nghiệp vụ hoặc một sự thay đổi trạng thái có ý nghĩa đã thực sự diễn ra tại một thời điểm cụ thể trong quá trình vận hành doanh nghiệp.
* Bản chất Bất biến (Immutable Fact): Event đại diện cho một sự thật đã xảy ra trong quá khứ. Vì vậy, Event mang tính bất biến – không thể bị sửa đổi, thao tác chỉnh sửa hay xóa bỏ sau khi đã được phát đi (Published).
* Cấu trúc nguyên lý của một Event:
   * Event Name / ID: Tên định danh sự kiện (luôn đặt ở thì quá khứ, ví dụ: CUSTOMER_CREATED, INVOICE_PAID, STOCK_EXPORTED).
   * Timestamp: Mốc thời gian chính xác sự kiện phát sinh.
   * Publisher: Nơi phát ra sự kiện (Module / Component / System).
   * Payload: Tập dữ liệu ngữ cảnh đi kèm sự kiện (mang thông tin tối thiểu cần thiết).
12.2 Event Categories (Phân loại Sự kiện Kinh doanh)
Hệ thống SME OS phân loại Sự kiện Kinh doanh thành 6 nhóm danh mục cốt lõi:
1. Customer Event (Sự kiện Khách hàng):
Mô tả: Các sự kiện phát sinh từ sự tương tác, thay đổi thông tin hoặc chuyển đổi trạng thái của đối tượng Khách hàng (Customer).
Phạm vi bao phủ: Tương tác từ lượt truy cập, điền form, cập nhật hồ sơ, tích điểm loyalty cho đến chuyển trạng thái (Active, Inactive, Churned).
2. Employee Event (Sự kiện Nhân sự):
Mô tả: Các sự kiện diễn ra trong suốt vòng đời hoạt động và làm việc của Nhân sự (Employee).
Phạm vi bao phủ: Tuyển dụng, hội nhập (Onboarding), chấm công ca làm việc, nhận phân công Task, thay đổi vai trò/phòng ban, và nghỉ việc.
3. Marketing Event (Sự kiện Tiếp thị):
Mô tả: Các sự kiện kích hoạt từ kênh truyền thông, chiến dịch quảng cáo và phễu thu hút khách hàng (Marketing).
Phạm vi bao phủ: Lượt tương tác quảng cáo, thu thập Lead mới, biến động ngân sách chiến dịch, và cán mốc mục tiêu tiếp thị.
4. Finance Event (Sự kiện Tài chính):
Mô tả: Các sự kiện tác động đến Hóa đơn, Dòng tiền, Công nợ và Doanh thu (Finance).
Phạm vi bao phủ: Xuất hóa đơn, ghi nhận thanh toán (một phần/toàn bộ), xác nhận khoản chi, cảnh báo quá hạn công nợ và chốt sổ tài chính.
5. Inventory Event (Sự kiện Kho & Vật tư):
Mô tả: Các sự kiện làm biến động số lượng, vị trí hoặc giá trị của Vật tư & Hàng hóa (Inventory).
Phạm vi bao phủ: Nhập kho hàng mua, xuất kho tiêu hao theo chuẩn dịch vụ (SOP/BOM), điều chuyển kho, và kiểm kê chênh lệch.
6. System Event (Sự kiện Nền tảng & Tự đ��ng hóa):
Mô tả: Các sự kiện do Business Kernel, Event Center hoặc Nền tảng tự động phát ra để duy trì sự ổn định vận hành.
Phạm vi bao phủ: Cảnh báo lỗi kết nối, kích hoạt tiến trình chạy ngầm (Batch Processing), phân quyền người dùng, và sao lưu dữ liệu.
(Lưu ý: Mọi định nghĩa chi tiết về Trigger, Payload Schema, Module nhận/xử lý và Kịch bản Automation tương ứng cho từng Event sẽ được mô hình hóa tại Tài liệu 5D: Event Map Specification).
4. Ví dụ minh họa
Luồng lan truyền Sự kiện (Event Propagation) xuyên suốt hệ thống:
Khi một Khách hàng thanh toán hoàn tất Hóa đơn cho dịch vụ Phủ Ceramic tại xưởng:
   1. Phát sự kiện: Module Finance ghi nhận số tiền thu đủ và lập tức phát đi sự kiện INVOICE_PAID (thuộc nhóm Finance Event).
   2. Hệ thần kinh trung ương (Event Center): Tiếp nhận INVOICE_PAID và đẩy tín hiệu đến tất cả các phân hệ đăng ký lắng nghe sự kiện này:
   * Module Inventory: "Nghe" tín hiệu INVOICE_PAID → Tự động tạo phiếu xuất kho chính thức trừ dung dịch Ceramic khỏi kho xưởng (Kích hoạt Inventory Event).
   * Module CRM: "Nghe" tín hiệu INVOICE_PAID → Tự động cộng điểm thưởng cho Khách hàng và cập nhật lịch bảo dưỡng định kỳ (Kích hoạt Customer Event).
   * AI Brain: "Nghe" tín hiệu INVOICE_PAID → Cập nhật chỉ số Net Revenue và Cash Flow trên CEO Dashboard (Kích hoạt System/KPI Event).
Mọi phân hệ xử lý công việc hoàn toàn tự động, trơn tru thông qua sự kiện mà không cần gọi hàm trực tiếp hay can thiệp thủ công.
5. Best Practice
   * Đặt tên Sự kiện theo Thì Quá Khứ (Past-Tense Naming): Luôn sử dụng cú pháp Entity + PastTenseVerb (Ví dụ: ORDER_CREATED, PAYMENT_RECEIVED, TASK_COMPLETED). Tuyệt đối không đặt tên dạng câu lệnh hành động (Command) như CREATE_ORDER hay MAKE_PAYMENT.
   * Payload Tinh Tinh Gọn (Lightweight Payload): Dữ liệu truyền đi kèm sự kiện (Payload) chỉ nên chứa các định danh cốt lõi (ID, Timestamp, Status) để xác nhận hành vi. Tránh việc nhồi nhét toàn bộ dữ liệu lớn của Database vào Payload gây tắc nghẽn đường truyền.
   * Tuân thủ Giới hạn Phạm vi Tài liệu: Ở tầng Kiến trúc Kinh doanh, chỉ tập trung vào ý nghĩa nghiệp vụ và phân loại danh mục tổng quan. Không đưa các thông số kỹ thuật (JSON Schema, Code Handler, Route) vào chương này.
6. Checklist
   * Đã giải thích rõ khái niệm, bản chất bất biến và cấu trúc nguyên lý của Business Event chưa? (Done)
   * Đã phủ đủ 6 nhóm danh mục Event Categories chính của hệ thống chưa? (Done)
   * Đã khẳng định rõ việc định nghĩa chi tiết từng Event sẽ được thực hiện tại Tài liệu 5D (Event Map) chưa? (Done)
7. Các điểm cần quyết định
[ĐÃ CHỐT] Phạm vi định nghĩa Event ở Tầng Business Architecture: Product Owner đã chốt Chương 12 chỉ dừng lại ở việc giới thiệu nguyên lý và phân loại 6 nhóm Event Categories. Toàn bộ danh mục chi tiết kèm thông số kỹ thuật (Event ID, Trigger, Data Payload, Publisher, Subscriber, Automation Rules) sẽ được quy hoạch tập trung tại Tài liệu 5D: Event Map Specification (thuộc File 3: System Architecture).


________________


Chương 13. Business AI Overview (Tổng quan Trí tuệ Nhân tạo Nghiệp vụ)
1. Mục tiêu chương
   * Xác lập triết lý ứng dụng AI trong Kinh doanh: Khẳng định định vị của AI trong SME OS là bộ não trợ lý nâng cao năng suất (Copilot/Advisor), hoạt động trên nguyên tắc tối thượng Business First, AI Second.
   * Định hình khung xử lý 5 tầng của AI (5-Stage AI Decision Framework): Định nghĩa chuỗi luồng tư duy và hành động của AI bao gồm Observe → Detect → Diagnose → Recommend → Execute.
   * Thiết lập cầu nối Kiến trúc (Architectural Bridge): Đóng vai trò là cầu nối từ tầng Kiến trúc Kinh doanh (Business Architecture) sang tài liệu AI Decision Map Specification ở tầng Kiến trúc Hệ thống (File 3: System Architecture).
2. Vai trò trong toàn hệ thống
   * Thành phần AI Brain (Vỏ não): Theo giải phẫu hệ thống SME OS, AI Brain đóng vai trò quan sát, phân tích và đưa ra khuyến nghị; không trực tiếp can thiệp làm thay đổi dữ liệu cốt lõi nếu không đi qua kiểm duyệt của Business Kernel (Tủy sống).
   * Đảm bảo tính độc lập của Nghiệp vụ (AI Optional / Business First): Nếu tắt hoàn toàn phân hệ AI (hoặc ở các phiên bản gói thấp không có AI), toàn bộ luồng vận hành kinh doanh (Website, CRM, ERP, Marketing, Kho, Tài chính) vẫn chạy trơn tru 100% dựa trên Business Rules và Event Center.
   * Chuyển đổi từ Báo cáo tĩnh sang Hành động chủ động: AI biến các số liệu KPI thụ động thành các đề xuất mang tính hành động (Actionable Insights), giúp CEO và nhân sự ra quyết định nhanh chóng, chính xác.
3. Giải thích chi tiết (Khung xử lý AI 5 Tầng)
13.1 AI trong Business (Triết lý Định vị AI)
   * Định vị Trợ lý (Augmented Intelligence, Not Replacement): AI không thay thế con người hay thay thế CEO vận hành doanh nghiệp. AI đóng vai trò là "Trợ lý Trưởng phòng" cho từng vai trò (CEO Assistant, Sales Copilot, Marketing Advisor, Accountant Guard).
   * Business First, AI Second: Toàn bộ logic nghiệp vụ (Business Rules), quy trình (Process Landscape) và mô hình dữ liệu (Business Objects) phải được thiết lập hoàn chỉnh trước. AI chỉ học và vận hành trên nền tảng nghiệp vụ đã chuẩn hóa này.
   * An toàn & Phân quyền (AI Safety & Authorization): AI phải tuân thủ nghiêm ngặt các quy tắc phân quyền (Permission Rules) và ngưỡng phê duyệt (Approval Rules) đã định nghĩa ở Chương 11. AI không có quyền tự ý phê duyệt các tác vụ vượt quá thẩm quyền của vai trò mà nó đang hỗ trợ.
13.2 Observe (Quan sát)
   * Nguồn tín hiệu đầu vào: AI Brain liên tục lắng nghe (Listen) các Sự kiện Kinh doanh (Business Events) phát ra từ Event Center và theo dõi sự biến động của các chỉ số KPI Metrics theo thời gian thực.
   * Tính chất ngầm (Passive Listening): Tiến trình Observe chạy ngầm ở tầng nền, không tiêu tốn tài nguyên truy vấn dữ liệu lớn (Polling) và không làm ảnh hưởng đến tốc độ phản hồi của người dùng trên Dashboard.
13.3 Detect (Phát hiện)
   * Nhận diện Bất thường (Anomaly Detection): AI đối chiếu dữ liệu quan sát được với bộ chỉ số cơ sở (Baseline/Thresholds) và Business Rules để phát hiện ngay lập tức các sai lệch: Sụt giảm KPI, nghẽn quy trình (Process Bottleneck), đứt gãy phễu chuyển đổi, hoặc dấu hiệu vi phạm quy tắc.
   * Ghi nhận sự kiện cảnh báo: Khi phát hiện bất thường, AI tạo ra một Detection Alert kèm theo mức độ rủi ro (Low / Medium / High / Critical).
13.4 Diagnose (Chẩn đoán)
   * Phân tích Nguyên nhân Gốc rễ (Root Cause Analysis): AI không dừng lại ở việc báo lỗi bề nổi, mà truy vết ngược theo chuỗi giá trị liên hoàn (Value Chain Flow) giữa các Business Objects và điểm chuyển giao (Hand-over points) giữa các quy trình.
   * Xác định điểm đứt gãy: AI chỉ ra chính xác điểm nghẽn nằm ở đâu (Ví dụ: do Marketing mang sai Chân dung Khách hàng, do Sales chậm tiếp cận Lead, hay do Kho bị đứt vật tư thi công).
13.5 Recommend (Đề xuất)
   * Tạo hành động gợi ý (Actionable Recommendations): AI tổng hợp kết quả chẩn đoán và đưa ra giải pháp cụ thể, có tính khả thi cao dưới dạng các tùy chọn hành động (Options) cho người dùng.
   * Kèm theo Dự báo Tác động (Impact Assessment): Mỗi đề xuất đều đi kèm dự báo định lượng về hiệu quả (Ví dụ: "Nếu duyệt đề xuất này, thời gian chốt đơn dự kiến giảm 30% và doanh thu tăng 12%").
13.6 Execute (Thực thi)
   * Thực thi Bán tự động (Semi-Automated Execution - Human-in-the-loop): Đối với các tác vụ có mức độ rủi ro Trung bình/Cao (ảnh hưởng đến Tiền, Khách hàng, Hợp đồng), AI chỉ thực thi khi nhận được xác nhận chấp thuận (Approve) từ người dùng có thẩm quyền.
   * Thực thi Tự động hoàn toàn (Full-Automated Execution): Đối với các tác vụ lặp lại, rủi ro thấp và đã được CEO cấu hình ủy quyền trước (Ví dụ: Gửi SMS/Zalo nhắc lịch bảo trì, gán Task chăm sóc Lead quá hạn), AI tự động kích hoạt luồng Automation mà kh��ng cần con người bấm nút.
4. Ví dụ minh họa
Luồng xử lý 5 tầng của AI trong tình huống vận hành thực tế:
   1. Observe (Quan sát): AI Brain lắng nghe Event Center và nhận thấy sự kiện LEAD_CREATED gia tăng nhưng chỉ số Sales Cycle Length ở phân hệ Sales KPI bắt đầu kéo dài bất thường (trung bình 3 ngày chưa có phản hồi).
   2. Detect (Phát hiện): AI phát hiện chỉ số Hot Lead Pending Time vượt quá ngưỡng quy định 24h (vi phạm Sales Rule 11.2).
   3. Diagnose (Chẩn đoán): AI truy vết mối quan hệ giữa Customer → Employee và chẩn đoán: "Nhân viên Sales A đang bị quá tải với 45 Lead mở cùng lúc, trong khi Sales B chỉ đang phụ trách 5 Lead".
   4. Recommend (Đề xuất): AI gửi thông báo lên Dashboard của Sales Manager với đề xuất: "Đề xuất thu hồi 15 Hot Lead chưa tương tác từ Sales A và tự động phân bổ lại cho Sales B để tối ưu tỷ lệ chuyển đổi Win Rate".
   5. Execute (Thực thi): Sales Manager bấm chọn "Phê duyệt & Thực thi" trên màn hình. AI lập tức gọi Business Kernel thực hiện điều chuyển dữ liệu, đồng thời phát sự kiện LEAD_REASSIGNED thông báo cho Sales B qua Zalo.
5. Best Practice
   * Luôn có sự giám sát của Con người (Human-in-the-loop): Mọi quyết định AI đưa ra ở tầng Recommend phải minh bạch lý do (Explainable AI). Con người luôn giữ quyền kiểm soát tối cao (Ultimate Control) đối với các quyết định kinh doanh quan trọng.
   * Bắt đầu Đơn giản, Nâng cấp dần (Incremental AI): Ở Phase 1 MVP, AI tập trung xử lý tốt 3 tầng đầu (Observe → Detect → Diagnose) để làm tốt vai trò cảnh báo. Các tính năng Recommend và Execute phức tạp sẽ mở khóa dần khi dữ liệu hệ thống đạt đủ độ chín.
   * Không làm chậm luồng nghiệp vụ cốt lõi: Luồng xử lý tính toán của AI Brain phải chạy bất đồng bộ (Asynchronous) hoàn toàn độc lập với luồng xử lý giao dịch tài chính/bán hàng của Business Kernel.
6. Checklist
   * Đã làm rõ triết lý "Business First, AI Second" và định vị AI là Trợ lý chưa? (Done)
   * Đã mô tả đầy đủ và mạch lạc 5 tầng xử lý AI (Observe, Detect, Diagnose, Recommend, Execute) chưa? (Done)
   * Đã khẳng định rõ vai trò cầu nối sang tài liệu AI Decision Map (File 3) chưa? (Done)
7. Các điểm cần quyết định
[ĐÃ CHỐT] Cấp độ Tự động hóa Thực thi (Execution Authority Level) ở Phase 1: Product Owner đã chốt nguyên tắc: Trong phiên bản đầu tiên (Phase 1), hệ thống ưu tiên mô hình Bán tự động (Semi-Automated) cho tầng Execute. Mọi khuyến nghị của AI mang tính chất tác động đến Dữ liệu và Khách hàng bắt buộc phải có sự xác nhận (Click Approve) của người dùng trước khi hệ thống thi hành.


________________


Chương 14. Business Constraints (Các Ràng buộc Nghiệp vụ)
1. Mục tiêu chương
   * Thiết lập "Vòng kim cô" của dự án: Định nghĩa 7 giới hạn và nguyên tắc bất di bất dịch (Constraints) mà toàn bộ hệ thống SME OS phải tuân thủ tuyệt đối.
   * Kế thừa Triết lý Sản phẩm: Chuyển hóa các triết lý trừu tượng từ File 1: Product Philosophy thành những quy định cụ thể, có tính ràng buộc ở tầng Kiến trúc Kinh doanh.
   * Ngăn chặn rủi ro chệch hướng (Scope Creep): Đảm bảo trong quá trình phát triển (từ Phase 1 MVP bằng Google Apps Script cho đến Phase 2 Next.js), đội ngũ Lập trình viên và AI không thiết kế sai lệch bản chất nghiệp vụ cốt lõi.
2. Vai trò trong toàn hệ thống
   * Bộ lọc kiểm duyệt Thiết kế (Design Filter): Bất kỳ một tính năng (Feature), luồng quy trình (Flow) hay công nghệ (Tech Stack) nào được đề xuất đều phải đi qua bộ lọc 7 ràng buộc này. Nếu vi phạm dù chỉ 1 điều, đề xuất đó sẽ bị loại bỏ.
   * Bảo vệ tài sản Doanh nghiệp: Đảm bảo hệ thống SME OS là của doanh nghiệp, do doanh nghiệp làm chủ, không bị phụ thuộc vào một công nghệ nhất định hay một nhà cung cấp bên thứ ba nào.
   * Định chuẩn cho Tự động hóa và AI: Đặt ra lằn ranh đỏ cho Trí tuệ nhân tạo, đảm bảo AI phục vụ con người chứ không thao túng hệ thống.
3. Giải thích chi tiết (7 Ràng buộc Cốt lõi)
14.1 Business First (Nghiệp vụ là Số 1)
   * Định nghĩa: Mọi tính năng, luồng dữ liệu và thiết kế kỹ thuật đều phải xuất phát từ bài toán kinh doanh thực tế của SME Việt Nam, không xuất phát từ "sự thú vị của công nghệ".
   * Ràng buộc: Nếu một công ngh��� (Framework, Database) yêu cầu doanh nghiệp phải bóp méo quy trình chuẩn đang vận hành tốt chỉ để cho "dễ code", thì công nghệ đó phải bị loại bỏ. Công nghệ phải phục tùng và uốn nắn theo nghiệp vụ.
14.2 No Technology Lock-in (Không khóa chặt Công nghệ)
   * Định nghĩa: Kiến trúc kinh doanh (Business Architecture) và Dữ liệu phải được thiết kế độc lập, không bị trói buộc (Lock-in) vào một nhà cung cấp hạ tầng hay ngôn ngữ lập trình duy nhất.
   * Ràng buộc: Mặc dù Phase 1 của SME OS sử dụng Google Apps Script và Google ecosystem để tối ưu chi phí (Hệ nghèo), kiến trúc nghiệp vụ, các Business Object Model (Chương 9) và Event (Chương 12) vẫn phải được thiết kế chuẩn mực. Khi Scale lên Phase 2 (chuyển sang Next.js, AWS, Postgres), toàn bộ tài liệu File 2 này KHÔNG ĐƯỢC PHÉP thay đổi.
14.3 Modular (Tính Mô-đun hóa)
   * Định nghĩa: Hệ thống được cấu thành từ các phân hệ (Sales, Marketing, HR, Finance) hoạt động độc lập như các cơ quan trong cơ thể, giao tiếp với nhau qua chuẩn chung.
   * Ràng buộc: Sự cố hoặc việc bảo trì nâng cấp ở một Module tuyệt đối không được làm chết (Crash) các Module khác. Nếu Module Marketing bị lỗi, nhân viên Sales và Kỹ thuật xưởng (Operation) vẫn phải xem được Booking và làm việc bình thường.
14.4 Event Driven (Hướng Sự kiện)
   * Định nghĩa: Mọi thay đổi trạng thái trong hệ thống đều phải phát ra Sự kiện Kinh doanh (Business Event), làm cơ sở để các Module khác phản ứng.
   * Ràng buộc: Cấm các Module gọi (Call API) trực tiếp vào nhau theo kiểu mạng nhện (Point-to-Point) gây tắc nghẽn và lệ thuộc. Mọi giao tiếp liên phân hệ bắt buộc phải đi qua tủy sống (Business Kernel) và được điều phối bởi Event Center.
14.5 Measurable (Có thể Đo lường)
   * Định nghĩa: Mọi đối tượng, hành động và quy trình diễn ra trong hệ thống đều phải tạo ra dữ liệu định lượng được. "Nếu không đo lường được, bạn không thể quản trị được".
   * Ràng buộc: Không thiết kế bất kỳ một quy trình "chạy mù" nào. Mọi Business Object (Chương 9) đều phải cung cấp dữ liệu đầu vào chuẩn xác để tính toán tự động ra các chỉ số tại KPI Architecture (Chương 10).
14.6 Observable (Có thể Quan sát)
   * Định nghĩa: Tính minh bạch của hệ thống. Trạng thái của toàn bộ doanh nghiệp phải được hiển thị rõ ràng (Real-time) trên các màn hình Dashboard.
   * Ràng buộc: Bất kỳ thao tác xóa, sửa, xuất kho, giảm giá hay thay đổi thông tin Khách hàng đều phải được hệ thống lưu vết (Audit Log) theo thời gian thực. Không một hành vi mờ ám nào của người dùng hay hệ thống được phép "tàng hình" khỏi tầm quan sát của Quản lý và AI Brain.
14.7 AI Optional (Trí tuệ Nhân tạo là Tùy chọn)
   * Định nghĩa: AI là Trợ lý nâng cao năng suất (Add-on), không phải là Điều kiện tiên quyết (Dependency) để hệ thống có thể tồn tại.
   * Ràng buộc: Ở các gói sản phẩm thấp (Standard/Pro) hoặc trong trường hợp dịch vụ API của AI (Gemini/OpenAI) bị sập mạng, toàn bộ chuỗi giá trị từ Marketing → Sales → Operation → Finance VẪN PHẢI CHẠY TRƠN TRU 100% dựa trên sức người và Business Rules truyền thống. Không được thiết kế hệ thống theo kiểu "Không có AI thì không chốt được đơn".
4. Ví dụ minh họa
Áp dụng Ràng buộc trong quyết định kiến trúc:
Tình huống: Team Lập trình đề xuất: "Anh ơi, tích hợp thẳng luồng duyệt Hóa đơn của Module Finance vào Module Sales cho tiện code và chạy nhanh hơn nhé!"
Áp dụng Constraints:
   1. Kiểm tra theo 14.3 (Modular): Vi phạm! Trộn lẫn Finance vào Sales sẽ phá vỡ tính độc lập. Nếu sau này sửa rule Kế toán sẽ làm hỏng luôn chức năng Bán hàng.
   2. Kiểm tra theo 14.4 (Event Driven): Yêu cầu đội Dev làm lại. Sales chỉ việc chốt đơn và phát ra sự kiện DEAL_WON. Hệ thống Event Center sẽ tự động bắt tín hiệu này và ra lệnh cho Module Finance lập hóa đơn, 2 bên hoàn toàn không dính líu code vào nhau. Quyết định: Bác bỏ đề xuất của Dev.
5. Best Practice
   * Sử dụng Constraint như Checklist nghiệm thu (Acceptance Criteria): Trước khi Product Owner ký duyệt bất kỳ tài liệu thiết kế nào của File 3 (System) hay File 4 (Application), hãy lấy 7 tiêu chí này ra chấm điểm. Đạt 7/7 mới cho phép Code.
   * Giáo dục tư duy (Onboarding): Bất kỳ một nhân sự mới, lập trình viên hay Freelancer nào tham gia dự án SME OS đều phải đọc thuộc Chương 14 này đầu tiên để tránh tranh cãi về mặt kỹ thuật.
6. Checklist
   * Đã liệt kê đủ 7 ràng buộc xương sống của hệ thống chưa? (Done)
   * Các ràng buộc có bám sát triết lý từ File 1 (Philosophy) chưa? (Done)
   * Đã mô tả rõ tính chất AI Optional để bảo vệ luồng nghiệp vụ thủ công chưa? (Done)
7. Các điểm cần quyết định
[ĐÃ CHỐT] Quyền Phủ quyết của Business Constraints: Product Owner chốt nguyên tắc cao nhất: Bất kỳ đề xuất tối ưu kỹ thuật, áp dụng Framework mới hoặc tích hợp AI nào nếu vi phạm 1 trong 7 Constraints này đều bị phủ quyết (Veto) ngay lập tức mà không cần tranh luận thêm. Các ràng buộc này là "Luật Hiến pháp" của Kiến trúc Kinh doanh.


________________


Chương 15. Deliverables (Danh mục Đầu ra Kiến trúc)
1. Mục tiêu chương
   * Quy hoạch tài sản tri thức: Liệt kê và định nghĩa rõ ràng 10 hạng mục tài liệu thiết kế (Deliverables) sẽ được sản xuất trong suốt vòng đời dự án SME OS.
   * Chuyển giao (Hand-over) chuẩn mực: Đóng vai trò là "bản hợp đồng chuyển giao" từ tầng tư duy Nghiệp vụ (Business) sang tầng thiết kế Hệ thống (System), Ứng dụng (Application) và Công nghệ (Technology).
   * Đóng băng phạm vi tài liệu (Freeze Scope): Đảm bảo không có tài liệu rác hay các thiết kế thừa thãi (Over-engineering) được tạo ra ngoài danh sách 10 hạng mục cốt lõi này.
2. Vai trò trong toàn hệ thống
   * Kim chỉ nam cho Đội ngũ Kỹ thuật (Dev/AI Agent): Cho Lập trình viên và AI biết chính xác họ cần tạo ra những bản thiết kế nào trước khi bắt tay vào viết dòng code đầu tiên.
   * Quản trị tính toàn vẹn (Traceability): Đảm bảo mọi kết quả đầu ra (Deliverable) ở tầng kỹ thuật đều có thể truy vết ngược lại để chứng minh nó phục vụ cho một bài toán Business tương ứng đã định nghĩa trong File 1 và File 2.
3. Giải thích chi tiết (10 Kiến trúc Đầu ra Cốt lõi)
Danh mục kết quả đầu ra của dự án SME OS được chuẩn hóa thành 10 tài liệu/bản đồ thiết kế (Deliverables) như sau:
15.1 Business Map (Bản đồ Kinh doanh)
   * Nội dung: Mô hình hóa các năng lực cốt lõi (Capabilities) của doanh nghiệp SME.
   * Kế thừa từ: Phân hệ 3.1 đến 3.8 trong File 2.
   * Mục đích: Là la bàn định hướng nghiệp vụ, giúp CEO nhìn thấy toàn cảnh doanh nghiệp trên một trang giấy.
15.2 Process Map (Lưu đồ Quy trình)
   * Nội dung: Các bản vẽ lưu đồ chi tiết (Flowcharts/BPMN) từng bước thực thi cho 8 quy trình lõi (Marketing, Sales, CRM, Operation, HR, Inventory, Finance, Website).
   * Kế thừa từ: Chương 8 (Business Process Landscape).
   * Mục đích: Hướng dẫn nhân sự làm việc (SOP) và làm đầu vào để thiết kế luồng tự động hóa (Automation Flow).
15.3 Event Map (Bản đồ Sự kiện)
   * Nội dung: Đặc tả kỹ thuật chi tiết của mọi Business Event (Ví dụ: Tên Event, Trigger, Payload, Nơi phát, Nơi nhận).
   * Kế thừa từ: Chương 12 (Business Event Overview).
   * Mục đích: Là xương sống của kiến trúc Event-Driven, kết nối các Module hoạt động độc lập mà không bị dính chặt vào nhau (Decoupling).
15.4 AI Decision Map (Ma trận Quyết định AI)
   * Nội dung: Lập bản đồ các kịch bản AI (Use Cases) tương ứng với 5 tầng xử lý: Observe → Detect → Diagnose → Recommend → Execute.
   * Kế thừa từ: Chương 13 (Business AI Overview).
   * Mục đích: Hướng dẫn đội ngũ Kỹ thuật cách cấu hình Prompt, Context và cấp quyền (Permissions) cho hệ thống AI Agent.
15.5 Data Architecture (Kiến trúc Dữ liệu)
   * Nội dung: Lược đồ Cơ sở dữ liệu vật lý (Database Schema, Tables, Data Types, Relationships).
   * Kế thừa từ: Chương 9 (Business Object Model).
   * Mục đích: Thiết lập cấu trúc lưu trữ Single Source of Truth tại Master Database, hỗ trợ tính toán KPI (Chương 10).
15.6 Module Map (Bản đồ Phân hệ)
   * Nội dung: Thiết kế cấu trúc và ranh giới giao tiếp của các khối chức năng (Sales Module, Finance Module, Inventory Module, v.v.).
   * Kế thừa từ: Chương 5 (Hệ thần kinh Doanh nghiệp) và Chương 14 (Business Constraints).
   * Mục đích: Bảo vệ tính Modular của hệ thống, lỗi ở Module này không làm chết Module khác.
15.7 Website Architecture (Kiến trúc Cổng thông tin)
   * Nội dung: Sơ đồ luồng truy cập (Sitemap), luồng chuyển đổi (Funnel) và kiến trúc thành phần Component trên Website.
   * Mục đích: Thiết kế điểm chạm (Touchpoint) số hóa đầu tiên để thu Lead và đặt lịch (Booking) tự động đổ về CRM/ERP.
15.8 UI Architecture (Kiến trúc Giao diện Người dùng)
   * Nội dung: Design System, Component Library và các quy tắc thiết kế giao diện (Màu sắc, Typography, Spacing).
   * Mục đích: Đảm bảo trải nghiệm người dùng (UX) đồng nhất trên toàn bộ hệ thống (Website, CRM, ERP Dashboard) theo triết lý "Simplicity First".
15.9 API Architecture (Kiến trúc Giao thức Kết nối)
   * Nội dung: Đặc tả các cổng giao tiếp API (Endpoints, Request/Response Format, Authentication).
   * Mục đích: Quy chuẩn hóa cách Frontend giao tiếp với Backend và cách hệ thống SME OS tích hợp với bên thứ 3 (Zalo, Bank, Google).
15.10 Technical Architecture (Kiến trúc Công nghệ)
   * Nội dung: Đặc tả hạ tầng Server, Ngôn ngữ lập trình, Framework (Phase 1: Google Apps Script → Phase 2: Next.js).
   * Kế thừa từ: Chương 14 (Ràng buộc No Technology Lock-in).
   * Mục đích: Là bản vẽ thi công cuối cùng cho Lập trình viên, đảm bảo đáp ứng bài toán chi phí ("Hệ nghèo") và khả năng mở rộng.
4. Ví dụ minh họa
Luồng chuyển hóa từ Business sang Technical Deliverables:
Để hiện thực hóa nghiệp vụ "Khách hàng đặt lịch trực tuyến":
   1. Process Map vẽ luồng khách vào web → chọn dịch vụ → bấm đặt lịch.
   2. UI Architecture cung cấp thiết kế nút "Booking" và Form đặt lịch đơn giản.
   3. Khi khách bấm nút, API Architecture mô tả cục data đẩy xuống Backend.
   4. Event Map ghi nhận sự kiện BOOKING_CREATED.
   5. Data Architecture lưu dữ liệu xuống bảng Bookings trong Database.
   6. Technical Architecture quy định xử lý tác vụ này bằng Google Apps Script để tiết kiệm chi phí.
5. Best Practice
   * Living Documents (Tài liệu sống): Các Deliverables (đặc biệt là Event Map và Data Architecture) phải được cập nhật liên tục song song với quá trình Code. Code thay đổi → Tài liệu thay đổi, tuyệt đối không để tài liệu "bị mốc".
   * Gom cụm và Kế thừa (Reuse & Centralize): 10 Deliverables này sẽ được phân bổ chặt chẽ vào File 3 (System Architecture), File 4 (Application Architecture) và File 5 (Technology Architecture) để dễ dàng quản lý.
6. Checklist
   * Đ�� liệt kê đầy đủ 10 hạng mục Deliverables xương sống của dự án chưa? (Done)
   * Mỗi Deliverable đã giải thích rõ mục đích và sự kế thừa từ các chương Business trước đó chưa? (Done)
   * Đã giới hạn rõ đây là các đầu ra sẽ được triển khai ở File 3, 4, 5 chưa? (Done)
7. Các điểm cần quyết định
[ĐÃ CHỐT] Đóng băng cấu trúc tài liệu (Document Freeze): Product Owner đã chốt Danh mục 10 Deliverables này là ranh giới tối đa của thiết kế hệ thống SME OS. AI Copilot và Lập trình viên không được tự ý đẻ thêm các tài liệu kỹ thuật rườm rà mang tính chất Enterprise (Ví dụ: UML phức tạp, Microservices Specification, State Machine Diagram chi tiết) làm chậm tiến độ Launching MVP.