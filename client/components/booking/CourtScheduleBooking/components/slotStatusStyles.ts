import type { SlotStatus } from "@/components/booking/CourtScheduleBooking/types";

// cell: nền ô trong lưới; swatch: ô màu nhỏ ở phần chú thích.
export const slotStatusStyles: Record<SlotStatus, { cell: string; swatch: string }> = {
  available: { cell: "bg-white hover:bg-[#d8f3e3]", swatch: "border border-[#c8d5ce] bg-white" },
  booked: { cell: "bg-[#d94a4a]", swatch: "bg-[#d94a4a]" },
  event: { cell: "bg-[#dd63dd]", swatch: "bg-[#dd63dd]" },
  locked: { cell: "bg-[#8f8f8f]", swatch: "bg-[#8f8f8f]" },
};

export const selectedSlotStyle = "bg-[#00a651] text-white";
