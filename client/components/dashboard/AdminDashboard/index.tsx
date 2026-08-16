"use client";

import {
  CalendarOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  PercentageOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Col, Row, Tag } from "antd";

import { useAdminData } from "@/components/admin/AdminData";
import { getCourtUtilization, getDailyAdminSeries, getReceivedRevenue } from "@/components/admin/AdminData/selectors";
import type { BookingStatus } from "@/components/admin/AdminData/types";
import AdminPageHeader from "@/components/admin/shared/AdminPageHeader";
import MetricCard from "@/components/admin/shared/MetricCard";
import type { MetricTrend } from "@/components/admin/shared/MetricCard";
import { formatCurrency } from "@/components/booking/BookingSchedule/utils";
import CourtUtilizationPanel from "@/components/dashboard/AdminDashboard/components/CourtUtilizationPanel";
import RecentActivities from "@/components/dashboard/AdminDashboard/components/RecentActivities";
import RecentBookings from "@/components/dashboard/AdminDashboard/components/RecentBookings";
import StatusBreakdown from "@/components/dashboard/AdminDashboard/components/StatusBreakdown";
import TrendPanel from "@/components/dashboard/AdminDashboard/components/TrendPanel";
import { dashboardContent } from "@/components/dashboard/AdminDashboard/content";

// 5 thẻ không chia hết cho lưới 24 cột, nên dùng flex-basis để chúng tự co giãn và xuống dòng.
const metricColProps = { flex: "1 1 210px" };

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

  const averageUtilization = venue && activeCourts.length > 0
    ? Math.round(activeCourts.reduce((total, court) => total + getCourtUtilization(court, data.bookings, dashboardContent.date, venue.openingMinute, venue.closingMinute), 0) / activeCourts.length)
    : 0;

  const recentBookings = [...data.bookings]
    .sort((first, second) => second.bookingDate.localeCompare(first.bookingDate) || second.startMinute - first.startMinute)
    .slice(0, 5);

  return (
    <div className="space-y-5">
      <AdminPageHeader
        actions={<Tag bordered={false} color="green">{dashboardContent.rangeLabel}</Tag>}
        description={dashboardContent.description}
        eyebrow={dashboardContent.eyebrow}
        title={dashboardContent.title}
      />

      <Row gutter={[16, 16]}>
        <Col {...metricColProps}><MetricCard change="Không gồm lịch đã huỷ" icon={<CalendarOutlined />} label="Tổng lượt đặt sân" trend={bookingTrend ?? undefined} value={`${validBookings.length}`} /></Col>
        <Col {...metricColProps}><MetricCard change="Đã thu và đặt cọc" icon={<DollarOutlined />} label="Doanh thu" tone="violet" trend={revenueTrend ?? undefined} value={formatCurrency(getReceivedRevenue(data.payments))} /></Col>
        <Col {...metricColProps}><MetricCard change={`${data.courts.length} sân trong hệ thống`} icon={<EnvironmentOutlined />} label="Sân hoạt động" tone="blue" value={`${activeCourts.length}`} /></Col>
        <Col {...metricColProps}><MetricCard change="Khách đang hoạt động" icon={<TeamOutlined />} label="Khách hàng" tone="orange" value={`${activeCustomers.length}`} /></Col>
        <Col {...metricColProps}><MetricCard change={`Trong ngày ${dashboardContent.dateLabel}`} icon={<PercentageOutlined />} label="Tỷ lệ sử dụng sân" value={`${averageUtilization}%`} /></Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24} xl={16}>
          <TrendPanel
            accent="violet"
            data={revenueSeries}
            description="Doanh thu thực nhận theo ngày"
            formatValue={formatCurrency}
            headlineValue={formatCurrency(latestRevenue)}
            title="Xu hướng doanh thu"
            trend={revenueTrend}
          />
        </Col>
        <Col span={24} xl={8}>
          <StatusBreakdown counts={statusCounts} total={data.bookings.length} />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24} xl={8}>
          <TrendPanel
            data={bookingSeries}
            description="Số booking hợp lệ theo ngày"
            formatValue={(value) => `${value} booking`}
            headlineValue={`${latestBookings} booking`}
            title="Xu hướng đặt sân"
            trend={bookingTrend}
          />
        </Col>
        {venue ? (
          <Col span={24} lg={12} xl={8}>
            <CourtUtilizationPanel bookings={data.bookings} courts={activeCourts} date={dashboardContent.date} dateLabel={dashboardContent.dateLabel} venue={venue} />
          </Col>
        ) : null}
        <Col span={24} lg={12} xl={8}>
          <RecentActivities activities={data.activityEvents.slice(0, 5)} />
        </Col>
      </Row>

      <RecentBookings bookings={recentBookings} courts={data.courts} customers={data.customers} />
    </div>
  );
}
