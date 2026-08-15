import { CircleDot, Wrench } from "lucide-react";

import BookingCard from "@/components/booking/BookingSchedule/components/BookingCard";
import BookingSlot from "@/components/booking/BookingSchedule/components/BookingSlot";
import type {
  BookingCourt,
  BookingCustomer,
  BookingScheduleConfig,
  BookingScheduleContent,
  CourtBooking,
} from "@/components/booking/BookingSchedule/types";
import { getBookingPosition, isSlotOccupied } from "@/components/booking/BookingSchedule/utils";

type BookingCourtRowProps = {
  bookings: CourtBooking[];
  config: BookingScheduleConfig;
  content: BookingScheduleContent;
  court: BookingCourt;
  courtColumnWidth: number;
  customers: Map<string, BookingCustomer>;
  date: string;
  onBookingSelect: (bookingId: string) => void;
  onSlotSelect: (courtId: string, startMinute: number, endMinute: number) => void;
  occupancyBookings: CourtBooking[];
  slotWidth: number;
  timeSlots: number[];
};

export default function BookingCourtRow({
  bookings,
  config,
  content,
  court,
  courtColumnWidth,
  customers,
  date,
  onBookingSelect,
  onSlotSelect,
  occupancyBookings,
  slotWidth,
  timeSlots,
}: BookingCourtRowProps) {
  const isUnavailable = court.status !== "available";

  return (
    <div className="flex border-b border-slate-200 bg-white last:border-b-0">
      <div
        className="sticky left-0 z-20 flex shrink-0 flex-col justify-center border-r border-slate-200 bg-white px-4 shadow-[5px_0_14px_-12px_rgba(15,23,42,0.45)]"
        style={{ width: courtColumnWidth }}
      >
        <div className="flex items-center gap-2">
          <span className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${isUnavailable ? "bg-slate-100 text-slate-500" : "bg-emerald-50 text-emerald-700"}`}>
            {isUnavailable ? <Wrench aria-hidden="true" className="size-4" /> : <CircleDot aria-hidden="true" className="size-4" />}
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-sm font-bold text-slate-800">{court.name}</h2>
            <p className="truncate text-[11px] font-medium text-slate-500">{content.surfaceLabels[court.surface]}</p>
          </div>
        </div>
        <div className="mt-1.5 flex items-center gap-1.5 text-[10px] font-semibold text-slate-400">
          <span className={`size-1.5 rounded-full ${isUnavailable ? "bg-slate-400" : "bg-emerald-500"}`} />
          {content.courtStatusLabels[court.status]}
          {court.isIndoor && <span>· {content.indoorLabel}</span>}
        </div>
      </div>

      <div className="relative flex h-24 shrink-0" style={{ width: timeSlots.length * slotWidth }}>
        {timeSlots.map((startMinute) => {
          const endMinute = startMinute + config.slotMinutes;
          return (
            <BookingSlot
              endMinute={endMinute}
              isDisabled={isUnavailable || isSlotOccupied(occupancyBookings, startMinute, endMinute)}
              key={startMinute}
              label={`${content.slotLabel} ${court.name}, ${date}`}
              onSelect={() => onSlotSelect(court.id, startMinute, endMinute)}
              slotWidth={slotWidth}
              startMinute={startMinute}
            />
          );
        })}

        {bookings.map((booking) => {
          const customer = customers.get(booking.customerId);
          if (!customer) return null;

          return (
            <BookingCard
              booking={booking}
              content={content}
              customer={customer}
              key={booking.id}
              onSelect={() => onBookingSelect(booking.id)}
              position={getBookingPosition(booking, config, slotWidth)}
            />
          );
        })}
      </div>
    </div>
  );
}
