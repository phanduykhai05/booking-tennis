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
| Thành viên | Gia Bảo | N23DVCN0__ *(cập nhật sau)* |

---

## 2. Mục đích & phạm vi

- **Người dùng**: tìm sân gần mình (danh sách + bản đồ), xem chi tiết sân, **đặt lịch
  theo sân trực quan** (chọn khung giờ trên lưới), mua vé sự kiện, xem lịch đã đặt,
  nhận thông báo, quản lý tài khoản.
- **Quản trị (admin)**: xem toàn bộ sân/lịch/khách hàng/thanh toán, tạo lịch tại quầy,
  đổi trạng thái lịch/thanh toán, khoá/mở tài khoản khách.

Toàn bộ dữ liệu (sân, giá, lịch, người dùng…) nằm ở **PostgreSQL**, truy cập qua **API
NestJS**. Phía web **không còn dùng mock data** — mọi màn hình đọc dữ liệu thật từ API.

---

## 3. Kiến trúc tổng quan

```
┌─────────────────────┐        HTTP /api        ┌──────────────────────┐        ┌──────────────┐
│  client (Expo/RN)   │  ───────────────────▶   │   server (NestJS)    │  ───▶  │  PostgreSQL  │
│  app + web /admin   │  ◀───────────────────   │   cổng 4000          │        │ booking_tenis│
│  React Native 0.81  │        JSON             │   Prisma 7 (ORM)     │        └──────────────┘
└─────────────────────┘                         └──────────────────────┘
```

| Tầng | Công nghệ | Thư mục |
|------|-----------|---------|
| Frontend | Expo SDK 54, React Native 0.81, expo-router, TypeScript, NativeWind 4 | [`client/`](client/) |
| Backend | NestJS 11, Prisma 7, class-validator, JWT, Swagger | [`server/`](server/) |
| Cơ sở dữ liệu | PostgreSQL 18 | (schema ở [`server/prisma/schema.prisma`](server/prisma/schema.prisma)) |

---

## 4. Yêu cầu môi trường

Cài sẵn trên máy trước khi bắt đầu:

- **Node.js** ≥ 20 (khuyên dùng 20 hoặc mới hơn)
- **pnpm** ≥ 11 — cài bằng `npm install -g pnpm`
- **PostgreSQL** ≥ 14 (dự án đang chạy trên 18). Nhớ mật khẩu user `postgres`.
- **Git**
- **Expo Go** trên điện thoại (Android/iOS) — dùng để chạy app người dùng.
  Bản Expo Go phải là **SDK 54** (khớp với project); xem mục 6.2.

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
| `EXPO_PUBLIC_API_URL` | Gốc API mà app gọi tới | `http://localhost:4000/api` |

> ⚠️ Chỉ biến bắt đầu bằng `EXPO_PUBLIC_` mới lộ ra phía client. Khi chạy trên **điện
> thoại thật hoặc giả lập**, `localhost` trỏ về chính thiết bị đó — phải đổi thành IP
> LAN của máy chạy backend, ví dụ `http://192.168.1.10:4000/api`.

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
pnpm start                  # mở Expo Dev Server, quét QR bằng Expo Go
```

- **Người dùng (app)**: quét mã QR bằng Expo Go, hoặc `pnpm android` / `pnpm ios`.
- **Quản trị (web)**: `pnpm web` rồi mở <http://localhost:8081/admin/dashboard>.

> **Expo Go phải cùng SDK với project.** Project chốt **SDK 54** vì đó là bản Expo Go
> mới nhất App Store còn phát hành cho thiết bị của nhóm. Nếu Expo Go báo
> *"Project is incompatible with this version of Expo Go"* thì SDK hai bên lệch nhau.
> Muốn dùng SDK cao hơn thì phải bỏ Expo Go, chuyển sang
> [development build](https://docs.expo.dev/develop/development-builds/introduction/)
> (iOS cần macOS hoặc EAS Build).

> Sau khi đổi `app.json`, `.env` hay version package, chạy lại với `--clear` để xoá
> cache Metro: `npx expo start --clear`.

> Thứ tự đúng: **server chạy trước** rồi mới tới client, vì các màn hình dùng dữ liệu từ
> API. Nếu app trắng/lỗi tải → kiểm tra server đã chạy và `EXPO_PUBLIC_API_URL` đã trỏ
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
4. **Client là React Native**: dùng `View`/`Text`/`Pressable`, không dùng thẻ DOM;
   chữ luôn nằm trong `<Text>`. Code chỉ chạy trên trình duyệt đặt ở file `*.web.tsx`.
5. **Trước khi bàn giao / commit** phải chạy sạch:
   ```bash
   # client
   cd client && pnpm typecheck && pnpm lint && npx expo export --platform android
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
- Không commit `.env`, `node_modules`, `dist`, `.expo`, `src/generated` (đã có
  `.gitignore` lo việc này).
- Commit message rõ ràng: `feat: ...`, `fix: ...`, `refactor: ...`.

---

## 10. Cấu trúc thư mục

```
booking-tenis/
├── client/                     # Ứng dụng Expo (app người dùng + web admin)
│   ├── app/                    # Route của expo-router
│   │   ├── index.tsx, home, map, discover, notifications, account/
│   │   ├── product/[slug]/     # Chi tiết sân + /schedule (đặt lịch trực quan)
│   │   ├── login, register, forgot-password
│   │   ├── admin/              # Khu vực quản trị (dùng trên web)
│   │   └── +html.tsx           # vỏ HTML bản web (manifest PWA)
│   ├── components/             # Component theo feature
│   │   └── ui/                 # bộ UI dùng chung (thay Ant Design)
│   ├── lib/
│   │   ├── api/                # endpoints.ts, http.ts, session.tsx, types.ts
│   │   ├── format.ts           # tiền/số/bỏ dấu (không dùng Intl)
│   │   └── date.ts             # tiện ích ngày/giờ (theo giờ VN)
│   ├── app.json                # cấu hình Expo
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
| `pnpm start` | Chạy Expo Dev Server (thêm `--clear` khi đổi config) |
| `pnpm android` / `pnpm ios` | Mở thẳng trên máy/giả lập |
| `pnpm web` | Chạy bản web — dùng cho khu quản trị `/admin` |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` | Kiểm tra code (ESLint) |
| `npx expo export --platform android` | Dựng bundle, bắt lỗi resolve/transform |
| `npx expo-doctor` | Kiểm tra cấu hình và version package |

---

## 12. Xử lý sự cố thường gặp

| Triệu chứng | Nguyên nhân & cách xử lý |
|-------------|--------------------------|
| App trắng / không tải được sân | Server chưa chạy hoặc sai `EXPO_PUBLIC_API_URL` (trên máy thật phải dùng IP LAN). Mở `/api/health` kiểm tra. |
| `Can't reach database server` | Postgres chưa bật, hoặc `DATABASE_URL` sai mật khẩu/cổng. |
| `PrismaClient ... did not initialize` | Chưa chạy `pnpm prisma:generate`. |
| Lỗi CORS trên bản web | `CORS_ORIGIN` trong `server/.env` chưa khớp cổng Expo Web (mặc định 8081). |
| `Project is incompatible with this version of Expo Go` | Expo Go trên máy khác SDK với project. Cập nhật Expo Go, hoặc báo leader để hạ SDK project cho khớp. |
| Bundling lỗi lạ sau khi đổi version/config | Cache Metro cũ. Dừng server rồi `npx expo start --clear`. |
| Đăng nhập xong vẫn hiện nút Đăng nhập | App: lắc máy → Reload. Web: hard-refresh (Ctrl+F5). |
| Sửa `schema.prisma` xong lỗi type | Chạy lại `pnpm prisma:generate`. |

---

## 13. Quy trình cho thành viên mới (checklist)

- [ ] Cài Node ≥ 20, pnpm ≥ 11, PostgreSQL, Git và **Expo Go (SDK 54)** trên điện thoại.
- [ ] `git clone` repo, `git checkout dev`.
- [ ] `cd server` → `pnpm install` → `cp .env.example .env` → điền `DATABASE_URL`.
- [ ] `pnpm prisma:generate` → `pnpm db:migrate` → `pnpm db:seed`.
- [ ] `pnpm start:dev` → kiểm tra `/api/health`.
- [ ] `cd client` → `pnpm install` → `cp .env.example .env`.
- [ ] `pnpm start` → quét QR bằng Expo Go (hoặc `pnpm web` cho khu admin).
- [ ] Đăng nhập thử tài khoản demo, vào thử màn đặt lịch.
- [ ] Đọc [`client/CODING_GUIDELINES.md`](client/CODING_GUIDELINES.md) trước khi code.
- [ ] Tạo nhánh riêng từ `dev`, làm task, mở Pull Request.
