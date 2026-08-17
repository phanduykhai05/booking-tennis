import type { AccountMenuItem } from "@/components/account/AccountOverview/types";

export const accountContent = {
  activityTitle: "Hoạt động",
  appName: "ALOBO - Đặt lịch online sân thể thao",
  login: "Đăng nhập",
  offer: "Tạo tài khoản để nhận nhiều ưu đãi hơn",
  register: "Đăng kí",
  systemTitle: "Hệ thống",
};

export const activityItems: AccountMenuItem[] = [
  { href: "/bookings", icon: "calendar", id: "booking-history", label: "Danh sách lịch đã đặt" },
];

export const systemItems: AccountMenuItem[] = [
  { icon: "info", id: "version", label: "Thông tin phiên bản: 2.10.0" },
  { icon: "shield", id: "terms", label: "Điều khoản và chính sách" },
  { icon: "refresh", id: "updates", label: "Ứng dụng có gì mới" },
  { icon: "language", id: "language", label: "Ngôn ngữ - Tiếng Việt" },
];
