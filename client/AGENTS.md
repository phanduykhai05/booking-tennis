# Quy ước cho client (Expo / React Native)

Đây là ứng dụng Expo, **không phải Next.js**. Trước khi viết code:

- Điều hướng theo file trong `app/` bằng **expo-router** (`useRouter`, `Link`, `Redirect`).
  Không dùng `next/link`, `next/navigation`, `next/image`.
- Mọi phần tử là component React Native (`View`, `Text`, `Pressable`, `ScrollView`…),
  không dùng thẻ DOM. Ngoại lệ duy nhất: file có đuôi `.web.tsx` (chỉ vào bundle web).
- Chữ luôn nằm trong `<Text>`; RN không render chuỗi trần.
- Style viết bằng `className` của NativeWind. Các tiện ích chỉ có trên web
  (`grid`, `sticky`, `fixed`, `last:`, `group-hover:`, `focus-visible:`, `backdrop-*`)
  không hoạt động trên native — dùng flex, `absolute`, hoặc prop thay thế.
- Icon lấy từ `lucide-react-native`; icon bộ alobo lấy từ `@/components/assets/icons`.
  Ảnh bitmap lấy từ `@/components/assets/images`.
- Không dùng `Intl` cho tiền/ngày: dùng `@/lib/format` và `@/lib/date`.

## Team workflow

Before implementing or reviewing code, read and follow [CODING_GUIDELINES.md](./CODING_GUIDELINES.md).
