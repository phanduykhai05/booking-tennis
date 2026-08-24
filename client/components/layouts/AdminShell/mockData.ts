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

export const adminHomeHref = "/admin/dashboard";

// Route thật nằm dưới app/admin nên mọi href đều phải có tiền tố /admin.
export const adminNavigationItems: AdminNavigationItem[] = [
  { href: "/admin/dashboard", icon: "dashboard", id: "dashboard", label: "Tổng quan" },
  { href: "/admin/bookings", icon: "bookings", id: "bookings", label: "Lịch đặt sân" },
  { href: "/admin/courts", icon: "courts", id: "courts", label: "Quản lý sân" },
  { href: "/admin/customers", icon: "customers", id: "customers", label: "Khách hàng" },
  { href: "/admin/payments", icon: "payments", id: "payments", label: "Thanh toán" },
];
