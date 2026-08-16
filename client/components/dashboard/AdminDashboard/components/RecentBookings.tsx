"use client";

import { Card, Table, Typography } from "antd";
import type { TableProps } from "antd";
import Link from "next/link";

import type { Booking, Court, Customer } from "@/components/admin/AdminData/types";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import type { StatusTone } from "@/components/admin/shared/StatusBadge";
import { bookingScheduleContent } from "@/components/booking/BookingSchedule/mockData";
import type { BookingStatus } from "@/components/booking/BookingSchedule/types";
import { formatCurrency, formatMinutes } from "@/components/booking/BookingSchedule/utils";

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
  const courtMap = new Map(courts.map((court) => [court.id, court]));
  const customerMap = new Map(customers.map((customer) => [customer.id, customer]));

  const columns: TableProps<Booking>["columns"] = [
    { dataIndex: "code", key: "code", render: (code: string) => <Typography.Text strong>{code}</Typography.Text>, title: "Booking" },
    { key: "customer", render: (_, booking) => customerMap.get(booking.customerId)?.name ?? "—", title: "Khách hàng" },
    {
      key: "court",
      render: (_, booking) => (
        <div>
          <Typography.Paragraph className="!mb-0">{courtMap.get(booking.courtId)?.name ?? "—"}</Typography.Paragraph>
          <Typography.Text className="!text-xs" type="secondary">
            {formatMinutes(booking.startMinute)} – {formatMinutes(booking.endMinute)}
          </Typography.Text>
        </div>
      ),
      title: "Sân / Giờ",
    },
    { dataIndex: "totalPrice", key: "totalPrice", render: (price: number) => <Typography.Text strong>{formatCurrency(price)}</Typography.Text>, title: "Số tiền" },
    {
      dataIndex: "status",
      key: "status",
      render: (status: BookingStatus) => <StatusBadge label={bookingScheduleContent.bookingStatusLabels[status]} tone={statusTone[status]} />,
      title: "Trạng thái",
    },
  ];

  return (
    <Card
      classNames={{ body: "!p-0" }}
      extra={<Link href="/admin/bookings">Xem tất cả</Link>}
      title={
        <div className="py-3">
          <Typography.Text strong>Lịch đặt gần đây</Typography.Text>
          <Typography.Paragraph className="!mb-0 !text-xs" type="secondary">Các booking mới nhất trong hệ thống</Typography.Paragraph>
        </div>
      }
    >
      <Table<Booking> columns={columns} dataSource={bookings} pagination={false} rowKey="id" scroll={{ x: 720 }} />
    </Card>
  );
}
