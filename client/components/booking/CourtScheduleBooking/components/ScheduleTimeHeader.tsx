import { leadColumnWidth, scheduleLayout } from "@/components/booking/CourtScheduleBooking/components/scheduleLayout";
import { formatMinutes } from "@/components/booking/CourtScheduleBooking/utils";

type ScheduleTimeHeaderProps = {
  timeLabel: string;
  timeSlots: number[];
};

export default function ScheduleTimeHeader({ timeLabel, timeSlots }: ScheduleTimeHeaderProps) {
  return (
    <div className="flex bg-[#c9e9f6]" style={{ height: scheduleLayout.timeHeaderHeight }}>
      <div
        className="sticky left-0 z-40 flex shrink-0 items-center justify-center border-r border-[#9fd2e8] bg-[#c9e9f6] text-[12px] font-semibold text-[#0e4a63]"
        style={{ width: leadColumnWidth }}
      >
        {timeLabel}
      </div>
      {timeSlots.map((startMinute) => (
        <div
          className="flex shrink-0 items-center justify-center border-l border-[#e9a71f] text-[11px] font-medium text-[#123028]"
          key={startMinute}
          style={{ width: scheduleLayout.slotWidth }}
        >
          {formatMinutes(startMinute)}
        </div>
      ))}
    </div>
  );
}
