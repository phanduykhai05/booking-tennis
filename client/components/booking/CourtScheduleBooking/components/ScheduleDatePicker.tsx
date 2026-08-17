"use client";

import { CalendarDays } from "lucide-react";

import { formatDateLabel } from "@/components/booking/CourtScheduleBooking/utils";

type ScheduleDatePickerProps = {
  label: string;
  onChange: (date: string) => void;
  value: string;
};

export default function ScheduleDatePicker({ label, onChange, value }: ScheduleDatePickerProps) {
  return (
    <label className="relative flex h-9 items-center gap-2 rounded-md bg-[#4a9d7f] px-3 text-[14px] font-semibold text-white focus-within:ring-2 focus-within:ring-white">
      {formatDateLabel(value)}
      <CalendarDays aria-hidden="true" size={17} />
      {/* Input date phủ lên pill để chạm vào đâu cũng mở lịch hệ thống, vẫn giữ nguyên giao diện. */}
      <input
        aria-label={label}
        className="absolute inset-0 cursor-pointer opacity-0"
        onChange={(event) => event.target.value && onChange(event.target.value)}
        type="date"
        value={value}
      />
    </label>
  );
}
