"use client";

import { CalendarDays, Clock, MapPin } from "lucide-react";

import {
  bookingHistoryContent,
  bookingStatusLabels,
  bookingStatusStyles,
  paymentStatusLabels,
} from "@/components/booking/BookingHistory/content";
import type { ApiBooking } from "@/lib/api/types";

type BookingHistoryCardProps = {
  booking: ApiBooking;
  isCancelling: boolean;
  onCancel: (bookingId: string) => void;
};

const formatDate = (value: string) => value.split("-").reverse().join("/");

export default function BookingHistoryCard({ booking, isCancelling, onCancel }: BookingHistoryCardProps) {
  const canCancel = booking.status !== "cancelled" && booking.status !== "completed";

  return (
    <article className="rounded-xl border border-[#dcebe3] bg-white p-3 shadow-[0_2px_6px_rgba(0,74,38,.05)]">
      <header className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[15px] font-bold text-[#0b5133]">{booking.venueName}</h3>
          <p className="mt-1 flex items-center gap-1 text-[13px] text-[#49544f]"><MapPin aria-hidden="true" size={13} />{booking.courtName}</p>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-[12px] font-semibold ${bookingStatusStyles[booking.status]}`}>{bookingStatusLabels[booking.status]}</span>
      </header>

      <dl className="mt-2 grid grid-cols-2 gap-y-1 text-[13px] text-[#49544f]">
        <div className="flex items-center gap-1"><CalendarDays aria-hidden="true" size={13} /><dd>{formatDate(booking.date)}</dd></div>
        <div className="flex items-center gap-1"><Clock aria-hidden="true" size={13} /><dd>{booking.timeStart} - {booking.timeEnd}</dd></div>
        <div className="col-span-2 flex items-center gap-1"><dt className="text-[#8a918e]">{bookingHistoryContent.codeLabel}</dt><dd className="font-medium">{booking.code}</dd></div>
      </dl>

      <footer className="mt-2 flex items-center justify-between border-t border-[#eef3f0] pt-2">
        <div>
          <p className="text-[15px] font-bold text-[#007b45]">{booking.priceLabel}</p>
          <p className="text-[12px] text-[#8a918e]">{paymentStatusLabels[booking.paymentStatus]}</p>
        </div>
        {canCancel && (
          <button className="h-8 rounded-md border border-[#e0574f] px-3 text-[13px] font-semibold text-[#e0574f] disabled:opacity-50" disabled={isCancelling} onClick={() => onCancel(booking.id)} type="button">
            {bookingHistoryContent.cancelLabel}
          </button>
        )}
      </footer>
    </article>
  );
}
