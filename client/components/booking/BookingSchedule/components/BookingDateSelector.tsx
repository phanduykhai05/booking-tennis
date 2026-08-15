import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

import type { BookingScheduleContent } from "@/components/booking/BookingSchedule/types";

type BookingDateSelectorProps = {
  content: BookingScheduleContent;
  date: string;
  dateLabel: string;
  onChange: (date: string) => void;
  onNext: () => void;
  onPrevious: () => void;
};

export default function BookingDateSelector({ content, date, dateLabel, onChange, onNext, onPrevious }: BookingDateSelectorProps) {
  const navigationButtonClassName = "flex size-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 active:scale-95";

  return (
    <div className="flex min-w-0 items-center gap-2">
      <button aria-label={content.previousDateLabel} className={navigationButtonClassName} onClick={onPrevious} type="button">
        <ChevronLeft aria-hidden="true" className="size-5" />
      </button>

      <label className="relative flex h-10 min-w-0 flex-1 cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-emerald-300 sm:min-w-[260px]">
        <CalendarDays aria-hidden="true" className="size-4 shrink-0 text-emerald-600" />
        <span className="truncate capitalize">{dateLabel}</span>
        <span className="sr-only">{content.selectedDateLabel}</span>
        <input
          aria-label={content.selectedDateLabel}
          className="absolute inset-0 cursor-pointer opacity-0"
          onChange={(event) => onChange(event.target.value)}
          type="date"
          value={date}
        />
      </label>

      <button aria-label={content.nextDateLabel} className={navigationButtonClassName} onClick={onNext} type="button">
        <ChevronRight aria-hidden="true" className="size-5" />
      </button>
    </div>
  );
}
