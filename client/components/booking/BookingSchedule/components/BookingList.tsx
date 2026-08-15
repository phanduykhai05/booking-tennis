import { Eye } from "lucide-react";

import AdminTableCard from "@/components/admin/shared/AdminTableCard";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import type { BookingCustomer, BookingCourt, BookingScheduleContent, CourtBooking } from "@/components/booking/BookingSchedule/types";
import { formatCurrency, formatDateLabel, formatMinutes } from "@/components/booking/BookingSchedule/utils";

type BookingListProps = {
  bookings: CourtBooking[];
  content: BookingScheduleContent;
  courts: BookingCourt[];
  customers: BookingCustomer[];
  onSelect: (bookingId: string) => void;
};

const bookingTone = {
  cancelled: "rose",
  "checked-in": "blue",
  completed: "violet",
  confirmed: "emerald",
  pending: "orange",
} as const;

const paymentTone = {
  failed: "rose",
  paid: "emerald",
  partial: "orange",
  refunded: "violet",
  unpaid: "slate",
} as const;

export default function BookingList({ bookings, content, courts, customers, onSelect }: BookingListProps) {
  const courtMap = new Map(courts.map((court) => [court.id, court]));
  const customerMap = new Map(customers.map((customer) => [customer.id, customer]));

  return (
    <AdminTableCard description={`${bookings.length} lịch đặt sân phù hợp`} title="Danh sách đặt sân">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1040px] text-left text-sm">
          <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3">Mã đặt sân</th>
              <th className="px-4 py-3">Khách hàng</th>
              <th className="px-4 py-3">Sân</th>
              <th className="px-4 py-3">Ngày và giờ</th>
              <th className="px-4 py-3">Số tiền</th>
              <th className="px-4 py-3">Booking</th>
              <th className="px-4 py-3">Thanh toán</th>
              <th className="px-5 py-3 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.map((booking) => {
              const court = courtMap.get(booking.courtId);
              const customer = customerMap.get(booking.customerId);
              return (
                <tr className="transition-colors hover:bg-slate-50/70" key={booking.id}>
                  <td className="whitespace-nowrap px-5 py-3.5 font-bold text-slate-800">{booking.code}</td>
                  <td className="px-4 py-3.5">
                    <p className="font-semibold text-slate-800">{customer?.name ?? "—"}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{customer?.phone}</p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 font-medium text-slate-600">{court?.name ?? "—"}</td>
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <p className="font-medium capitalize text-slate-700">{formatDateLabel(booking.bookingDate)}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{formatMinutes(booking.startMinute)} – {formatMinutes(booking.endMinute)}</p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 font-bold text-slate-800">{formatCurrency(booking.totalPrice)}</td>
                  <td className="px-4 py-3.5"><StatusBadge label={content.bookingStatusLabels[booking.status]} tone={bookingTone[booking.status]} /></td>
                  <td className="px-4 py-3.5"><StatusBadge label={content.paymentStatusLabels[booking.paymentStatus]} tone={paymentTone[booking.paymentStatus]} /></td>
                  <td className="px-5 py-3.5 text-right">
                    <button aria-label={`${content.bookingDetailLabel} ${booking.code}`} className="inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700" onClick={() => onSelect(booking.id)} type="button">
                      <Eye aria-hidden="true" className="size-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {bookings.length === 0 && <p className="px-5 py-12 text-center text-sm font-medium text-slate-400">{content.emptyBookingsLabel}</p>}
    </AdminTableCard>
  );
}
