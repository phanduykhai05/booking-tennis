# TennisHub – Booking sân tennis

TennisHub là ứng dụng web hỗ trợ người chơi tìm sân, xem khung giờ trống và đặt sân tennis trực tuyến.

## Công nghệ

- Next.js 16, React 19 và TypeScript
- Tailwind CSS 4
- pnpm

## Chạy dự án

Từ thư mục `client`:

```bash
pnpm install
pnpm dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

## Kiểm tra chất lượng

```bash
pnpm exec tsc --noEmit
pnpm lint
```

## Cấu trúc chính

```text
app/                         # Route và layout của Next.js
components/booking/          # Các feature nghiệp vụ đặt sân
components/layouts/          # Thành phần layout dùng chung
```

Dữ liệu nghiệp vụ mẫu được tách riêng khỏi component. Khi có backend, thay thế mock data bằng API adapter mà không cần thay đổi layout.
