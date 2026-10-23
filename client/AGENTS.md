# Quy ước cho client (Vite + React + PWA)

Đây là ứng dụng web **Vite + React 19**, cài được như **PWA** (vite-plugin-pwa). Không còn Expo/React Native.
Trước khi viết code:

- Điều hướng bằng **react-router** (`useNavigate`, `useParams`, `Link`, `Navigate`). Bảng route nằm ở
  `router.tsx`; mỗi trang là một file trong `app/` (default export), tải lười theo route.
- Phần tử là thẻ DOM thường (`div`, `span`, `button`, `input`…), style bằng class **Tailwind v3**.
- `global.css` cho mọi `div`/`button` mặc định bố cục kiểu React Native cũ (flex dọc, `relative`,
  không co lại) với độ ưu tiên 0 — class Tailwind vẫn ghi đè được. Muốn bố cục ngang thì thêm `flex-row`.
- Trang không tự cuộn; mỗi màn hình cuộn trong vùng `overflow-y-auto` của nó.
- Dùng component dùng chung ở `@/components/ui` (`Touch`, `Button`, `Sheet`, `TextField`, `Spinner`…)
  thay vì tự dựng lại.
- Icon lấy từ `lucide-react`; icon bộ alobo lấy từ `@/components/assets/icons` (file .svg import thành
  component nhờ vite-plugin-svgr). Ảnh bitmap lấy từ `@/components/assets/images` (giá trị là URL).
- Không dùng `Intl` cho tiền/ngày: dùng `@/lib/format` và `@/lib/date`.
- Biến môi trường phía client phải bắt đầu bằng `VITE_` (ví dụ `VITE_API_URL`) và được nhúng lúc build.

## Lệnh

```bash
pnpm dev          # http://localhost:8081
pnpm build        # typecheck + build ra dist/ (kèm manifest và service worker PWA)
pnpm preview      # chạy thử bản build
pnpm lint
```

## Team workflow

Before implementing or reviewing code, read and follow [CODING_GUIDELINES.md](./CODING_GUIDELINES.md).
