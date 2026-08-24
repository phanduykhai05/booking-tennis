import type { SlotStatus } from "@/components/booking/CourtScheduleBooking/types";

/** Màu nền ô lưới theo trạng thái; dùng chung cho ô trong lưới và ô mẫu ở chú thích. */
export const slotStatusColor: Record<SlotStatus, string> = {
  available: "#ffffff",
  booked: "#d94a4a",
  event: "#dd63dd",
  locked: "#8f8f8f",
};

export const selectedSlotColor = "#00a651";
