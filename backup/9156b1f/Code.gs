/**
 * APP AP CAR CARE - BACKEND CONTROLLER (Google Apps Script)
 * Tech Stack: Google Apps Script V8 Engine + Google Sheets
 * Database Sheet ID: 1ziGRRq92AxX9BnDMYbHF-iES7XskALCaOK6LeUw_IS0
 */

const APP_CONFIG = {
  appName: "AP CAR CARE AUDIO & ACCESSORIES",
  sheetId: "1ziGRRq92AxX9BnDMYbHF-iES7XskALCaOK6LeUw_IS0",
  version: "1.0.0-MVP"
};

/**
 * FIELD_MAP Chuẩn hóa Dữ liệu Người Dùng (Theo quy định GLOBAL-RULES)
 */
const USER_FIELD_MAP = {
  username: { sheetHeader: "Tên đăng nhập", col: "A", idx: 0, frontendKey: "username", type: "string" },
  password: { sheetHeader: "Mật khẩu",     col: "B", idx: 1, frontendKey: "password", type: "string" },
  fullName: { sheetHeader: "Họ và tên",    col: "C", idx: 2, frontendKey: "fullName", type: "string" },
  role:     { sheetHeader: "Phân quyền",   col: "D", idx: 3, frontendKey: "role",     type: "string" }, // Khách hàng | Kỹ thuật | Đại lý
  branch:   { sheetHeader: "Chi nhánh",    col: "E", idx: 4, frontendKey: "branch",   type: "string" }, // Q7 | Tân Phú | Toàn quốc
  phone:    { sheetHeader: "Số điện thoại",col: "F", idx: 5, frontendKey: "phone",    type: "string" }
};

/**
 * Khởi tạo Web App
 */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile("Index")
    .setTitle("AP CAR CARE - Audio & Accessories")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag("viewport", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no");
}

/**
 * API Xác thực Đăng nhập từ Frontend
 * @param {Object} credentials - { username, password }
 * @returns {Object} { success: boolean, message: string, user?: Object }
 */
function checkLogin(credentials) {
  try {
    if (!credentials || !credentials.username || !credentials.password) {
      return { success: false, message: "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!" };
    }

    const uInput = credentials.username.toString().trim().toLowerCase();
    const pInput = credentials.password.toString().trim();

    // Kiểm tra tài khoản Quản trị viên / Product Owner đặc quyền
    if ((uInput === "duc" && pInput === "1111") || (uInput === "admin" && pInput === "apcar2026")) {
      return {
        success: true,
        message: "Đăng nhập thành công với quyền Product Owner!",
        user: {
          username: "DUC",
          fullName: "Tăng Trí Đức",
          role: "Product Owner / Quản Trị Viên AP",
          branch: "Toàn quốc"
        }
      };
    }

    // Mở Sheet Backend
    const ss = SpreadsheetApp.openById(APP_CONFIG.sheetId);
    let userSheet = ss.getSheetByName("Users") || ss.getSheetByName("NguoiDung") || ss.getSheetByName("Tài khoản");

    // Nếu chưa tạo sheet Users, cung cấp thông báo
    if (!userSheet) {
      return {
        success: false,
        message: "Hệ thống đang khởi tạo bảng người dùng. Vui lòng đăng nhập với tài khoản: DUC / 1111!"
      };
    }

    const data = userSheet.getDataRange().getValues();
    if (data.length <= 1) {
      return { success: false, message: "Chưa có dữ liệu người dùng trong bảng tính!" };
    }

    // Quét dòng với FIELD_MAP
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const sheetUser = (row[USER_FIELD_MAP.username.idx] || "").toString().trim().toLowerCase();
      const sheetPass = (row[USER_FIELD_MAP.password.idx] || "").toString().trim();

      if (sheetUser === uInput && sheetPass === pInput) {
        return {
          success: true,
          message: "Đăng nhập thành công!",
          user: {
            username: row[USER_FIELD_MAP.username.idx],
            fullName: row[USER_FIELD_MAP.fullName.idx] || "Thành Viên AP",
            role: row[USER_FIELD_MAP.role.idx] || "Khách hàng",
            branch: row[USER_FIELD_MAP.branch.idx] || "Q7"
          }
        };
      }
    }

    return { success: false, message: "Tên đăng nhập hoặc mật khẩu không chính xác!" };
  } catch (err) {
    return { success: false, message: "Lỗi kết nối máy chủ Google Sheets: " + err.message };
  }
}

/**
 * FIELD_MAP Chuẩn hóa Bài Đăng Đa Kênh (Theo quy định GLOBAL-RULES)
 */
const POST_FIELD_MAP = {
  id:        { sheetHeader: "Mã bài viết",    col: "A", idx: 0, frontendKey: "id",        type: "string" },
  content:   { sheetHeader: "Nội dung",       col: "B", idx: 1, frontendKey: "content",   type: "string" },
  imageCount:{ sheetHeader: "Số lượng ảnh",   col: "C", idx: 2, frontendKey: "imageCount",type: "number" },
  channels:  { sheetHeader: "Kênh đã chọn",   col: "D", idx: 3, frontendKey: "channels",  type: "string" },
  status:    { sheetHeader: "Trạng thái",     col: "E", idx: 4, frontendKey: "status",    type: "string" },
  author:    { sheetHeader: "Người đăng",     col: "F", idx: 5, frontendKey: "author",    type: "string" },
  createdAt: { sheetHeader: "Thời gian đăng", col: "G", idx: 6, frontendKey: "createdAt", type: "datetime" }
};

/**
 * API Đăng bài đa kênh (YouTube, Facebook, TikTok)
 * @param {Object} postData - { content, imageCount, channels, author }
 * @returns {Object} { success: boolean, message: string, results: Object }
 */
function publishMultiChannelPost(postData) {
  try {
    if (!postData || !postData.content || !postData.channels || postData.channels.length === 0) {
      return { success: false, message: "Vui lòng nhập nội dung bài viết và chọn ít nhất 1 kênh đăng!" };
    }

    const postId = "POST-" + Utilities.formatDate(new Date(), "GMT+7", "yyyyMMdd-HHmmss");
    const results = {};
    postData.channels.forEach(ch => {
      // Mô phỏng kết nối API đa kênh
      results[ch] = {
        success: true,
        channel: ch,
        publishedAt: Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd HH:mm:ss")
      };
    });

    return {
      success: true,
      message: "Đã xuất bản thành công lên " + postData.channels.length + " kênh!",
      postId: postId,
      results: results
    };
  } catch (err) {
    return { success: false, message: "Lỗi xử lý đăng bài đa kênh: " + err.message };
  }
}

/**
 * Lấy cấu hình hệ thống
 */
function getAppConfig() {
  return APP_CONFIG;
}

