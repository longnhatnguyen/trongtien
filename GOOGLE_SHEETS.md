# Lưu lời chúc & xác nhận tham dự vào Google Sheets

GitHub Pages chỉ phục vụ file tĩnh, không ghi được file. Google Sheets đóng vai trò "file lưu" miễn phí.

1. Vào https://sheets.new → tạo Sheet mới, đặt tên ví dụ `Khách cưới Tiến Hương`.
2. Menu **Tiện ích mở rộng → Apps Script**.
3. Xoá code mẫu, dán toàn bộ nội dung file `google-apps-script.gs`.
4. (Không cần mã riêng: trang guests.html dùng chung GitHub token với trang Quản trị.)
5. Bấm **Lưu** (💾).
6. **Triển khai → Tùy chọn triển khai mới** → bánh răng chọn **Ứng dụng web**:
   - Thực thi dưới dạng: **Tôi**
   - Người có quyền truy cập: **Bất kỳ ai**
   - Bấm **Triển khai** → **Cấp quyền truy cập** → chọn tài khoản → *Nâng cao* → *Đi tới ... (không an toàn)* → **Cho phép**.
7. Copy **URL ứng dụng web** (dạng `https://script.google.com/macros/s/.../exec`).
8. Mở `admin.html` → mục **Kết nối Google Sheets** → dán URL → **Lưu & đăng lên**.
9. Mở `guests.html` (đã đăng nhập admin thì tự vào, nếu chưa thì nhập GitHub token) → xem danh sách.

Khách gửi lời chúc / RSVP trên thiệp sẽ thêm 1 dòng vào tab `LoiChuc` / `XacNhan` của Sheet.

> Sửa code Apps Script sau này: **Triển khai → Quản lý triển khai → ✏️ → Phiên bản: Mới → Triển khai** (URL giữ nguyên).
