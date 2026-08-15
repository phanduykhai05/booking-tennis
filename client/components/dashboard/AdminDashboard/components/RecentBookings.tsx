import Link from "next/link";

import StatusBadge from "@/components/admin/shared/StatusBadge";
import type { Booking, Court, Customer } from "@/components/admin/AdminData/types";
import { formatCurrency, formatMinutes } from "@/components/booking/BookingSchedule/utils";
import { bookingScheduleContent } from "@/components/booking/BookingSchedule/mockData";

type RecentBookingsProps = {
  bookings: Booking[];
  courts: Court[];
  customers: Customer[];
};

const statusTone = {
  cancelled: "rose",
  "checked-in": "blue",
  completed: "violet",
  confirmed: "emerald",
  pending: "orange",
} as const;

export default function RecentBookings({ bookings, courts, customers }: RecentBookingsProps) {
  const courtMap = new Map(courts.map((court) => [court.id, court]));
  const customerMap = new Map(customers.map((customer) => [customer.id, customer]));

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_28px_-24px_rgba(15,23,42,0.55)]">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-4 sm:px-5">
        <div>
          <h2 className="text-base font-bold text-slate-900">Lịch đặt gần đây</h2>
          <p className="mt-0.5 text-xs text-slate-500">Các booking mới nhất trong hệ thống</p>
        </div>
        <Link className="text-xs font-bold text-emerald-700 hover:text-emerald-800" href="/bookings">Xem tất cả</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wide text-slate-400">
            <tr><th className="px-5 py-3">Booking</th><th className="px-4 py-3">Khách hàng</th><th className="px-4 py-3">Sân / Giờ</th><th className="px-4 py-3">Số tiền</th><th className="px-5 py-3">Trạng thái</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.map((booking) => (
              <tr className="hover:bg-slate-50/70" key={booking.id}>
                <td className="px-5 py-3.5 font-bold text-slate-800">{booking.code}</td>
                <td className="px-4 py-3.5 font-medium text-slate-700">{customerMap.get(booking.customerId)?.name}</td>
                <td className="px-4 py-3.5"><p className="font-medium text-slate-700">{courtMap.get(booking.courtId)?.name}</p><p className="text-xs text-slate-400">{formatMinutes(booking.startMinute)} – {formatMinutes(booking.endMinute)}</p></td>
                <td className="px-4 py-3.5 font-bold text-slate-700">{formatCurrency(booking.totalPrice)}</td>
                <td className="px-5 py-3.5"><StatusBadge label={bookingScheduleContent.bookingStatusLabels[booking.status]} tone={statusTone[booking.status]} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
