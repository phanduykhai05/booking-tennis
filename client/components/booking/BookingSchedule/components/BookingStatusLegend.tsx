
import { bookingStatusStyles } from "@/components/booking/BookingSchedule/components/bookingStatusStyles";
import type { BookingScheduleContent, BookingStatus } from "@/components/booking/BookingSchedule/types";

type BookingStatusLegendProps = {
  content: BookingScheduleContent;
  statuses: BookingStatus[];
};

export default function BookingStatusLegend({ content, statuses }: BookingStatusLegendProps) {
  return (
    <div className="flex-row flex-wrap items-center gap-x-4 gap-y-1.5">
      {statuses.map((status) => (
        <div className="flex-row items-center gap-1.5" key={status}>
          <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: bookingStatusStyles[status].accent }} />
          <span className="text-[12px] text-slate-500">{content.bookingStatusLabels[status]}</span>
        </div>
      ))}
    </div>
  );
}
