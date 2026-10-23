# TennisHub – Ứng dụng đặt sân thể thao

Ứng dụng web **Vite + React**, cài được lên điện thoại như **PWA** (thêm vào màn hình chính),
dùng chung một mã nguồn cho:

- **Người dùng** — đặt sân, mua vé, thanh toán SePay.
- **Quản trị** — khu `/admin`.

## Công nghệ

- Vite 8, React 19.2, TypeScript
- react-router 8 (bảng route ở [router.tsx](./router.tsx), mỗi trang là một file trong `app/`)
- Tailwind CSS 3
- vite-plugin-pwa (manifest + service worker), vite-plugin-svgr (import .svg thành component)
- lucide-react; bản đồ Leaflet + OpenStreetMap (tải từ CDN)

## Cấu hình

Sao chép `.env.example` thành `.env` rồi chỉnh gốc API:

```bash
cp .env.example .env
```

```
VITE_API_URL=http://localhost:4000/api
```

> Mở bằng điện thoại trong mạng LAN thì đổi thành IP LAN của máy chạy backend, ví dụ
> `http://192.168.1.10:4000/api`, rồi chạy `pnpm dev:lan`.

## Chạy dự án

Từ thư mục `client`:

```bash
pnpm install
pnpm dev            # http://localhost:8081
```

Các lệnh khác:

```bash
pnpm dev:lan        # mở cho máy khác trong mạng LAN truy cập
pnpm build          # typecheck + build ra dist/ (kèm manifest và service worker PWA)
pnpm preview        # chạy thử bản build — cách duy nhất để thử cài PWA ở máy dev
pnpm lint
```

## Cấu trúc chính

```text
index.html, main.tsx     # điểm vào của Vite
router.tsx               # bảng route (react-router), trang tải lười theo route
app/                     # Trang
  _layout.tsx            #   khung chung: session, toast, lời mời cài PWA
  index.tsx              #   / (trang chủ công khai)
  home.tsx               #   /home (trang chủ sau đăng nhập)
  product/[slug]/        #   chi tiết sân và lưới đặt lịch
  admin/                 #   khu quản trị
components/<feature>/    # Feature nghiệp vụ, mỗi thư mục một trách nhiệm
components/ui/           # Bộ UI dùng chung (Touch, Button, Select, Sheet, DataTable…)
components/assets/       # Ảnh bitmap (images) và icon SVG (icons)
lib/api/                 # Adapter gọi API NestJS + phiên đăng nhập (localStorage)
lib/format.ts, lib/date.ts  # Định dạng số/tiền/ngày không phụ thuộc Intl
```

## Ghi chú khi chuyển từ Expo

- Không còn bản app native iOS/Android; người dùng cài bản web như PWA.
- `global.css` giữ bố cục mặc định kiểu React Native cho `div`/`button` (flex dọc, `relative`)
  để giao diện không đổi sau khi chuyển; xem chú thích trong file.
- Production: server NestJS phục vụ luôn `dist/` cùng origin với API và trả `index.html` cho mọi
  route không phải `/api` (xem `serveWebBuild` trong `server/src/main.ts`).
