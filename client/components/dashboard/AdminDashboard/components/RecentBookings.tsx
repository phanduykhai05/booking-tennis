import { useNavigate } from "react-router";

import type { Booking, Court, Customer } from "@/components/admin/AdminData/types";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import type { StatusTone } from "@/components/admin/shared/StatusBadge";
import { bookingScheduleContent } from "@/components/booking/BookingSchedule/mockData";
import type { BookingStatus } from "@/components/booking/BookingSchedule/types";
import Card from "@/components/ui/Card";
import DataTable from "@/components/ui/DataTable";
import type { Column } from "@/components/ui/DataTable";
import Touch from "@/components/ui/Pressable";
import { formatCurrency, formatMinutes } from "@/lib/format";

type RecentBookingsProps = {
  bookings: Booking[];
  courts: Court[];
  customers: Customer[];
};

const statusTone: Record<BookingStatus, StatusTone> = {
  cancelled: "rose",
  "checked-in": "blue",
  completed: "violet",
  confirmed: "emerald",
  pending: "orange",
};

export default function RecentBookings({ bookings, courts, customers }: RecentBookingsProps) {
  const navigate = useNavigate();
  const courtMap = new Map(courts.map((court) => [court.id, court]));
  const customerMap = new Map(customers.map((customer) => [customer.id, customer]));

  const columns: Column<Booking>[] = [
    {
      key: "code",
      render: (booking) => <span className="text-[14px] font-bold text-slate-900">{booking.code}</span>,
      title: "Booking",
      width: 130,
    },
    {
      key: "customer",
      render: (booking) => <span className="text-[14px] text-slate-700">{customerMap.get(booking.customerId)?.name ?? "—"}</span>,
      title: "Khách hàng",
      width: 170,
    },
    {
      key: "court",
      render: (booking) => (
        <div>
          <span className="text-[14px] text-slate-800">{courtMap.get(booking.courtId)?.name ?? "—"}</span>
          <span className="text-[12px] text-slate-500">
            {formatMinutes(booking.startMinute)} – {formatMinutes(booking.endMinute)}
          </span>
        </div>
      ),
      title: "Sân / Giờ",
      width: 160,
    },
    {
      key: "totalPrice",
      render: (booking) => <span className="text-[14px] font-bold text-slate-900">{formatCurrency(booking.totalPrice)}</span>,
      title: "Số tiền",
      width: 140,
    },
    {
      key: "status",
      render: (booking) => (
        <StatusBadge label={bookingScheduleContent.bookingStatusLabels[booking.status]} tone={statusTone[booking.status]} />
      ),
      title: "Trạng thái",
      width: 140,
    },
  ];

  return (
    <Card
      description="Các booking mới nhất trong hệ thống"
      extra={
        <Touch onPress={() => navigate("/admin/bookings")}>
          <span className="text-[14px] font-semibold text-emerald-600">Xem tất cả</span>
        </Touch>
      }
      noBodyPadding
      title="Lịch đặt gần đây"
    >
      <DataTable columns={columns} emptyText="Chưa có lịch đặt nào" pageSize={5} rowKey={(booking) => booking.id} rows={bookings} />
    </Card>
  );
}
