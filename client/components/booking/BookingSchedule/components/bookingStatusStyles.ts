import type { BookingStatus, PaymentStatus } from "@/components/booking/BookingSchedule/types";

export type BookingStatusStyle = {
  /** Dải màu đặc ở mép trái thẻ. */
  accent: string;
  background: string;
  border: string;
  text: string;
};

export const bookingStatusStyles: Record<BookingStatus, BookingStatusStyle> = {
  cancelled: { accent: "#94a3b8", background: "#f8fafc", border: "#e2e8f0", text: "#475569" },
  "checked-in": { accent: "#0ea5e9", background: "#f0f9ff", border: "#bae6fd", text: "#0c4a6e" },
  completed: { accent: "#8b5cf6", background: "#f5f3ff", border: "#ddd6fe", text: "#4c1d95" },
  confirmed: { accent: "#10b981", background: "#ecfdf5", border: "#a7f3d0", text: "#064e3b" },
  pending: { accent: "#f59e0b", background: "#fffbeb", border: "#fde68a", text: "#78350f" },
};

export const paymentDotColor: Record<PaymentStatus, string> = {
  failed: "#f43f5e",
  paid: "#10b981",
  partial: "#f59e0b",
  refunded: "#8b5cf6",
  unpaid: "#cbd5e1",
};
