"use client";

import { PlusOutlined } from "@ant-design/icons";

import { formatMinutes } from "@/components/booking/BookingSchedule/utils";

type BookingSlotProps = {
  endMinute: number;
  isDisabled: boolean;
  isShaded?: boolean;
  label: string;
  onSelect: () => void;
  slotWidth: number;
  startMinute: number;
};

export default function BookingSlot({ endMinute, isDisabled, isShaded = false, label, onSelect, slotWidth, startMinute }: BookingSlotProps) {
  const accessibleLabel = `${label} ${formatMinutes(startMinute)} - ${formatMinutes(endMinute)}`;

  return (
    <button
      aria-label={accessibleLabel}
      // Sọc mờ xen kẽ giúp mắt lần theo đúng cột giờ khi bảng kéo dài.
      className={`group flex h-full shrink-0 items-center justify-center border-r border-slate-100 text-slate-300 transition-colors enabled:hover:bg-emerald-50 enabled:hover:text-emerald-600 focus-visible:relative focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500 disabled:cursor-default disabled:bg-slate-50/45 ${isShaded ? "bg-slate-50/40" : ""}`}
      disabled={isDisabled}
      onClick={onSelect}
      style={{ width: slotWidth }}
      type="button"
    >
      {isDisabled ? null : <PlusOutlined aria-hidden="true" className="opacity-0 transition-opacity group-hover:opacity-100" />}
    </button>
  );
}
