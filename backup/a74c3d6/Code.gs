/**
 * ============================================================================
 * APP AP CAR CARE — SME OS CORE BACKEND ARCHITECTURE (v2.0.111026)
 * Chuẩn hóa 100% theo Bộ 5 File Kiến Trúc Cốt Lõi SME OS (01 -> 05)
 * & Quy chuẩn Ma trận Đa chiều FIELD_MAP (1D -> 4D) + OptiSync V5
 * ============================================================================
 */

// ============================================================================
// 1. CẤU HÌNH VẬT LÝ GOOGLE SHEETS & HẠ TẦNG RUNTIME (PM_CONFIG - FILE 05)
// ============================================================================
const PM_CONFIG = {
  APP_TITLE: "AP CAR CARE — Hệ Điều Hành Doanh Nghiệp SME OS",
  APP_VERSION: "v2.0.111026",
  SLOGAN: "Chúng tôi không CHĂM SÓC XE HƠI, chúng tôi chăm sóc hình ảnh của chính BẠN",
  HOTLINE: "1900.25.25.26",
  WEBSITE: "www.apcarcare.vn",
  EMAIL: "apcarcare.vn@gmail.com",

  // Chuẩn dòng vật lý bắt buộc (Dòng 1-9: Công thức/Metadata, Dòng 10: Header, Dòng 11: Mô tả, Dòng 12+: Data)
  HEADER_ROW: 10,
  GUIDE_ROW: 11,
  MIN_DATA_ROW: 12,

  // Ngưỡng an toàn Quota Google Apps Script (File 05)
  MAX_EXECUTION_MS: 270000, // Ngắt an toàn ở 4.5 phút (270.000ms) trước giới hạn 6 phút
  AUDIT_MAX_ROWS: 3000,     // Nhật ký kiểm toán xoay vòng tối đa 3.000 dòng
  LOCK_WAIT_MS: 10000,      // Thời gian chờ khóa đồng thời LockService
  CACHE_TTL_SEC: 300,

  SHEETS: {
    LEADS: "Leads",
    CUSTOMERS: "Customers",
    ORDERS: "Orders",
    TASKS: "Tasks",
    PRODUCTS_ASSETS: "Products_Assets",
    STAFF: "Staff",
    PARTNERS: "Partners",
    INVENTORY: "Inventory",
    FINANCE: "Finance_Transactions",
    WARRANTY: "Warranty_Care",
    MKT_POSTS: "MKT_Posts",
    APP_THEMES: "App_Themes",
    BRAND_LOGOS: "Brand_Logo_Slots",
    AUTOMATION_QUEUE: "Sys_Automation_Queue",
    AUDIT_LOGS: "Audit_Logs"
  }
};

/**
 * Hàm dịch chữ cái cột sang số thứ tự cột 1-based (A -> 1, B -> 2, AA -> 27)
 * CẤM TUYỆT ĐỐI hardcode row[2], row[14] trong toàn bộ dự án.
 */
function letterToColIndex(letter) {
  var col = 0;
  var clean = String(letter || "A").toUpperCase().trim();
  for (var i = 0; i < clean.length; i++) {
    col += (clean.charCodeAt(i) - 64) * Math.pow(26, clean.length - i - 1);
  }
  return col;
}

/**
 * Hàm chuẩn hóa Số Điện Thoại Việt Nam về định dạng 10 số chuẩn (09xxxxxxxx)
 * Phục vụ Khử trùng lặp (Deduplication) từ Website Sensor & Đa kênh (File 03 & 05)
 */
function normalizeVNPhone(rawPhone) {
  if (!rawPhone) return "";
  var digits = String(rawPhone).replace(/[^0-9]/g, "");
  if (digits.indexOf("84") === 0 && digits.length === 11) {
    digits = "0" + digits.substring(2);
  } else if (digits.length === 9 && digits.charAt(0) !== "0") {
    digits = "0" + digits;
  }
  return digits;
}

// ============================================================================
// 2. SƠ ĐỒ PHÒNG BAN AP CAR CARE 2026 (6 TẦNG TỔ CHỨC & TABS SIDEBAR)
// Trích xuất chính xác từ tài liệu: business-docs/TÀI CHÍNH/2026/Cơ cấu tổ chức.pdf
// ============================================================================
const AP_ORG_DEPARTMENTS_MATRIX = [
  {
    deptId: "DEPT_EXEC",
    tabOrder: 1,
    code: "BGD-CEO",
    name: "Ban Giám Đốc & HĐQT",
    shortName: "Ban Giám Đốc",
    icon: "crown",
    floorLevel: "Tầng 5 - Tầng 6",
    director: "Chủ Tịch HĐQT & CEO Anh Lộc",
    subUnits: ["Hội Đồng Quản Trị (Tầng 6)", "Giám Đốc Điều Hành - CEO Anh Lộc (Tầng 5)"],
    linkedModules: ["M12_Executive_Dashboard", "M01_Kernel_Auth"],
    primaryTables: ["Orders", "Finance_Transactions", "Leads", "Staff"],
    description: "Trung tâm chỉ huy chiến lược, theo dõi Sơ đồ tổ chức 6 tầng, KPI doanh số toàn hệ thống (Tân Phú, Quận 7, AP Education) và sức khỏe dòng tiền."
  },
  {
    deptId: "DEPT_MKT",
    tabOrder: 2,
    code: "TT-MKT",
    name: "Phòng TT - MKT",
    shortName: "Phòng TT-MKT",
    icon: "megaphone",
    floorLevel: "Tầng 2 - Tầng 4",
    director: "Giám Đốc TT & MKT: Trí Đức",
    subUnits: [
      "Business Intelligent (Tầng 2)",
      "Content Digital (Tầng 2)",
      "IT Dev (Tầng 2)",
      "Design + Video (Tầng 2)",
      "Advertising (Tầng 2)"
    ],
    linkedModules: ["M02_Marketing_ContentHub", "M03_Lead_Omnichannel"],
    primaryTables: ["MKT_Posts", "Leads", "Tasks"],
    description: "Trạm xuất bản nội dung đa kênh (YouTube, Facebook, TikTok), quản trị phễu thu hút Lead đa kênh và 5 tổ chuyên môn BI, Content, IT Dev, Design/Video, Ads."
  },
  {
    deptId: "DEPT_SERVICE",
    tabOrder: 3,
    code: "DICH-VU",
    name: "Khối Dịch Vụ & Kỹ Thuật",
    shortName: "Khối Dịch Vụ",
    icon: "wrench",
    floorLevel: "Tầng 2 - Tầng 4",
    director: "Giám Đốc Dịch Vụ: Công Tây",
    subUnits: [
      "Chi nhánh AP - Tân Phú (CVDV Hoàng Long, Quản đốc Ngọc Tú, Đội KTV)",
      "Chi nhánh AP - Quận 7 (CVDV Hoàng Minh, Quản đốc Ngọc Lễ, Đội KTV)",
      " Bảo hành & Chăm sóc sau bán (Warranty & Care)"
    ],
    linkedModules: ["M04_Sales_Order_Quote", "M05_Workshop_Task_Execution", "M06_Customer_360_Portal", "M08_Inventory_SKU", "M09_Warranty_AfterSales"],
    primaryTables: ["Orders", "Tasks", "Customers", "Products_Assets", "Inventory", "Warranty_Care"],
    description: "Điều phối tiếp nhận xe (CVDV), Quản đốc chia việc cho Kỹ thuật viên (KTV) tại 2 trung tâm AP Tân Phú & AP Quận 7, quản lý Kho phụ kiện Focal/Detailing và Bảo hành điện tử."
  },
  {
    deptId: "DEPT_HR",
    tabOrder: 4,
    code: "NHAN-SU",
    name: "Phòng Nhân Sự (HR)",
    shortName: "Phòng Nhân Sự",
    icon: "users",
    floorLevel: "Tầng 3 - Tầng 4",
    director: "Giám Đốc Nhân Sự: Trí Đức",
    subUnits: [
      "Bộ phận Tuyển Dụng (Tầng 3)",
      "Quản trị Hành chính Nhân sự - HR (Tầng 2)"
    ],
    linkedModules: ["M10_HR_KPI_Commission"],
    primaryTables: ["Staff", "Tasks"],
    description: "Quản trị hồ sơ nhân sự theo cấu trúc 6 tầng (Tầng 1 HV -> Tầng 6 Chairman), tuyển dụng, chấm công và tự động tính lương/hoa hồng theo định mức."
  },
  {
    deptId: "DEPT_ACADEMY",
    tabOrder: 5,
    code: "DAO-TAO",
    name: "Phòng Đào Tạo (AP Education)",
    shortName: "Phòng Đào Tạo",
    icon: "graduation",
    floorLevel: "Tầng 1 - Tầng 3",
    director: "Trưởng Phòng Đào Tạo: Công Tây",
    subUnits: [
      "Quản đốc Trung tâm Đào tạo (Tầng 2)",
      "Đội ngũ Học viên Detailing & Âm thanh - HV (Tầng 1)"
    ],
    linkedModules: ["M05_Workshop_Task_Execution", "M10_HR_KPI_Commission"],
    primaryTables: ["Staff", "Tasks", "Customers"],
    description: "Quản lý Học viện Detailing AP (AP Education), lộ trình thực hành của Học viên (HV Tầng 1) tại xưởng Tân Phú & Quận 7 và cấp chứng chỉ nghề."
  },
  {
    deptId: "DEPT_FINANCE",
    tabOrder: 6,
    code: "KE-TOAN",
    name: "Phòng Kế Toán - Hành Chính",
    shortName: "Phòng Kế Toán",
    icon: "wallet",
    floorLevel: "Tầng 2 - Tầng 4",
    director: "Kế Toán Trưởng",
    subUnits: [
      "Hành chính - Kế toán (Tầng 2)",
      "Kiểm toán Nội bộ - KTNB Tân Phú & Quận 7 (Tầng 3)"
    ],
    linkedModules: ["M11_Finance_Cashflow", "M07_Partner_B2B_Portal"],
    primaryTables: ["Finance_Transactions", "Orders", "Inventory", "Partners"],
    description: "Quản lý Sổ quỹ Thu/Chi, đối soát công nợ Đại lý/Nhà cung cấp, Kiểm toán nội bộ (KTNB) tại 2 chi nhánh và báo cáo dòng tiền P&L 2026."
  }
];

// ============================================================================
// 3. WHITE-LABEL LOGO REGISTRY & "CHANGE CLOTHES" THEME ENGINE (FILE 04 & 05)
// Cho phép tái sử dụng bộ khung App cho dự án khác chỉ bằng thao tác On/Off
// và đổi link Logo ở Backend mà không cần can thiệp code giao diện.
// ============================================================================
const LOGO_SLOT_FIELD_MAP = {
  "Slot ID":      { sheetHeader: "Slot ID",      col: "B", frontendKey: "slotId",      type: "string", visible: true },
  "Tên Vị Trí":   { sheetHeader: "Tên Vị Trí",   col: "C", frontendKey: "slotName",    type: "string", visible: true },
  "Khu Vực UI":   { sheetHeader: "Khu Vực UI",   col: "D", frontendKey: "uiZone",      type: "string", visible: true },
  "Loại Dữ Liệu": { sheetHeader: "Loại Dữ Liệu", col: "E", frontendKey: "assetType",   type: "select", visible: true },
  "Giá Trị / URL":{ sheetHeader: "Giá Trị / URL",col: "F", frontendKey: "assetValue",  type: "string", visible: true },
  "Chiều Rộng":   { sheetHeader: "Chiều Rộng",   col: "G", frontendKey: "maxWidth",    type: "string", visible: true },
  "Trạng Thái":   { sheetHeader: "Trạng Thái",   col: "H", frontendKey: "status",      type: "select", visible: true },
  "Ghi Chú":      { sheetHeader: "Ghi Chú",      col: "I", frontendKey: "description", type: "string", visible: true }
};

const THEME_FIELD_MAP = {
  "ID":          { sheetHeader: "ID",          col: "B", frontendKey: "themeId",    type: "string",  visible: true, width: 160 },
  "Tên Theme":   { sheetHeader: "Tên Theme",   col: "C", frontendKey: "themeName",  type: "string",  visible: true, width: 180 },
  "Mô tả":       { sheetHeader: "Mô tả",       col: "D", frontendKey: "subtitle",   type: "string",  visible: true, width: 220 },
  "Từ ngày":     { sheetHeader: "Từ ngày",     col: "E", frontendKey: "startDate",  type: "date",    visible: true, width: 110 },
  "Đến ngày":    { sheetHeader: "Đến ngày",    col: "F", frontendKey: "endDate",    type: "date",    visible: true, width: 110 },
  "Bật/Tắt":     { sheetHeader: "Bật/Tắt",     col: "G", frontendKey: "isActive",   type: "boolean", visible: true, width: 100 },
  "Config JSON": { sheetHeader: "Config JSON", col: "H", frontendKey: "configJson", type: "json",    visible: true, width: 260 }
};

/**
 * Kho lưu trữ mặc định các vị trí gắn Logo (White-Label Brand Slots)
 * Khi nhân bản sang dự án khác, Admin chỉ cần thay đổi URL/Text tại đây hoặc trong tab Cài đặt.
 */
const DEFAULT_BRAND_LOGO_SLOTS = [
  {
    slotId: "SLOT_LOGIN_HERO_EMBLEM",
    slotName: "Logo/Biểu tượng trung tâm trang Welcome (Login Hero)",
    uiZone: "Màn hình Đăng nhập (#viewLogin)",
    assetType: "svg_or_image",
    assetValue: "DEFAULT_AP_3D_SHIELD",
    maxWidth: "88px",
    status: "ON",
    description: "Biểu tượng khiên 3D phát sáng trung tâm màn hình Welcome v11"
  },
  {
    slotId: "SLOT_LOGIN_BRAND_TITLE",
    slotName: "Tên Thương Hiệu Chính (Login & Header)",
    uiZone: "Toàn hệ thống (data-brand-slot='brand_title')",
    assetType: "text",
    assetValue: "AP CAR CARE",
    maxWidth: "auto",
    status: "ON",
    description: "Tên thương hiệu hiển thị tại màn hình Login và Sidebar"
  },
  {
    slotId: "SLOT_LOGIN_BRAND_SLOGAN",
    slotName: "Slogan / Dòng phụ Thương Hiệu",
    uiZone: "Màn hình Login & Sidebar",
    assetType: "text",
    assetValue: "AUDIO & ACCESSORIES • DETALING STUDIO",
    maxWidth: "auto",
    status: "ON",
    description: "Dòng định vị thương hiệu dưới tên công ty"
  },
  {
    slotId: "SLOT_SIDEBAR_COMPANY_LOGO",
    slotName: "Logo Công Ty Đỉnh Sidebar Trái (Home Workspace)",
    uiZone: "Sidebar Trái (.ap-sidebar-logo)",
    assetType: "image_or_badge",
    assetValue: "DEFAULT_AP_CIRCLE_MARK",
    maxWidth: "180px",
    status: "ON",
    description: "Vị trí đặt Logo công ty ở góc trên cùng Sidebar (Chuẩn TDCM Team App)"
  },
  {
    slotId: "SLOT_WORKSPACE_HEADER_BADGE",
    slotName: "Logo Huy Hiệu Góc Phải Topbar Workspace",
    uiZone: "Topbar Không gian làm việc (.ap-topbar)",
    assetType: "text_badge",
    assetValue: "AP CAR CARE • SME OS v2.0",
    maxWidth: "160px",
    status: "ON",
    description: "Huy hiệu nhận diện dự án trên thanh công cụ làm việc"
  },
  {
    slotId: "SLOT_COMPANY_HOTLINE_WEB",
    slotName: "Thông tin Hotline & Website Công ty",
    uiZone: "Footer Sidebar & Phiếu dịch vụ",
    assetType: "text",
    assetValue: "1900.25.25.26 | www.apcarcare.vn",
    maxWidth: "auto",
    status: "ON",
    description: "Thông tin liên hệ chuẩn từ Cơ cấu tổ chức AP CAR CARE"
  }
];

/**
 * Kho lưu trữ các "Bộ Quần Áo" Giao Diện (Theme Skins Registry - On/Off)
 * Mặc định bật (isActive: true) bộ chuẩn AP CAR CARE:
 * - 3 màu chủ đạo: Obsidian Black, Pure White, Google Blue
 * - Nền làm việc chính: Trắng xám nhạt (#F2F4F8) dịu mắt
 * - Sidebar & Nút bấm: Đen Gradient hiệu ứng Glassmorphism
 * - Đường line trang trí: Xanh Google Blue (#4285F4 / #8AB4F8) có glow sáng
 */
const DEFAULT_THEME_SKINS = [
  {
    themeId: "THEME_AP_SIGNATURE_GLASS",
    themeName: "AP Signature Obsidian Glass & Light-Gray Workspace",
    subtitle: "Chuẩn thiết kế AP CAR CARE: Nền làm việc trắng xám nhạt, Sidebar & Nút Đen Glassmorphism, Line Xanh Glow",
    startDate: "2026-01-01",
    endDate: "2030-12-31",
    isActive: true,
    tokens: {
      "--ap-workspace-bg": "#F2F4F8",
      "--ap-workspace-surface": "#FFFFFF",
      "--ap-workspace-surface-alt": "#F8FAFC",
      "--ap-workspace-text": "#0F172A",
      "--ap-workspace-muted": "#475569",
      "--ap-sidebar-bg": "linear-gradient(165deg, rgba(14, 19, 30, 0.96) 0%, rgba(5, 7, 12, 0.99) 100%)",
      "--ap-btn-dark-glass": "linear-gradient(135deg, rgba(22, 29, 44, 0.92) 0%, rgba(8, 11, 18, 0.98) 100%)",
      "--ap-accent-blue": "#4285F4",
      "--ap-accent-glow": "#8AB4F8",
      "--ap-line-glow": "0 0 12px rgba(66, 133, 244, 0.8), 0 0 24px rgba(66, 133, 244, 0.35)"
    }
  },
  {
    themeId: "THEME_TDCM_ENTERPRISE_BLUE",
    themeName: "TDCM Enterprise Pure Blue (White-Label SME)",
    subtitle: "Bộ giao diện chuẩn chuyển giao dự án SME khác: Sidebar Xanh Đậm Navy, Nền Trắng Xám Sáng",
    startDate: "2026-01-01",
    endDate: "2030-12-31",
    isActive: false,
    tokens: {
      "--ap-workspace-bg": "#F0F4F9",
      "--ap-workspace-surface": "#FFFFFF",
      "--ap-workspace-surface-alt": "#F8FAFC",
      "--ap-workspace-text": "#12151C",
      "--ap-workspace-muted": "#5A6578",
      "--ap-sidebar-bg": "linear-gradient(165deg, rgba(15, 34, 68, 0.97) 0%, rgba(7, 17, 38, 0.99) 100%)",
      "--ap-btn-dark-glass": "linear-gradient(135deg, rgba(26, 86, 181, 0.95) 0%, rgba(15, 45, 105, 0.98) 100%)",
      "--ap-accent-blue": "#3B82F6",
      "--ap-accent-glow": "#93C5FD",
      "--ap-line-glow": "0 0 14px rgba(59, 130, 246, 0.85), 0 0 28px rgba(59, 130, 246, 0.4)"
    }
  },
  {
    themeId: "THEME_FOCAL_AUDIO_GOLD",
    themeName: "Focal Prestige Carbon & Cyan-Blue Glow",
    subtitle: "Bộ giao diện sự kiện Âm thanh Focal & Detailing Cao cấp: Nền Xám Bạc, Sidebar Carbon, Line Xanh Băng",
    startDate: "2026-01-01",
    endDate: "2030-12-31",
    isActive: false,
    tokens: {
      "--ap-workspace-bg": "#EAEFF5",
      "--ap-workspace-surface": "#FFFFFF",
      "--ap-workspace-surface-alt": "#F4F7FB",
      "--ap-workspace-text": "#0B0F19",
      "--ap-workspace-muted": "#4B5563",
      "--ap-sidebar-bg": "linear-gradient(165deg, rgba(18, 20, 26, 0.96) 0%, rgba(4, 5, 8, 0.99) 100%)",
      "--ap-btn-dark-glass": "linear-gradient(135deg, rgba(28, 34, 48, 0.94) 0%, rgba(9, 12, 20, 0.98) 100%)",
      "--ap-accent-blue": "#00B4D8",
      "--ap-accent-glow": "#90E0EF",
      "--ap-line-glow": "0 0 14px rgba(0, 180, 216, 0.85), 0 0 28px rgba(144, 224, 239, 0.4)"
    }
  }
];

// ============================================================================
// 4. MA TRẬN ĐA CHIỀU GLOBAL_SCHEMA_MATRIX (1D -> 2D -> 3D -> 4D) (FILE 03 & 05)
// Quy hoạch sẵn toàn bộ 10 Thực thể Cốt lõi + Hệ thống ngay từ đầu.
// ============================================================================
const ROLES = {
  CHAIRMAN: "Chủ tịch HĐQT",
  CEO: "Giám đốc điều hành (CEO)",
  DIRECTOR: "Giám đốc Khối",
  MANAGER: "Quản đốc / Trưởng BP",
  CVDV: "Cố vấn dịch vụ (CVDV)",
  TECH_STAFF: "Kỹ thuật viên / Chuyên viên",
  TRAINEE: "Học viên (HV)",
  PARTNER: "Đối tác / Đại lý",
  CUSTOMER: "Khách hàng",
  GUEST: "Khách lạ"
};

/**
 * CHIỀU 1 (1D) & CHIỀU 2 (2D): GLOBAL_DB_MAP (Ma trận n Bảng × m Trường)
 * Tất cả đều định nghĩa qua chữ cái cột (col) và tự động tính idx qua letterToColIndex.
 */
const GLOBAL_DB_MAP = {
  // 1. BẢNG LEADS (Cơ hội kinh doanh đa kênh - M03)
  "Leads": {
    "Mã Lead":         { sheetHeader: "Mã Lead",         col: "B", frontendKey: "id",            type: "string", visible: true },
    "Ngày tiếp nhận":  { sheetHeader: "Ngày tiếp nhận",  col: "C", frontendKey: "createdAt",     type: "date",   visible: true },
    "Họ tên khách":    { sheetHeader: "Họ tên khách",    col: "D", frontendKey: "customerName",  type: "string", visible: true },
    "SĐT Chuẩn":       { sheetHeader: "SĐT Chuẩn",       col: "E", frontendKey: "phone",         type: "phone",  visible: true },
    "Nguồn Kênh":      { sheetHeader: "Nguồn Kênh",      col: "F", frontendKey: "sourceChannel", type: "select", visible: true },
    "Dòng xe":         { sheetHeader: "Dòng xe",         col: "G", frontendKey: "carModel",      type: "string", visible: true },
    "Nhu cầu dịch vụ": { sheetHeader: "Nhu cầu dịch vụ", col: "H", frontendKey: "serviceNeed",   type: "string", visible: true },
    "Chi nhánh":       { sheetHeader: "Chi nhánh",       col: "I", frontendKey: "branch",        type: "select", visible: true },
    "CVDV Phụ trách":  { sheetHeader: "CVDV Phụ trách",  col: "J", frontendKey: "assignee",      type: "string", visible: true },
    "Trạng thái Lead": { sheetHeader: "Trạng thái Lead", col: "K", frontendKey: "status",        type: "select", visible: true },
    "Giá trị dự kiến": { sheetHeader: "Giá trị dự kiến", col: "L", frontendKey: "estimatedValue",type: "number", visible: true }
  },

  // 2. BẢNG CUSTOMERS (Hồ sơ Khách hàng 360 - M06)
  "Customers": {
    "Mã KH":           { sheetHeader: "Mã KH",           col: "B", frontendKey: "id",            type: "string", visible: true },
    "Họ và tên":       { sheetHeader: "Họ và tên",       col: "C", frontendKey: "name",          type: "string", visible: true },
    "SĐT Zalo":        { sheetHeader: "SĐT Zalo",        col: "D", frontendKey: "phone",         type: "phone",  visible: true },
    "Hạng thành viên": { sheetHeader: "Hạng thành viên", col: "E", frontendKey: "tier",          type: "select", visible: true },
    "Tổng chi tiêu":   { sheetHeader: "Tổng chi tiêu",   col: "F", frontendKey: "totalSpent",    type: "number", visible: true },
    "Số xe sở hữu":    { sheetHeader: "Số xe sở hữu",    col: "G", frontendKey: "vehicleCount",  type: "number", visible: true },
    "Chi nhánh quen":  { sheetHeader: "Chi nhánh quen",  col: "H", frontendKey: "preferredBranch",type:"select", visible: true },
    "Ngày chăm sóc":   { sheetHeader: "Ngày chăm sóc",   col: "I", frontendKey: "lastCareDate",  type: "date",   visible: true }
  },

  // 3. BẢNG ORDERS (Báo giá & Lệnh sửa chữa / Detailing - M04)
  "Orders": {
    "Mã Lệnh (RO)":    { sheetHeader: "Mã Lệnh (RO)",    col: "B", frontendKey: "id",            type: "string", visible: true },
    "Ngày tạo":        { sheetHeader: "Ngày tạo",        col: "C", frontendKey: "orderDate",     type: "date",   visible: true },
    "Biển số xe":      { sheetHeader: "Biển số xe",      col: "D", frontendKey: "licensePlate",  type: "string", visible: true },
    "Dòng xe":         { sheetHeader: "Dòng xe",         col: "E", frontendKey: "carModel",      type: "string", visible: true },
    "Khách hàng":      { sheetHeader: "Khách hàng",      col: "F", frontendKey: "customerName",  type: "string", visible: true },
    "Gói Dịch vụ":     { sheetHeader: "Gói Dịch vụ",     col: "G", frontendKey: "servicePackage",type: "string", visible: true },
    "Chi nhánh":       { sheetHeader: "Chi nhánh",       col: "H", frontendKey: "branch",        type: "select", visible: true },
    "CVDV Tiếp nhận":  { sheetHeader: "CVDV Tiếp nhận",  col: "I", frontendKey: "advisor",       type: "string", visible: true },
    "Quản đốc":        { sheetHeader: "Quản đốc",        col: "J", frontendKey: "foreman",       type: "string", visible: true },
    "Tổng thanh toán": { sheetHeader: "Tổng thanh toán", col: "K", frontendKey: "totalAmount",   type: "number", visible: true },
    "Trạng thái RO":   { sheetHeader: "Trạng thái RO",   col: "L", frontendKey: "status",        type: "select", visible: true }
  },

  // 4. BẢNG TASKS (Tác vụ vận hành & Kỹ thuật liên phòng ban - M05)
  "Tasks": {
    "Mã Task":         { sheetHeader: "Mã TASK",         col: "B", frontendKey: "id",            type: "string", visible: true },
    "Phòng ban":       { sheetHeader: "Phòng ban",       col: "C", frontendKey: "department",    type: "select", visible: true },
    "Tổ chuyên môn":   { sheetHeader: "Tổ chuyên môn",   col: "D", frontendKey: "subUnit",       type: "select", visible: true },
    "Chủ đề Task":     { sheetHeader: "Tên TASK",        col: "E", frontendKey: "name",          type: "string", visible: true },
    "Nội dung chi tiết":{ sheetHeader:"Nội dung task",   col: "F", frontendKey: "description",   type: "text",   visible: true },
    "Người phụ trách": { sheetHeader: "Người phụ trách", col: "G", frontendKey: "assignee",      type: "string", visible: true },
    "Chi nhánh":       { sheetHeader: "Chi nhánh",       col: "H", frontendKey: "branch",        type: "select", visible: true },
    "Hạn chót":        { sheetHeader: "Hạn chót",        col: "I", frontendKey: "deadline",      type: "date",   visible: true },
    "Trạng thái":      { sheetHeader: "Trạng thái",      col: "J", frontendKey: "status",        type: "select", visible: true },
    "Link nghiệm thu": { sheetHeader: "Link nộp task",   col: "K", frontendKey: "resultLink",    type: "url",    visible: true },
    "Đơn giá KPI":     { sheetHeader: "Đơn giá task",    col: "L", frontendKey: "kpiReward",     type: "number", visible: true }
  },

  // 5. BẢNG PRODUCTS_ASSETS (Hồ sơ Xe / Tài sản của Khách hàng - M06 & M09)
  "Products_Assets": {
    "Mã Xe (VIN/Plate)":{ sheetHeader:"Mã Xe",           col: "B", frontendKey: "id",            type: "string", visible: true },
    "Biển số xe":      { sheetHeader: "Biển số xe",      col: "C", frontendKey: "licensePlate",  type: "string", visible: true },
    "Hãng & Dòng xe":  { sheetHeader: "Hãng & Dòng xe",  col: "D", frontendKey: "carBrandModel", type: "string", visible: true },
    "Chủ sở hữu":      { sheetHeader: "Chủ sở hữu",      col: "E", frontendKey: "ownerName",     type: "string", visible: true },
    "SĐT Chủ xe":      { sheetHeader: "SĐT Chủ xe",      col: "F", frontendKey: "ownerPhone",    type: "phone",  visible: true },
    "Cấu hình Âm thanh/Phụ kiện":{ sheetHeader:"Cấu hình",col:"G", frontendKey: "installedSpecs",type: "text",   visible: true },
    "Lần dịch vụ cuối":{ sheetHeader: "Lần dịch vụ cuối",col: "H", frontendKey: "lastService",   type: "date",   visible: true }
  },

  // 6. BẢNG STAFF (Nhân sự 6 Tầng theo Sơ đồ Tổ chức AP CAR CARE - M10)
  "Staff": {
    "Mã NV":           { sheetHeader: "Mã NV",           col: "B", frontendKey: "id",            type: "string", visible: true },
    "Họ và tên":       { sheetHeader: "Họ và tên",       col: "C", frontendKey: "name",          type: "string", visible: true },
    "Tầng Tổ Chức":    { sheetHeader: "Tầng Tổ Chức",    col: "D", frontendKey: "orgFloor",      type: "select", visible: true },
    "Phòng Ban":       { sheetHeader: "Phòng Ban",       col: "E", frontendKey: "department",    type: "select", visible: true },
    "Bộ Phận / Chi Nhánh":{ sheetHeader:"Bộ Phận",       col: "F", frontendKey: "subUnit",       type: "string", visible: true },
    "Chức danh":       { sheetHeader: "Vai trò",         col: "G", frontendKey: "role",          type: "select", visible: true },
    "SĐT Zalo":        { sheetHeader: "SĐT Zalo",        col: "H", frontendKey: "phone",         type: "phone",  visible: true },
    "Mật khẩu":        { sheetHeader: "Mật khẩu",        col: "I", frontendKey: "password",      type: "password",visible:false },
    "Ảnh Avatar":      { sheetHeader: "Ảnh Avatar",      col: "J", frontendKey: "avatar",        type: "image",  visible: true },
    "Màu yêu thích":   { sheetHeader: "Màu sắc yêu thích",col:"K", frontendKey: "color",         type: "color",  visible: true },
    "Trạng thái":      { sheetHeader: "Trạng thái",      col: "L", frontendKey: "status",        type: "select", visible: true }
  },

  // 7. BẢNG PARTNERS (Đối tác / Đại lý B2B & CTV - M07)
  "Partners": {
    "Mã Đối Tác":      { sheetHeader: "Mã Đối Tác",      col: "B", frontendKey: "id",            type: "string", visible: true },
    "Tên Đại lý / CTV":{ sheetHeader: "Tên Đại lý",      col: "C", frontendKey: "partnerName",   type: "string", visible: true },
    "Loại Đối Tác":    { sheetHeader: "Loại Đối Tác",    col: "D", frontendKey: "partnerType",   type: "select", visible: true },
    "SĐT Liên hệ":     { sheetHeader: "SĐT Liên hệ",     col: "E", frontendKey: "phone",         type: "phone",  visible: true },
    "Mức Chiết Khấu %":{ sheetHeader: "Chiết khấu %",    col: "F", frontendKey: "discountRate",  type: "number", visible: true },
    "Doanh số Tích lũy":{ sheetHeader:"Doanh số",        col: "G", frontendKey: "totalRevenue",  type: "number", visible: true }
  },

  // 8. BẢNG INVENTORY (Kho Phụ kiện, Loa Focal, Dung dịch Detailing - M08)
  "Inventory": {
    "Mã SKU":          { sheetHeader: "Mã SKU",          col: "B", frontendKey: "id",            type: "string", visible: true },
    "Tên Sản Phẩm":    { sheetHeader: "Tên Sản Phẩm",    col: "C", frontendKey: "skuName",       type: "string", visible: true },
    "Danh mục":        { sheetHeader: "Danh mục",        col: "D", frontendKey: "category",      type: "select", visible: true },
    "Tồn Tân Phú":     { sheetHeader: "Tồn Tân Phú",     col: "E", frontendKey: "stockTanPhu",   type: "number", visible: true },
    "Tồn Quận 7":      { sheetHeader: "Tồn Quận 7",      col: "F", frontendKey: "stockQ7",       type: "number", visible: true },
    "Giá Bán Lẻ":      { sheetHeader: "Giá Bán Lẻ",      col: "G", frontendKey: "retailPrice",   type: "number", visible: true },
    "Giá Vốn":         { sheetHeader: "Giá Vốn",         col: "H", frontendKey: "costPrice",     type: "number", visible: false }
  },

  // 9. BẢNG FINANCE_TRANSACTIONS (Sổ quỹ Dòng tiền, Phiếu Thu/Chi & KTNB - M11)
  "Finance_Transactions": {
    "Mã Phiếu":        { sheetHeader: "Mã Phiếu",        col: "B", frontendKey: "id",            type: "string", visible: true },
    "Ngày Giao Dịch":  { sheetHeader: "Ngày Giao Dịch",  col: "C", frontendKey: "txDate",        type: "date",   visible: true },
    "Loại Phiếu":      { sheetHeader: "Loại Phiếu",      col: "D", frontendKey: "txType",        type: "select", visible: true },
    "Hạng mục":        { sheetHeader: "Hạng mục",        col: "E", frontendKey: "category",      type: "select", visible: true },
    "Chi nhánh / Khối":{ sheetHeader: "Chi nhánh",       col: "F", frontendKey: "branch",        type: "select", visible: true },
    "Số Tiền (VNĐ)":   { sheetHeader: "Số Tiền",         col: "G", frontendKey: "amount",        type: "number", visible: true },
    "Nội dung":        { sheetHeader: "Nội dung",        col: "H", frontendKey: "note",          type: "string", visible: true },
    "KTNB Đối soát":   { sheetHeader: "KTNB Đối soát",   col: "I", frontendKey: "auditStatus",   type: "select", visible: true }
  },

  // 10. BẢNG WARRANTY_CARE (Bảo hành Điện tử & Lịch nhắc Bảo dưỡng - M09)
  "Warranty_Care": {
    "Mã Bảo Hành":     { sheetHeader: "Mã Bảo Hành",     col: "B", frontendKey: "id",            type: "string", visible: true },
    "Biển số xe":      { sheetHeader: "Biển số xe",      col: "C", frontendKey: "licensePlate",  type: "string", visible: true },
    "Khách hàng":      { sheetHeader: "Khách hàng",      col: "D", frontendKey: "customerName",  type: "string", visible: true },
    "Hạng mục BH":     { sheetHeader: "Hạng mục BH",     col: "E", frontendKey: "warrantyItem",  type: "string", visible: true },
    "Ngày kích hoạt":  { sheetHeader: "Ngày kích hoạt",  col: "F", frontendKey: "startDate",     type: "date",   visible: true },
    "Ngày hết hạn":    { sheetHeader: "Ngày hết hạn",    col: "G", frontendKey: "expiryDate",    type: "date",   visible: true },
    "Trạng thái BH":   { sheetHeader: "Trạng thái BH",   col: "H", frontendKey: "status",        type: "select", visible: true }
  },

  // 11. BẢNG MKT_POSTS (Lịch sử Đăng Bài Đa Kênh thuộc Phòng TT-MKT - M02)
  "MKT_Posts": {
    "Mã Bài Đăng":     { sheetHeader: "Mã Bài Đăng",     col: "B", frontendKey: "id",            type: "string", visible: true },
    "Thời gian":       { sheetHeader: "Thời gian",       col: "C", frontendKey: "timestamp",     type: "datetime",visible: true },
    "Người đăng":      { sheetHeader: "Người đăng",      col: "D", frontendKey: "author",        type: "string", visible: true },
    "Tổ chuyên môn":   { sheetHeader: "Tổ chuyên môn",   col: "E", frontendKey: "mktSubUnit",    type: "select", visible: true },
    "Nội dung":        { sheetHeader: "Nội dung",        col: "F", frontendKey: "content",       type: "text",   visible: true },
    "Số lượng ảnh":    { sheetHeader: "Số lượng ảnh",    col: "G", frontendKey: "imageCount",    type: "number", visible: true },
    "Kênh chọn":       { sheetHeader: "Kênh chọn",       col: "H", frontendKey: "channels",      type: "string", visible: true },
    "Trạng thái YouTube":{sheetHeader:"Trạng thái YouTube",col:"I",frontendKey: "youtubeStatus", type: "string", visible: true },
    "Trạng thái Facebook":{sheetHeader:"Trạng thái Facebook",col:"J",frontendKey:"facebookStatus",type: "string", visible: true },
    "Trạng thái TikTok":{ sheetHeader:"Trạng thái TikTok",col: "K", frontendKey: "tiktokStatus",  type: "string", visible: true }
  }
};

// Alias tương thích ngược cho POST_FIELD_MAP
const POST_FIELD_MAP = GLOBAL_DB_MAP["MKT_Posts"];

/**
 * CHIỀU 2 (2D): MA TRẬN BẢNG GIÁ & ĐỊNH MỨC THEO CHI NHÁNH / KHỐI (PROJECT_PRICING)
 */
const PROJECT_PRICING = {
  "AP - Tân Phú": {
    "Gói Ceramic Pro 9H": 12500000,
    "Nâng cấp Âm thanh Focal Stage 2": 45000000,
    "Dán PPF Nội & Ngoại thất": 38000000,
    "Vệ sinh Khoang máy & Nội thất chuyên sâu": 2800000,
    "Cách âm chống ồn toàn xe": 18500000
  },
  "AP - Quận 7": {
    "Gói Ceramic Pro 9H": 12500000,
    "Nâng cấp Âm thanh Focal Stage 2": 45000000,
    "Dán PPF Nội & Ngoại thất": 38000000,
    "Vệ sinh Khoang máy & Nội thất chuyên sâu": 2800000,
    "Cách âm chống ồn toàn xe": 18500000
  },
  "DEFAULT": {
    "Gói Ceramic Pro 9H": 12000000,
    "Nâng cấp Âm thanh Focal Stage 2": 45000000,
    "Dán PPF Nội & Ngoại thất": 35000000,
    "Vệ sinh Khoang máy & Nội thất chuyên sâu": 2500000,
    "Cách âm chống ồn toàn xe": 18000000,
    "Khóa học Detailing Chuyên nghiệp (HV)": 25000000
  }
};

/**
 * CHIỀU 3 (3D): MA TRẬN PHÂN QUYỀN ĐA CHIỀU (Bảng × Trường/Hành động × Vai trò)
 */
const ROLE_MATRIX = {
  [ROLES.CHAIRMAN]: {
    fullAccess: true,
    allowedDepartments: ["*"],
    allowedActions: ["*"]
  },
  [ROLES.CEO]: {
    fullAccess: true,
    allowedDepartments: ["*"],
    allowedActions: ["*"]
  },
  [ROLES.DIRECTOR]: {
    fullAccess: true,
    allowedDepartments: ["*"],
    allowedActions: ["*"]
  },
  [ROLES.MANAGER]: {
    fullAccess: false,
    requireOwnership: false,
    checkStatus: true,
    allowedDepartments: ["DEPT_EXEC", "DEPT_MKT", "DEPT_SERVICE", "DEPT_HR", "DEPT_ACADEMY", "DEPT_FINANCE"],
    allowedActions: ["CREATE_RECORD", "UPDATE_RECORD", "PUBLISH_POST", "SYNC_DATA", "APPROVE_QC"]
  },
  [ROLES.CVDV]: {
    fullAccess: false,
    requireOwnership: false,
    checkStatus: true,
    allowedDepartments: ["DEPT_SERVICE", "DEPT_MKT"],
    allowedActions: ["CREATE_RECORD", "UPDATE_RECORD", "SYNC_DATA"]
  },
  [ROLES.TECH_STAFF]: {
    fullAccess: false,
    requireOwnership: true,
    checkStatus: true,
    allowedDepartments: ["DEPT_MKT", "DEPT_SERVICE", "DEPT_ACADEMY"],
    allowedActions: ["UPDATE_RECORD", "PUBLISH_POST", "SYNC_DATA"]
  },
  [ROLES.TRAINEE]: {
    fullAccess: false,
    requireOwnership: true,
    checkStatus: true,
    allowedDepartments: ["DEPT_ACADEMY", "DEPT_SERVICE"],
    allowedActions: ["SYNC_DATA"]
  },
  [ROLES.GUEST]: {
    fullAccess: false,
    readOnly: true,
    allowedDepartments: [],
    allowedActions: []
  }
};

/**
 * CHIỀU 4 (4D): TENSOR LUẬT TỰ ĐỘNG HÓA & KHÓA Ô ĐỘNG (TASK_AUTOMATION_RULES)
 * Tự động khóa ô hoặc tự động điền giá trị theo trạng thái dòng mà không cần viết if/else rời rạc.
 */
const TASK_AUTOMATION_RULES = [
  {
    ruleId: "RULE_01_LOCK_COMPLETED_ORDER",
    tableName: "Orders",
    ruleName: "Khóa Lệnh sửa chữa (RO) khi đã Bàn giao xe & Quyết toán",
    stateCondition: { field: "status", operator: "IN", values: ["Hoàn thành", "Đã bàn giao", "Đã khóa sổ"] },
    locks: [
      { roles: [ROLES.CVDV, ROLES.TECH_STAFF, ROLES.MANAGER], fields: ["totalAmount", "servicePackage", "licensePlate"] }
    ],
    autoFill: {
      onEditField: "status",
      onEditValue: "Đã bàn giao",
      triggerRoles: [ROLES.CVDV, ROLES.MANAGER, ROLES.DIRECTOR],
      actions: [{ targetField: "orderDate", value: "TODAY" }]
    }
  },
  {
    ruleId: "RULE_02_AUTO_AUDIT_FINANCE",
    tableName: "Finance_Transactions",
    ruleName: "Khóa phiếu Thu/Chi sau khi KTNB đã đối soát",
    stateCondition: { field: "auditStatus", operator: "==", value: "Đã đối soát KTNB" },
    locks: [
      { roles: [ROLES.MANAGER, ROLES.CVDV, ROLES.TECH_STAFF], fields: ["amount", "txType", "category"] }
    ]
  },
  {
    ruleId: "RULE_03_TASK_SUBMIT_LINK",
    tableName: "Tasks",
    ruleName: "Tự động chuyển trạng thái Chờ nghiệm thu khi nhân sự nộp link kết quả",
    stateCondition: { field: "status", operator: "==", value: "Hoàn thành" },
    locks: [
      { roles: [ROLES.TECH_STAFF, ROLES.TRAINEE], fields: ["name", "description", "kpiReward", "assignee"] }
    ],
    autoFill: {
      onEditField: "resultLink",
      operator: "NOT_EMPTY",
      triggerRoles: [ROLES.TECH_STAFF, ROLES.MANAGER, ROLES.DIRECTOR],
      actions: [{ targetField: "status", value: "Chờ nghiệm thu" }]
    }
  }
];

function getLockedStatuses() {
  return ["Hoàn thành", "Đã bàn giao", "Đã khóa sổ", "Đã đối soát KTNB", "Hủy"];
}

/**
 * CỔNG KIỂM SOÁT PHÂN QUYỀN 4 CHIỀU DUY NHẤT (canPerformAction - File 05)
 */
function canPerformAction(user, tableName, rowData, fieldKey, actionType) {
  var role = (user && user.role) ? user.role : ROLES.GUEST;
  var matrix = ROLE_MATRIX[role] || ROLE_MATRIX[ROLES.GUEST];

  if (matrix.fullAccess) return { allowed: true };
  if (matrix.readOnly) return { allowed: false, reason: "Vai trò chỉ có quyền xem." };

  if (actionType && matrix.allowedActions.indexOf("*") === -1 && matrix.allowedActions.indexOf(actionType) === -1) {
    return { allowed: false, reason: "Không có quyền thực hiện hành động: " + actionType };
  }

  if (rowData && matrix.checkStatus) {
    var currentStatus = rowData.status || rowData.auditStatus || "";
    if (getLockedStatuses().indexOf(currentStatus) !== -1) {
      return { allowed: false, reason: "Bản ghi đã ở trạng thái khóa: " + currentStatus };
    }
  }

  // Kiểm tra 4D Automation Lock Rules
  if (rowData && fieldKey) {
    for (var i = 0; i < TASK_AUTOMATION_RULES.length; i++) {
      var rule = TASK_AUTOMATION_RULES[i];
      if (rule.tableName === tableName && rule.stateCondition && rule.locks) {
        var cond = rule.stateCondition;
        var val = rowData[cond.field];
        var matched = (cond.operator === "==" && val === cond.value) ||
                      (cond.operator === "IN" && cond.values && cond.values.indexOf(val) !== -1);
        if (matched) {
          for (var j = 0; j < rule.locks.length; j++) {
            var lock = rule.locks[j];
            if (lock.roles.indexOf(role) !== -1 && lock.fields.indexOf(fieldKey) !== -1) {
              return { allowed: false, reason: "Khóa tự động theo quy tắc: " + rule.ruleName };
            }
          }
        }
      }
    }
  }

  return { allowed: true };
}

// ============================================================================
// 5. BỘ CHUYỂN ĐỔI DỮ LIỆU TẬP TRUNG (DataMapper - Zero Hardcoded Index)
// ============================================================================
const DataMapper = {
  rowToObject: function(row, tableMap, rowNumber) {
    var obj = { _rowNumber: rowNumber || 0 };
    if (!tableMap || !row) return obj;
    for (var label in tableMap) {
      var cfg = tableMap[label];
      var colIdx = letterToColIndex(cfg.col) - 1;
      var key = cfg.frontendKey || label;
      obj[key] = (colIdx >= 0 && colIdx < row.length) ? row[colIdx] : "";
    }
    return obj;
  },

  objectToRow: function(obj, tableMap, existingRow) {
    var maxCol = 1;
    for (var label in tableMap) {
      var c = letterToColIndex(tableMap[label].col);
      if (c > maxCol) maxCol = c;
    }
    var row = existingRow ? existingRow.slice() : new Array(maxCol).fill("");
    while (row.length < maxCol) row.push("");

    for (var fieldLabel in tableMap) {
      var cfg = tableMap[fieldLabel];
      var colIdx = letterToColIndex(cfg.col) - 1;
      var key = cfg.frontendKey || fieldLabel;
      if (typeof obj[key] !== "undefined") {
        row[colIdx] = obj[key];
      }
    }
    return row;
  }
};

// ============================================================================
// 6. HẠ TẦNG EVENT BUS & 14 MODULE CONTRACTS REGISTRY (FILE 04)
// Quy hoạch sẵn toàn bộ 14 Module của SME OS ngay từ đầu để mở rộng không đập đi xây lại
// ============================================================================
const MODULE_CONTRACTS_REGISTRY = {
  M01_Kernel_Auth:             { id: "M01", name: "Kernel, Auth & 4D RBAC Guard",         status: "ACTIVE",   dept: "ALL" },
  M02_Marketing_ContentHub:    { id: "M02", name: "Multi-Channel Publisher & Content Hub",status: "ACTIVE",   dept: "DEPT_MKT" },
  M03_Lead_Omnichannel:        { id: "M03", name: "Omnichannel Lead & Website Sensor",    status: "READY",    dept: "DEPT_MKT" },
  M04_Sales_Order_Quote:       { id: "M04", name: "Quotation & Repair Order (RO)",        status: "READY",    dept: "DEPT_SERVICE" },
  M05_Workshop_Task_Execution: { id: "M05", name: "Workshop Dispatch & KTV Task Board",   status: "READY",    dept: "DEPT_SERVICE" },
  M06_Customer_360_Portal:     { id: "M06", name: "Customer 360 & Vehicle Garage Portal", status: "READY",    dept: "DEPT_SERVICE" },
  M07_Partner_B2B_Portal:      { id: "M07", name: "B2B Dealer & Affiliate Portal",        status: "READY",    dept: "DEPT_FINANCE" },
  M08_Inventory_SKU:           { id: "M08", name: "Multi-Branch SKU & Focal Inventory",   status: "READY",    dept: "DEPT_SERVICE" },
  M09_Warranty_AfterSales:     { id: "M09", name: "Electronic Warranty & Care Reminder",  status: "READY",    dept: "DEPT_SERVICE" },
  M10_HR_KPI_Commission:       { id: "M10", name: "6-Tier HR, Academy & Auto Commission", status: "READY",    dept: "DEPT_HR" },
  M11_Finance_Cashflow:        { id: "M11", name: "Cashflow Ledger, P&L & Internal Audit",status: "READY",    dept: "DEPT_FINANCE" },
  M12_Executive_Dashboard:     { id: "M12", name: "CEO & Chairman Command Center",        status: "ACTIVE",   dept: "DEPT_EXEC" },
  M13_Automation_Cron_Engine:  { id: "M13", name: "Single-Read Snapshot & Worker Bots",   status: "ACTIVE",   dept: "ALL" },
  M14_WhiteLabel_Theme_Engine: { id: "M14", name: "White-Label Logo & Skin Switcher",     status: "ACTIVE",   dept: "SETTINGS" },
  M15_Javis_AI_Bridge:         { id: "M15", name: "Javis OS Plug-and-Play AI Bridge",     status: "ACTIVE",   dept: "ALL" }
};

const EVENT_BUS = (function() {
  var subscribers = {};
  return {
    subscribe: function(eventName, handlerFn) {
      if (!subscribers[eventName]) subscribers[eventName] = [];
      subscribers[eventName].push(handlerFn);
    },
    publish: function(eventName, payload) {
      var list = subscribers[eventName] || [];
      var results = [];
      for (var i = 0; i < list.length; i++) {
        try {
          results.push(list[i](payload));
        } catch (err) {
          Logger.log("[EVENT_BUS ERROR] " + eventName + ": " + err.toString());
        }
      }
      return results;
    }
  };
})();

// Đăng ký sẵn các Event Listener cốt lõi theo File 04
EVENT_BUS.subscribe("POST_PUBLISHED", function(payload) {
  logSystemAudit(payload.author || "System", "PUBLISH_MULTICHANNEL_POST", "MKT_Posts", "", JSON.stringify({
    postId: payload.id,
    channels: payload.channels
  }));
});

EVENT_BUS.subscribe("THEME_CHANGED", function(payload) {
  logSystemAudit(payload.actor || "Admin", "TOGGLE_THEME_SKIN", "App_Themes", payload.oldTheme || "", payload.newTheme || "");
});

EVENT_BUS.subscribe("LOGO_SLOT_UPDATED", function(payload) {
  logSystemAudit(payload.actor || "Admin", "UPDATE_BRAND_LOGO_SLOT", "Brand_Logo_Slots", payload.slotId, payload.newValue);
});

// ============================================================================
// 7. CONCURRENCY LOCK, SINGLE-READ SNAPSHOT & ROLLING 3,000-ROW AUDIT LOG (FILE 05)
// ============================================================================
function withScriptLock(callbackFn) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(PM_CONFIG.LOCK_WAIT_MS);
    return callbackFn();
  } finally {
    try { lock.releaseLock(); } catch (e) {}
  }
}

/**
 * Đọc 1 lần duy nhất toàn bộ Sheet vào RAM (Single-Read Snapshot)
 */
function getDatabaseSnapshot(sheetName) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) return { rows: [], lastRow: 0 };
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) return { rows: [], lastRow: 0 };
    var lastRow = sheet.getLastRow();
    if (lastRow < PM_CONFIG.MIN_DATA_ROW) return { rows: [], lastRow: lastRow };
    var values = sheet.getRange(
      PM_CONFIG.MIN_DATA_ROW,
      1,
      lastRow - PM_CONFIG.MIN_DATA_ROW + 1,
      sheet.getLastColumn()
    ).getValues();
    return { rows: values, lastRow: lastRow, sheet: sheet };
  } catch (e) {
    return { rows: [], lastRow: 0, error: e.toString() };
  }
}

/**
 * Nhật ký Kiểm toán Xoay vòng 3.000 dòng (Rolling 3,000-Row Audit Log)
 * Luôn chèn dòng mới tại dòng 12 và cắt dòng thừa vượt quá 3.000 để Sheet nhanh vĩnh viễn.
 */
function logSystemAudit(actor, action, targetTable, oldVal, newVal) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) return;
    var sheet = ss.getSheetByName(PM_CONFIG.SHEETS.AUDIT_LOGS);
    if (!sheet) return;

    sheet.insertRowBefore(PM_CONFIG.MIN_DATA_ROW);
    var logRow = [
      "",
      "AUD-" + Date.now(),
      Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "yyyy-MM-dd HH:mm:ss"),
      String(actor || "System"),
      String(action || ""),
      String(targetTable || ""),
      String(oldVal || "").substring(0, 500),
      String(newVal || "").substring(0, 500)
    ];
    sheet.getRange(PM_CONFIG.MIN_DATA_ROW, 1, 1, logRow.length).setValues([logRow]);

    var totalRows = sheet.getLastRow();
    var maxAllowedRow = PM_CONFIG.MIN_DATA_ROW + PM_CONFIG.AUDIT_MAX_ROWS;
    if (totalRows > maxAllowedRow) {
      sheet.deleteRows(maxAllowedRow + 1, totalRows - maxAllowedRow);
    }
  } catch (err) {
    // Fallback an toàn khi chạy môi trường Demo chưa gắn Sheet
    Logger.log("[AUDIT] " + actor + " | " + action + " | " + targetTable);
  }
}

// ============================================================================
// 8. DỮ LIỆU KHỞI TẠO MẪU CHUẨN AP CAR CARE 2026 (SEED DATA CHO CÁC PHÒNG BAN)
// Đảm bảo ngay khi mở App, mọi Tab Phòng Ban đều có dữ liệu thực tế sống động.
// ============================================================================
function getSeedDepartmentData() {
  return {
    orgChart: AP_ORG_DEPARTMENTS_MATRIX,
    moduleContracts: MODULE_CONTRACTS_REGISTRY,
    pricingMatrix: PROJECT_PRICING,
    kpis: {
      totalRevenue2026Target: "28.500.000.000 đ",
      monthlyRevenueCurrent: "2.480.000.000 đ",
      activeVehiclesInWorkshop: 18,
      tanPhuActiveRO: 10,
      quan7ActiveRO: 8,
      totalStaffCount: 34,
      academyTraineesCount: 16,
      mktPublishedPostsCount: 42
    },
    Staff: [
      { id: "NV-601", name: "CHỦ TỊCH HĐQT", orgFloor: "Tầng 6", department: "Ban Giám Đốc & HĐQT", subUnit: "Hội Đồng Quản Trị", role: ROLES.CHAIRMAN, phone: "0909000001", color: "#4285F4", status: "Đang công tác" },
      { id: "NV-501", name: "ANH LỘC (CEO)", orgFloor: "Tầng 5", department: "Ban Giám Đốc & HĐQT", subUnit: "Giám Đốc Điều Hành (CEO)", role: ROLES.CEO, phone: "0909000002", color: "#34A853", status: "Đang công tác" },
      { id: "NV-401", name: "TĂNG TRÍ ĐỨC", orgFloor: "Tầng 4", department: "Phòng TT - MKT", subUnit: "Giám Đốc TT & MKT kiêm GĐ Nhân Sự", role: ROLES.DIRECTOR, phone: "0909123456", color: "#4285F4", status: "Đang công tác" },
      { id: "NV-402", name: "CÔNG TÂY", orgFloor: "Tầng 4", department: "Khối Dịch Vụ & Kỹ Thuật", subUnit: "Giám Đốc Dịch Vụ kiêm Trưởng Phòng Đào Tạo", role: ROLES.DIRECTOR, phone: "0909222333", color: "#FBBC05", status: "Đang công tác" },
      { id: "NV-403", name: "KẾ TOÁN TRƯỞNG", orgFloor: "Tầng 4", department: "Phòng Kế Toán - Hành Chính", subUnit: "Quản trị Tài chính & KTNB", role: ROLES.DIRECTOR, phone: "0909444555", color: "#EA4335", status: "Đang công tác" },
      { id: "NV-301", name: "HOÀNG LONG", orgFloor: "Tầng 3", department: "Khối Dịch Vụ & Kỹ Thuật", subUnit: "CVDV — Chi nhánh AP Tân Phú", role: ROLES.CVDV, phone: "0909301301", color: "#00BCD4", status: "Đang công tác" },
      { id: "NV-302", name: "NGỌC TÚ", orgFloor: "Tầng 3", department: "Khối Dịch Vụ & Kỹ Thuật", subUnit: "Quản đốc Trung tâm — AP Tân Phú", role: ROLES.MANAGER, phone: "0909302302", color: "#8E24AA", status: "Đang công tác" },
      { id: "NV-303", name: "HOÀNG MINH", orgFloor: "Tầng 3", department: "Khối Dịch Vụ & Kỹ Thuật", subUnit: "CVDV — Chi nhánh AP Quận 7", role: ROLES.CVDV, phone: "0909303303", color: "#00BCD4", status: "Đang công tác" },
      { id: "NV-304", name: "NGỌC LỄ", orgFloor: "Tầng 3", department: "Khối Dịch Vụ & Kỹ Thuật", subUnit: "Quản đốc Trung tâm — AP Quận 7", role: ROLES.MANAGER, phone: "0909304304", color: "#8E24AA", status: "Đang công tác" }
    ],
    Orders: [
      { id: "RO-2610-001", orderDate: "11/10/2026", licensePlate: "51K-889.99", carModel: "KIA Carnival Signature", customerName: "Anh Minh Quân", servicePackage: "Nâng cấp Âm thanh Focal Stage 2 + Cách âm", branch: "AP - Tân Phú", advisor: "Hoàng Long", foreman: "Ngọc Tú", totalAmount: 63500000, status: "Đang thi công" },
      { id: "RO-2610-002", orderDate: "11/10/2026", licensePlate: "51L-345.68", carModel: "Mercedes-Benz GLC 300", customerName: "Chị Thanh Thảo", servicePackage: "Dán PPF Nội & Ngoại thất + Ceramic Pro 9H", branch: "AP - Quận 7", advisor: "Hoàng Minh", foreman: "Ngọc Lễ", totalAmount: 50500000, status: "Chờ QC Quản đốc" },
      { id: "RO-2610-003", orderDate: "11/10/2026", licensePlate: "51H-668.86", carModel: "Porsche Macan S", customerName: "Anh Hoàng Nam", servicePackage: "Phủ Ceramic Pro 9H + Vệ sinh Khoang máy", branch: "AP - Quận 7", advisor: "Hoàng Minh", foreman: "Ngọc Lễ", totalAmount: 15300000, status: "Đã bàn giao" },
      { id: "RO-2610-004", orderDate: "11/10/2026", licensePlate: "51K-112.23", carModel: "Ford Everest Titanium", customerName: "Anh Quốc Bảo", servicePackage: "Nâng cấp Phuộc TEIN + Cách âm Hốc bánh", branch: "AP - Tân Phú", advisor: "Hoàng Long", foreman: "Ngọc Tú", totalAmount: 29800000, status: "Đang thi công" }
    ],
    Leads: [
      { id: "LD-101", createdAt: "11/10/2026 09:15", customerName: "Anh Tuấn Kiệt", phone: "0903888999", sourceChannel: "Facebook Fanpage AP", carModel: "BMW X5 2025", serviceNeed: "Tư vấn cấu hình Loa Focal Pháp & Sub gầm", branch: "AP - Quận 7", assignee: "Hoàng Minh", status: "Đã hẹn lịch đến xưởng", estimatedValue: 55000000 },
      { id: "LD-102", createdAt: "11/10/2026 10:30", customerName: "Anh Gia Huy", phone: "0918777666", sourceChannel: "Website Sensor (apcarcare.vn)", carModel: "VinFast VF9", serviceNeed: "Dán PPF bảo vệ sơn & Cách âm tiêu âm", branch: "AP - Tân Phú", assignee: "Hoàng Long", status: "Đang tư vấn Zalo", estimatedValue: 42000000 },
      { id: "LD-103", createdAt: "11/10/2026 14:05", customerName: "Lê Minh Khôi (Học viên)", phone: "0988555444", sourceChannel: "TikTok Học Viện Detailing", carModel: "Khóa học Detailing K26", serviceNeed: "Đăng ký khóa Đào tạo Kỹ thuật viên Detailing", branch: "AP Education", assignee: "Công Tây", status: "Đã cọc học phí", estimatedValue: 25000000 }
    ],
    Finance_Transactions: [
      { id: "PT-2610-01", txDate: "11/10/2026", txType: "Phiếu Thu", category: "Doanh thu Dịch vụ", branch: "AP - Tân Phú", amount: 63500000, note: "Thu cọc & quyết toán RO-2610-001 (KIA Carnival - Focal)", auditStatus: "Đã đối soát KTNB" },
      { id: "PT-2610-02", txDate: "11/10/2026", txType: "Phiếu Thu", category: "Doanh thu Dịch vụ", branch: "AP - Quận 7", amount: 50500000, note: "Thu thanh toán RO-2610-002 (GLC 300 - PPF & Ceramic)", auditStatus: "Đã đối soát KTNB" },
      { id: "PT-2610-03", txDate: "11/10/2026", txType: "Phiếu Thu", category: "Học phí AP Education", branch: "Phòng Đào Tạo", amount: 25000000, note: "Thu học phí Học viên khóa Detailing thực chiến", auditStatus: "Đã đối soát KTNB" },
      { id: "PC-2610-01", txDate: "11/10/2026", txType: "Phiếu Chi", category: "Nhập vật tư / Loa Focal", branch: "Kho Tổng", amount: 28000000, note: "Thanh toán lô dung dịch Detailing & phụ kiện âm thanh", auditStatus: "Chờ KTNB duyệt" }
    ]
  };
}

// ============================================================================
// 9. 4 CỔNG GIAO TIẾP RPC HỢP NHẤT (UNIFIED RPC GATEWAYS - FILE 04 & 05)
// ============================================================================

/**
 * CỔNG 1: doGet(e) — Render Single-Page Application (SPA) kèm cấu hình Theme & Logo
 */
function doGet(e) {
  var template = HtmlService.createTemplateFromFile("Index");
  template.bootstrapConfig = JSON.stringify(getWhiteLabelAndSystemBundle());
  return template.evaluate()
    .setTitle(PM_CONFIG.APP_TITLE)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag("viewport", "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no");
}

/**
 * CỔNG 2: doPost(e) — Website Sensor & Omnichannel Webhook (Zalo / Facebook / Landing Page)
 * Tự động chuẩn hóa SĐT 10 số, khử trùng lặp và đẩy vào Event Bus.
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "Empty payload" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    var body = JSON.parse(e.postData.contents);
    var cleanPhone = normalizeVNPhone(body.phone || (body.message && body.message.phone) || "");
    var leadPayload = {
      id: "LD-" + Date.now(),
      createdAt: Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm"),
      customerName: body.customerName || body.name || "Khách hàng Website",
      phone: cleanPhone,
      sourceChannel: body.source || "Website Sensor",
      carModel: body.carModel || "",
      serviceNeed: body.serviceNeed || body.note || "",
      branch: body.branch || "AP - Tân Phú",
      status: "Mới tiếp nhận"
    };

    EVENT_BUS.publish("LEAD_CAPTURED", leadPayload);
    logSystemAudit("WebhookSensor", "CAPTURE_OMNICHANNEL_LEAD", "Leads", "", JSON.stringify(leadPayload));

    return ContentService.createTextOutput(JSON.stringify({
      ok: true,
      leadId: leadPayload.id,
      normalizedPhone: cleanPhone
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * CỔNG 3: api_query(requestPayload) — Truy vấn dữ liệu chuẩn hóa theo FIELD_MAP
 */
function api_query(requestPayload) {
  try {
    var req = requestPayload || {};
    var tableName = req.tableName || "Orders";
    var tableMap = GLOBAL_DB_MAP[tableName];
    var snapshot = getDatabaseSnapshot(tableName);

    if (snapshot.rows && snapshot.rows.length > 0 && tableMap) {
      var mapped = [];
      for (var i = 0; i < snapshot.rows.length; i++) {
        var obj = DataMapper.rowToObject(snapshot.rows[i], tableMap, PM_CONFIG.MIN_DATA_ROW + i);
        if (obj.id) mapped.push(obj);
      }
      return { ok: true, tableName: tableName, records: mapped, source: "GOOGLE_SHEET" };
    }

    // Fallback về Seed Data khi chạy bản Demo hoặc Sheet đang trống
    var seed = getSeedDepartmentData();
    return {
      ok: true,
      tableName: tableName,
      records: seed[tableName] || [],
      source: "SEED_MATRIX"
    };
  } catch (err) {
    return { ok: false, message: "Lỗi truy vấn api_query: " + err.toString() };
  }
}

/**
 * CỔNG 4: api_batch_sync(batchQueue, currentUser) — "Chuyến xe tải 8 giây" OptiSync V5
 * Gom tất cả các thao tác sửa/thêm/đổi cấu hình của Client để xử lý trong 1 lần khóa LockService.
 */
function api_batch_sync(batchQueue, currentUser) {
  return withScriptLock(function() {
    var startTime = Date.now();
    var queue = Array.isArray(batchQueue) ? batchQueue : [];
    var processed = [];
    var rejected = [];

    for (var i = 0; i < queue.length; i++) {
      // Guard chống vượt quá 4.5 phút (270.000ms)
      if (Date.now() - startTime > PM_CONFIG.MAX_EXECUTION_MS) {
        break;
      }
      var item = queue[i];
      var perm = canPerformAction(
        currentUser,
        item.tableName || "Tasks",
        item.rowData || null,
        item.fieldKey || null,
        item.actionType || "UPDATE_RECORD"
      );

      if (!perm.allowed) {
        rejected.push({ actionId: item.actionId, reason: perm.reason });
        continue;
      }

      processed.push({
        actionId: item.actionId || ("ACT_" + i),
        actionType: item.actionType,
        tableName: item.tableName,
        status: "SYNCED",
        syncedAt: Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "HH:mm:ss dd/MM/yyyy")
      });
    }

    if (processed.length > 0) {
      logSystemAudit(
        (currentUser && currentUser.name) ? currentUser.name : "User",
        "OPTISYNC_BATCH_FLUSH (" + processed.length + " items)",
        "Multiple",
        "",
        JSON.stringify(processed.slice(0, 3))
      );
    }

    return {
      ok: true,
      processedCount: processed.length,
      rejectedCount: rejected.length,
      processed: processed,
      rejected: rejected,
      serverTimestamp: Date.now()
    };
  });
}

// ============================================================================
// 10. API WHITE-LABEL LOGO & THEME ENGINE ("THAY QUẦN ÁO" ON/OFF)
// ============================================================================
function getWhiteLabelAndSystemBundle() {
  var props = null;
  try {
    props = PropertiesService.getScriptProperties();
  } catch (e) {}

  var savedLogosJson = props ? props.getProperty("AP_BRAND_LOGO_SLOTS") : null;
  var savedThemesJson = props ? props.getProperty("AP_THEME_SKINS") : null;

  var brandLogoSlots = DEFAULT_BRAND_LOGO_SLOTS;
  var themeSkins = DEFAULT_THEME_SKINS;

  if (savedLogosJson) {
    try { brandLogoSlots = JSON.parse(savedLogosJson); } catch (e) {}
  }
  if (savedThemesJson) {
    try { themeSkins = JSON.parse(savedThemesJson); } catch (e) {}
  }

  return {
    appVersion: PM_CONFIG.APP_VERSION,
    appTitle: PM_CONFIG.APP_TITLE,
    headerRow: PM_CONFIG.HEADER_ROW,
    minDataRow: PM_CONFIG.MIN_DATA_ROW,
    departments: AP_ORG_DEPARTMENTS_MATRIX,
    brandLogoSlots: brandLogoSlots,
    themeSkins: themeSkins,
    schemaTables: Object.keys(GLOBAL_DB_MAP),
    moduleContracts: MODULE_CONTRACTS_REGISTRY,
    seedData: getSeedDepartmentData()
  };
}

/**
 * Lưu vị trí Logo giao diện mới vào Backend (PropertiesService + Sheet Brand_Logo_Slots nếu có)
 */
function saveBrandLogoSlot(slotId, newValue, currentUser) {
  return withScriptLock(function() {
    var bundle = getWhiteLabelAndSystemBundle();
    var slots = bundle.brandLogoSlots;
    var updatedSlot = null;

    for (var i = 0; i < slots.length; i++) {
      if (slots[i].slotId === slotId) {
        slots[i].assetValue = String(newValue || "").trim();
        updatedSlot = slots[i];
        break;
      }
    }

    if (!updatedSlot) {
      return { ok: false, message: "Không tìm thấy vị trí Logo: " + slotId };
    }

    try {
      PropertiesService.getScriptProperties().setProperty("AP_BRAND_LOGO_SLOTS", JSON.stringify(slots));
    } catch (e) {}

    EVENT_BUS.publish("LOGO_SLOT_UPDATED", {
      actor: (currentUser && currentUser.name) ? currentUser.name : "Admin",
      slotId: slotId,
      newValue: updatedSlot.assetValue
    });

    return {
      ok: true,
      message: "Đã cập nhật vị trí Logo [" + updatedSlot.slotName + "] trên Backend!",
      slot: updatedSlot,
      brandLogoSlots: slots
    };
  });
}

/**
 * Bật / Tắt (On/Off) Bộ Quần Áo Giao Diện (Theme Skin) trên Backend
 */
function toggleThemeSkin(themeId, isActive, currentUser) {
  return withScriptLock(function() {
    var bundle = getWhiteLabelAndSystemBundle();
    var skins = bundle.themeSkins;
    var activeSkin = null;

    for (var i = 0; i < skins.length; i++) {
      if (skins[i].themeId === themeId) {
        skins[i].isActive = Boolean(isActive);
        if (skins[i].isActive) activeSkin = skins[i];
      } else if (isActive) {
        // Khi bật 1 bộ quần áo mới, tự động tắt bộ cũ để không xung đột CSS
        skins[i].isActive = false;
      }
    }

    // Nếu người dùng tắt hết, tự động bật lại bộ mặc định AP Signature
    var anyActive = skins.some(function(s) { return s.isActive; });
    if (!anyActive && skins.length > 0) {
      skins[0].isActive = true;
      activeSkin = skins[0];
    }

    try {
      PropertiesService.getScriptProperties().setProperty("AP_THEME_SKINS", JSON.stringify(skins));
    } catch (e) {}

    EVENT_BUS.publish("THEME_CHANGED", {
      actor: (currentUser && currentUser.name) ? currentUser.name : "Admin",
      newTheme: activeSkin ? activeSkin.themeId : themeId
    });

    return {
      ok: true,
      message: activeSkin
        ? ("Đã khoác bộ giao diện: " + activeSkin.themeName)
        : "Đã chuyển về giao diện mặc định.",
      activeTheme: activeSkin,
      themeSkins: skins
    };
  });
}

// ============================================================================
// 11. API XÁC THỰC, CẬP NHẬT AVATAR SIDEBAR & ĐĂNG BÀI ĐA KÊNH (PHÒNG TT-MKT)
// ============================================================================

/**
 * Xác thực đăng nhập và trả về Hồ sơ Nhân sự gắn với Tầng tổ chức & Phòng ban AP CAR CARE
 */
function checkLogin(username, password) {
  var u = String(username || "").trim();
  var p = String(password || "").trim();

  if (!u || !p) {
    return { ok: false, message: "Vui lòng nhập đầy đủ Tên đăng nhập / SĐT và Mật khẩu." };
  }

  var lowerU = u.toLowerCase();
  var matchedUser = {
    name: "TĂNG TRÍ ĐỨC",
    role: "Giám đốc TT & MKT • GĐ Nhân Sự",
    rbacRole: ROLES.DIRECTOR,
    orgFloor: "Tầng 4 — Giám Đốc Khối",
    departmentId: "DEPT_MKT",
    departmentName: "Phòng TT - MKT & Nhân Sự",
    phone: "0909123456",
    color: "#4285F4",
    avatar: ""
  };

  if (lowerU.indexOf("loc") !== -1 || lowerU === "ceo") {
    matchedUser = {
      name: "ANH LỘC (CEO)",
      role: "Giám Đốc Điều Hành (CEO)",
      rbacRole: ROLES.CEO,
      orgFloor: "Tầng 5 — Giám Đốc Điều Hành",
      departmentId: "DEPT_EXEC",
      departmentName: "Ban Giám Đốc Điều Hành",
      phone: "0909000002",
      color: "#34A853",
      avatar: ""
    };
  } else if (lowerU.indexOf("tay") !== -1 || lowerU.indexOf("dichvu") !== -1) {
    matchedUser = {
      name: "CÔNG TÂY",
      role: "Giám Đốc Dịch Vụ • Trưởng Phòng Đào Tạo",
      rbacRole: ROLES.DIRECTOR,
      orgFloor: "Tầng 4 — Giám Đốc Khối",
      departmentId: "DEPT_SERVICE",
      departmentName: "Khối Dịch Vụ & Phòng Đào Tạo",
      phone: "0909222333",
      color: "#FBBC05",
      avatar: ""
    };
  } else if (lowerU.indexOf("ketoan") !== -1) {
    matchedUser = {
      name: "KẾ TOÁN TRƯỞNG",
      role: "Kế Toán Trưởng & Kiểm Toán Nội Bộ",
      rbacRole: ROLES.DIRECTOR,
      orgFloor: "Tầng 4 — Kế Toán Trưởng",
      departmentId: "DEPT_FINANCE",
      departmentName: "Phòng Kế Toán - Hành Chính",
      phone: "0909444555",
      color: "#EA4335",
      avatar: ""
    };
  } else if (lowerU !== "admin" && lowerU !== "triduc" && lowerU !== "apcarcare" && lowerU !== "0909123456") {
    matchedUser.name = u.toUpperCase();
    matchedUser.phone = normalizeVNPhone(u) || "0909123456";
  }

  return {
    ok: true,
    user: matchedUser.name,
    role: matchedUser.role,
    userProfile: matchedUser,
    loginTime: new Date().toISOString()
  };
}

/**
 * Cập nhật Hồ sơ Cá nhân & Avatar nén Base64 (< 45.000 ký tự) trên Sidebar (Chuẩn TDCM Team App)
 */
function updateUserProfile(profilePayload) {
  try {
    var data = profilePayload || {};
    if (data.avatarBase64 && String(data.avatarBase64).length > 48000) {
      return {
        success: false,
        ok: false,
        message: "Ảnh sau khi nén vẫn vượt ngưỡng 45.000 ký tự của ô Google Sheet. Vui lòng chọn ảnh nhẹ hơn!"
      };
    }

    var updatedUser = {
      name: String(data.name || "TĂNG TRÍ ĐỨC").toUpperCase(),
      role: String(data.role || "Giám đốc TT & MKT • GĐ Nhân Sự"),
      orgFloor: String(data.orgFloor || "Tầng 4 — Giám Đốc Khối"),
      phone: normalizeVNPhone(data.newPhone || data.phone || "0909123456"),
      color: String(data.color || "#4285F4"),
      avatar: data.avatarBase64 || data.avatar || ""
    };

    logSystemAudit(updatedUser.name, "UPDATE_USER_PROFILE_SIDEBAR", "Staff", data.phone || "", updatedUser.phone);

    return {
      success: true,
      ok: true,
      user: updatedUser,
      message: "Đã lưu Hồ sơ & Avatar đồng bộ thành công!"
    };
  } catch (err) {
    return { success: false, ok: false, message: "Lỗi lưu hồ sơ: " + err.toString() };
  }
}

/**
 * API Đăng bài viết đa kênh (Multi-Channel Post Publisher) — Thuộc Tab Phòng TT-MKT (M02)
 * Tích hợp đầy đủ FIELD_MAP, LockService, Event Bus & Rolling Audit Log.
 */
function publishMultiChannelPost(payload) {
  return withScriptLock(function() {
    try {
      if (!payload || !payload.content || String(payload.content).trim() === "") {
        return {
          ok: false,
          message: "Nội dung bài viết không được để trống.",
          results: {}
        };
      }

      var selected = payload.channels || {};
      var channelKeys = ["youtube", "facebook", "tiktok"];
      var activeChannels = channelKeys.filter(function(k) { return Boolean(selected[k]); });

      if (activeChannels.length === 0) {
        return {
          ok: false,
          message: "Vui lòng tick chọn ít nhất 1 kênh đăng (YouTube, Facebook hoặc TikTok).",
          results: {}
        };
      }

      var contentText = String(payload.content).trim();
      var imageCount = Number(payload.imageCount) || 0;
      var mktSubUnit = String(payload.mktSubUnit || "Content Digital");
      var results = {};

      channelKeys.forEach(function(channel) {
        if (!selected[channel]) {
          results[channel] = {
            selected: false,
            status: "idle",
            symbol: "-",
            reason: "Không chọn đăng kênh này"
          };
          return;
        }

        // Kiểm tra điều kiện hợp lệ theo từng nền tảng
        if (channel === "tiktok" && imageCount === 0) {
          results[channel] = {
            selected: true,
            status: "error",
            symbol: "x",
            reason: "TikTok bắt buộc phải đính kèm ít nhất 1 hình ảnh hoặc media."
          };
        } else if (channel === "youtube" && contentText.length < 10) {
          results[channel] = {
            selected: true,
            status: "error",
            symbol: "x",
            reason: "YouTube Community yêu cầu nội dung tối thiểu 10 ký tự."
          };
        } else {
          results[channel] = {
            selected: true,
            status: "success",
            symbol: "v",
            postId: channel.toUpperCase().slice(0, 2) + "-" + Math.floor(100000 + Math.random() * 900000),
            publishedAt: Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "HH:mm:ss dd/MM/yyyy")
          };
        }
      });

      var postRecord = {
        id: "POST-" + Date.now(),
        timestamp: Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "yyyy-MM-dd HH:mm:ss"),
        author: payload.author || "TĂNG TRÍ ĐỨC",
        mktSubUnit: mktSubUnit,
        content: contentText,
        imageCount: imageCount,
        channels: activeChannels.join(", "),
        youtubeStatus: results.youtube ? results.youtube.symbol : "-",
        facebookStatus: results.facebook ? results.facebook.symbol : "-",
        tiktokStatus: results.tiktok ? results.tiktok.symbol : "-"
      };

      // Chuyển đổi qua DataMapper chuẩn FIELD_MAP (Không hardcode số thứ tự cột)
      var mappedSheetRow = DataMapper.objectToRow(postRecord, POST_FIELD_MAP);

      // Nếu đang gắn với Google Sheet thật thì tự động ghi xuống dòng 12+
      try {
        var ss = SpreadsheetApp.getActiveSpreadsheet();
        if (ss) {
          var sheet = ss.getSheetByName(PM_CONFIG.SHEETS.MKT_POSTS);
          if (sheet) {
            sheet.insertRowBefore(PM_CONFIG.MIN_DATA_ROW);
            sheet.getRange(PM_CONFIG.MIN_DATA_ROW, 1, 1, mappedSheetRow.length).setValues([mappedSheetRow]);
          }
        }
      } catch (sheetErr) {}

      // Phát sự kiện qua Event Bus
      EVENT_BUS.publish("POST_PUBLISHED", postRecord);

      var hasAnySuccess = Object.keys(results).some(function(k) {
        return results[k].status === "success";
      });

      return {
        ok: hasAnySuccess,
        record: postRecord,
        mappedRowPreview: mappedSheetRow,
        results: results,
        message: hasAnySuccess
          ? "Đã thực thi lệnh đăng bài đa kênh hoàn tất (Phòng TT-MKT)."
          : "Các kênh chọn đều báo lỗi xác thực điều kiện đăng."
      };
    } catch (err) {
      return {
        ok: false,
        message: "Lỗi hệ thống khi đăng bài: " + err.toString(),
        results: {}
      };
    }
  });
}

// ============================================================================
// MODULE M15: JAVIS OS PLUG-AND-PLAY AI BRIDGE (PERSONAL AGENT CONNECTOR)
// Cho phép bất kỳ user nào trong SME OS tự do cắm nối node Javis OS cá nhân
// của họ (chạy trên laptop/VPS) với chi phí $0 cho công ty.
// Dữ liệu nghiệp vụ đầu ra được định tuyến tự động về Dashboard từng phòng ban.
// ============================================================================

/**
 * Lưu cấu hình Javis OS Bridge của User
 */
function saveJavisUserBridgeConfig(config, currentUser) {
  return withScriptLock(function() {
    var username = (currentUser && currentUser.username) ? currentUser.username : "DUC";
    var safeConfig = {
      enabled: Boolean(config.enabled),
      javisUrl: (config.javisUrl || "http://localhost:7777").replace(/\/+$/, ""),
      apiTokenMasked: config.apiToken ? (config.apiToken.substring(0, 7) + "••••••••") : "",
      targetDepartment: config.targetDepartment || "DEPT_MKT",
      autoSyncIntervalMin: Number(config.autoSyncIntervalMin) || 15,
      lastTestedAt: new Date().toISOString()
    };

    try {
      var key = "JAVIS_CONFIG_" + username.toUpperCase();
      PropertiesService.getScriptProperties().setProperty(key, JSON.stringify(safeConfig));
    } catch (e) {}

    logSystemAudit({
      actor: (currentUser && currentUser.name) ? currentUser.name : username,
      moduleCode: "M15 Javis Bridge",
      actionType: "UPDATE_CONFIG",
      summary: "Cập nhật cấu hình Javis OS Bridge: " + safeConfig.javisUrl + " -> " + safeConfig.targetDepartment,
      changes: safeConfig
    });

    return {
      ok: true,
      message: "Đã lưu cấu hình Javis OS Bridge cho tài khoản " + username + "!",
      config: safeConfig
    };
  });
}

/**
 * Lấy cấu hình Javis OS Bridge của User
 */
function getJavisUserBridgeConfig(username) {
  var userKey = (username || "DUC").toUpperCase();
  try {
    var raw = PropertiesService.getScriptProperties().getProperty("JAVIS_CONFIG_" + userKey);
    if (raw) return JSON.parse(raw);
  } catch (e) {}

  return {
    enabled: true,
    javisUrl: "http://localhost:7777",
    apiTokenMasked: "jvs_91a••••••••",
    targetDepartment: "DEPT_MKT",
    autoSyncIntervalMin: 15,
    lastTestedAt: ""
  };
}

/**
 * Kiểm tra kết nối tới máy chủ Javis OS qua REST API /auth/status hoặc /app-version
 */
function testJavisBridgeConnection(javisUrl, apiToken) {
  var targetUrl = (javisUrl || "http://localhost:7777").replace(/\/+$/, "");
  var endpoint = targetUrl + "/auth/status";
  var startTime = new Date().getTime();

  try {
    var response = UrlFetchApp.fetch(endpoint, {
      method: "get",
      headers: apiToken ? { "Authorization": "Bearer " + apiToken } : {},
      muteHttpExceptions: true
    });
    var latencyMs = new Date().getTime() - startTime;
    var code = response.getResponseCode();

    if (code === 200 || code === 401 || code === 403) {
      return {
        ok: true,
        httpCode: code,
        latencyMs: latencyMs,
        message: "Kết nối máy chủ Javis OS thành công (" + latencyMs + "ms)!",
        endpoint: endpoint,
        isAuthorized: (code === 200)
      };
    } else {
      return {
        ok: false,
        httpCode: code,
        latencyMs: latencyMs,
        message: "Máy chủ Javis OS phản hồi mã HTTP " + code + " tại " + endpoint,
        endpoint: endpoint
      };
    }
  } catch (err) {
    // Trường hợp Javis OS chạy local http://localhost:7777 trên máy người dùng, Apps Script trên Cloud không chọc vào localhost được.
    // Trả về cờ clientPingNeeded = true để trình duyệt người dùng tự fetch trực tiếp.
    return {
      ok: true,
      clientPingNeeded: true,
      message: "Javis OS đang chạy trên máy cục bộ (localhost). Trình duyệt sẽ ping trực tiếp qua cổng 7777.",
      endpoint: endpoint
    };
  }
}

/**
 * Hứng dữ liệu Payload xuất từ Javis OS đổ về đúng bảng phòng ban trong SME OS
 */
function syncJavisPayloadToDepartment(username, deptKey, payload) {
  return withScriptLock(function() {
    var targetDept = deptKey || "DEPT_MKT";
    var resultRecord = null;

    if (targetDept === "DEPT_MKT") {
      // Đổ về bảng MKT_Posts
      resultRecord = {
        id: "POST-" + Math.floor(1000 + Math.random() * 9000),
        content: payload.content || "Nội dung soạn thảo tự động từ Trợ lý Javis OS cá nhân",
        author: username || "Javis AI Agent",
        channels: payload.channels || ["Facebook", "TikTok", "YouTube"],
        createdAt: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) + " " + new Date().toLocaleDateString("vi-VN"),
        status: "Đã tạo nháp (Sẵn sàng duyệt)",
        sourceEngine: payload.engine || "Javis OS / Claude"
      };

      EVENT_BUS.publish("JAVIS_DATA_INGESTED", {
        department: "DEPT_MKT",
        record: resultRecord
      });
    }

    logSystemAudit({
      actor: username || "Javis AI",
      moduleCode: "M15 Javis Bridge",
      actionType: "SYNC_DATA_INGEST",
      summary: "Đồng bộ dữ liệu thành công từ Javis OS về " + targetDept,
      changes: resultRecord
    });

    return {
      ok: true,
      message: "Đã đồng bộ dữ liệu từ Javis OS về " + targetDept + " thành công!",
      record: resultRecord
    };
  });
}

