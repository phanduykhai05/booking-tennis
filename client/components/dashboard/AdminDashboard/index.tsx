import { Calendar, DollarSign, MapPin, Percent, Users } from "lucide-react-native";
import { View, useWindowDimensions } from "react-native";

import { useAdminData } from "@/components/admin/AdminData";
import { getCourtUtilization, getDailyAdminSeries, getReceivedRevenue } from "@/components/admin/AdminData/selectors";
import type { BookingStatus } from "@/components/admin/AdminData/types";
import AdminPageHeader from "@/components/admin/shared/AdminPageHeader";
import MetricCard, { metricIconColor } from "@/components/admin/shared/MetricCard";
import type { MetricTrend } from "@/components/admin/shared/MetricCard";
import CourtUtilizationPanel from "@/components/dashboard/AdminDashboard/components/CourtUtilizationPanel";
import RecentActivities from "@/components/dashboard/AdminDashboard/components/RecentActivities";
import RecentBookings from "@/components/dashboard/AdminDashboard/components/RecentBookings";
import StatusBreakdown from "@/components/dashboard/AdminDashboard/components/StatusBreakdown";
import TrendPanel from "@/components/dashboard/AdminDashboard/components/TrendPanel";
import { dashboardContent } from "@/components/dashboard/AdminDashboard/content";
import MetricGrid from "@/components/ui/MetricGrid";
import Tag from "@/components/ui/Tag";
import { formatCurrency } from "@/lib/format";

const emptyStatusCounts: Record<BookingStatus, number> = {
  cancelled: 0,
  "checked-in": 0,
  completed: 0,
  confirmed: 0,
  pending: 0,
};

function toChartLabel(date: string) {
  return date.slice(5).split("-").reverse().join("/");
}

// So ngày cuối với ngày liền trước trong chuỗi 7 ngày; previous = 0 thì không có mốc để so.
function getTrend(values: number[]): MetricTrend | null {
  if (values.length < 2) return null;

  const current = values[values.length - 1];
  const previous = values[values.length - 2];
  if (previous === 0) return null;

  const percent = ((current - previous) / previous) * 100;
  return { isPositive: percent >= 0, label: `${Math.abs(percent).toFixed(1)}%` };
}

export default function AdminDashboard() {
  const data = useAdminData();
  const { width } = useWindowDimensions();
  const isWide = width >= 1100;

  const venue = data.venues[0];
  const activeCourts = data.courts.filter((court) => court.status === "available");
  const activeCustomers = data.customers.filter((customer) => customer.status === "active");
  const validBookings = data.bookings.filter((booking) => booking.status !== "cancelled");
  const dailySeries = getDailyAdminSeries(data);

  const bookingSeries = dailySeries.map((item) => ({ label: toChartLabel(item.date), value: item.bookings }));
  const revenueSeries = dailySeries.map((item) => ({ label: toChartLabel(item.date), value: item.revenue }));
  const bookingTrend = getTrend(dailySeries.map((item) => item.bookings));
  const revenueTrend = getTrend(dailySeries.map((item) => item.revenue));
  const latestRevenue = dailySeries.at(-1)?.revenue ?? 0;
  const latestBookings = dailySeries.at(-1)?.bookings ?? 0;

  const statusCounts = data.bookings.reduce(
    (counts, booking) => ({ ...counts, [booking.status]: counts[booking.status] + 1 }),
    emptyStatusCounts,
  );

  const averageUtilization =
    venue && activeCourts.length > 0
      ? Math.round(
          activeCourts.reduce(
            (total, court) =>
              total + getCourtUtilization(court, data.bookings, dashboardContent.date, venue.openingMinute, venue.closingMinute),
            0,
          ) / activeCourts.length,
        )
      : 0;

  const recentBookings = [...data.bookings]
    .sort((first, second) => second.bookingDate.localeCompare(first.bookingDate) || second.startMinute - first.startMinute)
    .slice(0, 5);

  return (
    <View className="gap-5">
      <AdminPageHeader
        actions={<Tag label={dashboardContent.rangeLabel} tone="emerald" />}
        description={dashboardContent.description}
        eyebrow={dashboardContent.eyebrow}
        title={dashboardContent.title}
      />

      <MetricGrid minItemWidth={210}>
        <MetricCard
          change="Không gồm lịch đã huỷ"
          icon={<Calendar color={metricIconColor.emerald} size={20} />}
          label="Tổng lượt đặt sân"
          trend={bookingTrend ?? undefined}
          value={`${validBookings.length}`}
        />
        <MetricCard
          change="Đã thu và đặt cọc"
          icon={<DollarSign color={metricIconColor.violet} size={20} />}
          label="Doanh thu"
          tone="violet"
          trend={revenueTrend ?? undefined}
          value={formatCurrency(getReceivedRevenue(data.payments))}
        />
        <MetricCard
          change={`${data.courts.length} sân trong hệ thống`}
          icon={<MapPin color={metricIconColor.blue} size={20} />}
          label="Sân hoạt động"
          tone="blue"
          value={`${activeCourts.length}`}
        />
        <MetricCard
          change="Khách đang hoạt động"
          icon={<Users color={metricIconColor.orange} size={20} />}
          label="Khách hàng"
          tone="orange"
          value={`${activeCustomers.length}`}
        />
        <MetricCard
          change={`Trong ngày ${dashboardContent.dateLabel}`}
          icon={<Percent color={metricIconColor.emerald} size={20} />}
          label="Tỷ lệ sử dụng sân"
          value={`${averageUtilization}%`}
        />
      </MetricGrid>

      <View className={isWide ? "flex-row gap-4" : "gap-4"}>
        <View className={isWide ? "flex-[2]" : ""}>
          <TrendPanel
            accent="violet"
            data={revenueSeries}
            description="Doanh thu thực nhận theo ngày"
            formatValue={formatCurrency}
            headlineValue={formatCurrency(latestRevenue)}
            title="Xu hướng doanh thu"
            trend={revenueTrend}
          />
        </View>
        <View className={isWide ? "flex-1" : ""}>
          <StatusBreakdown counts={statusCounts} total={data.bookings.length} />
        </View>
      </View>

      <View className={isWide ? "flex-row gap-4" : "gap-4"}>
        <View className={isWide ? "flex-1" : ""}>
          <TrendPanel
            data={bookingSeries}
            description="Số booking hợp lệ theo ngày"
            formatValue={(value) => `${value} booking`}
            headlineValue={`${latestBookings} booking`}
            title="Xu hướng đặt sân"
            trend={bookingTrend}
          />
        </View>
        {venue ? (
          <View className={isWide ? "flex-1" : ""}>
            <CourtUtilizationPanel
              bookings={data.bookings}
              courts={activeCourts}
              date={dashboardContent.date}
              dateLabel={dashboardContent.dateLabel}
              venue={venue}
            />
          </View>
        ) : null}
        <View className={isWide ? "flex-1" : ""}>
          <RecentActivities activities={data.activityEvents.slice(0, 5)} />
        </View>
      </View>

      <RecentBookings bookings={recentBookings} courts={data.courts} customers={data.customers} />
    </View>
  );
}
