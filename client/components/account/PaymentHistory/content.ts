import type { StatusTone } from "@/components/ui/Tag";
import type { ApiPayment } from "@/lib/api/types";

export const paymentHistoryContent = {
  backLabel: "Quay lại trang tài khoản",
  bookingLabel: "Mã lịch",
  eventLabel: "Sự kiện",
  empty: "Bạn chưa có giao dịch nào",
  errorMessage: "Không tải được lịch sử giao dịch",
  loading: "Đang tải giao dịch…",
  methodLabel: "Hình thức",
  paidAtLabel: "Thanh toán lúc",
  signInRequired: "Đăng nhập để xem lịch sử giao dịch",
  title: "Lịch sử giao dịch",
  transactionLabel: "Mã giao dịch",
};

export const paymentMethodLabels: Record<ApiPayment["method"], string> = {
  "bank-transfer": "Chuyển khoản",
  card: "Thẻ ngân hàng",
  cash: "Tiền mặt",
  "e-wallet": "Ví điện tử",
  sepay: "Chuyển khoản SePay",
};

export const paymentStatusLabels: Record<ApiPayment["status"], string> = {
  failed: "Thất bại",
  paid: "Đã thanh toán",
  partial: "Đã đặt cọc",
  refunded: "Đã hoàn tiền",
  unpaid: "Chưa thanh toán",
};

export const paymentStatusTones: Record<ApiPayment["status"], StatusTone> = {
  failed: "rose",
  paid: "emerald",
  partial: "orange",
  refunded: "violet",
  unpaid: "slate",
};
