import { Clock3, UserRound } from "lucide-react";

import type { BookingCustomer, BookingScheduleContent, CourtBooking } from "@/components/booking/BookingSchedule/types";
import { formatMinutes } from "@/components/booking/BookingSchedule/utils";

type BookingCardProps = {
  booking: CourtBooking;
  content: BookingScheduleContent;
  customer: BookingCustomer;
  onSelect: () => void;
  position: { left: string; width: string };
};

const statusClassNames: Record<CourtBooking["status"], string> = {
  cancelled: "border-slate-300 bg-slate-100 text-slate-600",
  "checked-in": "border-sky-300 bg-sky-50 text-sky-900",
  completed: "border-violet-300 bg-violet-50 text-violet-900",
  confirmed: "border-emerald-300 bg-emerald-50 text-emerald-900",
  pending: "border-amber-300 bg-amber-50 text-amber-900",
};

export default function BookingCard({ booking, content, customer, onSelect, position }: BookingCardProps) {
  const isCancelled = booking.status === "cancelled";

  return (
    <button
      aria-label={`${booking.code}, ${customer.name}, ${formatMinutes(booking.startMinute)} - ${formatMinutes(booking.endMinute)}`}
      className={`absolute inset-y-2 z-10 overflow-hidden rounded-lg border px-2.5 py-2 text-left shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/50 active:scale-[0.99] ${isCancelled ? "pointer-events-none opacity-55" : ""} ${statusClassNames[booking.status]}`}
      onClick={onSelect}
      style={position}
      tabIndex={isCancelled ? -1 : 0}
      type="button"
    >
      <span className="block truncate text-[10px] font-bold uppercase tracking-wide opacity-65">{booking.code}</span>
      <span className="mt-0.5 flex items-center gap-1 truncate text-xs font-bold">
        <UserRound aria-hidden="true" className="size-3 shrink-0" />
        <span className="truncate">{customer.name}</span>
      </span>
      <span className="mt-1 flex items-center gap-1 truncate text-[10px] font-semibold opacity-75">
        <Clock3 aria-hidden="true" className="size-3 shrink-0" />
        {formatMinutes(booking.startMinute)} – {formatMinutes(booking.endMinute)}
      </span>
      <span className="sr-only">{content.bookingStatusLabels[booking.status]}</span>
    </button>
  );
}
