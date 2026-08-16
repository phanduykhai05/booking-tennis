"use client";

import { EyeOutlined } from "@ant-design/icons";
import { Button, Table, Typography } from "antd";
import type { TableProps } from "antd";

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

  const columns: TableProps<CourtBooking>["columns"] = [
    { dataIndex: "code", key: "code", render: (code: string) => <Typography.Text strong>{code}</Typography.Text>, title: "Mã đặt sân" },
    {
      key: "customer",
      render: (_, booking) => {
        const customer = customerMap.get(booking.customerId);
        return (
          <div>
            <Typography.Paragraph className="!mb-0" strong>{customer?.name ?? "—"}</Typography.Paragraph>
            <Typography.Text className="!text-xs" type="secondary">{customer?.phone}</Typography.Text>
          </div>
        );
      },
      title: "Khách hàng",
    },
    { key: "court", render: (_, booking) => courtMap.get(booking.courtId)?.name ?? "—", title: "Sân" },
    {
      key: "schedule",
      render: (_, booking) => (
        <div>
          <Typography.Paragraph className="!mb-0 capitalize">{formatDateLabel(booking.bookingDate)}</Typography.Paragraph>
          <Typography.Text className="!text-xs" type="secondary">
            {formatMinutes(booking.startMinute)} – {formatMinutes(booking.endMinute)}
          </Typography.Text>
        </div>
      ),
      sorter: (first, second) => first.bookingDate.localeCompare(second.bookingDate) || first.startMinute - second.startMinute,
      title: "Ngày và giờ",
    },
    {
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => <Typography.Text strong>{formatCurrency(price)}</Typography.Text>,
      sorter: (first, second) => first.totalPrice - second.totalPrice,
      title: "Số tiền",
    },
    { dataIndex: "status", key: "status", render: (status: BookingStatus) => <StatusBadge label={content.bookingStatusLabels[status]} tone={bookingTone[status]} />, title: "Booking" },
    { dataIndex: "paymentStatus", key: "paymentStatus", render: (status: PaymentStatus) => <StatusBadge label={content.paymentStatusLabels[status]} tone={paymentTone[status]} />, title: "Thanh toán" },
    {
      align: "right",
      key: "actions",
      render: (_, booking) => (
        <Button aria-label={`${content.bookingDetailLabel} ${booking.code}`} icon={<EyeOutlined />} onClick={() => onSelect(booking.id)} />
      ),
      title: "Thao tác",
    },
  ];

  return (
    <AdminTableCard description={`${bookings.length} lịch đặt sân phù hợp`} title="Danh sách đặt sân">
      <Table<CourtBooking>
        columns={columns}
        dataSource={bookings}
        locale={{ emptyText: content.emptyBookingsLabel }}
        pagination={{ hideOnSinglePage: true, pageSize: 10 }}
        rowKey="id"
        scroll={{ x: 1040 }}
      />
    </AdminTableCard>
  );
}
