import type { HeaderAction, HeaderShortcut, PublicHeaderContent } from "@/components/layouts/PublicHeader/types";

export const publicHeaderContent: PublicHeaderContent = {
  brandName: "TennisHub",
  favoriteLabel: "Sân yêu thích",
  languageLabel: "Tiếng Việt",
  searchInputLabel: "Tìm kiếm sân",
  searchPlaceholder: "Tìm kiếm",
  searchSubmitLabel: "Tìm kiếm",
  todayFallbackLabel: "Hôm nay",
};

export const headerActions: HeaderAction[] = [
  { href: "/login", id: "login", label: "Đăng nhập" },
  { href: "/register", id: "register", label: "Đăng kí" },
];

export const headerShortcuts: HeaderShortcut[] = [
  { icon: "map", id: "map", label: "Bản đồ" },
  { icon: "booked", id: "booked", label: "Sân đã đặt" },
  { icon: "favorite", id: "favorite", label: "Yêu thích" },
];
