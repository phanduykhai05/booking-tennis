# TennisHub API

Backend NestJS 11 + Prisma 7 + PostgreSQL cho ứng dụng đặt sân TennisHub. Mọi response
được ánh xạ sẵn về đúng kiểu dữ liệu mà `client/components/**/types.ts` đang dùng, nên
phía client không cần thêm lớp chuyển đổi nào.

## Chạy lần đầu

```bash
pnpm install
cp .env.example .env          # điền DATABASE_URL và JWT_SECRET
pnpm prisma:generate          # sinh Prisma Client vào src/generated/prisma
pnpm db:migrate               # tạo database và áp dụng migration
pnpm db:seed                  # nạp dữ liệu mẫu
pnpm start:dev                # http://localhost:4000/api
```

Tài liệu API (Swagger): <http://localhost:4000/api/docs>

## Sao lưu & khôi phục dữ liệu

Dữ liệu **không mất khi chuyển máy** vì có hai nguồn tái tạo, đều đã commit trong repo:

**Cách 1 — Seed (khuyên dùng, không cần công cụ Postgres):** seed tất định, dựng lại
đúng bộ dữ liệu mọi lúc.

```bash
pnpm prisma:generate
pnpm db:migrate      # hoặc: pnpm db:reset (xoá sạch rồi tạo lại + tự seed)
pnpm db:seed
```

**Cách 2 — Khôi phục nhanh từ bản dump SQL:** file [`prisma/backup/booking_tenis.sql`](prisma/backup/booking_tenis.sql)
là ảnh chụp đầy đủ (schema + toàn bộ dữ liệu). Nạp trực tiếp bằng `psql`:

```bash
# Tạo database rỗng nếu chưa có:
createdb -U postgres booking_tenis
# Nạp schema + dữ liệu (đã kèm DROP ... IF EXISTS nên chạy lại được nhiều lần):
psql -U postgres -d booking_tenis -f prisma/backup/booking_tenis.sql
```

Tạo lại bản dump sau khi đổi dữ liệu:

```bash
pg_dump "$DATABASE_URL" --clean --if-exists --no-owner --no-privileges -f prisma/backup/booking_tenis.sql
```

## Biến môi trường

| Biến | Mặc định | Ý nghĩa |
|------|----------|---------|
| `DATABASE_URL` | – | Chuỗi kết nối PostgreSQL |
| `PORT` | `4000` | Cổng HTTP |
| `CORS_ORIGIN` | `http://localhost:3000` | Danh sách origin, ngăn cách bằng dấu phẩy |
| `JWT_SECRET` | – | Khoá ký JWT |
| `JWT_EXPIRES_IN` | `7d` | Hạn của token |

## Tài khoản mẫu

Mật khẩu chung: `123456`

| Vai trò | Đăng nhập |
|---------|-----------|
| Quản trị | `0847968368` hoặc `admin@tennishub.vn` |
| Khách hàng | `0900000001` (khải duy) |
| Khách hàng khác | `0901234567` … `0922334455` |

Dữ liệu seed gồm **18 địa điểm** (pickleball, tennis, bóng đá, cầu lông ở Hà Nội, Hải
Phòng và TP.HCM) với tổng cộng **~90 sân**, bảng giá và toạ độ thật. Lịch đặt mẫu được
sinh cho **hôm nay** và **ngày mai** theo giờ Việt Nam, nên mọi màn "Đặt lịch theo sân -
trực quan" đều có sẵn ô đã đặt / khoá / sự kiện để thử. Ảnh sân dùng bộ ảnh bundle của
client theo `coverKey` (`pickleball` / `tennis` / `football`) và `logoKey`.

## Bản đồ API

Tiền tố chung `/api`. Route công khai không cần token; route có 🔒 cần
`Authorization: Bearer <token>`; route 🛡 chỉ dành cho vai trò `ADMIN`.

| Method | Đường dẫn | Dùng cho màn hình |
|--------|-----------|-------------------|
| GET | `/health` | Kiểm tra API và kết nối DB |
| POST | `/auth/register` | Đăng ký |
| POST | `/auth/login` | Đăng nhập |
| POST | `/auth/forgot-password` | Quên mật khẩu (trả mã xác thực ở môi trường dev) |
| POST | `/auth/reset-password` | Đặt lại mật khẩu |
| GET 🔒 | `/auth/me` | Phiên hiện tại |
| GET | `/sports` | Bộ môn thể thao ở trang chủ |
| GET | `/venues?sport=&q=&lat=&lng=` | Danh sách sân gần bạn (có tính khoảng cách) |
| GET | `/venues/map` | Toạ độ sân cho bản đồ |
| GET | `/venues/:id` | Chi tiết sân + sự kiện bán vé |
| GET | `/venues/:id/schedule?date=` | Lưới lịch theo sân của một ngày |
| POST 🔒 | `/bookings` | Giữ chỗ các khung giờ đã chọn |
| GET 🔒 | `/bookings?date=` | Lịch đã đặt của tài khoản |
| PATCH 🔒 | `/bookings/:id/cancel` | Huỷ lịch |
| POST 🔒 | `/events/:id/tickets` | Mua vé sự kiện |
| GET 🔒 | `/account/profile` | Hồ sơ cá nhân |
| PATCH 🔒 | `/account/profile` | Cập nhật hồ sơ |
| GET 🔒 | `/notifications` | Trung tâm thông báo |
| PATCH 🔒 | `/notifications/read-all` | Đánh dấu đã đọc tất cả |
| PATCH 🔒 | `/notifications/:id/read` | Đánh dấu đã đọc một thông báo |
| GET | `/discover/posts?type=` | Bài viết màn Khám phá |
| GET 🛡 | `/admin/data` | Toàn bộ dữ liệu vận hành (`AdminDataState`) |
| POST 🛡 | `/admin/courts` | Thêm sân |
| PUT 🛡 | `/admin/courts/:id` | Sửa sân |
| POST 🛡 | `/admin/bookings` | Tạo lịch tại quầy |
| PATCH 🛡 | `/admin/bookings/:id/status` | Đổi trạng thái lịch |
| PATCH 🛡 | `/admin/payments/:id/status` | Đổi trạng thái thanh toán |
| PATCH 🛡 | `/admin/customers/:id/status` | Khoá / mở khoá khách hàng |

## Quy ước dữ liệu

- **Giờ trong ngày** luôn là số phút tính từ 00:00 (`420` = 07:00). Client và server
  dùng chung quy ước này nên không phải parse chuỗi giờ.
- **Ngày** luôn là chuỗi `YYYY-MM-DD`. "Hôm nay" tính theo giờ Việt Nam
  (`todayInAppTimezone` trong `src/common/date.util.ts`), không dùng UTC.
- **Enum**: database dùng `UPPER_SNAKE`, API trả về đúng chuỗi client cần
  (`CHECKED_IN` → `checked-in`). Bảng quy đổi duy nhất nằm ở
  [`src/common/api-mapping.ts`](src/common/api-mapping.ts) — thêm trạng thái mới thì sửa ở đây.
- **Trạng thái ô lịch**: `available` suy ra từ phần còn lại; `booked` từ bảng `Booking`,
  `locked`/`event` từ bảng `CourtBlock`, sân `MAINTENANCE`/`INACTIVE` bị khoá cả ngày.

## Cấu trúc

```text
src/
├── common/            # Prisma, guard JWT, tiện ích ngày giờ, bảng quy đổi enum
├── modules/
│   ├── account/       # hồ sơ, thông báo, vé sự kiện
│   ├── admin/         # khu vực quản trị
│   ├── auth/          # đăng ký, đăng nhập, khôi phục mật khẩu
│   ├── bookings/      # đặt và huỷ lịch
│   ├── catalog/       # bộ môn thể thao, bài viết khám phá
│   └── venues/        # danh sách sân, chi tiết, lưới lịch
└── generated/prisma/  # Prisma Client sinh tự động, không commit
```
