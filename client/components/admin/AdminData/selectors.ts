import type { AdminDataState, Booking, Court, Payment } from "@/components/admin/AdminData/types";

export function getReceivedRevenue(payments: Payment[]) {
  return payments
    .filter((payment) => payment.status === "paid" || payment.status === "partial")
    .reduce((total, payment) => total + payment.amount, 0);
}

export function getCustomerBookingCount(bookings: Booking[], customerId: string) {
  return bookings.filter((booking) => booking.customerId === customerId && booking.status !== "cancelled").length;
}

export function getCustomerTotalSpend(payments: Payment[], customerId: string) {
  return getReceivedRevenue(payments.filter((payment) => payment.customerId === customerId));
}

export function getCourtUtilization(court: Court, bookings: Booking[], date: string, openingMinute: number, closingMinute: number) {
  const bookedMinutes = bookings
    .filter((booking) => booking.courtId === court.id && booking.bookingDate === date && booking.status !== "cancelled")
    .reduce((total, booking) => total + booking.endMinute - booking.startMinute, 0);
  const availableMinutes = Math.max(closingMinute - openingMinute, 1);
  return Math.min(Math.round((bookedMinutes / availableMinutes) * 100), 100);
}

export function getDailyAdminSeries(data: AdminDataState) {
  const dates = [...new Set(data.bookings.map((booking) => booking.bookingDate))].sort().slice(-7);

  return dates.map((date) => {
    const dateBookings = data.bookings.filter((booking) => booking.bookingDate === date && booking.status !== "cancelled");
    const bookingIds = new Set(dateBookings.map((booking) => booking.id));
    const revenue = getReceivedRevenue(data.payments.filter((payment) => bookingIds.has(payment.bookingId)));

    return { bookings: dateBookings.length, date, revenue };
  });
}
