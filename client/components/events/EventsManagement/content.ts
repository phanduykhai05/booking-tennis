import type { TicketStatus } from "@/components/admin/AdminData/types";
import type { StatusTone } from "@/components/admin/shared/StatusBadge";

export const eventsContent = {
  allVenuesLabel: "Tất cả cơ sở",
  capacityLabel: "Sức chứa",
  courtLabel: "Sân",
  createLabel: "Thêm sự kiện",
  deleteConfirm: "Xoá sự kiện này? Thao tác không thể hoàn tác.",
  deleteLabel: "Xoá sự kiện",
  description: "Tạo sự kiện bán vé, gắn vào sân và khung giờ thật để lưới lịch tự khoá chỗ.",
  editLabel: "Sửa sự kiện",
  emptyLabel: "Chưa có sự kiện nào.",
  emptyTickets: "Chưa có ai mua vé sự kiện này.",
  noCourtLabel: "Không gắn sân",
  noCourtNotice: "Không gắn sân thì sự kiện vẫn bán vé nhưng KHÔNG khoá khung giờ nào trên lưới lịch.",
  saveLabel: "Lưu sự kiện",
  searchPlaceholder: "Tìm theo tên sự kiện",
  soldLabel: "Đã bán",
  ticketsLabel: "Danh sách vé",
  title: "Quản lý sự kiện",
  viewTicketsLabel: "Xem vé đã bán",
};

export const ticketStatusLabels: Record<TicketStatus, string> = {
  cancelled: "Đã huỷ",
  paid: "Đã thanh toán",
  pending: "Chờ thanh toán",
};

export const ticketStatusTones: Record<TicketStatus, StatusTone> = {
  cancelled: "slate",
  paid: "emerald",
  pending: "orange",
};
