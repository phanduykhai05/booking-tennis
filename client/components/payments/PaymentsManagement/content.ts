import type { PaymentMethod, PaymentStatus } from "@/components/admin/AdminData/types";

export const paymentsContent = {
  allStatusesLabel: "Tất cả trạng thái",
  description: "Đối soát doanh thu và trạng thái thanh toán gắn với từng booking sân tennis.",
  emptyLabel: "Không tìm thấy giao dịch phù hợp.",
  methodLabels: {
    "bank-transfer": "Chuyển khoản",
    card: "Thẻ",
    cash: "Tiền mặt",
    "e-wallet": "Ví điện tử",
  } satisfies Record<PaymentMethod, string>,
  searchPlaceholder: "Mã giao dịch, booking hoặc khách hàng",
  statusLabels: {
    failed: "Thất bại",
    paid: "Đã thanh toán",
    partial: "Đã đặt cọc",
    refunded: "Đã hoàn tiền",
    unpaid: "Chưa thanh toán",
  } satisfies Record<PaymentStatus, string>,
  title: "Thanh toán",
};
