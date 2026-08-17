"use client";

import { Tooltip } from "antd";

import { bookingStatusStyles, paymentDotColor } from "@/components/booking/BookingSchedule/components/bookingStatusStyles";
import type { BookingCustomer, BookingScheduleContent, CourtBooking } from "@/components/booking/BookingSchedule/types";
import { formatCurrency, formatMinutes } from "@/components/booking/BookingSchedule/utils";

type BookingCardProps = {
  booking: CourtBooking;
  content: BookingScheduleContent;
  customer: BookingCustomer;
  onSelect: () => void;
  position: { left: string; width: string };
};

export default function BookingCard({ booking, content, customer, onSelect, position }: BookingCardProps) {
  const isCancelled = booking.status === "cancelled";
  const style = bookingStatusStyles[booking.status];
  const timeRange = `${formatMinutes(booking.startMinute)} – ${formatMinutes(booking.endMinute)}`;

  return (
    <Tooltip
      title={
        <div className="text-xs leading-5">
          <div className="font-bold">{booking.code}</div>
          <div>{customer.name} · {customer.phone}</div>
          <div>{timeRange}</div>
          <div>{content.bookingStatusLabels[booking.status]} · {content.paymentStatusLabels[booking.paymentStatus]}</div>
          <div>{formatCurrency(booking.totalPrice)}</div>
        </div>
      }
    >
      <button
        aria-label={`${booking.code}, ${customer.name}, ${timeRange}`}
        className={`absolute inset-y-2 z-10 overflow-hidden rounded-lg border pl-3 pr-2.5 py-2 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/50 active:scale-[0.99] ${isCancelled ? "pointer-events-none opacity-55" : ""} ${style.card}`}
        onClick={onSelect}
        style={position}
        tabIndex={isCancelled ? -1 : 0}
        type="button"
      >
        {/* Dải màu mép trái cho biết trạng thái ngay cả khi thẻ hẹp không đọc được chữ. */}
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1" style={{ backgroundColor: style.accent }} />

        <span className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="size-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: paymentDotColor[booking.paymentStatus] }}
          />
          <span className="truncate text-[11px] font-bold uppercase tracking-wide opacity-70">{booking.code}</span>
        </span>
        <span className="mt-0.5 block truncate text-xs font-bold">{customer.name}</span>
        <span className="mt-0.5 block truncate text-[11px] font-semibold opacity-75">{timeRange}</span>
        <span className="sr-only">{content.bookingStatusLabels[booking.status]}</span>
      </button>
    </Tooltip>
  );
}
