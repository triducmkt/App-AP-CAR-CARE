# (OFFICIAL) FILE 5: KIẾN TRÚC CÔNG NGHỆ (TECHNOLOGY ARCHITECTURE)
<!-- START_CONSTITUTION_TOC -->
## ⚡ MỤC LỤC TRA CỨU NHANH HIẾN PHÁP (FAST-LOOKUP CONSTITUTION TOC)
> **Quy tắc Bắt buộc (Mandatory Constitutional Scan & Verification Loop):**
> 1. **Trước mỗi Prompt/Yêu cầu:** AI Agent BẮT BUỘC quét nhanh bảng mục lục này (cùng mục lục của 4 file Hiến pháp còn lại) để định vị chính xác các chương liên quan trước khi đề xuất, thiết kế hoặc viết code.
> 2. **Vòng lặp Kiểm tra Chi tiết 1 Chương (`Deep-Chapter Verification Loop`):** Trong quá trình thực thi, bất cứ khi nào có dấu hiệu vi phạm Hiến pháp, có nghi vấn kiến trúc hoặc cần cẩn trọng kiểm tra lại, Agent BẮT BUỘC gọi `read_file` đọc trực tiếp đúng tọa độ dòng (`StartLine` – `EndLine`) của chương đó trong bảng dưới đây để đối chiếu 100% trước khi làm tiếp.

| Chương / Mục | Tọa độ Dòng (`Line Range`) | Tên Chương & Chủ đề Cốt lõi | Tóm tắt Quy tắc & Nội dung Trọng tâm |
| :--- | :---: | :--- | :--- |
| **Chương 0** | `L32–L130` | **AI Collaboration Protocol & 10 Điều Hiến Pháp SME OS ⭐⭐⭐⭐⭐** | Working Product > Perfect Architecture (80/20), Cấm Enterprise hóa, Cấm Over-engineering, 10 Điều Hiến pháp |
| **Chương 1** | `L131–L180` | **Mục tiêu và phạm vi Technology Architecture** | Technology chỉ là implementation; Chi phí hạ tầng Phase 1 = 0đ; Bộ ngưỡng kỹ thuật định lượng |
| **Chương 2** | `L181–L241` | **Technology Strategy (Lộ trình Phase 1 GAS -> Phase 2 Next.js/Supabase)** | Chiến lược tiến hóa công nghệ không làm thay đổi Business Architecture |
| **Chương 3** | `L242–L319` | **Frontend Stack (SPA HTML5/CSS3/Vanilla JS & OptiSync V5)** | Kiến trúc giao diện phản hồi tức thì 0.001s, nén ảnh Canvas < 300KB, chống lỗi Caja/Backtick |
| **Chương 4** | `L320–L407` | **Backend Stack (Google Apps Script V8, Single-Read Snapshot & Quota Guard)** | Đọc 1 lần vào RAM, LockService, ngắt an toàn 270s, tối ưu 90% Quota |
| **Chương 5** | `L408–L507` | **Database & Storage Stack (Google Sheets PM_CONFIG & Rolling 3,000-Row Log)** | Header dòng 10, Data dòng 12, xoay vòng log 3.000 dòng, lưu file Drive qua URL/ID |
| **Chương 6** | `L508–L582` | **CI/CD & Environment (Git, Backup, Clasp & Quy trình Phối hợp AI Agent)** | Quy trình backup bắt buộc, kiểm thử AST, phân tách môi trường và nhân bản B2B |
<!-- END_CONSTITUTION_TOC -->


FILE 5. Kiến trúc Công nghệ (Technology Architecture)
File này là bản vẽ thi công tầng Hạ tầng (Infrastructure Layer), đặc tả môi trường thực thi, ngôn ngữ lập trình, chiến lược chuyển đổi và giao thức cho AI/Dev. Mô tả chi tiết và cụ thể vào phần thực thi cho từng chương ở file này so với các thông tin đã từng đề cập ở các file 1-2-3.
* Chương 0. AI Collaboration Protocol: Bộ quy tắc tương tác, Freeze Scope và các giới hạn bắt buộc (Prompt Rule) khi AI làm việc cùng hệ thống.
* Chương 1. Mục tiêu và phạm vi Technology Architecture: Vai trò của kiến trúc công nghệ, định hướng "Technology chỉ là implementation".
* Chương 2. Technology Strategy (Chiến lược Công nghệ): Lộ trình triển khai cụ thể tiến hóa từ Phase 1 (Google Apps Script/Sheets) sang Phase 2 (Next.js/Postgres). đề xuất cụ thể phương án cho phase 2, ưu tiên các công cụ chi phí thấp hoặc miễn phí nếu có phù hợp qui mô đối tượng công ty SME. 
* Chương 3. Frontend Stack (Công nghệ Giao diện): Đặc tả framework, môi trường Web Portals và Mobile-First Web Apps tĩnh cho Phase 1.
* Chương 4. Backend Stack (Công nghệ Máy chủ): Đặc tả môi trường Runtime Google Apps Script (Serverless), xử lý Timeout và Quota giới hạn.
* Chương 5. Database & Storage Stack (Công nghệ Lưu trữ): Đặc tả kỹ thuật tối ưu hóa hàng/cột trên Google Sheets và Google Drive API.
* Chương 6. CI/CD & Environment (Triển khai & Môi trường): Chiến lược SDLC thu gọn cho Phase 1 (Git, Clasp, GitHub Actions cơ bản) và phân tách môi trường Dev/Staging/Prod.

---

# Chương 0: AI Collaboration Protocol ⭐⭐⭐⭐⭐

## SME OS AI Collaboration Protocol v0.1

### 1. Project Goal
Mục tiêu hiện tại:
Build phiên bản SME OS đầu tiên.
Ưu tiên:
**Working Product > Perfect Architecture.**

---

### 2. Freeze Scope
- **Architecture Version:** `v0.1`
- **Freeze:** Không mở rộng thêm tài liệu. Chỉ tồn tại 5 tài liệu chính.

---

### 3. Architecture Rule
Không đề xuất thêm:
- tài liệu mới
- framework mới
- pattern mới

trừ khi Product Owner yêu cầu.

---

### 4. Working Principle
Ưu tiên:
- **80% thực thi**
- **20% tối ưu.**
- Không tối ưu sớm.

---

### 5. AI Behaviour
AI phải:
- Ưu tiên build được.
- Không over-engineering.
- Không enterprise hóa.
- Không microservice hóa.
- Không đề xuất SaaS-level nếu SME chưa cần.
- Không đề xuất công nghệ mới nếu Apps Script vẫn đáp ứng.
- Không tạo thêm tài liệu.
- Mọi nội dung phải gom vào 5 tài liệu.

---

### 6. Product Boundary
Đối tượng:
- **SME Việt Nam (5~100 nhân sự)**
- Không phải Enterprise.
- Không phải SAP.
- Không phải Salesforce.
- Không phải Odoo.
Đây cực kỳ quan trọng.

---

### 7. Technology Strategy
```text
Phase 1: Google Apps Script
         ↓
Phase 2: Next.js
         ↓
Business Architecture: Không thay đổi.
```

---

### 8. Prompt Rule
Mỗi lần AI trả lời phải:
1. Đọc **Product Philosophy** (File 1)
2. Đọc **Business Architecture** (File 2)
3. Đọc **System Architecture** (File 3)
4. Đọc **Application Architecture** (File 4)
5. Đọc **Technology Architecture** (File 5)
sau đó mới đề xuất.

---

## ===========================
## SME OS PROJECT CONSTITUTION
## ===========================

- **Điều 1:** Chỉ tồn tại 5 tài liệu chính.
- **Điều 2:** Business Architecture là tài sản. Technology chỉ là implementation.
- **Điều 3:** Không đề xuất chia nhỏ tài liệu.
- **Điều 4:** Ưu tiên build app trước. Không tối ưu sớm.
- **Điều 5:** Không enterprise hóa sản phẩm.
- **Điều 6:** Không tạo kiến trúc vượt quá nhu cầu SME.
- **Điều 7:** Nếu có nhiều cách làm, luôn ưu tiên đơn giản hơn.
- **Điều 8:** Mọi module đều phải tái sử dụng.
- **Điều 9:** AI chỉ được đề xuất thay đổi lớn khi Product Owner yêu cầu.
- **Điều 10:** Không được tự mở rộng phạm vi dự án.

---

# Chương 1: Mục tiêu và phạm vi Technology Architecture

### 1. Mục tiêu chương
- Khẳng định ranh giới chiến lược của tầng Hạ tầng kỹ thuật (**Infrastructure & Runtime Layer**): biến toàn bộ thiết kế logic ở File 4 (Schema, `FIELD_MAP`, Module Contract, OptiSync V5, RPC Gateway) thành một hệ thống chạy thực tế với chi phí hạ tầng bằng **0 đồng (Zero-Infrastructure Cost)** ở Phase 1.
- Thiết lập nguyên lý bất biến xuyên suốt vòng đời sản phẩm: **"Business Architecture là tài sản cốt lõi lâu dài — Technology chỉ là lớp thực thi tạm thời (Implementation Detail)"**.
- Đặt ra bộ ngưỡng kỹ thuật định lượng (Response Time, Quota Limit, Row Limit, Recovery Time) để đội ngũ phát triển và AI Agent bám sát trong từng dòng code.

### 2. Vai trò trong toàn hệ thống
- Nếu **File 1–3** định nghĩa *"Hệ thống làm gì cho doanh nghiệp SME"* và **File 4** định nghĩa *"Ứng dụng được lắp ghép bằng các bảng và hàm nào"*, thì **File 5** định nghĩa *"Code chạy trên máy chủ nào, lưu vào đâu, vượt qua giới hạn vật lý của nền tảng ra sao và bàn giao/triển khai bằng công cụ gì"*.
- Là bộ phanh an toàn kỹ thuật (Technical Guardrails) ngăn chặn bệnh **Over-engineering**: cấm dùng Kubernetes, Docker, Microservices, Redis Cluster hay AWS phức tạp khi doanh nghiệp SME (như AP CAR CARE) chỉ có 5–100 nhân sự và vài chục đến vài trăm giao dịch mỗi ngày.

### 3. Giải thích chi tiết

#### 3.1. Triết lý "Technology chỉ là Implementation"
Trong kiến trúc SME OS, toàn bộ trí tuệ nghiệp vụ nằm ở:
1. **10 Core Business Objects & 14 Modules** (File 2 & File 4).
2. **Ma trận đa chiều `GLOBAL_SCHEMA_MATRIX` ($n \times m \times k \times t$)** định nghĩa cấu trúc cột, phân quyền theo vai trò và luật tự động hóa trạng thái.
3. **4 cổng giao tiếp chuẩn (`api_query`, `api_mutate`, `api_batch_sync`, `doPost`)**.

Nhờ lớp trừu tượng hóa này, tầng công nghệ bên dưới hoàn toàn có thể hoán đổi như thay động cơ trên cùng một khung gầm xe:
- Ở **Phase 1**, hàm `Repository.insert("Order", payload)` gọi `SpreadsheetApp.openById().getSheetByName("Order").appendRow()`.
- Ở **Phase 2**, vẫn chính hàm `Repository.insert("Order", payload)` đó được đổi ruột sang `prisma.order.create({ data: payload })` trên PostgreSQL mà **không phải sửa bất kỳ dòng code nghiệp vụ nào** trong `OrderService` hay giao diện Frontend.

#### 3.2. Bộ chỉ số SLA & Ràng buộc Hạ tầng (Infrastructure SLAs)
Mọi giải pháp kỹ thuật trong File 5 phải phục vụ 5 mục tiêu đo lường cứng sau:
1. **Total Cost of Ownership (TCO) ở Phase 1:** **$0 / tháng** (tận dụng 100% hệ sinh thái Google Workspace / tài khoản Google miễn phí sẵn có của SME).
2. **UI Perceived Latency (Độ trễ cảm nhận của người dùng):** **$< 50\text{ms}$** cho mọi thao tác cập nhật trạng thái/nhập liệu nhờ cơ chế **OptiSync V5 Optimistic UI**.
3. **Server API Response Time:** **$< 3\text{ giây}$** cho tác vụ đọc/ghi đơn lẻ và **$< 5\text{ giây}$** cho tác vụ `api_batch_sync` hoặc khởi tạo Snapshot đầu phiên.
4. **Google Quota Safety Margin:** Lượng gọi `SpreadsheetApp` và `UrlFetchApp` mỗi ngày không vượt quá **50% hạn mức miễn phí của Google** nhờ cơ chế Gom lô 8 giây (Debounce Batching) và Đọc 1 lần vào RAM (Single-Read Snapshot).
5. **Zero Data Loss (Không mất dữ liệu):** Mọi thao tác ghi đồng thời phải có khóa `LockService`, mọi thay đổi trạng thái/tiền bạc phải ghi vào `Audit_Logs`, và có cơ chế xoay vòng dữ liệu (Log Rotation) trước khi chạm trần Google Sheets.

### 4. Ví dụ minh họa
- **Tình huống thực tế tại AP CAR CARE:** Chủ xưởng (anh Đức) muốn thêm trường `"Gói bảo hành phủ Ceramic (Tháng)"` vào bảng `Order`.
  - **Cách làm sai (Phụ thuộc công nghệ):** Sửa trực tiếp câu lệnh đọc cột `row[18]` ở 10 file `.gs` và sửa 5 bảng HTML ở Frontend. Khi chuyển sang PostgreSQL ở Phase 2 phải đập đi viết lại từ đầu.
  - **Cách làm chuẩn SME OS (Tách biệt Business & Technology):** Chỉ khai báo thêm 1 dòng vào `GLOBAL_SCHEMA_MATRIX.Order.fields["warranty_months"]`. Lớp công nghệ Phase 1 (Google Sheets Driver) tự động ánh xạ vào cột `S`, và sau này lớp công nghệ Phase 2 (PostgreSQL Driver) tự động ánh xạ vào column `warranty_months INT`.

### 5. Best Practice
- **Khai thác tối đa vũ khí có sẵn của nền tảng (Platform-Native First):** Khi còn ở Phase 1, ưu tiên dùng `LockService`, `CacheService`, `PropertiesService`, `HtmlService` và Time-driven Triggers nội tại của Google Apps Script thay vì nối thêm dịch vụ bên thứ ba.
- **Cô lập mã nguồn phụ thuộc nền tảng (Isolate Platform-Specific Code):** Toàn bộ lệnh gọi trực tiếp `SpreadsheetApp`, `DriveApp`, `GmailApp` phải được bọc kín bên trong tầng `DataAccess.gs` (Storage Driver) và `IntegrationHub.gs`, tuyệt đối không viết rải rác trong tầng giao diện hay tầng nghiệp vụ.

### 6. Checklist
- [x] Mọi giải pháp công nghệ đề xuất trong hồ sơ có tuân thủ nguyên tắc TCO tối thiểu cho SME 5–100 nhân sự không?
- [x] Đã tách biệt hoàn toàn tầng Business Logic khỏi tầng Google Apps Script / Sheets API chưa?
- [x] Các chỉ số SLA (Response Time $< 5\text{s}$, Optimistic UI $< 50\text{ms}$, Quota $< 50\%$) đã được định nghĩa rõ ràng chưa?

### 7. Các điểm cần quyết định
- **Quyết định 1.1 (Đã chốt):** Trong suốt Phase 1, nghiêm cấm tích hợp bất kỳ dịch vụ Cloud trả phí nào (AWS, GCP Cloud SQL, Firebase Blaze Plan) trừ khi có phê duyệt trực tiếp từ Product Owner (anh Đức).

---

# Chương 2: Technology Strategy (Chiến lược Công nghệ & Lộ trình Tiến hóa Phase 1 $\rightarrow$ Phase 2)

### 1. Mục tiêu chương
- Vạch rõ lộ trình tiến hóa công nghệ 2 giai đoạn (**2-Phase Evolutionary Roadmap**): khởi đầu thần tốc với **Phase 1 (Google Apps Script + Google Sheets + Google Drive)** để验证 (validate) toàn bộ luồng nghiệp vụ thực tế tại doanh nghiệp, sau đó nâng cấp mượt mà lên **Phase 2 (Next.js + Serverless PostgreSQL + Object Storage)** khi quy mô dữ liệu vượt ngưỡng.
- Đề xuất bộ **Tech Stack Phase 2 tối ưu chi phí (Free-Tier / Low-Cost SME Stack)** phù hợp hoàn hảo với túi tiền của doanh nghiệp SME Việt Nam (từ $0 đến dưới $25/tháng) nhưng đạt hiệu năng chuẩn SaaS hiện đại.
- Thiết lập bộ **Chỉ số Kích hoạt Chuyển đổi (Migration Trigger Metrics)** để biết chính xác *khi nào* cần chuyển từ Phase 1 sang Phase 2 mà không tối ưu sớm (Premature Optimization).

### 2. Vai trò trong toàn hệ thống
- Giải quyết bài toán kinh điển của mọi dự án phần mềm SME: *"Làm sao để có sản phẩm chạy ngay trong 1–2 tuần với chi phí 0 đồng, nhưng 1–2 năm sau khi công ty mở rộng lên 5–10 chi nhánh thì không phải đập đi xây lại?"*.
- Đóng vai trò là bản hợp đồng chuyển giao giữa kiến trúc hiện tại và kiến trúc tương lai, đảm bảo **100% Business Architecture (File 2), System Architecture (File 3) và Schema/Module Contract (File 4) được giữ nguyên** khi nâng cấp hạ tầng.

### 3. Giải thích chi tiết

#### 3.1. Bảng đối chiếu Tiến hóa Công nghệ (Phase 1 vs. Phase 2 SME Low-Cost Stack)

| Tầng Kiến Trúc (Layer) | Phase 1: Zero-Cost Rapid MVP (Hiện tại) | Phase 2: Low-Cost / Free-Tier SME Stack (Đề xuất nâng cấp) | Lý do chọn cho SME Việt Nam (5–100 nhân sự) |
| :--- | :--- | :--- | :--- |
| **1. Frontend & Hosting** | **Google Apps Script `HtmlService`** (SPA tĩnh nhúng Vanilla JS + CSS chuẩn Google Material Dark/Light) | **Next.js (App Router + TypeScript + TailwindCSS)** triển khai trên **Cloudflare Pages** hoặc **Vercel (Hobby/Pro)** | Cloudflare Pages miễn phí băng thông không giới hạn, tốc độ Edge CDN tại Việt Nam cực nhanh ($< 30\text{ms}$). |
| **2. Backend Runtime** | **Google Apps Script V8 Runtime** (`Code.gs`, `doGet`, `doPost`, `google.script.run`) | **Next.js Server Actions / API Routes (Node.js/Edge)** kết hợp **Prisma ORM / Drizzle ORM** | Gộp chung Frontend & Backend trong 1 repo duy nhất (Monorepo), không tốn tiền thuê VPS riêng, giữ nguyên cấu trúc 4 cổng RPC. |
| **3. Cơ sở dữ liệu (Database)** | **Google Sheets** (Ma trận bảng 2D quản lý qua `GLOBAL_SCHEMA_MATRIX` $n \times m \times k \times t$) | **Supabase (PostgreSQL)** hoặc **Neon.tech (Serverless Postgres)** | Có gói **Free Tier hào phóng** (500MB – 5GB lưu trữ, đủ chứa 1–3 triệu bản ghi đơn hàng/khách hàng SME). Khi vượt ngưỡng chỉ tốn ~$15–$25/tháng. |
| **4. Lưu trữ File & Ảnh (Object Storage)** | **Google Drive API** (Phân cây thư mục theo Năm/Tháng/Mã Đơn + gắn link preview) | **Cloudflare R2 Storage** (Chuẩn S3 API) hoặc **Supabase Storage** | **Cloudflare R2 miễn phí 10GB đầu + miễn phí 100% phí băng thông tải ra (Zero Egress Fee)** — cực kỳ tiết kiệm cho ngành Chăm sóc xe/Detailing cần lưu hàng chục ngàn ảnh Trước/Sau (Before/After) độ phân giải cao. |
| **5. Xác thực & Phân quyền (Auth & RBAC)** | **Google Session Auth + Custom PIN/Passcode** đối chiếu bảng `Staff` & `ROLE_MATRIX` | **Supabase Auth / NextAuth (Auth.js)** kết hợp **PostgreSQL Row-Level Security (RLS)** | Miễn phí tới 50.000 Monthly Active Users (MAU), hỗ trợ đăng nhập Google, OTP Zalo/SMS, kế thừa nguyên vẹn `ROLE_MATRIX` 3D. |
| **6. Bộ nhớ đệm & Đồng bộ (Cache & Realtime)** | **GAS `CacheService`** (Server) + **OptiSync V5 `localStorage` & Smart Polling 8s** (Client) | **Upstash Redis (Serverless)** + **Supabase Realtime (WebSockets)** | Upstash miễn phí 10.000 lệnh/ngày; Supabase Realtime đẩy thông báo tức thì xuống màn hình Kỹ thuật viên/Lễ tân không cần Polling. |
| **7. Cron Job & Background Workers** | **GAS Time-driven Triggers** (Quét định kỳ 5–15 phút/lần với Snapshot RAM) | **Cloudflare Cron Triggers / Inngest / Trigger.dev (Free Tier)** hoặc **Supabase `pg_cron`** | Thực thi tác vụ nhắc lịch bảo dưỡng, sinh phiếu CSKH T+3, khóa lương định kỳ hoàn toàn tự động và không sợ giới hạn 6 phút của GAS. |
| **8. AI Engine (Trợ lý thông minh)** | **Gemini API (`gemini-2.5-flash` / `gemini-2.5-pro`)** gọi qua `UrlFetchApp` | **Google `@google/genai` SDK** tích hợp trực tiếp trên Next.js Server | `gemini-2.5-flash` có chi phí cực rẻ (hoặc Free Tier qua Google AI Studio), tốc độ phản hồi nhanh để tóm tắt lịch sử xe, gợi ý kịch bản CSKH và phân tích báo cáo doanh thu. |

#### 3.2. Bộ Chỉ số Kích hoạt Chuyển đổi (Migration Trigger Metrics — Khi nào lên Phase 2?)
Hệ thống **CHỈ** kích hoạt kế hoạch nâng cấp từ Phase 1 sang Phase 2 khi chạm **ít nhất 2 trong 5 ngưỡng định lượng** sau đây trong thực tế vận hành:
1. **Ngưỡng Dữ liệu (Volume Limit):** Tổng số dòng trên các bảng giao dịch chính (`Order`, `Task`, `Financial_Transaction`) vượt quá **25.000 dòng/bảng** hoặc tổng số ô (cells) trong file Google Sheets vượt quá **2.000.000 ô** (40% giới hạn cứng 10 triệu ô của Google), làm thời gian đọc Snapshot vượt quá **4 giây**.
2. **Ngưỡng Đồng thời (Concurrency Limit):** Số lượng nhân sự/khách hàng thao tác ghi dữ liệu đồng thời tại cùng một giây (Peak Concurrent Writers) thường xuyên vượt quá **15–20 người**, dẫn đến hàng đợi `LockService` phải chờ quá **5 giây**.
3. **Ngưỡng Quota (Execution Quota Limit):** Tổng thời gian chạy các Trigger tự động + API trong ngày vượt quá **60 phút/ngày** (tiệm cận trần 90 phút/ngày của tài khoản Google thường).
4. **Ngưỡng Đa chi nhánh (Multi-Branch Scale):** Doanh nghiệp mở rộng từ **3 chi nhánh độc lập trở lên**, đòi hỏi phân tách dữ liệu theo chi nhánh nhưng báo cáo hợp nhất theo thời gian thực với độ trễ $< 500\text{ms}$.
5. **Ngưỡng Trải nghiệm Khách hàng (Customer Portal Traffic):** Lượng khách hàng bên ngoài truy cập trang Tra cứu Bảo hành Điện tử / Đặt lịch vượt quá **1.000 lượt truy cập/ngày**, cần tên miền riêng chuẩn SEO và tốc độ tải trang tức thì mà không qua khung `iframe` của Google Apps Script.

#### 3.3. Quy trình Chuyển đổi "Zero-Rewrite" 4 bước (Migration Playbook)
Nhờ thiết kế `GLOBAL_SCHEMA_MATRIX` và kiến trúc 3 tầng ở File 4, việc chuyển sang Phase 2 diễn ra theo 4 bước chuẩn:
- **Bước 1 (Auto-DDL Generation):** Chạy 1 script đọc trực tiếp `GLOBAL_SCHEMA_MATRIX` để tự động sinh file `schema.prisma` (hoặc câu lệnh SQL `CREATE TABLE`) cho 10 bảng Core Objects và 4 bảng System Tables trên Supabase PostgreSQL.
- **Bước 2 (ETL Data Sync):** Xuất toàn bộ dữ liệu từ Google Sheets (bắt đầu từ dòng `MIN_DATA_ROW = 12`) ra định dạng JSON chuẩn thông qua chính hàm `DataMapper.rowToObject()` hiện có, sau đó nạp (Bulk Insert) vào PostgreSQL.
- **Bước 3 (Swap Storage Adapter):** Thay thế file `DataAccess.gs` (đọc/ghi Google Sheets) bằng `PrismaRepository.ts` (đọc/ghi PostgreSQL), giữ nguyên 100% tên hàm, cấu trúc JSON đầu vào/đầu ra của 4 cổng RPC (`api_query`, `api_mutate`, `api_batch_sync`, `api_webhook_ingest`).
- **Bước 4 (Dual-Write Cutover):** Trong 7 ngày đầu chuyển giao, khi PostgreSQL ghi thành công, một Webhook nền vẫn đẩy bản sao về Google Sheets cũ để Kế toán/Quản lý đối chiếu an toàn trước khi cắt hẳn.

### 4. Ví dụ minh họa
- **Lộ trình thực tế cho AP CAR CARE:**
  - **Tháng 1 – Tháng 6 (Phase 1):** Chạy 100% trên Google Apps Script + Google Sheets + Google Drive. Phục vụ 2 chi nhánh (Q7, Tân Phú), ~20–30 nhân sự (Lễ tân, Cố vấn dịch vụ, Kỹ thuật viên, Marketing, Kế toán). Chi phí máy chủ = **0 VNĐ**.
  - **Tháng 6 – Tháng 12 (Hybrid Phase 1.5 - Tùy chọn):** Giữ nguyên Backend & Nội bộ trên Google Apps Script/Sheets, chỉ tách riêng cổng **Tra cứu Bảo hành & Đặt lịch của Khách hàng (Customer Portal)** ra một web mỏng trên **Next.js + Cloudflare Pages (Miễn phí)** gọi API về GAS hoặc đọc bản cache trên Supabase Free Tier để khách hàng quét mã QR trên xe mở ra tức thì trong $0.2\text{ giây}$.
  - **Từ Năm 2 trở đi (Phase 2 Full):** Khi tổng số lượt xe làm dịch vụ vượt 30.000 xe, chuyển Database sang **Supabase PostgreSQL + Cloudflare R2** với tổng chi phí duy trì toàn hệ thống chỉ khoảng **$0 – $20/tháng**.

### 5. Best Practice
- **Không bao giờ dùng công nghệ Phase 2 để giải quyết bài toán của Phase 1:** Khi hệ thống chưa có đủ dữ liệu thực tế và nhân viên chưa quen quy trình, việc dựng ngay Next.js + Postgres sẽ làm chậm tốc độ sửa đổi biểu mẫu/quy trình gấp 5 lần so với Google Sheets.
- **Giữ JSON Payload bất biến giữa 2 Phase:** Mọi dữ liệu trao đổi giữa Frontend và Backend ở Phase 1 phải là chuỗi JSON phẳng (Flat JSON Object) tuân thủ `frontendKey` của `FIELD_MAP`, tuyệt đối không truyền đối tượng đặc thù của Google Sheets xuống UI.

### 6. Checklist
- [x] Đã xác định rõ Tech Stack Phase 1 (GAS/Sheets/Drive) và Tech Stack Phase 2 giá rẻ/miễn phí cho SME (Next.js/Cloudflare Pages/Supabase/Cloudflare R2) chưa?
- [x] Đã có bộ 5 chỉ số định lượng (Migration Trigger Metrics) để quyết định thời điểm nâng cấp chưa?
- [x] Đã có kịch bản di trú dữ liệu 4 bước không phải viết lại Business Logic chưa?

### 7. Các điểm cần quyết định
- **Quyết định 2.1 (Đã chốt):** Chọn bộ tứ **Next.js + Cloudflare Pages + Supabase (PostgreSQL) + Cloudflare R2** làm kiến trúc đích chính thức cho Phase 2 vì có gói Free Tier tốt nhất thị trường, không tính phí băng thông tải ảnh (Zero Egress) và tương thích hoàn hảo với hệ sinh thái AI Agent.

---

# Chương 3: Frontend Stack (Công nghệ Giao diện & Kiến trúc Client-Side Phase 1)

### 1. Mục tiêu chương
- Đặc tả chi tiết công nghệ xây dựng giao diện người dùng ở Phase 1 trên nền tảng **Google Apps Script `HtmlService`**: làm sao để một ứng dụng chạy trong môi trường GAS vẫn đạt được tốc độ mượt mà như ứng dụng Native, thiết kế sang trọng theo chuẩn **Design Aesthetic Memo** và không bao giờ bị đơ/mất dữ liệu khi mạng chập chờn.
- Chuẩn hóa kiến trúc gom nhóm mô-đun giao diện (HTML Template Inclusion), quy tắc phân tách nền tảng **PC/Laptop Default vs. Mobile View**, và cơ chế truyền tải dữ liệu **SSR (Server-Side Rendering) kết hợp CSR (Client-Side Rendering)**.

### 2. Vai trò trong toàn hệ thống
- Là mặt tiền tiếp xúc trực tiếp với 3 nhóm người dùng cốt lõi của AP CAR CARE / SME OS:
  1. **Ban Giám đốc, Lễ tân, Cố vấn dịch vụ, Marketing, Kế toán:** Làm việc chủ yếu trên màn hình **PC/Laptop** với bảng biểu đa cột, Kanban, Dashboard.
  2. **Kỹ thuật viên tại khoang xe (Bay Technicians):** Thao tác nhanh trên giao diện **Checklist & Chụp ảnh nghiệm thu**.
  3. **Khách hàng & Đại lý (Customer / Partner Portal):** Tra cứu lịch sử chăm sóc xe, sổ bảo hành điện tử, tích điểm hạng thành viên.

### 3. Giải thích chi tiết

#### 3.1. Công nghệ Lõi & Cấu trúc File Giao diện (`HtmlService` Modular SPA)
Do Google Apps Script không hỗ trợ thư mục con trực tiếp trên trình biên tập đám mây và chỉ cho phép các file `.gs` và `.html` đồng cấp, tầng Frontend Phase 1 áp dụng kiến trúc **Single-Page Application (SPA) lắp ghép qua hàm `include(filename)`**:
- **`Index.html` (Main App Shell):** Chứa khung xương HTML5, nạp bộ Font chuẩn (`Roboto`, `Roboto Condensed`, `JetBrains Mono`), thư viện Icon nhẹ (Lucide Icons / FontAwesome CDN), thanh điều hướng (Sidebar/Topbar) và các vùng chứa (`<main id="app-viewport">`).
- **`Stylesheet.html` (Design System & Theme Variables):** Chứa toàn bộ hệ biến CSS (`:root`) tuân thủ nghiêm ngặt `hq/design_aesthetic_memo.md`:
  - **Hệ màu chủ đạo:** Obsidian Black (`#0B0D10`, `#12151B`), Google Blue (`#1A73E8`, `#4285F4`), Pure White (`#FFFFFF`), cùng các màu ngữ nghĩa chuẩn cho trạng thái đơn hàng/công việc.
  - **Hiệu ứng chiều sâu 3D & Tối giản:** Đổ bóng đa lớp tinh tế (Ambient + Key Light Shadow), viền mảnh `1px solid rgba(255,255,255,0.08)`, không lạm dụng hiệu ứng rườm rà làm nặng GPU.
- **`JavaScript.html` (Client Engine — OptiSync V5 + Dynamic UI Builder):** Chứa bộ máy quản lý trạng thái `AppStore`, hàng đợi đồng bộ `SyncQueue`, bộ trộn dữ liệu `DataMixer`, và các hàm tự động vẽ Bảng/Form từ `GLOBAL_SCHEMA_MATRIX`.
- **Cơ chế SSR Injection ngay từ `doGet(e)`:**
  - Khi người dùng mở ứng dụng, hàm `doGet(e)` trên Server nạp sẵn gói dữ liệu khởi tạo (**Bootstrap Payload**: thông tin nhân sự đang đăng nhập, bảng phân quyền `ROLE_MATRIX`, cấu hình `FIELD_MAP` đã lọc bỏ các cột nhạy cảm, và giao diện theo mùa/sự kiện nếu có) rồi bơm thẳng vào thẻ `<script id="__INITIAL_STATE__">` trước khi trả HTML về trình duyệt. Nhờ đó, màn hình đầu tiên hiển thị ngay lập tức mà không tốn thêm 1 vòng gọi API chờ đợi.

#### 3.2. Quy tắc Phân tách Nền tảng Giao diện (PC/Laptop Default Rule)
Tuân thủ quy định bắt buộc của dự án:
1. **Mặc định 100% ưu tiên PC/Laptop (`Desktop-First Execution`):** Mọi tính năng, bảng dữ liệu, bộ lọc, modal nghiệp vụ khi phát triển đều mặc định tối ưu cho màn hình PC/Laptop (độ phân giải từ `1280x720` đến `1920x1080+`). Không tự ý viết thêm CSS `@media (max-width: 768px)` phức tạp nếu Product Owner chưa yêu cầu.
2. **Khi có yêu cầu Mobile chuyên biệt (Explicit Mobile Mode):** Chỉ những màn hình được Product Owner chỉ định rõ (ví dụ: *Màn hình Kỹ thuật viên bấm nhận việc/chụp ảnh tại khoang xe* hoặc *Trang Khách hàng quét QR tra cứu bảo hành*) mới được kích hoạt bộ khung Mobile-View với nút bấm kích thước lớn ($\ge 44\text{px}$), bố cục 1 cột dọc và chức năng nén ảnh trực tiếp trên trình duyệt trước khi tải lên.

#### 3.3. Xử lý File, Ảnh & Chuẩn An toàn Base64 trên Trình duyệt
- **Nén ảnh tại Client trước khi gửi lên GAS (`Client-Side Canvas Compression`):**
  - Ảnh chụp xe bằng điện thoại thường nặng 4MB–10MB. Nếu đẩy nguyên bản qua `google.script.run` sẽ làm treo trình duyệt và tràn bộ nhớ GAS.
  - **Giải pháp bắt buộc:** Sử dụng HTML5 `<canvas>` tại trình duyệt để tự động thu phóng ảnh về chiều ngang tối đa `1280px` hoặc `1600px`, nén chuẩn JPEG/WebP chất lượng `0.75` (dung lượng giảm từ 5MB xuống còn **120KB–250KB**), chuyển thành chuỗi Base64 sạch rồi mới gửi qua cổng RPC để Server lưu lên Google Drive và trả về URL.
- **Quy tắc chống tràn chuỗi Base64 (`ERR-003` & `ERR-004` Guard):**
  - Tuyệt đối không lưu chuỗi Base64 dài `> 45.000` ký tự vào một ô trên Google Sheets (vì giới hạn cứng của Google Sheets là `50.000` ký tự/ô). Mọi file/ảnh nghiệp vụ đều phải đẩy lên Google Drive và chỉ lưu **Drive File ID / View URL** vào ô Sheet.
  - Nếu có tài nguyên tĩnh (logo, âm thanh thông báo ngắn) nhúng dạng Base64 trong HTML, bắt buộc đặt trong thẻ DOM ẩn (`<img id="asset-logo" hidden src="data:...">`) và dùng `document.getElementById().src` để đọc, tuyệt đối không dán chuỗi Base64 dài hàng chục ngàn ký tự trực tiếp vào biến chuỗi trong thẻ `<script>` nhằm tránh lỗi đứt dòng của trình biên dịch.

### 4. Ví dụ minh họa
```javascript
// Minh họa: Nén ảnh nghiệm thu xe tại Client trước khi đẩy lên Google Apps Script
async function compressVehicleImage(file, maxWidth = 1280, quality = 0.75) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl); // Dung lượng chỉ còn ~150KB, gửi qua google.script.run trong < 1s
      };
      img.onerror = reject;
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
}
```

### 5. Best Practice
- **Không dùng cú pháp Nested Template Literals (Backtick lồng Backtick) phức tạp trong file `.html` của GAS (`ERR-005` Guard):** Sử dụng phép nối chuỗi rõ ràng hoặc hàm helper `renderRowHtml(item)` tách bạch để tránh lỗi cú pháp khi chỉnh sửa hoặc chạy script tự động.
- **Mọi bảng danh sách lớn (> 100 dòng) phải có Phân trang tại RAM (Client-Side Pagination 100–150 dòng/trang) kèm Hash Diffing:** Giúp DOM luôn nhẹ (< 1.500 nodes), cuộn chuột mượt 60fps và không bị giật về đầu trang khi hàm Smart Polling 8 giây cập nhật dữ liệu mới.

### 6. Checklist
- [x] Đã đọc và áp dụng đúng chuẩn Font, Hệ màu và Ánh sáng 3D trong `hq/design_aesthetic_memo.md` chưa?
- [x] Mọi thao tác cập nhật dữ liệu từ UI đã đi qua `AppStore.dispatchAction()` của OptiSync V5 thay vì gọi trực tiếp `google.script.run` chưa?
- [x] Tính năng tải ảnh đã có bước nén `<canvas>` xuống $< 300\text{KB}$ và lưu qua Google Drive thay vì nhét Base64 vào ô Sheet chưa?
- [x] Đã tuân thủ quy tắc mặc định chỉ viết giao diện PC/Laptop trừ khi được yêu cầu rõ cho Mobile chưa?

### 7. Các điểm cần quyết định
- **Quyết định 3.1 (Đã chốt):** Sử dụng **Vanilla JavaScript (ES6+) kết hợp kiến trúc Reactive Store nội bộ (OptiSync V5)** và hệ thống CSS chuẩn hóa trong `Stylesheet.html` cho Phase 1; không cài đặt bước build Webpack/Vite phức tạp vào trong luồng `HtmlService` để đảm bảo tốc độ chỉnh sửa và đẩy code (`clasp push`) chỉ mất 2 giây.

---

# Chương 4: Backend Stack (Công nghệ Máy chủ & Xử lý Giới hạn Runtime Google Apps Script)

### 1. Mục tiêu chương
- Đặc tả kiến trúc thực thi phía máy chủ trên nền tảng **Google Apps Script (GAS) V8 Serverless Runtime**: tổ chức hệ thống file `.gs` theo đúng thứ tự nạp, điều phối luồng xử lý đa người dùng và hóa giải triệt để 3 điểm yếu lớn nhất của GAS:
  1. **Giới hạn thời gian chạy tối đa 6 phút/lượt (`6-Minute Execution Timeout`)**.
  2. **Giới hạn số lần gọi API trong ngày (`Daily Quota Limits`)**.
  3. **Nguy cơ ghi đè dữ liệu khi nhiều người bấm lưu cùng lúc (`Race Condition / Concurrent Writes`)**.

### 2. Vai trò trong toàn hệ thống
- Là "nhà máy xử lý trung tâm" đứng giữa Giao diện người dùng (Chương 3) và Cơ sở dữ liệu Google Sheets / Drive (Chương 5).
- Thực thi toàn bộ kiểm tra bảo mật 3 chiều (`ROLE_MATRIX`), tự động hóa 4 chiều (`TASK_AUTOMATION_RULES`), điều phối các Worker Bots chạy ngầm (nhắc lịch bảo dưỡng, cảnh báo tồn kho, khóa kỳ lương) và ghi nhật ký kiểm toán bất biến (`Audit_Logs`).

### 3. Giải thích chi tiết

#### 3.1. Quy ước Đặt tên & Tổ chức File `.gs` trên GAS V8 Runtime
Trong Google Apps Script, các biến toàn cục (`const`, `var`) được nạp theo thứ tự bảng chữ cái của tên file. Do đó, dự án áp dụng quy ước đặt tên phân lớp rõ ràng:
1. **`AA_ReadMe.gs`:** Tài liệu kiến trúc nội tuyến (Inline Architecture Manifesto) ghi rõ nguyên tắc OptiSync V5, sơ đồ bảng và quy ước sống còn ngay trong bộ code để bất kỳ lập trình viên hay AI nào mở project lên đều đọc được đầu tiên.
2. **`00_Config_Matrix.gs` (hoặc phần đầu `Code.gs`):** Khai báo các hằng số cấu hình (`PM_CONFIG`), hàm `letterToColIndex()`, ma trận `GLOBAL_SCHEMA_MATRIX` ($1D \rightarrow 4D$), `ROLE_MATRIX` và `TASK_AUTOMATION_RULES`.
3. **`Code.gs` (Gateway & Core Services):** Chứa `doGet(e)`, `doPost(e)`, 3 cổng RPC (`api_query`, `api_mutate`, `api_batch_sync`), bộ kiểm tra phân quyền `canPerformAction()` và các hàm nghiệp vụ cốt lõi.
4. **`AuditLog.gs`:** Hệ thống ghi nhật ký kiểm toán tự động xoay vòng 3.000 dòng (`logUserAction`, `getAuditLogs`).
5. **`Automation.gs`:** Bộ điều phối trung tâm (`runMasterAutomation`) và các Worker Bots chạy theo lịch định kỳ sử dụng cơ chế **Single-Read Snapshot**.

#### 3.2. Chiến thuật Hóa giải 3 Giới hạn Vật lý của Google Apps Script

##### A. Chống xung đột ghi đè bằng `LockService` phân tầng (Concurrency Control)
Khi 2 Cố vấn dịch vụ cùng tạo đơn hàng hoặc 2 Kỹ thuật viên cùng cập nhật trạng thái trên 1 phiếu xe tại cùng một phần nghìn giây:
- Mọi hàm ghi dữ liệu (`api_mutate`, `api_batch_sync`, `doPost`) **BẮT BUỘC** phải xin khóa kịch bản (`LockService.getScriptLock()`):
```javascript
function executeWithScriptLock(callback, timeoutMs = 10000) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(timeoutMs)) {
    return {
      ok: false,
      code: "SERVER_BUSY_RETRY",
      message: "Hệ thống đang xử lý giao dịch khác, vui lòng thử lại sau 2 giây."
    };
  }
  try {
    return callback();
  } finally {
    SpreadsheetApp.flush(); // Đảm bảo mọi thay đổi được đẩy xuống Sheet trước khi nhả khóa
    lock.releaseLock();
  }
}
```
- Khi Client nhận mã `SERVER_BUSY_RETRY`, hàng đợi `SyncQueue` của OptiSync V5 tự động giữ nguyên gói tin trong RAM và thử gửi lại sau 3 giây mà người dùng không hề bị mất dữ liệu.

##### B. Phá bỏ giới hạn 6-Minute Timeout bằng "Centralized Snapshot + Time-Boxed Continuation"
Đối với các tác vụ chạy ngầm định kỳ (quét hàng ngàn đơn hàng, kiểm tra hạn bảo dưỡng xe, gửi thông báo Zalo/Email):
1. **Đọc 1 lần duy nhất vào RAM (`getDatabaseSnapshot`):** Thay vì để 5 con Bot tự gọi `sheet.getDataRange().getValues()` 5 lần (tốn gấp 5 lần thời gian đọc đĩa), hàm điều phối `runMasterAutomation()` chỉ đọc bảng dữ liệu **ĐÚNG 1 LẦN** vào mảng 2 chiều trong RAM (`snapshot.matrix`), sau đó truyền `snapshot` này qua lần lượt từng Bot.
2. **Cập nhật Kép (Dual-Update Sheet + RAM Matrix):** Khi Bot số 1 sửa một ô trên Sheet, nó đồng thời cập nhật luôn `snapshot.matrix[rowIdx][colIdx] = newValue` trong RAM để Bot số 2 chạy ngay sau đó nhìn thấy dữ liệu mới nhất mà không cần đọc lại Sheet.
3. **Ngắt an toàn ở phút thứ 4.5 (`Time-Boxed Execution Guard`):**
   - Mỗi vòng lặp xử lý lô lớn đều kiểm tra `Date.now() - startTime > 270000` (4 phút 30 giây — chừa 90 giây an toàn trước ngưỡng 6 phút của Google).
   - Nếu chạm ngưỡng 4.5 phút mà vẫn còn bản ghi chưa xử lý xong, hàm sẽ lưu vị trí dòng đang dở (`lastProcessedRowIndex`) vào `PropertiesService.getScriptProperties()` và tự động đặt 1 One-off Trigger chạy tiếp sau 1 phút (`ScriptApp.newTrigger(...).timeBased().after(60000).create()`).

##### C. Bảo vệ Quota bằng Gom lô (Batching) & Bộ nhớ đệm (`CacheService`)
- **Ở chiều Ghi:** Cơ chế gom lô 8 giây của OptiSync V5 (`processBatchSync`) gom 10–20 thao tác sửa lẻ của người dùng thành **1 lần gọi hàm duy nhất** từ Client lên Server.
- **Ở chiều Đọc:** Các bảng danh mục ít biến động (`Staff`, `Customer` danh mục hạng thẻ, `Inventory_Item` bảng giá dịch vụ, cấu hình `Theme`) được lưu vào `CacheService.getScriptCache()` với thời gian sống (TTL) từ **300 giây đến 1.800 giây**. Khi có thay đổi trên các bảng này, hàm `api_mutate` tự động gọi `cache.remove(cacheKey)` (Cache Invalidation on Write) để làm mới tức thì.

### 4. Ví dụ minh họa
```javascript
// Minh họa: Kiến trúc Centralized Snapshot & Dual-Update trong Automation.gs
function runMasterAutomation() {
  const startTime = Date.now();
  const snapshot = getDatabaseSnapshot("Order");
  if (!snapshot) return;

  // Truyền cùng 1 snapshot RAM qua chuỗi các Worker Bots
  botAutoLockCompletedOrders(snapshot, startTime);
  botGenerateWarrantyCareSchedule(snapshot, startTime);
  botAlertOverdueServiceBays(snapshot, startTime);
}
```

### 5. Best Practice
- **Không bao giờ gọi `sheet.getRange().setValue()` rời rạc bên trong vòng lặp lớn nếu các ô nằm liền kề:** Hãy gom các thay đổi theo từng dòng hoặc từng vùng (Range) hoặc chỉ gọi `setValue()` cho đúng những ô thực sự có thay đổi giá trị (`oldValue !== newValue`).
- **Tách biệt Tài khoản Chạy Trigger (Service Account):** Các Time-driven Triggers nên được cài đặt bằng tài khoản quản trị trung tâm của công ty để không bị gián đoạn khi một nhân sự nghỉ việc hoặc đổi mật khẩu.

### 6. Checklist
- [x] Mọi hàm ghi dữ liệu (`api_mutate`, `api_batch_sync`, `doPost`) đã được bọc trong `LockService.getScriptLock()` kèm `SpreadsheetApp.flush()` chưa?
- [x] Các tác vụ Automation chạy ngầm đã áp dụng mô hình **Single-Read Snapshot (`getDatabaseSnapshot`)** thay vì đọc Sheet nhiều lần chưa?
- [x] Đã có cơ chế kiểm tra thời gian chạy `< 270.000ms` (4.5 phút) cho các tác vụ hàng loạt chưa?

### 7. Các điểm cần quyết định
- **Quyết định 4.1 (Đã chốt):** Chu kỳ chạy của `runMasterAutomation` Time-driven Trigger ở Phase 1 được đặt ở mức **10–15 phút/lần** (cho kiểm tra tiến độ/nhắc việc trong ngày) và **01:00 sáng hàng ngày** (cho tác vụ dọn dẹp log, tổng hợp công nợ và quét lịch bảo dưỡng định kỳ), đảm bảo chỉ tiêu tốn $< 15\%$ tổng Quota miễn phí mỗi ngày của Google.

---

# Chương 5: Database & Storage Stack (Công nghệ Lưu trữ Google Sheets & Google Drive API)

### 1. Mục tiêu chương
- Đặc tả thiết kế vật lý của Cơ sở dữ liệu trên **Google Sheets** và Hệ thống lưu trữ tệp tin trên **Google Drive**: biến một bảng tính thông thường thành một cơ sở dữ liệu quan hệ giả lập (Pseudo-Relational Matrix Database) có tốc độ truy xuất nhanh, không bị lệch cột khi chèn/xóa, không bị phình kích thước theo thời gian và bảo vệ tuyệt đối dữ liệu tài chính/nhật ký.

### 2. Vai trò trong toàn hệ thống
- Là tầng lưu trữ bền vững (Persistence Layer) chứa toàn bộ 10 bảng Core Business Objects (`Lead`, `Customer`, `Order`, `Task`, `Product_Asset`, `Staff`, `Partner`, `Inventory_Item`, `Financial_Transaction`, `Warranty_Care`) và 4 bảng System Tables (`Sys_Config_Matrix`, `Sys_Automation_Queue`, `Audit_Logs`, `Sys_Sequence_Counter`).
- Đảm bảo tính toàn vẹn dữ liệu (Data Integrity) và khả năng kiểm toán ngược (Traceability) cho chủ doanh nghiệp SME.

### 3. Giải thích chi tiết

#### 3.1. Chuẩn Thiết kế Bố cục Vật lý trên mỗi Sheet (`PM_CONFIG` Sheet Layout Standard)
Kế thừa và chuẩn hóa từ thực tiễn vận hành xuất sắc của **TDCM Team App**, mọi bảng dữ liệu chính trong Google Sheets của SME OS đều tuân thủ cấu trúc dòng vật lý cố định sau:
- **Dòng 1 – Dòng 9 (Executive Summary & System Metadata Zone):** Dành cho tiêu đề bảng, công thức tổng hợp nhanh (`SUBTOTAL`, `COUNTIF`) phục vụ cái nhìn tổng quan khi mở trực tiếp bằng Google Sheets, và thông tin khóa cấu hình.
- **Dòng 10 (`HEADER_ROW = 10`):** Dòng tiêu đề cột chính thức (khớp với `sheetHeader` trong `FIELD_MAP`). Được cố định (Freeze up to row 10) và khóa quyền sửa.
- **Dòng 11 (`INSTRUCTION_ROW = 11`):** Dòng ghi chú hướng dẫn định dạng/kiểu dữ liệu cho từng cột (ẩn hoặc in nghiêng màu xám).
- **Từ Dòng 12 trở đi (`MIN_DATA_ROW = 12`):** Vùng chứa dữ liệu bản ghi thực tế. Mọi thuật toán quét dữ liệu ở Backend luôn bắt đầu từ chỉ số mảng `i = PM_CONFIG.MIN_DATA_ROW - 1` (tức `i = 11` trong mảng 0-indexed), không bao giờ quét nhầm vào vùng tiêu đề hay công thức tổng hợp phía trên.

#### 3.2. Ma trận Ánh xạ Động `FIELD_MAP` & Chống Lệch Cột Tuyệt đối
- **Cấm tuyệt đối Hardcode chỉ số cột số học (`row[2]`, `row[14]`):**
  - Mọi thao tác đọc/ghi cột đều phải đi qua hàm chuyển đổi ký tự cột chữ cái sang chỉ số mảng 0-indexed:
```javascript
function letterToColIndex(letter) {
  let col = 0;
  for (let i = 0; i < letter.length; i++) {
    col = col * 26 + (letter.charCodeAt(i) - 64);
  }
  return col - 1; // Ví dụ: "A" -> 0, "Z" -> 25, "AA" -> 26
}
```
- **Cơ chế Tự kiểm tra Độ lệch Cột (Header Integrity Verification):**
  - Khi khởi tạo `getDatabaseSnapshot(sheetName)`, hệ thống có thể đối chiếu nhanh giá trị tại dòng `HEADER_ROW = 10` (`matrix[9][fieldDef.idx]`) với `fieldDef.sheetHeader`. Nếu quản trị viên vô tình chèn thêm 1 cột trực tiếp trên Google Sheets làm lệch vị trí, hệ thống lập tức phát hiện, tự động dò lại vị trí cột theo tên `sheetHeader` và phát cảnh báo cho Admin thay vì ghi nhầm dữ liệu sang cột bên cạnh.

#### 3.3. Cơ chế Xoay vòng Nhật ký 3.000 Dòng (`Rolling 3,000-Row Audit Log`) & Lưu trữ Lạnh CSV
Một trong những nguyên nhân lớn nhất làm các ứng dụng Google Sheets bị chậm dần rồi chết hẳn sau 6 tháng là bảng `Audit_Logs` phình lên hàng trăm ngàn dòng. SME OS giải quyết triệt để bằng cơ chế **Rolling Window + Cold Archive**:
1. **Chèn dòng mới lên đầu (`Top-Down Insertion at Row 12`):**
   - Mỗi khi có hành động cần ghi log (`logUserAction`), hệ thống chèn dòng mới ngay tại vị trí `ROW 12` (`sheet.insertRowBefore(12)`). Nhờ đó, nhật ký mới nhất luôn nằm ngay dòng đầu tiên bên dưới tiêu đề, giúp hàm `getAuditLogs(limit = 500)` chỉ cần đọc đúng 500 dòng đầu tiên (`sheet.getRange(12, 1, 500, 7).getValues()`) trong **$0.1\text{ giây}$** bất kể bảng có bao nhiêu dòng.
2. **Giới hạn Cứng 3.000 Dòng Nóng (`MAX_HOT_LOG_ROWS = 3000`):**
   - Trước khi chèn dòng mới, nếu `sheet.getLastRow() >= 3000`, hệ thống tự động cắt phần đuôi cũ nhất hoặc xuất lô 1.000 dòng cuối cùng ra file `.csv` lưu vào thư mục `Cold_Archive/Audit_Logs/` trên Google Drive, sau đó xóa khỏi Sheet. Nhờ vậy, bảng `Audit_Logs` trên Google Sheets **vĩnh viễn không bao giờ vượt quá 3.000 dòng**, giữ tốc độ bảng tính nhanh như ngày đầu tiên suốt nhiều năm.

#### 3.4. Kiến trúc Lưu trữ File & Hình ảnh trên Google Drive (`Drive Storage Hierarchy`)
Để quản lý hàng chục ngàn bức ảnh kiểm tra xe (Check-in 360 độ), ảnh thi công Detailing/Âm thanh và chứng từ thanh toán tại AP CAR CARE:
- Hệ thống tự động tạo cây thư mục phân cấp chuẩn trên Google Drive:
  ```text
  📁 SME_OS_STORAGE_ROOT/
   ├── 📁 2026/
   │    ├── 📁 2026-10_Orders/
   │    │    ├── 📁 ORD-202610-0001_51K-888.88/
   │    │    │    ├── 🖼️ checkin_front.jpg
   │    │    │    ├── 🖼️ detailing_after_1.jpg
   │    │    │    └── 📄 invoice_receipt.pdf
   ├── 📁 Cold_Archive/
   │    └── 📁 Audit_Logs/
   │         └── 📄 Audit_Logs_2026_Q3.csv
  ```
- **Cơ chế Cấp quyền & Link Hiển thị Nhanh:** File tải lên được đặt quyền xem nội bộ hoặc link chia sẻ có kiểm soát, lưu định dạng URL chuẩn (`https://drive.google.com/thumbnail?id=FILE_ID&sz=w1200`) vào trường `attachments_json` của bảng `Order` hoặc `Task` để hiển thị trực tiếp trong thẻ `<img>` trên ứng dụng mà không bị chặn CORS.

### 4. Ví dụ minh họa
```javascript
// Minh họa: Ghi Audit Log xoay vòng 3.000 dòng (Chuẩn AuditLog.gs từ TDCM Team App)
function logSystemAudit(userEmail, userRole, action, targetId, detailText) {
  try {
    const ss = SpreadsheetApp.openById(PM_CONFIG.SPREADSHEET_ID);
    const logSheet = ss.getSheetByName(PM_CONFIG.AUDIT_SHEET_NAME);
    if (!logSheet) return;

    const lastRow = logSheet.getLastRow();
    // Giữ bảng luôn <= 3000 dòng để tốc độ Google Sheets không bao giờ suy giảm
    if (lastRow >= 3000) {
      logSheet.deleteRow(3000);
    }

    logSheet.insertRowBefore(12);
    const logId = "LOG-" + Utilities.getUuid().slice(0, 6).toUpperCase();
    const rowData = [[new Date(), logId, userEmail, userRole, action, targetId, detailText]];

    const targetRange = logSheet.getRange(12, 1, 1, 7);
    targetRange.setValues(rowData);
    targetRange.setFontWeight("normal").setBackground(null);
  } catch (err) {
    console.error("AuditLog Error (Non-blocking):", err);
  }
}
```

### 5. Best Practice
- **Cắt tỉa các dòng/cột trống thừa trên Google Sheets (`Trim Blank Rows/Cols`):** Khi tạo một Sheet mới, xóa toàn bộ các cột trống bên phải vùng dữ liệu và các dòng trống thừa bên dưới để giảm tổng số ô (Cell Count) trong Workbook, giúp Google Sheets tính toán công thức nhanh hơn gấp nhiều lần.
- **Khóa bảo vệ các cột hệ thống (`Protected Ranges`):** Các cột `id`, `created_at`, `created_by`, `audit_trail_json` trên Google Sheets phải được đặt quyền `Protected Range` (chỉ tài khoản chủ sở hữu Script mới được ghi), ngăn chặn nhân viên mở trực tiếp file Sheet lên xóa nhầm.

### 6. Checklist
- [x] Mọi bảng dữ liệu đã tuân thủ chuẩn `HEADER_ROW = 10` và `MIN_DATA_ROW = 12` chưa?
- [x] Đã loại bỏ 100% việc hardcode chỉ số cột (`row[3]`) và thay bằng `FIELD_MAP` + `letterToColIndex()` chưa?
- [x] Bảng `Audit_Logs` đã áp dụng cơ chế chèn dòng 12 (`insertRowBefore(12)`) và giới hạn 3.000 dòng nóng chưa?
- [x] Đã có cấu trúc phân thư mục tự động theo Năm/Tháng/Mã Đơn trên Google Drive cho ảnh nghiệm thu xe chưa?

### 7. Các điểm cần quyết định
- **Quyết định 5.1 (Đã chốt):** Toàn bộ 10 bảng Core Objects và 4 bảng System Tables của 1 doanh nghiệp SME ở Phase 1 được đặt chung trong **1 Google Spreadsheet Master duy nhất** (để đọc Snapshot cực nhanh không phải mở chéo nhiều file), trừ khi bảng lịch sử lưu trữ lạnh (`Cold Archive`) được tách ra file riêng theo từng năm.

---

# Chương 6: CI/CD & Environment (Triển khai, Quản lý Phiên bản & Quy trình Phối hợp AI Agent)

### 1. Mục tiêu chương
- Thiết lập quy trình Vòng đời Phát triển Phần mềm thu gọn nhưng kỷ luật thép (**Lean & Bulletproof SDLC**) cho dự án SME OS / App AP CAR CARE: kết hợp sức mạnh của **Local Backup (`.\backup.ps1`) + Git Version Control + Google `clasp` CLI + Hệ thống Tracking `hq/`**.
- Phân tách rõ môi trường **Development / Staging / Production** và chuẩn hóa mô hình phối hợp **Antigravity CLI (Sếp Kiến trúc) + Antigravity IDE (Thợ Thi công)**.

### 2. Vai trò trong toàn hệ thống
- Là "dây chuyền lắp ráp và kiểm định chất lượng (QA Gate)" đảm bảo mọi dòng code do AI Agent (Gemini, Claude Code, Codex) viết ra đều có bản sao lưu trước khi sửa, được kiểm tra chéo 2 cấp độ, truy vết được theo mã Commit 7 ký tự và có thể khôi phục tức thì trong 3 giây nếu xảy ra sự cố.

### 3. Giải thích chi tiết

#### 3.1. Chiến lược Phân tách Môi trường (Dev / Staging / Production Isolation)
Để không bao giờ làm hỏng dữ liệu kinh doanh thật của AP CAR CARE khi đang thử nghiệm tính năng mới:

| Môi trường (Environment) | Google Spreadsheet & Drive | Google Apps Script Deployment | Mục đích & Đối tượng sử dụng |
| :--- | :--- | :--- | :--- |
| **1. LOCAL / DEV** | File Sheet **`[DEV] AP CAR CARE - Sandbox DB`** (Chứa dữ liệu giả lập mẫu) | Chạy qua **`clasp push`** lên project GAS Dev hoặc `@HEAD` Deployment (Test URL `/dev`) | Dành cho AI Agent (Lucy) và Developer viết code, chạy thử nghiệm tính năng mới, kiểm tra giao diện và test luồng `FIELD_MAP`. |
| **2. STAGING (UAT)** | Bản sao dữ liệu thật đã ẩn thông tin nhạy cảm | Versioned Deployment gắn nhãn `v0.x-staging` | Dành cho Product Owner (anh Đức) và Trưởng bộ phận duyệt giao diện, bấm thử quy trình trước khi phát hành chính thức. |
| **3. PRODUCTION (LIVE)** | File Sheet **`[LIVE] AP CAR CARE - Master DB`** + Thư mục Drive thật | Versioned Deployment cố định URL `/exec` gắn nhãn `v1.x-prod` | Phục vụ toàn bộ nhân sự và khách hàng thực tế hàng ngày. Chỉ cập nhật khi anh Đức xác nhận lệnh Deploy. |

- **Cách chuyển đổi môi trường không cần sửa code:** ID của file Spreadsheet (`SPREADSHEET_ID`) và thư mục Drive (`DRIVE_ROOT_ID`) được đọc ưu tiên từ `PropertiesService.getScriptProperties().getProperty("ENV_SPREADSHEET_ID")` trên từng project GAS, tuyệt đối không phải sửa đi sửa lại mã nguồn khi đẩy từ Dev lên Prod.

#### 3.2. Quy trình 6 Bước Triển khai Code Bắt buộc (Mandatory 6-Step Coding & Deployment Pipeline)
Mỗi khi nhận bất kỳ yêu cầu sửa đổi hoặc thêm mới tính năng nào, AI Agent **BẮT BUỘC** thực thi tuần tự 6 bước không bỏ sót:
1. **Bước 1 — Khởi động & Đối chiếu Chuẩn (Context & Design Scan):**
   - Đọc `hq/00-INDEX.md`, `hq/01-LOG.md`, `hq/lesson.md` để nạp bối cảnh và tránh lỗi cũ.
   - Đọc `hq/design_aesthetic_memo.md` (nếu liên quan UI/UX) và `hq/schematic_map.md` + `hq/CODING_TASKS.json` để xác định chính xác tọa độ hàm/biến/CSS cần tác động.
2. **Bước 2 — Quét Mã nguồn 2 Cấp độ & Dọn dẹp Tàn dư (2-Level Code Review):**
   - **Cấp độ 1:** Quét toàn bộ file đang định sửa trực tiếp.
   - **Cấp độ 2:** Quét chéo toàn bộ các file trong `src/` để phát hiện hàm trùng tên, CSS xung đột hoặc logic cũ dư thừa nhằm xóa/cô lập sạch sẽ trước khi viết code mới.
3. **Bước 3 — Sao lưu Cục bộ Bắt buộc (`.\backup.ps1`):**
   - Chạy lệnh `.\backup.ps1` trên Terminal để nhân bản toàn bộ thư mục `src/` vào `backup/<GitHash7>/` trước khi chạm vào bất kỳ dòng code nào. Nếu phát sinh lỗi cần quay lui, chạy `.\revert-local.ps1 -TargetHash <GitHash7>`.
4. **Bước 4 — Thực thi Code & Kiểm thử (Implementation & Verification):**
   - Viết code tuân thủ chuẩn `FIELD_MAP` đa chiều ($1D \rightarrow 4D$) và kiến trúc OptiSync V5.
   - Kiểm tra cú pháp, rà soát luồng dữ liệu đầu vào/đầu ra và giao diện trên màn hình PC/Laptop.
   - Nếu sửa cùng 1 lỗi đến lần thứ 3 vẫn chưa thành công ($\text{counter } i = 3$), kích hoạt ngay quy trình **`/fix-stuck3`**: dừng hướng cũ, đối chiếu bản backup gần nhất, đọc `hq/lesson.md`, phân tích nguyên nhân gốc rễ và triển khai theo hướng tiếp cận hoàn toàn mới.
5. **Bước 5 — Cập nhật Hồ sơ Truy vết (`hq/` Tracking Update):**
   - Cập nhật `hq/CODING_TASKS.json`, `hq/schematic_map.md` (nếu thay đổi kiến trúc/luồng dữ liệu), `hq/lesson.md` (nếu vừa giải quyết một lỗi kỹ thuật khó), `hq/00-INDEX.md` và `hq/01-LOG.md`.
6. **Bước 6 — Đóng gói Git Commit & Báo cáo Mã ID 7 Ký tự:**
   - Chạy `git add .` và `git commit -m "..."`.
   - Khi được phép đẩy lên Google Apps Script, chạy `clasp push`.
   - Báo cáo kết quả cho anh Đức kèm **Mã ID bản dịch (Git Commit Hash 7 ký tự)** và ghi nhận vào `backup/backup_log.md`.

#### 3.3. Mô hình Phối hợp "Sếp CLI – Thợ IDE" (Antigravity Multi-Agent Workflow)
Tuân thủ tài liệu hướng dẫn vận hành Antigravity của dự án:
- **Tầng Sếp (Architect / Orchestrator Agent):** Phụ trách đọc hiểu toàn cục 5 File Kiến trúc Cốt lõi (`hq/sme-os-core/01` $\rightarrow$ `05`), thiết kế cấu trúc bảng `GLOBAL_SCHEMA_MATRIX`, tạo khung thư mục, kiểm duyệt chất lượng kiến trúc và điều phối tiến độ trong `hq/00-INDEX.md`.
- **Tầng Thợ (Builder / Implementation Agent):** Nhận tọa độ cụ thể từ `hq/CODING_TASKS.json` và thiết kế từ File 4 & File 5 để viết code chi tiết cho từng hàm `.gs`, từng bảng `.html`, kiểm thử giao diện và đóng gói commit nhanh gọn, chính xác.

### 4. Ví dụ minh họa
```powershell
# Quy trình chuẩn trên Terminal mỗi khi bắt đầu và kết thúc 1 phiên code tại App AP CAR CARE:

# 1. Trước khi sửa code: Chạy script backup tự động theo mã Git Hash hiện hành
.\backup.ps1

# 2. Sau khi viết code, kiểm thử và cập nhật hq/CODING_TASKS.json + hq/00-INDEX.md:
git add .
git commit -m "feat(order): implement 360 vehicle check-in form with FIELD_MAP matrix"
git rev-parse --short HEAD  # Lấy mã Commit 7 ký tự báo cáo cho anh Đức

# 3. Đẩy lên môi trường Google Apps Script (khi được xác nhận):
clasp push
```

### 5. Best Practice
- **Không bao giờ giữ thông tin nhạy cảm (API Key thật, Token Zalo OA, Mật khẩu) trong file code hoặc file `.md`:** Mọi khóa bí mật phải được lưu trong `PropertiesService.getScriptProperties()` (ở Phase 1) hoặc `.env.local` / Cloudflare Secret Manager (ở Phase 2, nằm trong `.gitignore`).
- **Luôn `git fetch` và kiểm tra trạng thái kho lưu trữ trước khi bắt đầu phiên mới:** Đảm bảo không xảy ra xung đột khi anh Đức sử dụng song song nhiều công cụ AI Agent (Gemini/Antigravity, Claude Code, Codex) trên cùng thư mục gốc `D:\My Agents\Projects\App AP CAR CARE\`.

### 6. Checklist
- [x] Đã phân tách rõ cấu hình môi trường Dev và Production qua `ScriptProperties` chưa?
- [x] Đã tích hợp đầy đủ quy trình 6 bước (`.\backup.ps1` $\rightarrow$ Scan 2 cấp $\rightarrow$ Code $\rightarrow$ `/fix-stuck3` $\rightarrow$ Update `hq/` $\rightarrow$ Git Commit 7 ký tự) chưa?
- [x] Đã đảm bảo không có bất kỳ API Key / Secret thật nào bị ghi cứng vào mã nguồn hoặc tài liệu `hq/` chưa?

### 7. Các điểm cần quyết định
- **Quyết định 6.1 (Đã chốt):** Toàn bộ 5 File Kiến trúc Cốt lõi (`01-PRODUCT-PHILOSOPHY.md` $\rightarrow$ `05-TECHNOLOGY-ARCHITECTURE.md`) tại thư mục `hq/sme-os-core/` chính thức đạt trạng thái **v0.1 Complete Blueprint**, sẵn sàng làm kim chỉ nam duy nhất để bước vào giai đoạn khởi tạo Schema và xây dựng ứng dụng thực tế cho **App AP CAR CARE / SME OS**.