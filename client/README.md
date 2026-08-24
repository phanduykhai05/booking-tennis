# TennisHub – Ứng dụng đặt sân thể thao

Ứng dụng **Expo (React Native)** dùng chung một mã nguồn cho:

- **Người dùng** — chạy thành app trên Android / iOS.
- **Quản trị** — mở bằng trình duyệt qua Expo Web (`/admin`).

## Công nghệ

- Expo SDK 54, React Native 0.81, React 19, TypeScript
- expo-router (điều hướng theo cấu trúc thư mục `app/`)
- NativeWind 4 + Tailwind CSS 3 (giữ nguyên cách viết `className`)
- react-native-svg, lucide-react-native, expo-image, react-native-webview
- pnpm (bắt buộc `nodeLinker: hoisted`, xem [pnpm-workspace.yaml](./pnpm-workspace.yaml))

## Phiên bản Expo

Project chốt ở **SDK 54** để chạy được với **Expo Go 54.x** — bản mới nhất mà App Store
còn phát hành cho iOS của nhóm. Muốn lên SDK cao hơn thì phải dùng
[development build](https://docs.expo.dev/develop/development-builds/introduction/)
thay cho Expo Go (iOS cần macOS hoặc EAS Build).

## Cấu hình

Sao chép `.env.example` thành `.env` rồi chỉnh gốc API:

```bash
cp .env.example .env
```

```
EXPO_PUBLIC_API_URL=http://localhost:4000/api
```

> Máy thật và giả lập **không gọi được `localhost` của máy dev**. Khi chạy trên điện
> thoại, đổi thành IP LAN của máy chạy backend, ví dụ `http://192.168.1.10:4000/api`.

## Chạy dự án

Từ thư mục `client`:

```bash
pnpm install
pnpm start          # mở Expo Dev Server, quét QR bằng Expo Go
```

Các lệnh khác:

```bash
pnpm android        # mở thẳng trên Android
pnpm ios            # mở thẳng trên iOS (cần macOS)
pnpm web            # mở bản web — dùng cho khu quản trị /admin
```

## Kiểm tra chất lượng

```bash
pnpm typecheck                       # tsc --noEmit
npx expo export --platform android   # dựng bundle native, bắt lỗi resolve/transform
npx expo export --platform web       # dựng bản web tĩnh
```

## Cấu trúc chính

```text
app/                     # Route của expo-router
  index.tsx              #   / (trang chủ công khai)
  home.tsx               #   /home (trang chủ sau đăng nhập)
  product/[slug]/        #   chi tiết sân và lưới đặt lịch
  admin/                 #   khu quản trị (chạy tốt nhất trên web)
  +html.tsx              #   vỏ HTML của bản web (manifest PWA, theme-color)
components/<feature>/    # Feature nghiệp vụ, mỗi thư mục một trách nhiệm
components/ui/           # Bộ UI dùng chung (Button, Select, Sheet, DataTable…)
components/assets/       # Ảnh bitmap (images) và icon SVG (icons)
lib/api/                 # Adapter gọi API NestJS + phiên đăng nhập
lib/format.ts, lib/date.ts  # Định dạng số/tiền/ngày không phụ thuộc Intl
```

## Ghi chú khi chuyển từ Next.js

- **Không còn server component.** Màn hình gọi API khi mount bằng `useAsync` trong
  [lib/useAsync.ts](./lib/useAsync.ts).
- **Phiên đăng nhập** lưu ở AsyncStorage qua `SessionProvider`; `isReady` cho biết đã
  đọc xong hay chưa (trước đây `localStorage` đọc đồng bộ nên không cần chờ).
- **Ant Design đã được thay** bằng bộ UI trong `components/ui/` vì antd chỉ chạy trên DOM.
- **Bản đồ** dùng Leaflet trong WebView, giữ nguyên tile OpenStreetMap của bản web.
- **Cờ quốc gia** vẽ bằng emoji suy ra từ mã ISO thay vì nhúng 248 file SVG (~4 MB) vào bundle.
- **Bản web build ở chế độ `static`**: mỗi route có một file HTML. Khi deploy lên host
  tĩnh nhớ bật rewrite cho route động `/product/:slug`.
