import { Clock, CreditCard, DollarSign, Undo2 } from "lucide-react";
import { useSearchParams } from "react-router";
import { useState } from "react";

import { useAdminData } from "@/components/admin/AdminData";
import { getReceivedRevenue } from "@/components/admin/AdminData/selectors";
import type { Payment, PaymentStatus } from "@/components/admin/AdminData/types";
import AdminPageHeader from "@/components/admin/shared/AdminPageHeader";
import AdminTableCard from "@/components/admin/shared/AdminTableCard";
import MetricCard, { metricIconColor } from "@/components/admin/shared/MetricCard";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import type { StatusTone } from "@/components/admin/shared/StatusBadge";
import { paymentsContent } from "@/components/payments/PaymentsManagement/content";
import DataTable from "@/components/ui/DataTable";
import type { Column } from "@/components/ui/DataTable";
import MetricGrid from "@/components/ui/MetricGrid";
import SearchField from "@/components/ui/SearchField";
import Select from "@/components/ui/Select";
import { formatCurrency, matchesQuery } from "@/lib/format";

const statusTone: Record<PaymentStatus, StatusTone> = {
  failed: "rose",
  paid: "emerald",
  partial: "orange",
  refunded: "violet",
  unpaid: "slate",
};

const statusOptions = (Object.entries(paymentsContent.statusLabels) as [PaymentStatus, string][]).map(([value, label]) => ({
  label,
  value,
}));

const statusFilterOptions = [{ label: paymentsContent.allStatusesLabel, value: "all" as const }, ...statusOptions];

/** ISO datetime của API -> "dd/mm/yyyy" theo giờ máy, đủ để đối soát trong ngày. */
function formatDate(value: string) {
  const date = new Date(value);
  const pad = (part: number) => part.toString().padStart(2, "0");
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

export default function PaymentsManagement() {
  const { bookings, customers, payments, updatePaymentStatus } = useAdminData();
  // Lọc sẵn khi mở từ ô tìm nhanh trên thanh đầu trang.
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const [query, setQuery] = useState(q ?? "");
  const [status, setStatus] = useState<"all" | PaymentStatus>("all");

  const bookingMap = new Map(bookings.map((booking) => [booking.id, booking]));
  const customerMap = new Map(customers.map((customer) => [customer.id, customer]));

  /** Giao dịch vé sự kiện không gắn booking nào, nên bookingId có thể rỗng. */
  const bookingOf = (payment: Payment) => (payment.bookingId === null ? undefined : bookingMap.get(payment.bookingId));

  const filteredPayments = payments.filter((payment) => {
    const booking = bookingOf(payment);
    const customer = customerMap.get(payment.customerId);
    const matchesStatus = status === "all" || payment.status === status;
    const matchesText =
      !query.trim() ||
      [payment.transactionCode, booking?.code ?? "", customer?.name ?? ""].some((value) => matchesQuery(value, query));

    return matchesStatus && matchesText;
  });

  const outstandingAmount = payments.reduce((total, payment) => {
    const booking = bookingOf(payment);

    return payment.status === "unpaid" || payment.status === "partial"
      ? total + Math.max((booking?.totalPrice ?? 0) - payment.amount, 0)
      : total;
  }, 0);

  const columns: Column<Payment>[] = [
    {
      key: "transactionCode",
      render: (payment) => <span className="text-[14px] font-bold text-slate-900">{payment.transactionCode}</span>,
      title: "Giao dịch",
      width: 160,
    },
    {
      key: "booking",
      render: (payment) =>
        payment.ticketId ? (
          <span className="text-[14px] text-violet-600">{paymentsContent.ticketLabel}</span>
        ) : (
          <span className="text-[14px] text-emerald-600">{bookingOf(payment)?.code ?? "—"}</span>
        ),
      title: "Booking",
      width: 130,
    },
    {
      key: "customer",
      render: (payment) => {
        const customer = customerMap.get(payment.customerId);

        return (
          <div>
            <span className="text-[14px] text-slate-800">{customer?.name ?? "—"}</span>
            <span className="text-[12px] text-slate-500">{customer?.phone}</span>
          </div>
        );
      },
      title: "Khách hàng",
      width: 190,
    },
    {
      key: "method",
      render: (payment) => <span className="text-[14px] text-slate-700">{paymentsContent.methodLabels[payment.method]}</span>,
      title: "Phương thức",
      width: 150,
    },
    {
      key: "createdAt",
      render: (payment) => <span className="text-[14px] text-slate-700">{formatDate(payment.createdAt)}</span>,
      sorter: (first, second) => first.createdAt.localeCompare(second.createdAt),
      title: "Ngày",
      width: 130,
    },
    {
      key: "amount",
      render: (payment) => <span className="text-[14px] font-bold text-slate-900">{formatCurrency(payment.amount)}</span>,
      sorter: (first, second) => first.amount - second.amount,
      title: "Số tiền",
      width: 150,
    },
    {
      key: "status",
      render: (payment) => <StatusBadge label={paymentsContent.statusLabels[payment.status]} tone={statusTone[payment.status]} />,
      title: "Trạng thái",
      width: 150,
    },
    {
      key: "actions",
      render: (payment) => (
        <Select
          accessibilityLabel={`Cập nhật ${payment.transactionCode}`}
          onChange={(value) => void updatePaymentStatus(payment.id, value)}
          options={statusOptions}
          size="small"
          value={payment.status}
          width={150}
        />
      ),
      title: "Cập nhật",
      width: 170,
    },
  ];

  return (
    <div className="gap-5">
      <AdminPageHeader description={paymentsContent.description} eyebrow="Tài chính booking" title={paymentsContent.title} />

      <MetricGrid minItemWidth={230}>
        <MetricCard
          icon={<DollarSign color={metricIconColor.emerald} size={20} />}
          label="Doanh thu thực nhận"
          value={formatCurrency(getReceivedRevenue(payments))}
        />
        <MetricCard
          icon={<CreditCard color={metricIconColor.blue} size={20} />}
          label="Đã thanh toán"
          tone="blue"
          value={`${payments.filter((payment) => payment.status === "paid").length}`}
        />
        <MetricCard
          icon={<Clock color={metricIconColor.orange} size={20} />}
          label="Còn phải thu"
          tone="orange"
          value={formatCurrency(outstandingAmount)}
        />
        <MetricCard
          icon={<Undo2 color={metricIconColor.violet} size={20} />}
          label="Đã hoàn tiền"
          tone="violet"
          value={`${payments.filter((payment) => payment.status === "refunded").length}`}
        />
      </MetricGrid>

      <AdminTableCard
        description={`${filteredPayments.length} giao dịch phù hợp`}
        title="Danh sách giao dịch"
        toolbar={
          <>
            <SearchField
              accessibilityLabel={paymentsContent.searchPlaceholder}
              onChange={setQuery}
              placeholder={paymentsContent.searchPlaceholder}
              value={query}
              width={270}
            />
            <Select
              accessibilityLabel="Lọc trạng thái thanh toán"
              onChange={setStatus}
              options={statusFilterOptions}
              value={status}
              width={190}
            />
          </>
        }
      >
        <DataTable columns={columns} emptyText={paymentsContent.emptyLabel} rowKey={(payment) => payment.id} rows={filteredPayments} />
      </AdminTableCard>
    </div>
  );
}
