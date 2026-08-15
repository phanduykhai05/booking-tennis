"use client";

import { CircleDollarSign, Clock3, CreditCard, RotateCcw, Search } from "lucide-react";
import { useState } from "react";

import { useAdminData } from "@/components/admin/AdminData";
import { getReceivedRevenue } from "@/components/admin/AdminData/selectors";
import type { PaymentStatus } from "@/components/admin/AdminData/types";
import AdminPageHeader from "@/components/admin/shared/AdminPageHeader";
import AdminTableCard from "@/components/admin/shared/AdminTableCard";
import MetricCard from "@/components/admin/shared/MetricCard";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import { formatCurrency } from "@/components/booking/BookingSchedule/utils";
import { paymentsContent } from "@/components/payments/PaymentsManagement/content";

const statusTone = { failed: "rose", paid: "emerald", partial: "orange", refunded: "violet", unpaid: "slate" } as const;

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
    const matchesQuery = !normalizedQuery || [payment.transactionCode, booking?.code ?? "", customer?.name ?? ""].some((value) => value.toLocaleLowerCase("vi").includes(normalizedQuery));
    return matchesStatus && matchesQuery;
  });
  const outstandingAmount = payments.reduce((total, payment) => {
    const booking = bookingMap.get(payment.bookingId);
    return payment.status === "unpaid" || payment.status === "partial" ? total + Math.max((booking?.totalPrice ?? 0) - payment.amount, 0) : total;
  }, 0);

  return (
    <div className="space-y-5">
      <AdminPageHeader description={paymentsContent.description} eyebrow="Tài chính booking" title={paymentsContent.title} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={CircleDollarSign} label="Doanh thu thực nhận" value={formatCurrency(getReceivedRevenue(payments))} />
        <MetricCard icon={CreditCard} label="Đã thanh toán" tone="blue" value={`${payments.filter((payment) => payment.status === "paid").length}`} />
        <MetricCard icon={Clock3} label="Còn phải thu" tone="orange" value={formatCurrency(outstandingAmount)} />
        <MetricCard icon={RotateCcw} label="Đã hoàn tiền" tone="violet" value={`${payments.filter((payment) => payment.status === "refunded").length}`} />
      </div>
      <AdminTableCard
        description={`${filteredPayments.length} giao dịch phù hợp`}
        title="Danh sách giao dịch"
        toolbar={<><label className="flex h-10 min-w-[270px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-3"><Search aria-hidden="true" className="size-4 text-slate-400" /><span className="sr-only">{paymentsContent.searchPlaceholder}</span><input className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none" onChange={(event) => setQuery(event.target.value)} placeholder={paymentsContent.searchPlaceholder} type="search" value={query} /></label><select aria-label="Lọc trạng thái thanh toán" className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600" onChange={(event) => setStatus(event.target.value as "all" | PaymentStatus)} value={status}><option value="all">{paymentsContent.allStatusesLabel}</option>{Object.entries(paymentsContent.statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></>}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1080px] text-left text-sm">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3">Giao dịch</th><th className="px-4 py-3">Booking</th><th className="px-4 py-3">Khách hàng</th><th className="px-4 py-3">Phương thức</th><th className="px-4 py-3">Ngày</th><th className="px-4 py-3">Số tiền</th><th className="px-4 py-3">Trạng thái</th><th className="px-5 py-3 text-right">Cập nhật</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPayments.map((payment) => {
                const booking = bookingMap.get(payment.bookingId);
                const customer = customerMap.get(payment.customerId);
                return (
                  <tr className="hover:bg-slate-50/70" key={payment.id}>
                    <td className="whitespace-nowrap px-5 py-4 font-bold text-slate-800">{payment.transactionCode}</td>
                    <td className="px-4 py-4 font-semibold text-emerald-700">{booking?.code ?? "—"}</td>
                    <td className="px-4 py-4"><p className="font-semibold text-slate-700">{customer?.name ?? "—"}</p><p className="mt-0.5 text-xs text-slate-400">{customer?.phone}</p></td>
                    <td className="whitespace-nowrap px-4 py-4 text-slate-600">{paymentsContent.methodLabels[payment.method]}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-slate-600">{new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(payment.createdAt))}</td>
                    <td className="whitespace-nowrap px-4 py-4 font-bold text-slate-800">{formatCurrency(payment.amount)}</td>
                    <td className="px-4 py-4"><StatusBadge label={paymentsContent.statusLabels[payment.status]} tone={statusTone[payment.status]} /></td>
                    <td className="px-5 py-4 text-right"><select aria-label={`Cập nhật ${payment.transactionCode}`} className="h-9 rounded-lg border border-slate-200 bg-white px-2 text-xs font-semibold text-slate-600" onChange={(event) => updatePaymentStatus(payment.id, event.target.value as PaymentStatus)} value={payment.status}>{Object.entries(paymentsContent.statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredPayments.length === 0 && <p className="py-12 text-center text-sm font-medium text-slate-400">{paymentsContent.emptyLabel}</p>}
      </AdminTableCard>
    </div>
  );
}
