import type { StatusTone } from "@/components/ui/Tag";
import type { ApiBooking } from "@/lib/api/types";

export const bookingHistoryContent = {
  allDates: "Xem tất cả",
  cancelLabel: "Huỷ lịch",
  cancelledLabel: "Đã huỷ",
  codeLabel: "Mã",
  empty: "Bạn chưa có lịch đặt",
  loading: "Đang tải lịch đặt…",
  signInRequired: "Đăng nhập để xem lịch đã đặt",
  title: "Danh sách đặt lịch",
};

export const bookingStatusLabels: Record<ApiBooking["status"], string> = {
  cancelled: "Đã huỷ",
  "checked-in": "Đã nhận sân",
  completed: "Hoàn thành",
  confirmed: "Đã xác nhận",
  pending: "Chờ xác nhận",
};

export const paymentStatusLabels: Record<ApiBooking["paymentStatus"], string> = {
  failed: "Thanh toán lỗi",
  paid: "Đã thanh toán",
  partial: "Đã đặt cọc",
  refunded: "Đã hoàn tiền",
  unpaid: "Chưa thanh toán",
};

export const bookingStatusTones: Record<ApiBooking["status"], StatusTone> = {
  cancelled: "slate",
  "checked-in": "blue",
  completed: "violet",
  confirmed: "emerald",
  pending: "orange",
};
