# TennisHub — Hệ thống đặt sân thể thao

Ứng dụng đặt lịch sân thể thao (pickleball, tennis, cầu lông, bóng đá…) gồm **web
cho người dùng** và **khu vực quản trị**, dùng chung một backend API.

Tài liệu này dành cho các thành viên trong nhóm: cách cấu hình, cách chạy cả client
lẫn server, nguyên tắc làm việc, luồng dữ liệu và mục đích của từng phần.

---

## 1. Thành viên nhóm

| Vai trò | Họ tên | MSSV |
|---------|--------|------|
| Nhóm trưởng | Phan Duy Khải | N23DVCN026 |
| Thành viên | Trần Văn Vĩnh Phúc | N23DVCN047 |
| Thành viên | Gia Bảo | N23DVCN0003 |

---

## 2. Mục đích & phạm vi

- **Người dùng**: tìm sân gần mình (danh sách + bản đồ), xem chi tiết sân, **đặt lịch
  theo sân trực quan** (chọn khung giờ trên lưới), mua vé sự kiện, xem lịch đã đặt,
  nhận thông báo, quản lý tài khoản.
- **Quản trị (admin)**: xem toàn bộ sân/lịch/khách hàng/thanh toán, tạo lịch tại quầy,
  đổi trạng thái lịch/thanh toán, khoá/mở tài khoản khách.

Toàn bộ dữ liệu (sân, giá, lịch, người dùng…) nằm ở **PostgreSQL**, truy cập qua **API
NestJS**. Phía web **không còn dùng mock data** — mọi màn hình đọc dữ liệu thật từ API.

### Giao diện

Ảnh chụp từ dữ liệu seed, tài khoản demo `0900000001` (người dùng) và `0847968368` (quản trị).
Ảnh nằm ở [`docs/screenshots/`](docs/screenshots/); chụp lại khi giao diện đổi.

**Điện thoại (390px)**

| Trang chủ | Bản đồ | Khám phá | Nổi bật |
|:---:|:---:|:---:|:---:|
| <img src="docs/screenshots/mobile-home.jpg" width="200" alt="Trang chủ trên điện thoại"> | <img src="docs/screenshots/mobile-map.jpg" width="200" alt="Bản đồ sân trên điện thoại"> | <img src="docs/screenshots/mobile-discover.jpg" width="200" alt="Khám phá trên điện thoại"> | <img src="docs/screenshots/mobile-popular.jpg" width="200" alt="Sân nổi bật trên điện thoại"> |

| Chi tiết sân | Đặt lịch theo sân | Tài khoản | Đăng nhập |
|:---:|:---:|:---:|:---:|
| <img src="docs/screenshots/mobile-venue.jpg" width="200" alt="Chi tiết sân trên điện thoại"> | <img src="docs/screenshots/mobile-schedule.jpg" width="200" alt="Lưới đặt lịch theo sân"> | <img src="docs/screenshots/mobile-account.jpg" width="200" alt="Tài khoản trên điện thoại"> | <img src="docs/screenshots/mobile-login.jpg" width="200" alt="Đăng nhập trên điện thoại"> |

**Desktop (1440px)**

| Trang chủ | Bản đồ |
|:---:|:---:|
| <img src="docs/screenshots/desktop-home.jpg" alt="Trang chủ trên desktop"> | <img src="docs/screenshots/desktop-map.jpg" alt="Bản đồ sân trên desktop"> |

| Tài khoản + lịch đã đặt | Quản trị — tổng quan |
|:---:|:---:|
| <img src="docs/screenshots/desktop-account.jpg" alt="Tài khoản và lịch đã đặt trên desktop"> | <img src="docs/screenshots/desktop-admin-dashboard.jpg" alt="Tổng quan khu quản trị"> |

| Quản trị — lịch đặt sân |
|:---:|
| <img src="docs/screenshots/desktop-admin-bookings.jpg" alt="Quản lý lịch đặt sân trong khu quản trị"> |

---

## 3. Kiến trúc tổng quan

```
┌─────────────────────┐        HTTP /api        ┌──────────────────────┐        ┌──────────────┐
│ client (Vite + PWA) │  ───────────────────▶   │   server (NestJS)    │  ───▶  │  PostgreSQL  │
│  web + /admin       │  ◀───────────────────   │   cổng 4000          │        │ booking_tenis│
│  React 19, Tailwind │        JSON             │   Prisma 7 (ORM)     │        └──────────────┘
└─────────────────────┘                         └──────────────────────┘
```

| Tầng | Công nghệ | Thư mục |
|------|-----------|---------|
| Frontend | Vite 8, React 19, react-router 8, TypeScript, Tailwind 3, PWA (vite-plugin-pwa) | [`client/`](client/) |
| Backend | NestJS 11, Prisma 7, class-validator, JWT, Swagger | [`server/`](server/) |
| Cơ sở dữ liệu | PostgreSQL 18 | (schema ở [`server/prisma/schema.prisma`](server/prisma/schema.prisma)) |

### 3.1. Cơ sở dữ liệu (ERD)

Nguồn sự thật là [`server/prisma/schema.prisma`](server/prisma/schema.prisma); mục này tóm tắt lại để
đọc nhanh. Đổi schema thì cập nhật cả sơ đồ dưới đây.

```mermaid
erDiagram
    SportCategory ||--o{ Venue : "phân loại"

    User ||--o{ Booking : "đặt"
    User ||--o{ EventTicket : "mua"
    User ||--o{ Payment : "trả"
    User ||--o{ Notification : "nhận"
    User ||--o{ PasswordReset : "yêu cầu"

    Venue ||--o{ VenueBadge : "gắn nhãn"
    Venue ||--o{ CourtGroup : "chia nhóm"
    Venue ||--o{ Court : "có"
    Venue ||--o{ PriceRule : "định giá"
    Venue ||--o{ VenueEvent : "tổ chức"
    Venue ||--o{ Booking : "nhận"

    CourtGroup |o--o{ Court : "gom"
    Court ||--o{ CourtBlock : "bị khoá"
    Court ||--o{ Booking : "được đặt"
    Court |o--o{ VenueEvent : "chiếm chỗ"

    VenueEvent ||--o{ EventTicket : "bán"
    Booking |o--o{ Payment : "thanh toán"
    EventTicket |o--o{ Payment : "thanh toán"
    Payment |o..o{ SepayTransaction : "khớp (logic)"

    SportCategory {
        string id PK
        string label
        string icon
        int sortOrder
    }
    User {
        string id PK
        string phone UK
        string email UK "tuỳ chọn"
        string fullName
        string passwordHash
        UserRole role
        UserStatus status
    }
    PasswordReset {
        string id PK
        string userId FK
        string code
        datetime expiresAt
        datetime usedAt "null = chưa dùng"
    }
    Venue {
        string id PK "slug"
        string sportId FK
        string name
        string address
        float latitude
        float longitude
        int openingMinute
        int closingMinute
        int slotMinutes
        boolean isFeatured
        VenueStatus status
    }
    VenueBadge {
        string id PK
        string venueId FK
        string code
        VenueBadgeTone tone
    }
    CourtGroup {
        string id PK
        string venueId FK
        string name
    }
    Court {
        string id PK
        string venueId FK
        string groupId FK "tuỳ chọn"
        string name
        int hourlyRate
        CourtSurface surface
        CourtStatus status
    }
    PriceRule {
        string id PK
        string venueId FK
        int startMinute
        int endMinute
        int pricePerHour
    }
    CourtBlock {
        string id PK
        string courtId FK
        date blockDate
        int startMinute
        int endMinute
        CourtBlockKind kind
    }
    Booking {
        string id PK
        string code UK
        string userId FK
        string venueId FK
        string courtId FK
        date bookingDate
        int startMinute
        int endMinute
        int totalPrice
        BookingStatus status
        PaymentStatus paymentStatus
        BookingSource source
    }
    VenueEvent {
        string id PK
        string venueId FK
        string courtId FK "tuỳ chọn"
        date eventDate
        int startMinute
        int endMinute
        int capacity
        int soldCount
        int price
    }
    EventTicket {
        string id PK
        string eventId FK
        string userId FK
        int quantity
        int totalPrice
        TicketStatus status
    }
    Payment {
        string id PK
        string transactionCode UK
        string transferContent UK "nội dung CK SePay"
        string userId FK
        string bookingId FK "hoặc ticketId"
        string ticketId FK "hoặc bookingId"
        int amount
        int paidAmount
        PaymentMethod method
        PaymentStatus status
    }
    SepayTransaction {
        string id PK "id giao dịch SePay"
        string paymentId "null = không khớp"
        int amount
    }
    Notification {
        string id PK
        string userId FK
        NotificationKind kind
        boolean isRead
    }
    DiscoverPost {
        string id PK
        DiscoverPostType type
        string venueName
        datetime publishedAt
    }
    ActivityEvent {
        string id PK
        ActivityType type
        string entityId "id lịch/sân/thanh toán"
        datetime createdAt
    }
```

> `DiscoverPost` và `ActivityEvent` không có khoá ngoại: bài Khám phá lưu tên sân dạng chữ,
> `ActivityEvent.entityId` trỏ tới lịch, sân hoặc thanh toán tuỳ `type`. `SepayTransaction.paymentId`
> cũng chỉ là tham chiếu logic (không ràng buộc), để vẫn lưu được khoản tiền không khớp giao dịch nào.

#### Quan hệ và hành vi khi xoá

| Bảng con → bảng cha | Khoá ngoại | Bắt buộc | Khi xoá bảng cha |
|---|---|:---:|---|
| `Venue` → `SportCategory` | `sportId` | ✓ | Chặn (mặc định) |
| `PasswordReset` → `User` | `userId` | ✓ | Xoá theo (Cascade) |
| `VenueBadge`, `CourtGroup`, `Court`, `PriceRule`, `VenueEvent` → `Venue` | `venueId` | ✓ | Xoá theo (Cascade) |
| `Court` → `CourtGroup` | `groupId` | | Đặt null (SetNull) |
| `CourtBlock` → `Court` | `courtId` | ✓ | Xoá theo (Cascade) |
| `VenueEvent` → `Court` | `courtId` | | Đặt null (SetNull) |
| `Booking` → `User` / `Venue` / `Court` | `userId`, `venueId`, `courtId` | ✓ | Chặn (Restrict) — không mất lịch sử đặt sân |
| `Payment` → `Booking` | `bookingId` | | Xoá theo (Cascade) |
| `Payment` → `EventTicket` | `ticketId` | | Xoá theo (Cascade) |
| `Payment` → `User` | `userId` | ✓ | Chặn (Restrict) |
| `EventTicket` → `VenueEvent` / `User` | `eventId`, `userId` | ✓ | Xoá theo (Cascade) |
| `Notification` → `User` | `userId` | ✓ | Xoá theo (Cascade) |

Mỗi `Payment` trả cho **đúng một** thứ: hoặc `bookingId`, hoặc `ticketId` (kiểm tra ở tầng service).

#### Cấu trúc bảng

Quy ước chung: `id` kiểu `cuid()` (trừ `SportCategory`, `Venue` dùng slug và `SepayTransaction`
dùng id của SePay); giờ trong ngày lưu bằng **số phút từ 0h** (`startMinute`, `endMinute`, ví dụ
`360` = 06:00); tiền lưu **số nguyên VNĐ**; cột `@db.Date` lưu ngày không có giờ.

<details>
<summary><b>Người dùng</b> — <code>User</code>, <code>PasswordReset</code>, <code>Notification</code></summary>

**`User`**

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| `id` | String | PK, cuid | |
| `phone` | String | unique | Đăng nhập bằng số điện thoại |
| `email` | String? | unique | Đăng nhập bằng email (tuỳ chọn) |
| `fullName` | String | | |
| `passwordHash` | String | | bcrypt |
| `role` | `UserRole` | mặc định `USER` | `ADMIN` vào được `/admin` |
| `status` | `UserStatus` | mặc định `ACTIVE` | `INACTIVE` = bị khoá, token cũ mất tác dụng ngay |
| `birthYear`, `gender`, `heightCm`, `weightKg`, `note` | Int? / String? | | Hồ sơ cá nhân |
| `createdAt`, `updatedAt` | DateTime | | |

**`PasswordReset`** — mã khôi phục mật khẩu

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| `id` | String | PK | |
| `userId` | String | FK → `User`, index | |
| `code` | String | | 6 chữ số |
| `expiresAt` | DateTime | | 15 phút sau khi tạo |
| `usedAt` | DateTime? | | Đã dùng, hoặc bị huỷ khi nhập sai mã |
| `createdAt` | DateTime | | |

**`Notification`**

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| `id` | String | PK | |
| `userId` | String | FK → `User`, index (`userId`, `createdAt`) | |
| `kind` | `NotificationKind` | | |
| `title`, `message` | String | | |
| `isRead` | Boolean | mặc định `false` | |
| `createdAt` | DateTime | | |

</details>

<details>
<summary><b>Sân</b> — <code>SportCategory</code>, <code>Venue</code>, <code>VenueBadge</code>, <code>CourtGroup</code>, <code>Court</code>, <code>PriceRule</code>, <code>CourtBlock</code></summary>

**`SportCategory`** — bộ môn

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| `id` | String | PK | Slug, ví dụ `pickleball` |
| `label` | String | | Tên hiển thị |
| `icon` | String | | Khoá icon ở client |
| `sortOrder` | Int | mặc định `0` | |

**`Venue`** — địa điểm (cụm sân)

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| `id` | String | PK | Slug, dùng trong URL `/product/:slug` |
| `sportId` | String | FK → `SportCategory`, index | |
| `name`, `address`, `phone` | String | | |
| `latitude`, `longitude` | Float | | Ghim trên bản đồ |
| `openingMinute` / `closingMinute` | Int | mặc định `360` / `1320` | Giờ mở/đóng cửa |
| `slotMinutes` | Int | mặc định `30` | Độ dài một ô trên lưới đặt lịch |
| `amenities` | String[] | | Tiện ích |
| `coverKey`, `logoKey`, `mark` | String | | Ảnh bìa, logo, chữ viết tắt |
| `rating` | Float? | | |
| `offerCount` | Int | mặc định `0` | Số ưu đãi đang chạy |
| `isFeatured` | Boolean | mặc định `false` | Hiện ở trang Nổi bật |
| `status` | `VenueStatus` | mặc định `ACTIVE` | |
| `timezone` | String | mặc định `Asia/Bangkok` | |
| `description` | String? | | |
| `createdAt` | DateTime | | |

**`VenueBadge`** — nhãn trên thẻ sân ("Đơn ngày", "Sự kiện")

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| `id` | String | PK | |
| `venueId` | String | FK → `Venue`; unique (`venueId`, `code`) | |
| `code`, `label` | String | | |
| `tone` | `VenueBadgeTone` | | Màu nhãn |
| `sortOrder` | Int | mặc định `0` | |

**`CourtGroup`** — nhóm sân trên lưới (ví dụ "Pickleball")

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| `id` | String | PK | |
| `venueId` | String | FK → `Venue`; unique (`venueId`, `name`) | |
| `name` | String | | |
| `sortOrder` | Int | mặc định `0` | |

**`Court`** — từng sân con

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| `id` | String | PK | |
| `venueId` | String | FK → `Venue`, index | |
| `groupId` | String? | FK → `CourtGroup`, index | |
| `name` | String | | |
| `hourlyRate` | Int | | Giá/giờ khi không có `PriceRule` khớp |
| `surface` | `CourtSurface` | mặc định `HARD` | |
| `isIndoor` | Boolean | mặc định `false` | |
| `status` | `CourtStatus` | mặc định `AVAILABLE` | Chỉ `AVAILABLE` mới đặt được |
| `sortOrder` | Int | mặc định `0` | |

**`PriceRule`** — bảng giá theo khung giờ

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| `id` | String | PK | |
| `venueId` | String | FK → `Venue`, index | |
| `startMinute`, `endMinute` | Int | | Khung giờ áp dụng |
| `pricePerHour` | Int | | |
| `label` | String | | |
| `sortOrder` | Int | mặc định `0` | |

**`CourtBlock`** — ô "Khoá"/"Sự kiện" trên lưới đặt lịch

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| `id` | String | PK | |
| `courtId` | String | FK → `Court`; index (`courtId`, `blockDate`) | |
| `blockDate` | Date | | |
| `startMinute`, `endMinute` | Int | | |
| `kind` | `CourtBlockKind` | | |
| `title` | String | | Lý do khoá |

</details>

<details>
<summary><b>Đặt sân và sự kiện</b> — <code>Booking</code>, <code>VenueEvent</code>, <code>EventTicket</code></summary>

**`Booking`** — một khung giờ trên một sân

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| `id` | String | PK | |
| `code` | String | unique | Mã lịch, dạng `TH<yyMMdd><4 ký tự>` |
| `userId` | String | FK → `User`, index | |
| `venueId` | String | FK → `Venue`; index (`venueId`, `bookingDate`) | |
| `courtId` | String | FK → `Court`; index (`courtId`, `bookingDate`) | |
| `bookingDate` | Date | | |
| `startMinute`, `endMinute` | Int | | Không trùng lịch khác cùng sân (khoá theo sân + ngày khi tạo) |
| `totalPrice` | Int | | Tính theo `PriceRule` |
| `status` | `BookingStatus` | mặc định `PENDING` | |
| `paymentStatus` | `PaymentStatus` | mặc định `UNPAID` | |
| `source` | `BookingSource` | mặc định `ONLINE` | `COUNTER` = tạo tại quầy |
| `note` | String? | | |
| `createdAt`, `updatedAt` | DateTime | | |

**`VenueEvent`** — sự kiện bán vé tại sân

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| `id` | String | PK | |
| `venueId` | String | FK → `Venue`; index (`venueId`, `eventDate`) | |
| `courtId` | String? | FK → `Court`; index (`courtId`, `eventDate`) | Có thì sự kiện chiếm khung giờ trên lưới |
| `courtLabel` | String | | Nhãn hiển thị ("Sân 1 - 2") |
| `title` | String | | |
| `eventDate` | Date | | |
| `startMinute`, `endMinute` | Int | | |
| `price` | Int | | Giá một vé |
| `capacity` | Int | | Sức chứa |
| `soldCount` | Int | mặc định `0` | Chỉ tính vé đã `PAID` |

**`EventTicket`** — vé đã mua

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| `id` | String | PK | |
| `eventId` | String | FK → `VenueEvent`, index | |
| `userId` | String | FK → `User`, index | |
| `phone` | String | | Số liên hệ khi mua |
| `quantity` | Int | | |
| `totalPrice` | Int | | |
| `status` | `TicketStatus` | mặc định `PAID` | `PENDING` = chờ SePay, giữ chỗ tới khi QR hết hạn |
| `createdAt`, `updatedAt` | DateTime | | |

</details>

<details>
<summary><b>Thanh toán</b> — <code>Payment</code>, <code>SepayTransaction</code></summary>

**`Payment`**

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| `id` | String | PK | |
| `transactionCode` | String | unique | Mã giao dịch nội bộ |
| `userId` | String | FK → `User`, index | |
| `bookingId` | String? | FK → `Booking`, index | Hoặc `ticketId` |
| `ticketId` | String? | FK → `EventTicket`, index | Hoặc `bookingId` |
| `amount` | Int | | Số tiền phải trả |
| `paidAmount` | Int | mặc định `0` | Cộng dồn, cho phép trả thiếu rồi bù |
| `method` | `PaymentMethod` | | |
| `status` | `PaymentStatus` | | `FAILED` = QR SePay quá hạn |
| `transferContent` | String? | unique | Nội dung chuyển khoản in trên QR, webhook dò chuỗi này |
| `gatewayRef` | String? | | Mã tham chiếu ngân hàng từ SePay |
| `paidAt` | DateTime? | | |
| `createdAt`, `updatedAt` | DateTime | | |

**`SepayTransaction`** — mỗi khoản tiền SePay báo về

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| `id` | String | PK | Id giao dịch phía SePay — chặn webhook gửi lại bị cộng tiền hai lần |
| `paymentId` | String? | index | `null` = không khớp giao dịch nào, cần đối soát tay |
| `amount` | Int | | |
| `content` | String? | | Nội dung chuyển khoản gốc |
| `createdAt` | DateTime | | |

</details>

<details>
<summary><b>Nội dung và nhật ký</b> — <code>DiscoverPost</code>, <code>ActivityEvent</code></summary>

**`DiscoverPost`** — bài ở trang Khám phá

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| `id` | String | PK | |
| `type` | `DiscoverPostType` | | |
| `venueName` | String | | Tên sân dạng chữ, không phải khoá ngoại |
| `labels` | String[] | | |
| `publishedAt` | DateTime | index | |

**`ActivityEvent`** — nhật ký hoạt động ở dashboard quản trị

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| `id` | String | PK | |
| `type` | `ActivityType` | | |
| `entityId` | String | | Id lịch/sân/thanh toán tuỳ `type` |
| `message` | String | | |
| `createdAt` | DateTime | index | |

</details>

#### Enum

| Enum | Giá trị |
|---|---|
| `UserRole` | `ADMIN`, `USER` |
| `UserStatus` | `ACTIVE`, `INACTIVE` |
| `VenueStatus` | `ACTIVE`, `INACTIVE` |
| `VenueBadgeTone` | `EVENT`, `SINGLE` |
| `CourtStatus` | `AVAILABLE`, `INACTIVE`, `MAINTENANCE` |
| `CourtSurface` | `CLAY`, `HARD`, `SYNTHETIC` |
| `CourtBlockKind` | `EVENT`, `LOCKED` |
| `BookingStatus` | `PENDING`, `CONFIRMED`, `CHECKED_IN`, `COMPLETED`, `CANCELLED` |
| `BookingSource` | `ONLINE`, `COUNTER` |
| `PaymentStatus` | `UNPAID`, `PARTIAL`, `PAID`, `FAILED`, `REFUNDED` |
| `PaymentMethod` | `SEPAY`, `CASH`, `BANK_TRANSFER`, `CARD`, `E_WALLET` |
| `TicketStatus` | `PENDING`, `PAID`, `CANCELLED` |
| `NotificationKind` | `BOOKING`, `PROMOTION`, `SYSTEM` |
| `DiscoverPostType` | `COURSE`, `EMPTY_COURT`, `EVENT`, `MEMBER`, `OFFER` |
| `ActivityType` | `BOOKING_CREATED`, `BOOKING_UPDATED`, `COURT_UPDATED`, `PAYMENT_UPDATED` |

---

## 4. Yêu cầu môi trường

Cài sẵn trên máy trước khi bắt đầu:

- **Node.js** ≥ 20 (khuyên dùng 20 hoặc mới hơn)
- **pnpm** ≥ 11 — cài bằng `npm install -g pnpm`
- **PostgreSQL** ≥ 14 (dự án đang chạy trên 18). Nhớ mật khẩu user `postgres`.
- **Git**

Kiểm tra nhanh:

```bash
node -v
pnpm -v
psql --version
```

---

## 5. Cấu hình (file .env)

Repo **không commit** file `.env` thật (chứa mật khẩu). Mỗi máy tự tạo từ file mẫu
`.env.example` đã có sẵn.

### 5.1. Server — `server/.env`

```bash
cd server
cp .env.example .env
```

Rồi mở `server/.env` và điền:

| Biến | Ý nghĩa | Ví dụ |
|------|---------|-------|
| `DATABASE_URL` | Chuỗi kết nối PostgreSQL. **Đổi mật khẩu thành mật khẩu Postgres máy bạn.** | `postgresql://postgres:MAT_KHAU@localhost:5432/booking_tenis?schema=public` |
| `PORT` | Cổng API | `4000` |
| `CORS_ORIGIN` | Origin của bản web được phép gọi API (app native không bị CORS) | `http://localhost:8081` |
| `JWT_SECRET` | Khoá ký token đăng nhập (đổi thành chuỗi ngẫu nhiên) | `chuoi-bi-mat-ngau-nhien` |
| `JWT_EXPIRES_IN` | Hạn token | `7d` |

### 5.2. Client — `client/.env`

```bash
cd client
cp .env.example .env
```

| Biến | Ý nghĩa | Ví dụ |
|------|---------|-------|
| `VITE_API_URL` | Gốc API mà web gọi tới (nhúng vào bundle lúc build) | `http://localhost:4000/api` |

> ⚠️ Chỉ biến bắt đầu bằng `VITE_` mới lộ ra phía client. Mở web từ **điện thoại** trong
> mạng LAN thì `localhost` trỏ về chính điện thoại — đổi thành IP LAN của máy chạy backend,
> ví dụ `http://192.168.1.10:4000/api`, rồi chạy client bằng `pnpm dev:lan`.

---

## 6. Cách chạy

Mở **2 cửa sổ terminal**: một cho server, một cho client. **Chạy server trước.**

### 6.1. Chạy Server (backend)

```bash
cd server
pnpm install                # cài dependencies (chạy 1 lần)
pnpm prisma:generate        # sinh Prisma Client (BẮT BUỘC trước khi build/run)
pnpm db:migrate             # tạo database + bảng theo schema
pnpm db:seed                # nạp dữ liệu mẫu (30 sân, 147 court, tài khoản demo)
pnpm start:dev              # chạy API ở http://localhost:4000/api (tự reload khi sửa code)
```

- Kiểm tra sống: mở <http://localhost:4000/api/health> → trả `{"status":"ok",...}`.
- Tài liệu API (Swagger): <http://localhost:4000/api/docs>.

### 6.2. Chạy Client (frontend)

```bash
cd client
pnpm install                # cài dependencies (chạy 1 lần)
pnpm dev                    # chạy web ở http://localhost:8081
```

- **Người dùng**: mở <http://localhost:8081>. Trên điện thoại có thể "Thêm vào màn hình chính"
  để cài như app (PWA); muốn thử cài PWA ở máy dev thì chạy `pnpm build && pnpm preview`.
- **Quản trị**: mở <http://localhost:8081/admin/dashboard>.

> Thứ tự đúng: **server chạy trước** rồi mới tới client, vì các màn hình dùng dữ liệu từ
> API. Nếu web trắng/lỗi tải → kiểm tra server đã chạy và `VITE_API_URL` đã trỏ
> đúng IP chưa.

---

## 7. Dữ liệu — không mất khi chuyển máy

Có **hai nguồn tái tạo dữ liệu**, đều đã commit trong repo:

### Cách 1 — Seed (khuyên dùng, không cần công cụ Postgres)

Seed tất định, dựng lại đúng bộ dữ liệu mọi lúc:

```bash
cd server
pnpm db:seed        # nạp lại dữ liệu mẫu
# hoặc làm sạch hoàn toàn rồi tạo lại + tự seed:
pnpm db:reset
```

### Cách 2 — Khôi phục nhanh từ bản dump SQL

File [`server/prisma/backup/booking_tenis.sql`](server/prisma/backup/booking_tenis.sql)
là ảnh chụp đầy đủ (schema + toàn bộ dữ liệu):

```bash
createdb -U postgres booking_tenis
psql -U postgres -d booking_tenis -f server/prisma/backup/booking_tenis.sql
```

Chi tiết thêm ở [`server/README.md`](server/README.md).

### Tài khoản demo (mật khẩu chung: `123456`)

| Vai trò | Đăng nhập bằng |
|---------|----------------|
| Quản trị | `0847968368` hoặc `admin@tennishub.vn` |
| Người dùng | `0900000001` (khải duy) |
| Khách khác | `0901234567` … `0922334455` |

Khu vực admin: <http://localhost:8081/admin/dashboard> trên trình duyệt (`pnpm web`),
đăng nhập bằng tài khoản admin.

---

## 8. Luồng hoạt động

### 8.1. Luồng dữ liệu (mỗi request)

```
Component (client)
   → gọi hàm trong lib/api/endpoints.ts
   → fetch tới http://localhost:4000/api/...
   → Controller (NestJS) nhận, validate bằng DTO
   → Service xử lý nghiệp vụ
   → Prisma truy vấn PostgreSQL
   → trả JSON đã map đúng kiểu client cần
```

### 8.2. Luồng đăng nhập (auth)

1. Người dùng đăng nhập → `POST /api/auth/login` trả về `{ token, user }`.
2. Token lưu ở **AsyncStorage** (khoá `tennishub.session`), quản lý bởi
   [`client/lib/api/session.tsx`](client/lib/api/session.tsx) — `SessionProvider` + hook `useSession()`.
3. Các request cần quyền gắn header `Authorization: Bearer <token>`.
4. Server có `JwtAuthGuard`: route công khai (`@Public`) bỏ qua, route admin (`@Roles`)
   kiểm tra vai trò.

### 8.3. Luồng đặt sân

1. Trang chi tiết sân → nút **Đặt lịch** → mở lưới `/product/<id>/schedule`.
2. Lưới gọi `GET /api/venues/:id/schedule?date=` → ô trống/đã đặt/khoá/sự kiện.
3. Chọn khung giờ → **Tiếp theo** → xác nhận → `POST /api/bookings` (server kiểm tra
   trùng giờ). Đặt xong lịch chuyển sang "Đã đặt" ngay trên lưới.

---

## 9. Nguyên tắc phát triển (bắt buộc đọc)

Chi tiết đầy đủ ở [`client/CODING_GUIDELINES.md`](client/CODING_GUIDELINES.md). Tóm tắt:

1. **Không hardcode dữ liệu nghiệp vụ trong JSX.** Chuỗi cố định để trong `content.ts`,
   dữ liệu động lấy từ API (`lib/api/`).
2. **Tách component theo trách nhiệm**: mỗi feature một thư mục
   `components/<feature>/<Component>/` gồm `index.tsx` (container), `components/` con,
   `content.ts`, `types.ts`.
3. **Import nội bộ dùng alias `@/…`**, không dùng `../../…`.
4. **Client là web Vite + React**: thẻ DOM + class Tailwind, dùng bộ UI ở `components/ui`.
   `div`/`button` mặc định bố cục flex dọc như React Native cũ (xem `client/global.css`).
5. **Trước khi bàn giao / commit** phải chạy sạch:
   ```bash
   # client
   cd client && pnpm build && pnpm lint
   # server
   cd server && pnpm exec tsc --noEmit -p tsconfig.build.json && pnpm lint
   ```
6. **Không hardcode enum ở nhiều nơi**: server đổi enum ↔ chuỗi client tại một chỗ
   duy nhất [`server/src/common/api-mapping.ts`](server/src/common/api-mapping.ts).
7. **Ngày** luôn `YYYY-MM-DD`, **giờ trong ngày** là số phút từ 00:00 (420 = 07:00);
   "hôm nay" tính theo giờ Việt Nam (Asia/Bangkok).

### Quy tắc Git

- Nhánh chính: `main`. Nhánh phát triển chung: `dev`.
- **Mỗi người làm trên nhánh riêng** tách từ `dev`, ví dụ `feat/ten-tinh-nang`, xong
  tạo Pull Request vào `dev`.
- Không commit trực tiếp lên `main`.
- Không commit `.env`, `node_modules`, `dist`, `src/generated` (đã có
  `.gitignore` lo việc này).
- Commit message rõ ràng: `feat: ...`, `fix: ...`, `refactor: ...`.

---

## 10. Cấu trúc thư mục

```
booking-tenis/
├── client/                     # Web Vite + PWA (người dùng + quản trị)
│   ├── router.tsx              # bảng route (react-router)
│   ├── app/                    # Trang, mỗi file một route
│   │   ├── index.tsx, home, map, discover, notifications, account/
│   │   ├── product/[slug]/     # Chi tiết sân + /schedule (đặt lịch trực quan)
│   │   ├── login, register, forgot-password
│   │   ├── admin/              # Khu vực quản trị
│   │   └── _layout.tsx         # khung chung (session, toast, cài PWA)
│   ├── components/             # Component theo feature
│   │   └── ui/                 # bộ UI dùng chung (thay Ant Design)
│   ├── lib/
│   │   ├── api/                # endpoints.ts, http.ts, session.tsx, types.ts
│   │   ├── format.ts           # tiền/số/bỏ dấu (không dùng Intl)
│   │   └── date.ts             # tiện ích ngày/giờ (theo giờ VN)
│   ├── vite.config.ts          # Vite + PWA (manifest, service worker)
│   └── .env.example            # mẫu cấu hình client
│
├── server/                     # API NestJS
│   ├── src/
│   │   ├── common/             # Prisma, JwtAuthGuard, api-mapping, date.util
│   │   ├── modules/            # auth, venues, bookings, account, catalog, admin
│   │   └── main.ts             # khởi động, prefix /api, CORS, Swagger
│   ├── prisma/
│   │   ├── schema.prisma       # định nghĩa bảng
│   │   ├── seed.ts             # dữ liệu mẫu
│   │   ├── migrations/         # lịch sử migration
│   │   └── backup/booking_tenis.sql   # bản dump khôi phục nhanh
│   ├── .env.example            # mẫu cấu hình server
│   └── README.md               # tài liệu riêng của backend
│
└── README.md                   # file bạn đang đọc
```

---

## 11. Lệnh hay dùng

### Server (`cd server`)

| Lệnh | Tác dụng |
|------|----------|
| `pnpm start:dev` | Chạy API, tự reload |
| `pnpm prisma:generate` | Sinh lại Prisma Client (sau khi đổi schema) |
| `pnpm db:migrate` | Tạo migration mới + áp dụng |
| `pnpm db:seed` | Nạp lại dữ liệu mẫu |
| `pnpm db:reset` | Xoá sạch DB → tạo lại → tự seed |
| `pnpm db:studio` | Mở giao diện xem/sửa dữ liệu (Prisma Studio) |
| `pnpm lint` | Kiểm tra code |

### Client (`cd client`)

| Lệnh | Tác dụng |
|------|----------|
| `pnpm dev` | Chạy web ở <http://localhost:8081> |
| `pnpm dev:lan` | Như trên, mở cho máy khác trong LAN |
| `pnpm build` | Typecheck + build ra `dist/` (kèm manifest, service worker PWA) |
| `pnpm preview` | Chạy thử bản build (thử cài PWA) |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` | Kiểm tra code (ESLint) |

---

## 12. Xử lý sự cố thường gặp

| Triệu chứng | Nguyên nhân & cách xử lý |
|-------------|--------------------------|
| App trắng / không tải được sân | Server chưa chạy hoặc sai `VITE_API_URL` (mở từ điện thoại phải dùng IP LAN). Mở `/api/health` kiểm tra. |
| `Can't reach database server` | Postgres chưa bật, hoặc `DATABASE_URL` sai mật khẩu/cổng. |
| `PrismaClient ... did not initialize` | Chưa chạy `pnpm prisma:generate`. |
| Lỗi CORS trên bản web | `CORS_ORIGIN` trong `server/.env` chưa khớp cổng web Vite (mặc định 8081). |
| Web vẫn hiện bản cũ sau khi deploy | Service worker PWA còn giữ cache: tải lại trang (bản mới tự cập nhật) hoặc xoá dữ liệu trang trong trình duyệt. |
| Đăng nhập xong vẫn hiện nút Đăng nhập | App: lắc máy → Reload. Web: hard-refresh (Ctrl+F5). |
| Sửa `schema.prisma` xong lỗi type | Chạy lại `pnpm prisma:generate`. |

---

## 13. Quy trình cho thành viên mới (checklist)

- [ ] Cài Node ≥ 20, pnpm ≥ 11, PostgreSQL, Git.
- [ ] `git clone` repo, `git checkout dev`.
- [ ] `cd server` → `pnpm install` → `cp .env.example .env` → điền `DATABASE_URL`.
- [ ] `pnpm prisma:generate` → `pnpm db:migrate` → `pnpm db:seed`.
- [ ] `pnpm start:dev` → kiểm tra `/api/health`.
- [ ] `cd client` → `pnpm install` → `cp .env.example .env`.
- [ ] `pnpm dev` → mở <http://localhost:8081> (khu admin ở `/admin/dashboard`).
- [ ] Đăng nhập thử tài khoản demo, vào thử màn đặt lịch.
- [ ] Đọc [`client/CODING_GUIDELINES.md`](client/CODING_GUIDELINES.md) trước khi code.
- [ ] Tạo nhánh riêng từ `dev`, làm task, mở Pull Request.
