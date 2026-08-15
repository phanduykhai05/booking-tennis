"use client";

import { CalendarCheck2, CircleDollarSign, Search, UserCheck, UsersRound } from "lucide-react";
import { useState } from "react";

import { useAdminData } from "@/components/admin/AdminData";
import { getCustomerBookingCount, getCustomerTotalSpend, getReceivedRevenue } from "@/components/admin/AdminData/selectors";
import type { CustomerStatus } from "@/components/admin/AdminData/types";
import AdminPageHeader from "@/components/admin/shared/AdminPageHeader";
import AdminTableCard from "@/components/admin/shared/AdminTableCard";
import MetricCard from "@/components/admin/shared/MetricCard";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import { formatCurrency } from "@/components/booking/BookingSchedule/utils";
import { customersContent } from "@/components/customers/CustomersManagement/content";

export default function CustomersManagement() {
  const { bookings, customers, payments, updateCustomerStatus } = useAdminData();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | CustomerStatus>("all");
  const normalizedQuery = query.trim().toLocaleLowerCase("vi");
  const filteredCustomers = customers.filter((customer) => {
    const matchesStatus = status === "all" || customer.status === status;
    const matchesQuery = !normalizedQuery || [customer.name, customer.email, customer.phone].some((value) => value.toLocaleLowerCase("vi").includes(normalizedQuery));
    return matchesStatus && matchesQuery;
  });
  const repeatCustomerCount = customers.filter((customer) => getCustomerBookingCount(bookings, customer.id) > 1).length;

  return (
    <div className="space-y-5">
      <AdminPageHeader description={customersContent.description} eyebrow="Quan hệ khách hàng" title={customersContent.title} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={UsersRound} label="Tổng khách hàng" value={`${customers.length}`} />
        <MetricCard icon={UserCheck} label="Đang hoạt động" tone="blue" value={`${customers.filter((customer) => customer.status === "active").length}`} />
        <MetricCard icon={CalendarCheck2} label="Khách quay lại" tone="orange" value={`${repeatCustomerCount}`} />
        <MetricCard icon={CircleDollarSign} label="Tổng chi tiêu" tone="violet" value={formatCurrency(getReceivedRevenue(payments))} />
      </div>
      <AdminTableCard
        description={`${filteredCustomers.length} khách hàng phù hợp`}
        title="Danh sách khách hàng"
        toolbar={<><label className="flex h-10 min-w-[250px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-3"><Search aria-hidden="true" className="size-4 text-slate-400" /><span className="sr-only">{customersContent.searchPlaceholder}</span><input className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none" onChange={(event) => setQuery(event.target.value)} placeholder={customersContent.searchPlaceholder} type="search" value={query} /></label><select aria-label="Lọc trạng thái khách hàng" className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600" onChange={(event) => setStatus(event.target.value as "all" | CustomerStatus)} value={status}><option value="all">{customersContent.allStatusesLabel}</option><option value="active">{customersContent.statusLabels.active}</option><option value="inactive">{customersContent.statusLabels.inactive}</option></select></>}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3">Khách hàng</th><th className="px-4 py-3">Liên hệ</th><th className="px-4 py-3">Ngày tham gia</th><th className="px-4 py-3">Số booking</th><th className="px-4 py-3">Tổng chi tiêu</th><th className="px-4 py-3">Trạng thái</th><th className="px-5 py-3 text-right">Thao tác</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.map((customer) => {
                const bookingCount = getCustomerBookingCount(bookings, customer.id);
                const totalSpend = getCustomerTotalSpend(payments, customer.id);
                const nextStatus: CustomerStatus = customer.status === "active" ? "inactive" : "active";
                return (
                  <tr className="hover:bg-slate-50/70" key={customer.id}>
                    <td className="px-5 py-4"><div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-700">{customer.name.split(" ").slice(-2).map((part) => part[0]).join("")}</span><span className="font-bold text-slate-800">{customer.name}</span></div></td>
                    <td className="px-4 py-4"><p className="font-medium text-slate-700">{customer.phone}</p><p className="mt-0.5 text-xs text-slate-400">{customer.email || "Chưa có email"}</p></td>
                    <td className="whitespace-nowrap px-4 py-4 text-slate-600">{new Intl.DateTimeFormat("vi-VN").format(new Date(`${customer.joinedAt}T12:00:00`))}</td>
                    <td className="px-4 py-4 font-bold text-slate-700">{bookingCount}</td>
                    <td className="px-4 py-4 font-bold text-slate-800">{formatCurrency(totalSpend)}</td>
                    <td className="px-4 py-4"><StatusBadge label={customersContent.statusLabels[customer.status]} tone={customer.status === "active" ? "emerald" : "slate"} /></td>
                    <td className="px-5 py-4 text-right"><button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700" onClick={() => updateCustomerStatus(customer.id, nextStatus)} type="button">{nextStatus === "active" ? "Kích hoạt" : "Tạm ngưng"}</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredCustomers.length === 0 && <p className="py-12 text-center text-sm font-medium text-slate-400">{customersContent.emptyLabel}</p>}
      </AdminTableCard>
    </div>
  );
}
