import type { AdminNavigationItem, AdminShellContent } from "@/components/layouts/AdminShell/types";

export const adminShellContent: AdminShellContent = {
  brandName: "TennisHub Admin",
  commandPlaceholder: "Tìm nhanh trong hệ thống",
  menuLabel: "Mở menu quản trị",
  navigationLabel: "Điều hướng quản trị",
  notificationLabel: "Thông báo",
  roleLabel: "Quản trị viên",
  userInitials: "TH",
  userName: "TennisHub",
};

export const adminNavigationItems: AdminNavigationItem[] = [
  { href: "/dashboard", icon: "dashboard", id: "dashboard", label: "Tổng quan" },
  { href: "/bookings", icon: "bookings", id: "bookings", label: "Lịch đặt sân" },
  { href: "/courts", icon: "courts", id: "courts", label: "Quản lý sân" },
  { href: "/customers", icon: "customers", id: "customers", label: "Khách hàng" },
  { href: "/payments", icon: "payments", id: "payments", label: "Thanh toán" },
];
