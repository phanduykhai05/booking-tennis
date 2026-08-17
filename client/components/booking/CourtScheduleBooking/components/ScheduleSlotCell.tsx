"use client";

import { Check } from "lucide-react";

import { scheduleLayout } from "@/components/booking/CourtScheduleBooking/components/scheduleLayout";
import { selectedSlotStyle, slotStatusStyles } from "@/components/booking/CourtScheduleBooking/components/slotStatusStyles";
import type { SlotStatus } from "@/components/booking/CourtScheduleBooking/types";

type ScheduleSlotCellProps = {
  isSelected: boolean;
  label: string;
  onSelect: () => void;
  status: SlotStatus;
  tooltip: string;
};

export default function ScheduleSlotCell({ isSelected, label, onSelect, status, tooltip }: ScheduleSlotCellProps) {
  return (
    <button
      aria-label={label}
      aria-pressed={isSelected}
      className={`flex h-full shrink-0 items-center justify-center border-r border-[#e2ebe6] transition-colors focus-visible:relative focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0b6b3e] disabled:cursor-not-allowed ${isSelected ? selectedSlotStyle : slotStatusStyles[status].cell}`}
      disabled={status !== "available"}
      onClick={onSelect}
      style={{ width: scheduleLayout.slotWidth }}
      title={tooltip}
      type="button"
    >
      {isSelected && <Check aria-hidden="true" size={16} strokeWidth={3} />}
    </button>
  );
}
