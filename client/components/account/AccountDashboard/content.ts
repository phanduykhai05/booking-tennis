import type { DashboardItem, DashboardShortcut } from "@/components/account/AccountDashboard/types";

export const accountDashboardContent = {
  activityTitle: "Hoạt động",
  emailPrompt: "Chưa cập nhật email",
  guestInitial: "?",
  guestName: "Khách",
  membership: "Hạng thành viên",
  securityDescription: "Liên kết email ngay để đăng nhập lại khi quên mật khẩu khi cần.",
  securityTitle: "Tăng cường bảo mật tài khoản!",
  setupNow: "Thiết lập ngay",
  signIn: "Đăng nhập",
  signOut: "Đăng xuất",
  systemTitle: "Hệ thống",
  version: "Thông tin phiên bản: 2.10.0",
};

export const accountShortcuts: DashboardShortcut[] = [
  { id: "booking", label: "Lịch đã đặt" },
  { id: "notification", label: "Thông báo" },
  { id: "course", label: "Khóa học" },
  { id: "offer", label: "Ưu đãi" },
];

export const activityItems: DashboardItem[] = [
  { icon: "group", id: "group", label: "Nhóm của tôi" },
  { icon: "graduation", id: "course-list", label: "Danh sách lịch học" },
  { icon: "member", id: "membership", label: "Gói hội viên" },
];

export const systemItems: DashboardItem[] = [
  { icon: "settings", id: "settings", label: "Cài đặt" },
  { icon: "version", id: "version", label: "Thông tin phiên bản" },
];
