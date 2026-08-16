import type { BookingStatus, PaymentStatus } from "@/components/booking/BookingSchedule/types";

export type BookingStatusStyle = {
  accent: string;
  card: string;
};

// accent: dải màu đặc ở mép trái thẻ; card: nền + viền + chữ của thẻ.
export const bookingStatusStyles: Record<BookingStatus, BookingStatusStyle> = {
  cancelled: { accent: "#94a3b8", card: "border-slate-200 bg-slate-50 text-slate-600" },
  "checked-in": { accent: "#0ea5e9", card: "border-sky-200 bg-sky-50 text-sky-900" },
  completed: { accent: "#8b5cf6", card: "border-violet-200 bg-violet-50 text-violet-900" },
  confirmed: { accent: "#10b981", card: "border-emerald-200 bg-emerald-50 text-emerald-900" },
  pending: { accent: "#f59e0b", card: "border-amber-200 bg-amber-50 text-amber-900" },
};

export const paymentDotColor: Record<PaymentStatus, string> = {
  failed: "#f43f5e",
  paid: "#10b981",
  partial: "#f59e0b",
  refunded: "#8b5cf6",
  unpaid: "#cbd5e1",
};
