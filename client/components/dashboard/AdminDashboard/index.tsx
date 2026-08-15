"use client";

import { CalendarCheck2, CircleDollarSign, MapPinned, Percent, UsersRound } from "lucide-react";

import { useAdminData } from "@/components/admin/AdminData";
import { getCourtUtilization, getDailyAdminSeries, getReceivedRevenue } from "@/components/admin/AdminData/selectors";
import AdminPageHeader from "@/components/admin/shared/AdminPageHeader";
import MetricCard from "@/components/admin/shared/MetricCard";
import TrendChart from "@/components/admin/shared/TrendChart";
import CourtUtilizationPanel from "@/components/dashboard/AdminDashboard/components/CourtUtilizationPanel";
import RecentActivities from "@/components/dashboard/AdminDashboard/components/RecentActivities";
import RecentBookings from "@/components/dashboard/AdminDashboard/components/RecentBookings";
import { formatCurrency } from "@/components/booking/BookingSchedule/utils";

const dashboardDate = "2026-08-15";

export default function AdminDashboard() {
  const data = useAdminData();
  const venue = data.venues[0];
  const activeCourts = data.courts.filter((court) => court.status === "available");
  const activeCustomers = data.customers.filter((customer) => customer.status === "active");
  const validBookings = data.bookings.filter((booking) => booking.status !== "cancelled");
  const dailySeries = getDailyAdminSeries(data);
  const averageUtilization = venue && activeCourts.length > 0
    ? Math.round(activeCourts.reduce((total, court) => total + getCourtUtilization(court, data.bookings, dashboardDate, venue.openingMinute, venue.closingMinute), 0) / activeCourts.length)
    : 0;
  const recentBookings = [...data.bookings]
    .sort((first, second) => second.bookingDate.localeCompare(first.bookingDate) || second.startMinute - first.startMinute)
    .slice(0, 5);

  return (
    <div className="space-y-5">
      <AdminPageHeader description="Theo dõi hiệu quả vận hành, doanh thu và mức sử dụng sân từ cùng dữ liệu booking." eyebrow="TennisHub Admin" title="Tổng quan vận hành" />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard change="Không gồm lịch đã huỷ" icon={CalendarCheck2} label="Tổng lượt đặt sân" value={`${validBookings.length}`} />
        <MetricCard change="Đã thu và đặt cọc" icon={CircleDollarSign} label="Doanh thu" tone="violet" value={formatCurrency(getReceivedRevenue(data.payments))} />
        <MetricCard change={`${data.courts.length} sân trong hệ thống`} icon={MapPinned} label="Sân hoạt động" tone="blue" value={`${activeCourts.length}`} />
        <MetricCard change="Khách đang hoạt động" icon={UsersRound} label="Khách hàng" tone="orange" value={`${activeCustomers.length}`} />
        <MetricCard change="Trong ngày 15/08/2026" icon={Percent} label="Tỷ lệ sử dụng sân" value={`${averageUtilization}%`} />
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <TrendChart data={dailySeries.map((item) => ({ label: item.date.slice(5).split("-").reverse().join("/"), value: item.bookings }))} description="Số booking hợp lệ theo ngày" formatValue={(value) => `${value} booking`} title="Xu hướng đặt sân" />
        <TrendChart accent="violet" data={dailySeries.map((item) => ({ label: item.date.slice(5).split("-").reverse().join("/"), value: item.revenue }))} description="Doanh thu thực nhận theo ngày" formatValue={formatCurrency} title="Xu hướng doanh thu" />
      </div>

      {venue && (
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.55fr)]">
          <CourtUtilizationPanel bookings={data.bookings} courts={activeCourts} date={dashboardDate} venue={venue} />
          <RecentActivities activities={data.activityEvents.slice(0, 5)} />
        </div>
      )}

      <RecentBookings bookings={recentBookings} courts={data.courts} customers={data.customers} />
    </div>
  );
}
