import type { BookingScheduleConfig, CourtBooking } from "@/components/booking/BookingSchedule/types";

export function getTimeSlots(config: BookingScheduleConfig) {
  const slots: number[] = [];

  for (let minute = config.startMinute; minute < config.endMinute; minute += config.slotMinutes) {
    slots.push(minute);
  }

  return slots;
}

export function formatMinutes(minute: number) {
  const hours = Math.floor(minute / 60);
  const minutes = minute % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

export function formatDateLabel(date: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "long",
    weekday: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export function shiftDate(date: string, amount: number) {
  const shiftedDate = new Date(`${date}T12:00:00`);
  shiftedDate.setDate(shiftedDate.getDate() + amount);

  const year = shiftedDate.getFullYear();
  const month = `${shiftedDate.getMonth() + 1}`.padStart(2, "0");
  const day = `${shiftedDate.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("vi-VN", {
    currency: "VND",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);
}

export function isSlotOccupied(bookings: CourtBooking[], startMinute: number, endMinute: number) {
  return bookings.some((booking) => booking.status !== "cancelled" && booking.startMinute < endMinute && booking.endMinute > startMinute);
}

export function getBookingPosition(booking: CourtBooking, config: BookingScheduleConfig, slotWidth: number) {
  const left = ((booking.startMinute - config.startMinute) / config.slotMinutes) * slotWidth;
  const width = ((booking.endMinute - booking.startMinute) / config.slotMinutes) * slotWidth;

  return {
    left: `${left + 4}px`,
    width: `${Math.max(width - 8, 52)}px`,
  };
}
