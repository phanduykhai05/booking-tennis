# TennisHub – Use Case và yêu cầu phi chức năng

> Tài liệu đặc tả nghiệp vụ dùng chung cho frontend (`client`) và backend
> (`server`). Trong workspace hiện tại, hai phần này nằm trong cùng một Git
> monorepo; mỗi phần giữ một bản `CASE.md` để có thể đọc độc lập.

## 1. Thông tin chung

| Thuộc tính | Giá trị |
|---|---|
| Sản phẩm | TennisHub – hệ thống tìm và đặt sân thể thao |
| Phiên bản tài liệu | 1.1 |
| Ngày cập nhật | 2026-08-24 |
| Đối tượng sử dụng | Khách chưa đăng nhập, khách hàng, quản trị viên |
| Frontend | Expo (React Native) SDK 54, expo-router, TypeScript — app cho người dùng, Expo Web cho quản trị |
| Backend | NestJS, Prisma, PostgreSQL |
| Múi giờ nghiệp vụ | UTC+07:00 (`Asia/Ho_Chi_Minh`/`Asia/Bangkok`) |
| Tiền tệ | Việt Nam đồng (VND) |

### 1.1. Mục tiêu

TennisHub cho phép người chơi tìm địa điểm/sân thể thao, xem lịch trống,
đặt khung giờ và theo dõi lịch đã đặt. Quản trị viên quản lý sân, lịch tại
quầy, khách hàng, thanh toán và số liệu vận hành/doanh thu.

### 1.2. Quy ước trạng thái phạm vi

- **Đang có**: đã có màn hình/API hoặc đã được mô hình hóa trong code hiện tại.
- **Cần bổ sung**: yêu cầu nghiệp vụ cần triển khai để hoàn thiện sản phẩm;
  không được coi là đã hỗ trợ chỉ vì đã nêu trong tài liệu.
- **Ưu tiên P0**: bắt buộc để vận hành an toàn.
- **Ưu tiên P1**: cần cho bản phát hành chính thức.
- **Ưu tiên P2**: cải tiến sau khi MVP ổn định.

## 2. Phạm vi và tác nhân

### 2.1. Tác nhân

| Tác nhân | Mô tả | Quyền chính |
|---|---|---|
| Khách vãng lai | Người chưa đăng nhập | Xem bộ môn, danh sách sân, bản đồ, chi tiết và lịch trống |
| Khách hàng | Người đã đăng nhập | Đặt/huỷ lịch của mình, thanh toán, xem lịch, hồ sơ và thông báo |
| Quản trị viên (ADMIN) | Nhân sự vận hành hệ thống | Quản lý sân, đặt tại quầy, lịch, thanh toán, khách hàng và báo cáo |
| Cổng thanh toán | Hệ thống bên thứ ba (khi tích hợp) | Tạo giao dịch, redirect/webhook và xác nhận kết quả thanh toán |
| PostgreSQL | Kho dữ liệu hệ thống | Lưu tài khoản, sân, lịch, giao dịch, thông báo và nhật ký |

> Phiên bản hiện tại chỉ có vai trò `ADMIN` và `USER`. Chủ sân/nhân viên
> riêng là hướng mở rộng; chưa được coi là một role độc lập.

### 2.2. Nền tảng chạy

Cả hai phía dùng chung một codebase Expo trong `client/`.

| Phía | Nền tảng | Cách chạy | Ghi chú |
|---|---|---|---|
| Người dùng | App Android / iOS | Expo Go hoặc development build | Thiết kế cho màn hình điện thoại |
| Quản trị | Trình duyệt (Expo Web) | `pnpm web`, đường dẫn `/admin` | Có thể mở trên app nhưng bảng dữ liệu tối ưu cho màn rộng |

Ràng buộc kéo theo:

- Expo Go chỉ chạy được project cùng SDK với chính nó; project chốt SDK 54 theo
  bản Expo Go mới nhất mà App Store còn phát hành cho thiết bị của nhóm.
- App gọi API bằng IP LAN hoặc domain thật, không dùng `localhost`.
- App native không bị CORS; chỉ bản web admin cần origin nằm trong `CORS_ORIGIN`.
- Mã chỉ chạy được trên trình duyệt (`window`, `document`, API PWA) phải nằm trong
  file `*.web.tsx` kèm bản native trả về `null`.

### 2.3. Ngoài phạm vi của tài liệu

- Điều phối nhân sự, chấm công hoặc quản lý kho vật tư.
- Tính lương, kế toán thuế và xuất hoá đơn điện tử.
- Thuật toán ghép người chơi, giải đấu và bảng xếp hạng chuyên sâu.
- Tích hợp một nhà cung cấp thanh toán cụ thể nếu chưa có thông tin hợp đồng/API.

## 3. Mô hình nghiệp vụ và quy tắc chung

1. Một `Venue` là một địa điểm; một địa điểm có một hoặc nhiều `Court`.
2. Lịch đặt gắn với `venueId`, `courtId`, ngày, `startMinute`, `endMinute`,
   người đặt, giá và trạng thái thanh toán.
3. Giờ trong ngày được truyền dưới dạng số phút từ 00:00; ngày truyền dạng
   `YYYY-MM-DD`. Không dùng UTC để suy ra “hôm nay” trên giao diện nghiệp vụ.
4. Một khung giờ không được giao nhau với booking chưa huỷ hoặc `CourtBlock`
   loại `LOCKED`/`EVENT`.
5. Sân `INACTIVE` hoặc `MAINTENANCE` không cho đặt. Venue không hoạt động cũng
   không xuất hiện trong kết quả đặt mới.
6. Giá phải được tính ở server theo bảng giá và thời lượng; client chỉ hiển thị
   kết quả server trả về, không được là nguồn sự thật về giá.
7. `totalPrice` của booking là giá tại thời điểm đặt và phải được lưu lại để
   đối soát, không tự thay đổi khi quản trị viên sửa bảng giá sau đó.
8. Booking online bắt đầu ở `PENDING` và `UNPAID`; chỉ khi có quy trình thanh
   toán hợp lệ mới chuyển sang `CONFIRMED`/`PAID` theo chính sách vận hành.
9. Huỷ lịch phải giải phóng khung giờ. Booking `COMPLETED` không được huỷ.
10. Người dùng chỉ đọc/sửa/huỷ dữ liệu thuộc tài khoản mình; ADMIN mới được
    đọc dữ liệu vận hành tổng thể và thay đổi dữ liệu quản trị.
11. Mọi thay đổi booking, court và payment quan trọng phải tạo activity/audit
    event có thời gian, tác nhân, đối tượng và nội dung thay đổi.
12. Thời gian mở/đóng cửa và ngày đặt phải được kiểm tra ở backend, không tin
    vào dữ liệu hoặc giới hạn do client gửi lên.

## 4. Danh sách use case chính

| Mã | Use case | Tác nhân | Ưu tiên | Phạm vi hiện tại |
|---|---|---|---|---|
| UC-01 | Xem bộ môn và danh sách sân | Khách, khách hàng | P0 | Đang có |
| UC-02 | Đăng ký tài khoản | Khách | P0 | Đang có |
| UC-03 | Đăng nhập/đăng xuất và duy trì phiên | Khách hàng, ADMIN | P0 | Đang có |
| UC-04 | Quên và đặt lại mật khẩu | Khách hàng | P1 | Đang có, mã trả trực tiếp ở dev |
| UC-05 | Tìm kiếm, lọc, xem bản đồ và chi tiết sân | Khách, khách hàng | P0 | Đang có |
| UC-06 | Xem lịch trống theo ngày | Khách, khách hàng | P0 | Đang có |
| UC-07 | Đặt một hoặc nhiều khung giờ | Khách hàng | P0 | Đang có |
| UC-08 | Xem, theo dõi và huỷ lịch đã đặt | Khách hàng, ADMIN | P0 | Đang có |
| UC-09 | Thanh toán booking | Khách hàng, ADMIN, cổng thanh toán | P0 | Trạng thái/admin có; online cần bổ sung |
| UC-10 | Nhận và đọc thông báo | Khách hàng | P1 | Đang có |
| UC-11 | Quản lý hồ sơ cá nhân | Khách hàng | P1 | Đang có |
| UC-12 | Xem dashboard vận hành | ADMIN | P1 | Đang có |
| UC-13 | Quản lý địa điểm, sân và giá | ADMIN | P0 | Sân có; venue/bảng giá chi tiết cần bổ sung |
| UC-14 | Tạo booking tại quầy | ADMIN | P0 | Đang có |
| UC-15 | Quản lý trạng thái booking | ADMIN | P0 | Đang có |
| UC-16 | Đối soát và cập nhật thanh toán | ADMIN | P0 | Đang có |
| UC-17 | Quản lý trạng thái khách hàng | ADMIN | P1 | Đang có |
| UC-18 | Báo cáo doanh thu và công suất sân | ADMIN | P0 | Tổng hợp cơ bản; API báo cáo cần bổ sung |
| UC-19 | Mua vé sự kiện | Khách hàng | P2 | Đang có trong API, phụ thuộc nghiệp vụ sự kiện |

## 5. Đặc tả use case

### UC-01 – Xem bộ môn và danh sách sân

- **Tiền điều kiện:** Không bắt buộc đăng nhập.
- **Luồng chính:** Người dùng mở trang chủ → hệ thống tải bộ môn → người dùng
  chọn bộ môn hoặc mở danh sách sân → hệ thống trả các venue đang hoạt động,
  tên, địa chỉ, ảnh, rating, tiện ích và nhãn nổi bật.
- **Ngoại lệ:** Không có dữ liệu thì hiển thị empty state; API lỗi thì hiển thị
  thông báo và nút thử lại, không hiển thị dữ liệu cũ như dữ liệu mới.
- **Đảm bảo:** Chỉ venue/court được phép công khai mới xuất hiện.
- **API hiện tại:** `GET /sports`, `GET /venues?sport=&q=&lat=&lng=`.

### UC-02 – Đăng ký tài khoản

- **Tiền điều kiện:** Số điện thoại chưa tồn tại; email nếu có phải chưa trùng.
- **Dữ liệu bắt buộc:** Họ tên tối thiểu 2 ký tự, số điện thoại Việt Nam hợp lệ,
  mật khẩu tối thiểu 6 ký tự; email là tùy chọn nhưng phải đúng định dạng.
- **Luồng chính:** Nhập form → validate ở client → gửi server → server kiểm tra
  trùng và hash mật khẩu → tạo user `ACTIVE` role `USER` → trả session → điều
  hướng vào trang chính/tài khoản.
- **Ngoại lệ:** Trùng phone/email trả lỗi 409; dữ liệu không hợp lệ trả lỗi 400;
  lỗi mạng giữ lại dữ liệu form an toàn để người dùng thử lại.
- **Không được:** Lưu hoặc log mật khẩu dạng rõ; tự cho phép đăng ký role ADMIN.
- **API hiện tại:** `POST /auth/register`.

### UC-03 – Đăng nhập, đăng xuất và duy trì phiên

- Người dùng đăng nhập bằng phone hoặc email và mật khẩu.
- Server kiểm tra thông tin, trạng thái tài khoản và cấp JWT chứa `sub`, role,
  phone cùng thời hạn hết hạn.
- Client lưu session, gắn `Authorization: Bearer <token>` cho request cần quyền,
  hiển thị trạng thái loading và chuyển về login nếu token không còn hợp lệ.
- Đăng xuất phải xoá session cục bộ và dữ liệu người dùng đang cache.
- Tài khoản `INACTIVE` bị từ chối; không tiết lộ tài khoản có tồn tại hay không
  qua thông báo quá chi tiết trong luồng chống dò tài khoản.
- **API hiện tại:** `POST /auth/login`, `GET /auth/me`; logout hiện là xoá phiên
  ở client, chưa có cơ chế revoke token phía server.

### UC-04 – Quên và đặt lại mật khẩu

- Người dùng nhập phone/email → hệ thống tạo mã 6 số có hạn 15 phút → người dùng
  nhập mã và mật khẩu mới → server kiểm tra mã chưa dùng/chưa hết hạn → hash mật
  khẩu mới và đánh dấu mã đã dùng trong cùng transaction.
- Một mã chỉ được dùng một lần; mã cũ phải vô hiệu khi cấp mã mới theo chính sách.
- Môi trường production phải gửi mã qua SMS/email và không trả trường `code` trong
  response. Việc trả mã hiện tại chỉ được phép cho dev/test.
- **API hiện tại:** `POST /auth/forgot-password`, `POST /auth/reset-password`.

### UC-05 – Tìm kiếm, lọc, bản đồ và chi tiết sân

- **Bộ lọc:** bộ môn, từ khoá, vị trí hiện tại (lat/lng), bán kính nếu được hỗ trợ;
  kết quả hiển thị khoảng cách, địa chỉ, giá/nhãn chính và trạng thái hoạt động.
- Người dùng có thể chuyển list/map; marker phải mở đúng venue detail.
- Chi tiết venue hiển thị ảnh, mô tả, địa chỉ, điện thoại, tiện ích, giờ mở cửa,
  sân con, bảng giá và sự kiện liên quan.
- Không hiển thị nút đặt nếu venue/court không nhận đặt; vẫn cho xem lý do bị khoá.
- **API hiện tại:** `GET /venues`, `GET /venues/map`, `GET /venues/:id`.

### UC-06 – Xem lịch trống theo ngày

- Người dùng chọn ngày và mở trang lịch của venue.
- Hệ thống trả group/court, giờ mở-đóng, đơn vị slot, bảng giá và các ô
  `available`, `booked`, `locked`, `event`.
- Giao diện phải phân biệt rõ trạng thái bằng màu và nhãn, có legend, dùng được
  trên màn hình điện thoại; ô quá khứ, ngoài giờ hoặc sân bảo trì không được chọn.
- Cột nhóm và cột sân phải luôn nhìn thấy khi kéo ngang dải giờ (React Native
  không có `position: sticky` nên hai cột này nằm ngoài vùng cuộn).
- Khi ngày thay đổi, request cũ không được ghi đè kết quả ngày mới; lỗi tải lịch
  phải có retry.
- **API hiện tại:** `GET /venues/:id/schedule?date=YYYY-MM-DD`.

### UC-07 – Đặt một hoặc nhiều khung giờ

- **Tiền điều kiện:** Đã đăng nhập; venue, court và khung giờ đang hoạt động.
- **Luồng chính:** Chọn ô trống → xem tóm tắt sân/ngày/giờ/giá → nhập ghi chú
  nếu cần → xác nhận → server kiểm tra lại quyền, ngày, giờ, trạng thái sân,
  block, overlap và giá → tạo booking/payment placeholder/notification trong
  transaction → trả danh sách booking và tổng tiền.
- Có thể đặt nhiều slot trong một request; mỗi slot tạo booking riêng nhưng tổng
  request phải thành công toàn bộ hoặc rollback toàn bộ.
- Nếu có người đặt trước trong lúc người dùng xác nhận, trả lỗi conflict rõ ràng,
  refresh lịch và yêu cầu chọn lại; không hiển thị thành công giả.
- Client phải chống double-click bằng disable nút/idempotency key; server phải
  xử lý trùng request an toàn.
- **API hiện tại:** `POST /bookings`; booking online tạo `PENDING` + `UNPAID`.

### UC-08 – Xem, theo dõi và huỷ lịch đã đặt

- Khách hàng mở “Lịch đã đặt” → hệ thống chỉ trả booking của chính user, có lọc
  ngày tùy chọn, mã đặt, venue, sân, thời gian, tổng tiền, trạng thái booking và
  thanh toán.
- Cho phép huỷ nếu booking chưa `COMPLETED` và chưa bị huỷ; server kiểm tra owner
  hoặc ADMIN, cập nhật `CANCELLED`, ghi audit và giải phóng slot.
- Chính sách hoàn tiền nếu đã thanh toán phải được thể hiện rõ; không tự coi huỷ
  là hoàn tiền khi chưa có quy trình payment/refund.
- **API hiện tại:** `GET /bookings?date=`, `PATCH /bookings/:id/cancel`.

### UC-09 – Thanh toán booking

#### Trạng thái hiện tại

- Khi tạo booking, server tạo bản ghi Payment `UNPAID`, amount hiện có thể là 0,
  và thông báo yêu cầu thanh toán.
- ADMIN có thể cập nhật trạng thái `unpaid`, `partial`, `paid`, `refunded`,
  `failed`; trạng thái đó đồng bộ vào booking.
- Chưa có endpoint để khách hàng tạo payment intent, redirect tới cổng thanh
  toán hoặc nhận webhook xác thực giao dịch.

#### Yêu cầu hoàn thiện

1. Khách hàng chọn booking chưa thanh toán → server tạo payment intent với amount
   đúng bằng số tiền phải thu và một `idempotencyKey`.
2. Client chuyển sang phương thức bank transfer/card/e-wallet theo provider;
   không gửi thông tin thẻ qua server TennisHub nếu provider hỗ trợ tokenization.
3. Provider redirect/webhook → server xác minh chữ ký, transaction code, amount,
   currency và booking → cập nhật payment + booking trong transaction.
4. Webhook phải idempotent: gửi lại nhiều lần không nhân doanh thu hoặc tạo nhiều
   giao dịch. Chỉ trạng thái server-verified mới được coi là đã trả tiền.
5. Client hiển thị thành công/thất bại/chờ xử lý; khi timeout phải cho phép kiểm
   tra lại trạng thái, không tự chuyển sang `PAID`.
6. Hoàn tiền phải có quyền, lý do, số tiền, thời điểm và audit; trạng thái
   `REFUNDED` không được xoá giao dịch gốc.

### UC-10 – Nhận và đọc thông báo

- Tạo thông báo khi giữ chỗ, thay đổi booking, thanh toán, khuyến mãi hoặc sự kiện.
- Người dùng xem danh sách, phân biệt đã đọc/chưa đọc, đánh dấu từng thông báo
  hoặc tất cả đã đọc; click thông báo có thể dẫn tới booking/payment liên quan.
- Không để user đọc hoặc đánh dấu thông báo của tài khoản khác.
- **API hiện tại:** `GET /notifications`, `PATCH /notifications/read-all`,
  `PATCH /notifications/:id/read`.

### UC-11 – Quản lý hồ sơ cá nhân

- Người dùng xem/cập nhật họ tên, email, giới tính, năm sinh, chiều cao, cân nặng,
  ghi chú theo field được cho phép; phone, role, status, joinedAt là dữ liệu hệ
  thống không được sửa tùy ý từ form hồ sơ.
- Validate độ dài, kiểu dữ liệu và giá trị hợp lý; thành công trả profile mới.
- **API hiện tại:** `GET/PATCH /account/profile`.

### UC-12 – Dashboard vận hành

- ADMIN xem tổng số booking, doanh thu đã nhận, khách hàng, sân, activity gần đây,
  biểu đồ theo ngày và công suất sân.
- Bộ lọc thời gian/venue/status phải có phạm vi rõ ràng; hiển thị “doanh thu đã
  nhận” tách khỏi “giá trị booking” và “tiền hoàn”.
- Nếu dữ liệu rỗng, biểu đồ vẫn có trục/empty state; số liệu không được tính từ
  toàn bộ dữ liệu client khi dữ liệu lớn.
- **Hiện tại:** `/admin/data` trả toàn bộ dữ liệu và selector client tính chuỗi
  7 ngày; đây là giải pháp MVP, cần API aggregate/pagination cho production.

### UC-13 – Quản lý địa điểm, sân và giá

- ADMIN thêm/sửa sân: venue, tên, giá theo giờ, loại mặt sân, trong/ngoài trời,
  trạng thái `available`, `inactive`, `maintenance`.
- Không được xoá cứng sân đã có booking; dùng inactive/maintenance để bảo toàn
  lịch sử và giải phóng/khóa lịch tương lai theo chính sách.
- Khi sửa giá, booking đã tạo giữ nguyên `totalPrice`; lịch mới dùng giá mới.
- Cần bổ sung quản lý venue (tên, địa chỉ, giờ mở cửa, timezone, tiện ích, ảnh),
  nhóm sân, price rule theo khung giờ và court block event/locked.
- **API hiện tại:** `POST /admin/courts`, `PUT /admin/courts/:id`; quản lý venue,
  price rule và block chưa có endpoint đầy đủ.

### UC-14 – Tạo booking tại quầy

- ADMIN nhập ngày, sân, giờ, tên và phone khách; nếu khách chưa có tài khoản thì
  tạo hồ sơ tối thiểu với role USER.
- Server kiểm tra overlap, giờ mở cửa, trạng thái sân và tạo booking source
  `COUNTER`, mặc định `CONFIRMED` theo chính sách quầy, kèm payment `CASH/UNPAID`.
- Phải trả mã booking để in/đọc cho khách; ghi activity `BOOKING_CREATED`.
- **API hiện tại:** `POST /admin/bookings`.

### UC-15 – Quản lý trạng thái booking

- ADMIN xem danh sách booking và đổi trạng thái `pending`, `confirmed`,
  `checked-in`, `completed`, `cancelled` theo state transition hợp lệ.
- Backend phải từ chối transition bất hợp lệ, ghi before/after và actor; không
  cho sửa trực tiếp trạng thái bằng dữ liệu client tùy ý.
- **API hiện tại:** `PATCH /admin/bookings/:id/status`; cần bổ sung ma trận transition
  và quy tắc hoàn tiền khi chuyển sang cancelled.

### UC-16 – Đối soát và cập nhật thanh toán

- ADMIN lọc theo payment status/method/date, xem booking, amount, transaction code,
  paidAt và khách hàng.
- Cập nhật trạng thái phải đồng bộ `Payment.status` và `Booking.paymentStatus`,
  lưu paidAt đúng lúc, không tạo payment mới cho thao tác retry.
- Mọi chỉnh tay phải yêu cầu lý do và audit trong production.
- **API hiện tại:** `PATCH /admin/payments/:id/status`.

### UC-17 – Quản lý khách hàng

- ADMIN tìm khách theo tên/phone/email, xem lịch sử booking và tổng đã thu; khóa
  hoặc mở khóa tài khoản.
- User bị khóa không thể login hoặc tạo booking mới; booking cũ phải được xử lý
  theo chính sách, không tự xóa lịch sử.
- **API hiện tại:** `PATCH /admin/customers/:id/status`; tìm kiếm/phân trang chi
  tiết cần bổ sung khi dữ liệu tăng.

### UC-18 – Báo cáo doanh thu và công suất sân

#### Định nghĩa chỉ số

| Chỉ số | Cách tính chuẩn |
|---|---|
| Doanh thu đã nhận | Tổng payment `PAID` và phần đã thu của `PARTIAL`, trừ khoản đã hoàn |
| Giá trị booking | Tổng `totalPrice` của booking không `CANCELLED` |
| Số booking | Đếm booking theo ngày đặt hoặc ngày sử dụng; báo cáo phải ghi rõ loại ngày |
| Công suất sân | Phút đã đặt hợp lệ / tổng phút mở cửa của các court hoạt động |
| Tỷ lệ huỷ | Booking `CANCELLED` / tổng booking trong cùng phạm vi |
| Giá trị hoàn | Tổng payment/refund có trạng thái `REFUNDED` hoặc refund ledger |

#### Luồng và yêu cầu

1. ADMIN chọn từ ngày, đến ngày, venue, sân, trạng thái booking/payment và loại
   báo cáo.
2. Server kiểm tra khoảng ngày, quyền ADMIN và tính aggregate từ DB, không lấy
   toàn bộ bản ghi về client để cộng.
3. UI hiển thị tổng quan, chuỗi theo ngày, breakdown theo venue/court/method và
   danh sách chi tiết có phân trang; cho phép export CSV ở P2.
4. Khoảng ngày phải dùng timezone nghiệp vụ; biên ngày được xác định rõ và nhất quán.
5. Cần bổ sung endpoint đề xuất:
   `GET /admin/reports/revenue?from=YYYY-MM-DD&to=YYYY-MM-DD&venueId=&courtId=`.
6. Báo cáo doanh thu phải dựa trên payment đã xác minh/đối soát, không dựa đơn
   thuần vào booking `CONFIRMED`.

### UC-19 – Mua vé sự kiện

- Khách hàng đăng nhập, chọn event, nhập phone và số lượng → server kiểm tra event,
  tồn kho/giới hạn → tạo ticket và tổng tiền, gửi thông báo.
- Nếu vé là một loại thanh toán thật, cần áp dụng cùng nguyên tắc payment intent,
  webhook, idempotency và refund như UC-09.
- **API hiện tại:** `POST /events/:id/tickets`; phạm vi event/payment cần chuẩn hóa.

## 6. Ma trận tích hợp frontend – backend

| Nhóm | Màn hình/adapter frontend | API/backend | Ghi chú |
|---|---|---|---|
| Auth | `/login`, `/register`, `/forgot-password` | `/auth/*` | JWT, validate form và lỗi chuẩn hóa |
| Catalog | home/discover/map/product | `/sports`, `/venues/*`, `/discover/*` | Có thể cache dữ liệu công khai |
| Schedule | `/product/[slug]/schedule` | `/venues/:id/schedule` | Lịch là nguồn để chọn slot |
| Booking | schedule, `/bookings` | `/bookings`, `/bookings/:id/cancel` | Server là nguồn sự thật về conflict/giá |
| Account | account/profile/notifications | `/account/*`, `/notifications` | Chỉ dữ liệu của user hiện tại |
| Admin | dashboard/courts/bookings/payments/customers | `/admin/*` | Bắt buộc ADMIN, cần pagination/report |
| Payment | payment UI cần bổ sung | payment intent/webhook cần bổ sung | Admin status hiện có chưa phải online payment |

### 6.1. Chuẩn lỗi API

- `400`: payload/format/business rule không hợp lệ.
- `401`: thiếu hoặc token không hợp lệ/hết hạn.
- `403`: đúng người dùng nhưng không đủ role/quyền sở hữu.
- `404`: không tìm thấy resource hoặc resource không được phép lộ.
- `409`: xung đột như trùng lịch, trùng tài khoản, giao dịch đã xử lý.
- `429`: vượt rate limit.
- `5xx`: lỗi hệ thống; client hiển thị thông báo chung, không lộ stack trace.

Response lỗi nên có `statusCode`, `message`, `error`, `requestId` (nếu đã triển
khai). Message hiển thị cho người dùng phải rõ ràng nhưng không tiết lộ bí mật.

## 7. Yêu cầu phi chức năng

### 7.1. Hiệu năng

| Mã | Yêu cầu | Mục tiêu nghiệm thu |
|---|---|---|
| NFR-PERF-01 | API đọc catalog/schedule | p95 ≤ 500 ms ở tải chuẩn, không tính thời gian mạng |
| NFR-PERF-02 | API tạo/huỷ booking | p95 ≤ 800 ms; không đánh đổi tính đúng đắn để đạt tốc độ |
| NFR-PERF-03 | Báo cáo aggregate | p95 ≤ 1.5 s cho phạm vi 12 tháng và dữ liệu đã index |
| NFR-PERF-04 | Khởi động lần đầu | App: màn hình đầu tiên hiển thị ≤ 2.5 s trên thiết bị tầm trung/4G. Web admin: LCP ≤ 2.5 s. Mọi màn hình có loading state |
| NFR-PERF-05 | Tương tác chọn slot | Phản hồi visual ≤ 100 ms; request xác nhận có trạng thái pending |
| NFR-PERF-06 | Đồng thời | Chịu tối thiểu 200 phiên hoạt động và 50 request tranh cùng một slot; tối đa một booking hợp lệ |
| NFR-PERF-07 | Dữ liệu lớn | Admin list/report phải phân trang, lọc và aggregate ở server; không tải toàn bộ DB vào client |
| NFR-PERF-08 | Cache | Catalog công khai có thể cache; schedule/booking/payment phải ưu tiên dữ liệu mới và invalidation rõ |

### 7.2. Bảo mật

| Mã | Yêu cầu | Cách thực hiện/kiểm tra |
|---|---|---|
| NFR-SEC-01 | Mã hóa đường truyền | Production chỉ dùng HTTPS/TLS; redirect HTTP; không đưa secret vào client bundle. Mọi biến `EXPO_PUBLIC_*` đều nằm trong bundle nên chỉ chứa cấu hình công khai |
| NFR-SEC-02 | Mật khẩu | Hash bằng bcrypt/Argon2 với cost phù hợp; không log/response password hoặc passwordHash |
| NFR-SEC-03 | Xác thực | JWT có secret mạnh từ environment, expiry, kiểm tra signature/issuer/audience nếu dùng; refresh/revoke theo thiết kế |
| NFR-SEC-04 | Phân quyền | Guard ở backend cho ADMIN; kiểm tra ownership trên từng booking/payment/notification; không tin role từ client |
| NFR-SEC-05 | Chống chiếm quyền | Token hiện lưu ở AsyncStorage (app) và localStorage (web admin) — cả hai đều đọc được nếu thiết bị/trang bị xâm nhập. Production cần rút ngắn expiry, có refresh/revoke; bản web ưu tiên HttpOnly + Secure + SameSite cookie. App nên chuyển sang expo-secure-store |
| NFR-SEC-06 | Validate input | DTO/class-validator ở server, giới hạn độ dài/số lượng/khoảng ngày; query qua Prisma parameterized |
| NFR-SEC-07 | Chống brute force | Rate limit và lockout/backoff cho login, forgot-password, reset-password và payment endpoint |
| NFR-SEC-08 | Thanh toán | Không lưu CVV/secret thẻ; verify webhook signature, amount, currency, provider transaction và idempotency |
| NFR-SEC-09 | CORS/headers | Allowlist origin; bật security headers, CSP phù hợp, no-sniff, frame protection; không dùng wildcard ở production |
| NFR-SEC-10 | Chống lộ dữ liệu | Không trả password reset code ở production; error/log không lộ PII, SQL, stack trace hoặc token |
| NFR-SEC-11 | Audit | Ghi actor, action, resource, before/after, timestamp, requestId cho thao tác admin/payment; audit không cho client sửa |
| NFR-SEC-12 | Phụ thuộc | Kiểm tra dependency, secret scan và lỗ hổng trước release; cập nhật package có kiểm soát |

### 7.3. Tính đúng đắn, nhất quán và tin cậy

| Mã | Yêu cầu |
|---|---|
| NFR-REL-01 | Tạo nhiều slot, tạo payment và notification liên quan phải dùng transaction; lỗi giữa chừng phải rollback phần nghiệp vụ. |
| NFR-REL-02 | Chống double booking bằng kiểm tra overlap trong transaction/locking hoặc cơ chế constraint phù hợp; test race condition bắt buộc. |
| NFR-REL-03 | Payment webhook, retry của client và thao tác admin phải idempotent; không nhân booking, payment hoặc doanh thu. |
| NFR-REL-04 | Mục tiêu availability production tối thiểu 99.5% theo tháng, không tính thời gian bảo trì đã thông báo. |
| NFR-REL-05 | Backup PostgreSQL tự động; mục tiêu RPO ≤ 15 phút, RTO ≤ 1 giờ; phải kiểm thử khôi phục định kỳ. |
| NFR-REL-06 | Không xoá cứng dữ liệu booking/payment đã phát sinh; dùng trạng thái hoặc ledger để giữ khả năng đối soát. |

### 7.4. Dữ liệu và thời gian

- API chuẩn hóa ngày `YYYY-MM-DD`, minute-of-day và enum; client không tự đổi
  timezone bằng timezone máy người dùng.
- Tất cả timestamp lưu ở UTC hoặc dạng timezone-aware; khi hiển thị đổi sang
  timezone của venue/nghiệp vụ.
- Mọi số tiền là integer VND, không dùng floating point; phép tính giá làm ở
  server và có test cho slot cắt qua nhiều price rule.
- Index tối thiểu cho `Booking(venueId, bookingDate)`,
  `Booking(courtId, bookingDate)`, `Booking(userId)`, payment status/date và
  các field lọc báo cáo. Kiểm tra query plan khi dữ liệu tăng.

### 7.5. Khả dụng và trải nghiệm người dùng

- App người dùng thiết kế cho màn hình điện thoại; khu quản trị chạy trên trình
  duyệt và phải dùng được từ màn hình hẹp đến desktop (sidebar thu thành ngăn kéo
  dưới 1024px). Lưới lịch cuộn ngang được trên cả hai.
- Tôn trọng vùng an toàn (tai thỏ, thanh điều hướng) bằng safe-area insets.
- Khả năng tiếp cận: mọi control có `accessibilityLabel`/`accessibilityRole`, vùng
  chạm tối thiểu 44×44 pt, contrast đạt WCAG 2.1 AA, không chỉ dùng màu để phân
  biệt trạng thái. Bản web admin giữ thêm điều hướng bằng bàn phím và focus visible.
- Có trạng thái loading, empty, error, retry và success cho mọi request bất đồng bộ.
- Không mất nội dung người dùng đang nhập khi request lỗi; nút submit disable khi
  đang gửi nhưng vẫn có cơ chế retry an toàn.
- Hiển thị giá, ngày, giờ và thông báo bằng tiếng Việt nhất quán; thông báo lỗi
  không đổ lỗi kỹ thuật khó hiểu cho người dùng.

### 7.6. Quan sát và vận hành

- Health check kiểm tra process và khả năng kết nối DB; readiness tách khỏi liveness
  khi triển khai nhiều instance.
- Log có cấu trúc với `requestId`, method, path, status, latency, actorId đã mask;
  không log Authorization header, mật khẩu hay dữ liệu thanh toán nhạy cảm.
- Theo dõi tỷ lệ 4xx/5xx, p95 latency, conflict booking, payment failure,
  webhook retry, DB pool và dung lượng.
- Alert khi error rate/latency vượt ngưỡng, backup thất bại hoặc webhook không được
  xử lý; dashboard số liệu phải truy vết được về query và thời điểm tạo.

### 7.7. Khả năng bảo trì và kiểm thử

- API contract và enum giữa client/server phải được cập nhật đồng thời; không tự
  đổi tên trạng thái ở một phía.
- Unit test bắt buộc cho tính giá, overlap, state transition, quyền sở hữu,
  payment idempotency và report aggregate.
- Integration/e2e test cho register/login, tạo booking thành công, race cùng slot,
  huỷ booking, admin permission và payment webhook.
- Frontend kiểm tra loading/error/empty, layout trên điện thoại và lỗi 401/403/409.
- Trước khi merge ở client: `pnpm typecheck`, `pnpm lint` và
  `npx expo export --platform android` (bắt lỗi resolve/transform mà tsc không thấy).
- Trước khi merge ở server: `pnpm build`, test và `git diff --check`.

## 8. Tiêu chí nghiệm thu phát hành

1. Người dùng mới đăng ký, đăng nhập, tìm venue, xem lịch, đặt slot còn trống và
   thấy booking trong lịch cá nhân.
2. Hai request đồng thời cùng một slot không thể cùng thành công; request thua
   nhận lỗi conflict và lịch được refresh.
3. Người dùng không thể xem/huỷ booking, payment hoặc notification của người khác.
4. ADMIN có thể thêm/sửa sân, tạo lịch tại quầy, cập nhật booking/payment/customer
   và mọi thao tác có audit event.
5. Số liệu “đã thu”, “giá trị booking”, “hoàn tiền” và “công suất” được định nghĩa
   rõ, kiểm thử bằng dữ liệu biên và không trộn lẫn.
6. Payment online chỉ được đánh dấu thành công từ kết quả server/provider đã xác
   minh; retry webhook không làm tăng doanh thu hai lần.
7. Production không trả reset code, không lộ secret/stack trace, có HTTPS,
   rate-limit auth và backup/restore đã kiểm thử.
8. Các mục P0 không còn lỗi blocking; các mục P1 có kế hoạch hoặc ticket trước
   khi mở rộng người dùng thật.

## 9. Các điểm cần chốt trước khi triển khai thanh toán và báo cáo production

- Chọn nhà cung cấp thanh toán và phương thức đối soát/webhook.
- Chính sách giữ chỗ: thời gian giữ `PENDING`, tự huỷ khi quá hạn và xử lý slot.
- Chính sách huỷ/hoàn tiền theo thời điểm trước giờ chơi.
- Định nghĩa doanh thu theo ngày booking hay ngày sử dụng và cách trừ hoàn tiền.
- Có cần role `OWNER/MANAGER` ngoài `ADMIN` hay không.
- Ngưỡng rate limit, tải concurrent mục tiêu và SLA chính thức.
- Chính sách lưu trữ/xoá PII, audit, payment record và thời gian retention.
