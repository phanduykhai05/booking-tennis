"use client";

import { ClockCircleOutlined, CreditCardOutlined, DollarOutlined, RollbackOutlined } from "@ant-design/icons";
import { Col, Input, Row, Select, Table, Typography } from "antd";
import type { TableProps } from "antd";
import { useState } from "react";

import { useAdminData } from "@/components/admin/AdminData";
import { getReceivedRevenue } from "@/components/admin/AdminData/selectors";
import type { Payment, PaymentStatus } from "@/components/admin/AdminData/types";
import AdminPageHeader from "@/components/admin/shared/AdminPageHeader";
import AdminTableCard from "@/components/admin/shared/AdminTableCard";
import MetricCard from "@/components/admin/shared/MetricCard";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import type { StatusTone } from "@/components/admin/shared/StatusBadge";
import { formatCurrency } from "@/components/booking/BookingSchedule/utils";
import { paymentsContent } from "@/components/payments/PaymentsManagement/content";

const statusTone: Record<PaymentStatus, StatusTone> = {
  failed: "rose",
  paid: "emerald",
  partial: "orange",
  refunded: "violet",
  unpaid: "slate",
};

const statusOptions = Object.entries(paymentsContent.statusLabels).map(([value, label]) => ({ label, value }));
const statusFilterOptions = [{ label: paymentsContent.allStatusesLabel, value: "all" }, ...statusOptions];
const dateFormatter = new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });

export default function PaymentsManagement() {
  const { bookings, customers, payments, updatePaymentStatus } = useAdminData();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | PaymentStatus>("all");

  const bookingMap = new Map(bookings.map((booking) => [booking.id, booking]));
  const customerMap = new Map(customers.map((customer) => [customer.id, customer]));
  const normalizedQuery = query.trim().toLocaleLowerCase("vi");

  const filteredPayments = payments.filter((payment) => {
    const booking = bookingMap.get(payment.bookingId);
    const customer = customerMap.get(payment.customerId);
    const matchesStatus = status === "all" || payment.status === status;
    const matchesQuery = !normalizedQuery
      || [payment.transactionCode, booking?.code ?? "", customer?.name ?? ""].some((value) => value.toLocaleLowerCase("vi").includes(normalizedQuery));
    return matchesStatus && matchesQuery;
  });

  const outstandingAmount = payments.reduce((total, payment) => {
    const booking = bookingMap.get(payment.bookingId);
    return payment.status === "unpaid" || payment.status === "partial"
      ? total + Math.max((booking?.totalPrice ?? 0) - payment.amount, 0)
      : total;
  }, 0);

  const columns: TableProps<Payment>["columns"] = [
    { dataIndex: "transactionCode", key: "transactionCode", render: (code: string) => <Typography.Text strong>{code}</Typography.Text>, title: "Giao dịch" },
    { key: "booking", render: (_, payment) => <Typography.Text type="success">{bookingMap.get(payment.bookingId)?.code ?? "—"}</Typography.Text>, title: "Booking" },
    {
      key: "customer",
      render: (_, payment) => {
        const customer = customerMap.get(payment.customerId);
        return (
          <div>
            <Typography.Paragraph className="!mb-0">{customer?.name ?? "—"}</Typography.Paragraph>
            <Typography.Text className="!text-xs" type="secondary">{customer?.phone}</Typography.Text>
          </div>
        );
      },
      title: "Khách hàng",
    },
    { dataIndex: "method", key: "method", render: (method: Payment["method"]) => paymentsContent.methodLabels[method], title: "Phương thức" },
    {
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => dateFormatter.format(new Date(createdAt)),
      sorter: (first, second) => first.createdAt.localeCompare(second.createdAt),
      title: "Ngày",
    },
    {
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => <Typography.Text strong>{formatCurrency(amount)}</Typography.Text>,
      sorter: (first, second) => first.amount - second.amount,
      title: "Số tiền",
    },
    { dataIndex: "status", key: "status", render: (value: PaymentStatus) => <StatusBadge label={paymentsContent.statusLabels[value]} tone={statusTone[value]} />, title: "Trạng thái" },
    {
      align: "right",
      key: "actions",
      render: (_, payment) => (
        <Select<PaymentStatus>
          aria-label={`Cập nhật ${payment.transactionCode}`}
          className="!w-[160px]"
          onChange={(value) => updatePaymentStatus(payment.id, value)}
          options={statusOptions}
          size="small"
          value={payment.status}
        />
      ),
      title: "Cập nhật",
    },
  ];

  return (
    <div className="space-y-5">
      <AdminPageHeader description={paymentsContent.description} eyebrow="Tài chính booking" title={paymentsContent.title} />

      <Row gutter={[16, 16]}>
        <Col span={24} md={12} xl={6}><MetricCard icon={<DollarOutlined />} label="Doanh thu thực nhận" value={formatCurrency(getReceivedRevenue(payments))} /></Col>
        <Col span={24} md={12} xl={6}><MetricCard icon={<CreditCardOutlined />} label="Đã thanh toán" tone="blue" value={`${payments.filter((payment) => payment.status === "paid").length}`} /></Col>
        <Col span={24} md={12} xl={6}><MetricCard icon={<ClockCircleOutlined />} label="Còn phải thu" tone="orange" value={formatCurrency(outstandingAmount)} /></Col>
        <Col span={24} md={12} xl={6}><MetricCard icon={<RollbackOutlined />} label="Đã hoàn tiền" tone="violet" value={`${payments.filter((payment) => payment.status === "refunded").length}`} /></Col>
      </Row>

      <AdminTableCard
        description={`${filteredPayments.length} giao dịch phù hợp`}
        title="Danh sách giao dịch"
        toolbar={
          <>
            <Input.Search allowClear className="!w-[270px]" onChange={(event) => setQuery(event.target.value)} placeholder={paymentsContent.searchPlaceholder} value={query} />
            <Select aria-label="Lọc trạng thái thanh toán" className="!w-[190px]" onChange={setStatus} options={statusFilterOptions} value={status} />
          </>
        }
      >
        <Table<Payment>
          columns={columns}
          dataSource={filteredPayments}
          locale={{ emptyText: paymentsContent.emptyLabel }}
          pagination={{ hideOnSinglePage: true, pageSize: 10 }}
          rowKey="id"
          scroll={{ x: 1080 }}
        />
      </AdminTableCard>
    </div>
  );
}
