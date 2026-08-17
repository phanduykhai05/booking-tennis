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

export const bookingStatusStyles: Record<ApiBooking["status"], string> = {
  cancelled: "bg-[#f1f2f1] text-[#6c7671]",
  "checked-in": "bg-[#e5f1ff] text-[#1f5fa8]",
  completed: "bg-[#ede7ff] text-[#5b3fbf]",
  confirmed: "bg-[#e2f7ec] text-[#0b7a48]",
  pending: "bg-[#fff3d9] text-[#96650a]",
};
