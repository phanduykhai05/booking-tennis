import type { CourtScheduleContent } from "@/components/booking/CourtScheduleBooking/types";

export const courtScheduleContent: CourtScheduleContent = {
  backLabel: "Quay lại trang sân",
  confirmSheet: {
    backLabel: "Chọn thêm",
    confirmLabel: "Xác nhận giữ chỗ",
    emptyMessage: "Bạn chưa chọn khung giờ nào",
    signInMessage: "Bạn cần đăng nhập để giữ chỗ.",
    successMessage: "Đã giữ chỗ các khung giờ bạn chọn.",
    title: "Xác nhận khung giờ",
  },
  datePickerLabel: "Chọn ngày đặt lịch",
  emptySelection: "Chạm vào ô trống để chọn khung giờ",
  errorMessage: "Không tải được lịch sân",
  hotline: "0847.968.368",
  loadingMessage: "Đang tải lịch sân…",
  nextLabel: "Tiếp theo",
  notice: {
    prefix: "Lưu ý:",
    suffix: "để được hỗ trợ",
    text: "Nếu bạn cần đặt lịch cố định vui lòng liên hệ:",
  },
  priceListLabel: "Xem sân & bảng giá",
  priceSheet: {
    closeLabel: "Đóng",
    courtsTitle: "Danh sách sân",
    priceTitle: "Bảng giá thuê sân",
    priceUnit: "/giờ",
    title: "Sân & bảng giá",
  },
  retryLabel: "Thử lại",
  scrollLabel: "Kéo để xem thêm khung giờ",
  selectedSummary: "khung giờ đã chọn",
  slotStatusLabels: {
    available: "Trống",
    booked: "Đã đặt",
    event: "Sự kiện",
    locked: "Khoá",
  },
  timeColumnLabel: "Giờ",
  title: "Đặt lịch theo sân - trực quan",
  totalLabel: "Tạm tính",
};
