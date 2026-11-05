# 💍 Thiệp Mời Cưới Trọng Tiến & Thu Hương (Graceful-04)

> **Website thiệp cưới điện tử trực tuyến cao cấp**, được thiết kế riêng cho cặp đôi **Chú rể Trọng Tiến & Cô dâu Thu Hương** dựa trên nền tảng mẫu **Graceful-04 (Một Đời)** với bộ ảnh cưới mới tinh tế, nhạc nền acoustic ngọt ngào, hiệu ứng rèm mở hoàng gia và toàn bộ tính năng tương tác thông minh.

---

## ✨ Điểm Nổi Bật & Tính Năng

1. 💌 **Hiệu ứng Mở rèm Hoàng gia (Opening Curtains)**: Rèm thiệp mạ vàng mở đôi sang hai bên khi tải trang, mang lại cảm giác mở phong bì thư sang trọng.
2. 👤 **Cá nhân hóa Khách mời thông minh qua URL**:
   - Thêm tham số `?to=Tên_Khách_Mời` hoặc `?guest=Tên_Khách_Mời`.
   - Ví dụ: `http://localhost:3000/?to=Anh+Tuấn+%26+Gia+Đình`
   - Thiệp sẽ tự động in trang trọng: *"Thân mời: Anh Tuấn & Gia Đình"* và tự động điền sẵn tên vào form RSVP.
3. 🎵 **Trình phát Nhạc Đĩa Than Nổi (Floating Vinyl Disc)**:
   - Bài hát: Nhạc cưới acoustic lãng mạn (*Cùng Anh*).
   - Tự động bắt đầu ngay từ giây thứ 7 (vào thẳng điệp khúc).
   - Đĩa than quay 33 RPM kèm hiệu ứng sóng âm (soundwaves) nhảy múa, có nút toggle bật/tắt nổi.
4. ⏳ **Bộ đếm ngược thời gian thực (Countdown Timer)**:
   - Đếm ngược chính xác Ngày - Giờ - Phút - Giây đến hôn lễ ngày **07.03.2027**.
   - Logo Monogram tên viết tắt lồng ghép nghệ thuật: **T & H** (*Tiến & Hương*).
5. 💒 **Chuyển đổi Lịch trình Nhà Trai / Nhà Gái (Side Switcher)**:
   - **Nhà gái (Thu Hương)**: Lễ Vu Quy (07:00 - 07.03.2027) & Tiệc Cưới (17:00 - 06.03.2026) tại *Khoái Châu, Hưng Yên*.
   - **Nhà trai (Trọng Tiến)**: Lễ Thành Hôn (10:00 - 07.03.2027) & Tiệc Cưới (18:00 - 06.03.2026) tại *Đại Thanh, Hà Nội*.
   - Nút dẫn đường trực tiếp Google Maps tương ứng từng vị trí.
6. 📖 **Chuyện tình yêu (Love Story Timeline)**:
   - 5 mốc thời gian đáng nhớ của Tiến & Hương: *Gặp nhau (2022)*, *Lời tỏ tình (Thu 2023)*, *Những ngày yêu nhau (2024–2025)*, *Lời cầu hôn (12/2025)*, và *Ngày chung đôi (07.03.2027)*.
7. 🎞️ **Bộ ảnh cưới mới & Cuộn phim nghệ thuật (Film Roll & Lightbox)**:
   - Bộ ảnh cưới mới độ phân giải cao mang phong cách sang trọng, hiện đại.
   - Click vào bất kỳ bức ảnh nào trong lưới ảnh hoặc cuộn phim để mở **Lightbox phóng to toàn màn hình** (hỗ trợ phím Mũi tên trái/phải, nút Next/Prev và phím ESC).
8. ✍️ **Sổ lưu bút trực tiếp (Live Guestbook)**:
   - Khách mời gửi lời chúc -> Lời chúc xuất hiện ngay lập tức trên bảng lưu bút kèm hiệu ứng bắn pháo hoa giấy (confetti)!
   - Dữ liệu lưu trữ bền vững qua `localStorage` (tải lại trang không mất).
9. 💌 **Xác nhận tham dự (RSVP Form)**:
   - Chọn trạng thái (*Tôi sẽ đến / Rất tiếc, tôi bận*), Phe khách (*Nhà trai / Nhà gái*), Bộ đếm số người tham dự (*[-] 1 [+]*).
   - Gửi xác nhận hiển thị thông báo cảm ơn trang trọng.
10. 🎁 **Hộp mừng cưới thông minh (VietQR Banking)**:
    - Nhấn vào Hộp Quà để mở modal mừng cưới.
    - Tab **Chú rể (Trọng Tiến)**: Mã QR MB Bank + Chủ TK `NGUYEN TRONG TIEN` + Nút sao chép 1 chạm.
    - Tab **Cô dâu (Thu Hương)**: Mã QR Vietcombank + Chủ TK `TRAN THU HUONG` + Nút sao chép 1 chạm.
11. 🌸 **Hiệu ứng thị giác Cánh hoa hồng rơi & Bụi vàng (Canvas Particles)**:
    - 22 cánh hoa và bụi vàng lượn sóng tự nhiên 60fps trên nền trang web.

---

## 🚀 Hướng Dẫn Chạy & Xem Thiệp

### Cách 1: Mở trực tiếp (Không cần cài đặt gì)
- Click đúp vào file `index.html` để mở trong trình duyệt Chrome, Edge, Safari hoặc Firefox.

### Cách 2: Chạy qua Local Server tích hợp (Khuyên dùng để trải nghiệm âm thanh mượt nhất)
Trong thư mục dự án, chạy lệnh:
```bash
node server.js
```
Truy cập:
- Trang chủ: [http://localhost:3000](http://localhost:3000)
- Mẫu thiệp cá nhân hóa khách mời: [http://localhost:3000/?to=Anh+Tuấn+%26+Gia+Đình](http://localhost:3000/?to=Anh+Tuấn+%26+Gia+Đình)
