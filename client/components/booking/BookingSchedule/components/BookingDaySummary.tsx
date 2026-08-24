import { Calendar, Clock, DollarSign, Percent } from "lucide-react-native";

import MetricCard, { metricIconColor } from "@/components/admin/shared/MetricCard";
import type { BookingCourt, CourtBooking } from "@/components/booking/BookingSchedule/types";
import { formatCurrency } from "@/components/booking/BookingSchedule/utils";
import MetricGrid from "@/components/ui/MetricGrid";

type BookingDaySummaryProps = {
  bookings: CourtBooking[];
  closingMinute: number;
  courts: BookingCourt[];
  openingMinute: number;
};

export default function BookingDaySummary({ bookings, closingMinute, courts, openingMinute }: BookingDaySummaryProps) {
  const activeBookings = bookings.filter((booking) => booking.status !== "cancelled");
  const pendingCount = bookings.filter((booking) => booking.status === "pending").length;
  const dayRevenue = activeBookings.reduce((total, booking) => total + booking.totalPrice, 0);

  const availableCourts = courts.filter((court) => court.status === "available");
  const bookedMinutes = activeBookings.reduce((total, booking) => total + booking.endMinute - booking.startMinute, 0);
  const capacityMinutes = Math.max((closingMinute - openingMinute) * availableCourts.length, 1);
  const occupancy = Math.min(Math.round((bookedMinutes / capacityMinutes) * 100), 100);

  return (
    <MetricGrid minItemWidth={210}>
      <MetricCard
        change="Không gồm lịch đã huỷ"
        icon={<Calendar color={metricIconColor.emerald} size={20} />}
        label="Lịch trong ngày"
        value={`${activeBookings.length}`}
      />
      <MetricCard
        change="Giá trị lịch hợp lệ"
        icon={<DollarSign color={metricIconColor.violet} size={20} />}
        label="Doanh thu dự kiến"
        tone="violet"
        value={formatCurrency(dayRevenue)}
      />
      <MetricCard
        change={`${availableCourts.length} sân đang hoạt động`}
        icon={<Percent color={metricIconColor.blue} size={20} />}
        label="Tỷ lệ lấp đầy"
        tone="blue"
        value={`${occupancy}%`}
      />
      <MetricCard
        change="Cần xử lý sớm"
        icon={<Clock color={metricIconColor.orange} size={20} />}
        label="Chờ xác nhận"
        tone="orange"
        value={`${pendingCount}`}
      />
    </MetricGrid>
  );
}
