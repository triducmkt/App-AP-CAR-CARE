# Bản Đồ Kiến Trúc & Schematic (App AP CAR CARE)

> 📍 **Mục đích:** File này là kim chỉ nam về kiến trúc tổng thể, luồng dữ liệu và tọa độ hàm của app. Phục vụ đắc lực cho quy trình **Chống lặp lại sửa sai (Debugging Protocol)**. Bất cứ khi nào Agent gặp bế tắc (i = 3), BẮT BUỘC phải mở file này ra đối chiếu luồng dữ liệu để tìm hướng tiếp cận rẽ nhánh.

---

## 🧭 QUY TẮC CẬP NHẬT FILE NÀY

- **Tự động cập nhật KHI:** Task yêu cầu thay đổi cấu trúc hệ thống, thay đổi luồng giao tiếp dữ liệu giữa Frontend - Backend / Database, hoặc thêm module/tính năng lớn mới. Agent BẮT BUỘC phải cập nhật file này sau khi hoàn tất task.
- **BỎ QUA cập nhật KHI:** Task chỉ liên quan đến sửa đổi UI/UX lặt vặt, fix bug hiển thị frontend, chỉnh sửa text/css không làm ảnh hưởng đến logic luồng dữ liệu cốt lõi.

---

## 1. MÔ HÌNH KIẾN TRÚC GIAI ĐOẠN 1 (GAS + GOOGLE SHEETS)

```mermaid
flowchart TD
    subgraph CLIENT [Giao diện Client (Responsive PC & Mobile)]
        WELCOME[Màn hình Welcome Chào Mừng\nMotion Graphic & 3D Logo Sequence] --> LOGIN[Form Đăng Nhập\nTên đăng nhập + Mật khẩu]
        LOGIN -->|Thao tác Click Đăng Nhập| DISPATCHER[Client Action Controller\n(Xử lý Validation & Hiệu ứng Chờ)]
    end

    subgraph BACKEND [Google Apps Script Backend]
        DISPATCHER -->|google.script.run| API_AUTH[Hàm checkLogin(username, password)]
        API_AUTH --> FIELD_MAP[FIELD_MAP Chuyển Đổi Dữ Liệu]
    end

    subgraph DATABASE [Google Sheet Database Central]
        FIELD_MAP -->|SpreadsheetApp.openById| GSHEET[(Google Sheet\nID: 1ziGRRq92AxX9BnDMYbHF-iES7XskALCaOK6LeUw_IS0)]
        GSHEET -->|Trả về thông tin User & Quyền| API_AUTH
    end

    API_AUTH -->|Trả về JSON Payload {status, user, role}| CLIENT
    CLIENT -->|Đăng nhập thành công| APP_MAIN[Giao diện Làm Việc Chính]
```

---

## 2. CÁC TRỤ CỘT KỸ THUẬT & NGUYÊN TẮC THIẾT KẾ

1. **Single Source of Truth (SSOT):** Dữ liệu lưu trữ tập trung tại Google Sheet ID `1ziGRRq92AxX9BnDMYbHF-iES7XskALCaOK6LeUw_IS0`.
2. **FIELD_MAP Pattern (Bắt buộc):** Ánh xạ cấu trúc cột từ Sheet (Tên đăng nhập, Mật khẩu, Họ tên, Nhóm quyền: Khách hàng / Nhân viên / Đại lý, Chi nhánh: Q7 / Tân Phú...) ra Frontend Key, không hardcode số thứ tự cột.
3. **Optimistic & Seamless Animation:** Chuyển động Logo AP 3D mượt mà, không giật lag trên cả trình duyệt PC và Mobile Safari/Chrome.
4. **Data Isolation & Clean Code:** Tách bạch rõ ràng giữa tầng Render giao diện và tầng Xử lý logic / Gọi API.

---

## 3. BẢN ĐỒ MODULE & TỌA ĐỘ FILE CODE ĐỀ XUẤT (`src/`)

### 3.1. Frontend Modules (`src/`)
| File / Component | Chức năng chính | Hàm / Biến quan trọng |
|---|---|---|
| `Index.html` | Màn hình Welcome chào mừng + Form Đăng nhập PC & Mobile | `runWelcomeSequence()`, `handleLoginSubmit()`, `toggleMobileView()` |

### 3.2. Backend / API / Database (`src/`)
| Module / File | Vai trò | Điểm kết nối dữ liệu |
|---|---|---|
| `Code.gs` | Điều phối Web App (`doGet`), API xác thực tài khoản | `checkLogin(credentials)`, `getAppConfig()` |
| `appsscript.json` | Cấu hình manifest Apps Script (timezone, runtime V8) | V8 Runtime |

---

## 4. TỌA ĐỘ HÀM VÀ TRẠNG THÁI (STATE MAP)
- **`AppConfig`**:
  - `SHEET_ID`: `"1ziGRRq92AxX9BnDMYbHF-iES7XskALCaOK6LeUw_IS0"`
  - `BRAND_NAME`: `"AP CAR CARE AUDIO & ACCESSORIES"`
  - `PRIMARY_COLORS`: `{ black: "#000000", white: "#FFFFFF", googleBlue: "#4285F4" }`
- **`USER_FIELD_MAP`** (Dự kiến cho xác thực):
  - `username` -> Cột Tên Đăng Nhập
  - `password` -> Cột Mật Khẩu
  - `role` -> Cột Phân Quyền (Khách hàng / Kỹ thuật / Đại lý)
  - `branch` -> Cột Chi Nhánh (Q7 / Tân Phú / Toàn quốc)
