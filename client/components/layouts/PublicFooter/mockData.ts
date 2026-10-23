import type { BottomNavigationItem } from "@/components/layouts/PublicFooter/types";

export const publicFooterLabel = "Điều hướng ứng dụng";

export const bottomNavigationLabel = "Điều hướng chính";

export const bottomNavigationItems: BottomNavigationItem[] = [
  { href: "/", icon: "home", id: "home", isActive: true, label: "Trang chủ" },
  { href: "/map", icon: "map", id: "map", label: "Bản đồ" },
  { href: "/discover", icon: "discover", id: "discover", isPrimary: true, label: "Khám phá" },
  { href: "/popular", icon: "popular", id: "popular", label: "Nổi bật" },
  { href: "/account", icon: "account", id: "account", label: "Tài khoản" },
];
