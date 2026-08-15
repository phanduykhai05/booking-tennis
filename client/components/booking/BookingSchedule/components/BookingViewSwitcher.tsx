import { CalendarRange, List } from "lucide-react";

import type { BookingViewMode } from "@/components/booking/BookingSchedule/types";

type BookingViewSwitcherProps = {
  onChange: (view: BookingViewMode) => void;
  value: BookingViewMode;
};

const options: Array<{ icon: typeof CalendarRange; label: string; value: BookingViewMode }> = [
  { icon: CalendarRange, label: "Dòng thời gian", value: "timeline" },
  { icon: List, label: "Danh sách", value: "list" },
];

export default function BookingViewSwitcher({ onChange, value }: BookingViewSwitcherProps) {
  return (
    <div aria-label="Kiểu hiển thị lịch đặt sân" className="flex rounded-xl border border-slate-200 bg-white p-1" role="group">
      {options.map((option) => {
        const Icon = option.icon;
        const isActive = option.value === value;
        return (
          <button
            aria-pressed={isActive}
            className={`flex h-9 items-center gap-2 rounded-lg px-3 text-xs font-bold transition-colors ${isActive ? "bg-emerald-600 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}
            key={option.value}
            onClick={() => onChange(option.value)}
            type="button"
          >
            <Icon aria-hidden="true" className="size-4" />
            <span className="hidden sm:inline">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
