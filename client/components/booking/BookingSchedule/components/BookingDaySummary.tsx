"use client";

import { CalendarOutlined, ClockCircleOutlined, DollarOutlined, PercentageOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";

import MetricCard from "@/components/admin/shared/MetricCard";
import type { BookingCourt, CourtBooking } from "@/components/booking/BookingSchedule/types";
import { formatCurrency } from "@/components/booking/BookingSchedule/utils";

type BookingDaySummaryProps = {
  bookings: CourtBooking[];
  closingMinute: number;
  courts: BookingCourt[];
  openingMinute: number;
};

const summaryColProps = { flex: "1 1 200px" };

export default function BookingDaySummary({ bookings, closingMinute, courts, openingMinute }: BookingDaySummaryProps) {
  const activeBookings = bookings.filter((booking) => booking.status !== "cancelled");
  const pendingCount = bookings.filter((booking) => booking.status === "pending").length;
  const dayRevenue = activeBookings.reduce((total, booking) => total + booking.totalPrice, 0);

  const availableCourts = courts.filter((court) => court.status === "available");
  const bookedMinutes = activeBookings.reduce((total, booking) => total + booking.endMinute - booking.startMinute, 0);
  const capacityMinutes = Math.max((closingMinute - openingMinute) * availableCourts.length, 1);
  const occupancy = Math.min(Math.round((bookedMinutes / capacityMinutes) * 100), 100);

  return (
    <Row gutter={[16, 16]}>
      <Col {...summaryColProps}>
        <MetricCard change="Không gồm lịch đã huỷ" icon={<CalendarOutlined />} label="Lịch trong ngày" value={`${activeBookings.length}`} />
      </Col>
      <Col {...summaryColProps}>
        <MetricCard change="Giá trị lịch hợp lệ" icon={<DollarOutlined />} label="Doanh thu dự kiến" tone="violet" value={formatCurrency(dayRevenue)} />
      </Col>
      <Col {...summaryColProps}>
        <MetricCard change={`${availableCourts.length} sân đang hoạt động`} icon={<PercentageOutlined />} label="Tỷ lệ lấp đầy" tone="blue" value={`${occupancy}%`} />
      </Col>
      <Col {...summaryColProps}>
        <MetricCard change="Cần xử lý sớm" icon={<ClockCircleOutlined />} label="Chờ xác nhận" tone="orange" value={`${pendingCount}`} />
      </Col>
    </Row>
  );
}
