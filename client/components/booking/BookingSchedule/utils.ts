import type { BookingScheduleConfig, CourtBooking } from "@/components/booking/BookingSchedule/types";
import { formatLongDate, shiftDate as shiftIsoDate } from "@/lib/date";

export { formatCurrency, formatMinutes } from "@/lib/format";

export function getTimeSlots(config: BookingScheduleConfig) {
  const slots: number[] = [];

  for (let minute = config.startMinute; minute < config.endMinute; minute += config.slotMinutes) {
    slots.push(minute);
  }

  return slots;
}

export const formatDateLabel = formatLongDate;

export const shiftDate = shiftIsoDate;

export function isSlotOccupied(bookings: CourtBooking[], startMinute: number, endMinute: number) {
  return bookings.some((booking) => booking.status !== "cancelled" && booking.startMinute < endMinute && booking.endMinute > startMinute);
}

export function getBookingPosition(booking: CourtBooking, config: BookingScheduleConfig, slotWidth: number) {
  const left = ((booking.startMinute - config.startMinute) / config.slotMinutes) * slotWidth;
  const width = ((booking.endMinute - booking.startMinute) / config.slotMinutes) * slotWidth;

  return {
    left: left + 4,
    width: Math.max(width - 8, 52),
  };
}
