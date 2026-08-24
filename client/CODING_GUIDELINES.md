# Quy tắc phát triển TennisHub – Booking sân tennis

Mọi thành viên cần đọc tài liệu này trước khi bắt đầu một task. Leader chịu trách nhiệm xác nhận phạm vi, cấu trúc và điểm tích hợp; thành viên chỉ triển khai trong phạm vi đã được giao.

Client là **ứng dụng Expo (React Native)** chạy trên Android/iOS, đồng thời mở được trên
trình duyệt qua Expo Web cho khu quản trị.

## Quy trình làm việc

1. Đọc `AGENTS.md`, tài liệu feature liên quan và kiểm tra thay đổi đang có trước khi sửa code.
2. Leader xác định: route, API contract, trạng thái loading/error/empty, component ownership và tiêu chí nghiệm thu.
3. Tạo hoặc chọn feature folder trước khi code. Không đặt UI feature mới trực tiếp trong `app/`.
4. Tách component theo một trách nhiệm: container/orchestration, presentational component, media, controls, data/types. `index.tsx` chỉ ghép layout và điều phối state khi có thể.
5. Đặt mock data, constants, types và API adapter ngoài component render. Khi có API, thay adapter/data source; không sửa layout chỉ để đổi nguồn dữ liệu.
6. Import nội bộ luôn dùng alias `@/…`; không dùng relative import như `../../…`.
7. Chạy `pnpm typecheck` và `npx expo export --platform android` trước khi bàn giao.

## Cấu trúc component

```text
components/<feature>/<ComponentName>/
├── index.tsx                 # public container/composition
├── components/               # component con theo trách nhiệm
├── mockData.ts               # chỉ dùng trong giai đoạn chưa có API
└── types.ts                  # type dùng chung khi cần
```

- Không đặt component dài nhiều trách nhiệm trong một file.
- Không đặt SVG/icon dùng lại, controls, card hoặc media chung trực tiếp trong container.
- Props phải có type rõ ràng. Dữ liệu danh sách luôn render bằng `map` với `key` ổn định.
- Tái sử dụng bộ UI ở `components/ui/` (Button, TextField, Select, Sheet, Drawer,
  DataTable, Tag, Card…) thay vì dựng lại control mới.

## Ràng buộc của React Native

- Mọi chuỗi phải nằm trong `<Text>`; `<View>` không render text trần.
- Không có `position: fixed`, `position: sticky`, CSS grid, hay pseudo-class
  (`:last-child`, `:hover`, `:focus-visible`). Dùng flex, `absolute`, hoặc prop.
- Dùng `Modal` cho sheet/drawer/dialog thay vì portal.
- Bóng đổ dùng `shadow` trong `@/components/ui/theme` (RN cần cả `shadow*` lẫn `elevation`).
- Cuộn ngang dùng `ScrollView horizontal`; cột "dính" phải tách ra ngoài vùng cuộn.
- Không gọi `Intl` — Hermes trên Android có thể thiếu dữ liệu locale. Dùng `@/lib/format`
  và `@/lib/date`.
- Code chỉ chạy được trên trình duyệt (`window`, `document`, API PWA) phải đặt trong file
  `*.web.tsx`, kèm bản native trả về `null`.

## Không hardcode dữ liệu nghiệp vụ

- Cấm hardcode trong JSX: tên sự kiện, URL, nhãn CTA, ảnh, giá, category, social link hoặc cấu hình API.
- Đưa mock data vào `mockData.ts`; API adapter trả về đúng type đã định nghĩa.
- Chuỗi accessibility thuần kỹ thuật (`accessibilityLabel`) và style token có thể nằm trong component nếu không thuộc dữ liệu nghiệp vụ.
- Không dùng link giả cho tính năng đã có route thật. Nếu chưa xác định được link, báo leader để bổ sung contract.

## Styling và chất lượng

- Dùng design token/NativeWind theo hệ thống đang có; không copy class/style lặp lại giữa component.
- Kiểm tra tối thiểu trên một máy Android (hoặc giả lập) và trên bản web.
- Không thêm package khi chưa được leader đồng ý.
- Không xoá hoặc ghi đè thay đổi của người khác. Nếu có xung đột, dừng và báo leader.
- Bàn giao phải nêu: file thay đổi, mock/API contract, kiểm tra đã chạy và phần còn phụ thuộc bên khác.
