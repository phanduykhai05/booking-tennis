import { Clock3 } from "lucide-react";

import { formatMinutes } from "@/components/booking/BookingSchedule/utils";

type BookingTimeHeaderProps = {
  courtColumnWidth: number;
  slotWidth: number;
  timeLabel: string;
  timeSlots: number[];
};

export default function BookingTimeHeader({ courtColumnWidth, slotWidth, timeLabel, timeSlots }: BookingTimeHeaderProps) {
  return (
    <div className="sticky top-0 z-30 flex border-b border-slate-200 bg-slate-50/95 backdrop-blur-sm">
      <div className="sticky left-0 z-40 flex shrink-0 items-center gap-2 border-r border-slate-200 bg-slate-50 px-4 text-xs font-bold uppercase tracking-[0.12em] text-slate-500" style={{ width: courtColumnWidth }}>
        <Clock3 aria-hidden="true" className="size-4 text-emerald-600" />
        {timeLabel}
      </div>
      <div className="flex h-14 shrink-0">
        {timeSlots.map((slot) => (
          <div className="flex shrink-0 items-center border-r border-slate-200 px-3 text-xs font-bold text-slate-600" key={slot} style={{ width: slotWidth }}>
            {formatMinutes(slot)}
          </div>
        ))}
      </div>
    </div>
  );
}
