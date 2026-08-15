import { CalendarX2 } from "lucide-react";

import BookingCourtRow from "@/components/booking/BookingSchedule/components/BookingCourtRow";
import BookingTimeHeader from "@/components/booking/BookingSchedule/components/BookingTimeHeader";
import type {
  BookingCourt,
  BookingCustomer,
  BookingScheduleConfig,
  BookingScheduleContent,
  CourtBooking,
} from "@/components/booking/BookingSchedule/types";
import { getTimeSlots } from "@/components/booking/BookingSchedule/utils";

type BookingTimelineProps = {
  bookings: CourtBooking[];
  config: BookingScheduleConfig;
  content: BookingScheduleContent;
  courts: BookingCourt[];
  customers: BookingCustomer[];
  date: string;
  onBookingSelect: (bookingId: string) => void;
  onSlotSelect: (courtId: string, startMinute: number, endMinute: number) => void;
  occupancyBookings: CourtBooking[];
};

const courtColumnWidth = 178;
const slotWidth = 96;

export default function BookingTimeline({ bookings, config, content, courts, customers, date, onBookingSelect, onSlotSelect, occupancyBookings }: BookingTimelineProps) {
  const timeSlots = getTimeSlots(config);
  const customerMap = new Map(customers.map((customer) => [customer.id, customer]));
  const timelineWidth = timeSlots.length * slotWidth;

  return (
    <section aria-label={content.scheduleLabel} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_-22px_rgba(15,23,42,0.45)]">
      {bookings.length === 0 && (
        <div className="flex items-center gap-2 border-b border-amber-200 bg-amber-50 px-4 py-2.5 text-xs font-semibold text-amber-800">
          <CalendarX2 aria-hidden="true" className="size-4 shrink-0" />
          {content.emptyBookingsLabel}
        </div>
      )}

      <div className="max-h-[680px] min-h-[420px] overflow-auto overscroll-contain">
        <div style={{ minWidth: courtColumnWidth + timelineWidth }}>
          <BookingTimeHeader
            courtColumnWidth={courtColumnWidth}
            slotWidth={slotWidth}
            timeLabel={content.timeLabel}
            timeSlots={timeSlots}
          />
          {courts.map((court) => (
            <BookingCourtRow
              bookings={bookings.filter((booking) => booking.courtId === court.id)}
              config={config}
              content={content}
              court={court}
              courtColumnWidth={courtColumnWidth}
              customers={customerMap}
              date={date}
              key={court.id}
              onBookingSelect={onBookingSelect}
              onSlotSelect={onSlotSelect}
              occupancyBookings={occupancyBookings.filter((booking) => booking.courtId === court.id)}
              slotWidth={slotWidth}
              timeSlots={timeSlots}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
