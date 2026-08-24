import { Eye } from "lucide-react-native";
import { Text, View } from "react-native";

import AdminTableCard from "@/components/admin/shared/AdminTableCard";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import type { StatusTone } from "@/components/admin/shared/StatusBadge";
import type {
  BookingCourt,
  BookingCustomer,
  BookingScheduleContent,
  BookingStatus,
  CourtBooking,
  PaymentStatus,
} from "@/components/booking/BookingSchedule/types";
import { formatCurrency, formatDateLabel, formatMinutes } from "@/components/booking/BookingSchedule/utils";
import DataTable from "@/components/ui/DataTable";
import type { Column } from "@/components/ui/DataTable";
import Touch from "@/components/ui/Pressable";

type BookingListProps = {
  bookings: CourtBooking[];
  content: BookingScheduleContent;
  courts: BookingCourt[];
  customers: BookingCustomer[];
  onSelect: (bookingId: string) => void;
};

const bookingTone: Record<BookingStatus, StatusTone> = {
  cancelled: "rose",
  "checked-in": "blue",
  completed: "violet",
  confirmed: "emerald",
  pending: "orange",
};

const paymentTone: Record<PaymentStatus, StatusTone> = {
  failed: "rose",
  paid: "emerald",
  partial: "orange",
  refunded: "violet",
  unpaid: "slate",
};

export default function BookingList({ bookings, content, courts, customers, onSelect }: BookingListProps) {
  const courtMap = new Map(courts.map((court) => [court.id, court]));
  const customerMap = new Map(customers.map((customer) => [customer.id, customer]));

  const columns: Column<CourtBooking>[] = [
    {
      key: "code",
      render: (booking) => <Text className="text-[14px] font-bold text-slate-900">{booking.code}</Text>,
      title: "Mã đặt sân",
      width: 140,
    },
    {
      key: "customer",
      render: (booking) => {
        const customer = customerMap.get(booking.customerId);

        return (
          <View>
            <Text className="text-[14px] font-bold text-slate-900">{customer?.name ?? "—"}</Text>
            <Text className="text-[12px] text-slate-500">{customer?.phone}</Text>
          </View>
        );
      },
      title: "Khách hàng",
      width: 190,
    },
    {
      key: "court",
      render: (booking) => <Text className="text-[14px] text-slate-700">{courtMap.get(booking.courtId)?.name ?? "—"}</Text>,
      title: "Sân",
      width: 140,
    },
    {
      key: "schedule",
      render: (booking) => (
        <View>
          <Text className="text-[14px] text-slate-800">{formatDateLabel(booking.bookingDate)}</Text>
          <Text className="text-[12px] text-slate-500">
            {formatMinutes(booking.startMinute)} – {formatMinutes(booking.endMinute)}
          </Text>
        </View>
      ),
      sorter: (first, second) => first.bookingDate.localeCompare(second.bookingDate) || first.startMinute - second.startMinute,
      title: "Ngày và giờ",
      width: 230,
    },
    {
      key: "totalPrice",
      render: (booking) => <Text className="text-[14px] font-bold text-slate-900">{formatCurrency(booking.totalPrice)}</Text>,
      sorter: (first, second) => first.totalPrice - second.totalPrice,
      title: "Số tiền",
      width: 150,
    },
    {
      key: "status",
      render: (booking) => (
        <StatusBadge label={content.bookingStatusLabels[booking.status]} tone={bookingTone[booking.status]} />
      ),
      title: "Booking",
      width: 150,
    },
    {
      key: "paymentStatus",
      render: (booking) => (
        <StatusBadge label={content.paymentStatusLabels[booking.paymentStatus]} tone={paymentTone[booking.paymentStatus]} />
      ),
      title: "Thanh toán",
      width: 160,
    },
    {
      align: "right",
      key: "actions",
      render: (booking) => (
        <Touch
          accessibilityLabel={`${content.bookingDetailLabel} ${booking.code}`}
          className="h-9 w-9 items-center justify-center rounded-md border border-slate-200"
          onPress={() => onSelect(booking.id)}
        >
          <Eye color="#334155" size={16} />
        </Touch>
      ),
      title: "Thao tác",
      width: 110,
    },
  ];

  return (
    <AdminTableCard description={`${bookings.length} lịch đặt sân phù hợp`} title="Danh sách đặt sân">
      <DataTable columns={columns} emptyText={content.emptyBookingsLabel} rowKey={(booking) => booking.id} rows={bookings} />
    </AdminTableCard>
  );
}
