import type { AppNotification } from "@/components/notifications/NotificationCenter/types";

export const notificationContent = {
  allRead: "Đánh dấu đã đọc",
  empty: "Bạn chưa có thông báo nào!",
  settings: "Cài đặt thông báo",
  title: "Thông báo",
  today: "Hôm nay",
  earlier: "Trước đó",
};

export const mockNotifications: AppNotification[] = [
  { id: "booking-reminder", isRead: false, kind: "booking", message: "Sự kiện SOCIAL SÁNG sẽ bắt đầu sau 30 phút. Hãy chuẩn bị để có buổi chơi thật vui nhé!", time: "08:30", title: "Nhắc lịch tham gia sự kiện" },
  { id: "promotion", isRead: false, kind: "promotion", message: "Ưu đãi giảm 15% khi đặt sân Pickleball hôm nay đã sẵn sàng cho bạn.", time: "07:15", title: "Ưu đãi dành riêng cho bạn" },
  { id: "profile", isRead: true, kind: "system", message: "Cập nhật email để bảo mật tài khoản và dễ dàng khôi phục mật khẩu khi cần.", time: "Hôm qua", title: "Hoàn thiện thông tin tài khoản" },
  { id: "membership", isRead: true, kind: "system", message: "Khám phá các quyền lợi mới trong gói hội viên của bạn.", time: "16/08", title: "Thông tin gói hội viên" },
];
